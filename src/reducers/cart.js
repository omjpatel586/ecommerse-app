import axios from "axios"

export const Cart = (state = [], action) => {

    if (action.type === "cart") {
        axios.get("https://dummyjson.com/products/" + action.p_id)
            .then(function (fetch) {
                state.push(fetch.data)
            })
            .catch(function (error) {
                state = error
            })
        return state
    }
    return state

}