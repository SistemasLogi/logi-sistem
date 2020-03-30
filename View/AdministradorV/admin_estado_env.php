<div class="alert alert-dismissible alert-success row" style="margin-top: 5px;">
    <legend id="lbTitle">Estado Envio</legend>
    <div class="col-lg-5" id="tablaEstEnv">

    </div> 
    <div class="col-lg-7">
        <div class="card border-primary">
            <div class="card-body">
                <div class="row">
                    <form class="form-inline col-lg-12" id="formEstadoEnv">
                        <div class="form-group mb-2 col-lg-3">
                            <label for="inpCodEstEnv" class="col-lg-4">Cod.</label>
                            <input type="text" class="form-control col-lg-8" id="inpCodEstEnv" name="inpCodEstEnv" placeholder="Cod." readonly>
                        </div>
                        <div class="form-group mb-2 col-lg-5">
                            <label for="inpDescEstEnv" class="col-lg-4">Estado Env.</label>
                            <input type="text" class="form-control col-lg-8" id="inpDescEstEnv" name="inpDescEstEnv" placeholder="Descripción">
                        </div>
                        <div class="form-group mb-2 col-lg-2">
                            <button type="submit" class="btn btn-primary" id="btnGuardaEstEnv" name="btnGuardaEstEnv">Guardar</button> 
                        </div>
                        <div class="form-group mb-2 col-lg-2">
                            <button type="button" class="btn btn-dark" id="btnCancelarEstEnv" name="btnGuardaEstEnv">Cancelar</button>                   
                        </div>
                    </form>
                </div>
            </div>
        </div>
        <div id="mensajeAccion">

        </div>
    </div>
</div>