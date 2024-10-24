const router = require("express").Router();
const Student = require("../models/Student");

router.route("/add").post(async (req, res) => {
    try {
        const { firstName, lastName, regNumber,deptName,year, age, gender, address, contactNumber } = req.body;

        const newStudent = new Student({
            firstName,
            lastName,
            regNumber: Number(regNumber),
            deptName,
            year,
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
        const { firstName, lastName, regNumber, age, gender, address, contactNumber } = req.body;

        const updateStudent = {
            firstName,
            lastName,
            regNumber: Number(regNumber),
            deptName,
            year,
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
        let userId = req.params.id;

        await Student.findByIdAndDelete(userId);

        res.status(200).send({status: "User Deleted"});
    } catch (err) {
        console.log(err.message);
        res.status(500).send({status: "Error with Deleting data", error: err.message});
    }
});

router.route("/get/:id").get(async (req, res) => {
    try {
        let userId = req.params.id;
        const user = await Student.findById(userId);
        res.status(200).send({ status: "User Fetched", user: user });
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ status: "Error with Fetching data", error: err.message });
    }
});
router.post("/login", async (req, res) => {
    try {
        const { regNumber } = req.body;
        const student = await Student.findOne({ regNumber });
        if (!student) {
            return res.status(403).json({ message: 'Auth failed, registration number is wrong', success: false });
        }
        res.status(200).json({ message: "Login Success", success: true, regNumber, name: student.firstName });
    } catch (err) {
        res.status(500).json({ message: "Internal server error", success: false });
    }
});

router.route("/").get(async (req, res) => {
    try {
        const students = await Student.find();
        res.json(students);
    } catch (err) {
        console.log(err);
        res.status(500).send({status: "Error with fetching data"});
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