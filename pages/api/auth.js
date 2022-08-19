import axios from "axios";
import Cookies from "js-cookie";

import { API_URL, APP_NAME } from "../../config";
import { blacklist } from "./middleware";

const token_cookie_name = APP_NAME + ".user.token";
const profile_cookie_name = APP_NAME + ".user.profile";

export const login = async ({ email, password, remember }, url_path = "/login") => {
	try {
		const formData = new FormData();
		formData.append("email", email);
		formData.append("password", password);
		formData.append("remember_me", remember);

		const response = await axios
			.post(`${API_URL + url_path}`, formData)
			.then((res) => {
				Cookies.set(
					token_cookie_name,
					Encrypt(res.data.data.token),
					{ expires: remember ? 365 : "" },
					{ secure: true },
				);
				Cookies.set(
					profile_cookie_name,
					Encrypt(JSON.stringify(res.data.data.user)),
					{ expires: remember ? 365 : "" },
					{ secure: true },
				);

				console.clear();
				return res;
			})
			.catch((err) => {
				console.clear();
				return err;
			});
		return response;
	} catch (error) {
		return error;
	}
};

export const checkLogin = async (url_path = "/cek-login") => {
	try {
		const response = await axios
			.get(`${API_URL + url_path}`, {
				headers: {
					Authorization: Cookies.get(token_cookie_name) ? "Bearer " + Decrypt(Cookies.get(token_cookie_name)) : "",
				},
			})
			.then((res) => {
				console.clear();
				return res;
			})
			.catch((err) => {
				if (err.response?.status == 401) {
					return blacklist();
				} else {
					return err;
				}
			});
		return response;
	} catch (error) {
		return error;
	}
};

export const logout = async (url_path = "/logout") => {
	try {
		const response = await axios.post(
			`${API_URL + url_path}`, {},
			{
				headers: {
					Authorization: Cookies.get(token_cookie_name) ? "Bearer " + Decrypt(Cookies.get(token_cookie_name)) : "",
				},
			})
			.then((res) => {
				console.clear();

				Cookies.remove(token_cookie_name);
				Cookies.remove(profile_cookie_name);

				return res;
			})
			.catch((err) => {
				if (err.response?.status == 401) {
					return blacklist();
				} else {
					return err;
				}
			});
		return response;
	} catch (error) {
		console.log(error);
	}
};
