<div class="toast show border-warning col-lg-12" role="alert" aria-live="assertive" aria-atomic="true" style="max-width: 100%; border-radius: 0.5rem;">
    <div class="toast-header">
        <strong class="mr-auto">SEGUIMIENTO ALISTAMIENTO</strong>

    </div>

    <div class="toast-body row">        
        <div class="alert alert-dismissible alert-warning col-lg-12" style="border-radius: 0.5rem;">
            <form class="form-inline my-2 my-lg-0 form-group-sm" id="formBuscarEnvioAlist" name="formBuscarEnvioAlist">                                    
                <b>Buscar N° Venta :</b>
                <input class="form-control form-control-sm mr-sm-2" type="number" id="inpBuscaNumVenta" name="inpBuscaNumVenta" placeholder="Buscar N° Venta">
                <button type="submit" class="btn btn-outline-warning btn-sm" id="btnBuscaEnv" name="btnBuscaEnv">BUSCAR</button>    
            </form>
            <h4>Venta N° <em id="etqNumEnvAlist"></em></h4>
            <div class="row">
                <div class="alert alert-dismissible alert-primary col-lg-7">
                    <h5><b>DATOS VENTA</b></h5>
                    <p class="mb-0"><strong>OPERADOR: </strong><em id="nom_remite"></em></p>
                    <p class="mb-0"><strong>GUIA OP: </strong><em id="dir_remite"></em></p>
                    <p class="mb-0"><strong>ITEMS: </strong><em id="ciudad_remite"></em></p>
                    <table class="table table-hover">
                        <thead>
                            <tr>
                                <th scope="col">Type</th>
                                <th scope="col">Column heading</th>
                                <th scope="col">Column heading</th>
                                <th scope="col">Column heading</th>
                            </tr>
                        </thead>
                        <tbody>                           
                            <tr class="table-warning">
                                <th scope="row">Warning</th>
                                <td>Column content</td>
                                <td>Column content</td>
                                <td>Column content</td>
                            </tr>                            
                            <tr class="table-warning">
                                <th scope="row">Warning</th>
                                <td>Column content</td>
                                <td>Column content</td>
                                <td>Column content</td>
                            </tr>                            
                        </tbody>
                    </table> 
                </div>
                <div class="alert alert-dismissible alert-primary col-lg-5">
                    <h5><b>CLIENTE</b></h5>
                    <img src="img/sucursales/1.png" alt=""/>
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