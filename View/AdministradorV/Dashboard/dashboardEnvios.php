<div class="row">
    <legend>ENVIOS</legend>
    <div class="col-lg-3">
        <div class="card border-warning mb-3 enlace" id="cardPiking" elem="5" style="max-width: 20rem; border: 3px solid rgba(0, 0, 0, 0.125); border-radius: 0.3rem;">
            <div class="card-header" style="background-color: #fbd797; color: #7c550f;"><b>PROGRAMADOS</b><span class="ion-android-alarm-clock float-right" style="color: #7c550f; font-size: x-large"></span></div>
            <div class="card-body alert-warning">
                <h5 class="card-title" style="color: #ce8300;" id="cantServPiking">3</h5>
                <p class="card-text">Envios Programados</p>
            </div>
        </div>
        <div class="card border-danger mb-3 enlace" id="cardNovedad" elem="4" style="max-width: 20rem; border: 3px solid rgba(0, 0, 0, 0.125); border-radius: 0.3rem;">            
            <div class="card-header alert-danger"><b>GESTION FINALIZADA</b><span class="ion-alert-circled float-right" style="font-size: x-large"></span></div>
            <div class="card-body">                
                <h5 class="card-title" style="color: #ad0909;" id="cantServConNov">1</h5>
                <p class="card-text">En Bodega Origen.</p>
            </div>
        </div>
    </div>
    <div class="col-lg-3">
        <div class="card border-warning mb-3 enlace" id="cardRealizadas" elem="3" style="max-width: 20rem; border: 3px solid rgba(0, 0, 0, 0.125); border-radius: 0.3rem;">            
            <div class="card-header alert-warning"><b>BODEGA ORIGEN</b><span class="ion-ios-home float-right" style="font-size: x-large"></span></div>
            <div class="card-body">                
                <h5 class="card-title" style="color: #7c550f;" id="cantServExitosos">12</h5>
                <p class="card-text">En Bodega Origen</p>
            </div>
        </div>
        <div class="card border-info mb-3 enlace" id="cardAsignadas" elem="2" style="max-width: 20rem; border: 3px solid rgba(0, 0, 0, 0.125); border-radius: 0.3rem;">            
            <div class="card-header bg-info"><b class="text-light">SOLUCIÓN</b><span class="ion-alert-circled text-light float-right" style="font-size: x-large"></span></div>
            <div class="card-body alert-info">                
                <h5 class="card-title" style="color: #2c77ff;" id="cantServAsignados">2</h5>
                <p class="card-text">Novedades Solución.</p>
            </div>
        </div>
    </div>
    <div class="col-lg-3">
        <div class="card border-success mb-3 enlace" id="cardProgramadas" elem="1" style="max-width: 20rem; border: 3px solid rgba(0, 0, 0, 0.125); border-radius: 0.3rem;">            
            <div class="card-header alert-success"><b>REPARTO</b><span class="ion-android-bicycle float-right" style="font-size: x-large"></span></div>
            <div class="card-body">                
                <h5 class="card-title" style="color: #0a602c;" id="cantServProgram">32</h5>
                <p class="card-text">En Reparto</p>
            </div>
        </div>
        <div class="card border-info mb-3 enlace" id="cardPaking" elem="6" style="max-width: 20rem; border: 3px solid rgba(0, 0, 0, 0.125); border-radius: 0.3rem;">
            <div class="card-header"><b>VIAJANDO DESTINO</b><span class="ion-plane float-right" style="color: #2c77ff; font-size: x-large"></span></div>
            <div class="card-body">
                <h5 class="card-title" style="color: #2c77ff;" id="cantServPaking">2</h5>
                <p class="card-text">Viajando a Destino</p>
            </div>
        </div>
    </div>
    <div class="col-lg-3">        
        <div class="card border-warning mb-3 enlace" id="cardRealizadas" elem="3" style="max-width: 20rem; border: 3px solid rgba(0, 0, 0, 0.125); border-radius: 0.3rem;">            
            <div class="card-header bg-warning"><b class="text-light">NOVEDAD</b><span class="ion-alert-circled text-light float-right" style="font-size: x-large"></span></div>
            <div class="card-body">                
                <h5 class="card-title" style="color: #ce8300;" id="cantServExitosos">6</h5>
                <p class="card-text">Envios con Novedad</p>
            </div>
        </div>
        <div class="card border-warning mb-3 enlace" id="cardPiking" elem="5" style="max-width: 20rem; border: 3px solid rgba(0, 0, 0, 0.125); border-radius: 0.3rem;">
            <div class="card-header"><b>BODEGA DESTINO</b><span class="ion-social-dropbox float-right" style="color: #ce8300; font-size: x-large"></span></div>
            <div class="card-body">
                <h5 class="card-title" style="color: #ce8300;" id="cantServPiking">0</h5>
                <p class="card-text">En Bodega Destino</p>
            </div>
        </div>
    </div>
    <div class="toast show border-primary col-lg-12" role="alert" aria-live="assertive" aria-atomic="true" style="max-width: 100%; border-radius: 0.5rem;">
        <div class="toast-header">
            <strong class="mr-auto">TABLA DIARIA DE ORDENES DE SERVICIO</strong>

        </div>
        <div class="toast-body">
            <div class="col-lg-12" id="tbInfoEstOS">

            </div>
        </div>
    </div>
</div>