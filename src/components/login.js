import React, { Component, useEffect, useState } from "react";
import {axios, setStorageItem} from '../helpers'
import {USER_SESSION} from "../constants"
const Login = (props) => {
    const [auth, setAuth] = useState({});
    const [alert, setAlert] = useState({show: false, message: ''});
    
    const handleChange = e => {
        const {name, value} = e.target;

        setAuth({
            ...auth,
            [name]: value
        })
    };

    const handleSubmit = e => {
        e.preventDefault();
        const data = {
            ...auth       
        };

        
        const configs = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        };
        // console.log(data)
            axios
                .post('login', data, configs)
                    .then(res => {
                        console.log(res);
                    setStorageItem(USER_SESSION, res);
                    setStorageItem("user", res);
                    setAlert({
                        show: true,
                        message: 'Объявление успешно создано!',
                        color: 'success'
                    });
                    setTimeout(() => {
                        props.history.push(`/operation`);
                    }, 3000)
                });
                
            
        };


        return (
            <form onSubmit={handleSubmit}>
                <h3>Sign In</h3>
                <div className="form-group">
                    <label>Login</label>
                    <input type="text" className="form-control" name="login" onChange={handleChange} placeholder="Enter login" />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" name="password" onChange={handleChange} placeholder="Enter password" />
                </div>

                <div className="form-group">
                {/* <label >{alert.message}</label> */}
                    <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" id="customCheck1" />
                        <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                    </div>
                </div>

                <button type="submit" className="btn btn-primary btn-block">Submit</button>
                <p className="forgot-password text-right">
                    Forgot <a href="#">password?</a>
                </p>
            </form>
        )
    };

export default Login;