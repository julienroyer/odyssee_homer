Object.entries({
    notFound: 404,
}).forEach(([name, httpStatus]) => {
    exports[name] = message => {
        const res = Error(message);
        res.httpStatus = httpStatus;
        return res;
    };
});
