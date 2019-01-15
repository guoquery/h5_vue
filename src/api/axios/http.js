import Vue from 'vue'
import axios from './axios'
// import {Toast} from 'mint-ui'
// Vue.component(Toast)
export function postJson (url, data, error) {
    return new Promise((resolve, reject) => {
        axios.post(url, data).then(res => {
            if(res.data.errno !=0){
                console.log("errno="+res.data.errno,res.data)
                alert(res.data.errmsg)
                return;
            }
            console.log('接口返回',res.data.data)
            resolve(res)
        }, err => {
            err = error ? error : err
            // Toast({
            //     message: err,
            //     duration: 500
            // })
        })
    })
}
export function get (url, data, error) {
    return new Promise((resolve, reject) => {
        axios.get(url, data).then(res => {
            resolve(res)
        }, err => {
            err = error ? error : err
        //     Toast({
        //         message: err,
        //         duration: 500
        //     })
        })
    })
}