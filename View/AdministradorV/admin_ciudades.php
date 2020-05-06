<div class="row" style="margin-top: 5px; background-color: rgba(254, 254, 254, 0.28);" id="panelCiudades">
    <legend id="lbTitle">Ciudades</legend>

    <div class="col-lg-5 order-md-2">
        <div class="alert alert-dismissible alert-light border-primary" style="border-radius: 0.5rem;">
            <form id="formCiudades">
                <fieldset>
                    <legend>Formulario Registro</legend>
                    <div class="form-group">
                        <label for="inpCodCiudad">Codigo</label>
                        <input type="text" class="form-control" id="inpCodCiudad" name="inpCodCiudad" placeholder="Cod." readonly>
                    </div>
                    <div class="form-group">
                        <label for="selectDepto">Departamento</label>
                        <select class="form-control" id="selectDepto" name="selectDepto">

                        </select>
                    </div>
                    <div class="form-group">
                        <label for="inpNomCiudad">Nombre Ciudad</label>
                        <input type="text" class="form-control" id="inpNomCiudad" name="inpNomCiudad" placeholder="Ciudad">
                    </div>
                    <div class="form-group">
                        <button type="submit" class="btn btn-primary" id="btnGuardaCiu" name="btnGuardaCiu">Guardar</button>
                        <button type="button" class="btn btn-dark" id="btnCancelarCiu" name="btnCancelarCiu">Cancelar</button>                   
                    </div>
                </fieldset>
            </form>
        </div>
        <div id="mensajeAccion">

        </div>
    </div>
    <div class="col-lg-7">
        <div class="alert alert-dismissible alert-light border-primary" style="border-radius: 0.5rem;"id="tablaCiudades">

        </div> 
    </div> 
</div>