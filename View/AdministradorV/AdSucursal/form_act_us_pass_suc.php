<form id="formUsSuc">
    <div class="form-row">
        <legend>Usuario Sucursal</legend>
        <div class="form-group col-md-6">
            <label for="inpNumeroSuc">Numero Suc</label>
            <input type="text" class="form-control form-control-sm" id="inpNumeroSuc" name="inpNumeroSuc" placeholder="Numero Suc" readonly>
        </div>
        <div class="form-group col-md-6">
            <label for="inpNombreSuc">Nombre</label>
            <input type="text" class="form-control form-control-sm" id="inpNombreSuc" name="inpNombreSuc" placeholder="Nombre Suc" readonly>
        </div>
        <div class="form-group col-md-6">
            <label for="inpUsuarioSuc">Usuario</label>
            <input type="text" class="form-control form-control-sm" id="inpUsuarioSuc" name="inpUsuarioSuc" placeholder="Usuario">
        </div>
        <div class="form-group col-md-6">
            <label for="inpPassSuc">Password</label>
            <div class="input-group input-group-sm mb-3" id="show-pass">
                <div class="input-group-prepend">
                    <span class="ion-eye-disabled enlace input-group-text" id="inputGroup-sizing-sm" style="font-size: large;"></span>
                </div>
                <input type="password" class="form-control form-control-sm" id="inpPassSuc" name="inpPassSuc" placeholder="Password">
            </div>
        </div>
        <div class="form-group">
            <button type="submit" class="btn btn-light border-info" id="btnActuUsuSuc" name="btnActuUsuSuc">Actualizar</button>
            <button type="button" class="btn btn-light border-dark" id="btnCancelUsuSuc" name="btnCancelUsuSuc">Cancelar</button>                   
        </div>
    </div>
</form>