const Event = require("../models/Event");

exports.getEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.send(events);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
};

exports.createEvent = async (req, res) => {
  const { title, details, dates, location } = req.body;
  const start = new Date(dates[0]);
  const end = new Date(dates[1]);
  try {
    const existingEvent = await Event.find({
      "location.address": location.address,
      $or: [
        {
          start: { $lte: start },
          end: { $gte: start }
        },
        {
          start: { $lte: end },
          end: { $gte: end }
        },
        {
          start: { $gt: start },
          end: { $lt: end }
        }
      ]
    });
    if (existingEvent.length) {
      return res.send({
        message: "There is already an event slated at this venue and time",
        existingEvent: true
      });
    }
    const event = new Event({
      title,
      details,
      start,
      end,
      location: {
        address: location.address,
        coordinates: [location.coordinates.lng, location.coordinates.lat]
      }
    });
    await event.save();
    return res.send(event);
  } catch (error) {
    console.log(error);
    return res.send("There was an error", error);
  }
};
