import { useEffect, useState } from "react"
import { Col, Container, Row } from "react-bootstrap"
import OwlCarousel from 'react-owl-carousel'
import { Rating } from "@mui/material"
import { useDispatch, useSelector } from "react-redux"
import axios from "axios"
import { AddToCart } from "../../actions"

export const Cart_Page = () => {
    const [single, setsingle] = useState(false)
    const unload = useDispatch()
    const fdata = useSelector((i) => i.Cart)

    const check_stock = (props) => {
        let arr = ["In Stock", "Out Of Stock"]
        return ((props != 0) ? <div style={{ color: "lightgreen" }}>{arr[0]}</div> : <div style={{ color: "red" }}>{arr[1]}</div>)
    }

    useEffect(() => {
        axios.get("https://omcdmiweb.000webhostapp.com/getid.php")
            .then(function (success) {
                setsingle(true)
                success.data.map((i)=>{
                    unload(AddToCart(i.id))
                })
            })
            .catch(function (error) {
                setsingle(false)
                console.log(error)
            })
    }, [])

    if (single) {
        return (
            <>
                <div className="bg-style">
                    <Container>
                        <Row xs={1} lg={2} className="p-5" style={{ rowGap: "30px" }}>
                            {
                                 fdata.map((i =>
                                    <Col xs={12} lg={6}>
                                        {/* <button className="btn text-decoration-none main-hover w-100" onClick={()=>{setsingle([true,i.id])}}> </button>*/}
                                        <a href={`/single/${i.id}`} className="btn text-decoration-none main-hover w-100">
                                            <div className="categories p-2">{i.category}</div>
                                            <div className="d-flex justify-content-between products position-relative">
                                                <div className="image">
                                                    <OwlCarousel className="owl-theme" loop items={1} dots={false} autoplay autoplayTimeout={2000}>
                                                        <div className="item">
                                                            <img src={i.images[0]} alt="Image Not Available"></img>
                                                        </div>
                                                        <div className="item">
                                                            <img src={i.images[1]} alt="Image Not Available"></img>
                                                        </div>
                                                        <div className="item">
                                                            <img src={i.images[2]} alt="Image Not Available"></img>
                                                        </div>
                                                        <div className="item">
                                                            <img src={i.images[3]} alt="Image Not Available"></img>
                                                        </div>
                                                    </OwlCarousel>
                                                </div>
                                                <div className="content">
                                                    <h1>{i.title}</h1>
                                                    <p>{i.brand}</p>
                                                    <pre>
                                                        Price :- <strike>&#x20b9;{i.price}</strike> &#x20b9;{Math.round(i.price - (i.price * i.discountPercentage / 100))}</pre>
                                                    <div><pre> </pre></div>
                                                    <div>
                                                        <p>{check_stock(i.stock)}</p>
                                                        <div className="ratings">
                                                            <p>Ratings :- {i.rating}</p>
                                                            <div className="d-flex" style={{ justifyContent: "flex-end" }}>
                                                                <Rating name="half-rating-read" defaultValue={i.rating} precision={0.5} readOnly />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="discounts position-absolute text-white bg-danger">{i.discountPercentage}%</div>
                                            </div>
                                        </a>
                                        {/* <div className="buydetails">
                                            <input type="number" min="1" max={i.stock} className="qty m-3" value="0"></input>Quantity
                                            <input type="checkbox" className="cb"></input>SelectToAdd
                                        </div> */}
                                    </Col>
                                ))
                            }
                        </Row>
                        <div>
                            <a href="/" className="p-2">1</a>
                            <a href="/nextprod2" className="p-2">2</a>
                        </div>
                    </Container>
                </div>
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