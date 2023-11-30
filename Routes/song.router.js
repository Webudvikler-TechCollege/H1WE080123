import express from "express";
import SongController from "../Controllers/song.controller.js";

const router = express.Router()

// Kalder instans af klassen SongController
const controller = new SongController()

// List alle sange
router.get('/songs', (req,res) => {
	controller.list(req,res)
})

// Hent sang detaljer
router.get('/songs/:id([0-9]*)', (req,res) => {
	controller.details(req,res)
})

router.get('/songs/search/:keyword', (req,res) => {
	controller.search(req,res)
})

// Opretter ny sang
router.post('/songs', (req, res) => {
	controller.create(req,res)
})

// Opdaterer sang
router.put('/songs', (req, res) => {
	controller.update(req,res)
})

// Sletter sang
router.delete('/songs', (req, res) => {
	controller.delete(req,res)
})

export { router as SongRouter } 