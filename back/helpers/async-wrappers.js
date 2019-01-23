'use strict';

const { promisify } = require('util');

exports.asyncMw = fn => (...args) => Promise.resolve(fn(...args)).catch(args[args.length - 1]);

const awaitablePrefix = 'awaitable';

const awaitableProxyHandler = {
    get(obj, prop) {
        if (prop.length <= awaitablePrefix.length || !(prop.startsWith(awaitablePrefix)) || prop in obj) {
            return obj[prop];
        }
        prop = prop.substring(awaitablePrefix.length);
        prop = prop[0].toLowerCase() + prop.substring(1);
        return prop in obj ? promisify(obj[prop]) : undefined;
    }
};

exports.awaitable = obj => new Proxy(obj, awaitableProxyHandler);
