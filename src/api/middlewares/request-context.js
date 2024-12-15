const { AsyncLocalStorage } = require("async_hooks");
const { v4: uuidv4 } = require("uuid");

const asyncLocalStorage = new AsyncLocalStorage();

const setRequestId = (req, res, next) => {
  asyncLocalStorage.run(new Map(), () => {
    const requestId = uuidv4();
    const shortId = requestId.replace(/-/g, "").slice(-8);
    const store = asyncLocalStorage.getStore();
    store.set("requestId", shortId);
    store.set("mainId", requestId);
    req.requestId = requestId;
    next();
  });
};

const setRequestClientId = (clientId) => {
  const store = asyncLocalStorage.getStore();

  asyncLocalStorage.run(store, () => {
    store.set("requestClientId", clientId);
  });
};

const getRequestId = () => {
  const store = asyncLocalStorage.getStore();
  let requestId = "--------";

  if (store) requestId = store.get("requestId");

  return requestId;
};

const getRequestClientId = () => {
  const store = asyncLocalStorage.getStore();
  let requestClientId = "--------";

  if (store) requestClientId = store.get("requestClientId");

  return requestClientId || "--------";
};

const getRequestMainId = () => {
  const store = asyncLocalStorage.getStore();
  return store.get("mainId") || "--------";
};

module.exports = {
  setRequestId,
  getRequestId,
  setRequestClientId,
  getRequestClientId,
  getRequestMainId,
};
