const connection = require('../database/connection');

const index = (req, res) => {
    connection.query('SELECT * FROM movies', (error, results) => {
        if (error) {
            console.error(error);
            res.status(500).send('Error occurred while fetching movies');
        } else {
            res.json(results);
        }
    });
};

const show = (req, res) => {
    const id = parseInt(req.params.id);
    connection.query('SELECT * FROM movies WHERE id = ?', [id], (error, results) => {
        if (error) {
            console.error(error);
            return res.status(500).send('Error occurred while fetching movie');
        }
        if (results.length === 0) {
            return res.status(404).send('Movie not found');
        }
        const movie = results[0];
        connection.query(
            'SELECT * FROM reviews WHERE movie_id = ?', [id], (error, reviews) => {
                if (error) {
                    console.error(error);
                    return res.status(500).send('Error occurred while fetching reviews');
                }
                movie.reviews = reviews;
                res.json(movie);
            }
        );
    }
    );
};

const store = (req, res) => {
    const id = parseInt(req.params.id);
    const { name, vote, text } = req.body;
    const sql = 'INSERT INTO reviews (movie_id, name, vote, text) VALUES (?, ?, ?, ?)';
    connection.query(sql, [id, name, vote, text], (error, results) => {
        if (error) {

            return res.status(500).json('Error occurred while adding review');
        }
        res.status(201).json({ message: 'Review added successfully', reviewId: results.insertId });
    });
};

module.exports = {
    index,
    show,
    store
};