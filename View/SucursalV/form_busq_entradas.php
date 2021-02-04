<div class="toast show border-primary col-lg-12" role="alert" aria-live="assertive" aria-atomic="true" style="max-width: 100%; border-radius: 0.5rem;">
    <div class="toast-header">
        <strong class="mr-auto">BUSCAR ENTRADAS</strong>
    </div>
    <div class="toast-body row">        
        <div class="alert alert-dismissible alert-warning col-lg-12" style="border-radius: 0.5rem;">              
            <div class="row">
                <div class="alert alert-dismissible alert-primary col-lg-5">
                    <form class="form-inline my-2 my-lg-0 form-group-sm" id="formBuscarDetalle" name="formBuscarDetalle">                                    
                        <b>Detalle :</b>
                        <input class="form-control form-control-sm mr-sm-2" type="text" id="inpBuscaDet" name="inpBuscaDet" placeholder="Detalle">
                        <button type="submit" class="btn btn-outline-primary btn-sm" id="btnBuscaDet" name="btnBuscaDet">BUSCAR</button>    
                    </form>
                </div>
                <div class="alert alert-dismissible alert-secondary col-lg-7" id="blqFinalizado">
                    <form class="form-inline my-2 my-lg-0 form-group-sm" id="formBuscarFechaEnt" name="formBuscarFechaEnt">                                    
                        <b>Rango Fechas :</b>
                        <input class="form-control form-control-sm mr-sm-2" type="date" id="inpFechaInicio" name="inpFechaInicio">
                        <input class="form-control form-control-sm mr-sm-2" type="date" id="inpFechaFin" name="inpFechaFin">
                        <button type="submit" class="btn btn-outline-primary btn-sm" id="btnBuscaFechEnt" name="btnBuscaFechEnt">BUSCAR</button>    
                    </form>
                </div>
            </div>
            <div class="row" id="tabla_Ent_Suc">

            </div>

        </div>
    </div>

</div>