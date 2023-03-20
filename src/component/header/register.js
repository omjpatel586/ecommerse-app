import axios from "axios"
import { useRef, useState } from "react"
import { Container } from "react-bootstrap"
import { BsPersonBoundingBox, BsFillLockFill, BsFillTelephoneFill, BsFillPersonFill, BsFileImage } from "react-icons/bs"

export const Register = () => {
    const [val, setval] = useState([])
    const image = useRef()

    const handleSave = () => {
        const fdata = new FormData()
        fdata.append("action", "register")
        fdata.append("name", val[0])
        fdata.append("contact", val[1])
        fdata.append("email", val[2])
        fdata.append("pw", val[3])
        fdata.append("image", image.current.files[0])
        axios.post("https://omcdmiweb.000webhostapp.com/ecommerseapi.php", fdata)
            .then(function (success) {
                let box = document.getElementsByTagName("input")
                for(let i=0;i<box.length;i++) {
                    box[i].value = "" 
                }
                console.log(success)
            })
            .catch(function (error) {
                console.log(error)
            })
    }

    return (
        <>
            <div className="bg-image">
                <div className="layer">
                    <Container>
                        <div className="d-grid justify-content-center h-register">
                            <div className="heading">
                                <h1>Create Account</h1>
                            </div>
                            <div className="d-flex mx-2">
                                <i><BsFillPersonFill /></i>
                                <input type="text" placeholder="Name :- " className="box w-100" onChange={(i) => { let arr = val; arr[0] = i.target.value; setval([...arr]) }} />
                            </div>
                            <div className="d-flex mx-2">
                                <i><BsFillTelephoneFill /></i>
                                <input type="text" placeholder="Contact Number :- " className="box w-100" maxLength="10" onChange={(i) => { let arr = val; arr[1] = i.target.value; setval([...arr]) }} />
                            </div>
                            <div className="d-flex mx-2">
                                <i><BsPersonBoundingBox /></i>
                                <input type="email" placeholder="Email :- " className="box w-100" onChange={(i) => { let arr = val; arr[2] = i.target.value; setval([...arr]) }} />
                            </div>
                            <div className="d-flex mx-2">
                                <i><BsFillLockFill /></i>
                                <input type="password" placeholder="Password :- " className="box w-100" onChange={(i) => { let arr = val; arr[3] = i.target.value; setval([...arr]) }} />
                            </div>
                            <div className="d-flex mx-2">
                                <i><BsFileImage /></i>
                                <input type="file" className="boxImg" ref={image} />
                            </div>
                            <div>
                                <input type="button" value="Sign Up" className="button" onClick={handleSave} />
                            </div>
                        </div>
                    </Container>
                </div>
            </div>
        </>
    )
}