require('dotenv').config()

const http = require('http');

const app = require('./app');

const { connectdb } = require('./DB');

const port = process.env.PORT || 8000;

const server = http.createServer(app);

connectdb().then(() => {
    server.listen(port, () => {
        console.log(`Server running on port ${port}`);
    })
}).catch(error => console.log(error))