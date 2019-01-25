const tryJson = async res => {
    try {
        return await res.json();
    } catch (_) {
    }
}

const fetchJson = async (...args) => {
    const res = await fetch(...args);
    const json = await tryJson(res);
    if (!res.ok || !json) {
        throw Error(String((json && json.message) || `Request failure (HTTP ${res.status}).`));
    }
    return json;
};

const headers = ({ def, token } = {}) => new Headers(Object.assign(
    {}, def || {}, token ? { Authorization: `Bearer ${token}` } : {}
));

export const postJson = (url, json, token) => fetchJson(url, {
    method: 'POST',
    headers: headers({ def: { 'Content-Type': 'application/json' }, token }),
    body: JSON.stringify(json),
});

export const getJson = (url, token) => fetchJson(url, {
    headers: headers({ token }),
});
