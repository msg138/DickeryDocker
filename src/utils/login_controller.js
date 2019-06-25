import React from 'react'

import FontAwesome from 'react-fontawesome'
import URLVar from './urlvar'
import Store from '../redux/stores/main_store'
import { Auth } from '../redux/actions/main_actions'
import { Form } from './funcs'
import { AccountListRefreshRate } from '../config'
import * as Symbols from './symbols'
import { CookieManager } from './cookie'
import '../css/auth.css'

/**
 * Methods for user authentication
 */
/**
 * Call to try to login as user, if successful will set necessary cookies.
 * @param {string} username - Username to login with
 * @param {string} password - Password to login with
 */
function login(username, password) {
    // Send login message to server.
    window.Lemonade.Mirror.send('login', username, password);

    // Add listener for login success.
    window.Lemonade.Mirror.addListener('login-success', (session) => {
        Store.AuthStore.dispatch(Auth.LOGIN_ACTION(username, 0));
        CookieManager.setCookie('loggedIn', 'true');
        CookieManager.setCookie('loggedIn_user', username);
        CookieManager.setCookie('loggedIn_session', session);
        window.location.reload();
    });
    // Add listener for login failure.
    window.Lemonade.Mirror.addListener('login-fail', () => {
        CookieManager.setCookie('loggedIn', 'false');
        CookieManager.setCookie('loggedIn_session', '');
        window.location = '#login-failed';
        window.location.reload();
    });

    return true;
}

/**
 * Used to verify that the session is still valid with server.
 */
function verifyLogin() {
    // Keep track if we should redirect to login page or not (to prevent redirect loop)
    let shouldDirect = false;
    // If our Cookies are undefined, we check against login variables set in URL (to allow for autologin links)
    if (CookieManager.getCookie('loggedIn_user', undefined) == undefined || CookieManager.getCookie('loggedIn_session', undefined) == undefined) {
        // Check if we have our login vars set in URL
        if (URLVar.getArguments().get('user') != undefined && URLVar.getArguments().get('session') != undefined) {
            CookieManager.setCookie('loggedIn', 'true');
            CookieManager.setCookie('loggedIn_session', URLVar.getArguments().get('session'));
            CookieManager.setCookie('loggedIn_user', URLVar.getArguments().get('user'));
            shouldDirect = true;
            console.log(CookieManager.getCookie('loggedIn_session'));
        }
        else {
            if (CookieManager.getCookie('loggedIn', 'false') == 'true')
                setTimeout(() => {
                    window.location = '/login#login-expired';
                    CookieManager.setCookie('loggedIn', 'false');
                    CookieManager.removeCookie('loggedIn_session', '');
                }, 1000);
            return false;
        }
    }
    // Send our verify command to server.
    window.Lemonade.Mirror.send('verify', CookieManager.getCookie('loggedIn_user'), CookieManager.getCookie('loggedIn_session'));
    // Add our successful verify listener.
    window.Lemonade.Mirror.addListener('verify-success', (session) => {
        if (shouldDirect)
            window.location = '/dashboard';
    });
    // Add verify fail listener
    window.Lemonade.Mirror.addListener('verify-fail', (reason) => {
        if (CookieManager.getCookie('loggedIn', 'false') == 'true') {
            window.location = '/login#login-expired';
        }
        CookieManager.setCookie('loggedIn', 'false');
        CookieManager.removeCookie('loggedIn_session');
        CookieManager.removeCookie('loggedIn_user');
        alert(reason);
    });
}

/**
 * Log the user out (tell the server to remove from cache as well, and delete session)
 */
function logout() {
    window.Lemonade.Mirror.send('logout', CookieManager.getCookie('loggedIn_user'), CookieManager.getCookie('loggedIn_session'));

    Store.AuthStore.dispatch(Auth.LOGOUT_ACTION());
    CookieManager.removeCookie('loggedIn');
    CookieManager.removeCookie('loggedIn_user');
    CookieManager.removeCookie('loggedIn_session');
}

/**
 * Login Form for the main login page.
 */
class LoginForm extends Form {
    /**
     * Set our form variables for this login interface.
     */
    constructor(props) {
        super(props);
        this.formName = 'interface-login';
        this.formClass = 'interface-login';
        this.formID = 'interface-login';
        this.formType = 'POST';
    }
    /**
     * Add our form inputs
     */
    componentDidMount() {
        this.addTitle('Login', 'interface-login__title');
        this.addElement(<br/>);
        this.addElement();
        this.addInput('username', 'interface-login__username', 'Username', <FontAwesome name='user' size='2x' />);
        this.addPassword('password', 'interface-login__password', 'Password', <FontAwesome name = 'lock' size = '2x' />);
        this.addSubmit('LoginButton', 'interface-login__login', 'Login');
        this.updateState();
    }
    /**
     * Call to our login method to try and login.
     */
    submitLogin() {
        if (!login(this.state.values.get('username'), this.state.values.get('password')))
            window.location = '#login-failed';
    }
}

