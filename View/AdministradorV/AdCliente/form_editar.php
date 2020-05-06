<div class="toast show border-primary col-lg-12" role="alert" aria-live="assertive" aria-atomic="true" style="max-width: 100%; border-radius: 0.5rem;">
    <div class="toast-header">
        <strong class="mr-auto">BUSCADOR</strong>

    </div>
    <div class="toast-body">
        <div class="alert alert-dismissible alert-warning">
            <div class="row">
                <div class="col-lg-7">
                    <form class="form-inline my-2 my-lg-0 form-group-sm" id="formBuscarCli" name="formBuscarCli">                                    
                        <b>Buscar Documento :</b>
                        <input class="form-control form-control-sm mr-sm-2" type="text" id="inpBuscaDocCli" name="inpBuscaDocCli" placeholder="Buscar Doc.">
                        <button type="submit" class="btn btn-outline-primary btn-sm" id="btnBuscaCli" name="btnBuscaCli">BUSCAR</button>    
                    </form>
                </div>
                <div class="col-lg-5" id="menCliNoAccess">

                </div>

            </div>

            <form id="formClienteAct">
                <fieldset>
                    <legend>Cliente: <span id="labelNombreCli"></span></legend>        
                    <div class="row">
                        <div class="form-group form-group-sm col-lg-6">
                            <label for="inputNomCliAc">Nombre Cliente</label>
                            <input type="text" class="form-control form-control-sm" id="inputNomCliAc" name="inputNomCliAc" placeholder="Nombre Cliente">
                        </div>
                        <div class="form-group form-group-sm col-lg-2" style="display: none;">
                            <input type="text" class="form-control form-control-sm" id="selectTipDocAc" name="selectTipDocAc">
                        </div>
                        <div class="form-group form-group-sm col-lg-3" style="display: none;">
                            <input type="text" class="form-control form-control-sm" id="inputNumCliAc" name="inputNumCliAc"> 
                        </div>
                        <div class="form-group form-group-sm col-lg-2">
                            <label for="inputTelCliAc">Teléfono</label>
                            <input type="text" class="form-control form-control-sm" id="inputTelCliAc" name="inputTelCliAc" placeholder="N° Tel. Fijo">
                        </div>
                        <div class="form-group form-group-sm col-lg-4">
                            <label for="inputDirCliAc">Dirección</label>
                            <input type="text" class="form-control form-control-sm" id="inputDirCliAc" name="inputDirCliAc" placeholder="Dirección">
                        </div>
                    </div>                                           
                    <div class="row">
                        <div class="form-group form-group-sm col-lg-2">
                            <label for="inputCelCliAc">Celular</label>
                            <input type="text" class="form-control form-control-sm" id="inputCelCliAc" name="inputCelCliAc" placeholder="N° Celular">
                        </div>
                        <div class="form-group form-group-sm col-lg-7">
                            <label for="inputPerContAc">P. Contacto</label>
                            <input type="text" class="form-control form-control-sm" id="inputPerContAc" name="inputPerContAc" placeholder="Contacto">
                        </div>
                        <div class="form-group form-group-sm col-lg-3">
                            <label for="selectTipUsAc">Tipo Usuario</label>
                            <select class="form-control form-control-sm" id="selectTipUsAc" name="selectTipUsAc">

                            </select>
                        </div>
                    </div> 
                    <div class="row">
                        <div class="form-group mb-2 col-lg-2">
                            <button type="submit" class="btn btn-warning" id="btnGuardaAct" name="btnGuardaAct">EDITAR</button> 
                        </div>
                        <div class="form-group mb-2 col-lg-2">
                            <button type="button" class="btn btn-dark" id="btnCancelarCli" name="btnCancelarCliAct">CANCELAR</button>                   
                        </div>
                    </div>

                </fieldset>
            </form>
        </div>
    </div>
</div>
<div class="toast show border-primary col-lg-12" role="alert" aria-live="assertive" aria-atomic="true" style="max-width: 100%; border-radius: 0.5rem;">
    <div class="toast-header">
        <strong class="mr-auto">TABLA GENERAL</strong>

    </div>
    <div class="toast-body">

        <div id="tablaCliAct">

        </div>
    </div>
</div>