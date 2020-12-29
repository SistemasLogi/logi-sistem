<div class="row">
    <legend>ENVIOS <e id="lbCli"></e><e id="lbSuc"></e></legend>
    <div class="col-12">
        <form>
            <div class="form-row align-items-center">
                <div class="col-sm-3 my-1">
                    <label class="mr-sm-2" for="selectCliente">Cliente</label>
                    <select class="form-control form-control-sm" id="selectCliente">

                    </select>
                </div> 
                <div class="col-auto my-1 mt-4">
                    <div class="custom-control custom-checkbox mr-sm-2">
                        <input type="checkbox" class="custom-control-input" id="checkSucur">
                        <label class="custom-control-label" for="checkSucur">Seleccionar Sucursal</label>
                    </div>
                </div>
                <div class="col-sm-3 my-1" id="blqSucur" style="display: none;">
                    <label class="mr-sm-2" for="selectSuc_x_Cli">Sucursal</label>
                    <select class="form-control form-control-sm" id="selectSuc_x_Cli">
                        
                    </select>
                </div>
                <div class="col-auto my-1 mt-4">
                    <button type="button" class="btn btn-primary" id="btnVer">VER</button>
                </div>
            </div>
        </form>
    </div>
    <div class="col-lg-3">
        <div class="card border-warning mb-3 enlace est_envio" id="cardProgram" elem="1" style="max-width: 20rem; border: 3px solid rgba(0, 0, 0, 0.125); border-radius: 0.3rem;">
            <div class="card-header" style="background-color: #fbd797; color: #7c550f;"><b>PROGRAMADOS</b><span class="ion-android-alarm-clock float-right" style="color: #7c550f; font-size: x-large"></span></div>
            <div class="card-body alert-warning">
                <h5 class="card-title" style="color: #ce8300;" id="cantEnvProgram"></h5>
                <p class="card-text">Envios Programados</p>
            </div>
        </div>
        <div class="card border-danger mb-3 enlace est_envio" id="cardGestFin" elem="9" style="max-width: 20rem; border: 3px solid rgba(0, 0, 0, 0.125); border-radius: 0.3rem;">            
            <div class="card-header alert-danger"><b>GESTION FINALIZADA</b><span class="ion-alert-circled float-right" style="font-size: x-large"></span></div>
            <div class="card-body">                
                <h5 class="card-title" style="color: #ad0909;" id="cantEnvGestFin"></h5>
                <p class="card-text">En Bodega Origen.</p>
            </div>
        </div>
    </div>
    <div class="col-lg-3">
        <div class="card border-warning mb-3 enlace est_envio" id="cardBodegaOr" elem="2" style="max-width: 20rem; border: 3px solid rgba(0, 0, 0, 0.125); border-radius: 0.3rem;">            
            <div class="card-header alert-warning"><b>BODEGA ORIGEN</b><span class="ion-ios-home float-right" style="font-size: x-large"></span></div>
            <div class="card-body">                
                <h5 class="card-title" style="color: #7c550f;" id="cantEnvBodegaOr"></h5>
                <p class="card-text">En Bodega Origen</p>
            </div>
        </div>
        <div class="card border-info mb-3 enlace est_envio" id="cardSolucion" elem="10" style="max-width: 20rem; border: 3px solid rgba(0, 0, 0, 0.125); border-radius: 0.3rem;">            
            <div class="card-header bg-info"><b class="text-light">SOLUCIÓN</b><span class="ion-alert-circled text-light float-right" style="font-size: x-large"></span></div>
            <div class="card-body alert-info">                
                <h5 class="card-title" style="color: #2c77ff;" id="cantEnvSolucion"></h5>
                <p class="card-text">Novedades Solución.</p>
            </div>
        </div>
    </div>
    <div class="col-lg-3">
        <div class="card border-success mb-3 enlace est_envio" id="cardReparto" elem="5" style="max-width: 20rem; border: 3px solid rgba(0, 0, 0, 0.125); border-radius: 0.3rem;">            
            <div class="card-header alert-success"><b>REPARTO</b><span class="ion-android-bicycle float-right" style="font-size: x-large"></span></div>
            <div class="card-body">                
                <h5 class="card-title" style="color: #0a602c;" id="cantEnvReparto"></h5>
                <p class="card-text">En Reparto</p>
            </div>
        </div>
        <div class="card border-info mb-3 enlace est_envio" id="cardViajDest" elem="3" style="max-width: 20rem; border: 3px solid rgba(0, 0, 0, 0.125); border-radius: 0.3rem;">
            <div class="card-header"><b>VIAJANDO DESTINO</b><span class="ion-plane float-right" style="color: #2c77ff; font-size: x-large"></span></div>
            <div class="card-body">
                <h5 class="card-title" style="color: #2c77ff;" id="cantEnvViajDest"></h5>
                <p class="card-text">Viajando a Destino</p>
            </div>
        </div>
    </div>
    <div class="col-lg-3">        
        <div class="card border-warning mb-3 enlace est_envio" id="cardNovedades" elem="8" style="max-width: 20rem; border: 3px solid rgba(0, 0, 0, 0.125); border-radius: 0.3rem;">            
            <div class="card-header bg-warning"><b class="text-light">NOVEDAD</b><span class="ion-alert-circled text-light float-right" style="font-size: x-large"></span></div>
            <div class="card-body">                
                <h5 class="card-title" style="color: #ce8300;" id="cantEnvNovedades"></h5>
                <p class="card-text">Envios con Novedad</p>
            </div>
        </div>
        <div class="card border-warning mb-3 enlace est_envio" id="cardBodegaDest" elem="4" style="max-width: 20rem; border: 3px solid rgba(0, 0, 0, 0.125); border-radius: 0.3rem;">
            <div class="card-header"><b>BODEGA DESTINO</b><span class="ion-social-dropbox float-right" style="color: #ce8300; font-size: x-large"></span></div>
            <div class="card-body">
                <h5 class="card-title" style="color: #ce8300;" id="cantEnvBodegaDest"></h5>
                <p class="card-text">En Bodega Destino</p>
            </div>
        </div>
    </div>
    <div class="col-lg-12" id="tab_est_env">

    </div>

</div>