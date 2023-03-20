import "./css/style.css"
import "./css/spinner.css"
import { useSelector } from "react-redux"
import { Container } from "react-bootstrap"
import Header from "../header"
import { Slider } from "../slider"
import { useSwitch } from '../../useSwitch'
import { DesktopUI } from "./DesktopUI"
import { MobileUI } from "./MobileUI"

export const Products = (props) => {
    const url = useSelector((i) => i.Search)
    const [result] = useSwitch(url)
    const json = useSelector((i) => i.Qty)
    console.log(json)

    if (result[1]) {
        return (
            <>
                <Header />
                <div className="d-none d-lg-block">
                    <Slider />
                    <div className="p-3">
                        <Container>
                            <div className="d-grid grid-columns">
                                {
                                    result[0].data.products.map((i, k) => {
                                        return (
                                            <DesktopUI data={i} index={k} />
                                        )
                                    })
                                }
                            </div>
                        </Container>
                    </div>
                </div>
                <div className="d-block d-lg-none">
                    <Container>
                        <div className="d-grid grid-columns p-3">
                            {
                                result[0].data.products.map((i, k) => {
                                    return (
                                        <MobileUI data={i} index={k} />
                                    )
                                })
                            }
                        </div>
                    </Container>
                </div>
            </>
        )
    }
    return (
        <div className="d-flex justify-content-center text-white bg-style-spinner">
            <div className="spinner">
                <div className="spinner-circle spinner-circle-outer"></div>
                <div className="spinner-circle-off spinner-circle-inner"></div>
                <div className="spinner-circle spinner-circle-single-1"></div>
                <div className="spinner-circle spinner-circle-single-2"></div>
            </div>
        </div>
    )
}