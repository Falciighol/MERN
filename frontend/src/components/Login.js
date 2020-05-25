import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from "react-router-dom";

export default class Login extends Component {

    constructor() {
        super();
        this.validateLogin = this.validateLogin.bind(this);
    }

    state = {
        username: '',
        password: 0,
        logged: false
    }

    async componentDidMount() {
        
    }

    renderRedirect = () => {
        if (this.validateLogin()) {
            return <Redirect to='/dashboard' />
        }
    }

    validate = () => {
        if (!this.state.username || 
            !this.state.password
            ) {
            return false;
        }
        return true;
    }

    validateFormats = () => {
        if (this.state.username.split("").length < 6) {
            return false;
        }
        return true;
    }

    APIURL = localStorage.getItem('API_URL');

    login = async () => {
        if (this.validate()) {
            if (this.validateFormats()) {
                var thisCopy = this;
                await axios.post(this.APIURL + '/login', {
                    username: this.state.username,
                    password: this.state.password || 0
                })
                .then(function (res) {
                    if (res.data.error === false && res.data.username) {
                        window.sessionStorage.setItem("loggedIn", "true");
                        thisCopy.validateLogin();
                        thisCopy.props.history.push(`/dashboard`);
                    } else {
                        alert("El usuario y la contraseña no coinciden!")
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
            } else {
                alert("El usuario debe tener más de 6 caracteres.")
            }
        } else {
            alert("Complete los campos requeridos!")
        }
    }

    validateLogin = () => {
        return (window.sessionStorage.getItem("loggedIn") === "true")
    }

    onInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    render() {
        return (
            <div>
            {this.renderRedirect()}
                <div className="login-form">
                    <div className="cotainer">
                        <div className="row justify-content-center">
                            <div className="col-md-6">
                                <div className="card">
                                    <div className="card-header">
                                        <h3><i className="fas fa-user"></i> <b>Iniciar sesión</b></h3>
                                    </div>
                                    <div className="card-body">
                                        <form>
                                            <div className="form-group row">
                                                <label htmlFor="user" className="col-md-12 col-form-label text-md-left"><b>Usuario <span className="red">*</span></b></label>
                                                <div className="col-md-12">
                                                    <input minLength="6" maxLength="12" type="text" id="user" 
                                                        className="form-control" 
                                                        onChange={this.onInputChange} 
                                                        name="username"
                                                        required autoFocus/>
                                                </div>
                                            </div>

                                            <div className="form-group row">
                                                <label htmlFor="password" className="col-md-12 col-form-label text-md-left"><b>Contraseña <span className="red">*</span></b></label>
                                                <div className="col-md-12">
                                                    <input type="password" 
                                                        id="password" 
                                                        className="form-control" 
                                                        onChange={this.onInputChange} 
                                                        name="password" pattern="^[0-9]*$" required/>
                                                </div>
                                            </div>

                                            <div className="col-md-6 offset-md-3">
                                                <button type="button" onClick={() => this.login()} className="btn btn-primary">
                                                    Iniciar sesión 
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
