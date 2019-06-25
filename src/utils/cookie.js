import React from 'react'

// SEt our Default Cookie expiration to 1 day.
// This is in hours.
const DefaultCookieExpiration = 24;
// The name of the cookie that permits us to create cookies.
const CookiesAllowedName = 'cookies_allowed';

/**
 * CookieManager class. This is used to get, set, and delete cookies.
 * To add cookies, this requires the cookie policy be accepted first.
 */
export class CookieManager {
    /**
     * Get if cookies are allowed.
     * @return {boolean} If cookies have been accepted / allowed.
     */
    static areCookiesAllowed() {
        return this.getCookie(CookiesAllowedName, false)
    }
    /**
     * Get the cookies for the current session (in Map form)
     * @return {object} Map of cookies (name => value)
     */
    static getCookiesMap() {
        return new Map((document.cookie.split('; ')).map((item) => { return item.split('=') }));
    }
    /**
     * Set a cookie to specified value.
     * @param {string} cookieName - Name of the cookie to set / add.
     * @param {string} cookieValue - Value the cookie should have.
     * @param {number} expiration - Expiration in hours for the cookie. Defaults to 24 hours.
     * @param {string} path - Path for the cookie. Will default to the main site '/'
     * @return {boolean} If the cookie was set successfully.
     */
    static setCookie(cookieName, cookieValue, expiration = DefaultCookieExpiration, path = '/') {
        if (!this.areCookiesAllowed() && cookieName != CookiesAllowedName) {
            window.location = '#no-cookie';
            return false;
        }
        document.cookie = cookieName + '=' + cookieValue + '; expires=' +
            (new Date(Date.now() + expiration * 60 * 60 * 1000)).toUTCString() +
            (path === undefined ? '' : '; path=' + path);
        return true;
    }
    /**
     * Get a cookie or return a (default) value.
     * @param {string} cookieName - Cookie to get.
     * @param {object} def - Default value to return if cookie is undefined.
     * @return {object} Default value or the cookie if it exists.
     */
    static getCookie(cookieName, def) {
        let cookieMap = this.getCookiesMap();
        return (cookieMap.has(cookieName) ? cookieMap.get(cookieName) : def);
    }
    /**
     * Remove a cookie.
     * @param {string} cookieName - Cookie to remove
     * @param {string} path - Path of the cookie being removed.
     * @return {boolean} If the cookie was removed successfully.
     */
    static removeCookie(cookieName, path = '/') {
        document.cookie = cookieName + '=; expires=' + (new Date(Date.now() - 3600000)).toUTCString() + (path === undefined ? '' : '; path=' + path);
        return true;
    }
}

/**
 * Class used for the cookie acceptance bar at the bottom.
 */
export class CookieTerms extends React.Component {
    /**
     * When creating we specify if this should show, based on if cookies have already been allowed
     */
    constructor(props) {
        super(props);
        this.state = {
            showPolicy: !CookieManager.areCookiesAllowed()
        }
    }
    /**
     * Function to allow cookies.
     */
    allowCookies() {
        CookieManager.setCookie(CookiesAllowedName, 'true', 24 * 365);
        this.setState({ showPolicy: false });
    }
    /**
     * Render our cookie policy component
     */
    render() {
        if (this.state.showPolicy) {
            return <div className='policy-bar'>
                By continuing use of this site, you agree to our <a href='/cookiepolicy'>Cookie Policy</a> and <a href='/terms'>Terms of Service</a>.  Click <a href='' onClick={() => this.allowCookies()}>Accept</a>
            </div>
        }
        return null;
    }
}
