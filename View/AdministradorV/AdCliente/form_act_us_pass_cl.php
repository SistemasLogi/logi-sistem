<form id="formUsCli">
    <div class="form-row">
        <legend>Usuario Cliente</legend>
        <input type="text" class="form-control form-control-sm" id="inpTipoDoc" name="inpTipoDoc" style="display: none;" readonly>
        <div class="form-group col-md-6">
            <label for="inpNumero">Numero</label>
            <input type="text" class="form-control form-control-sm" id="inpNumero" name="inpNumero" placeholder="Numero" readonly>
        </div>
        <div class="form-group col-md-6">
            <label for="inpNombre">Nombre</label>
            <input type="text" class="form-control form-control-sm" id="inpNombre" name="inpNombre" placeholder="Nombre" readonly>
        </div>
        <div class="form-group col-md-6">
            <label for="inpUsuario">Usuario</label>
            <input type="text" class="form-control form-control-sm" id="inpUsuario" name="inpUsuario" placeholder="Usuario">
        </div>
        <div class="form-group col-md-6">
            <label for="inpPass">Password</label>
            <div class="input-group input-group-sm mb-3" id="show-pass">
                <div class="input-group-prepend">
                    <span class="ion-eye-disabled enlace input-group-text" id="inputGroup-sizing-sm" style="font-size: large;"></span>
                </div>
                <input type="password" class="form-control form-control-sm" id="inpPass" name="inpPass" placeholder="Password">
            </div>
        </div>
        <div class="form-group">
            <button type="submit" class="btn btn-light border-danger" id="btnActuUsuCli" name="btnActuUsuCli">Actualizar</button>
            <button type="button" class="btn btn-light border-dark" id="btnCancelUsuCli" name="btnCancelUsuCli">Cancelar</button>                   
        </div>
    </div>
</form>