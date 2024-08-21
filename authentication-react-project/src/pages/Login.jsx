import { useRef, useState } from "react"
import { Link } from "react-router-dom"
import axiosClient from '../axios-client'
import { useStateContext } from "../context/ContextProvider";

export default function Login() {

    const emailRef = useRef();
    const passwordRef = useRef();

    const [errors, setErrors] = useState(null);
    const {setUserLocal, setToken, setUser} = useStateContext();

    const onSubmit = (ev) => {
        ev.preventDefault();

        const payload = {
            email : emailRef.current.value,
            password : passwordRef.current.value,
        }

        setErrors(null);

        axiosClient.post('/login', payload)
        .then(({data}) => {
            // setUserLocal(data.user)
            setUser(data.user)
            setToken(data.token)
        })
        .catch((err) => {
            const response = err.response;

            if(response && response.status == 422) {
                if(response.data.errors){
                    console.log(response.data.errors)
                    setErrors(response.data.errors);
                } else {
                    console.log(response.data.message)
                    setErrors({email : [response.data.message]});
                }
            }
        })
    }

    return(
        <div className="login-signup-form animated fadeInDown">
            <div className="form">
                <h1 className="title">Login into your account</h1>
                <form onSubmit={onSubmit}>

                    {
                        errors && <div className="alert">
                            {
                                Object.keys(errors).map(key => (
                                    <p key={key}>{errors[key][0]}</p>
                                ))
                            }
                        </div>
                    }

                    <input ref={emailRef} type='email' placeholder="Email"/>
                    <input ref={passwordRef} type='password' placeholder="Password"/>
                    <button className="btn btn-block">Login</button>
                </form>
                <p className="message">
                    Not registered? <Link to='/signup'>Create an account</Link>
                </p>
            </div>
        </div>
    )
}