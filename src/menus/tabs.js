import React from 'react'

import Store from '../redux/stores/main_store'
import { Auth as AuthAction } from '../redux/actions/main_actions'
import Auth from '../utils/login_controller'
import * as Symbols from '../utils/symbols'
import { CookieManager } from '../utils/cookie'
import { Protocol, Hostname } from '../config'

/**
 * Tablist handles the tab that allows viewing containers, images and accounts. Also the keeper of the 'permission-denied' listener.
 */
export class Tablist extends React.Component {
    /**
     * Construct the tablist, and add our listener and get the current tab open.
     */
    constructor(props) {
        super(props);

        this.state = {
            tabOpen: props.selected != undefined ? props.selected : 'containers'
        }
        window.Lemonade.Mirror.addListener('permission-denied', (message, silent = false) => {
            console.log('Permission denied, ' + message + '');
            Store.AuthStore.dispatch(AuthAction.ADD_BAD_PERMISSION(message));
            if (!silent) {
                CookieManager.setCookie('permission-denied', message);
                if (window.location.hash == '#permission-denied')
                    window.location = '#permission-deny';
                else
                    window.location = '#permission-denied';
            }
            Auth.verifyLogin();
        });

        window.Lemonade.Mirror.send('has-permission', CookieManager.getCookie('loggedIn_user'), CookieManager.getCookie('loggedIn_session'), 'account.management');
    }
    /**
     * Render the tablist, with the one select with 'selected' CSS class
     */
    render() {
        return <div className='interface-main-tablist'>
            <div className={'interface-main-tablist__tab' + (this.state.tabOpen == 'containers' ? ' selected' : '')} onClick={() => window.location = Protocol + Hostname} >
                Containers
            </div>
            <div className={'interface-main-tablist__tab' + (this.state.tabOpen == 'images' ? ' selected' : '')} onClick={() => window.location = Protocol + Hostname} >
                Images
            </div>
            <div className={'interface-main-tablist__tab' + (this.state.tabOpen == 'account' ? ' selected' : '')} style={(Store.AuthStore.getState()[Symbols.BAD_PERMISSIONS].has('account.management') ? {display:'none'} : {})}  onClick={() => window.location = Protocol + Hostname} >
                Accounts
            </div>
        </div>;
    }
}
