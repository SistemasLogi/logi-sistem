<?php

session_start();
if ($_POST) {
    require '../../../config.php';
    $product_dao = new Producto_DAO();
    if (isset($_SESSION["adminlogi"])) {
        
        $items_temp = json_encode($product_dao->consultaProd_x_venta_sal_temp($_POST["numVentAlist"]));
        if(!empty($items_temp)){
            echo $items_temp;
        }  else {
            echo json_encode($product_dao->consultaProd_x_venta_sal($_POST["numVentAlist"]));
        }
    } elseif (isset($_SESSION["cliente_a"])) {
//        echo json_encode($est_x_alist_env_dao->consultaSeguimientoEstadoOS($_POST["inpBuscaNumOS"] . " AND o.cli_td_id = " . $_SESSION["tipo_doc"] . " AND o.cli_num_doc = " . $_SESSION["numero_doc"] . ""));
    }
} else {
    header("location../");
}