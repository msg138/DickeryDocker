import React from 'react'

// Import our stores (mainly for authstore)
import Store from '../redux/stores/main_store'

// Import the login controller for auth methods.
import LoginController from '../utils/login_controller'

// Import our symbols
import * as Symbols from '../utils/symbols'

// Import our default blank profile image.
import BlankProfileIMG from '../img/blank-profile.png'

/**
 * AccountInfo react element. Displays username, signout button, as well as a profile pic.
 * 
 */
class AccountInfo extends React.Component {
    /**
     * Generate the starting state. And add a subscription to our AuthStore.
     * @param {object} props - Properties for the element.
     */
    constructor(props) {
        super(props);

        this.state = {
            name: (Store.AuthStore.getState()[Symbols.AUTH_USER_KEY] == '' ? 'Undefined' : Store.AuthStore.getState()[Symbols.AUTH_USER_KEY])
        }

        Store.AuthStore.subscribe(() => {
            this.setState({
                name: (Store.AuthStore.getState()[Symbols.AUTH_USER_KEY] == '' ? 'Undefined' : Store.AuthStore.getState()[Symbols.AUTH_USER_KEY])
            });
        });
    }
    /**
     * Render our component with the account information.
     */
    render() {
        return <div className='account-info'>
            <div className='account-info__name'>
                {this.state.name}
            </div>
            <hr className='account-info__name_hr' /><br />
            <div className='account-info__image'>
                <img src={BlankProfileIMG} alt={this.state.name + ' profile image.'} />
            </div>
            <div className='account-info__signout' onClick={LoginController.logout}>
                Signout
            </div> 
        </div>
    }
}

// Export the accountinfo component as default.
export default {
    AccountInfo
}
