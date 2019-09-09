const actionType = {
  REQUEST: (type: any) => `${type}_PENDING`,
  SUCCESS: (type: any) => `${type}_FULFILLED`,
  FAILURE: (type: any) => `${type}_REJECTED`,
};

const randomNumber = (max: number, min: number) => {

  return Math.floor(Math.random() * (max - min) + min);
};

const validateEmail = (email: string) => {
  // tslint:disable-next-line: max-line-length
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

const alias = (name: string) => {
  let str = name;
  str = str.toLowerCase();
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a');
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e');
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i');
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o');
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u');
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y');
  str = str.replace(/đ/g, 'd');
  // tslint:disable-next-line:max-line-length
  str = str.replace(/!|@|\\|\$|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\'| |\"|\&|\#|\[|\]|~/g, '-');
  str = str.replace(/-+-/g, '-');
  str = str.replace(/^\-+|\“|\”|\-+$/g, '');
  return str;
};

const API = {
  dev: '/api/v1/',
  prod: 'https://zonesgroup.vn/api/v1/',
  beDev: 'http://localhost:8000/',
  beProd: 'https://zonesgroup.vn/',
};

const API_CONFIG = () => {
  switch (true) {
    case window.location.hostname.indexOf('localhost') > -1:
      return {
        URL: API.dev,
        BASE: '/',
        BE: API.beDev,
      };
    default:
      return {
        URL: API.prod,
        BASE: '/',
        BE: API.beProd,
      };
  }
};

const formatNumber = (number: number) => {
  return (
    number
    && number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
  );
};

// const pro = location.protocol
const CDN = 'https://22.zonesgroup.vn/api/uploads/';
const IMGUR = 'https://api.imgur.com/3/';
const imgurKey = {
  id1: '28aa138ec07d5a7',
  id2: '8e65e1476b42d2cc6a000eca122065833a211cc2',
  id3: '0YSiCkDts9wsHwg',
};

export {
actionType as ActionType,
randomNumber as RandomNumber,
alias as ALIAS,
API,
API_CONFIG,
CDN,
formatNumber,
validateEmail,
IMGUR,
imgurKey,
};
