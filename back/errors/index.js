const error = (name, httpStatus) => message => {
    const res = Error(message);
    res.name = name;
    res.httpStatus = httpStatus;
    return res;
};

Object.entries({
    badRequest: 400,
    unauthorized: 401,
    notFound: 404,
}).forEach(([name, httpStatus]) => {
    exports[name] = error(name, httpStatus);
});
