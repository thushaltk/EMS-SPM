const mongoose = require("mongoose");

const announcementSchema = new mongoose.Schema({
  title: { type: String, required: true },
  date: { type: String, required: true },
  content: { type: String, required: true },
  priority: { type: String, required: true },
  validity: { type: String, required: true },
});

module.exports = mongoose.model('Announcement', announcementSchema);
