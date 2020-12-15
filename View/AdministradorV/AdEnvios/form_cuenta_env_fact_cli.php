<div class="toast show border-primary col-lg-12 mt-2" role="alert" aria-live="assertive" aria-atomic="true" style="max-width: 100%; border-radius: 0.5rem;">
    <div class="toast-header"><strong class="mr-auto"><h5 id="labelNomMens"></h5></strong></div>
    <div class="card-body"> 
        <div class="alert alert-primary border-primary" style="border-radius: 0.5rem;">
            <form  id="formFechConteoEnvCliFact">
                <div class="form-row">
                    <div class="form-group col-md-4">
                        <b>Cliente :</b>
                        <select class="form-control form-control-sm mr-sm-2" id="selectCliente" name="selectCliente">

                        </select>
                    </div>
                    <div class="form-group col-md-3">
                        <b>Fecha Desde :</b>
                        <input type="date" class="form-control form-control-sm" id="InputFecIni" name="InputFecIni">
                    </div>
                    <div class="form-group col-md-3">
                        <b>Fecha Hasta :</b>
                        <input type="date" class="form-control form-control-sm" id="InputFecFin" name="InputFecFin">
                    </div>
                    <div class="form-group col-md-2 mt-4">
                        <button type="submit" class="btn btn-outline-primary btn-sm" id="btnBusEnvFecFact" name="btnBusEnvFecFact">BUSCAR</button>
                    </div>
                </div>
            </form>
        </div>
        <div id="datosEnvFact">

        </div>
    </div>
</div>