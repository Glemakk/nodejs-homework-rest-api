const sgMail = require('@sendgrid/mail');

const { SENDGRID_KEY } = process.env;
sgMail.setApiKey(SENDGRID_KEY);

// const sendEmail = require('../../helpers')

const email = {
    to: "sespazorka@vusra.com",
    from: "kovgar.brand@gmail.com",
    subject: "New request from page with SendGrid",
    html: `<p><strong>Client e-mail:</strong> kovgar.brand@gmail.com</p>
            <p><strong>Client number:</strong> +48 555-555-555</p>`
};

sgMail.send(email)
    .then(() => console.log("Email success send"))
    .catch(error => console.log(error.message))