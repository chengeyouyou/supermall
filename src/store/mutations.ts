import Vue from 'vue';

export default {
   addCounter(state: object, payload: any) {
      payload.count++;
   },
   addToList(state: any, payload: any) {
      state.cartList.push(payload);
   },
   changeItemStatusByiid(state:any, payload:any){
      state.cartList.some((item:any)=>{
         if(item.iid == payload.iid){
            // Vue.set(item, 'status', payload.status);
            item.status = payload.status;
            return true;
         }
         return false;
      })
   },
   
   changeItemStatusByItem(state:any, payload:any){
      payload.item.status = payload.status;
   },
}