/**
 * Related variables and classes to Account management interface
 */
// User data map to contain information based on user (such as group / permission)
let userDataMap = new Map();

/**
 * List component to display accounts
 */
class AccountList extends React.Component {
    /**
     * Do some basic init, such as setup our listener for received account list.
     * @param {object} props - Properties for the element.
     */
    constructor(props) {
        super(props);

        this.state = {
            accounts: []
        };
        // Add our subscription
        Store.AuthStore.subscribe(() => { this.updateAccountList() });

        window.Lemonade.Mirror.addListener('account-ls', (accounts) => {
            accounts.forEach((account) => {
                userDataMap.set(account.username, account);

                Store.AuthStore.dispatch(Auth.ADD_ACCOUNT(account.username));
            });
            /*let removal = Array.from(userDataMap.keys()).filter((name) => {
                return accounts.find((username) => {
                    return username == name;
                }) == undefined;
            });
            for (const remove of removal) {
                userDataMap.delete(remove);
                Store.ContainerStore.dispatch(Auth.REMOVE_ACCOUNT(remove));
            }*/
        });
    }

    // Keep track of our account update interval.
    accountInterval = undefined;
    /**
     * On successful mount, we start checking for account list.
     */
    componentDidMount() {
        // Add containers for testing.
        if (this.accountInterval == undefined)
            this.accountInterval = setInterval(() => {
                    if (Store.AuthStore.getState()[Symbols.BAD_PERMISSIONS].has('docker-container-ls')) return;
                    window.Lemonade.Mirror.send('account-ls', CookieManager.getCookie('loggedIn_user'), CookieManager.getCookie('loggedIn_session'));
                },
                AccountListRefreshRate);
        window.Lemonade.Mirror.send('account-ls', CookieManager.getCookie('loggedIn_user'), CookieManager.getCookie('loggedIn_session'));
    }
    /**
     * Update the state for account list, with what is in Redux store.
     */
    updateAccountList() {
        // Grab from our redux store.
        this.setState({
            accounts: Store.AuthStore.getState()[Symbols.ACCOUNT_LIST]
        });
    }
    /**
     * Render our list of accounts.
     */
    render() {
        let result = [];
        if (Store.AuthStore.getState()[Symbols.BAD_PERMISSIONS].has('account-ls'))
            result.push(<FontAwesome className='centered-symbol' name='minus-circle' size='3x' />);
        else
            for (const username of this.state.accounts) {
                if (userDataMap.get(username).permanent == 0)
                    result.push(<AccountItem key={username} name={username} remove />);
                else
                    result.push(<AccountItem key={username} name={username} />);
            }
        return <div className='interface-main'>
            <CreateAccountItem />
            {[...result]}
            </div>;
    }
}

/**
 * Item used to display our account creation dialog.
 */
class CreateAccountItem extends React.Component {
    /**
     * Nothing special here, just initialize the component.
     * @param {object} props - Properties of the element.
     */
    constructor(props) {
        super(props);

        this.state = {
            expand: false,
        };
    }
    /**
     * Toggle the state for expansion directly.
     */
    justToggleExpand() {
        this.setState({
            expand: !this.state.expand
        });
    }
    /**
     * Make sure this is the only one being expanded, and handle as necessary.
     */
    toggleExpand() {
        if (currentExpanded !== undefined) {
            currentExpanded.justToggleExpand();
            currentExpanded = undefined;
        }
        if (!this.state.expand && currentExpanded === undefined)
            currentExpanded = this;

        this.justToggleExpand();
    }

    /**
     * Check if the create account item is expanded.
     * @return {boolean} If the item is expanded.
     */
    isExpanded() {
        return this.state.expand;
    }
    /**
     * Method to get options as set in form, and send to server.
     */
    createAccount() {
        if (document.getElementById('newaccount-name').value == '')
            return;
        let options = {
            username: '',
            group: '',
            permission: 0
        };
        if (document.getElementById('newaccount-name').value != '') {
            options.username = document.getElementById('newaccount-name').value;
        }
        if (document.getElementById('newaccount-permission').value != '') {
            options.permission = document.getElementById('newaccount-permission').value;
        }
        if (document.getElementById('newaccount-group').value != '') {
            options.group = document.getElementById('newaccount-group').value;
        }

        window.Lemonade.Mirror.send('account-create', CookieManager.getCookie('loggedIn_user'), CookieManager.getCookie('loggedIn_session'), options);
    }
    /**
     * Render our account creation dialog.
     */
    render() {
        return <div className={ 'container-item' + (this.state.expand == true ? ' expanded' : '') }>
                <b className='container-item__image'><textarea className='newcontainer' id='newaccount-name' rows='1' placeholder='New Username'></textarea></b>
                <div className = 'container-item__name newcontainer'  onClick={() => this.toggleExpand()}><FontAwesome name='caret-down' size='1x' /> Options <FontAwesome name='caret-down' size='1x' /></div>
                <div className='container-item__actions'>
                    <div onClick={() => { this.createAccount(); }} className={'container-item__action'} title='Create'><FontAwesome name='plus-circle' size='2x' /></div>
                </div>
                <div className = 'container-item__information'>
                    <div className='newcontainer newcontainer-value'>Permission Level - <textarea rows='1' className='newcontainer newcontainer-value-input' id='newaccount-permission' placeholder='0'></textarea></div>
                    <div className='newcontainer newcontainer-value'>Group Name - <textarea rows='1' className='newcontainer newcontainer-value-input' id='newaccount-group' placeholder='default'></textarea></div>
                </div>
            </div>;
    }
}
// Used to keep track of the currently expanded item.
let currentExpanded = undefined;

