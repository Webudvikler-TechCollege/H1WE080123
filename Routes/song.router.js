import express from "express";
import sequelize from "../Config/sequelize.config.js";
import SongController from "../Controllers/song.controller.js";
const router = express.Router()
const controller = new SongController()

router.get('/songs', (req, res) => {

})

router.post('/songs', (req, res) => {
	controller.create(req,res)
})

export { router as SongRouter }
