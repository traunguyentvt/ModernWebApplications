

const studentData = require("../data/school.json");

const StudentsController = {
    getAll : function(req, res) {
        console.log("GET All received");
        let offset = 0;
        let count = 0;
        if (req.query && req.query.offset) {
            offset = parseInt(req.query.offset);
        }
        if (req.query && req.query.count) {
            count = parseInt(req.query.count);
        }
        const pageStudents = studentData.slice(offset, offset+count);
        res.status(parseInt(process.env.HTTP_RESPONSE_OK)).json(pageStudents);
    },
    getStudent : function(req, res) {
        let studentIndex = parseInt(req.params.studentIndex);;
        console.log("studentIndex =", studentIndex);
        const size = studentData.length;
        if (size == 0 || studentIndex < 0 || studentIndex >= size) {
            res.status(parseInt(process.env.HTTP_RESPONSE_OK)).json({message : process.env.MESSAGE_CANNOT_FOUND_ITEM_INDEX});
        } else {
            res.status(parseInt(process.env.HTTP_RESPONSE_OK)).json(studentData[studentIndex]);
        }
    }
};

module.exports = StudentsController;
