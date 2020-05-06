<div class="row" style="margin-top: 5px; background-color: rgba(254, 254, 254, 0.28);">
    <legend id="lbTitle">Tipo Envio</legend>

    <div class="col-lg-5 order-md-2">
        <div class="alert alert-dismissible alert-light border-primary" style="border-radius: 0.5rem;">
            <form id="formTipoEnv">
                <fieldset>
                    <legend>Formulario Registro</legend>
                    <div class="form-group">
                        <label for="inpCodTipoEnv">Codigo</label>
                        <input type="text" class="form-control" id="inpCodTipoEnv" name="inpCodTipoEnv" placeholder="Cod." readonly>
                    </div>
                    <div class="form-group">
                        <label for="inpNomEnv">Tipo Envio</label>
                        <input type="text" class="form-control" id="inpNomEnv" name="inpNomEnv" placeholder="Tipo Envio">
                    </div>
                    <div class="form-group">
                        <button type="submit" class="btn btn-primary" id="btnGuardaTipoEnv" name="btnGuardaTipoEnv">Guardar</button>
                        <button type="button" class="btn btn-dark" id="btnCancelarTipoEnv" name="btnCancelarTipoEnv">Cancelar</button>                   
                    </div>
                </fieldset>
            </form>
        </div>
        <div id="mensajeAccion">

        </div>
    </div>
    <div class="col-lg-7">
        <div class="alert alert-dismissible alert-light border-primary" style="border-radius: 0.5rem;" id="tablaTipoEnv">

        </div> 
    </div> 
</div>