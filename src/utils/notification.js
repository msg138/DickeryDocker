import React from 'react'

import {DefaultNotificationTime} from '../config.js'

/**
 * Notification Element
 * Properties:
 *      text = 'notification text'
 *          - Message to insert into notification
 *      time = 5
 *          - Time in seconds for the notification to show before hiding.
 */
export default class Notification extends React.Component {
    /**
     * Construct a notification field, with properties.
     * @param {object} props - Properties for the element.
     */
    constructor(props) {
        super(props);

        this.state = {
            show: true
        };
    }
    /**
     * If our component mounts, we set a timeout for the notification to disappear.
     */
    componentDidMount() {
        this.timeoutID = setTimeout(() => this.setState({ show: false }),
            this.props.time === undefined ? DefaultNotificationTime * 1000 : this.props.time * 1000);
    }
    /**
     * If the notification is set to show, we render.
     */
    render() {
        if (this.state.show)
            return <span className={this.props.className === undefined ? 'notification' : this.props.className}>{this.props.text}</span>;
        return null;
    }
}
