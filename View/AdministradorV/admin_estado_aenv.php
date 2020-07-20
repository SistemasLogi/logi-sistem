<div class="row" style="margin-top: 5px; background-color: rgba(254, 254, 254, 0.28);">
    <legend id="lbTitle">Estado Envio</legend>

    <div class="col-lg-5 order-md-2">
        <div class="alert alert-dismissible alert-light border-primary" style="border-radius: 0.5rem;">
            <form id="formEstadoAEnv">
                <fieldset>
                    <legend>Formulario Registro</legend>
                    <div class="form-group">
                        <label for="inpCodEstAEnv">Codigo</label>
                        <input type="text" class="form-control" id="inpCodEstAEnv" name="inpCodEstAEnv" placeholder="Cod." readonly>
                    </div>
                    <div class="form-group">
                        <label for="inpDescEstAEnv">Estado</label>
                        <input type="text" class="form-control" id="inpDescEstAEnv" name="inpDescEstAEnv" placeholder="Descripción">
                    </div>
                    <div class="form-group">
                        <button type="submit" class="btn btn-primary" id="btnGuardaEstAEnv" name="btnGuardaEstAEnv">Guardar</button>
                        <button type="button" class="btn btn-dark" id="btnCancelarEstAEnv" name="btnCancelarEstAEnv">Cancelar</button>                   
                    </div>
                </fieldset>
            </form>
        </div>
        <div id="mensajeAccion">

        </div>
    </div>
    <div class="col-lg-7">
        <div class="alert alert-dismissible alert-light border-primary" style="border-radius: 0.5rem;" id="tablaEstAEnv">

        </div> 
    </div>
</div>