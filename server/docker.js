// Keep track of our docker lib 'dockerode'
const dockerLib = require('dockerode');
// Load our config
const config = require('./access.js');

// File for containing all the methods related to docker containers / images.
const docker = new dockerLib(config.DockerArgs)


/**
 * Get a list of all containers on the docker host
 * @param {function} suc - Success function to be called (with container list as parameter)
 * @param {function} fail - Should it fail, this method will be called.
 */
function getContainers(suc, fail) {
    // List all containers.
    docker.listContainers({ all: true }, (err, containers) => {
        if (err) {
            fail(err);
            return;
        }
        // Call the success callback with the containers list.
        suc(containers);
    });
}

/**
 * Inspect a particular container for more information.
 * @param {string} name - Container name to inspect
 * @param {function} suc - Success method to call with the data and container name
 * @param {function} fail - Method to call in the event of any failures.
 */
function inspectContainer(name, suc, fail) {
    let container = docker.getContainer(name);
    container.inspect((err, data) => {
        if (err) {
            fail(err);
            return;
        }
        suc(name, data);
    });
}

/**
 * Start the specified container. This assumes container already exists.
 * @param {string} name - Container to start.
 * @param {function} suc - Success method to call after starting the container.
 * @param {function} fail - Failure method to call in the event of an error.
 */
function startContainer(name, suc, fail) {
    let container = docker.getContainer(name);
    container.start({}, (err, data) => {
        if (err) {
            fail(err);
            return;
        }
        suc(name, data);
    });
}

/**
 * Stop the specified container. This assumes the container exists, and is running.
 * @param {string} name - Container name to stop.
 * @param {function} suc - Called upon successful stop of the container.
 * @param {function} fail - Called upon any failures or errors encountered.
 */
function stopContainer(name, suc, fail) {
    let container = docker.getContainer(name);
    container.stop({}, (err) => {
        if (err) {
            fail(err);
            return;
        }
        suc();
    });
}

/**
 * Kill a container. This assumes the container exists and is running.
 * @param {string} name - Container to kill
 * @param {function} suc - Called after successful kill
 * @param {function} fail - Called with any errors that occur.
 */
function killContainer(name, suc, fail) {
    let container = docker.getContainer(name);
    container.kill({}, (err) => {
        if (err) {
            fail(err);
            return;
        }
        suc();
    });
}

/**
 * Remove a container. This assumes the container exists and is not running.
 * @param {string} name - Container to remove.
 * @param {function} suc - Function to call on successful removal.
 * @param {function} fail - Method to call if any failures or errors.
 */
function removeContainer(name, suc, fail) {
    let container = docker.getContainer(name);
    container.remove({}, (err, data) => {
        if (err) {
            fail(err);
            return;
        }
        suc(name, data);
    });
}

/**
 * Remove an image from the docker host.
 * @param {string} name - Image name (including :tag) to be removed
 * @param {function} suc - Method to call on successful removal.
 * @param {function} fail - Callback for if there is a failure
 */
function removeImage(name, suc, fail) {
    let image = docker.getImage(name);
    image.remove({}, (err, data) => {
        if (err) {
            fail(err);
            return;
        }
        suc(name, data);
    });
}

/**
 * Execute a command on a running container
 * @param {string} name - Container to run the command on
 * @param {string} command - Command to run on the docker container.
 * @param {function} suc - Successful callback called with the output / results of running command.
 * @param {function} fail - Failure callback if any errors
 */
function execCommand(name, command, suc, fail) {
    let container = docker.getContainer(name);
    container.exec({ Cmd: command, AttachStdout: true }, (err, data) => {
        if (err) {
            fail(err);
            return;
        }
        data.start({}, (err, stream) => {
            if (err) {
                fail(err);
                return;
            }
            // Keep track of output
            let raw_data = '';
            stream.on('data', (chunk) => {
                // Append output
                raw_data += chunk;
                console.log(chunk);
            });
            stream.on('end', () => {
                // Return the name of the container and output that we received.
                suc(name, raw_data);
            });
        });
    });
}

/**
 * Create a container with the specified options.
 * @param {object} options - Options as allowed by the Docker Remote API
 * @param {function} suc - Successful callback with the new container as an argument.
 * @param {function} fail - Failure callback if any errors.
 */
function createContainer(options, suc, fail) {
    docker.createContainer(options, function(err, container) {
        if (err) {
            fail(err);
            return;
        }
        suc(container);
    });
}

/**
 * Pull a docker image to the host. 
 * @param {string} imagename - Image to pull (including tag)
 * @param {function} suc - Successful callback to be called with the output of the pull.
 * @param {function} fail - Failure callback for any errors.
 */
function pullImage(imagename, suc, fail) {
    docker.pull(imagename, (err, stream) => {
        if (err) {
            fail(err);
            return;
        }
        docker.modem.followProgress(stream, (err, output) => {
            if (err) {
                fail(err);
                return;
            }
            suc(output);
        }, () => {});
    })
}

/**
 * Get the logs of the container (up to 25 lines tail)
 * @param {string} name - Container name to get logs for
 * @param {function} suc - Called with the logs retrieved as argument.
 * @param {function} fail - Called if any errors occur.
 */
function getContainerLog(name, suc, fail) {
    let container = docker.getContainer(name);
    container.logs({ follow: false, stdout: true, stderr: true, tail: 25 }, (err, data) => {
        if (err) {
            fail(err);
            return;
        }
        suc(name, data);
    })
}

/**
 * Get the images on the docker host.
 * @param {function} suc - Called with the list of images.
 * @param {function} fail - Called if any errors occur.
 */
function getImages(suc, fail) {
    docker.listImages((err, images) => {
        if (err) {
            fail(err);
            return;
        }
        suc(images);
    });
}

/**
 * Exports for use with Node server.
 */
module.exports = {
    getContainers,
    inspectContainer,
    startContainer,
    stopContainer,
    killContainer,
    removeContainer,
    removeImage,
    execCommand,
    createContainer,
    pullImage,
    getContainerLog,
    getImages,
};
