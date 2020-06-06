import Axios from 'axios';
import {AxiosRequestConfig} from 'axios';
import config from '../common/config';


export function request(options:AxiosRequestConfig){
    const instance = Axios.create({
        baseURL: config.baseURL,
        timeout:5000
    });

    instance.interceptors.request.use(res=>{  
        return res;
    }, err=>{
        console.log(err);
    });

    instance.interceptors.response.use(res=>{
        return res.data;
    }, err=>{
        console.log(err);
    });

    return instance.request(options);
}