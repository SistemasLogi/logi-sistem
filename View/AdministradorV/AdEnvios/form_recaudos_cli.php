<div class="toast show border-primary col-lg-12 mt-2" role="alert" aria-live="assertive" aria-atomic="true" style="max-width: 100%; border-radius: 0.5rem;">
    <div class="toast-header"><strong class="mr-auto"><h5 id="labelNomMens"></h5></strong></div>
    <div class="card-body"> 
        <div class="alert alert-warning border-primary" style="border-radius: 0.5rem;">
            <form  id="formFechRecaudCli">
                <div class="form-row">
                    <div class="form-group col-md-6">
                        <b>Cliente :</b>
                        <select class="form-control form-control-sm mr-sm-2" id="selectCliente" name="selectCliente">

                        </select>
                    </div>
                    <div class="form-group col-md-6">
                        <b>Sucursal :</b>
                        <select class="form-control form-control-sm mr-sm-2" id="selectSuc_x_Cli" name="selectSuc_x_Cli">

                        </select>
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group col-md-6">
                        <b>Fecha Desde :</b>
                        <input type="date" class="form-control form-control-sm" id="InputFecIni" name="InputFecIni">
                    </div>
                    <div class="form-group col-md-6">
                        <b>Fecha Hasta :</b>
                        <input type="date" class="form-control form-control-sm" id="InputFecFin" name="InputFecFin">
                    </div>
                </div>
                <button type="submit" class="btn btn-outline-primary btn-sm" id="btnBusEnvFecRec" name="btnBusEnvFecRec">BUSCAR</button>
            </form>
            <p class="text-primary"><b>NOTA: </b>Si no se selecciona una sucursal la consulta retorna el total de todas las sucusales para un cliente</p>
        </div>
        <div id="datosRecaudo">

        </div>
        <div id="datosMenif">

        </div>
    </div>
</div>