require("dotenv").config();
const express = require("express");

const PORT = process.env.PORT || 8000;
const app = express(); 
db();

app.use(express.json());

app.listen(PORT, () => {
    console.log(`Running on ${PORT}`);
})