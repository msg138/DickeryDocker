import React from 'react';

const existingRoutes = new Set();

/**
 * Used for global event listeners, such as onHashChange
 */
export class Router extends React.Component {
    constructor({ props }) {
        super();
        // Temporary until find out how to re render child components
        window.onhashchange = () => window.location.reload();
    }
    render() {
        return this.props.children;
    }
}

/**
 * Allow for a route to be specified based on URL pathname.
 * Properties:
 *      domain=''
 *          - Allows for a domain to be specified
 *      path=''
 *          - Allows for a path to be specified.
 *      hash=''
 *          - Allows to specify the hash in the URL.
 *      condition=function(){}
 *          - Allows for a condition function to be specified. If it returns true, will route. (Expects false if not)
 */
export class Route extends React.Component {
    constructor(props) {
        super(props);
        existingRoutes.add(this);
    }

    matchURL() {
        // Check if we have our domain property set, and if it is, that we have the right hostname.
        if (this.props.domain !== undefined &&
            this.props.domain !== window.location.hostname)
            return false;
        // Check if we have a path set, and if so, that we are at the right location.
        if (this.props.path !== undefined &&
            this.props.path !== window.location.pathname)
            return false;
        if (this.props.hash !== undefined &&
            this.props.hash !== window.location.hash)
            return false;
        // Check for a condition function and that it returns true (not false)
        if (this.props.condition !== undefined &&
            this.props.condition() === false)
            return false;
        // Return successful.
        return true;
    }

    render() {
        if (this.matchURL())
            return this.props.children || null;
        return null;
    }
}

/**
 * A Default Route for if no other routes are processed.
 * Properties:
 *      url='https://example.com'
 *          - Where the default route should redirect the browser. This property is required for the DefaultRoute component.
 */
export class DefaultRoute extends React.Component {
    constructor(props) {
        super(props);

        // Throw an error if there is no URL specified for the default route. 
        if (props.url === undefined) {
            throw Error('Default route needs a URL!');
        }
    }

    checkRoutes() {
        // Keep track if we have been routed.
        let routed = false;
        // Loop through existing routes.
        for (const route of existingRoutes) {
            // If we find a route that matches, we break.
            if (route.matchURL()) {
                routed = true;
                break;
            }
        }
        // If we have not been routed. We redirect to our specified URL.
        if (routed === false) {
            window.location = this.props.url;
        }
    }

    render() {
        this.checkRoutes();
        return null;
    }
}

/**
 * Extension of Route that incorporates elements of DefaultRoute
 * Properties:
 *      url='https://url'
 *          - Where this redirect should route, if the paths match.
 */
export class Redirect extends Route {
    constructor(props) {
        super(props);

        // Throw an error if there is no URL specified for the default route. 
        if (props.url === undefined) {
            throw Error('Redirect needs a URL!');
        }
    }
    redirect() {
        window.location = this.props.url;
    }
    render() {
        // First, ensure that we match our route, if we do, redirect.
        if (this.matchURL())
            this.redirect();
        return null;
    }
}

export default {
    Route,
    DefaultRoute
};
