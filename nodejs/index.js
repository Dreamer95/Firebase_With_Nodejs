const express = require("express");
const Notification = require("./notifications.js")
const GenerateToken = require("./generateToken.js") // only needed if you want to generate your own tokens

const app = express();
app.use(express.json({
    limit: '10mb'
}))

// Only use it to generate Access Token for Firebase Notifications using Http v1
// GenerateToken.getAccessToken()
//     .then((token) => console.log("This token expires in 1 hour: " + token))
//     .catch((err) => console.log("Error: ", err))


// This is to send notifications using node and express
app.post("/one-user", async function(req, res) {
    // Here you could receive the token id, titulo and mensage, in this case all these params are already hardcoded
    res.send("Sending Notification to One user...");

     const params = {
        ...req.body,
        ...req.params,
        ...req.query
    };
    console.log('params => ', params)
    let message = {
        tokenId: params.token,
        title: params.title,
        body: params.body
    }

    console.log('message => ', message)

   Notification.sendPushToOneUser(message);

});

app.post("/topic", function(req, res) {
    // Here you could receive the topic id, titulo and mensage, in this case all these params are already hardcoded
    const params = {
        ...req.body,
        ...req.params,
        ...req.query
    };
    res.send("Sending Notification to a Topic...");
    const data = {
        topic: params.topic,
        title: params.title,
        body: params.message
    }

    console.log('data => ', data)
    Notification.sendPushToTopic(data);
});

app.get("/", function(req, res) {
    res.send("Success")
});

app.listen(3000, function() {
    console.log("Server started on port 3000");
});
