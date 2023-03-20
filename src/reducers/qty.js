let t_amt = []

const sum = () => {
    let sum = 0
    for (var i=0;i<t_amt.length;i++) {
        if(t_amt[i] === undefined) {
            continue
        }
		sum = sum + t_amt[i]
	}
	return sum 
}

export const Qty = (state=0,action) => {

    if(action.status === true) {
        t_amt[action.payload.index] = (action.payload.price)*(action.payload.qty)
        state = sum()
    } else if(action.status === false) {
        t_amt[action.i] = 0
        state = sum()
    }
    return state

}