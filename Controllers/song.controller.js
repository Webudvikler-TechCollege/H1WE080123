import db from '../Config/db.config.js'

class SongController {
	constructor() {
		console.log('Class SongController instantiated');
	}

	list = (req,res) => {
		console.log('Hent alle sange');
		const sql = `SELECT s.id, s.title, a.name 
						FROM song s 
						JOIN artist a 
						ON s.artist_id = a.id`
		db.query(sql, (error,result) => {
			return res.json(result)
		})
	}

	details = (req,res) => {
		console.log('Hent detaljer');
		const { id } = req.params
		const sql = `SELECT s.id, s.title, s.content, 
								s.artist_id, a.name 
						FROM song s 
						JOIN artist a 
						ON s.artist_id = a.id 
						WHERE s.id = ${id}`
		db.query(sql, (error,result) => {
			console.error(error);
			return res.json(result)
		})
	}

	create = (req, res) => {
		const { title, content, artist_id } = req.body
        const sql = `INSERT INTO song (title, content, artist_id) 
                        VALUES (?,?,?)`
        db.query(sql, [title,content,artist_id], (error,result) => {
			if(error) {
				console.log(error)
			} else {
				return res.json({
					message: 'New song created',
					newId: result.insertId
				})
			}
        })
	}
}

export default SongController