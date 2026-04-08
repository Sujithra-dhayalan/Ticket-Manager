// Controller for handling ticket-related operations 
// Importing the Ticket model to interact with the database
const Ticket = require("../models/ticket-model");

// Function to add a new ticket
const add_ticket = async (req, res) => {
    try {

        const existing = await Ticket.findOne({
            subject: req.body.subject,
            message: req.body.message
        });

        if (existing) {
            return res.status(400).json({
                message: "Duplicate! ticket already exists."
            });
        }
        const newTicket = new Ticket({
            subject: req.body.subject,
            message: req.body.message,
            priority: req.body.priority,
            status: req.body.status,
            assignedTo: req.body.assignedTo
        })
        const result = await newTicket.save()
        if (result) {
            res.status(200).json({
                success: true,
                message: "Ticket added successfully",
                data: result
            })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Internal Server Error" });
    }
}

// Function to retrieve all tickets
const get_tickets = async (req, res) => {
    try {
        const ticketList = await Ticket.find();
        res.status(200).json({
            success: true,
            message: "Ticket added successfully",
            data: ticketList
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

// Function to update the status of a ticket
    const update_ticket = async (req, res) => {
        try {
            const editTicket = await Ticket.findOneAndUpdate(
                { _id: req.params.id },
                {
                    status: req.body.status,
                },
                { new: true } // To return the updated document
            );
            if (!editTicket) {
                return res.status(404).send({ error: "Ticket not found" });
            }
            res.status(200).send({ message: "Ticket edited successfully", data: editTicket });
        } catch (error) {
            console.error(error.message);
            res.status(500).send({ error: "Server error" });
        }
    }

module.exports = {
    add_ticket,
    get_tickets,
    update_ticket
}

