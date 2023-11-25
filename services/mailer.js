var nodemailer = require("nodemailer");
var ejs = require("ejs");
const transporter = nodemailer.createTransport({
  host: "mail.nyv.ch",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.emailUser, // generated ethereal user
    pass: process.env.emailPassword, // generated ethereal password
  },
});

exports.activationEmail = function(email, adminName,firstName){
    try {
      const filename = process.cwd() + "/emailTemplates/activation.ejs";
    ejs.renderFile(filename,{adminName: adminName, firstName: firstName}, (error, mailHTML) => {
      const mailOptions = {
        from: process.env.emailUserName, // Sender address
        to: email, // List of recipients //email
        subject: "Fitness 100", // Subject line
        html: mailHTML,
        text: "Du wurdest auf "+process.env.appUrlNice+" freigeschaltet!"
      };
      transporter.sendMail(mailOptions, (err, response) => {
          if (!err) {
            return true
          }else{
              console.log(err)
            return false
          }
        });
    });
    
  } catch (error) {
      console.log(error)
      return false
  }
  }


  exports.passwordReset = function(email,firstName,token){
    try {
      const filename = process.cwd() + "/emailTemplates/passwordForgotten.ejs";
    ejs.renderFile(filename,{link: process.env.appUrl+"/passwordForgotten/"+token, firstName: firstName}, (error, mailHTML) => {
      const mailOptions = {
        from: process.env.emailUserName, // Sender address
        to: email, // List of recipients //email
        subject: "Fitness100 Passwort", // Subject line
        html: mailHTML,
        text: "Mit diesem Link kannst Du Dein Passwort zurücksetzen: "+process.env.appUrl+"/passwordForgotten/"+token,
      };
      transporter.sendMail(mailOptions, (err, response) => {
          if (!err) {
            return true
          }else{
              console.log(err)
            return false
          }
        });
    });
    
  } catch (error) {
      console.log(error)
      return false
  }
  }
