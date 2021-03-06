<div class="row">
    <legend>CANTIDAD DE ENVIOS ALISTAMIENTO SEGUN ESTADO <e id="lbSuc"></e></legend>
    <div class="col-12">
        <form id="formCliSuc">
            <div class="form-row align-items-center">
                <div class="col-sm-3 my-1" id="blqSucur">
                    <label class="mr-sm-2" for="selectSuc_x_Cli">Sucursal</label>
                    <select class="form-control form-control-sm" id="selectSuc_Cli">

                    </select>
                </div>
                <div class="col-auto my-1 mt-4">
                    <button type="button" class="btn btn-primary" id="btnVer">VER</button>
                </div>
            </div>
        </form>
    </div>
    <div class="col-lg-3">
        <div class="card border-warning mb-3 enlace est_env_als" id="card-picking" estals="1" style="max-width: 20rem; border: 3px solid rgba(0, 0, 0, 0.125); border-radius: 0.3rem;">
            <div class="card-header bg-warning"><b class="text-light">PICKING</b><span class="ion-social-dropbox text-light float-right" style="font-size: x-large"></span></div>
            <div class="card-body alert-warning">
                <h5 class="card-title" style="color: #ce8300;" id="cantEnvPicking"></h5>
                <p class="card-text">Envios en Picking</p>
            </div>
        </div>        
    </div>
    <div class="col-lg-3">
        <div class="card border-info mb-3 enlace est_env_als" id="cardSolucion" estals="2" style="max-width: 20rem; border: 3px solid rgba(0, 0, 0, 0.125); border-radius: 0.3rem;">            
            <div class="card-header bg-info"><b class="text-light">PACKING</b><span class="ion-cube text-light float-right" style="font-size: x-large"></span></div>
            <div class="card-body alert-info">                
                <h5 class="card-title" style="color: #2c77ff;" id="cantEnvPacking"></h5>
                <p class="card-text">Envios en Packing</p>
            </div>
        </div>        
    </div>
    <div class="col-lg-3">
        <div class="card border-success mb-3 enlace est_env_als" id="cardEntregOp" estals="3" style="max-width: 20rem; border: 3px solid rgba(0, 0, 0, 0.125); border-radius: 0.3rem;">            
            <div class="card-header bg-success"><b class="text-light">ENTREGADOS OP</b><span class="ion-checkmark-circled text-light float-right" style="font-size: x-large"></span></div>
            <div class="card-body alert-success">                
                <span class="ion-android-search" style="font-size: large"></span>
                <p class="card-text">Click para buscar.</p>
            </div>
        </div>        
    </div>
    <div class="col-lg-3">   
        <div class="card border-danger mb-3 enlace est_env_als" id="cardNoProcess" estals="4" style="max-width: 20rem; border: 3px solid rgba(0, 0, 0, 0.125); border-radius: 0.3rem;">            
            <div class="card-header bg-danger"><b class="text-light">NO PROCESADAS</b><span class="ion-alert-circled text-light float-right" style="font-size: x-large"></span></div>
            <div class="card-body alert-danger">                
                <span class="ion-android-search text-danger" style="font-size: large"></span>
                <p class="card-text">Click para buscar.</p>
            </div>
        </div>        
    </div>
    <div class="col-lg-12" id="tab_est_alist">

    </div>

</div>