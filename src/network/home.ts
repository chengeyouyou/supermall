import { request } from './network'


export function getMultiData(){
    return request({
      url: '/home/multidata'
    });
  }
  
  export function getProduct(type:string, page:number) {
    return request({
      url: '/home/data',
      data: {
        type,
        page
      }
    })
  }