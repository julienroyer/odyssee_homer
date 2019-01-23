'use strict';

const jsonNoThrow = async res => {
    try {
        return await res.json();
    } catch (_) {
    }
}

export default async (...args) => {
    const res = await fetch(...args);
    const json = await jsonNoThrow(res);
    if (!res.ok || !json) {
        throw Error(String((json && json.message) || `Request failure (HTTP ${res.status}).`));
    }
    return json;
};
