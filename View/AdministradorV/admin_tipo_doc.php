<div class="row" style="margin-top: 5px; background-color: rgba(254, 254, 254, 0.28);">
    <legend id="lbTitle">Tipo Documento</legend>

    <div class="col-lg-5 order-md-2">
        <div class="alert alert-dismissible alert-light border-primary" style="border-radius: 0.5rem;">
            <form id="formTipoDoc">
                <fieldset>
                    <legend>Formulario Registro</legend>
                    <div class="form-group">
                        <label for="inpCodTipoDoc">Codigo</label>
                        <input type="text" class="form-control" id="inpCodTipoDoc" name="inpCodTipoDoc" placeholder="Cod." readonly>
                    </div>
                    <div class="form-group">
                        <label for="inpSiglaTipoDoc">Sigla</label>
                        <input type="text" class="form-control" id="inpSiglaTipoDoc" name="inpSiglaTipoDoc" placeholder="Sigla">
                    </div>
                    <div class="form-group">
                        <label for="inpDescTipoDoc">Descripción</label>
                        <input type="text" class="form-control" id="inpDescTipoDoc" name="inpDescTipoDoc" placeholder="Descripción">
                    </div>
                    <div class="form-group">
                        <button type="submit" class="btn btn-primary" id="btnGuardaTipoDoc" name="btnGuardaTipoDoc">Guardar</button>
                        <button type="button" class="btn btn-dark" id="btnCancelarTipoDoc" name="btnCancelarTipoDoc">Cancelar</button>                   
                    </div>
                </fieldset>
            </form>
        </div>
        <div id="mensajeAccion">

        </div>
    </div>
    <div class="col-lg-7">
        <div class="alert alert-dismissible alert-light border-primary" style="border-radius: 0.5rem;" id="tablaTipoDoc">

        </div> 
    </div> 
</div>