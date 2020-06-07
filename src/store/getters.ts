export default {
    products: (state: any) => {
        return state.cartList;
    },

    productsLength(state: any) {
        return state.cartList.length;
    },

    bottomInfo(state: any) {
        let selectedCount = 0;
        let allSelected = true;
        let total = 0;

        state.cartList.forEach((item: any) => {
            item.status && ++selectedCount && (total += item.price * item.count);
        });
        return {
            total: total,
            selectedCount: selectedCount,
            allSelected: selectedCount && selectedCount == state.cartList.length
        };
    },
}