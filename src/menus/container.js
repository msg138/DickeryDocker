import React from 'react'

import Store from '../redux/stores/main_store'
import * as Symbols from '../utils/symbols'
import { Auth as AuthAction, Container, Image } from '../redux/actions/main_actions'
import { Form } from '../utils/funcs'
import Auth from '../utils/login_controller'
import URLVar from '../utils/urlvar'

import { Hostname, Protocol, ContainerListRefreshRate } from '../config'
import { CookieManager } from '../utils/cookie'
// Get fontawesome for icons.
import FontAwesome from 'react-fontawesome'

// Get our CSS
import '../css/container.css'

// Used for any menu that has an expandable list (Containers, images, etc.)
let currentExpanded = undefined;

// Maps to contain persistent data for containers / images
const imageDataMap = new Map();
const containerDataMap = new Map();

/**
 * ContainerList component. Will be used as container for containeritems.
 */
class ContainerList extends React.Component {
    /**
     * Setup the containerlist and add ContainerStore subscription
     * @param {object} props - Element properties.
     */
    constructor(props) {
        super(props);

        this.state = {
            containers: []
        };
        // Add our subscription
        Store.ContainerStore.subscribe(() => { this.updateContainerList() });

        window.Lemonade.Mirror.addListener('docker-container-ls', (containers) => {
            containers.forEach((container) => {
                // Get the container name if any.
                let cName = container.Id.substr(0, 8);
                if (container.Names.length > 0)
                    cName = container.Names[0];

                containerDataMap.set(cName, container);

                Store.ContainerStore.dispatch(Container.ADD_CONTAINER(cName, container.Image));
            });
            let removal = Array.from(containerDataMap.keys()).filter((name) => {
                return containers.find((container) => {
                    let cName = container.Id.substr(0, 8);
                    if (container.Names.length > 0)
                        cName = container.Names[0];
                    return cName == name;
                }) == undefined;
            });
            for (const remove of removal) {
                containerDataMap.delete(remove);
                Store.ContainerStore.dispatch(Container.REMOVE_CONTAINER(remove));
            }
        });
    }

    // Used to keep track of our Container List Update interval (to get new statuses and containers)
    containerInterval = undefined;

    /**
     * If our component mounted, we start up our interval
     */
    componentDidMount() {
        // Add containers for testing.
        if (this.containerInterval == undefined)
            this.containerInterval = setInterval(() => {
                    if (Store.AuthStore.getState()[Symbols.BAD_PERMISSIONS].has('docker-container-ls')) return;
                    window.Lemonade.Mirror.send('docker-container-ls', CookieManager.getCookie('loggedIn_user', undefined), CookieManager.getCookie('loggedIn_session', undefined));
                },
                ContainerListRefreshRate);
        window.Lemonade.Mirror.send('docker-container-ls', CookieManager.getCookie('loggedIn_user', undefined), CookieManager.getCookie('loggedIn_session', undefined));
    }
    /**
     * Used to update the state with the state in our Redux Store.
     */
    updateContainerList() {
        // Grab from our redux store.
        this.setState({
            containers: Store.ContainerStore.getState()[Symbols.CONT_LIST_KEY]
        });
    }
    /**
     * Render our list with the components as well as the create container itme.
     */
    render() {
        let result = [];
        if (Store.AuthStore.getState()[Symbols.BAD_PERMISSIONS].has('docker-container-ls'))
            result.push(<FontAwesome className='centered-symbol' name='minus-circle' size='3x' />);
        else
            for (const [container, key] of this.state.containers) {
                result.push(<ContainerItem key={container + ',' + key} name={container} image={key} />);
            }
        return <div className='interface-main'>
            <CreateContainerItem />
            {[...result]}
            </div>;
    }
}

/**
 * CreateContainer item as it is in the list of containers.
 */
class CreateContainerItem extends React.Component {
    /**
     * Create the createcontaineritem
     */
    constructor(props) {
        super(props);

        this.state = {
            expand: false,
        };
    }
    /**
     * Used to just toggle the xpand using state
     */
    justToggleExpand() {
        this.setState({
            expand: !this.state.expand
        });
    }
    /**
     * Check and compare against if there is a currently expanded item
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
     * Get if this container is expanded.
     */
    isExpanded() {
        return this.state.expand;
    }

