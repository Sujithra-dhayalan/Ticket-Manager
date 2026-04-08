require("dotenv").config();
const cors = require("cors");
const express = require("express");
const {db} = require("./config/db");
const ticketRoute = require("./routes/ticket-route");
const PORT = process.env.PORT || 8000;
const app = express(); 
db();

app.use(cors());
app.use(express.json());
app.use("/api", ticketRoute);

app.listen(PORT, () => {
    console.log(`Running on ${PORT}`);
})