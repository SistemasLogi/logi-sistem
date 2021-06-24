<div class="toast show border-warning col-lg-12" role="alert" aria-live="assertive" aria-atomic="true" style="max-width: 100%; border-radius: 0.5rem;">
    <div class="toast-header">
        <strong class="mr-auto">REPORTE DE ROTACIÓN INVENTARIO</strong>
    </div>
    <div class="toast-body row">        
        <div class="alert alert-dismissible alert-info col-lg-12" style="border-radius: 0.5rem;">              
            <div class="row">
                <div class="alert alert-dismissible alert-secondary col-lg-12">
                    <form class="form-inline my-2 my-lg-0 form-group-sm" id="formRotacionInv" name="formRotacionInv">                                    
                        <b>Rango Fechas :</b>
                        <input class="form-control form-control-sm mr-sm-2" type="date" id="inpFechaIni" name="inpFechaIni">
                        <input class="form-control form-control-sm mr-sm-2" type="date" id="inpFechaFin" name="inpFechaFin">
                        <button type="submit" class="btn btn-outline-primary btn-sm" id="btnRangoFechas" name="btnRangoFechas">VER</button> 
                        <div id="mensaje"></div>
                    </form>
                </div>
            </div>
            <div class="row" id="tabla_rot_inv_suc">

            </div>

        </div>
    </div>

</div>