import db from '../Config/db.config.js'

class SongController {
	constructor() {
		console.log('Class SongController instantiated');
	}

	/**
	 * List Method - List all songs
	 * @param {object} req 
	 * @param {object} res 
	 */
	list = (req,res) => {
		// SQL Query med json return
		const sql = `SELECT s.id, s.title, a.name 
						FROM song s 
						JOIN artist a 
						ON s.artist_id = a.id`
		db.query(sql, (error,result) => {
			if(error) {
				console.error(error);
			} else {
				return res.json(result)
			}
		})
	}

	/**
	 * Details Method - List single song
	 * @param {object} req Request Object
	 * @param {object} res Response Object
	 */
	details = (req,res) => {
		// Destructuring assignment - henter id fra URL param
		const { id } = req.params
		// SQL Query med value markers (?) og json return
		// Value marker (?) markerer dynamiske værdier som 
		// sendes med query som et array - Eksempel: [id]
		const sql = `SELECT s.id, s.title, s.content, 
								s.artist_id, a.name 
						FROM song s 
						JOIN artist a 
						ON s.artist_id = a.id 
						WHERE s.id = ?`
		db.query(sql, [id],(error,result) => {
			console.error(error);
			return res.json(result)
		})
	}

	/**
     * Search Method - Search songs by title or content
     * @param {object} req Request Object
     * @param {object} res Response Object
     */
	search = (req,res) => {
		// Destructuring assignment - henter keyword fra URL param
		const { keyword } = req.query

		// SQL Query med value markers (?) og json return
		const sql = `SELECT s.id, s.title, s.content, 
                                s.artist_id, a.name 
                        FROM song s 
                        JOIN artist a 
                        ON s.artist_id = a.id 
						WHERE s.title LIKE ? 
						OR s.content LIKE ? 
						OR a.name LIKE ?`

		// Fikser søgesteng så den kan indgå i ord
		const fixed_keyword = '%'+keyword+'%'

		db.query(sql, [fixed_keyword,fixed_keyword,fixed_keyword], (error,result) => {
			if(error) throw error
            return res.json(result)
		})
	}

	/**
	 * Create Method - Create a new song
	 * @param {object} req Request Object
	 * @param {object} res Response Object
	 */
	create = (req, res) => {
		// Destructure assignment - henter værdier fra Form Body
		const { title, content, artist_id } = req.body
		// SQL Statement med value markers (?)
        const sql = `INSERT INTO song (title, content, artist_id) 
                        VALUES (?,?,?)`
        db.query(sql, [title,content,artist_id], (error,result) => {
			if(error) throw error
			// Returnerer json med nyeste id
			return res.json({
				message: 'New song created',
				newId: result.insertId
			})
        })
	}

	/**
	 * Update Method - Update a song
	 * @param {*} req Request Object
	 * @param {*} res Response Object
	 */
	update = (req, res) => {
		// Destructure assignment - henter værdier fra Form Body
		const { id, title, content, artist_id } = req.body
		// SQL Statement med value markers (?)
        const sql = `UPDATE song 
						SET title = ?, content =?, artist_id = ? 
                        WHERE id = ?`
        db.query(sql, [title,content,artist_id,id], (error,result) => {
			if(error) {
				console.log(error)
			} else {
				// Returnerer json med nyeste id
				return res.json({
					message: 'Song Updated'
				})
			}
        })
	}

	/**
     * Delete Method - Delete a song
     * @param {*} req Request Object
     * @param {*} res Response Object
     */
	delete = (req, res) => {
		// Destructure assignment - henter værdier fra Form Body
        const { id } = req.body
        
		const sql = `DELETE FROM song WHERE id = ?`
		db.query(sql, [id], (error,result) => {
			if(error) {
                console.log(error)
            } else {
                // Returnerer json med nyeste id
                return res.json({
                    message: 'Song Deleted'
                })
            }
		})
	}
}

export default SongController