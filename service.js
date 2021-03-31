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
    if (retVal && retVal.body && retVal.body.data) {
        return retVal.body.data.id;
    }
    return null;
}

async function getRecentTweets(req, res) {
    try {
        const { accountName } = req.params;
        const retVal = await getTweets(accountName);
        return retVal;
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

const getTweets = async (username) => {
    try {
        const userId = await getUserIdByUsername(username);
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
        if (retVal.body) {
            if (retVal.body.data && retVal.body.data.length) {
                await Tweets.insertMany(retVal.body.data)
            }
            return {
                isError: false,
                data: retVal.body
            };
        }
        return {
            isError: true,
            data: retVal
        };

    } catch (err) {
        return {
            isError: true,
            data: retVal
        };
    }
}





module.exports = { getRecentTweets, getFollowers, getTweets }