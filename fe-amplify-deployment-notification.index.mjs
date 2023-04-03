// import https from "https";

// This should be your webook URL from Slack Incoming Webhooks
const webhookUrl =
  "https://hooks.slack.com/services/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";

// const https = require("https");

function postRequest(data) {
  return new Promise((resolve, reject) => {
    const url = new URL(webhookUrl);
    const options = {
      host: url.hostname,
      path: url.pathname,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    };

    //create the request object with the callback with the result
    const req = https.request(options, (res) => {
      resolve(JSON.stringify(res.statusCode));
    });

    // handle the possible errors
    req.on("error", (e) => {
      reject(e.message);
    });

    //do the request
    req.write(JSON.stringify(data));

    //finish the request
    req.end();
  });
}

export const handler = async (event) => {
  const message = event.Records[0].Sns.Message.slice(1, -1);
  const timestamp = new Date(event.Records[0].Sns.Timestamp).getTime() / 1000;
  let color = "info";
  if (message.includes("FAILED")) {
    color = "danger";
  } else if (message.includes("SUCCEED")) {
    color = "good";
  }

  const slackMessage = {
    attachments: [
      {
        color,
        text: message,
        ts: timestamp,
      },
    ],
  };

  // await postRequest(slackMessage);

  return await fetch(webhookUrl, {
    method: "POST",
    body: JSON.stringify(slackMessage),
    headers: { "Content-Type": "application/json" },
  })
    .then((data) => console.log("sent!"))
    .catch((e) => console.error(e.response.data));
};
