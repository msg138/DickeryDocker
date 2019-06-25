/**
 * Actions relating to login / signup / authentication.
 */
const NAME_LOGIN_ACTION = 'LOGIN_ACTION',
    NAME_LOGOUT_ACTION = 'LOGOUT_ACTION',
    NAME_ADD_BAD_PERMISSION = 'ADD_BAD_PERMISSION',
    NAME_ADD_ACCOUNT = 'ADD_ACCOUNT',
    NAME_REMOVE_ACCOUNT = 'REMOVE_ACCOUNT';

/**
 * Action used for login with Redux
 * @param {string} username - username logged in
 * @return {object} Login action
 */
function LOGIN_ACTION(username) {
    return {
        type: NAME_LOGIN_ACTION,
        username
    }
}

/**
 * Action used for a logout with Redux
 * @return {object} Logout action
 */
function LOGOUT_ACTION() {
    return {
        type: NAME_LOGOUT_ACTION
    }
}

/**
 * Action used for adding bad permissions. No need for removal.
 * @param {string} perm - Permission that is bad or denied.
 * @return {object} Add bad permission action.
 */
function ADD_BAD_PERMISSION(perm) {
    return {
        type: NAME_ADD_BAD_PERMISSION,
        perm
    }
}

/**
 * Action used for adding account with Redux
 * @param {string} username - username of the account to add.
 * @return {object} Add account action
 */
function ADD_ACCOUNT(username) {
    return {
        type: NAME_ADD_ACCOUNT,
        username
    }
}
/**
 * Action used for removing account with Redux
 * @param {string} username - username of the account to remove.
 * @return {object} Remove account action
 */
function REMOVE_ACCOUNT(username) {
    return {
        type: NAME_REMOVE_ACCOUNT,
        username
    }
}

// Our Exports for 'Auth'
export const Auth = {
    LOGIN_ACTION,
    LOGOUT_ACTION,

    ADD_BAD_PERMISSION,

    ADD_ACCOUNT,
    REMOVE_ACCOUNT,

    NAME_LOGIN_ACTION,
    NAME_LOGOUT_ACTION,
    NAME_ADD_BAD_PERMISSION,
    NAME_ADD_ACCOUNT,
    NAME_REMOVE_ACCOUNT
};

/**
 * Actions relating to listing docker containers.
 */
const NAME_ADD_CONTAINER = 'ADD_CONTAINER',
    NAME_REMOVE_CONTAINER = 'REMOVE_CONTAINER';

/**
 * Action used for adding container with Redux
 * @param {string} idName - id or name of the container to add.
 * @param {string} image - Image of the container that is being added.
 * @return {object} Add container action
 */
function ADD_CONTAINER(idName, image) {
    return {
        type: NAME_ADD_CONTAINER,
        name: idName,
        image
    }
}

/**
 * Action used for removing container with Redux
 * @param {string} idName - id or name of the container to remove.
 * @return {object} Remove container action
 */
function REMOVE_CONTAINER(idName) {
    return {
        type: NAME_REMOVE_CONTAINER,
        name: idName
    }
}

// Exports for 'Container'
export const Container = {
    ADD_CONTAINER,
    REMOVE_CONTAINER,

    NAME_ADD_CONTAINER,
    NAME_REMOVE_CONTAINER
};

/**
 * Actions relating to listing docker images.
 */
const NAME_ADD_IMAGE = 'ADD_IMAGE',
    NAME_REMOVE_IMAGE = 'REMOVE_IMAGE';

/**
 * Action used for adding image with Redux
 * @param {string} imageName - id or name of the image to add.
 * @param {string} tag - Tag for the image to add.
 * @return {object} Add Image action
 */
function ADD_IMAGE(imageName, tag = imageName.contains(':') ? imageName.substring(0, imageName.indexOf(':')) : 'latest') {
    return {
        type: NAME_ADD_IMAGE,
        name: imageName,
        tag
    };
}

/**
 * Action used for removing image with Redux
 * @param {string} imageName - id or name of the image to remove.
 * @param {string} tag - Tag for the image to remove.
 * @return {object} remove Image action
 */
function REMOVE_IMAGE(imageName, tag = imageName.contains(':') ? imageName.substring(0, imageName.indexOf(':')) : 'latest') {
    return {
        type: NAME_REMOVE_IMAGE,
        name: imageName,
        tag
    };
}

// Our exports for the image actions.
export const Image = {
    ADD_IMAGE,
    REMOVE_IMAGE,

    NAME_ADD_IMAGE,
    NAME_REMOVE_IMAGE
};