    /**
     * Check for URL arguments, to see if there was a link to create a container from an image submitted
     */
    componentDidMount() {
        document.getElementById('newcontainer-image').value = (URLVar.getArguments().get('image') == undefined ? '' : URLVar.getArguments().get('image'));
        if (URLVar.getArguments().get('image') != undefined)
            this.toggleExpand();
    }
    /**
     * Used to create a container using the options specified in form
     */
    createContainer() {
        if (document.getElementById('newcontainer-image').value == '')
            return;
        let options = {
            Image: document.getElementById('newcontainer-image').value,
            // Cmd: document.getElementById('newcontainer-cmd').value.split(' '),

            HostConfig: {}
        };
        if (document.getElementById('newcontainer-name').value != '') {
            options.name = document.getElementById('newcontainer-name').value;
        }
        if (document.getElementById('newcontainer-cmd').value != '')
            options.Cmd = document.getElementById('newcontainer-cmd').value.split(' ');
        if (document.getElementById('newcontainer-workdir').value != '')
            options.WorkingDir = document.getElementById('newcontainer-workdir').value;
        if (document.getElementById('newcontainer-ports').value != '') {
            let ports = document.getElementById('newcontainer-ports').value.split(',');
            let PortBindings = {};
            for (const port of ports) {
                let splitPorts = port.split(':')
                PortBindings[splitPorts[1] + '/tcp'] = [{ "HostPort": splitPorts[0] }];
            }
            options.HostConfig.PortBindings = PortBindings;
        }
        if (document.getElementById('newcontainer-autoremove').checked) {
            options.HostConfig.AutoRemove = true;
        }

        window.Lemonade.Mirror.send('docker-create', CookieManager.getCookie('loggedIn_user', undefined), CookieManager.getCookie('loggedIn_session', undefined), options,
            document.getElementById('newcontainer-autostart').checked, document.getElementById('newcontainer-groupcontainer').checked);

    }

    /**
     * Render our create container item
     */
    render() {
        return <div className={ 'container-item' + (this.state.expand == true ? ' expanded' : '') }>
                <b className='container-item__image'><textarea className='newcontainer' id='newcontainer-name' rows='1' placeholder='Container Name'></textarea><textarea className='newcontainer' id='newcontainer-image' rows='1' placeholder='Container Image'></textarea></b>
                <div className = 'container-item__name newcontainer'  onClick={() => this.toggleExpand()}><FontAwesome name='caret-down' size='1x' /> Options <FontAwesome name='caret-down' size='1x' /></div>
                <div className='container-item__actions'>
                    <div onClick={() => { this.createContainer(); }} className={'container-item__action'} title='Create'><FontAwesome name='plus-circle' size='2x' /></div>
                </div>
                <div className = 'container-item__information'>
                    <div className='newcontainer newcontainer-value'>Ports - <textarea rows='1' className='newcontainer newcontainer-value-input' id='newcontainer-ports' placeholder='<host>:<docker>,<host>:<docker>'></textarea></div>
                    <div className='newcontainer newcontainer-value'>Command - <textarea rows='1' className='newcontainer newcontainer-value-input' id='newcontainer-cmd' placeholder='Command'></textarea></div>
                    <div className='newcontainer newcontainer-value'>Working Directory - <textarea rows='1' className='newcontainer newcontainer-value-input' id='newcontainer-workdir' placeholder='/home/user'></textarea></div>
                    <div className='newcontainer newcontainer-value'>Auto Remove - <input type='checkbox' className='newcontainer newcontainer-value-input' id='newcontainer-autoremove' /></div>
                    <div className='newcontainer newcontainer-value'>Auto Start - <input type='checkbox' className='newcontainer newcontainer-value-input' id='newcontainer-autostart' /></div>
                    <div className='newcontainer newcontainer-value'>Group Container - <input type='checkbox' className='newcontainer newcontainer-value-input' id='newcontainer-groupcontainer' /></div>
                </div>
            </div>;
    }
}

/**
 * Form used for executing commands in docker container.
 */
class ExecCommandForm extends Form {
    /**
     * Construct our form
     */
    constructor(props) {
        super(props);
        this.formName = 'container-item__exec';
        this.formClass = 'container-item__exec';
        this.formID = 'container-item__exec';
        this.formType = 'POST';
    }
    /**
     * Add our necessary items
     */
    componentDidMount() {
        this.addInput('command', 'container-item__exec-input', 'Command', '');
        this.addSubmit('execButton', 'container-item__exec-submit', 'Exec');
        this.updateState();
    }
}
/**
 * Container Item used to display a container
 */
