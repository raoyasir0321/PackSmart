const express = require('express')

const cors = require('cors')

const app = express()

const attachServices = require('./middlewares/contextmiddleware')

const error = require('./middlewares/errorMiddleware')

app.use(express.json({ limit: '10mb' }))

app.use(cors())

app.use("/api/images", express.static("images"), (req, res) => {
    res.status(404).send('Image not found');
});
app.use(attachServices);

require('./routes')(app)

app.use(error)

module.exports = app