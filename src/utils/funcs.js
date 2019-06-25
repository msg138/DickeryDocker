import React from 'react'

/**
 * Form builder
 * Properties:
 *      submit=function(){}
 *          - Required, this is what is run, with the values as arguments.
 */
export class Form extends React.Component {
    /**
     * Setup base properties and state for the Form.
     */
    constructor(props) {
        super(props);

        if (props.submit === undefined)
            throw Error('Form builder requires a submit property!');
        if (typeof props.submit !== 'function')
            throw Error('Form builder requires submit property to be function!');

        props.submit.bind(this);

        this.formName = 'form';
        this.formId = this.formName;
        this.formClass = this.formName;

        this.formType = 'GET';

        this.elements = [];

        this.state = {
            elements: [],
            values: new Map(),
            props: this.props
        };
    }

    /**
     * Reset the values for all values in the Form
     */
    resetValues() {
        this.setState({
            values: new Map()
        });
    }
    /**
     * Handle input change within the form
     * @param {object} event - Event for the input change
     */
    onInputChange(event) {
        this.setState({
            values: this.state.values.set(event.target.getAttribute('name'), event.target.value)
        });
    }
    /**
     * Handle submition of the form, and prevent default.
     * @param {object} event - Event for the submit form event.
     */
    submitForm(event) {
        this.props.submit(this);
        event.preventDefault();
    }
    /**
     * Handle button action
     * @param {object} event - Event for the button action.
     * @param {string} name - Name of the button function to call.
     */
    buttonAction(event, name) {
        this.state.values.get(name)();
        event.preventDefault();
    }
    /**
     * Used just to update state (trick react into updating)
     */
    updateState() {
        this.setState({
            elements: this.elements
        });
    }
    /**
     * Add an element, JSX to list of elements. 
     * @param {object} ele - Element to be added to the list.
     */
    addElement(ele) {
        this.elements.push(ele);
    }
    /**
     * Add Input / textarea field into form
     * @param {string} name - Name of the input field
     * @param {string} className - Class that the input should have.
     * @param {string} placeholder - Placeholder for the input box.
     * @param {string} label - Label if desired for the input box.
     */
    addInput(name, className, placeholder = name, label) {
        if (label !== undefined)
            this.elements.push(<label key={ name + '_label' } className={className + '_label'} htmlFor={name}>{label}</label>);
        this.elements.push(
            <input id={name} key={name} name={name} className={className} onChange={e => this.onInputChange(e)} label={label} placeholder={placeholder} value={this.state.values.get(name)} />
        );
        if (this.props.linebreak)
            this.elements.push(<br/>);
        return true;
    }
    /**
     * Add password input into form
     * @param {string} name - Name of the password field
     * @param {string} className - Class that the password should have.
     * @param {string} placeholder - Placeholder for the password box.
     * @param {string} label - Label if desired for the password box.
     */
    addPassword(name, className, placeholder = name, label) {
        if (label !== undefined)
            this.elements.push(<label key={ name + '_label' } className={className + '_label'} htmlFor={name}>{label}</label>);
        this.elements.push(
            <input id={name} key={name} type='password' name={name} className={className} onChange={e => this.onInputChange(e)} label={label} placeholder={placeholder} value={this.state.values.get(name)} />
        );
        if (this.props.linebreak)
            this.elements.push(<br/>);
        return true;
    }
    /**
     * Add a form title
     * @param {string} name - Name of the title
     * @param {string} className - Class for the title
     * @param {string} text - Text to be in the title
     */
    addTitle(name, className = name, text = name) {
        this.elements.push(
            <span id={name} key={name} className={className}>{text}</span>,
            <hr id = { name + '_hr' } className={className + '_hr'} />
        );
    }
    /**
     * Add a submit button.
     * @param {string} name - Name of the submit button.
     * @param {string} className - Class to apply to the submit button
     * @param {string} text - Text to be inside the Submit button.
     */
    addSubmit(name, className = name, text = name) {
        this.elements.push(
            <button id={name} key={name} onClick={(e) => this.submitForm(e)} className={className} value={text}>{text}</button>
        );
        if (this.props.linebreak)
            this.elements.push(<br/>);
    }
    /**
     * Add a button (any old button)
     * @param {string} name - Name for the new button
     * @param {function} func - Function to be called with the button press.
     * @param {string} className - Class to apply to the button
     * @param {string} text - Text to go inside the button.
     */
    addButton(name, func, className = name, text = name) {
        // Update our state value to have the function for the button.
        this.state.values.set(name, func);
        this.elements.push(
            <button id={name} key={name} onClick={(e) => this.buttonAction(e, name)} className={className} value={text}>{text}</button>
        );
        if (this.props.linebreak)
            this.elements.push(<br/>);
    }
    /**
     * Compile our list of elements into a form and render.
     */
    render() {
        if (this.state.elements === undefined)
            return null;
        return <form id={this.formID} method={this.formType} className={this.formClass} name={this.formName} onSubmit={ (e) => { e.preventDefault(); this.submitForm(e); } } >
                {this.state.elements}
            </form>
    }
}
