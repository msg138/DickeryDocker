// Used for database connections
const mysql = require('mysql');
// This allows use of the Mirror / Lemonade library.
require('./mirror.js');
const config = require('./access.js');

/**
 * Map used for caching user requests / sessions.
 */
const userCacheMap = new Map();

/**
 * Generate a user cache oject. This will keep track of session / permissions and group, so we don't have to check constantly on the database.
 * @param {string} username - Username to cache for
 * @param {string} session - The session ID that will be cached for future requests.
 * @param {number} permissions - Permissions level for the user
 * @param {string} group - The group that the user belongs to (used for retrieving group containers.)
 * @return {object} Collection of the supplied parameters.
 */
function userCache(username, session, permissions, group = 'main') {
    return { username, session, perm: permissions, group };
}

/**
 * Database initialization using the details set in access.js
 */
const connection = mysql.createConnection(config.Database);
connection.connect(function(err) {
    if (err) {
        console.log('Unable to connect to database, ' + err.stack);
        throw err;
    }
});

/**
 * Generate a random session ID that will be used for communication between client / server.
 * @return Generated Session ID
 */
function generateSession() {
    const session = Lemonade.Mirror.generateID() + Lemonade.Mirror.generateID() + Lemonade.Mirror.generateID();
    return session;
}

/**
 * Generate a URL for auto login with the desired user. No authentication used.
 * @param {string} username - Username that will be logged in
 * @param {function} suc - Success method to be called after successful generation.
 * @param {function} fail - Failure method to be called if failed.
 */
function loginAnyway(username, suc, fail) {
    // Select from our database, based on just the username.
    connection.query('SELECT * FROM ' + config.TableUsers + ' WHERE `username`=\'' + username + '\'', function(err, results, fields) {
        // If any error, we fail.
        if (err) {
            fail(err);
            return;
        }
        // If there are any results, we proceed to generate a new session and url.
        // This assumes there is only 1 of each username.
        if (results.length > 0) {
            // Generate a unique ID.
            const sess = generateSession();
            // Update database with newly generated session. This will make it valid for use.
            connection.query('UPDATE ' + config.TableUsers + ' SET `last_session`=\'' + sess + '\' WHERE `username`=\'' + username + '\'', (err, res, fie) => {
                // If we fail, call our failure callback
                if (err) {
                    fail(err);
                    return;
                }
                // Structure the URL with the generated session
                let u_url = config.Protocol + config.Hostname + '/login?user=' + username + '&session=' + sess;
                // Call our success callback with the url.
                suc(u_url);
            });
        }
        // If there are no results, we fail.
        else
            fail();
    })
}

/**
 * Test a user with their username and password.
 * @param {string} username - Username to test
 * @param {string} password - Password to test
 * @param {function} suc - Method to call on successful login. Will pass session as parameter.
 * @param {function} fail - Method to call if login fails.
 */
function testUser(username, password, suc, fail) {
    // Initiate our query.
    connection.query('SELECT * FROM ' + config.TableUsers + ' WHERE `username`=\'' + username + '\' AND `password`=\'' + password + '\'', function(err, results, fields) {
        if (err) {
            fail(err);
            return;
        }
        // If we have any results, this will run.
        if (results.length > 0) {
            // Generate a new session ID for the user.
            const sess = generateSession();
            // Update database with the new session
            connection.query('UPDATE ' + config.TableUsers + ' SET `last_session`=\'' + sess + '\' WHERE `username`=\'' + username + '\' AND `password`=\'' + password + '\'', (err, res, fie) => {
                if (err) {
                    fail(err);
                    return;
                }
                // Success
                // Add the logged in user to our Cache, and call the success callback with the session generated.
                userCacheMap.set(username, userCache(username, sess, results[0]['permission'], results[0]['group_name']));
                suc(sess);
            });
        }
        else
            fail();
    })
}

/**
 * Test a user against their session. Used to verify a logged in user is still valid to be logged in.
 * @param {string} username - Username to test session on
 * @param {string} session - Session to test user for
 * @param {function} suc - Method to call upon successful verification
 * @param {function} fail - Method to call on failed verification
 */
function testSession(username, session, suc, fail) {
    // First ensure that the session is a string and no spaces.
    if (typeof session != 'string' || session == '' || session.indexOf(' ') != -1)
        return fail('Invalid Session!');
    /**
     * Uncomment these lines if wanting to use cache for session checking. 
     * 
     * if (userCacheMap.has(username)) {
        if (userCacheMap.get(username).session == session)
            return suc();
        return fail('Did not match cache!');
    }*/
    // Check to see if the user exists with the specified session
    connection.query('SELECT * FROM ' + config.TableUsers + ' WHERE `username`=\'' + username + '\' AND `last_session`=\'' + session + '\'', function(err, results, fields) {
        if (err) {
            fail(err);
            return;
        };
        if (results.length > 0) {
            // Successful verification. Set our cacheMap to have the session if it wasn't there before.
            suc();
            userCacheMap.set(username, userCache(username, session, results[0]['permission'], results[0]['group_name']));

        }
        // Was unable to verify the session and user combination.
        else
            fail('Invalid Session / USER');
    })
}

