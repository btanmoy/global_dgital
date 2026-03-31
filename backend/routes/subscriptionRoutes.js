const express = require("express");
const router = express.Router();

let subscriptions = [
  {
    id: 1,
    softwareName: "CloudIDE Pro",
    monthlyCost: 25.0,
    totalSeats: 5,
    assignments: [
      { seatId: "A1", user: "Alice Chen", status: "Active" },
      { seatId: "A2", user: "Bob Smith", status: "Active" },
      { seatId: "A3", user: "Unassigned", status: "Available" },
      { seatId: "A4", user: "Charlie Day", status: "Active" },
      { seatId: "A5", user: "Unassigned", status: "Available" },
    ],
  },
  {
    id: 2,
    softwareName: "DesignFlow UI",
    monthlyCost: 45.0,
    totalSeats: 2,
    assignments: [
      { seatId: "B1", user: "Alice Chen", status: "Active" },
      { seatId: "B2", user: "Dana White", status: "Active" },
    ],
  },
]; // this can be written in separate file allthough I take the data in here directly for my convenience

router.get("/subscriptions", (req, res) => {
  res.json(subscriptions);
});

router.put("/subscriptions/:id/seats/:seatId", (req, res) => {
  const { id, seatId } = req.params;
  const { newUser } = req.body;

  const subscription = subscriptions.find((s) => s.id == id);

  if (!subscription) {
    return res.status(404).json({ message: "Subscription not found" });
  }

  const seat = subscription.assignments.find((a) => a.seatId === seatId);

  if (!seat) {
    return res.status(404).json({ message: "No seat found" });
  }

  seat.user = newUser;
  seat.status = newUser === "Unassigned" ? "Available" : "Active";

  res.json({ message: "Updated", subscription });
});

module.exports = router;
