<div class="row" style="margin-top: 5px; background-color: rgba(254, 254, 254, 0.28);">
    <legend id="lbTitle">Tipo Servicio</legend>

    <div class="col-lg-5 order-md-2">
        <div class="alert alert-dismissible alert-secondary border-primary" style="border-radius: 0.5rem;">
            <form id="formTipoServ">
                <fieldset>
                    <legend>Formulario Registro</legend>
                    <div class="form-group">
                        <label for="inpCodTipoServ">Codigo</label>
                        <input type="text" class="form-control" id="inpCodTipoServ" name="inpCodTipoServ" placeholder="Cod." readonly>
                    </div>
                    <div class="form-group">
                        <label for="inpNomServ">Servicio</label>
                        <input type="text" class="form-control" id="inpNomServ" name="inpNomServ" placeholder="Servicio">
                    </div>
                    <div class="form-group">
                        <button type="submit" class="btn btn-primary" id="btnGuardaTipoServ" name="btnGuardaTipoServ">Guardar</button>
                        <button type="button" class="btn btn-dark" id="btnCancelarTipoServ" name="btnCancelarTipoServ">Cancelar</button>                   
                    </div>
                </fieldset>
            </form>
        </div>
        <div id="mensajeAccion">

        </div>
    </div>
    <div class="col-lg-7">
        <div class="alert alert-dismissible alert-light border-primary" style="border-radius: 0.5rem;" id="tablaTipoServ">

        </div> 
    </div> 
</div>