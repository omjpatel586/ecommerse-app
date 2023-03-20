import { Container } from "react-bootstrap"
import { useDispatch } from "react-redux"
import { Index } from "../../actions"
import "./css/style.css"
import { FaPowerOff } from "react-icons/fa"
import { useState } from "react"
import { FiSearch } from "react-icons/fi"

const Header = () => {
    const [isMobile, setMobile] = useState(false)
    const unload = useDispatch()

    return (
        <>
            <nav className="navbar navbar-expand-md navbar-dark fixed-top position-relative" style={{ backgroundColor: "#2874F0" }}>
                <Container>
                    <div className="image1 d-none d-lg-block">
                        <img src={require("./Images/ammoapp-logo.png")}></img>
                    </div>
                    <button className="navbar-toggler" type="button" onClick={() => {
                        setMobile((isMobile === true) ? false : true)
                    }}>
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse d-none d-lg-block p-2">
                        <ul className="navbar-nav me-auto mb-2 mb-md-0">
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="/">Home</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/">MyOrders</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/cart">MyCart</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/">AboutUs</a>
                            </li>
                        </ul>
                        <div className="d-flex">
                            <a href="/" className="link" onClick={() => { window.localStorage.clear() }}>
                                <i><FaPowerOff /></i>
                            </a>
                            <input type="text" className="form-control me-2" placeholder="Search For Products" onChange={(i) => {
                                (i.target.value === "")
                                    ? unload(Index("https://dummyjson.com/products"))
                                    : unload(Index("https://dummyjson.com/products/search?q=" + i.target.value))
                            }}></input>
                        </div>
                    </div>
                </Container>
                {(isMobile === true) ?
                    <div className="position-absolute directions w-100 p-3" style={{ backgroundColor: "#2874F0" }}>
                        <Container>
                            <ul className="navbar-nav me-auto mb-2 mb-md-0">
                                <li className="nav-item">
                                    <a className="nav-link active" aria-current="page" href="/">Home</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="/">MyOrders</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="/">MyCart</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="/">AboutUs</a>
                                </li>
                            </ul>
                            <div className="d-flex">
                                <a href="/" className="link" onClick={() => { window.localStorage.clear() }}>
                                    <i><FaPowerOff /></i>
                                </a>
                            </div>
                        </Container>
                    </div>
                    : ""}
            </nav>
            <div className="d-block d-lg-none">
                <div className="p-3">
                    <div className="d-flex">
                        <i className="border p-2"><FiSearch /></i>
                        <input type="text" className="form-control me-2" placeholder="Search For Products" onChange={(i) => {
                            (i.target.value === "")
                                ? unload(Index("https://dummyjson.com/products"))
                                : unload(Index("https://dummyjson.com/products/search?q=" + i.target.value))
                        }}></input>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Header