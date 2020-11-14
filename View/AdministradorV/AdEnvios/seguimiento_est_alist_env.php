<div class="toast show border-warning col-lg-12" role="alert" aria-live="assertive" aria-atomic="true" style="max-width: 100%; border-radius: 0.5rem;">
    <div class="toast-header">
        <strong class="mr-auto">SEGUIMIENTO ALISTAMIENTO</strong>

    </div>

    <div class="toast-body row">        
        <div class="alert alert-dismissible alert-warning col-lg-12" style="border-radius: 0.5rem;">
            <div class="row">
                <div class="col-lg-6">
                    <form class="form-inline my-2 my-lg-0 form-group-sm" id="formBuscarEnvioAlist" name="formBuscarEnvioAlist">                                    
                        <b>Buscar N° Venta :</b>
                        <input class="form-control form-control-sm mr-sm-2" type="number" id="inpBuscaNumVenta" name="inpBuscaNumVenta" placeholder="Buscar N° Venta">
                        <button type="submit" class="btn btn-outline-warning btn-sm" id="btnBuscaEnvAlst" name="btnBuscaEnvAlst">BUSCAR</button>    
                    </form> 
                </div>
                <div class="col-lg-6">
                    <form class="form-inline my-2 my-lg-0 form-group-sm" id="formBuscarEnvioAlistGuiaOp" name="formBuscarEnvioAlistGuiaOp">                                    
                        <b>Buscar Guia OP :</b>
                        <input class="form-control form-control-sm mr-sm-2" type="number" id="inpBuscaAlistGuiaOp" name="inpBuscaAlistGuiaOp" placeholder="Guia OP">
                        <button type="submit" class="btn btn-outline-dark btn-sm" id="btnBuscaEnvAlstGuiaOp" name="btnBuscaEnvAlstGuiaOp">BUSCAR</button>    
                    </form> 
                </div>
            </div>
            <div class="row mt-2">
                <div class="alert alert-dismissible alert-primary col-lg-8">
                    <p class="mb-0"><strong>VENTA N°: </strong><em id="etqNumVentAlist"></em></p>
                    <p class="mb-0"><strong>OPERADOR: </strong><em id="nom_oper"></em></p>
                    <p class="mb-0"><strong>GUIA OP: </strong><em id="guia_op"></em></p>
                    <div id="tablItemsAlist">

                    </div>                    
                </div>
                <div class="alert alert-dismissible alert-primary col-lg-4">
                    <h5><b>CLIENTE</b></h5>
                    <div id="imgSucLogo">

                    </div>
                </div>
            </div>
            <div class="col-lg-12 table-responsive">  
                <table class="table table-hover text-center col-lg-12" id="tableSegEnv">
                    <thead>
                        <tr class="table-sm" id="titleEncaTab">

                        </tr>
                    </thead>
                    <tbody>
                        <tr class="table-sm" id="fechEst">

                        </tr>
                        <tr class="table-sm" id="horaEst">

                        </tr>
                        <tr>
                            <td id="fila_bar" colspan="">
                                <div class="progress" style="height:20px; border-radius: 0.7rem;">
                                    <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" id="progress_bar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style="width: 1%"></div>
                                </div>
                            </td>
                        </tr>
                        <tr class="table-secondary table-sm" id="icon_x_est_env">                       

                        </tr>
                        <tr class="table-sm" id="descEst">

                        </tr>
                    </tbody>
                </table>
            </div>


            <div class="row" id="contAux">

            </div>

        </div>
    </div>

</div>