exports.asyncMiddleware = fn => (...args) => Promise.resolve(fn(...args)).catch(args[args.length - 1]);

exports.asyncMysqlPool = pool => ({
    asyncQuery: (...query) => new Promise((resolve, reject) => {
        pool.query(...query, (error, ...rest) => error ? reject(error) : resolve(rest));
    }),
});

exports.asyncPassport = passport => ({
    authenticate: (...params) => new Promise((resolve, reject) => {
        pool.query(...query, (error, ...rest) => error ? reject(error) : resolve(rest));
    }),
});
