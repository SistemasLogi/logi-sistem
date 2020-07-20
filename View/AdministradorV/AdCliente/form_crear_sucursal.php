<form id="formCrearSuc">
    <fieldset>                    
        <div class="row">
            <div class="form-group form-group-sm col-lg-2">
                <label for="inputNumCliAc">N° de Cliente</label>
                <input type="text" class="form-control form-control-sm" id="inputNumCliAc" name="inputNumCliAc" readonly=""> 
            </div>
            <div class="form-group form-group-sm col-lg-6">
                <label for="inputNomSucursal">Nombre Sucursal</label>
                <input type="text" class="form-control form-control-sm" id="inputNomSucursal" name="inputNomSucursal" placeholder="Nombre Sucursal">
            </div>
            <div class="form-group form-group-sm col-lg-2" style="display: none;">
                <input type="text" class="form-control form-control-sm" id="selectTipDocAc" name="selectTipDocAc">
            </div>
            <div class="form-group form-group-sm col-lg-4">
                <label for="inputTelSuc">Teléfono</label>
                <input type="text" class="form-control form-control-sm" id="inputTelSuc" name="inputTelSuc" placeholder="N° Tel. Fijo">
            </div>
            <div class="form-group form-group-sm col-lg-5">
                <label for="inputDirSuc">Dirección</label>
                <input type="text" class="form-control form-control-sm" id="inputDirSuc" name="inputDirSuc" placeholder="Dirección">
            </div>
            <div class="form-group form-group-sm col-lg-3">
                <label for="selectCiudad">Ciudad</label>
                <select class="form-control form-control-sm" id="selectCiudad" name="selectCiudad">

                </select>
            </div>
            <div class="form-group form-group-sm col-lg-4">
                <label for="inputUsuarioSuc">Asignar Usuario</label>
                <input type="text" class="form-control form-control-sm" id="inputUsuarioSuc" name="inputUsuarioSuc" placeholder="Usuario">
            </div>
        </div>
        <div class="row">
            <div class="form-group mb-2 col-lg-2">
                <button type="submit" class="btn btn-success" id="btnGuardaSuc" name="btnGuardaSuc">GUARDAR</button> 
            </div>
            <div class="form-group mb-2 col-lg-2">
                <button type="button" class="btn btn-dark" id="btnCancelarSuc" name="btnCancelarSuc">CANCELAR</button>                   
            </div>
        </div>
    </fieldset>
</form>