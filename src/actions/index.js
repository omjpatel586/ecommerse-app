const id = 0

export const AddToCart = (pid=id) => {
    return {
        type:"cart",
        p_id:pid
    }
}

export const Index = (link) => {
    return {
        type:"index",
        url:link
    }
}

export const Quantity = (status,k) => {
    const obj = {
        "price":window.localStorage.getItem("price"),
        "qty":window.localStorage.getItem("qty"),
        "index":window.localStorage.getItem("index")
    }
    return {
        type:"qty",
        payload:obj,
        status:status,
        i:k
    }
}