/**
 * Account item, used to display account information and allow changes to user.
 */
class AccountItem extends React.Component {
    /**
     * Nothing special, just initialize our AccountItem component
     */
    constructor(props) {
        super(props);

        this.state = {
            expand: false,
        };
    }
    /**
     * Just toggle the state directly for expansion
     */
    justToggleExpand() {
        this.setState({
            expand: !this.state.expand
        });
    }
    /**
     * Make sure this is the only item being expanded
     */
    toggleExpand() {
        if (currentExpanded !== undefined) {
            currentExpanded.justToggleExpand();
            currentExpanded = undefined;
        }
        if (!this.state.expand && currentExpanded === undefined)
            currentExpanded = this;

        this.justToggleExpand();
    }
    /**
     * Get if the item is currently expanded.
     * @return {boolean} If the item is currently expanded.
     */
    isExpanded() {
        return this.state.expand;
    }
    /**
     * Remove user from database.
     * @param {string} name - User to send removal for.
     */
    removeUser(name) {
        // Remove user
        window.Lemonade.Mirror.send('account-remove', CookieManager.getCookie('loggedIn_user'), CookieManager.getCookie('loggedIn_session'), name);
    }
    /**
     * Send update user command to server, based on filled out form.
     * @param {string} name - User to update in database.
     */
    updateUser(name) {
        // Update user
        let options = {
            username: name,
            password: document.getElementById('edituser-password-' + name).value,
            group: document.getElementById('edituser-group-' + name).value,
            permission: document.getElementById('edituser-permission-' + name).value,
        };

        if (document.getElementById('edituser-clearsession-' + name).checked)
            options.session = '';

        window.Lemonade.Mirror.send('account-update', CookieManager.getCookie('loggedIn_user'), CookieManager.getCookie('loggedIn_session'), options);
    }
    /**
     * On mount, we set our permission and group fields to what they are set to currently.
     */
    componentDidMount() {
        document.getElementById('edituser-permission-' + this.props.name).value = userDataMap.get(this.props.name).permission;
        document.getElementById('edituser-group-' + this.props.name).value = userDataMap.get(this.props.name).group_name;
    }
    /**
     * Render the account item nicely, with input fields for updating the user as needed.
     */
    render() {
        return <div className={ 'container-item' + (this.state.expand == true ? ' expanded' : '') }>
                    <b className='container-item__name' onClick={() => this.toggleExpand()}>{this.props.name}</b>
                    <div className = 'container-item__image' > { this.props.group } </div>
                    <div className='container-item__actions'>
                        <div onClick={() => this.removeUser(this.props.name)} className={'container-item__action' + (this.props.remove ? '' : ' disabled')} title='Remove'><FontAwesome name='trash' size='1x' /></div>
                    </div>
                    <div className = 'container-item__information' > 
                        <b className = 'container-item__title'> User Account </b>
                        <ul className = 'container-item__information'>
                            <li>Permission Level - <textarea rows='1' className='newcontainer newcontainer-value-input' id={'edituser-permission-' + this.props.name}></textarea></li>
                            <li>Group Name - <textarea rows='1' className='newcontainer newcontainer-value-input' id={'edituser-group-' + this.props.name}></textarea></li>
                            <li>New Password - <textarea rows='1' className='newcontainer newcontainer-value-input' id={'edituser-password-' + this.props.name} placeholder='New password'></textarea></li>
                            <li>Clear Session - <input type='checkbox' id={'edituser-clearsession-' +  this.props.name} /></li>
                            <br />
                            <li><b className='clickable' onClick={ ()=> { this.updateUser(this.props.name) }}>Submit Changes</b></li>
                        </ul>
                    </div>
                </div>;
    }
}
/**
 * Export our components and functions for use elsewhere
 */
export default {
    login,
    logout,

    LoginForm,

    verifyLogin,

    AccountList,
    AccountItem
}
