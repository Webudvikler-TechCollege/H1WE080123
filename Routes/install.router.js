import express from "express";
import sequelize from "../Config/sequelize.config.js";

import Song from "../Models/song.model.js";

const router = express.Router();

router.get("/install", async (req, res) => {
	try {
		await sequelize.sync()
		res.sendStatus(200)
	} catch (error) {
		res.send(error)
	}
})

export { router as InstallRouter }
