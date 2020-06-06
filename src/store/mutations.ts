export default {
   addCounter(state: object, payload: any) {
      payload.count++;
   },
   addToList(state: any, payload: any){
      state.cartList[payload.iid] = payload;
   }
}