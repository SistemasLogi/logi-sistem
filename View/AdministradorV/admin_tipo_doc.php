<div class="alert alert-dismissible alert-primary row" style="margin-top: 5px;">
    <legend id="lbTitle">Tipo Documento</legend>
    <div class="col-lg-5" id="tablaTipoDoc">

    </div> 
    <div class="col-lg-7">
        <div class="card border-primary">
            <div class="card-body">
                <div class="row">
                    <form class="form-inline col-lg-12" id="formTipoDoc">
                        <div class="form-group mb-2 col-lg-3">
                            <label for="inpCodTipoDoc" class="col-lg-4">Cod.</label>
                            <input type="text" class="form-control col-lg-8" id="inpCodTipoDoc" name="inpCodTipoDoc" placeholder="Cod." readonly>
                        </div>
                        <div class="form-group mb-2 col-lg-3">
                            <label for="inpSiglaTipoDoc" class="col-lg-4">Sigla</label>
                            <input type="text" class="form-control col-lg-8" id="inpSiglaTipoDoc" name="inpSiglaTipoDoc" placeholder="Descripción">
                        </div>
                        <div class="form-group mb-2 col-lg-6">
                            <label for="inpDescTipoDoc" class="col-lg-4">Tipo</label>
                            <input type="text" class="form-control col-lg-8" id="inpDescTipoDoc" name="inpDescTipoDoc" placeholder="Descripción">
                        </div>
                        <div class="form-group mb-2 col-lg-2">
                            <button type="submit" class="btn btn-primary" id="btnGuardaTipoDoc" name="btnGuardaTipoDoc">Guardar</button> 
                        </div>
                        <div class="form-group mb-2 col-lg-2">
                            <button type="button" class="btn btn-dark" id="btnCancelarTipoDoc" name="btnCancelarTipoDoc">Cancelar</button>                   
                        </div>
                    </form>
                </div>
            </div>
        </div>
        <div id="mensajeAccion">

        </div>
    </div>
</div>