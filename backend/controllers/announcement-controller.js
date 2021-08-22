const Announcement = require("../models/announcement");
const HttpError = require("../models/http-error");

const addAnnouncement = async (req, res, next) => {
  const createAnnouncement = new Announcement({
    title: req.body.title,
    date: req.body.date,
    content: req.body.content,
    priority: req.body.priority,
    validity: req.body.validity
  });
  try {
    await createAnnouncement.save();
    console.log("Data saved successfully in the DB....:)");
  } catch (err) {
    const error = new HttpError("Cannot add data to database :(....", 500);
    return next(error);
  }
};

const getAnnouncements = async (req, res, next) => {
  let announcements;
  try {
    announcements = await Announcement.find();
  } catch (err) {
    throw new HttpError("Fetching announcements failed, try again later", 500);
  }
  res.send({ message: "Data retreived successfully", announcements: announcements });
};

const deleteAnnouncement = async (req, res, next) => {
  const annID = req.params.id;
  try {
    await Announcement.findOneAndRemove({ _id: annID });
  } catch (err) {
    const error = new HttpError("Cannot find requested data...", 500);
    return error;
  }

  res.send({ message: "Announcement Deleted!" });
};

const getAnnouncementByID = async (req, res, next) => {
  const annID = req.params.id;
  let announcement;
  try {
    announcement = await Announcement.find({ _id: annID });
  } catch (err) {
    const error = new HttpError("Cannot finr the requested data..", 500);
    return error;
  }
  res.send({ message: "Data retreived successfully", data: announcement });
};

const updateAnnouncement = async (req, res, next) => {
  const annID = req.params.id;
  const { title, date, content, priority, validity } = req.body;
  let existingAnnouncement;
  try {
    existingAnnouncement = await Announcement.findOne({ _id: annID });
  } catch (err) {
    const error = new HttpError("Error occured", 500);
    return error;
  }
  if (!existingAnnouncement) {
    const error = new HttpError("Data not found", 401);
    return error;
  } else {
    existingAnnouncement.title = title;
    existingAnnouncement.date = date;
    existingAnnouncement.content = content;
    existingAnnouncement.priority = priority;
    existingAnnouncement.validity = validity;

    try {
      await existingAnnouncement.save();
    } catch (err) {
      const error = new HttpError('Failed to update data', 500);
      return error;
    }
    res.send({ message: 'Updated successfully', data: existingAnnouncement });
  }
}

module.exports = {
  addAnnouncement,
  getAnnouncements,
  deleteAnnouncement,
  getAnnouncementByID,
  updateAnnouncement
};

