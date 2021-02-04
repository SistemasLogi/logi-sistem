<?php

date_default_timezone_set('America/Bogota');
$fecha_hora = date("Y-m-d H:i:s");

if ($_POST) {

    require '../../../config.php';

    $product_dao = new Producto_DAO();
    $os_dao = new Orden_serv_DAO();
    $os_vo = new Orden_serv_VO();
    $env_dao = new Envio_DAO();
    $sucursal_dao = new Sucursales_DAO();
    $aenvio_dao = new AEnvio_DAO();
    $est_x_aenv_dao = new Est_x_aenv_DAO();

    $num_venta = $_POST["inpventa"];
    $num_sucursal = $_POST["inpsuc"];
    $observ_aenvio = $_POST["inpnovedad"];

    $datosJsonVenta = json_encode($product_dao->consultaProductos_x_venta_salTemp($num_venta)); //retorno datos de venta en sal_tem
    $datosJsonVentaDecod = json_decode($datosJsonVenta);

    $datosCliSuc = json_encode($sucursal_dao->consultaGeneral_suc_param($num_sucursal)); //retorno datos de cliente y sucursal
    $datosCliSucDecod = json_decode($datosCliSuc);

    $datosAenvio = json_encode($aenvio_dao->consulta_max_id_aenvio($num_venta)); //retorno datos de aenvio
    $datosAenvioDecod = json_decode($datosAenvio);

    $guia = $datosJsonVentaDecod[0]->t_sal_guia_num;
    $tipo_serv_recolec = $datosJsonVentaDecod[0]->t_sal_cod_serv;
    $tipo_envio_recolec = $datosJsonVentaDecod[0]->t_sal_cod_env;

    $td_cliente = $datosCliSucDecod[0]->cli_td_id;
    $num_doc_cliente = $datosCliSucDecod[0]->cli_num_doc;
    $direccion_suc = $datosCliSucDecod[0]->suc_direccion;
    $ciudad_suc = $datosCliSucDecod[0]->suc_ciudad;
    $telefono_suc = $datosCliSucDecod[0]->suc_telefono;
    $nombre_suc = $datosCliSucDecod[0]->suc_nombre;

    $id_aenvio = $datosAenvioDecod[0]->aen_id;
    $id_os_alist = $datosAenvioDecod[0]->os_id;


    if ($est_x_aenv_dao->insertarEstado_x_AEnvio_Venta(4, $fecha_hora, $observ_aenvio, $num_venta, $id_os_alist) == 1) {

        
        for ($i = 0; $i < count($datosJsonVentaDecod); $i++) {
            $product_dao->elimProdTemp($datosJsonVentaDecod[$i]->t_csc);
        }
        $existe = json_encode($product_dao->consulta_existente_temp_x_suc($num_sucursal));
        if (empty($existe)) {
            $es_x_serv_dao = new Est_x_serv_DAO();
            $es_x_serv_vo = new Est_x_serv_VO();

            $es_x_serv_vo->setOrden_id($id_os_alist);
            $es_x_serv_vo->setEstado_id(6);
            $es_x_serv_vo->setFecha_hora($fecha_hora);
            $es_x_serv_vo->setNovedad("");
            $es_x_serv_vo->setTd_mensajero(1);
            $es_x_serv_vo->setNum_doc_mensajero(9874123652);

            if ($es_x_serv_dao->insertar_est_x_os($es_x_serv_vo) != 1) {
                echo 'error al finalizar alistamiento'; //error al finalizar alistamiento
            }
        }
        echo 1; //correctamente ejeutado
    } else {
        echo 'error al actualizar estado a_envio a no procesado'; //error al actualizar estado a_envio a paking
    }
} else {
    header("location../");
}