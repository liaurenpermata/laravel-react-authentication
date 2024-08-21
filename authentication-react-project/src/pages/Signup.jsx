import { createRef, useState } from "react";
import axiosClient from '../axios-client.js';
import { Link } from "react-router-dom";
import { useStateContext } from "../context/ContextProvider";

export default function Signup() {

    const nameRef = createRef();
    const emailRef = createRef();
    const passwordRef = createRef();
    const passwordConfirmationRef = createRef();
    const [errors, setErrors] = useState(null);

    const {setUserLocal, setToken, setUser} = useStateContext();

    const onSubmit = (ev) => {
        ev.preventDefault();

        const payload = {
            name: nameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
            password_confirmation: passwordConfirmationRef.current.value
        }

        axiosClient.post('/signup', payload)
        .then(({data}) => {
            // setUserLocal(data.user)
            setUser(data.user)
            setToken(data.token)
        })
        .catch(err => {
            const response = err.response;
            if(response && response.status == 422){
                console.log(response.data.errors)
                setErrors(response.data.errors);
            }
        })
    }

    return(
        <div className="login-signup-form animated fadeInDown">
            <div className="form">
                <h1 className="title">Sign up for free!</h1>
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

                    <input ref={nameRef} type='text' placeholder="Fullname"/>
                    <input ref={emailRef} type='email' placeholder="Email Address"/>
                    <input ref={passwordRef} type='password' placeholder="Password"/>
                    <input ref={passwordConfirmationRef} type='password' placeholder="Password Confirmation"/>
                    <button className="btn btn-block">Sign Up</button>
                </form>
                <p className="message">
                    Already registered? <Link to='/login'>Sign In</Link>
                </p>
            </div>
        </div>
    )
}