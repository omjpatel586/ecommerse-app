import { combineReducers } from "redux"
import { Cart } from "./cart"
import { Qty } from "./qty"
import { Search } from "./search"

export const rootReducer = combineReducers({
    Cart,
    Qty,
    Search
})