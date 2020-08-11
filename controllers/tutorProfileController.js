const Tutor = require('../models/Tutor');
const express = require('express');

exports.getTutorDetails = function(req, res) {
    let username = req.params.username;
    console.log(username);
    Tutor.findTutor(username, function(result) {
        if (result[0] === true && result[1] === true) {
            Tutor.getDetails(username, function(details) {
                if (details[0] === true) {
                    let link;
                    Tutor.getCalendlyLink(username, function(resultC) {
                        if (resultC[0] === true) {
                            link = resultC[1];
                        } else {
                            link = "No link found!";
                        }
                    });
                    res.status(200);
                    return res.json({
                        validFormat: true,
                        result: 'success',
                        firstName: result[1].firstName,
                        calendlyLink: link,
                        subjects: result[1].subjects,
                        availableHours: result[1].availableHours,
                        numberOfStudents: result[1].numberOfStudents
                    });
                } else {
                    return res.json({
                        validFormat: true,
                        result: 'fail',
                        message: 'Details not found'
                    });
                }
            })
        } else {
            res.status(200);
            console.log("User doesn't exist");
            return res.json({
                validFormat: true,
                result: 'fail',
                message: 'User doesn\'t exist'
            });
        }
    })
}