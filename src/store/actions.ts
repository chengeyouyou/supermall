export default {
    addCart({ state, commit }: any, payload: any) {
        return new Promise((resolve, reject) => {
            const item = state.cartList.find((item: any) => item.iid == payload.iid);
            if (item) {
                commit('addCounter', item);
                resolve('添加商品+1');
            } else {
                commit('addToList', payload);
                resolve('添加新的商品');
            }
        });
    },

    changeAllStatus({ state, commit }: any, status: boolean) {
        for (const item of state.cartList) {
            commit('changeItemStatusByItem', {
                item: item,
                status: status
            });
        }
    }
}