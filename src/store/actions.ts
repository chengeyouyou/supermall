export default{
    addCart({state, commit}:any, payload:any){
        if(state.cartList[payload.iid]){
            console.log('123');
            commit('addCounter', state.cartList[payload.iid]);
        }else{
            console.log('123');
            commit('addToList', payload);
        }
    }
}