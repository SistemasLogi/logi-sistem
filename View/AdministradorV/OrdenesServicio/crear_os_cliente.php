<div class="toast show border-primary col-lg-12" role="alert" aria-live="assertive" aria-atomic="true" style="max-width: 100%; border-radius: 0.5rem;">
    <div class="toast-header">
        <strong class="mr-auto">CREAR OS por CLIENTE</strong>
    </div>

    <div class="toast-body row">        
        <div class="alert alert-dismissible alert-secondary col-lg-12" style="border-radius: 0.5rem;">

            <div class="row">
                <div class="alert alert-dismissible alert-light col-lg-8  border-warning" style="border-radius: 0.5rem;">
                    <form id="formBuscarCli_crear_OS">
                        <div class="form-row">
                            <div class="form-group col-md-6">
                                <label for="selectCliente" class="col-form-label"><b>Buscar Cliente :</b></label>
                                <div>
                                    <select class="form-control form-control-sm mr-sm-2 col-12" id="selectCliente" name="selectCliente">

                                    </select>
                                </div>
                            </div>
                            <div class="form-group col-md-6">
                                <label for="selectProceso" class="col-form-label"><b>TIPO :</b></label>
                                <div>
                                    <select class="form-control form-control-sm mr-sm-2 col-12" id="selectProceso">
                                        <option value="1">RECOLECCIÓN</option>
                                        <option value="4">ALISTAMIENTO</option>
                                        <option value="5">ALISTAMIENTO CORTESÍA</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <fieldset class="form-group">
                            <div class="custom-control custom-checkbox">
                                <input type="checkbox" class="custom-control-input" id="checkSucur">
                                <label class="custom-control-label" for="checkSucur">Selecionar Sucursal</label>
                            </div>
                        </fieldset>
                        <div class="form-group row" id="blqSucur" style="display: none;">
                            <label for="selectSuc_x_Cli" class="col-sm-4 col-form-label"><b>SUCURSAL :</b></label>
                            <div class="col-sm-8">
                                <select class="form-control form-control-sm mr-sm-2 col-12" id="selectSuc_x_Cli">

                                </select>
                            </div>
                        </div>
                        <button type="button" class="btn btn-outline-primary btn-sm" id="btnSiguiente" name="btnSiguiente">SIGUIENTE</button>                        
                    </form>
                    <div class="alert alert-dismissible alert-light" id="infoCliente" style="border-radius: 0.5rem; display: none;">
                        <strong id="nomCli"></strong><br>
                        <strong id="infoOrd"></strong>
                        <strong id="numOrden"></strong>
                    </div>

                </div>
                <div class="alert alert-dismissible alert-light col-lg-4" id="blqFinalizado" style="border-radius: 0.5rem;">

                </div>
            </div>   
        </div>
    </div>
</div>
<div id="sectionConten">
    <div class="toast show border-primary col-lg-12" role="alert" aria-live="assertive" aria-atomic="true" style="max-width: 100%; border-radius: 0.5rem;">
        <div class="toast-header">
            <strong class="mr-auto">CREAR OS por CLIENTE</strong>
        </div>

        <div class="toast-body row">        
            <div class="alert alert-dismissible alert-secondary col-lg-12" style="border-radius: 0.5rem;">

                <div class="row">
                    <div class="alert alert-dismissible alert-light col-lg-12  border-warning" style="border-radius: 0.5rem;">
                        <form id="form_guarda_os">
                            <div class="form-row">
                                <div class="form-group col-md-3">
                                    <label for="selCliente">Cliente</label>
                                    <select id="selCliente" name="selCliente" class="form-control form-control-sm">

                                    </select>
                                </div>
                                <div class="form-group col-md-3">
                                    <label for="selSucur">Sucursal</label>
                                    <select id="selSucur" name="selSucur" class="form-control form-control-sm">

                                    </select>
                                </div>
                                <div class="form-group col-md-3">
                                    <label for="selServi">Tipo Servicio</label>
                                    <select id="selServi" name="selServi" class="form-control form-control-sm">

                                    </select>
                                </div>
                                <div class="form-group col-md-3">
                                    <label for="selEnvio">Tipo Envio</label>
                                    <select id="selEnvio" name="selEnvio" class="form-control form-control-sm">

                                    </select>
                                </div>                                  
                            </div>
                            <div class="form-row">
                                <div class="form-group col-md-3">
                                    <label for="inpDirec">Dirección</label>
                                    <input type="text" class="form-control form-control-sm" id="inpDirec" name="inpDirec" placeholder="Dirección">
                                </div>
                                <div class="form-group col-md-2">
                                    <label for="selCiudad">Ciudad</label>
                                    <select id="selCiudad" name="selCiudad" class="form-control form-control-sm">

                                    </select>
                                </div>
                                <div class="form-group col-md-2">
                                    <label for="inpTel">Teléfono</label>
                                    <input type="text" class="form-control form-control-sm" id="inpTel" name="inpTel" placeholder="Teléfono">
                                </div>
                                <div class="form-group col-md-2">
                                    <label for="inpCel">Celular</label>
                                    <input type="text" class="form-control form-control-sm" id="inpCel" name="inpCel" placeholder="Celular">
                                </div>
                                <div class="form-group col-md-3">
                                    <label for="inpPerCont">Persona Contacto</label>
                                    <input type="text" class="form-control form-control-sm" id="inpPerCont" name="inpPerCont" placeholder="Contacto">
                                </div>
                            </div>
                            <div class="form-row">
                                <div class="form-group col-md-8">
                                    <label for="texaObserv">Observaciones</label>
                                    <textarea class="form-control" id="texaObserv" name="texaObserv" rows="1"></textarea>
                                </div> 
                                <div class="form-group col-md-4">
                                    <button type="submit" class="btn btn-primary mt-4" id="btnGuardaOS" name="btnGuardaOS">Guardar</button>
                                    <button type="button" class="btn btn-dark mt-4" id="btnCancelOS" name="btnCancelOS">Cancelar</button>                               
                                </div> 
                            </div>                            
                        </form>
                    </div>
                </div>   
            </div>
        </div>
    </div>
</div>