const queryParams = (params) => {
  const queries = Object.keys(params)
      .map(k => `${encodeURIComponent(k)}=${encodeURIComponent(params[k])}`)
      .join('&');
  return Object.keys(params).length > 0 ? `?${queries}` : '';
};

export default queryParams;
