import Header from "./component/header"
import { Routes , Route } from "react-router-dom"
import Products from "./component/products"
import { Single } from "./component/products/single"
import { Cart_Page } from "./component/products/cart"
import { useDispatch, useSelector } from "react-redux"

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Products />}></Route>
        <Route path="/cart" element={<Cart_Page />}></Route>
        <Route path="/single/:id" element={<Single />}></Route>
      </Routes>
    </>
  )
}

export default App
