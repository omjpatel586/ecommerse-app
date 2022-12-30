import { Col, Container, Row } from "react-bootstrap"
import "./css/style.css"

const Header = () => {
    return (
        <div className="bg-style-header">
            <Container>
                <Row className="align-items-center p-3 justify-content-between">
                    <Col xs={"auto"}>
                        <div className="image1">
                            <img src={require("./Images/ammoapp-logo.png")}></img>
                        </div>
                    </Col>
                    <Col xs={"auto"}>
                        <nav>
                            <ul className="d-flex list-unstyled">
                                <li><a href="/">Home</a></li>
                                <li><a href="#">MyOrders</a></li>
                                <li><a href="/cart">MyCart</a></li>
                                <li><a href="#">AboutUs</a></li>
                            </ul>
                        </nav>
                    </Col>
                    <Col xs={"auto"}>
                        <input type="button" value="Login"></input>
                        <input type="button" value="Sign In"></input>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Header