export const ACTIONS = {
    ADD: "addProduct",
    DELETE: "deleteProduct",
    EMPTY: "emptyCart",
};
export default function reducer(state, action) {
    switch (action.type) {
        case ACTIONS.ADD:
            if (state.products.find(x => x.id === action.payload.product.id))
                return state;
            return {
                products: [...state.products, action.payload.product],
            };
        case ACTIONS.DELETE:
            return {
                products: state.products.filter((x) => x.id !== action.payload.id),
            };

        case ACTIONS.EMPTY:
            return {
                products: []
            }

        default:
            return state;
    }
}