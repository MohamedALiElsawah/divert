
import { API_URLS } from '../../../api/serviceURL';
import axios from 'axios';


export function loginAgentApi(email,password) {
        let data = {
        "email": email,
        "password": password
        }
            return new Promise((resolve, reject) => {
            axios.post(API_URLS.auth.loginAgent, data).then((res) => {
                resolve(res);
            }).catch((err) => {
                reject(err.response.data);
            });
        });
}



export function loginClientApi(email,password) {
    let data = {
    "email": email,
    "password": password
    }
        return new Promise((resolve, reject) => {
        axios.post(API_URLS.auth.loginClient, data).then((res) => {
            resolve(res);
        }).catch((err) => {
            reject(err.response.data);
        });
    });
}


export function registerUser(data) {
  
        return new Promise((resolve, reject) => {
        axios.post(API_URLS.register.registerUser, data).then((res) => {
            resolve(res);
        }).catch((err) => {
            reject(err.response);
        });
    });
}

