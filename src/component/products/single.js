import { Rating } from "@mui/material"
import axios from "axios"
import { createContext, useEffect, useState } from "react"
import { BsFillSkipBackwardFill, BsStarFill } from "react-icons/bs"
import { useParams } from "react-router-dom"
import "./css/style.css"
import "./css/spinner.css"
import { Quantity } from "../../actions"
import { useDispatch, useSelector } from "react-redux"
import { useSwitch } from "../../useSwitch"
import Header from "../header"

export const Single = () => {
    const [val, setval] = useState("")
    const { id } = useParams()
    const [products] = useSwitch("https://dummyjson.com/products/" + id)

    const unload = useDispatch()
    const json = useSelector((i) => i.Qty)
    console.log(json)
    

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

    const check_stock = (props) => {
        let arr = ["Good Luck ..! Item Available", "Better Luck Next Time ..! Item Not Available"]
        return ((props !== 0) ? <div style={{ color: "green" }}>{arr[0]}</div> : <div style={{ color: "red" }}>{arr[1]}</div>)
    }

    const switch_img = (props) => {
        for(let i=0;i<5;i++) {
            if (props === i) {
                document.getElementsByClassName("blur")[props].style.filter = "blur(0)"
                continue
            }
            document.getElementsByClassName("blur")[i].style.filter = "blur(1px)"
        }
    }

    const qty = (price, val, k) => {
        const cb = document.getElementsByClassName("cb")[0]
        window.localStorage.setItem("price", price)
        window.localStorage.setItem("qty", val)
        window.localStorage.setItem("index", k)
        if (cb.checked === true) {
            unload(Quantity(cb.checked, k))
        }
    }

    useEffect(()=>{
        if(products[1]) {
            setval(products[0].data.thumbnail)
        }
    }, [])

    if (products[1]) {
        return (
            <>
                <Header />
                <div className="d-flex p-5 media">
                    <div className="image2">
                        <img src={val} className="pb-4"></img>
                        <div className="image3 d-grid justify-content-between grid-template w-100 shadow media-small media-grid">
                            {
                                products[0].data.images.map((i, j) => {
                                    return (
                                        <button className="btn"><img src={i} className="shadow blur" onClick={() => { setval(i); switch_img(j) }}></img></button>
                                    )
                                })
                            }
                        </div>
                    </div>
                    <div className="content1 text-dark p-3">
                        <h1>{products[0].data.title}</h1>
                        <p>{products[0].data.brand}</p>
                        <div className="d-flex align-items-center p-2">
                            <p className="fw-bolder fs-2 p-2">
                                &#x20b9;{Math.round(products[0].data.price - (products[0].data.price * products[0].data.discountPercentage / 100))}</p>
                            <strike style={{ color: "gray" }}>&#x20b9;{products[0].data.price}</strike>
                            <div className="discounts1 p-2">{products[0].data.discountPercentage}%</div>
                        </div>
                        <p>{check_stock(products[0].data.stock)}</p>
                        <div className="d-flex">
                            <p style={{ color: "gray" }} className="fw-bolder p-2">Warranty</p>
                            <p>
                                2 Year Warranty (1 year standard warranty + 1 year additional warranty from the date of purchase made by the customer.)
                            </p>
                        </div>
                        <h4 className="h5 w-25 single-hover">
                            <a href="#" className="text-decoration-none"><BsFillSkipBackwardFill /> 8 Days Replacement</a>
                        </h4>
                        <div className="d-flex align-items-center">
                            <p style={{ color: "gray" }} className="fw-bolder p-2">Description</p>
                            <p>{products[0].data.description}</p>
                        </div>
                        <div className="shadow">
                            <div className="d-flex justify-content-between p-3 align-items-center">
                                <h1 className="fs-2" style={{ fontFamily: "arial" }}>Ratings & Reviews</h1>
                                <button className="text-dark fw-bolder single-ratings p-2">Rate Product</button>
                            </div>
                            <div className="d-flex justify-content-between p-2">
                                <div className="d-flex align-items-center">
                                    <h1 style={{ fontFamily: "arial" }} className="h3 p-2">{products[0].data.rating}</h1>
                                    <i><BsStarFill /></i>
                                </div>
                                <div>
                                    <Rating name="half-rating-read" defaultValue={products[0].data.rating} precision={0.5} readOnly />
                                </div>
                            </div>
                        </div>
                        <div className="buydetails">
                            <input type="number" min="0" max={products[0].data.stock} className="qty m-3" defaultValue="0" onChange={(j) => {
                                qty(Math.round(products[0].data.price - (products[0].data.price * products[0].data.discountPercentage / 100)), j.target.value, (id-1))
                            }}></input>Quantity
                            <input type="checkbox" className="cb" onChange={(i) => {
                                unload(Quantity(i.target.checked, (id-1)))
                            }}></input>SelectToAdd
                        </div>
                        <div className="d-flex p-4 single-buybtn" style={{ columnGap: "20px" }}>
                            <input type="button" value="Add To Cart" onClick={() => { cartin(products[0].data.id) }}></input>
                            <input type="button" value="Buy Now"></input>
                        </div>
                    </div>
                </div>
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