class ContainerItem extends React.Component {
    /**
     * Setup the container item, using the state and props provided (image and name should be specified as props)
     */
    constructor(props) {
        super(props);

        this.state = {
            expand: false,
            log: '',
            name: this.props.name.replace(/\//g, '')
        };
        window.Lemonade.Mirror.addListener('docker-logs-' + this.state.name, (logs) => {
            this.updateLog(logs);
        });
        window.Lemonade.Mirror.addListener('docker-exec-' + this.state.name, (logs) => {
            // Clear timeout temporarily.
            this.stopTimeout();
            setTimeout(() => { this.startTimeout(); }, 20000);
            console.log(logs);
            this.updateLog(logs);
        });
    }
    // Keep track of our log interval / timeout.
    logTimeout = undefined;

    /**
     * If component is unmounting, stop our timeout if not already stopped.
     */
    componentWillUnmount() {
        this.stopTimeout();
    }

    /**
     * Start the timeout for log requests
     */
    startTimeout() {
        if (this.logTimeout == undefined)
            this.logTimeout = setInterval(() => {
                    if (Store.AuthStore.getState()[Symbols.BAD_PERMISSIONS].has('docker-logs')) {
                        this.stopTimeout();
                        return;
                    }
                    window.Lemonade.Mirror.send('docker-logs',
                        CookieManager.getCookie('loggedIn_user', undefined), CookieManager.getCookie('loggedIn_session', undefined), this.state.name);
                },
                2000);
    }
    /**
     * Stop the timeout for log requests
     */
    stopTimeout() {
        if (this.logTimeout != undefined)
            clearInterval(this.logTimeout);
        this.logTimeout = undefined;
    }
    /**
     * Toggle only the state
     */
    justToggleExpand() {
        this.setState({
            expand: !this.state.expand
        });
    }
    /**
     * Handle if another container should be unexpanded, and if the timeout should start or stop
     */
    toggleExpand() {
        if (currentExpanded !== undefined) {
            currentExpanded.justToggleExpand();
            currentExpanded = undefined;
        }
        if (!this.state.expand && currentExpanded === undefined)
            currentExpanded = this;

        // Request the logs if we can.
        if (!this.state.expand) {
            this.startTimeout();
        }
        else {
            this.stopTimeout();
        }


        this.justToggleExpand();
    }

    /**
     * Start Container
     * @param {string} name - Name of this container to start.
     */
    startContainer(name) {
        window.Lemonade.Mirror.send('docker-start', CookieManager.getCookie('loggedIn_user', undefined), CookieManager.getCookie('loggedIn_session', undefined), name);
    }
    /**
     * Stop Container
     * @param {string} name - Name of the container to stop
     */
    stopContainer(name) {
        window.Lemonade.Mirror.send('docker-stop', CookieManager.getCookie('loggedIn_user', undefined), CookieManager.getCookie('loggedIn_session', undefined), name);
    }
    /**
     * Remove container
     * @param {string} name - Name of the container to remove.
     */
    removeContainer(name) {
        window.Lemonade.Mirror.send('docker-remove', CookieManager.getCookie('loggedIn_user', undefined), CookieManager.getCookie('loggedIn_session', undefined), name);
    }
    /**
     * Kill container
     * @param {string} name - Name of the container to kill.
     */
    killContainer(name) {
        window.Lemonade.Mirror.send('docker-kill', CookieManager.getCookie('loggedIn_user', undefined), CookieManager.getCookie('loggedIn_session', undefined), name);
    }

    /**
     * Update our log with any received log messages
     * @param {string} log - Logs to update with
     */
    updateLog(log) {
        this.setState({
            log: log
        });
        if (document.getElementById('container-log__' + this.state.name) != undefined)
            document.getElementById('container-log__' + this.state.name).scrollTop = document.getElementById('container-log__' + this.state.name).scrollHeight;
    }

    /**
     * Get if the container Item is expanded or not.
     */
    isExpanded() {
        return this.state.expand;
    }
    /**
     * Execute command on this container
     * @param {string} command - Command to run
     * @param {string} name - Name of the container to run the command in.
     */
    execCommand(command, name) {
        if (command == undefined || command == '')
            return false;
        console.log('Executing: ' + command);
        command = command.split(' ');
        window.Lemonade.Mirror.send('docker-exec', CookieManager.getCookie('loggedIn_user', undefined), CookieManager.getCookie('loggedIn_session', undefined), name, command)
    }
    /**
     * Render our Container Item
     */
    render() {
        return <div className={ 'container-item' + (this.state.expand == true ? ' expanded' : '') }>
                    <b className='container-item__name' onClick={() => this.toggleExpand()}>{this.state.name}</b>
                    <div className = 'container-item__image' > { containerDataMap.get(this.props.name).State } </div>
                    <div className='container-item__actions'>
                        <div onClick={() => this.stopContainer(this.state.name)} className={'container-item__action' + (containerDataMap.get(this.props.name).State == 'running' ? '' : ' disabled')} title='Turn Off'><FontAwesome name='power-off' size='1x' /></div>
                        <div onClick={() => this.killContainer(this.state.name)} className={'container-item__action' + (containerDataMap.get(this.props.name).State == 'running' ? '' : ' disabled')} title='Kill'><FontAwesome name='times-circle' size='1x' /></div>
                        <div onClick={() => this.startContainer(this.state.name)} className={'container-item__action' + (containerDataMap.get(this.props.name).State != 'running' ? '' : ' disabled')} title='Start'><FontAwesome name='play' size='1x' /></div>
                        <div onClick={() => this.removeContainer(this.state.name)} className={'container-item__action' + (containerDataMap.get(this.props.name).State != 'running' ? '' : ' disabled')} title='Remove'><FontAwesome name='trash' size='1x' /></div>
                    </div>
                    <div className = 'container-item__information' > 
                        <b className = 'container-item__title'> Docker Container </b>
                        <ul className = 'container-item__information'>
                            <li><b>Container Id</b> - { containerDataMap.get(this.props.name).Id }</li>
                            <li><b>Image</b> - { containerDataMap.get(this.props.name).Image }</li>
                            <li><b>Created</b> - { containerDataMap.get(this.props.name).Created }</li>
                            <li><b>Command</b> - { containerDataMap.get(this.props.name).Command }</li>
                            <li><b>Status</b> - { containerDataMap.get(this.props.name).Status }</li>
                            <li><b>Ports</b> - { JSON.stringify(containerDataMap.get(this.props.name).Ports) }</li>
                        </ul>
                        <textarea readOnly className = 'container-item__log' id = { 'container-log__' + this.state.name } value = { this.state.log } ></textarea>
                        <ExecCommandForm submit={ (form) => { this.execCommand(form.state.values.get('command'), this.state.name); } } />
                    </div>
                </div>;
    }
}

/**
 * Similar to container list, but is a container for the Image Items.
 */
class ImageList extends React.Component {
    /**
     * Initialize the list, and subscribe to the image store.
     * @param {object} props - Properties for the element.
     */
    constructor(props) {
        super(props);

        this.state = {
            images: []
        };
        // Add our subscription
        Store.ImageStore.subscribe(() => { this.updateImageList() });

    }

