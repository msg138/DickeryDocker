// Used for authentication to generate a one time URL.
const auth = require('./authentication.js');

// Ensure that we have all the needed arguments.
if (process.argv.length < 3) {
    console.log('Needs username!');
    process.exit(3);
}
else {
    // Call to generate the URL.
    auth.loginAnyway(process.argv[2], (session_url) => {
        // Log the url that we got.
        console.log(session_url);
        process.exit(0);
    }, (err) => {
        // Log why we couldn't generate a url.
        console.log('Could not create session URL: ', err);
        process.exit(3);
    });
}
