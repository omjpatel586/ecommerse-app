import axios from "axios"
import { useState } from "react"
import { Container } from "react-bootstrap"
import { BsPersonBoundingBox, BsFillLockFill, BsFillArrowRightCircleFill } from "react-icons/bs"
import "./css/login.css"
import { Products } from "../products"

export const Login = () => {
    const [val, setval] = useState([])
    const [user, setuser] = useState(0)

    const handleSave = () => {
        let fdata = new FormData()
        fdata.append("action","login")
        fdata.append("email",val[0])
        fdata.append("password",val[1])

        axios.post("https://omcdmiweb.000webhostapp.com/ecommerseapi.php",fdata)
            .then(function (success) {
                let box = document.getElementsByTagName("input")
                for(let i=0;i<box.length;i++) {
                    box[i].value = "" 
                }
                setuser(success.data)
            })
            .catch(function (error) {
                console.log(error)
            })
    }

    if(user!==0) {
        window.localStorage.setItem("uid", user.id)
        return ( <Products data={user} /> )
    }

    return (
        <>
            <div className="bg-image">
                <div className="layer">
                    <Container>
                        <div className="d-grid justify-content-center height">
                            <div className="heading">
                                <h1>Sign In</h1>
                            </div>
                            <div className="d-flex mx-2">
                                <i><BsPersonBoundingBox /></i>
                                <input type="email" placeholder="Email :- " className="box" onChange={(i) => { let arr = val; arr[0] = i.target.value; setval([...arr]) }} />
                            </div>
                            <div className="d-flex mx-2">
                                <i><BsFillLockFill /></i>
                                <input type="password" placeholder="Password :- " className="box" onChange={(i) => { let arr = val; arr[1] = i.target.value; setval([...arr]) }} />
                            </div>
                            <div>
                                <input type="button" value="Login" className="button" onClick={handleSave} />
                            </div>
                            <div className="extra d-grid p-3">
                                <a href="#">Forget Password??</a>
                                <div className="wrap text-center">
                                    <a href="/register">Create Account</a>
                                    <i><BsFillArrowRightCircleFill /></i>
                                </div>
                            </div>
                        </div>
                    </Container>
                </div>
            </div>
        </>
    )
}