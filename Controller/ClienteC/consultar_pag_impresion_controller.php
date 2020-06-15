<?php

session_start();
require '../../config.php';
if ($_POST) {

    $os_numero = $_POST["inputNumOS"];
    $pag_inicio = $_POST["inputHojaDesde"];
    $inicio_array = $pag_inicio - 1;
    $pag_fin = $_POST["inputHojaHasta"];

    $envio_dao = new Envio_DAO();
    $env_ing = json_encode($envio_dao->consultaEnvIng_x_os($os_numero, $_SESSION["tipo_doc"], $_SESSION["numero_doc"], 9));
    $array = json_decode($env_ing);
    
    $totalGuias = count($array);

    if($pag_fin > $totalGuias){
        $pag_fin = $totalGuias;
    }else{
        
    }
    
    require './generar_guias_pdf_controller.php';
    echo "<div class='alert alert-dismissible alert-success'>"
    . "<a href='Files/GuiasPDF_temp/" . $_SESSION["numero_doc"] . "_" . $_SESSION["tipo_doc"] . "/" . $_SESSION["numero_doc"] . ".pdf' class='alert-link' target='_blank'>Click AQUI para descargar</a>."
    . "</div>";
} else {
    header("location../");
}