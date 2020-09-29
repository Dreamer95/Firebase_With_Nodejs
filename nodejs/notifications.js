const admin = require("firebase-admin");

function initFirebase() {
    const serviceAccount = require(__dirname + '/keys/dongdn-firebase-project-firebase-adminsdk-m3sau-ef21668c88.json');
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        databaseURL: "https://dongdn-firebase-project.firebaseio.com"
    });
}

initFirebase();

function sendPushToOneUser(notification) {
    const message = {
        token: notification.tokenId,
        notification: {
            title: notification.title,
            body: notification.body
        }
    }
    sendMessage(message);
}

function sendPushToTopic(notification) {
    const message = {
        topic: notification.topic,
        notification: {
            title: notification.title,
            body: notification.body
        },
        data: {
            title: notification.title,
            body: notification.body
        }
    }
    console.log('message => ', message)
   sendMessage(message);
}

function sendMessage(message) {
    admin.messaging().send(message)
        .then((response) => {
            // Response is a message ID string.
            console.log('Successfully sent message:', response);
        })
        .catch((error) => {
            console.log('Error sending message:', error);
        })
}

module.exports = { sendPushToOneUser, sendPushToTopic }
