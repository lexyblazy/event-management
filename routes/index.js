const express = require("express");
const router = express.Router();
const { createEvent, getEvents } = require("../controllers/eventControllers");

router.get("/events", getEvents);

router.post("/events", createEvent);

module.exports = router;
