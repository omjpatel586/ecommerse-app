export const Search = (state="https://dummyjson.com/products",action) => {

    if(action.type === "index") {
        state=action.url
    }
    return state

}