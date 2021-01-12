<form id="formUsEmp">
    <div class="form-row">
        <legend>Usuario Empleado</legend>
        <input type="text" class="form-control form-control-sm" id="inpTipoDocEmp" name="inpTipoDocEmp" style="display: none;" readonly>
        <div class="form-group col-md-6">
            <label for="inpNumeroEmp">Numero</label>
            <input type="text" class="form-control form-control-sm" id="inpNumeroEmp" name="inpNumeroEmp" placeholder="Numero" readonly>
        </div>
        <div class="form-group col-md-6">
            <label for="inpNombreEmp">Nombre</label>
            <input type="text" class="form-control form-control-sm" id="inpNombreEmp" name="inpNombreEmp" placeholder="Nombre Empleado" readonly>
        </div>
        <div class="form-group col-md-6">
            <label for="inpUsuarioEmp">Usuario</label>
            <input type="text" class="form-control form-control-sm" id="inpUsuarioEmp" name="inpUsuarioEmp" placeholder="Usuario">
        </div>
        <div class="form-group col-md-6">
            <label for="inpPassEmp">Password</label>
            <div class="input-group input-group-sm mb-3" id="show-pass">
                <div class="input-group-prepend">
                    <span class="ion-eye-disabled enlace input-group-text" id="inputGroup-sizing-sm" style="font-size: large;"></span>
                </div>
                <input type="password" class="form-control form-control-sm" id="inpPassEmp" name="inpPassEmp" placeholder="Password">
            </div>
        </div>
        <div class="form-group">
            <button type="submit" class="btn btn-light border-success" id="btnActuUsuEmp" name="btnActuUsuEmp">Actualizar</button>
            <button type="button" class="btn btn-light border-dark" id="btnCancelUsuEmp" name="btnCancelUsuEmp">Cancelar</button>                   
        </div>
    </div>
</form>