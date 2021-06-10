<div class="row">
    <legend>ORDENES DE SERVICIO DE LOS ÚLTIMOS 30 DIAS</legend>
    <div class="col-lg-4">
        <div class="card border-success mb-3 enlace" id="cardRealizadas" elem="3" style="max-width: 20rem; border: 3px solid rgba(0, 0, 0, 0.125); border-radius: 0.3rem;">            
            <div class="card-header" style="background-color: #18d26e;"><b>REALIZADAS</b><span class="ion-document-text float-right" style="color: #fff; font-size: x-large"></span></div>
            <div class="card-body">                
                <h4 class="card-title" style="color: #02b74a;" id="cantServExitosos"></h4>
                <p class="card-text">Realizadas a satisfacción.</p>
            </div>
        </div>
        <div class="card border-danger mb-3 enlace" id="cardNovedad" elem="4" style="max-width: 20rem; border: 3px solid rgba(0, 0, 0, 0.125); border-radius: 0.3rem;">            
            <div class="card-header" style="background-color: #ff6b6b;"><b>CON NOVEDAD</b><span class="ion-document-text float-right" style="color: #fff; font-size: x-large"></span></div>
            <div class="card-body">                
                <h4 class="card-title" style="color: #ad0909;" id="cantServConNov"></h4>
                <p class="card-text">Presentan novedad.</p>
            </div>
        </div>
    </div>
    <div class="col-lg-4">
        <div class="card border-warning mb-3 enlace" id="cardProgramadas" elem="1" style="max-width: 20rem; border: 3px solid rgba(0, 0, 0, 0.125); border-radius: 0.3rem;">            
            <div class="card-header" style="background-color: #ffc968;"><b>SIN ASIGNAR VEHICULO</b><span class="ion-document-text float-right" style="color: #fff; font-size: x-large"></span></div>
            <div class="card-body">                
                <h4 class="card-title" style="color: #ce8300;" id="cantServProgram"></h4>
                <p class="card-text">Programadas para recolección.</p>
            </div>
        </div>
        <div class="card border-warning mb-3 enlace" id="cardPicking" elem="5" style="max-width: 20rem; border: 3px solid rgba(0, 0, 0, 0.125); border-radius: 0.3rem;">
            <div class="card-header"><b>EN PICKING</b><span class="ion-social-dropbox float-right" style="color: #ce8300; font-size: x-large"></span></div>
            <div class="card-body">
                <h4 class="card-title" style="color: #ce8300;" id="cantServPicking"></h4>
                <p class="card-text">En proceso de picking</p>
            </div>
        </div>
    </div>
    <div class="col-lg-4">
        <div class="card border-info mb-3 enlace" id="cardAsignadas" elem="2" style="max-width: 20rem; border: 3px solid rgba(0, 0, 0, 0.125); border-radius: 0.3rem;">            
            <div class="card-header" style="background-color: #3abef5;"><b>RECOLECCIÓN PENDIENTE</b><span class="ion-document-text float-right" style="color: #fff; font-size: x-large"></span></div>
            <div class="card-body">                
                <h4 class="card-title" style="color: #2c77ff;" id="cantServAsignados"></h4>
                <p class="card-text">Asignadas a vehiculo.</p>
            </div>
        </div>
        <div class="card border-success mb-3 enlace" id="cardPacking" elem="6" style="max-width: 20rem; border: 3px solid rgba(0, 0, 0, 0.125); border-radius: 0.3rem;">
            <div class="card-header"><b>EN PACKING</b><span class="ion-cube float-right" style="color: #009e3f; font-size: x-large"></span></div>
            <div class="card-body alert-success">
                <h4 class="card-title" style="color: #009e3f;" id="cantServPacking"></h4>
                <p class="card-text">En proceso de packing</p>
            </div>
        </div>
    </div>
    <div class="col-lg-12" id="sectionDatOS">

    </div>  
    <div class="toast show border-primary col-lg-12 mt-2" role="alert" aria-live="assertive" aria-atomic="true" style="max-width: 100%; border-radius: 0.5rem;">
        <div class="toast-header">
            <strong class="mr-auto">TABLA DIARIA DE ORDENES DE SERVICIO</strong>
        </div>
        <div class="toast-body">
            <div class="col-lg-12" id="tbInfoEstOS">

            </div>
        </div>
    </div>
</div>