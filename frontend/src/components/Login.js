import React, { Component } from 'react';
import axios from 'axios';

export default class Login extends Component {

    state = {
        username: '',
        password: ''
    }

    async componentDidMount() {
        // this.validateLogin();
    }

    validateLogin = async () => {
        await axios.post('http://localhost:4000/api/user/findUser', {
            username: this.state.username,
            pasword: this.state.password
        })
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    onInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
        console.log(this.state)
    }

    render() {
        return (
            <div>
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
                                                    <input type="text" id="user" 
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
                                                        name="password" required/>
                                                </div>
                                            </div>

                                            <div className="col-md-6 offset-md-3">
                                                <button type="button" onClick={() => this.validateLogin()} className="btn btn-primary">
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
