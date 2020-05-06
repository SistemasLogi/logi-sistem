<div class="row" style="margin-top: 5px; background-color: rgba(254, 254, 254, 0.28);">
    <legend id="lbTitle">Estado Servicio</legend>

    <div class="col-lg-5 order-md-2">
        <div class="alert alert-dismissible alert-light border-primary" style="border-radius: 0.5rem;">
            <form id="formEstadoServ">
                <fieldset>
                    <legend>Formulario Registro</legend>
                    <div class="form-group">
                        <label for="inpCodEstServ">Codigo</label>
                        <input type="text" class="form-control" id="inpCodEstServ" name="inpCodEstServ" placeholder="Cod." readonly>
                    </div>
                    <div class="form-group">
                        <label for="inpDescEstServ">Estado</label>
                        <input type="text" class="form-control" id="inpDescEstServ" name="inpDescEstServ" placeholder="Descripción">
                    </div>
                    <div class="form-group">
                        <button type="submit" class="btn btn-primary" id="btnGuardaEstServ" name="btnGuardaEstServ">Guardar</button>
                        <button type="button" class="btn btn-dark" id="btnCancelarEstServ" name="btnCancelarEstServ">Cancelar</button>                   
                    </div>
                </fieldset>
            </form>
        </div>
        <div id="mensajeAccion">

        </div>
    </div>
    <div class="col-lg-7">
        <div class="alert alert-dismissible alert-light border-primary" style="border-radius: 0.5rem;" id="tablaEstServ">

        </div> 
    </div>
</div>