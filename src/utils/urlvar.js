/**
 * Primarily used to parse and get arguments in browser (after question mark)
 * ?arg1=0&arg2=0
 */
export default class {
    /**
     * Get a map of the arguments in the URL
     * @return {object} Map of URL arguments.
     */
    static getArguments() {
        let ret = new Map();
        if (window.location.search.length > 1) {
            let args = window.location.search.substr(1);
            args = args.split('&');
            for (const arg of args) {
                const a1 = arg.substr(0, (arg.indexOf('=') == -1 ? arg.length : (arg.indexOf('='))));
                const a2 = arg.substr(a1.length + 1);
                ret.set(a1, a2);
            }
        }
        return ret;
    }
}
