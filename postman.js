var axios = require("axios");
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

var config = {
  method: "post",
  url: "https://api.sendgrid.com/v3/mail/send",
  headers: {
    Authorization: "Bearer test",
    "Content-Type": "application/json",
  },
  data: data,
};

axios(config)
  .then(function (response) {
    console.log(JSON.stringify(response.data));
  })
  .catch(function (error) {
    console.log(error);
  });
