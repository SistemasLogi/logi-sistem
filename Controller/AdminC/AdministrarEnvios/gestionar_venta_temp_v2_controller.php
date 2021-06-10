<?php

date_default_timezone_set('America/Bogota');
$fecha_hora = date("Y-m-d H:i:s");

$fecha_hora_mas = strtotime('+1 minute', strtotime($fecha_hora));
$fecha_hora_increment = date('Y-m-d H:i:s', $fecha_hora_mas);

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

    $num_os_recol;

    if ($est_x_aenv_dao->insertarEstado_x_AEnvio_Venta(2, $fecha_hora, $observ_aenvio, $num_venta, $id_os_alist) == 1) {

        if ($product_dao->insertarSalidaProd($num_venta, $fecha_hora) == 1) {
            if ($tipo_serv_recolec == 1 || $tipo_serv_recolec == 2 || $tipo_serv_recolec == 3 || $tipo_serv_recolec == 4) {
                if ($est_x_aenv_dao->insertarEstado_x_AEnvio_Venta(3, $fecha_hora_increment, $observ_aenvio, $num_venta, $id_os_alist) == 1) {
                    $datos_os_recol = json_encode($os_dao->consulta_UltimaOS_x_ts_te($tipo_serv_recolec, $tipo_envio_recolec, $td_cliente, $num_doc_cliente));
                    if (!empty($datos_os_recol)) {
                        $datos_os_recolDecod = json_decode($datos_os_recol);
                        $num_os_recol = $datos_os_recolDecod[0]->os_id;

                        if ($env_dao->insertarEnvio_from_select($num_os_recol, $num_venta) == 1) {

                            $num_id_env_json = json_encode($env_dao->consulta_max_id_x_os($num_os_recol)); //retorna el id del envio creado
                            $num_id_env_dec = json_decode($num_id_env_json);
                            $num_id_env = $num_id_env_dec[0]->id_env;

                            $es_x_env_vo = new Estado_x_env_VO();
                            $es_x_env_dao = new Estado_x_env_DAO();

                            $es_x_env_vo->setEnvio_id($num_id_env);
                            $es_x_env_vo->setEst_env_id(2);
                            $es_x_env_vo->setFecha_hora($fecha_hora);
                            $es_x_env_vo->setNovedad("");
                            $es_x_env_vo->setTd_mensajero(1);
                            $es_x_env_vo->setNum_doc_men(963258741);

                            if ($es_x_env_dao->insertarEstado_x_envio_general($es_x_env_vo) == 1) {
                                //crea estado 2 en bodega origen)                            
                            } else {
                                //error al crear estado de envio
                                echo 'error al crear estado de envio en bodega origen 1';
                                exit();
                            }
                        } else {
                            
                        }
                    } else {
                        $ord_ser_vo = new Orden_serv_VO();
                        $ord_ser_vo->setCli_id($td_cliente);
                        $ord_ser_vo->setCli_docum($num_doc_cliente);
                        $ord_ser_vo->setCod_ciudad(1);
                        $ord_ser_vo->setDireccion($direccion_suc);
                        $ord_ser_vo->setPer_contacto($nombre_suc);
                        $ord_ser_vo->setTelefono($telefono_suc);
                        $ord_ser_vo->setTipo_serv_id($tipo_serv_recolec);
                        $ord_ser_vo->setTipo_env_id($tipo_envio_recolec);
                        $ord_ser_vo->getObservacion("");

                        if ($os_dao->insertarOrden_serv($ord_ser_vo) == 1) {
                            $datos_os_recol_creado = json_encode($os_dao->consulta_id_UltimaOS_x_cli($td_cliente, $num_doc_cliente, $tipo_serv_recolec));
                            if (!empty($datos_os_recol_creado)) {
                                $datos_os_recol_creadoDecod = json_decode($datos_os_recol_creado);
                                $num_os_recol = $datos_os_recol_creadoDecod[0]->num;
                                $os_dao->insertarOS_x_SUC($num_os_recol, $num_sucursal);

                                $es_x_serv_dao = new Est_x_serv_DAO();
                                $es_x_serv_vo = new Est_x_serv_VO();

                                $es_x_serv_vo->setOrden_id($num_os_recol);
                                $es_x_serv_vo->setEstado_id(1); //predefinido 1 programada           
                                $es_x_serv_vo->setFecha_hora($fecha_hora);
                                $es_x_serv_vo->setNovedad("");
                                $es_x_serv_vo->setTd_mensajero(1); //cc usuario global LOGI
                                $es_x_serv_vo->setNum_doc_mensajero(9874123652); //num predefinido usuario global LOGI
                                //realiza el traking de la os
                                $es_x_serv_dao->insertar_est_x_os($es_x_serv_vo);

                                $es_x_serv_vo->setEstado_id(2); //Asignado
                                $es_x_serv_dao->insertar_est_x_os($es_x_serv_vo);

                                $es_x_serv_vo->setEstado_id(3); //Realizado
                                $es_x_serv_dao->insertar_est_x_os($es_x_serv_vo);

                                if ($env_dao->insertarEnvio_from_select($num_os_recol, $num_venta) == 1) {

                                    $num_id_env_json = json_encode($env_dao->consulta_max_id_x_os($num_os_recol)); //retorna el id del envio creado
                                    $num_id_env_dec = json_decode($num_id_env_json);
                                    $num_id_env = $num_id_env_dec[0]->id_env;

                                    $es_x_env_vo = new Estado_x_env_VO();
                                    $es_x_env_dao = new Estado_x_env_DAO();

                                    $es_x_env_vo->setEnvio_id($num_id_env);
                                    $es_x_env_vo->setEst_env_id(2);
                                    $es_x_env_vo->setFecha_hora($fecha_hora);
                                    $es_x_env_vo->setNovedad("");
                                    $es_x_env_vo->setTd_mensajero(1);
                                    $es_x_env_vo->setNum_doc_men(963258741);

                                    if ($es_x_env_dao->insertarEstado_x_envio_general($es_x_env_vo) == 1) {
                                        //crea estado 2 en bodega origen)                            
                                    } else {
                                        //error al crear estado de envio
                                        echo 'error al crear estado de envio en bodega origen 2';
                                        exit();
                                    }
                                } else {
                                    
                                }
                            } else {
                                echo 'error, se creo orden de recolecion pero la consulta no deuele el id'; //error, se creo orden de recolecion pero la onsulta no deuele el id
                                exit();
                            }
                        } else {
                            echo 'error al obtener numero de os de recolecion'; //error al obtener numero de os de recolecion
                            exit();
                        }
                    }
                } else {
                    echo 'error al actualizar estado a_envio a entregado a operador'; //error al actualizar estado a_envio a entregado a operador
                    exit();
                }
            }
        } else {
            echo 'error al insertar en salida producto'; //error al insertar en salida producto
            exit();
        }
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
                exit();
            }
        }
        if ($product_dao->elimProdTempVent($num_venta) == 1) {
            echo 1; //orrectamente ejeutado 
//            $stock_dao = new Stock_DAO();
//            echo json_encode($stock_dao->consultaAlistaStock($fecha_hora, $num_sucursal));
        } else {
            echo 'error al eliminar datos en tabla temporal'; //error eliminar registros de tabla temp
        }
    } else {
        echo 'error al actualizar estado a_envio a packing'; //error al actualizar estado a_envio a paking
    }
} else {
    header("location../");
}