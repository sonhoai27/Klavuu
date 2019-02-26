const queryParams = (params) => {
  const queries = Object.keys(params)
      .map(k => `${encodeURIComponent(k)}=${encodeURIComponent(params[k])}`)
      .join('&');
  return Object.keys(params).length > 0 ? `?${queries}` : '';
};

const getParameterByName = (name, query) => {
  let n = name;
  let q = query;
  if (!query) q = window.location.href;
  n = n.replace(/[\[\]]/g, '\\$&');
  const regex = new RegExp(`[?&]${name}(=([^&#]*)|&|#|$)`)
  const results = regex.exec(q);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

export {
  getParameterByName,
}

export default queryParams;
