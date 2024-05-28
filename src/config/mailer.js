const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "apainternacional.entradas@gmail.com",
    pass: "gfgo xdxz mcpm aczz",
  },
});

transporter.verify().then(() => {
  console.log("Ready for send emails");
});

const senMail = async (response) => {
  let msgHtml = `
  <!DOCTYPE html>
  <html>
  <head>
    <style>
      body {
        font-family: sans-serif;
        margin: 0;
        padding: 0;
      }
      .container {
        width: 100%;
        background: linear-gradient(90deg, rgba(0,158,224,1) 0%, rgba(9,9,121,1) 35%, rgba(229,0,126,1) 100%);
        color: white;
        text-align: center;
      }
      .content {
        max-width: 600px;
        margin: 0 auto;
        padding: 20px;
      }
      h1 {
        font-size: 5rem;
        margin: 0;
        line-height: 1.2;
      }
      h2 {
        font-size: 2rem;
        letter-spacing: 8px;
        margin: 0;
      }
      .code {
        background: rgba(255, 255, 255, 0.4);
        border-radius: 8px;
        padding: 10px;
        margin-top: 20px;
        backdrop-filter: blur(5px);
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        display: inline-block;
      }
    </style>
  </head>
  <body>
    <table class="container" role="presentation" cellpadding="0" cellspacing="0" width="100%">
      <tr>
        <td>
          <table class="content" role="presentation" cellpadding="0" cellspacing="0" width="100%">
            <tr>
              <td>
                <h1 style="color: white">APA <span style="color:#009ee2">20</span><span style="color:#e5007e">24</span></h1>
                <h2 style="color: white">INTERNACIONAL</h2>
                <p style="color: white">Presente el siguiente codigo para el ingreso:</p>
                <div class="code">
                ${response.description}: ${response.id}
                </div>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
  </html>
    `;

  await transporter.sendMail({
    from: '"Aqui esta tu entrada" <apainternacional.entradas@gmail.com>', // sender address
    to: "pablobojanich1@gmail.com", // TODO ==> response.user_email
    subject: "Aqui esta tu entrada - APA Internacional", // Subject line
    html: msgHtml,
  });

  await transporter.sendMail({
    from: '"Compra de entrada" <apainternacional.entradas@gmail.com>', // sender address
    to: "pablobojanich1@gmail.com", // TODO mail empresa
    subject: `${response.user_email} compro una entrada`, // Subject line
    html: msgHtml,
  });
};

module.exports = { senMail };
