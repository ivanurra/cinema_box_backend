require('dotenv').config()

const bodyParser    = require('body-parser')
const cookieParser  = require('cookie-parser')
const express       = require('express')
const favicon       = require('serve-favicon')
const mongoose      = require('mongoose')
const logger        = require('morgan')
const path          = require('path')
const session       = require('express-session')
const passport      = require('passport')
const LocalStrategy = require('passport-local').Strategy
const bcrypt        = require('bcryptjs')
const cors          = require("cors")
const flash         = require("connect-flash")
const cookieSession = require('cookie-session')

const User = require('./models/User')

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URL, {useNewUrlParser: true, useUnifiedTopology:true, useCreateIndex:true, useFindAndModify:false})
  .then(x => {
    console.log(`Connected to MongoDB Atlas! Database name: "${x.connections[0].name}"`)
  })
  .catch(err => {
    console.error('Error connecting to MongoDB Atlas', err)
  })

const app_name = require('./package.json').name;
const debug = require('debug')(`${app_name}:${path.basename(__filename).split('.')[0]}`)

const app = express()

// Middleware Setup
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(cookieParser())

// Express View engine setup

app.use(require('node-sass-middleware')({
  src:  path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  sourceMap: true
}));

//////////////////////////////////////////////////////////////////////////////////////////////
// IMPORTANT: In origin you must indicate URL of your FRONTEND, either localhost or online. //
//////////////////////////////////////////////////////////////////////////////////////////////
app.use(cors({
  credentials: true,
  origin: ["http://localhost:3001","https://cinemabox.netlify.app"]
}))

app.use((req, res, next)=>{
  res.locals.user = req.user
  next()
})

app.set('trust proxy', 1)
app.use(cookieSession({
    name:'session',
    keys: ['key1', 'key2'],
    sameSite: 'none',
    secure: true
}))

// Middleware de Session
app.use(session({ 
  secret: 'ourPassword',
  resave: true, 
  saveUninitialized: true,
  cookie: {
    sameSite: 'none',
    secure: true
}
}))

//Middleware para serializar al usuario
passport.serializeUser((user, callback) => {
	callback(null, user._id)
})

//Middleware para des-serializar al usuario
passport.deserializeUser((id, callback) => {
	User.findById(id).then((user) => callback(null, user)).catch((err) => callback(err))
})

app.use(flash())

//Middleware del Strategy
passport.use(
	new LocalStrategy({ 
    usernameField : 'username',
    passwordField : 'password',
    passReqToCallback : true 
  }, 
  (req, username, password, next) => {
		User.findOne({ username })
			.then((user) => {
				if (!user) {
					return next(null, false, { message: 'Incorrect username' })
				}

				if (!bcrypt.compareSync(password, user.password)) {
					return next(null, false, { message: 'Incorrect password' })
				}

				return next(null, user)
			})
			.catch((err) => next(err))
	})
)

//Middleware de passport
app.use(passport.initialize())
app.use(passport.session())

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'hbs')
app.use(express.static(path.join(__dirname, 'public')))
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')))

// default value for title local
app.locals.title = 'CINEMABOX'

const index = require('./routes/index')
app.use('/', index);

const authRoutes = require('./routes/auth-routes')
app.use('/', authRoutes);

const moviesRoutes = require('./routes/movies-routes')
app.use('/', moviesRoutes);

module.exports = app;

