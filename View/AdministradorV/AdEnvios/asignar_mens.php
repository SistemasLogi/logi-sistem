<div class="toast show border-primary col-lg-12" role="alert" aria-live="assertive" aria-atomic="true" style="max-width: 100%; border-radius: 0.5rem;">
    <div class="toast-header">
        <strong class="mr-auto">ASIGNACIÓN ENVIOS</strong>
    </div>    
    <div class="alert alert-dismissible alert-light row">
        <div class="alert alert-dismissible alert-primary col-lg-6">
            <form class="form-inline my-2 my-lg-0 form-group-sm" id="formBuscarMensajero" name="formBuscarMensajero">                                    
                <b>Mensajero :</b>
                <select class="form-control form-control-sm mr-sm-2 col-6" id="selectMensajero">

                </select>
                <button type="button" class="btn btn-outline-primary btn-sm" id="btnSelectMens" name="btnSelectMens">BUSCAR</button>    
            </form>
            <div class="mt-3">
                <ol class="breadcrumb" style="border-radius: 0.5rem;">
                    <li class="breadcrumb-item"><a class="enlace" id="enlTabNoAsig">POR ASIGNAR</a></li>
                    <li class="breadcrumb-item"><a class="enlace" id="enlTabAsig">ASIGNADOS</a></li>
                </ol>   
            </div>            
            <div class="mt-5" id="tab_envios">

            </div>
            <div class="mt-5" id="tabla_listos_asig">
                <div class="text-lg-center">

                    <div class="table-responsive text-nowrap">
                        <table class="table table-striped table-sm table-bordered" id="tabEnvNoAsig">
                            <thead>
                                <tr style="background-color: #efa31d">
                                    <th scope="col"></th>
                                    <th scope="col">GUIA LOGI</th>
                                    <th scope="col">GUIA OP</th>
                                    <th scope="col">OS</th>
                                    <th scope="col">DIR. DESTINO</th>
                                    <th scope="col">CIUDAD</th>
                                </tr>
                            </thead>
                            <tbody id="bodyTab">


                            </tbody>
                        </table>
                    </div>
                    <div class="mt-3">
                        <button type="button" class="btn btn-success float-left" id="btnAddEnviosMens">Asignar Envios +</button> 
                    </div>

                </div>
            </div>

        </div>
        <div class="alert alert-dismissible alert-warning col-lg-6" id="blqFinalizado">
            <h4>TABLA DE ENVIOS PROGRAMADOS</h4>
            <!--            <div class="form-group form-inline">
                            <div class="custom-control custom-radio">
                                <input type="radio" id="customRadio1" name="customRadio" class="custom-control-input" checked="">
                                <label class="custom-control-label" for="customRadio1">Guia Logi&nbsp;&nbsp;&nbsp;</label>
                            </div>
                            <div class="custom-control custom-radio">
                                <input type="radio" id="customRadio2" name="customRadio" class="custom-control-input">
                                <label class="custom-control-label" for="customRadio2">Otro Op</label>
                            </div>
                        </div>-->
            <!--            <form class="form-inline my-2 my-lg-0 form-group-sm" id="formBuscarGuiaRef" name="formBuscarGuiaRef">
                            <b id="numGuiaRef">Guia :</b>
                            <input class="form-control form-control-sm mr-sm-2" type="number" id="inpBuscaGuiaRef" name="inpBuscaGuiaRef" placeholder="Guia N°">
                            <button type="submit" class="btn btn-outline-primary btn-sm" id="btnBuscaGuiaRef" name="btnBuscaGuiaRef">BUSCAR</button>    
                        </form>-->
            <div class="mt-5" id="tab_envios_prog">
                <div class="text-lg-center">
                    <img src="img/animaciones/loader.gif" alt=""/>
                </div>
            </div>
        </div>
    </div>
</div>