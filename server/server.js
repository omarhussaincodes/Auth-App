if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}
const PORT = 3002;
const express = require('express');


// initialize express app
const app = express();

app.listen(PORT, () => {
    console.log(`Connected to server, listening to port: ${PORT}`);
})