const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();
const port = 3000;

// Parse incoming request bodies in a middleware before your handlers
app.use(bodyParser.urlencoded({ extended: true }));

// Serve the static files
app.use(express.static('public'));

app.post('/send-email', (req, res) => {
  const { name, phone, address, complaint, email } = req.body;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'kotipalligunasatya915@gmail.com',
      pass: '9010106039'
    }
  });

  const mailOptions = {
    from: 'kotipalligunasatya915@gmail.com',
    to: email,
    subject: 'New contact form submission',
    html: `
      <h1>New contact form submission</h1>
      <p>Name: ${name}</p>
      <p>Phone: ${phone}</p>
      <p>Address: ${address}</p>
      <p>Complaint: ${complaint}</p>
    `
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).send('Error sending email');
    } else {
      console.log('Email sent: ' + info.response);
      res.status(200).send('Email sent successfully');
    }
  });
});

app.listen(port, () => console.log(`Server listening on port ${port}`));
