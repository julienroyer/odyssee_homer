'use strict';

const error = defaultOptions => (message, options) =>
    Object.assign(Error(message), defaultOptions, options);

[
    { name: 'badRequest', httpStatus: 400 },
    { name: 'unauthorized', httpStatus: 401 },
    { name: 'notFound', httpStatus: 404 },
    { name: 'conflict', httpStatus: 409 },
].forEach(options => {
    exports[options.name] = error(options);
});
