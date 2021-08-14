const express = require('express');
const router = express.Router();

//Importing controller file - announcement
const announcementController = require('../controllers/announcement-controller');

router.post('/add-announcement', announcementController.addAnnouncement);

router.get('/', announcementController.getAnnouncements);

router.get('/:id', announcementController.getAnnouncementByID);

router.delete('/:id', announcementController.deleteAnnouncement);

router.put('/:id', announcementController.updateAnnouncement);

module.exports = router;