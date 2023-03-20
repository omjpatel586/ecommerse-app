import OwlCarousel from 'react-owl-carousel'
import { Rating } from "@mui/material"
import { Quantity } from "../../actions"
import { useDispatch } from "react-redux"
import { Switch, Case, CaseElse } from 'react-context-switch'
import { BsCartFill } from "react-icons/bs"
import axios from 'axios'
import { useState } from 'react'

export const DesktopUI = (props) => {
    const [val, setval] = useState(0)
    const unload = useDispatch()

    const check_stock = (props) => {
        let arr = ["In Stock", "Out Of Stock"]
        return ((props !== 0) ? <div style={{ color: "blue" }}>{arr[0]}</div> : <div style={{ color: "red" }}>{arr[1]}</div>)
    }

    const qty = (price, val, k) => {
        const cb = document.getElementsByClassName("cb")[k]
        window.localStorage.setItem("price", price)
        window.localStorage.setItem("qty", val)
        window.localStorage.setItem("index", k)
        if (cb.checked === true) {
            unload(Quantity(cb.checked, k))
        }
    }

    const incr = () => setval(val+1)

    const decr = () => {
        if(val<=0) {
            return
        }
        setval(val-1)
    }

    if(val!==0) {
        qty(Math.round(props.data.price - (props.data.price 
            * props.data.discountPercentage / 100)), 
            val, props.index)
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

    return (
        <>
            <div className="prod-desv position-relative d-grid">
                <div className="image">
                    <OwlCarousel className="owl-theme" loop items={1} dots={false} autoplay autoplayTimeout={2000}>
                        {
                            props.data.images.map((j) => {
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
                        <Rating name="half-rating-read" defaultValue={props.data.rating} precision={0.5} readOnly className="fs-5" />
                    </div>
                    <div>
                        <h1>{props.data.title}</h1>
                        <p>{props.data.brand}</p>
                        <p>{check_stock(props.data.stock)}</p>
                    </div>
                    <div className="py-2">
                        <pre className="m-0 fs-5 text-danger fw-bolder"><strike>&#x20b9;{props.data.price}</strike> &#x20b9;{Math.round(props.data.price - (props.data.price * props.data.discountPercentage / 100))}
                        </pre>
                    </div>
                </div>
                <div className="discounts position-absolute text-white bg-danger">{props.data.discountPercentage}%</div>
                <div className="position-absolute" style={{
                    top: "45%",
                    left: "70%",
                    zIndex: "1",
                }}>
                    <button className="btn" onClick={() => { cartin(props.data.id) }}><i className="text-white cart" style={{ backgroundColor: "#15BD68" }}><BsCartFill /></i></button>
                </div>
                <div className="d-flex align-items-center justify-content-evenly">
                    <div className="d-flex">
                        <input type="button" value="+" className="btn btn-dark align-self-center" onClick={incr}></input>
                        <h1 className="fw-bolder p-2 align-self-center">{val}</h1>
                        <input type="button" value="-" className="btn btn-dark align-self-center" onClick={decr}></input>
                    </div>
                    <div className="d-flex">
                        <input type="checkbox" className="cb" onChange={(i) => {
                            unload(Quantity(i.target.checked, props.index))
                        }}></input>
                        <h1 className="fs-6 fw-bolder p-2 align-self-center">SelectToAdd</h1>
                    </div>
                </div>
            </div>
        </>
    )
}