const { response } = require("express");
const Event = require("../models/Event");

const getEvents = async (request, response = response) => {
  const events = await Event.find().populate("user", "name");
  try {
    return response.status(200).json({
      ok: true,
      msg: events,
    });
  } catch (error) {
    return response.status(201).json({
      ok: false,
      msg: "Servicios no disponibles",
    });
  }
};

const createEvent = async (request, response = response) => {
  const event = new Event(request.body);
  try {
    event.user = request.uid;
    const saveEvent = await event.save();
    return response.status(200).json({
      ok: true,
      msg: saveEvent,
    });
  } catch (error) {
    return response.status(500).json({
      ok: false,
      msg: "Bad request",
    });
  }
};

const updateEvent = async (request, response = response) => {
  const eventId = request.params.id;
  const uid = request.uid;

  try {
    const event = await Event.findById(eventId);
    if (!event) {
      return response.status(404).json({
        ok: false,
        msg: "Event no found",
      });
    }

    if (event.user.toString() !== uid) {
      return response.status(401).json({
        ok: false,
        msg: "User does not has permission",
      });
    }

    const newData = {
      ...request.body,
      user: uid,
    };
    const updatedEvent = await Event.findByIdAndUpdate(eventId, newData, {
      new: true,
    });
    return response.status(200).json({
      ok: true,
      msg: "event updated",
      updatedEvent,
    });
  } catch (error) {
    return response.status(500).json({
      ok: false,
      msg: "Servicios no disponibles",
    });
  }
};

const deleteEvent = async (request, response = response) => {
  const eventId = request.params.id;

  try {
    const event = await Event.findById(eventId);
    const uid = request.uid;
    if (!event) {
      return response.status(404).json({
        ok: false,
        msg: "Event no found",
      });
    }
    if (event.user.toString() !== uid) {
      return response.status(401).json({
        ok: false,
        msg: "User does not has permission",
      });
    }
    await Event.findByIdAndDelete(eventId);
    return response.status(200).json({
      ok: true,
      msg: "Evento borrado",
    });
  } catch (error) {
    return response.status(500).json({
      ok: false,
      msg: "Servicios no disponibles",
    });
  }
};

module.exports = {
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent,
};
