const { CONSUMER_KEY, CONSUMER_SECRET, 
    ACCESS_TOKEN, ACCESS_TOKEN_SECRET,
    TWITTER_TOKEN, USERNAME,
    USER_ID, PORT, 
    DATABASE_URL
} = process.env;
const twitter_config = {
    consumer_key: CONSUMER_KEY,
    consumer_secret: CONSUMER_SECRET,
    access_token: ACCESS_TOKEN,
    access_token_secret: ACCESS_TOKEN_SECRET
};

const token = TWITTER_TOKEN;

const username = USERNAME;
const userId = USER_ID;

const port = PORT;

const databaseUrl = DATABASE_URL

module.exports = { twitter_config, token, username, userId, port, databaseUrl };