// Use for general socket io stuff.
const io = require('socket.io')(81);
require('./engine.js');
// Require our necessary mirror library
require('./mirror.js');
// Include our authentication management file
const auth = require('./authentication.js');

// Include our dockerode wrapper
const dock = require('./docker.js');

// Specify the mirror connection type, to establish dominance.
Lemonade.Mirror.connectionType = 'SERVER';

// Some serverinfo that should be sent to ALL clients connected.
const serverInfo = {
    connected: 0
};
Lemonade.Mirror.Server.addMirror(serverInfo, undefined);

/**
 * Get the list of containers on docker host and send them to the user.
 * @param {object} socket - Socket.io Socket for the client
 * @param {string} user - User that is requesting the containers.
 * @param {string} session - Session for the user (to verify permissions)
 */
function refreshContainerList(socket, user, session) {
    // Check to ensure the user has the permission.
    if (auth.hasPermission(user, session, 'docker.container.view')) {
        // Get containers
        dock.getContainers((containers) => {
            // Emit our list back to the client, but only the ones they can operate on.
            socket.emit('docker-container-ls', auth.canOperateContainers(user, session, containers, '/'));
        }, () => {
            // fail
            // Let the client know the action failed.
            socket.emit('action-fail', 'docker-container-ls');
        });
    }
    else {
        // Let the client know, their permission was denied.
        socket.emit('permission-denied', 'docker-container-ls');
    }
}

/**
 * Get the list of images on docker host and send them to the client
 * @param {object} socket - Socket.io Socket for the client
 * @param {string} user - Username for user requesting images.
 * @param {string} session - Session for the user
 */
function refreshImageList(socket, user, session) {
    // First check to ensure the user has permission.
    if (auth.hasPermission(user, session, 'docker.image.view')) {
        // Call our wrapper to get images.
        dock.getImages((images) => {
            // Emit to the client the images we have. (If they can view images, they can view all)
            socket.emit('docker-image-ls', images);
        }, () => {
            // fail
            // Let the client know, the action to list images failed.
            socket.emit('action-fail', 'docker-image-ls');
        })
    }
    else {
        // Let the client know the permission was denied for listing images.
        socket.emit('permission-denied', 'docker-image-ls');
    }
}

/**
 * Get the list of accounts in the database
 * @param {object} socket - Socket.io Socket for the client.
 * @param {string} user - Username requesting account list
 * @param {string} session - Session for the user.
 */
function refreshAccountList(socket, user, session) {
    // Check permissions first
    if (auth.hasPermission(user, session, 'account.management')) {
        auth.getAccounts((accounts) => {
            // Send the list of client accounts back.
            socket.emit('account-ls', accounts);
        }, (err) => {
            // Log error for listing accounts.
            console.log('Error with listing accounts: ', err);
        });
    }
    else // Indicate permission was denied.
        socket.emit('permission-denied', 'account-ls');
}

/**
 * Start the Docker container
 * @param {object} socket - Socket.io Socket for the client
 * @param {string} user - User requesting docker container to start.
 * @param {string} session - Session for the user
 * @param {string} name - Container name to start.
 */
function startDockerContainer(socket, user, session, name) {
    // Check permission
    if (auth.hasPermission(user, session, 'docker.container.start') && auth.canOperateContainer(user, session, name)) {
        dock.startContainer(name, (name, data) => {
            console.log('Starting container,', name);
            // Send refreshed list to client
            refreshContainerList(socket, user, session);
        }, (err) => {
            // fail
            socket.emit('action-fail', 'docker-start-' + name);
        })
    }
    else {
        socket.emit('permission-denied', 'docker-start-' + name);
    }
}

/**
 * Pull a new docker image
 * @param {object} socket - Socket.io Socket for the client
 * @param {string} user - User pulling the image
 * @param {string} session - Session for the user
 * @param {string} imagename - Image name (including tag) to pull
 * @param {function} suc - Called on successful pull.
 * @param {function} fail - Called on failed pull.
 */
