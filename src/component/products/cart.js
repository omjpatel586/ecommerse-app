import { useContext, useEffect, useState } from "react"
import { Container } from "react-bootstrap"
import OwlCarousel from 'react-owl-carousel'
import { Rating } from "@mui/material"
import { useDispatch, useSelector } from "react-redux"
import { Switch, Case, CaseElse } from 'react-context-switch'
import axios from "axios"
import { AddToCart } from "../../actions"
import Header from "../header"
import { BsCartFill } from "react-icons/bs"

export const Cart_Page = () => {
    const [val,setval] = useState([])
    const [single, setsingle] = useState(false)
    const unload = useDispatch()
    const fdata = useSelector((i) => i.Cart)

    const check_stock = (i) => {
        let arr = ["In Stock", "Out Of Stock"]
        return ((i != 0) ? <div style={{ color: "blue" }}>{arr[0]}</div> : <div style={{ color: "red" }}>{arr[1]}</div>)
    }

    const cartin = (id) => {
        let pid = new FormData()
        pid.append("action", "cart")
        pid.append("id", id)
        axios.post("https://omcdmiweb.000webhostapp.com/ecommerseapi.php", pid)
            .then(function (success) {
                console.log(success)
            })
            .catch(function (error) {
                console.log(error)
            })
    }

    useEffect(() => {
        axios.get("https://omcdmiweb.000webhostapp.com/getid.php")
            .then(function (success) {
                setval([...success.data])
                setsingle(true)
            })
            .catch(function (error) {
                setsingle(false)
                console.log(error)
            })
    }, [])

    if (single) {
        val.map((i) => {
            unload(AddToCart(i.id))
        })
        return (
            <>
                <Header />
                <div className="p-3">
                    <Container>
                        <div className="d-grid grid-columns">
                            {
                                fdata.map((i) => {
                                    return (
                                        <div className="prod-desv position-relative d-grid">
                                            <div className="image">
                                                <OwlCarousel className="owl-theme" loop items={1} dots={false} autoplay autoplayTimeout={2000}>
                                                    {
                                                        i.images.map((j) => {
                                                            return (
                                                                <Switch value={j}>
                                                                    <Case when={(val) => { val.includes("") }}>
                                                                        <div className="item">
                                                                            <img src={require("./Images/no-find.jpg")}></img>
                                                                        </div>
                                                                    </Case>
                                                                    <CaseElse>
                                                                        <div className="item">
                                                                            <img src={j} alt="Frame Not Available"></img>
                                                                        </div>
                                                                    </CaseElse>
                                                                </Switch>
                                                            )
                                                        })
                                                    }
                                                </OwlCarousel>
                                            </div>
                                            <div className="content align-self-center">
                                                <div className="ratings">
                                                    <Rating name="half-rating-read" defaultValue={i.rating} precision={0.5} readOnly className="fs-5" />
                                                </div>
                                                <div>
                                                    <h1>{i.title}</h1>
                                                    <p>{i.brand}</p>
                                                    <p>{check_stock(i.stock)}</p>
                                                </div>
                                                <div className="py-2">
                                                    <pre className="m-0 fs-5 text-danger fw-bolder"><strike>&#x20b9;{i.price}</strike> &#x20b9;{Math.round(i.price - (i.price * i.discountPercentage / 100))}
                                                    </pre>
                                                </div>
                                            </div>
                                            <div className="discounts position-absolute text-white bg-danger">{i.discountPercentage}%</div>
                                            <div className="position-absolute" style={{
                                                top: "45%",
                                                left: "70%",
                                                zIndex: "1",
                                            }}>
                                                <button className="btn" onClick={() => { cartin(i.id) }}><i className="text-white cart" style={{ backgroundColor: "#15BD68" }}><BsCartFill /></i></button>
                                            </div>
                                            {/* <div className="d-flex align-items-center justify-content-evenly">
                                                <div className="d-flex">
                                                    <input type="button" value="+" className="btn btn-dark align-self-center" onClick={incr}></input>
                                                    <h1 className="fw-bolder p-2 align-self-center">{val}</h1>
                                                    <input type="button" value="-" className="btn btn-dark align-self-center" onClick={decr}></input>
                                                </div>
                                                <div className="d-flex">
                                                    <input type="checkbox" className="cb" onChange={(i) => {
                                                        unload(Quantity(i.target.checked, i.index))
                                                    }}></input>
                                                    <h1 className="fs-6 fw-bolder p-2 align-self-center">SelectToAdd</h1>
                                                </div>
                                            </div> */}
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </Container>
                </div >
            </>
        )
    }
    return (
        <div className="d-flex justify-content-center text-white bg-style-spinner">
            <div class="spinner">
                <div class="spinner-circle spinner-circle-outer"></div>
                <div class="spinner-circle-off spinner-circle-inner"></div>
                <div class="spinner-circle spinner-circle-single-1"></div>
                <div class="spinner-circle spinner-circle-single-2"></div>
            </div>
        </div>
    )
}