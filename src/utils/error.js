import React from 'react'

import { Route } from './router'

import { CookieManager } from './cookie'

import Notification from './notification'

/**
 * Component that handles most received errors. These are handled as Hashes in the URL
 */
export default class ErrorHandler extends React.Component {
    /**
     * Basic constructor. Nothing special done.
     */
    constructor(props) {
        super(props);
    }
    /**
     * Render our error handler
     */
    render() {
        return <div>
                <Route hash='#login-failed'>
                    <Notification text='Login failed!' />
                </Route>
                <Route hash='#no-cookie'>
                    <Notification text='Please accept the Cookie Policy below!' />
                </Route>
                <Route hash='#login-expired'>
                    <Notification text='Session expired! Please login again.' />
                </Route>
                <Route hash='#permission-denied'>
                    <Notification text={'Could not complete, ' + CookieManager.getCookie('permission-denied', 'NIL')} />
                </Route>
                <Route hash='#permission-deny'>
                    <Notification text={'Could not complete, ' + CookieManager.getCookie('permission-denied', 'NIL')} />
                </Route>
                <Route hash='#action-failed'>
                    <Notification text='Action failed!' />
                </Route>
            </div>;
    }
}
