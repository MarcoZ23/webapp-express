
const index = (req, res) => {
    res.send('You requested all mobies');
};

const show = (req, res) => {
    const id = parseInt(req.params.id);
    res.send(`You requested mobie with ID: ${id}`);
}

module.exports = {
    index,
    show
};