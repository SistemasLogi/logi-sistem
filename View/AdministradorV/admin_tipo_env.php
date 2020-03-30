<div class="alert alert-dismissible alert-danger row" style="margin-top: 5px;">
    <legend id="lbTitle">Tipo Envio</legend>
    <div class="col-lg-5" id="tablaTipoEnv">

    </div> 
    <div class="col-lg-7">
        <div class="card border-primary">
            <div class="card-body">
                <div class="row">
                    <form class="form-inline col-lg-12" id="formTipoEnv">
                        <div class="form-group mb-2 col-lg-3">
                            <label for="inpCodTipoEnv" class="col-lg-4">Cod.</label>
                            <input type="text" class="form-control col-lg-8" id="inpCodTipoEnv" name="inpCodTipoEnv" placeholder="Cod." readonly>
                        </div>
                        <div class="form-group mb-2 col-lg-5">
                            <label for="inpNomEnv" class="col-lg-4">Tipo Envio</label>
                            <input type="text" class="form-control col-lg-8" id="inpNomEnv" name="inpNomEnv" placeholder="Tipo Envio">
                        </div>
                        <div class="form-group mb-2 col-lg-2">
                            <button type="submit" class="btn btn-primary" id="btnGuardaTipoEnv" name="btnGuardaTipoEnv">Guardar</button> 
                        </div>
                        <div class="form-group mb-2 col-lg-2">
                            <button type="button" class="btn btn-dark" id="btnCancelarTipoEnv" name="btnCancelarTipoEnv">Cancelar</button>                   
                        </div>
                    </form>
                </div>
            </div>
        </div>
        <div id="mensajeAccion">

        </div>
    </div>
</div>