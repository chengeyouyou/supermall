export default {
    addCart({ state, commit }: any, payload: any) {
        const item = state.cartList.find((item: any) => item.iid == payload.iid);
        if (item) {
            commit('addCounter', item);
        } else {
            commit('addToList', payload);
        }
    },

    changeAllStatus({state, commit}: any, status: boolean) { 
        for (const item of state.cartList) {
            commit('changeItemStatusByItem', {
                item: item,
                status: status
            });
        }
    }
}