function pullDockerImage(socket, user, session, imagename, suc = () => {}, fail = () => {}) {
    if (auth.hasPermission(user, session, 'docker.image.pull')) {
        dock.pullImage(imagename, () => {
            suc();
        }, (err) => {
            fail(err);
        });
    }
    else
        socket.emit('permission-denied', 'docker-image-pull-' + imagename);
}

// Handle connection to our Socket io server.
io.on('connection', function(socket) {
    // On new connection, increment our connected.
    serverInfo.connected++;

    // Call this to add the default listeners to the client socket connection.
    Lemonade.Mirror.connect('', socket);


    // Add our Mirror mappings.
    socket.emit(MIRROR_ADD_MAP, serverInfo[MIRROR_ID_NAME], 'window.serverInfo', false);
    // Indicate a refresh for mirrors on client.
    socket.emit(MIRROR_REMOVE_ALL, true);

    /**
     * Handle a login action.
     * @param {string} user - Username to test
     * @param {string} pass - Plaintext pass to test
     */
    socket.on('login', (user, pass) => {
        auth.testUser(user, Lemonade.MD5(pass), (session) => {
            // Login success
            socket.emit('login-success', session);
        }, (reason) => {
            // Failed login
            socket.emit('login-fail', reason);
        });
    });

    /**
     * Verify user session
     * @param {string} user - Username to verify
     * @param {string} session - Session to verify
     */
    socket.on('verify', (user, session) => {
        auth.testSession(user, session, () => {
            // Pass
            socket.emit('verify-success');
        }, (reason) => {
            // Fail
            socket.emit('verify-fail', reason);
        })
    });

    /**
     * Docker related options.
     * Will only specify arguments other than user and session.
     */
    /**
     * Get docker container list
     */
    socket.on('docker-container-ls', (user, session) => {
        refreshContainerList(socket, user, session);
    });
    /**
     * Get docker image list
     */
    socket.on('docker-image-ls', (user, session) => {
        refreshImageList(socket, user, session);
    });
    /**
     * Get docker logs for container
     * @param {string} name - Container name to get logs for
     */
    socket.on('docker-logs', (user, session, name) => {
        if (auth.hasPermission(user, session, 'docker.logs') && auth.canOperateContainer(user, session, name)) {
            dock.getContainerLog(name, (name, log) => {
                // Lemonade.Debug.log('Sending logs.', 10);
                socket.emit('docker-logs-' + name, log);
            }, () => {
                // fail
                Lemonade.Debug.log('Could not send logs.', 10);
                socket.emit('action-fail', 'docker-logs');
            })
        }
        else {
            Lemonade.Debug.log('Permission denied for viewing logs.', 10);
            socket.emit('permission-denied', 'docker-logs');
        }
    });
    /**
     * Start docker container
     * @param {string} name - Container name to start.
     */
    socket.on('docker-start', (user, session, name) => {
        startDockerContainer(socket, user, session, name);
    });
    /**
     * Pull docker image
     * @param {string} imagename - Image name including tag to pull.
     */
    socket.on('docker-image-pull', (user, session, imagename) => {
        pullDockerImage(socket, user, session, imagename);
    });
    /**
     * Stop docker container
     * @param {string} name - Docker container to stop.
     */
    socket.on('docker-stop', (user, session, name) => {
        if (auth.hasPermission(user, session, 'docker.container.stop') && auth.canOperateContainer(user, session, name)) {
            dock.stopContainer(name, (name, data) => {
                Lemonade.Debug.log('Stopping container,', name);
                refreshContainerList(socket, user, session);
                // socket.emit('docker-logs-' + name, s);
            }, () => {
                // fail
                Lemonade.Debug.log('Could not stop container ', name);
                // socket.emit('action-fail', 'docker-start-' + name);
            })
        }
        else {
            Lemonade.Debug.log('Permission denied for stop container.', 10);
            socket.emit('permission-denied', 'docker-stop-' + name);
        }
    });
    /**
     * Kill docker container
     * @param {string} name - Docker container to kill
     */
    socket.on('docker-kill', (user, session, name) => {
        if (auth.hasPermission(user, session, 'docker.container.kill') && auth.canOperateContainer(user, session, name)) {
            dock.killContainer(name, (name, data) => {
                Lemonade.Debug.log('Killing container,', name);
                refreshContainerList(socket, user, session);
                // socket.emit('docker-logs-' + name, s);
            }, () => {
                // fail
                Lemonade.Debug.log('Could not kill container ', name);
                // socket.emit('action-fail', 'docker-start-' + name);
            })
        }
        else {
            Lemonade.Debug.log('Permission denied for kill container.', 10);
            socket.emit('permission-denied', 'docker-kill-' + name);
        }
    });
    /**
     * Remove Docker container.
     * @param {string} name - Docker container to remove
     */
    socket.on('docker-remove', (user, session, name) => {
        if (auth.hasPermission(user, session, 'docker.container.remove') && auth.canOperateContainer(user, session, name)) {
            dock.removeContainer(name, (name, data) => {
                Lemonade.Debug.log('Removing container,', name);
                refreshContainerList(socket, user, session);
                // socket.emit('docker-logs-' + name, s);
            }, () => {
                // fail
                Lemonade.Debug.log('Could not remove container ', name);
                // socket.emit('action-fail', 'docker-start-' + name);
            })
        }
        else {
            Lemonade.Debug.log('Permission denied for remove container.', 10);
            socket.emit('permission-denied', 'docker-remove-' + name);
        }
    });
    /**
     * Remove Docker image
     * @param {string} name - Docker image to remove, including tag.
     */
    socket.on('docker-image-remove', (user, session, name) => {
        if (auth.hasPermission(user, session, 'docker.image.remove')) {
            dock.removeImage(name, (name, data) => {
                Lemonade.Debug.log('Removing image,', name);
                refreshImageList(socket, user, session);
                // socket.emit('docker-logs-' + name, s);
            }, (err) => {
                // fail
                Lemonade.Debug.log('Could not remove image ', name);
                Lemonade.Debug.log('Reason ', err);
                // socket.emit('action-fail', 'docker-start-' + name);
            })
        }
        else {
            Lemonade.Debug.log('Permission denied for remove image.', 10);
            socket.emit('permission-denied', 'docker-image-remove-' + name);
        }
    });
    /**
     * Execute command on docker container.
     * @param {string} name - Container to run the command in.
     * @param {string} command - Command to run in the docker container.
     */
    socket.on('docker-exec', (user, session, name, command) => {
        if (auth.hasPermission(user, session, 'docker.container.exec') && auth.canOperateContainer(user, session, name)) {
            dock.execCommand(name, command, (name, data) => {
                Lemonade.Debug.log('Executed command,', command, ' on container ', name);

                //data.start({}, function(err, stream) {
                //})
                socket.emit('docker-exec-' + name, data);
            }, (err) => {
                // fail
                Lemonade.Debug.log('Could not exec command, \'' + command + '\' on container ', name);
                Lemonade.Debug.log('Reason ', err);
                // socket.emit('action-fail', 'docker-start-' + name);
            })
        }
        else {
            Lemonade.Debug.log('Permission denied for exec container.', 10);
            socket.emit('permission-denied', 'docker-exec-' + name);
        }
    });
    /**
     * Create new docker container
     * @param {object} options - Options as sent by client to create the container.
     * @param {boolean} autostart - Whether to autostart the Container or not.
     * @param {boolean} group - If the Container should be created per user, or per group.
     */
    socket.on('docker-create', (user, session, options, autostart, group = false) => {
        if (group == false) {
            options.name = user + '_' + options.name;
        }
        else
            options.name = auth.getGroup(user) + '_' + options.name;
        if (options == undefined || options['Image'] == undefined)
            return;
        if (options.Image.indexOf(':') == -1) {
            options.Image = options.Image + ':latest';
        }
        if (auth.hasPermission(user, session, 'docker.container.create')) {
            dock.createContainer(options, (container) => {
                refreshContainerList(socket, user, session);
                if (autostart == true) {
                    container.start({}, (err) => {
                        if (err) {
                            Lemonade.Debug.log('Error ', err);
                            return;
                        }
                        refreshContainerList(socket, user, session);
                    });
                }
            }, (err) => {
                // fail
                Lemonade.Debug.log('Could not create container');
                if ((err + '').indexOf('No such image') != -1) {
                    // Attempt to pull image.
                    pullDockerImage(socket, user, session, options.Image, () => {
                        console.log('Pull successful: ' + options.Image);
                        dock.createContainer(options, (container) => {
                            refreshContainerList(socket, user, session);
                            if (autostart == true) {
                                container.start({}, (err) => {
                                    if (err) {
                                        Lemonade.Debug.log('Error ', err);
                                        return;
                                    }
                                    refreshContainerList(socket, user, session);
                                });
                            }
                        }, (er) => {
                            console.log('Pull failed: ' + options.Image);
                            console.log(er);
                        });
                    })
                }
                Lemonade.Debug.log('Reason ', err);
                // socket.emit('action-fail', 'docker-start-' + name);
            })
        }
        else {
            Lemonade.Debug.log('Permission denied for create container.', 10);
            socket.emit('permission-denied', 'docker-create');
        }
    });

    /**
     * Check if the user has a permission, and send back a silent message to indicate this.
     * @param {string} permission - Permission to check for.
     */
    socket.on('has-permission', (user, session, permission) => {
        if (auth.hasPermission(user, session, permission)) {
            // We have it, nothing to return.
        }
        else {
            socket.emit('permission-denied', permission, true)
        }
    });

    /**
     * Get the list of accounts in the database
     */
    socket.on('account-ls', (user, session) => {
        refreshAccountList(socket, user, session);
    });

    /**
     * Create an account in database
     * @param {object} options - Options to create the new user.
     */
    socket.on('account-create', (user, session, options) => {
        if (!auth.hasPermission(user, session, 'account.management')) {
            socket.emit('permission-denied', 'account-create');
            return;
        }

        // Make sure we have required args (permission, group and username)
        if (options.username == '' || options.username == undefined) {
            socket.emit('permission-denied', 'Invalid Username');
            return;
        }
        if (options.group == '' || options.group == undefined) {
            options.group = 'default';
        }
        if (options.permission == '' || options.permission == undefined) {
            options.permission = '0';
        }

        auth.createAccount(options, () => {
            refreshAccountList(socket, user, session);
        }, (err) => {
            console.log(err);
            socket.emit('permission-denied', err);
        });
    });
    /**
     * Remove a user from database
     * @param {string} username - User to remove from database.
     */
    socket.on('account-remove', (user, session, username) => {
        if (!auth.hasPermission(user, session, 'account.management')) {
            socket.emit('permission-denied', 'account-remove');
            return;
        }
        if (user == username) {
            socket.emit('permission-denied', 'Cannot remove own user!');
            return;
        }
        auth.removeAccount(username, () => {
            refreshAccountList(socket, user, session);
        }, (err) => {
            console.log(err);
            socket.emit('permission-denied', err);
        })
    });
    /**
     * Update a user's details in the database.
     * @param {object} options - Options to update with the user.
     */
    socket.on('account-update', (user, session, options) => {
        if (!auth.hasPermission(user, session, 'account.management')) {
            socket.emit('permission-denied', 'account-update');
            return;
        }
        if (options.password != undefined)
            options.password = Lemonade.MD5(options.password);

        auth.updateAccount(options, () => {
            refreshAccountList(socket, user, session);
        }, (err) => {
            console.log(err);
            socket.emit('permission-denied', err);
        })
    });

    /**
     * Handle logging out, which should remove the cache.
     */
    socket.on('logout', (user, session) => {
        if (auth.logout(user, session))
            Lemonade.Debug.log('User ' + user + ' logging out.');
    });
    
    /**
     * Handle disconnect from server.
     */
    socket.on('disconnect', () => {
        serverInfo.connected--;
    });
});
