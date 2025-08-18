import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import morgan from 'morgan'
import bodyParser from 'body-parser'
import config from './config/config.js'
import router from './router/router.js'
import connectDatabase from './database/databaseConfig.js'

dotenv.config()

const PORT = config.port

connectDatabase()

const app = express()

app.use(
	cors({
		origin: true,
		credentials: true,
		exposedHeaders: ['Authorization'],
	})
)

// morgan 설정
if (process.env.NODE_ENV === 'production') {
	app.use(morgan('combined'))
} else {
	app.use(morgan('dev'))
}

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(router)

app.listen(PORT, () => {
	console.log(
		`Backend Server on Listening on port ${PORT}. Check http://localhost:${PORT}/ `
	)
})
