//Authenticate with Domo API

const axios = require("axios");
const domo_client_id = "e0e7020f-2b8e-41e0-b847-4f28c224177c";
const domo_client_secret =
  "89c3cec0cafc3e361efb53d0d5da2faa86786ff72e435161ab1adf9e9eb582a8";

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
    // console.log(res.data["access_token"])
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
        console.log(axiosRes.data.rows);
      })
      .catch((axiosErr) => console.log(axiosErr));
  })
  .catch((err) => console.log(err));