    // Interval that is used for checking updated images.
    imageInterval = undefined;

    /**
     * If the component mounts, then we start our image interval
     */
    componentDidMount() {
        // Add Images for testing.
        window.Lemonade.Mirror.send('docker-image-ls', CookieManager.getCookie('loggedIn_user', undefined), CookieManager.getCookie('loggedIn_session', undefined));

        window.Lemonade.Mirror.addListener('docker-image-ls', (images) => {
            images.forEach((image) => {
                // Get the container name if any.
                let iName = image.Id.substr(7, 15);
                if (image.RepoTags.length > 0)
                    iName = image.RepoTags[0];
                let iTag = image.Id;

                if (iName.indexOf(':') != -1) {
                    iTag = iName.substr(iName.indexOf(':') + 1);

                    iName = iName.substr(0, iName.indexOf(':'))
                }

                // Store the image in our data store (for later information grabbing)
                imageDataMap.set(iName + ':' + iTag, image);

                Store.ImageStore.dispatch(Image.ADD_IMAGE(iName, iTag));
            });
            let removal = Array.from(containerDataMap.keys()).filter((name) => {
                return images.find((image) => {
                    let iName = image.Id.substr(7, 15);
                    if (image.RepoTags.length > 0)
                        iName = image.RepoTags[0];
                    return iName == name;
                }) == undefined;
            });
            for (const remove of removal) {
                imageDataMap.delete(remove);
                Store.ContainerStore.dispatch(Image.REMOVE_IMAGE(remove));
            }
        });
        // Add containers for testing.
        if (this.imageInterval == undefined)
            this.imageInterval = setInterval(() => {
                    if (Store.AuthStore.getState()[Symbols.BAD_PERMISSIONS].has('docker-image-ls')) return;
                    window.Lemonade.Mirror.send('docker-image-ls', CookieManager.getCookie('loggedIn_user', undefined), CookieManager.getCookie('loggedIn_session', undefined));
                },
                ContainerListRefreshRate);
    }
    /**
     * Update our state with what is in the Redux store for images.
     */
    updateImageList() {
        // Grab from our redux store.
        this.setState({
            images: Store.ImageStore.getState()[Symbols.IMG_LIST_KEY]
        });
    }
    /**
     * Render our image list
     */
    render() {
        let result = [];
        if (Store.AuthStore.getState()[Symbols.BAD_PERMISSIONS].has('docker-image-ls'))
            result.push(<FontAwesome className='centered-symbol' name='minus-circle' size='3x' />);
        else
            for (const image of this.state.images) {
                result.push(<ImageItem key={image} image={image.substring(0, image.indexOf(':'))} tag={image.substring(image.indexOf(':') + 1)} />);
            }
        return <div className='interface-main'>
            {[...result]}
            </div>;
    }
}

/**
 * Item used to convey information about the images on the docker host
 */
class ImageItem extends React.Component {
    /**
     * Create the image item. Possible props are 'image' and 'tag'
     */
    constructor(props) {
        super(props);

        this.state = {
            expand: false,
            name: props.image + ':' + props.tag
        };
        // Here we can get more information about the docker container from the api.
    }
    /**
     * Toggle just the state for the image item.
     */
    justToggleExpand() {
        this.setState({
            expand: !this.state.expand
        });
    }
    /**
     * Handle other expansion (such as minimizing other expanded elements)
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
     * Get whether the image item is expanded or not.
     */
    isExpanded() {
        return this.state.expand;
    }
    /**
     * Create a container from this image
     * @param {string} name - Image name to route to create a container for.
     */
    createContainer(name) {
        window.location = Protocol + Hostname + '/dashboard?image=' + name;
    }
    /**
     * Remove image from docker host
     * @param {string} name - Image to remove (including tag);
     */
    removeImage(name) {
        window.Lemonade.Mirror.send('docker-image-remove', CookieManager.getCookie('loggedIn_user', undefined), CookieManager.getCookie('loggedIn_session', undefined), imageDataMap.get(this.props.image + ':' + this.props.tag).Id.substr(7));
    }

