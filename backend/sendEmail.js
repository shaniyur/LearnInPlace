let nodemailer = require('nodemailer');
let smtpTransport = require('nodemailer-smtp-transport');
let fs = require('fs');
let myEmail = 'learninplaceteam@gmail.com';

exports.sendFiles = function (req, res) {
    let username = req.body.tutor_email;
    let transport = nodemailer.createTransport(smtpTransport({
        service: "Gmail",
        host: 'smtp.gmail.com',
        auth: {
            user: myEmail,
            pass: 'Team2020'
        }
    }));

    let message = {
        from: myEmail,
        to: 'learninplaceteam@gmail.com',
        subject: 'Tutor details',
        text: 'Please find attached tutor details for vetting',
        attachments: [
            {
                path: './tempfiles/cv_' + username + '.pdf'
            }, {
                path: './tempfiles/transcript_' + username + '.pdf'
            }
        ]
    };

    transport.sendMail(message, function (err, info) {
        if (err) {
            console.log("Failed to send"+err);
            return;
        } else {
            console.log("Email sent" + info.response);
            // delete files 

            // delete file named 'sample.txt'
            fs.unlink('./tempfiles/cv_' + username + '.pdf', function (err) {
                if (err) {
                    throw err;
                }
                // if no error, file has been deleted successfully
                console.log('Transcript deleted from local!');
            });
            fs.unlink('./tempfiles/transcript_' + username + '.pdf', function (err) {
                if (err) {
                    throw err;
                }
                // if no error, file has been deleted successfully
                console.log('CV deleted from local!');
            });
        }
    });
}

exports.sendVerifyEmail = function (req, res) {
    let username = req.username;
    let token = req.token;
    let transport = nodemailer.createTransport(smtpTransport({
        service: "Gmail",
        host: 'smtp.gmail.com',
        auth: {
            user: myEmail,
            pass: 'Team2020'
        }
    }));

    let message = {
        from: myEmail,
        to: username,
        subject: 'Account Activation Link from LearnInPlace Team',
        html: `<h2>Please click on the link below to activate your account</h2>
                        <a href="../redirecthome.html">http://localhost:3000/authentication/activate/${token}</a>
                        `
    };

    transport.sendMail(message, function (err, info) {
        if (err) {
            console.log("Failed to send"+err);
            return;
        } else {
            console.log("Email sent" + info.response);
            res.sendFile("../redirecthome.html");
        }
    });
}