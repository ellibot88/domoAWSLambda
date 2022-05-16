//Authenticate with Domo API

const axios = require("axios");
require("dotenv").config();
const { domo_client_id } = process.env;
const { domo_client_secret } = process.env;
const { sendgrid_api_key } = process.env;

console.log(sendgrid_api_key);

const config = {
  headers: {
    Authorization:
      "Basic " +
      Buffer.from(`${domo_client_id}:${domo_client_secret}`).toString("base64"),
  },
};
axios
  .post(
    "https://api.domo.com/oauth/token?grant_type=client_credentials&scope=data%20user",
    {},
    config
  )
  .then((res) => {
    // console.log(res);
    let token = res.data["access_token"];
    const configuration = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };
    const data = {
      sql: `SELECT * FROM table`,
    };
    axios
      .post(
        `https://api.domo.com/v1/datasets/query/execute/6c381347-9460-42cf-88de-835eae24b64a`,
        data,
        configuration
      )
      .then((axiosRes) => {
        let domoData = axiosRes.data.rows;
        domoData.forEach((element) => {
          var data = JSON.stringify({
            personalizations: [
              {
                to: [
                  {
                    email: "egleonard88@gmail.com",
                  },
                ],
              },
            ],
            from: {
              email: "elliott@hack-a-thon.com",
            },
            subject: "Domo Test integration with Sendgrid",
            content: [
              {
                type: "text/plain",
                value: "DOMO DOMO DOMO",
              },
            ],
          });
          axios
            .post("https://api.sendgrid.com/v3/mail/send", data, {
              headers: {
                Authorization: `Bearer ${sendgrid_api_key}`,
                "Content-Type": "application/json",
              },
            })
            .then((sendgridRes) => console.log(sendgridRes.data))
            .catch((sendgridErr) => console.log(sendgridErr.data));
        });
      })

      .catch((axiosErr) => console.log(axiosErr));
  })
  .catch((err) => console.log(err));
