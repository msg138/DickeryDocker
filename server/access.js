// This file should represent the levels of access each permission level should have.

/**
 * Permissions Available:
 * 
 * docker.image.view - Allows viewing all images on docker host
 * docker.image.remove - Allow removing an image from docker host
 * docker.image.pull - Allow pulling new images to docker host
 * 
 * docker.container.view - Allows viewing containers on docker host (as determined by view permissions specified below)
 * container.view.all - Allow viewing all containers on docker host
 * container.view.user - Allow viewing containers created by just this user
 * container.view.group - Allow viewing containers created by just this user's group (group created containers only)
 * container.view.member - Allow viewing containers created by this user, and user's group (group created containers only)
 * 
 * docker.logs - Allows viewing of container logs (any that they are able to view)
 * docker.container.stop - Allow stopping a docker container
 * docker.container.kill - Allow killing a docker container
 * docker.container.start - Allow starting an existing docker container
 * docker.container.create - Allow creating new docker containers
 * docker.container.remove - Allow removing docker containers
 * docker.container.exec - Allow executing command on docker container.
 * 
 * account.management - Allows viewing, creating and editing users with Dickery Docker.
 */

module.exports = {

    /**
     * Permissions
     * These will be identified with integer indices, and are an array of strings( the permissions)
     */
    0: ['docker.image.view', 'docker.container.view', 'docker.logs'],
    1: ['docker.image.view', 'docker.container.view', 'docker.logs',
        'docker.container.stop', 'docker.container.kill', 'docker.container.start'
    ],
    2: ['docker.image.view', 'docker.container.view', 'docker.logs',
        'docker.container.stop', 'docker.container.kill', 'docker.container.start',
        'docker.container.create', 'docker.container.remove', 'account.management',
        'docker.container.exec', 'docker.image.remove',
        'docker.image.pull', 'container.view.member'
    ],


    // Hostname / Protocol (essentially a prefix)
    'Hostname': '',
    'Protocol': 'http://',

    // Used for the database connection
    'Database': {
        host: '',
        user: '',
        password: '',
        database: ''
    },
    
    // Table to be used for user data in the database.
    'TableUsers': 'users',

    // Information for setting up docker. By default we use the Docker socket method.
    'DockerArgs': {
        socketPath: '/var/run/docker.sock'
    }

}
