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
                path: 'backend/tempfiles/cv_' + username + '.pdf' 
            }, {
                path: 'backend/tempfiles/transcript_' + username + '.pdf' 
            }
        ]
    };

    transport.sendMail(message, function (err, info) {
        if (err) {
            console.log("Failed to send");
            return;
        } else {
            console.log("Email sent" + info.response);
            // delete files 

            // delete file named 'sample.txt'
            fs.unlink('backend/tempfiles/cv_' + username + '.pdf', function (err) {
                if (err) {
                    throw err;
                }
                // if no error, file has been deleted successfully
                console.log('Transcript deleted from local!');
            }); 
            fs.unlink('backend/tempfiles/transcript_' + username + '.pdf', function (err) {
                if (err) {
                    throw err;
                }
                // if no error, file has been deleted successfully
                console.log('CV deleted from local!');
            }); 
        }
    });
}