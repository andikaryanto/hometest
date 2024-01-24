import axios from "axios"
import config from "../Config"
import { getCookie } from "../GetCookie";

const get = (url, token = null, params = {}, headers = {}) => {
    const accessToken = getCookie('access_token');
    if(token != null) {
        headers = {
            ...headers,
            Authorization: 'Bearer ' + accessToken
        }
    }

    return axios.get(config.api_url + url, {
        headers,
        params
    })
}

const post = (url, token = null, body = {}, params = {}, headers = {}) => {
    
    const accessToken = getCookie('access_token');
    if(token != null) {
        headers = {
            ...headers,
            Authorization: 'Bearer ' + accessToken
        }
    }

    return axios.post(config.api_url + url, body, {
        headers,
        params
    })
}

const patch = (url, token = null, body = {}, params = {}, headers = {}) => {
    
    const accessToken = getCookie('access_token');
    if(token != null) {
        headers = {
            ...headers,
            Authorization: 'Bearer ' + accessToken
        }
    }

    return axios.patch(config.api_url + url, body, {
        headers,
        params
    })
}

const destroy = (url, token = null, params = {}, headers = {}) => {
    
    const accessToken = getCookie('access_token');
    if(token != null) {
        headers = {
            ...headers,
            Authorization: 'Bearer ' + accessToken
        }
    }

    return axios.delete(config.api_url + url, {
        headers,
        params
    })
}

export {
    get,
    post,
    patch,
    destroy
}