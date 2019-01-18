exports.asyncMw = fn => (...args) => Promise.resolve(fn(...args)).catch(args[args.length - 1]);

exports.asyncFn = fn => (...params) => new Promise((resolve, reject) => {
    fn(...params, (error, ...rest) => {
        error ? reject(error) : resolve(rest);
    });
});
