const express = require('express');
const staffmodel = require('../models/staff.js');
const deptmodel = require('../models/dept.js');
var router = express.Router();


/* insert a staff, should have used POST instead of GET */
router.get('/add/:id/:name/:code', async function (req, res, next) {
    const msg = req.params;
    const staff = new staffmodel.Staff(msg.id, msg.name, msg.code);
    await staffmodel.insertMany([staff]);
    res.send(`${JSON.stringify(staff)}`); // Send the new staff as the response
});

/* GET staff listing. */

router.get('/all/', async function (req, res, next) {
    const staff = await staffmodel.all();
    res.send(`${JSON.stringify(staff)}`); // Send the list of staff as the response
});


module.exports = router;
