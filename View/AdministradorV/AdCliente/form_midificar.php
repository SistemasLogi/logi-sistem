<form id="formClienteAct">
    <fieldset>                    
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
                <button type="submit" class="btn btn-warning" id="btnGuardaAct" name="btnGuardaAct">GUARDAR</button> 
            </div>
            <div class="form-group mb-2 col-lg-2">
                <button type="button" class="btn btn-dark" id="btnCancelarCli" name="btnCancelarCliAct">CANCELAR</button>                   
            </div>
        </div>
    </fieldset>
</form>