import express from "express";
import SongController from "../Controllers/song.controller.js";
const router = express.Router()
const controller = new SongController()

// List alle sange
router.get('/songs', (req,res) => {
	controller.list(req,res)
})

router.get('/songs/:id([0-9]*)', (req,res) => {
	controller.details(req,res)
})

export { router as SongRouter } 