<div class="row" style="margin-top: 5px; background-color: rgba(254, 254, 254, 0.28);">
    <legend id="lbTitle">Operadores</legend>

    <div class="col-lg-5 order-md-2">
        <div class="alert alert-dismissible alert-warning border-primary" style="border-radius: 0.5rem;">
            <form id="formOperador">
                <fieldset>
                    <legend>Formulario Registro</legend>
                    <div class="form-group">
                        <label for="inpCodOpera">Codigo</label>
                        <input type="text" class="form-control" id="inpCodOpera" name="inpCodOpera" placeholder="Cod." readonly>
                    </div>
                    <div class="form-group">
                        <label for="inpNomOpera">Operador</label>
                        <input type="text" class="form-control" id="inpNomOpera" name="inpNomOpera" placeholder="Operador">
                    </div>
                    <div class="form-group">
                        <button type="submit" class="btn btn-primary" id="btnGuardaOperador" name="btnGuardaOperador">Guardar</button>
                        <button type="button" class="btn btn-dark" id="btnCancelarOperador" name="btnCancelarOperador">Cancelar</button>                   
                    </div>
                </fieldset>
            </form>
        </div>
        <div id="mensajeAccion">

        </div>
    </div>
    <div class="col-lg-7">
        <div class="alert alert-dismissible alert-warning border-primary" style="border-radius: 0.5rem;" id="tablaOperadores">

        </div> 
    </div> 
</div>