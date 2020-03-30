<div class="alert alert-dismissible alert-primary row" style="margin-top: 5px;">
    <legend id="lbTitle">Estado Servicio</legend>
    <div class="col-lg-5" id="tablaEstServ">

    </div> 
    <div class="col-lg-7">
        <div class="card border-primary">
            <div class="card-body">
                <div class="row">
                    <form class="form-inline col-lg-12" id="formEstadoServ">
                        <div class="form-group mb-2 col-lg-3">
                            <label for="inpCodEstServ" class="col-lg-4">Cod.</label>
                            <input type="text" class="form-control col-lg-8" id="inpCodEstServ" name="inpCodEstServ" placeholder="Cod." readonly>
                        </div>
                        <div class="form-group mb-2 col-lg-5">
                            <label for="inpDescEstServ" class="col-lg-4">Estado</label>
                            <input type="text" class="form-control col-lg-8" id="inpDescEstServ" name="inpDescEstServ" placeholder="Descripción">
                        </div>
                        <div class="form-group mb-2 col-lg-2">
                            <button type="submit" class="btn btn-primary" id="btnGuardaEstServ" name="btnGuardaEstServ">Guardar</button> 
                        </div>
                        <div class="form-group mb-2 col-lg-2">
                            <button type="button" class="btn btn-dark" id="btnCancelarEstServ" name="btnCancelarEstServ">Cancelar</button>                   
                        </div>
                    </form>
                </div>
            </div>
        </div>
        <div id="mensajeAccion">

        </div>
    </div>
</div>