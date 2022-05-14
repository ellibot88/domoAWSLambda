//Authenticate with Domo API

const domo_client_id = "domo_client_id";
const domo_client_secret = "domo_client_secret";

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
    let token = res.data["access_token"];
    return token;
  })
  .catch((err) => console.log(err));
