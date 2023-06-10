const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const initDatabase = require('./configs/initDatabase');
const router = require('./routes');

app.use(cors({
    origin: ['http://localhost:3000'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'Origin', 'X-Requested-With', 'Accept', 'Cookie'],
    credentials: true,
    allowedHeaders: ['Content-Type, X-Authorization'],
    optionsSuccessStatus: 200,
}));
app.use(cookieParser());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(router);

const PORT = 7070 || process.env.PORT;
app.listen(PORT, () => console.log(`Server listening on localhost:${PORT}`));
initDatabase()
    .then(() => console.log('Database working!'))
    .catch((e) => console.log('Database Error: ' + e))