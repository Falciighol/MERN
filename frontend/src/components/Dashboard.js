import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from "react-router-dom";

function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
}

export default class Dashboard extends Component {

    constructor() {
        super();
        this.state = {
            id: 0,
            pNombre: '',
            sNombre: '',
            pApellido: '',
            sApellido: '',
            sexo: 0,
            fechaNac: '',
            info: '',
            showA: 'hide',
            data: []
        };
        this.find = this.find.bind(this);
    }

    validateLogin = function() {
        return (window.sessionStorage.getItem("loggedIn") === "true")
    }

    async componentDidMount() {
        this.find();
    }

    APIURL = localStorage.getItem('API_URL');

    validate = () => {
        if (!this.state.pNombre || 
            !this.state.pApellido || 
            !this.state.sexo || 
            !this.state.fechaNac || 
            !this.state.info
            ) {
            return false;
        }
        return true;
    }

    logout = () => {
        window.sessionStorage.setItem("loggedIn", "false");
        this.props.history.push(`/login`);
    }

    find = async () => {
        var thisCopy = this;
        await axios.get(this.APIURL + '/dashboard')
        .then(function (res) {
            if (res.data.error === false && res.data.data) {
                thisCopy.setState({
                    id: thisCopy.state.id,
                    pNombre: thisCopy.state.pNombre,
                    sNombre: thisCopy.state.sNombre,
                    pApellido: thisCopy.state.pApellido,
                    sApellido: thisCopy.state.sApellido,
                    sexo: thisCopy.state.sexo,
                    fechaNac: thisCopy.state.fechaNac,
                    info: thisCopy.state.info,
                    showA: thisCopy.state.showA,
                    data: res.data.data
                });
                /*var newArr = [];
                res.data.data.forEach(el => {
                    var newElmnt = {
                        primerNombre: el.primerNombre,
                        segundoNombre: el.segundoNombre,
                        primerApellido: el.primerApellido,
                        segundoApellido: el.segundoApellido,
                    }
                    newArr.push(newElmnt);
                });
                thisCopy.datatable.rows = newArr;
                console.log(newArr);*/
            }
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    findOne = async () => {
        var thisCopy = this;
        await axios.get(this.APIURL + '/dashboard/'+this.state.id)
        .then(function (res) {
            if (res.data.error === false && res.data.data) {
                if (res.data.data.length >= 1) {
                    var p = res.data.data[0];
                    thisCopy.setState({
                        id: thisCopy.state.id,
                        pNombre: p.primerNombre,
                        sNombre: p.segundoNombre,
                        pApellido: p.primerApellido,
                        sApellido: p.segundoApellido,
                        sexo: p.sexo,
                        fechaNac: formatDate(p.fechaNacimmiento),
                        info: p.informacionAdicional,
                        showA: thisCopy.state.showA,
                        data: thisCopy.state.data
                    });
                } else {
                    alert(`No se encontró ningun registro con ID ${thisCopy.state.id}!`)
                }
            }
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    add = async () => {
        if (this.validate()) {
            var thisCopy = this;
            await axios.post(this.APIURL + '/dashboard', this.state)
            .then(function (res) {
                if (res.data.error === false && res.data) {
                    if (!res.data.data.error && res.data.data.affectedRows >= 1)
                        alert("Registro agregado correctamente!")
                    else
                        alert("Error al agregar el registro!")
                    thisCopy.find();
                    thisCopy.clean();
                }
            })
            .catch(function (error) {
                console.log(error);
            });
        } else {
            alert("Complete los campos requeridos!")
        }
    }

    edit = async () => {
        if (this.validate()) {
            var thisCopy = this;
            await axios.patch(this.APIURL + '/dashboard/' + this.state.id || 0, this.state)
            .then(function (res) {
                if (res.data.error === false && res.data) {
                    if (!res.data.data.error && res.data.data.affectedRows >= 1)
                        alert("Registro editado correctamente!")
                    else
                        alert(`Error al editar el registro con ID ${thisCopy.state.id}!`)
                    thisCopy.find();
                    thisCopy.clean();
                }
            })
            .catch(function (error) {
                console.log(error);
            });
        } else {
            alert("Complete los campos requeridos!")
        }
    }

    delete = async () => {
        var thisCopy = this;
        var r = window.confirm(`Desea eliminar el registro con ID ${this.state.id}?`);
        if (r === true) {
            await axios.delete(this.APIURL + '/dashboard/'+this.state.id || 0)
            .then(function (res) {
                if (res.data.error === false && res.data) {
                    if (!res.data.data.error && res.data.data.affectedRows >= 1)
                        alert("Registro eliminado correctamente!")
                    else
                        alert(`El registro con ID ${thisCopy.state.id} ya fue eliminado o no existe!`)
                    thisCopy.find();
                    thisCopy.clean();
                }
            })
            .catch(function (error) {
                console.log(error);
            });
        }
    }

    clean = () => {
        var data = this.state.data;
        this.setState({
            id: 0,
            pNombre: '',
            sNombre: '',
            pApellido: '',
            sApellido: '',
            sexo: 0,
            fechaNac: '',
            info: '',
            showA: 'hide',
            data: data
        });
    }

    onInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
        console.log(this.state)
    }

    render() {
        if (this.validateLogin() !== true) {
            return <Redirect to={"/login"} />
        }
        return (
            <div>
                <div className="login-form">
                    <div className="cotainer">
                        <div className="row justify-content-center">
                            <div className="col-md-10">
                                <div className="card">
                                    <div className="card-header">
                                        <div className="row">
                                            <div className="col-md-6 text-align-left">
                                                <h3>
                                                    <i className="fas fa-user"></i> <b>Gestión de personas</b>
                                                </h3>
                                            </div>
                                            <div className="col-md-6" align="right">
                                                <button type="button" onClick={() => this.logout()} className="btn btn-dark">
                                                    Cerrar sesión
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card-body">
                                        <form>
                                            <div className="row">
                                                <div className="form-group col-md-8">
                                                    <label htmlFor="id" className="col-md-12 col-form-label text-md-left"><b>ID de registro <span className="red"></span></b></label>
                                                    <div className="col-md-12">
                                                        <input min="0" value={this.state.id} type="number" id="id" 
                                                            className="form-control" 
                                                            onChange={this.onInputChange} 
                                                            name="id" 
                                                            autoFocus/>
                                                    </div>
                                                </div>
                                                <div className="col-md-4">
                                                    <button type="button" style={{margin: 30+"px"}} onClick={() => this.findOne()} className="btn btn-info">
                                                        Buscar persona
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="form-group col-md-6 ">
                                                    <label htmlFor="pNombre" className="col-md-12 col-form-label text-md-left"><b>Primer nombre <span className="red">*</span></b></label>
                                                    <div className="col-md-12">
                                                        <input value={this.state.pNombre} type="text" id="pNombre" 
                                                            className="form-control" 
                                                            onChange={this.onInputChange} 
                                                            name="pNombre" required/>
                                                    </div>
                                                </div>
                                                <div className="form-group col-md-6 ">
                                                    <label htmlFor="sNombre" className="col-md-12 col-form-label text-md-left"><b>Segundo nombre</b></label>
                                                    <div className="col-md-12">
                                                        <input value={this.state.sNombre} type="text" 
                                                            id="sNombre" 
                                                            className="form-control" 
                                                            onChange={this.onInputChange} 
                                                            name="sNombre"/>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="form-group col-md-6">
                                                    <label htmlFor="pApellido" className="col-md-12 col-form-label text-md-left"><b>Primer apellido <span className="red">*</span></b></label>
                                                    <div className="col-md-12">
                                                        <input value={this.state.pApellido} type="text" 
                                                            id="pApellido" 
                                                            className="form-control" 
                                                            onChange={this.onInputChange} 
                                                            name="pApellido" required/>
                                                    </div>
                                                </div>
                                                <div className="form-group col-md-6">
                                                    <label htmlFor="sApellido" className="col-md-12 col-form-label text-md-left"><b>Segundo apellido</b></label>
                                                    <div className="col-md-12">
                                                        <input value={this.state.sApellido} type="text" 
                                                            id="sApellido" 
                                                            className="form-control" 
                                                            onChange={this.onInputChange} 
                                                            name="sApellido" required/>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="form-group col-md-6">
                                                    <label htmlFor="sexo" className="col-md-12 col-form-label text-md-left"><b>Sexo <span className="red">*</span></b></label>
                                                    <div className="col-md-12">
                                                        <select value={this.state.sexo} className="form-control" id="sexo" onChange={this.onInputChange} name="sexo" required>
                                                            <option value="">-Seleccione una opción-</option>
                                                            <option value="1">Masculino</option>
                                                            <option value="2">Femenino</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="form-group col-md-6">
                                                    <label htmlFor="fechaNac" className="col-md-12 col-form-label text-md-left"><b>Fecha nacimiento <span className="red">*</span></b></label>
                                                    <div className="col-md-12">
                                                        <input value={this.state.fechaNac} type="date" 
                                                            id="fechaNac" 
                                                            className="form-control" 
                                                            onChange={this.onInputChange} 
                                                            name="fechaNac" required/>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="form-group col-md-12">
                                                    <label htmlFor="info" className="col-md-12 col-form-label text-md-left"><b>Información adicional <span className="red">*</span></b></label>
                                                    <div className="col-md-12">
                                                        <textarea value={this.state.info} 
                                                            id="info" 
                                                            className="form-control" 
                                                            onChange={this.onInputChange} 
                                                            name="info" required/>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className={"alert alert-warning "+this.state.showA} role="alert">
                                                <b>Atención:</b> LLene los campos requeridos!
                                            </div>
                                            <br/>
                                            <div className="row">
                                                <div className="col-md-3">
                                                    <button type="button" onClick={() => this.add()} className="btn btn-success">
                                                        Agregar
                                                    </button>
                                                </div>
                                                <div className="col-md-3">
                                                    <button type="button" onClick={() => this.edit()} className="btn btn-warning">
                                                        Editar 
                                                    </button>
                                                </div>
                                                <div className="col-md-3">
                                                    <button type="button" onClick={() => this.delete()} className="btn btn-danger">
                                                        Eliminar 
                                                    </button>
                                                </div>
                                                <div className="col-md-3">
                                                    <button type="button" onClick={() => this.clean()} className="btn btn-default">
                                                        Limpiar
                                                    </button>
                                                </div>
                                            </div>
                                            <br/>
                                        </form>
                                        <div className="row">
                                            <table className="table">
                                                <thead>
                                                    <tr>
                                                    <th scope="col">ID</th>
                                                    <th scope="col">Nombres</th>
                                                    <th scope="col">Apellidos</th>
                                                    <th scope="col">Sexo</th>
                                                    <th scope="col">Fecha nacimiento</th>
                                                    <th scope="col">Info. adicional</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        this.state.data.map(el => (
                                                            <tr>
                                                                <td>{"".concat(el.idPersona)}</td>
                                                                <td>{"".concat(el.primerNombre, " ", el.segundoNombre)}</td>
                                                                <td>{"".concat(el.primerApellido, " ", el.segundoApellido)}</td>
                                                                <td>{(el.sexo === 1)?"Masculino":"Femenino"}</td>
                                                                <td>{formatDate(el.fechaNacimmiento)}</td>
                                                                <td>{el.informacionAdicional}</td>
                                                            </tr>
                                                        ))
                                                    }
                                                </tbody>
                                            </table>
                                        </div>
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
