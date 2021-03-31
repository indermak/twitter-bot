const needle = require('needle');
const baseUrl = "https://api.twitter.com/2";
const { token } = require('./config');
const Tweets = require('./schema');

const getUserIdByUsername = async (username) => {
    const retVal = await needle('get', `${baseUrl}/users/by/username/${username}`, {}, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });
    console.log(' getUserIdByUsername >> ', retVal.body);
    if (retVal && retVal.body && retVal.body.data) {
        return retVal.body.data.id;
    }
    return null;
}

async function getRecentTweets(req, res) {
    try {
        const { accountName } = req.params;
        const userId = await getUserIdByUsername(accountName);
        if (!userId) {
            return res.send({
                isError: true,
                data: userId
            });
        }

        const retVal = await needle('get', `${baseUrl}/users/${userId}/tweets`, {}, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
        console.log('getRecentTweets >> ', retVal.body);
        if (retVal.body) {
            if (retVal.body.data && retVal.body.data.length) {
                await Tweets.insertMany(retVal.body.data)
            }
            return res.send({
                isError: false,
                data: retVal.body
            });
        }
        return res.send({
            isError: true,
            data: retVal
        });
    } catch (err) {
        return res.send({
            isError: true
        });
    }
}

async function getFollowers(req, res) {
    try {

        const { account } = req.params;
        const userId = await getUserIdByUsername(account);
        if (!userId) {
            return res.send({
                isError: true,
                data: userId
            });
        }

        const retVal = await needle('get', `${baseUrl}/users/${userId}/followers`, {}, {
            headers: {
                "User-Agent": "v2RecentSearchJS",
                "authorization": `Bearer ${token}`
            }
        })
        console.log('getFollowers >> ', retVal.body);

        if (retVal.body) {
            return res.send({
                isError: false,
                data: retVal.body
            });
        }
        return res.send({
            isError: true,
            data: retVal
        });
    } catch (err) {
        return res.send({
            isError: true
        });
    }
}






module.exports = { getRecentTweets, getFollowers }