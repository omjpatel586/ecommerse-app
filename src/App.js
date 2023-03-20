import { Routes , Route } from "react-router-dom"
import { Single } from "./component/products/single"
import { Cart_Page } from "./component/products/cart"
import { Login } from "./component/header/login"
import { Register } from "./component/header/register"
import { Products } from "./component/products"

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={(window.localStorage.getItem("uid")===null)?<Login />:<Products />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/cart" element={<Cart_Page />}></Route>
        <Route path="/single/:id" element={<Single />}></Route>
      </Routes>
    </>
  )
}

export default App
