const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD
  }
});

exports.sendEmail = async (to, subject, text, firstName, lastName, password) => {
  const mailOptions = {
    from: process.env.EMAIL,
    to,
    subject,
    html: `
      <p>Welcome ${firstName} ${lastName}. Your login password is: ${password}</p>
      <p>Login <a href="http://localhost:3000/login">here</a></p>
    ` 
  };

  await transporter.sendMail(mailOptions);
};
