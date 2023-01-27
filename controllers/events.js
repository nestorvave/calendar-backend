const { response } = require("express");

const getEvents = (request, response = response) => {
  return response.status(201).json({
    ok: true,
    msg:"get events"
  });
};

const createEvent = (request, response = response) => {
  return response.status(201).json({
    ok: true,
    msg:"create event"
  });
};
const updateEvent = (request, response = response) => {
  return response.status(201).json({
    ok: true,
    msg:"update event"
  });
};

const deleteEvent = (request, response = response) => {
  return response.status(201).json({
    ok: true,
    msg:"delete event"
  });
};




module.exports={
    getEvents,
    createEvent,
    updateEvent,
    deleteEvent
}