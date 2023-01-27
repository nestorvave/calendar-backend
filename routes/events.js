/**
 * Events Routes
 * /api/events
 */

const { Router } = require("express");
const {
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent,
} = require("../controllers/events");
const { validateJWT } = require("../middlewares/validate-jwt");

const router = Router();
router.use(validateJWT);

//get Events

router.get("/", getEvents);

router.post("/", createEvent);
router.put("/:id", updateEvent);
router.delete("/:id", deleteEvent);

module.exports = router;
