<div class="toast show border-primary col-lg-12" role="alert" aria-live="assertive" aria-atomic="true" style="max-width: 100%; border-radius: 0.5rem;">
    <div class="toast-header">
        <strong class="mr-auto">REGISTRAR</strong>

    </div>
    <div class="toast-body">
        <div class="alert alert-dismissible alert-primary border-secondary" style="border-radius: 0.5rem;">
            <form id="formCliente">
                <fieldset>
                    <legend>Cliente</legend>        
                    <div class="row">
                        <div class="form-group form-group-sm col-lg-5">
                            <label for="inputNomCli">Nombre Cliente</label>
                            <input type="text" class="form-control form-control-sm" id="inputNomCli" name="inputNomCli" placeholder="Nombre Cliente">
                        </div>
                        <div class="form-group form-group-sm col-lg-2">
                            <label for="selectTipDoc">Tipo Doc.</label>
                            <select class="form-control form-control-sm" id="selectTipDoc" name="selectTipDoc">

                            </select>
                        </div>
                        <div class="form-group form-group-sm col-lg-3">
                            <label for="inputNumCli">N° Doc.</label>
                            <input type="text" class="form-control form-control-sm" id="inputNumCli" name="inputNumCli" placeholder="N° Documento"> 
                        </div>
                        <div class="form-group form-group-sm col-lg-2">
                            <label for="inputTelCli">Teléfono</label>
                            <input type="text" class="form-control form-control-sm" id="inputTelCli" name="inputTelCli" placeholder="N° Tel. Fijo">
                        </div>
                    </div>                                           
                    <div class="row">
                        <div class="form-group form-group-sm col-lg-2">
                            <label for="inputCelCli">Celular</label>
                            <input type="text" class="form-control form-control-sm" id="inputCelCli" name="inputCelCli" placeholder="N° Celular">
                        </div>
                        <div class="form-group form-group-sm col-lg-4">
                            <label for="inputDirCli">Dirección</label>
                            <input type="text" class="form-control form-control-sm" id="inputDirCli" name="inputDirCli" placeholder="Dirección">
                        </div>
                        <div class="form-group form-group-sm col-lg-3">
                            <label for="inputPerCont">P. Contacto</label>
                            <input type="text" class="form-control form-control-sm" id="inputPerCont" name="inputPerCont" placeholder="Contacto">
                        </div>
                        <div class="form-group form-group-sm col-lg-3">
                            <label for="selectTipUs">Tipo Usuario</label>
                            <select class="form-control form-control-sm" id="selectTipUs" name="selectTipUs">

                            </select>
                        </div>
                    </div> 
                    <div class="row">
                        <div class="form-group mb-2 col-lg-2">
                            <button type="submit" class="btn btn-primary" id="btnGuardaCli" name="btnGuardaCli">GUARDAR</button> 
                        </div>
                        <div class="form-group mb-2 col-lg-2">
                            <button type="button" class="btn btn-dark" id="btnCancelarCli" name="btnCancelarCli">CANCELAR</button>                   
                        </div>
                    </div>

                </fieldset>
            </form>
        </div>
    </div>
</div>
