<div class="toast show border-primary col-lg-12" role="alert" aria-live="assertive" aria-atomic="true" style="max-width: 100%; border-radius: 0.5rem;">
    <div class="toast-header">
        <strong class="mr-auto">CREAR OS por CLIENTE</strong>

    </div>

    <div class="toast-body row">        
        <div class="alert alert-dismissible alert-secondary col-lg-12" style="border-radius: 0.5rem;">

            <div class="row">
                <div class="alert alert-dismissible alert-warning col-lg-8  border-warning">
                    <form id="formBuscarCli_crear_OS">
                        <div class="form-row">
                            <div class="form-group col-md-6">
                                <label for="selectCliente" class="col-form-label"><b>Buscar Cliente :</b></label>
                                <div>
                                    <select class="form-control form-control-sm mr-sm-2 col-12" id="selectCliente">

                                    </select>
                                </div>
                            </div>
                            <div class="form-group col-md-6">
                                <label for="selectProceso" class="col-form-label"><b>TIPO :</b></label>
                                <div>
                                    <select class="form-control form-control-sm mr-sm-2 col-12" id="selectProceso">
                                        <option value="1">RECOLECCIÓN</option>
                                        <option value="2">ALISTAMIENTO</option>
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
                <div class="alert alert-dismissible alert-light col-lg-4" id="blqFinalizado">

                </div>
            </div>   
        </div>
    </div>
</div>
<div id="sectionConten">

</div>