/**
 * Clear a user's session, this should cause them to logout if they are logged in.
 * @param {string} username - User to clear session for.
 */
function clearSession(username) {
    // Update the session to be a blank / empty string.
    connection.query('UPDATE ' + config.TableUsers + ' SET `last_session`=\'\' WHERE `username`=\'' + username + '\'', (err, res, fie) => {
        if (err) {
            console.log(err);
        }
    });
}

/**
 * Check if a user has the permission to perform an action. Compares against what is specified in access.js
 * @param {string} username - Username to check for.
 * @param {string} session - Session for the user.
 * @param {string} permission - Permission string to check for.
 * @return {boolean} Whether the user has the requested permission.
 */
function hasPermission(username, session, permission) {
    // Requires that the user is in the cache map (otherwise they will have to relogin essentially.)
    if (userCacheMap.has(username)) {
        // If in cache, return if the permission is listed in the config.
        return config[userCacheMap.get(username).perm].findIndex((e) => { return e == permission }) != -1;
    }
    // If the user was unable to be found in the cache, return that they don't have permission.
    return false;
}

/**
 * Determine if the user can operate on the specified container.
 * @param {string} username - Username to check if they can operate on the container
 * @param {string} session - Session for the user.
 * @param {string} containerName - Container that the user is wanting to operate on.
 * @param {string} prepend - If the container has a prefix aside from the user / group. 
 * @return {boolean} Whether the user can operate on the container.
 */
function canOperateContainer(username, session, containerName, prepend = '') {
    // First if they have the permission for all containers, just return true
    if (this.hasPermission(username, session, 'container.view.all'))
        return true;
    // If they are only able to view user containers, check that the container name is prefixed with username
    if (this.hasPermission(username, session, 'container.view.user'))
        return containerName.startsWith(prepend + username + '_');
    // If they are only able to view group containers, check that the container name is prefixed with their group
    if (this.hasPermission(username, session, 'container.view.group'))
        return containerName.startsWith(prepend + userCacheMap.get(username).group + '_');
    // If they are able to view both user and group containers, check both
    if (this.hasPermission(username, session, 'container.view.member'))
        return containerName.startsWith(prepend + userCacheMap.get(username).group + '_') || containerName.startsWith(prepend + username + '_');
    // Otherwise, they do not have authorization to operate on container.
    return false;
}

/**
 * Check out of a list of provided containers, which the user can operate on.
 * @param {string} username - Username that is operating on containers.
 * @param {string} session - Session for the user
 * @param {object} containerNameList - Array of containers to be checked
 * @param {string} prepend - If the container names should be prepended.
 * @return {object} List of remaining containers that can be operated on.
 */
function canOperateContainers(username, session, containerNameList, prepend = '') {
    // First if they have the permission for all containers, just return the list that was sent (as all will be able to be operated on)
    if (this.hasPermission(username, session, 'container.view.all'))
        return containerNameList;
    // If they are only able to view user containers, check that the container name is prefixed with username
    if (this.hasPermission(username, session, 'container.view.user'))
        return containerNameList.filter((container) => { let containerName = container.Names[0]; return containerName.startsWith(prepend + username + '_') })
    // If they are only able to view group containers, check that the container name is prefixed with their group
    if (this.hasPermission(username, session, 'container.view.group'))
        return containerNameList.filter((container) => { let containerName = container.Names[0]; return containerName.startsWith(prepend + userCacheMap.get(username).group + '_') });
    // If they are able to view both user and group containers, check both
    if (this.hasPermission(username, session, 'container.view.member')) {
        return containerNameList.filter((container) => {
            let containerName = container.Names[0];
            return containerName.startsWith(prepend + userCacheMap.get(username).group + '_') || containerName.startsWith(prepend + username + '_');
        });
    }
    // If no permissions found. Return empty array.
    return [];
}

/**
 * Get the group name that a user belongs to.
 * @param {string} username - Username to check group for.
 * @return {string} Group that the user has specified on their account.
 */
function getGroup(username) {
    // If the user is cached, we return the cached value.
    if (userCacheMap.has(username))
        return userCacheMap.get(username).group;
    // Otherwise, it's the default.
    return 'default';
}

