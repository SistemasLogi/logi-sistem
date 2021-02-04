<?php session_start(); ?>
<div class="toast show border-primary col-lg-12" role="alert" aria-live="assertive" aria-atomic="true" style="max-width: 100%; border-radius: 0.5rem;">
    <div class="toast-header">
        <strong class="mr-auto">INFORME DE INVENTARIO</strong>
    </div>
    <div class="toast-body">
        <div class="row mt-2">
<!--            <div class="alert alert-dismissible alert-primary col-lg-6">
                
            </div>-->
            <div class="alert alert-dismissible alert-primary col-lg-12">
                <h5><b>CLIENTE</b></h5>
                <div id="imgSucLogo">
                    <img src="img/sucursales/<?php echo $_SESSION["numero_suc"]; ?>.png" alt=""/>
                </div>
            </div>
        </div>
        <div id="contenidoInvent">

        </div>
    </div>
</div>