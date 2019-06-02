const Event = require("../models/Event");

// db.collection("events")
//   .where("startAt", ">=", startAt)
//   .where("startAt", "<=", endAt);

function realDate(date) {
  return new Date(date).toDateString();
}

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
  const [startAt, endAt] = dates;
  console.log("New event startAt", realDate(startAt));
  // console.log("New event endAt", endAt);
  try {
    //check if there is an event at that venue
    // const existingEvent = await Event.findOne({
    //   "location.address": location.address,
    //   $or: [
    //     {}
    //   ]
    //   // startAt: { $lte: startAt }
    // });
    // if (existingEvent) {
    //   console.log("Existing event startAt", realDate(existingEvent.startAt));
    //   // console.log("Exisitng event endAt", existingEvent.endAt);
    //   return res.send(
    //     "There is already an event slated at this venue and time"
    //   );
    // }
    const event = new Event({
      title,
      details,
      startAt,
      endAt,
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
