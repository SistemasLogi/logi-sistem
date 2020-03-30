<div class="alert alert-dismissible alert-warning row" style="margin-top: 5px;">
    <legend id="lbTitle">Ciudades</legend>
    <div class="col-lg-5" id="tablaCiudades">

    </div> 
    <div class="col-lg-7">
        <div class="card border-primary">
            <div class="card-body">
                <div class="row">
                    <form class="form-inline col-lg-12" id="formCiudades">
                        <div class="form-group mb-2 col-lg-3">
                            <label for="inpCodCiudad" class="col-lg-4">Cod.</label>
                            <input type="text" class="form-control col-lg-8" id="inpCodCiudad" name="inpCodCiudad" placeholder="Cod." readonly>
                        </div>
                        <div class="form-group mb-2 col-lg-4">
                            <label for="selectDepto" class="col-lg-4">Depto</label>
                            <select class="form-control col-lg-8" id="selectDepto" name="selectDepto">

                            </select>
                        </div>
                        <div class="form-group mb-2 col-lg-5">
                            <label for="inpNomCiudad" class="col-lg-4">Ciudad</label>
                            <input type="text" class="form-control col-lg-8" id="inpNomCiudad" name="inpNomCiudad" placeholder="Ciudad">
                        </div>
                        <div class="form-group mb-2 col-lg-2">
                            <button type="submit" class="btn btn-primary" id="btnGuardaCiu" name="btnGuardaCiu">Guardar</button> 
                        </div>
                        <div class="form-group mb-2 col-lg-2">
                            <button type="button" class="btn btn-dark" id="btnCancelarCiu" name="btnCancelarCiu">Cancelar</button>                   
                        </div>
                    </form>
                </div>
            </div>
        </div>
        <div id="mensajeAccion">

        </div>
    </div>
</div>