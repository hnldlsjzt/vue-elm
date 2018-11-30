import axios from 'axios';
const SERVER_URL = '/api/';
axios.defaults.baseURL = SERVER_URL;
export default {
  ajaxPost(url, {
    params = {},
    data = {}
  }) {
    return axios({
      method: 'post',
      url: url,
      params: params,
      data: data
    }).then(function (res) {
      return res.data;
    }).catch(function (err) {
      console.log(err);
    });
  },
  ajaxGet(url, params = {}) {
    return axios.get(url, {
      params
    }).then((res) => {
      return res.data;
    });
  },
  ajaxFilePost(url, {
    data = {}
  }) {
    return axios({
      method: 'post',
      url: url,
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      data: data
    }).then(function (res) {
      return res.data;
    }).catch(function (err) {
      console.log(err);
    });
  }
};
