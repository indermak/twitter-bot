const express = require('express')
const app = express();
const mongoose = require('mongoose')
require('dotenv').config();
const { getRecentTweets, getFollowers } = require('./service');


let { port, databaseUrl } = require('./config');
port = port || 3000;

const CronJob = require('cron').CronJob;

const job = new CronJob('0 29,59 * * * *', function () {
    console.log('You will see this message every second');
}, null, true);


app.use(express.json())

app.get('/', function (req, res) {
    res.send('Hello to the twitter app...!!!')
})

app.get('/recent/:accountName', getRecentTweets)

app.get('/followers/:account', getFollowers)

try{
    mongoose.connect(databaseUrl, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
        console.log('Connected to DB');
        app.listen(port, function () {
            console.log(`listening on ${port }`)
        });
        job.start();
    });
} catch(err){
    console.log('Error : ', err);
    Process.exit(1);
}