exports.asyncMiddleware = fn => (...args) => Promise.resolve(fn(...args)).catch(args[args.length - 1]);

exports.asyncMysqlQueryFn = connection => (...query) => new Promise((resolve, reject) => {
    connection.query(...query, (error, ...rest) => error ? reject(error) : resolve(rest));
});