/**
 * Allow a user to log out, clearing their session.
 * @param {string} username - Username that is to be logged out.
 * @param {string} session - Session to verify the user is able to log out. To prevent others logging others out.
 * @return {boolean} If the user was removed from cache and logged out.
 */
function logout(username, session) {
    if (userCacheMap.has(username)) {
        if (userCacheMap.get(username).session == session) {
            // Clear the session for the user.
            clearSession(username);
            // Remove from cache.
            userCacheMap.delete(username);
            return true;
        }
    }
    // If user is not in cache, then we can't log them out.
    return false;
}

/**
 * Get a list of accounts / users in the database. This does not get the password or session.
 * @param {function} suc - Success method to call with the results as parameter.
 * @param {function} fail - Failure method to call if no users are found, or another error happens.
 */
function getAccounts(suc, fail) {
    // Select only the fields that could be relevant and not TOOO private.
    connection.query('SELECT username, group_name, permission, permanent FROM ' + config.TableUsers + '', function(err, results, fields) {
        if (err) {
            fail(err);
            return;
        }
        if (results.length > 0) {
            suc(results)
        }
        // No users found, fail.
        else
            fail('No users found.');
    })
}

/**
 * Create an account based on options.
 * @param {object} options - {username, group, permission}
 * @param {function} suc - Success method to call on user creation.
 * @param {function} fail - Failure method to call in any error or if user already exists.
 */
function createAccount(options, suc, fail) {
    // First check to see if there is any user existing.
    connection.query('SELECT * FROM ' + config.TableUsers + ' WHERE `username`=\'' + options.username + '\'', function(err, results, fields) {
        if (err) {
            fail('Error occurred: ' + err);
            return;
        }
        // If there are no results, this means the user shouldn't exist.
        if (results.length <= 0) {
            // Insert into the database with our options.
            connection.query('INSERT INTO ' + config.TableUsers + ' (username, group_name, permission, permanent) VALUES (\'' +
                options.username + '\', \'' + options.group + '\', \'' + options.permission + '\', \'FALSE\');',
                function(err, results, fields) {
                    if (err) {
                        fail(err);
                        return;
                    }
                    // Successful user creation
                    suc();
                });
        }
        else {
            fail('User already exists!');
        }
    });
}

/**
 * Update a user account with the options specified.
 * @param {object} options - {permission, group, password, session, username}
 * @param {function} suc - Called on successful user update.
 * @param {function} fail - Called on failed user update.
 */
function updateAccount(options, suc, fail) {
    // Create our query.
    let query = 'UPDATE ' + config.TableUsers + ' SET ';
    // If there is a permission field, add it.
    if (options.permission != '' && options.permission != undefined)
        query += '`permission` = ' + options.permission;
    // If there is a group field, add it.
    if (options.group != '' && options.group != undefined)
        query += ', `group_name` = \'' + options.group + '\'';
    // If there is a password field (presumably encrypted), add it.
    if (options.password != '' && options.password != undefined)
        query += ', `password` = \'' + options.password + '\'';
    // If there is a session field, can be blank, add it.
    if (options.session != undefined)
        query += ', `last_session` = \'' + options.session + '\'';
    // Finish our query.
    query += ' WHERE `username` = \'' + options.username + '\'';

    // run the query and handle appropriately.
    connection.query(query, (err, results, fields) => {
        if (err) {
            fail(err);
            return;
        }
        suc('Updated user');
    });

}

/**
 * Remove a user account from the database.
 * @param {string} username - User to remove from database.
 * @param {function} suc - Success method to call upon removal.
 * @param {function} fail - Failure method to call if removal fails.
 */
function removeAccount(username, suc, fail) {
    // Run our query.
    connection.query('SELECT * FROM ' + config.TableUsers + ' WHERE `username`=\'' + username + '\'', function(err, results, fields) {
        if (err) {
            fail('Error occurred: ' + err);
            return;
        }
        if (results.length > 0) {
            // If the user is specified as a permanent user, we cannot remove.
            if (results[0]['permanent'] == 1) {
                fail('Cannot remove permanent user!');
            }
            else {
                // Otherwise, we delete.
                connection.query('DELETE FROM ' + config.TableUsers + ' WHERE `username`=\'' + username + '\'', (err, res, fields) => {
                    if (err) {
                        fail('Error Occurred: ' + err);
                        return;
                    }
                    // Success
                    suc();
                });
            }
        }
        else
            fail('No user found!');
    })
}

// All of our Exports to be used by the Node Server.
module.exports = {
    loginAnyway,
    testUser,
    testSession,
    clearSession,
    hasPermission,
    canOperateContainer,
    canOperateContainers,
    getGroup,
    logout,

    getAccounts,
    createAccount,
    updateAccount,
    removeAccount
}
