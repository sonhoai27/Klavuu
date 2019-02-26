const queryParams = (params) => {
  const queries = Object.keys(params)
      .map(k => `${encodeURIComponent(k)}=${encodeURIComponent(params[k])}`)
      .join('&');
  return Object.keys(params).length > 0 ? `?${queries}` : '';
};

const getParameterByName = (ten, query) => {
  let url = query;
  let name = ten;
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, '\\$&');
  // tslint:disable-next-line:prefer-template
  const regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)')
  const results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

export {
  getParameterByName,
}

export default queryParams;
