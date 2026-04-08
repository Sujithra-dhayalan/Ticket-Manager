const express = require("express");
const router = express.Router(); 
const {add_ticket, get_tickets, update_ticket} = require("../controllers/ticket-controller");

// Defining routes for ticket operations
router.post("/tickets", add_ticket); 
router.get("/tickets", get_tickets); 
router.patch("/tickets/:id", update_ticket); 

module.exports = router; 