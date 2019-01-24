const tryJson = async res => {
    try {
        return await res.json();
    } catch (_) {
    }
}

const wrapFetch = async (...args) => {
    const res = await fetch(...args);
    const json = await tryJson(res);
    if (!res.ok || !json) {
        throw Error(String((json && json.message) || `Request failure (HTTP ${res.status}).`));
    }
    return json;
};

const headers = ({ def, token }) => new Headers(Object.assign(
    {}, def, token ? { Authorization: `Bearer ${token}` } : null
));

export const postJson = (url, json, token) => wrapFetch(url, {
    method: 'POST',
    headers: headers({ def: { 'Content-Type': 'application/json' }, token }),
    body: JSON.stringify(json),
});

export const get = (url, token) => wrapFetch(url, {
    headers: headers({ token }),
});
