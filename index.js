import express from 'express'
import dotenv from 'dotenv'
import { SongRouter } from './Routes/song.router.js'
import { InstallRouter } from './Routes/install.router.js'
dotenv.config()
const app = express()

// Udvider app i index.js så vi kan læse form body data
app.use(express.urlencoded({ extended: true }))

app.use(SongRouter,InstallRouter)

app.listen(process.env.PORT, () => {
	console.log(`Server kører på port http://localhost:${process.env.PORT}`);
})