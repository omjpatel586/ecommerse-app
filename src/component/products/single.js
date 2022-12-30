import { Rating } from "@mui/material"
import axios from "axios"
import { useEffect, useState } from "react"
import { BsFillSkipBackwardFill, BsStarFill } from "react-icons/bs"
import { useParams } from "react-router-dom"
import "./css/style.css"
import "./css/spinner.css"

export const Single = () => {
    const [products, setproducts] = useState([])
    const [val, setval] = useState(["", false])

    const { id } = useParams()

    const cartin = (id) => {
        let pid = new FormData()
        pid.append("id",id)
        axios.post("https://omcdmiweb.000webhostapp.com/ecommerseapi.php",pid)
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
        let arr = [0,1,2,3,4,5]
        arr.map((i => 
            {
                if(arr.includes(props)) {
                    document.getElementsByTagName("button")[props].style.border = "2px solid blue"
                }
                document.getElementsByTagName("button")[i].style.border = "none"
            }
        ))
    }

    useEffect(() => {
        axios.get("https://dummyjson.com/products/" + id)
            .then(function (fetch) {
                setproducts([fetch.data])
                setval([fetch.data.thumbnail, true])
                fetch.data.images.map((i,j)=>{
                    if(fetch.data.thumbnail==i) {
                        document.getElementsByTagName("button")[j].style.border = "2px solid blue"
                    }
                })
            })
            .catch(function (error) {
                console.log(error)
            })
    }, [])

    if (val[1]) {
        return (
            <>
                {/* <input type="button" value="Back" onClick={() => { props.setsingle([false, 0, "https://dummyjson.com/products"]) }}></input> */}
                {
                    products.map((i =>
                        <div className="d-flex p-5 media">
                            <div className="image2">
                                <img src={val[0]} className="pb-4"></img>
                                <div className="image3 d-grid justify-content-between grid-template w-100 shadow media-small media-grid">
                                    {
                                        i.images.map((i,j)=>{
                                            return (
                                                <button className="btn"><img src={i} className="shadow" onClick={() => { setval([i, true]); switch_img(j) }}></img></button>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                            <div className="content1 text-dark p-3">
                                <h1>{i.title}</h1>
                                <p>{i.brand}</p>
                                <div className="d-flex align-items-center p-2">
                                    <p className="fw-bolder fs-2 p-2">
                                        &#x20b9;{Math.round(i.price - (i.price * i.discountPercentage / 100))}</p>
                                    <strike style={{ color: "gray" }}>&#x20b9;{i.price}</strike>
                                    <div className="discounts1 p-2">{i.discountPercentage}%</div>
                                </div>
                                <p>{check_stock(i.stock)}</p>
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
                                    <p>{i.description}</p>
                                </div>
                                <div className="shadow">
                                    <div className="d-flex justify-content-between p-3 align-items-center">
                                        <h1 className="fs-2" style={{ fontFamily: "arial" }}>Ratings & Reviews</h1>
                                        <button className="text-dark fw-bolder single-ratings p-2">Rate Product</button>
                                    </div>
                                    <div className="d-flex justify-content-between p-2">
                                        <div className="d-flex align-items-center">
                                            <h1 style={{ fontFamily: "arial" }} className="h3 p-2">{i.rating}</h1>
                                            <i><BsStarFill /></i>
                                        </div>
                                        <div>
                                            <Rating name="half-rating-read" defaultValue={i.rating} precision={0.5} readOnly />
                                        </div>
                                    </div>
                                </div>
                                <div className="d-flex p-4 single-buybtn" style={{ columnGap: "20px" }}>
                                    {/* {
                                    (props.single[0]==true)?:<input type="button" value="Remove Item" onClick={()=>{window.localStorage.setItem("id",i.id)}}></input>
                                } */}
                                    <input type="button" value="Add To Cart" onClick={()=>{ cartin(i.id) }}></input>
                                    <input type="button" value="Buy Now"></input>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </>
        )
    } else {
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
}