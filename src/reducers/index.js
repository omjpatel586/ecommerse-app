import { combineReducers } from "redux"
import { Cart } from "./cart"
import { Qty } from "./qty"

export const rootReducer = combineReducers({
    Cart,
    Qty  
})