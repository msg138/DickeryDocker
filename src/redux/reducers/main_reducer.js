import { Auth, Container, Image } from '../actions/main_actions'

import * as Symbols from '../../utils/symbols'

import { CookieManager } from '../../utils/cookie'

/**
 * Reducer stuff for Auth
 */
const DefaultAuthState = {
    [Symbols.AUTH_LOGGED_IN_KEY]: CookieManager.getCookie('loggedIn', false),
    [Symbols.AUTH_USER_KEY]: CookieManager.getCookie('loggedIn_user', ''),
    [Symbols.BAD_PERMISSIONS]: new Set(),
    [Symbols.ACCOUNT_LIST]: new Set()
};

export function AuthReducer(state = DefaultAuthState, action) {
    switch (action.type) {
        case Auth.NAME_LOGIN_ACTION:
            return Object.assign({}, state, {
                [Symbols.AUTH_LOGGED_IN_KEY]: true,
                [Symbols.AUTH_USER_KEY]: action.username
            });
        case Auth.NAME_LOGOUT_ACTION:
            return Object.assign({}, state, {
                [Symbols.AUTH_LOGGED_IN_KEY]: false,
                [Symbols.AUTH_USER_KEY]: ''
            });
        case Auth.NAME_ADD_BAD_PERMISSION:
            return Object.assign({}, state, {
                [Symbols.BAD_PERMISSIONS]: new Set(state[Symbols.BAD_PERMISSIONS]).add(action.perm)
            })
        case Auth.NAME_ADD_ACCOUNT:
            return Object.assign({}, state, {
                [Symbols.ACCOUNT_LIST]: new Set(state[Symbols.ACCOUNT_LIST]).add(action.username)
            });
        case Auth.NAME_REMOVE_ACCOUNT:
            return Object.assign({}, state, {
                [Symbols.ACCOUNT_LIST]: new Set([state[Symbols.ACCOUNT_LIST]].filter(el => el != action.username))
            });
        default:
            return state;
    }
}

/**
 * Reducer stuff for containers.
 */
const DefaultContainerState = {
    [Symbols.CONT_LIST_KEY]: new Map()
};

export function ContainerReducer(state = DefaultContainerState, action) {
    switch (action.type) {
        case Container.NAME_ADD_CONTAINER:
            return Object.assign({}, state, {
                [Symbols.CONT_LIST_KEY]: new Map([...state[Symbols.CONT_LIST_KEY]]).set(action.name, action.image)
            });
        case Container.NAME_REMOVE_CONTAINER:
            return Object.assign({}, state, {
                [Symbols.CONT_LIST_KEY]: new Map([...state[Symbols.CONT_LIST_KEY]].filter(el => el[0] !== action.name))
            });
        default:
            return state;
    }
}

/**
 * Reducer stuff for docker images
 */
const DefaultImageState = {
    [Symbols.IMG_LIST_KEY]: new Set()
};

export function ImageReducer(state = DefaultImageState, action) {
    switch (action.type) {
        case Image.NAME_ADD_IMAGE:
            return Object.assign({}, state, {
                [Symbols.IMG_LIST_KEY]: new Set(state[Symbols.IMG_LIST_KEY]).add(action.name + ":" + action.tag)
            });
        case Image.NAME_REMOVE_IMAGE:
            return Object.assign({}, state, {
                [Symbols.IMG_LIST_KEY]: new Set([state[Symbols.IMG_LIST_KEY]].filter(el => el != action.name + ":" + action.tag))
            });
        default:
            return state;
    }
}
