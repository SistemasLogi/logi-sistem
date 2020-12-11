<div class="toast show border-primary col-lg-12 mt-2" role="alert" aria-live="assertive" aria-atomic="true" style="max-width: 100%; border-radius: 0.5rem;">
    <div class="toast-header"><strong class="mr-auto"><h5 id="labelNomMens"></h5></strong></div>
    <div class="card-body" id="tabEnvDia"> 
        <div class="alert alert-info border-primary" style="border-radius: 0.5rem;">
            <form class="form-inline" id="formFechManif">
                <div class="input-group mb-2 mr-sm-2 mb-sm-0 col-lg-4">
                    <b>Mensajero :</b>
                    <select class="form-control form-control-sm mr-sm-2" id="selectMensajero" name="selectMensajero">

                    </select>
                </div>
                <div class="input-group mb-2 mr-sm-2 mb-sm-0">
                    <b>Desde :</b>
                    <input type="date" class="form-control form-control-sm" id="InputFecIni" name="InputFecIni">
                </div>
                <div class="input-group mb-2 mr-sm-2 mb-sm-0">
                    <b>Hasta :</b>
                    <input type="date" class="form-control form-control-sm" id="InputFecFin" name="InputFecFin">
                </div>
                <button type="submit" class="btn btn-outline-primary btn-sm" id="btnBusEnvFec" name="btnBusEnvFec">BUSCAR</button>
            </form>
        </div>
        <div id="datosRecaudo">

        </div>
        <div id="datosMenif">

        </div>
    </div>
</div>