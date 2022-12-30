export const Qty = (state=[],action) => {
    
    if(action.type === "qty"&&action.payload == true) {
        state.push({price:action.price,qty:action.qty})
        return state
    }
    return state

}