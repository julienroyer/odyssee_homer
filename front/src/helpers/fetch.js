const myFetch = async (...args) => {
    try {
        return await fetch(...args);
    } catch ({ message }) {
        throw Error(`Unable to reach the server. ${message}`);
    }
};

const myJson = async res => {
    try {
        return await res.json();
    } catch (e) {
        throw Error(`Request failure - HTTP ${res.status}.`);
    }
};

export default async (...args) => {
    const res = await myFetch(...args);
    const json = await myJson(res);
    if (!res.ok) {
        throw Error(json.message || 'Request failure');
    }
    return json;
};
