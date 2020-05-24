import React, { Component } from 'react'

export default class Dashboard extends Component {
    render() {
        return (
            <div>
                <div className="login-form">
                    <div className="cotainer">
                        <div className="row justify-content-center">
                            <div className="col-md-10">
                                <div className="card">
                                    <div className="card-header">
                                        <h3><i className="fas fa-user"></i> <b>Personas</b></h3>
                                    </div>
                                    <div className="card-body">
                                        <form>
                                            <div className="row">
                                                <div className="form-group col-md-8">
                                                    <label htmlFor="id" className="col-md-12 col-form-label text-md-left"><b>id <span className="red"></span></b></label>
                                                    <div className="col-md-12">
                                                        <input type="number" id="id" 
                                                            className="form-control" 
                                                            onChange={this.onInputChange} 
                                                            name="id" 
                                                            autoFocus/>
                                                    </div>
                                                </div>
                                                <div className="col-md-4">
                                                    <button type="button" onClick={() => this.findOne()} className="btn btn-info">
                                                        Buscar persona
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="form-group col-md-6 ">
                                                    <label htmlFor="pNombre" className="col-md-12 col-form-label text-md-left"><b>Primer nombre <span className="red">*</span></b></label>
                                                    <div className="col-md-12">
                                                        <input type="text" 
                                                            id="pNombre" 
                                                            className="form-control" 
                                                            onChange={this.onInputChange} 
                                                            name="pNombre" required/>
                                                    </div>
                                                </div>
                                                <div className="form-group col-md-6 ">
                                                    <label htmlFor="sNombre" className="col-md-12 col-form-label text-md-left"><b>Segundo nombre</b></label>
                                                    <div className="col-md-12">
                                                        <input type="text" 
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
                                                        <input type="text" 
                                                            id="pApellido" 
                                                            className="form-control" 
                                                            onChange={this.onInputChange} 
                                                            name="pApellido" required/>
                                                    </div>
                                                </div>
                                                <div className="form-group col-md-6">
                                                    <label htmlFor="sApellido" className="col-md-12 col-form-label text-md-left"><b>Segundo apellido</b></label>
                                                    <div className="col-md-12">
                                                        <input type="text" 
                                                            id="sApellido" 
                                                            className="form-control" 
                                                            onChange={this.onInputChange} 
                                                            name="sApellido" required/>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="form-group">
                                                <label htmlFor="sexo">Example select</label>
                                                <select class="form-control" id="sexo">
                                                    <option value="1">Masculino</option>
                                                    <option value="2">Femenino</option>
                                                </select>
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