    /**
     * Render the image item with the necessary values.
     */
    render() {
        return <div className={ 'container-item' + (this.state.expand == true ? ' expanded' : '') }>
                    <b className='container-item__name' onClick={() => this.toggleExpand()}>{this.props.image}</b>
                    <div className = 'container-item__image' > { this.props.tag } </div>
                    <div className='container-item__actions'>
                        <div onClick={() => this.createContainer(this.state.name)} className={'container-item__action'} title='Create Container From'><FontAwesome name='plus-square' size='1x' /></div>
                        <div onClick={() => this.removeImage(this.state.name)} className={'container-item__action'} title='Remove'><FontAwesome name='trash' size='1x' /></div>
                    </div>
                    <div className = 'container-item__information' > 
                        <b className = 'container-item__title'> Docker Image </b>
                        <ul className = 'container-item__information'>
                            <li><b>Image Id</b> - { imageDataMap.get(this.props.image + ':' + this.props.tag).Id }</li>
                            <li><b>Created On</b> - { imageDataMap.get(this.props.image + ':' + this.props.tag).Created }</li>
                            <li><b>Image Size</b> - { imageDataMap.get(this.props.image + ':' + this.props.tag).Size / 1024 / 1024 } Mb</li>
                            <li><b>Container Count</b> - { imageDataMap.get(this.props.image + ':' + this.props.tag).Containers == -1 ? 0 : imageDataMap.get(this.props.image + ':' + this.props.tag).Containers }</li>
                        </ul>
                    </div>
                </div>;
    }
}

// Have our default exports for the container list and image list items.
export default {
    ContainerList,
    ContainerItem,

    ImageList,
    ImageItem
}
