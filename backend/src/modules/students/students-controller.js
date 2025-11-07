const asyncHandler = require("express-async-handler");
const { getAllStudents, addNewStudent, getStudentDetail, setStudentStatus, updateStudent } = require("./students-service");

const handleGetAllStudents = asyncHandler(async (req, res) => {
    const params = req.query;
    const students = await getAllStudents(params);
    res.json({ students });
});

const handleAddStudent = asyncHandler(async (req, res) => {
    const payload = req.body;
    const message = await addNewStudent(payload);
    res.json(message);
});

const handleUpdateStudent = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const payload = {
        ...req.body,
        userId: id
    };
    const message = await updateStudent(payload);
    res.json(message);
});

const handleGetStudentDetail = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const message = await getStudentDetail(id);
    res.json(message);
});

const handleStudentStatus = asyncHandler(async (req, res) => {
    const user = req.user
    const { id } = req.params;
    const { status } = req.body
    const message = await setStudentStatus({userId: id, reviewerId: user.id, status});
    res.json(message);
});

module.exports = {
    handleGetAllStudents,
    handleGetStudentDetail,
    handleAddStudent,
    handleStudentStatus,
    handleUpdateStudent,
};
