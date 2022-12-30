const id = 0

export const AddToCart = (pid=id) => {
    return {
        type:"cart",
        p_id:pid
    }
}

export const Quantity = (p_price,p_qty) => {
    return {
        type:"qty",
        price:p_price,
        qty:p_qty
    }
}

export const Check = (status) => {
    
    if(status==true) {
        return {
            type:"checked",
            payload:true
        }
    } else {
        return {
            type:"unchecked",
            payload:false
        }
    }

}