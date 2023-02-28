// if (process.env.NODE_ENV !== 'production') {
//     require('dotenv').config();
// }
const PORT = 3002;
import express from 'express';
import cors from 'cors';
import multer from "multer";
import path from "path";
import methodOverride from "method-override";
import morgan from "morgan";
import connectToDb from "./database/dbConnection.js";
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import bodyParser from "body-parser";
const upload = multer({ dest: 'uploads/' });

// initialize express app
const app = express();

// middlewares
app.use(cors());
// parser for formdata post req
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// logging http requests on server terminal
app.use(morgan('tiny'));
// stack not exposed to hackers
app.disable("x-powered-by");
//configuring request body parsing
app.use(express.urlencoded({ extended: true }));
//configuring http verbs
app.use(methodOverride('_method'));
// configuring static files
// app.use(express.static(path.join(__dirname, 'public')));

// middleware for setting response headers
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, PATCH, DELETE, OPTIONS"
    );
    next();
});

connectToDb().then(() => {
    console.log("Database Connected!!");
    try {
        app.listen(PORT, () => {
            console.log(`Connected to server, listening to port: ${PORT}`);
        });
    } catch (error) {
        console.log("Connection to server failed!!");
    }
}).catch(e => console.error(e, "connection error"))

app.get('/', (req, res) => {
    res.send("Home");
})

//  middleware routes
app.use('/api', authRoutes);
app.use('/api/user', userRoutes);