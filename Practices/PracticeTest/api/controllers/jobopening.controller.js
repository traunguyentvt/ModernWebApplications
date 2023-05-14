const mongoose = require("mongoose");
const Jobopening = mongoose.model("Jobopening");

module.exports.getAll = function(req, res) {
    let offset = 0;
    let count = 20;
    if (req.query && req.query.offset) {
        offset = parseInt(req.query.offset, 10);
    }
    if (req.query && req.query.count) {
        count = parseInt(req.query.count, 10);
    }
    if (isNaN(offset) || isNaN(count)) {
        res.status(500).json({message:"QueryString offset & count should be numbers"});
        return;
    }
    const maxCount = 50;
    if (count > 50) {
        res.status(500).json({message:"Cannot exceed of the count " + maxCount});
        return;
    }
    Jobopening.find().skip(offset*count).limit(count).exec().then(function(jobopenings) {
        res.status(200).json(jobopenings);
    }).catch(function(error) {
        res.status(500).json(error);
    });
}

module.exports.getOne = function(req, res) {
    let jobopeningId;
    if (req.params && req.params.jobopeningId) {
        jobopeningId = req.params.jobopeningId;
    }
    if (!jobopeningId) {
        res.status(500).json({message:"Missing jobopeningId"});
        return;
    }
    Jobopening.findById(jobopeningId).exec().then(function(jobopening) {
        if (!jobopening) {
            res.status(404).json({message:"Can not find this jobopeningId"});
        } else {
            res.status(200).json(jobopening);
        }
    }).catch(function(error) {
        res.status(500).json(error);
    })
}

module.exports.addOne = function(req, res) {
    if (!req.body) {
        res.status(400).json({message:"Missing parameters"});
        return;
    }
    const jobopening = {
        title: req.body.title,
        salary: parseFloat(req.body.salary, 10),
        location: req.body.location,
        skills: req.body.skills,
        description: req.body.description,
        experience: req.body.experience,
        postDate: req.body.postDate
    };
    console.log(jobopening);
    Jobopening.create(jobopening).then(function(savedJobopening) {
        if (!savedJobopening) {
            res.status(500).json({message:"Can not create new jobopening"});
        } else {
            res.status(201).json(savedJobopening);
        }
    }).catch(function(error) {
        res.status(500).json(error);
    });
}

module.exports.fullUpdateOne = function(req, res) {
    let jobopeningId;
    if (req.params && req.params.jobopeningId) {
        jobopeningId = req.params.jobopeningId;
    }
    if (!jobopeningId) {
        res.status(500).json({message:"Missing jobopeningId"});
        return;
    }
    if (!req.params) {
        res.status(500).json({message:"Missing parameters"});
        return;
    }
    
    Jobopening.findById(jobopeningId).exec().then(function(jobopening) {
        if (!jobopening) {
            res.status(500).json({message:"Cannot find this jobopeningid"});
            return;
        }
        jobopening.title = req.body.title;
        jobopening.salary = parseFloat(req.body.salary, 10);
        jobopening.location = req.body.location;
        jobopening.skills = req.body.skills;
        jobopening.description = req.body.description;
        jobopening.experience = req.body.experience;
        jobopening.postDate = req.body.postDate;

        jobopening.save().then(function(savedJobopening) {
            res.status(200).json(savedJobopening);
        }).catch(function(error) {
            res.status(500).json({message:"can not update this jobopening"});
        });
    }).catch(function(error) {
        res.status(500).json(error);
    });
}

module.exports.deleteOne = function(req, res) {
    let jobopeningId;
    if (req.params && req.params.jobopeningId) {
        jobopeningId = req.params.jobopeningId;
    }
    if (!jobopeningId) {
        res.status(404).json({message:"Missing jobopeningid"});
        return;
    }
    Jobopening.findByIdAndDelete(jobopeningId).exec().then(function(jobopening) {
        if (!jobopening) {
            res.status(404).json({message:"can not find this jobopening"});
        } else {
            res.status(200).json(jobopening);
        }
    }).catch(function(error) {
        res.status(500).json(error);
    });
}