const { getRequest, followSomeone, getFollowersTweets } = require('./service');

// (async () => {

//     try {
//         // Make request
//         const response = await getRequest();
//         console.dir(response, {
//             depth: null
//         });

//     } catch (e) {
//         console.log(e);
//         process.exit(-1);
//     }
//     process.exit();
// })();

(async () => {

    try {
        // Make request
        const response = await getFollowersTweets();
        console.dir(response, {
            depth: null
        });

    } catch (e) {
        console.log(e);
        process.exit(-1);
    }
    process.exit();
})();

// (async () => {

//     try {
//         // Make request
//         const response = await followSomeone();
//         console.dir(response, {
//             depth: null
//         });

//     } catch (e) {
//         console.log(e);
//         process.exit(-1);
//     }
//     process.exit();
// })();


