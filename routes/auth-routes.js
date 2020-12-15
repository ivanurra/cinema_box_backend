// file: routes/auth-routes.js

const express       = require("express")
const authRoutes    = express.Router()
const passport      = require("passport")
const bcrypt        = require("bcryptjs")

///////////////////////////
// AUTHENTICATION ROUTES //
///////////////////////////

const User = require('../models/User')

authRoutes.post('/signup', (req, res, next) => {

    const {username, password, email} = req.body

    if (!username || !password || !email) {
        res.status(400).json({
            message: 'Provide username, password and email'
        })
        return
    }

    if (password.length < 7) {
        res.status(400).json({
            message: 'Password must be at least 8 characters.'
        })
        return
    }

    User.findOne({username}, (err, foundUser) => {

        if (err) {
            res.status(500).json({
                message: 'Username incorrect.'
            });
            return
        }

        if (foundUser) {
            res.status(400).json({
                message: 'Email taken, choose another one.'
            });
            return
        }

        const salt = bcrypt.genSaltSync(10);
        const hashPass = bcrypt.hashSync(password, salt)

        const aNewUser = new User({
			username, password: hashPass, email
		})

        aNewUser.save(err => {
            if (err) {
                res.status(500).json({
                    message: 'Saving user to database went wrong.'
                });
                return
            }

            req.login(aNewUser, (err) => {

                if (err) {
                    res.status(500).json({
                        message: 'Login after signup went bad.'
                    });
                    return
                }

                res.status(200).json(aNewUser)
            })
        })
    })
})


authRoutes.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, theUser, failureDetails) => {
        if (err) {
            res.status(500).json({
                message: 'Failed to authenticate user.'
            })
            return
        }

        if (!theUser) {
            res.status(401).json(failureDetails)
            return
        }

        req.login(theUser, (err) => {
            if (err) {
                res.status(500).json({
                    message: 'Session error'
                });
                return
            }

            res.status(200).json(theUser);
        })
    })(req, res, next);
})

authRoutes.post('/logout', (req, res) => {
    req.logout();
    res.status(200).json({
        message: 'Log out success!'
    })
})

authRoutes.get('/loggedinuser', (req, res) => {
    if (req.isAuthenticated()) {
        res.status(200).json(req.user)
        return;
    }
    res.status(403).json({
        message: 'Unauthorized'
    })
})

module.exports = authRoutes