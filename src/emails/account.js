const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    // host: "smtp.gmail.com",
    service: "gmail",
    port: 587,
    // secure: false,
    // requireTLS: true,
    auth: {
        user: "alqamashuja101@gmail.com",
        pass: "phryeklrzhvvwyeb"
    }
});



const sendWelcomeEmail = (email, name) => {
    const mailOptions = {
        from: "alqamashuja101@gmail.com",
        to: email,
        subject: "Thanks for visiting us",
        text: `Hello ${name}, hope you are doing well`
    }

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        }
        else {
            console.log("Mail has been Send " + info.response);
        }
    });
}

const cancelMessage = (email, name) => {
    const mailOptions = {
        from: "alqamashuja101@gmail.com",
        to: email,
        subject: "Good Bye " + name,
        text: `Hi ${name}, hope you are doing well, you deleted your account from Task Manager App.`
    }

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            // console.log();
        }
        else {
            console.log("Mail has been send " + info.response);
        }
    });
}



module.exports = {
    sendWelcomeEmail,
    cancelMessage
}

// phryeklrzhvvwyeb