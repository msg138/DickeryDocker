/**
 * Symbols that are used to identify values in objects.
 */

// Used to determine loggedIn in the Redux Store (AuthStore)
export const AUTH_LOGGED_IN_KEY = Symbol('loggedIn');
// Used to determine the username in the Redux Store (AuthStore)
export const AUTH_USER_KEY = Symbol('username');
// Used to identify the container list key in Redux Store (ContainerStore)
export const CONT_LIST_KEY = Symbol('container_list');
// Used to identify the image list key in Redux Store (ImageStore)
export const IMG_LIST_KEY = Symbol('image_list');
// Used to identify the list of bad permissions (denied permissions) in redux store (AuthStore)
export const BAD_PERMISSIONS = Symbol('bad_perms');
// Identifies the account list key in redux store (AuthStore)
export const ACCOUNT_LIST = Symbol('account_list');