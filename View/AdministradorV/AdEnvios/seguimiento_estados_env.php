<div class="toast show border-primary col-lg-12" role="alert" aria-live="assertive" aria-atomic="true" style="max-width: 100%; border-radius: 0.5rem;">
    <div class="toast-header">
        <strong class="mr-auto">SEGUIMIENTO ENVIO</strong>

    </div>

    <div class="toast-body row">        
        <div class="alert alert-dismissible alert-secondary col-lg-12" style="border-radius: 0.5rem;">
            <form class="form-inline my-2 my-lg-0 form-group-sm" id="formBuscarEnvio" name="formBuscarEnvio">                                    
                <b>Buscar N° Envio :</b>
                <input class="form-control form-control-sm mr-sm-2" type="number" id="inpBuscaNumEnv" name="inpBuscaNumEnv" placeholder="Buscar N°">
                <button type="submit" class="btn btn-outline-primary btn-sm" id="btnBuscaEnv" name="btnBuscaEnv">BUSCAR</button>    
            </form>
            <h4>Envio N° <em id="etqNumEnv"></em></h4>
            <div class="row">
                <div class="alert alert-dismissible alert-warning col-lg-6">
                    <h5><b>REMITE</b></h5>
                    <p class="mb-0"><strong>NOMBRE: </strong><em id="nom_remite"></em></p>
                    <p class="mb-0"><strong>DIRECCIÓN: </strong><em id="dir_remite"></em></p>
                    <p class="mb-0"><strong>CIUDAD: </strong><em id="ciudad_remite"></em></p>
                    <p class="mb-0"><strong>TEL: </strong><em id="tel_remite"></em></p>
                </div>
                <div class="alert alert-dismissible alert-primary col-lg-6">
                    <h5><b>DESTINO</b></h5>
                    <p class="mb-0"><strong>NOMBRE: </strong><em id="nom_destino"></em></p>
                    <p class="mb-0"><strong>DIRECCIÓN: </strong><em id="dir_destino"></em></p>
                    <p class="mb-0"><strong>CIUDAD: </strong><em id="ciudad_destino"></em></p>
                    <p class="mb-0"><strong>TEL: </strong><em id="tel_destino"></em></p> 
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