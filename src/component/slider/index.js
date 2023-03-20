import OwlCarousel from 'react-owl-carousel'
import "./css/style.css"

export const Slider = () => {
    return (
        <div className="d-none d-lg-block">
            <OwlCarousel nav={true} dots={false} loop autoplay autoplayTimeout={2000} items={1} className="owl-theme">
                <div className="item">
                    <div className="slid-img">
                        <img src={require("./Images/s1.jpg")} alt="Frame Not Available"></img>
                    </div>
                </div>
                <div className="item">
                    <div className="slid-img">
                        <img src={require("./Images/s2.jpg")} alt="Frame Not Available"></img>
                    </div>
                </div>
                <div className="item">
                    <div className="slid-img">
                        <img src={require("./Images/s3.jpg")} alt="Frame Not Available"></img>
                    </div>
                </div>
                <div className="item">
                    <div className="slid-img">
                        <img src={require("./Images/s4.jpg")} alt="Frame Not Available"></img>
                    </div>
                </div>
            </OwlCarousel>
        </div>
    )
}