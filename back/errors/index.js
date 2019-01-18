const error = (name, httpStatus) => (message, { causedBy }) => {
    const res = Error(message);
    res.name = name;
    res.httpStatus = httpStatus;
    res.causedBy = causedBy;
    return res;
};

Object.entries({
    badRequest: 400,
    unauthorized: 401,
    notFound: 404,
    conflict: 409,
}).forEach(([name, httpStatus]) => {
    exports[name] = error(name, httpStatus);
});
