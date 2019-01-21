exports.asyncMw = fn => (...args) => Promise.resolve(fn(...args)).catch(args[args.length - 1]);

const asyncFn = exports.asyncFn = fn => (...params) => new Promise((resolve, reject) => {
    fn(...params, (error, ...rest) => {
        error ? reject(error) : resolve(rest);
    });
});

const asyncPrefix = 'async';

const asyncProxyHandler = {
    get(obj, prop) {
        if (prop in obj || prop.length <= asyncPrefix.length || !(prop.startsWith(asyncPrefix))) {
            return obj[prop];
        }
        prop = prop.substring(asyncPrefix.length);
        prop = prop[0].toLowerCase() + prop.substring(1);
        return prop in obj ? asyncFn((...params) => obj[prop](...params)) : undefined;
    }
};

exports.asyncProxy = obj => new Proxy(obj, asyncProxyHandler);
