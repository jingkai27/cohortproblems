const express = require('express');
const deptmodel = require('../models/dept.js');
const staffmodel = require('../models/staff.js');
var router = express.Router();


router.get('/add/:code', async function (req, res, next) {
    const msg = req.params.code;
    const dept = new deptmodel.Dept(msg);
    await deptmodel.insertMany([dept]);
    res.send(`${JSON.stringify(dept)}`); // Send the new department as the response
});

/* GET dept listing. */
router.get('/all/', async function (req, res, next) {
    const depts = await deptmodel.all();
    res.send(`${JSON.stringify(depts)}`); // TODO: Fixme
});


router.get('/all/withstaff/', async function (req, res, next) {
    const depts = await deptmodel.all();
    for (let i = 0; i < depts.length; i++) {
        const staffs = await staffmodel.find({ dept: depts[i].code });
        depts[i].staffs = staffs;
    }
    res.send(`${JSON.stringify(depts)}`); // Send the list of depts with staff as the response
})
// desired output: [{ "code": "hr", "staffs": [{ "id": "1", "name": "aaron", "dept": "hr" }] }]

module.exports = router;
