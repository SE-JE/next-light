import axios from 'axios';
import Cookies from 'js-cookie';
import fileDownload from 'js-file-download';

import {
  API_URL, APP_NAME,
} from '../../config';
import { blacklist } from './middleware';

const CryptoJS = require("crypto-js");
const token_cookie_name = APP_NAME + ".user.token";


export const get = async (
  path,
  { search, filter, sortBy, sortDirection, paginate, page }
) => {
  try {
    return await axios
      .get(
        `${API_URL}/${path}?paginate=${paginate ? paginate : 0}` +
        (search ? `&search=${search}` : "") +
        (filter ? `&filter=${filter}` : "") +
        (sortBy ? `&sort_by=${sortBy}` : "") +
        (sortDirection
          ? `&sort_direction=${sortDirection.toLowerCase()}`
          : "") +
        (page ? `&page=${page}` : ""),

        {
          headers: {
            Authorization: Cookies.get(token_cookie_name) ? "Bearer " + Decrypt(Cookies.get(token_cookie_name)) : "",
          },
        }
      )
      .then((res) => {
        // console.clear();
        return res;
      })
      .catch((err) => {
        if (err.response && err.response.status == 401) {
          return blacklist();
        }
        console.clear();
        return err.response;
      });
  } catch (error) {
    console.clear();
    return error;
  }
};


export const post = async (path, data, params, contentType) => {
  var newData = {};
  data.forEach((value, key) => newData[key] = value);

  try {
    return await axios
      .post(`${API_URL}/${path}${params ? "?" + params : ""}`, newData, {
        headers: {
          Authorization: Cookies.get(token_cookie_name) ? "Bearer " + Decrypt(Cookies.get(token_cookie_name)) : "",
          "Content-Type": contentType ? contentType : "application/json",
        },
      })
      .then((res) => {
        console.clear();
        return res;
      })
      .catch((err) => {
        if (err.response && err.response.status == 401) {
          return blacklist();
        }
        console.clear();
        return err.response;
      });
  } catch (error) {
    console.clear();
    return error;
  }
};

export const put = async (path, data, params, contentType) => {
  try {
    data.append("_method", "PUT");
    return await axios
      .post(`${API_URL}/${path}${params ? "?" + params : ""}`, data, {
        headers: {
          Authorization: Cookies.get(token_cookie_name) ? "Bearer " + Decrypt(Cookies.get(token_cookie_name)) : "",
          "content-type": contentType ? contentType : "multipart/form-data",
        },
      })
      .then((res) => {
        console.clear();
        return res;
      })
      .catch((err) => {
        if (err.response && err.response.status == 401) {
          return blacklist();
        }
        console.clear();
        return err.response;
      });
  } catch (error) {
    console.clear();
    return error;
  }
};

export const destroy = async (path) => {
  try {
    return await axios
      .delete(`${API_URL}/${path}`, {
        headers: {
          Authorization: Cookies.get(token_cookie_name) ? "Bearer " + Decrypt(Cookies.get(token_cookie_name)) : "",
        },
      })
      .then((res) => {
        console.clear();
        return res;
      })
      .catch((err) => {
        if (err.response && err.response.status == 401) {
          return blacklist();
        }
        console.clear();
        return err.response;
      });
  } catch (error) {
    console.clear();
    return error;
  }
};

export const download = async (path, exportName) => {
  try {
    return await axios
      .get(`${API_URL}/${path}`, {
        responseType: "blob",
        headers: {
          Authorization: Cookies.get(token_cookie_name) ? "Bearer " + Decrypt(Cookies.get(token_cookie_name)) : "",
        },
      })
      .then(function (res) {
        fileDownload(res.data, exportName);

        return res;
      })
      .catch(function (err) {
        if (err.response && err.response.status == 401) {
          return blacklist();
        }
        console.clear();
        return err.response;
      });
  } catch (error) {
    console.clear();
    return error;
  }
};
