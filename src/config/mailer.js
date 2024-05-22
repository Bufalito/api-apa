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
  let msgHtml = `<section
  style="
    width: 100%;
    background: rgb(0,158,224);
    background: linear-gradient(90deg, rgba(0,158,224,1) 0%, rgba(9,9,121,1) 35%, rgba(229,0,126,1) 100%);
    font-family: sans-serif;
  "
>
  <div
    style="
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      height: 100%;
    "
  >
    <div style="display: flex">
      <span>
        <h1
          style="
            color: white;
            font-size: 5rem;
            text-shadow: 0px 2px 5px rgba(0, 0, 0, 0.5);
            margin: 0;
            line-height: 60px;
          "
        >
          APA <span style="color: #009ee2">20</span
          ><span style="color: #e5007e">24</span>
        </h1>
        <h2
          style="color: white; font-size: 2rem; letter-spacing: 8px; margin: 0"
        >
          INTERNACIONAL
        </h2>
      </span>
    </div>
    <div style="color: white">
      <p style="color: white">Presente el siguiente codigo para el ingreso:</p>
      <p
        style="
          background: rgba(255, 255, 255, 0.4);
          border-radius: 8px;
          padding: 10px;
          backdrop-filter: blur(5px);
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
          text-align: center;
        "
      >
        ${response.id}
      </p>
    </div>
  </div>
</section>

  `;

  await transporter.sendMail({
    from: '"Aqui esta tu entrada" <apainternacional.entradas@gmail.com>', // sender address
    to: "pablobojanich1@gmail.com", // list of receivers
    subject: "Aqui esta tu entrada - APA Internacional", // Subject line
    html: msgHtml,
  });
};

module.exports = { senMail };
