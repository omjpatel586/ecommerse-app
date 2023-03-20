import { Rating } from "@mui/material"
import axios from "axios"

export const MobileUI = (props) => {
    const check_stock = (props) => {
        let arr = ["In Stock", "Out Of Stock"]
        return ((props !== 0) ? <div style={{ color: "blue" }}>{arr[0]}</div> : <div style={{ color: "red" }}>{arr[1]}</div>)
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
        <div className="products position-relative">
            <div className="img">
                <div className="image1">
                    <img src={props.data.images[0]} alt="Frame Not Available"></img>
                </div>
            </div>
            <div className="content">
                <h1>{props.data.title}</h1>
                <p>{props.data.brand}</p>
                <pre><strike>&#x20b9;{props.data.price}</strike> &#x20b9;{Math.round(props.data.price - (props.data.price * props.data.discountPercentage / 100))}
                </pre>
                <div><pre> </pre></div>
                <div>
                    <p>{check_stock(props.data.stock)}</p>
                    <div className="ratings">
                        <div>
                            <Rating name="half-rating-read" defaultValue={props.data.rating} precision={0.5} readOnly />
                        </div>
                    </div>
                    <div className="single-buybtn">
                        <input type="button" value="Add To Cart" onClick={() => { cartin(props.data.id) }}></input>
                    </div>
                </div>
            </div>
            <div className="discounts position-absolute text-white bg-danger">{props.data.discountPercentage}%</div>
        </div>
    )
}