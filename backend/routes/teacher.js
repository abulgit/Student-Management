const router = require("express").Router();
const Student = require("../models/Student");

router.route("/add").post(async (req, res) => {
    try {
        const { firstName, lastName, rollNumber, regNumber, age, gender, address, contactNumber } = req.body;

        const newStudent = new Student({
            firstName,
            lastName,
            rollNumber: Number(rollNumber),
            regNumber: Number(regNumber),
            age: Number(age),
            gender,
            address,
            contactNumber: Number(contactNumber)
        });

        await newStudent.save();
        res.status(200).json({ status: "success", message: "Student Added." });
    } catch (err) {
        console.log(err);
        res.status(500).json({ status: "error", message: "Error with saving data" });
    }
});

router.route("/update/:id").put(async (req, res) => {
    try {
        let userId = req.params.id;
        const { firstName, lastName,rollNumber, regNumber, age, gender, address, contactNumber } = req.body;

        const updateStudent = {
            firstName,
            lastName,
            rollNumber: Number(rollNumber),
            regNumber: Number(regNumber),
            age: Number(age),
            gender,
            address,
            contactNumber: Number(contactNumber)
        };
        const update = await Student.findByIdAndUpdate(userId, updateStudent);
        res.status(200).send({status: "User Updated"});
    } catch (err) {
        console.log(err);
        res.status(500).send({status: "Error with updating data"});
    }
});

router.route("/delete/:id").delete(async (req, res) => {
    try {
        let rollNo = req.params.id;

        await Student.findOneAndDelete({ rollNo });

        res.status(200).send({status: "User Deleted"});
    } catch (err) {
        console.log(err.message);
        res.status(500).send({status: "Error with Deleting data", error: err.message});
    }
});

router.route("/get/:id").get(async (req, res) => {
    try {
        let rollNumber = req.params.id;
        const user = await Student.findOne({rollNumber});
        if(!user){
            return res.status(404).json({message : "Laura"})
        }
        res.json(user);
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ status: "Error with Fetching data", error: err.message });
    }
});

router.route("/count").get(async (req, res) => {
    try {
        const count = await Student.countDocuments();
        res.status(200).send({status: "Successfully Counted", count: count});
    } catch (err) {
        console.log(err.message);
        res.status(500).send({status: "Error with Counting Data", error: err.message});
    }
});


module.exports = router;