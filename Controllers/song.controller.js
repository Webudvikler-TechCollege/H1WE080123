import Song from "../Models/song.model.js";

export default class SongController {
	constructor() {
		console.log('SongController instantiated');
	}

	/**
	 * Create Method
	 * @param {*} req 
	 * @param {*} res 
	 */
	create = async (req, res) => {
		const { title, content, is_active } = req.body;

		if(title && content && is_active) {
			const result = await Song.create(req.body);
			res.status(200).send({
				message: 'Record created',
				new_id: result.id
			})
		} else {
			res.status(403).send({
				message: 'Wrong parameter values'
			})
		}
	}
}