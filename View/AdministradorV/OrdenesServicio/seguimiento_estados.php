<div class="toast show border-primary col-lg-12" role="alert" aria-live="assertive" aria-atomic="true" style="max-width: 100%; border-radius: 0.5rem;">
    <div class="toast-header">
        <strong class="mr-auto">ORDEN DE SERVICIO</strong>

    </div>

    <div class="toast-body row">        
        <div class="alert alert-dismissible alert-secondary col-lg-12" style="border-radius: 0.5rem;">
            <form class="form-inline my-2 my-lg-0 form-group-sm" id="formBuscarOS" name="formBuscarOS">                                    
                <b>Buscar N° Orden :</b>
                <input class="form-control form-control-sm mr-sm-2" type="number" id="inpBuscaNumOS" name="inpBuscaNumOS" placeholder="Buscar N°">
                <button type="submit" class="btn btn-outline-primary btn-sm" id="btnBuscaOS" name="btnBuscaOS">BUSCAR</button>    
            </form>
            <div class="row">
                <div class="alert alert-dismissible alert-warning col-lg-6">
                    <h4 class="alert-heading">Orden de Servicio N° <b id="os_num_prog"></b></h4>
                    <p class="mb-0"><strong>PROGRAMADA: </strong><em id="fec_program"></em></p>
                    <p class="mb-0"><strong>DIRECCIÓN: </strong><em id="dir_prog"></em></p>
                    <p class="mb-0"><strong>CIUDAD: </strong><em id="ciudad_prog"></em></p>
                    <p class="mb-0"><strong>OBSERVACIONES: </strong><em id="novedad_prog"></em></p>
                </div>
                <div class="alert alert-dismissible alert-success col-lg-6" id="blqFinalizado">
                    <h4 class="alert-heading">Orden de Servicio N° <b id="os_num_fin"></b></h4>
                    <p class="mb-0"><strong>FINALIZADA: </strong><em id="fec_finaliza"></em></p>
                    <p class="mb-0"><strong>DIRECCIÓN: </strong><em id="dir_fin"></em></p>
                    <p class="mb-0"><strong>CIUDAD: </strong><em id="ciudad_fin"></em></p>
                    <p class="mb-0"><strong>OBSERVACIONES: </strong><em id="novedad_fin"></em></p> 
                </div>
            </div>
            <table class="table table-hover">
                <thead>
                    <tr id="titleProcess">

                    </tr>
                </thead>
                <tbody>
                    <tr class="table-sm">
                        <td id="fec_prog"></td>
                        <td class="text-center" id="fec_asig"></td>
                        <td class="text-right" id="fec_fin"></td>
                    </tr>
                    <tr class="table-sm">
                        <td id="nameCli">Cliente</td>
                        <td class="text-center" id="men_asig"></td>
                        <td class="text-right" id="men_fin"></td>
                    </tr>
                    <tr>
                        <td colspan="3">
                            <div class="progress" style="height:20px; border-radius: 0.7rem;">
                                <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" id="progress_bar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style="width: 1%"></div>
                            </div>
                        </td>
                    </tr>
                    <tr class="table-secondary" id="icon_x_proceso">

                    </tr>                    
                </tbody>
            </table>


            <div class="row" id="contAux">

            </div>

        </div>
    </div>

</div>