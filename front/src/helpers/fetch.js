const myFetch = async (...args) => {
    try {
        return await fetch(...args);
    } catch ({ message }) {
        throw Error(`unable to reach server: ${message}`);
    }
};

const myJson = async res => {
    try {
        return await res.json();
    } catch (e) {
        throw Error(`request failure: HTTP ${res.status}`);
    }
};

export default async (...args) => {
    const res = myFetch(...args);
    const json = myJson(res);
    if (!res.ok) {
        throw Error(json.message || 'request failure');
    }
    return json;
};
