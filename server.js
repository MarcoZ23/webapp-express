const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const mobiesRouter = require('./routes/mobies');


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

app.get('/', (req, res) => {
    res.send('Hello World!');
});


app.use('/api/mobies', mobiesRouter);