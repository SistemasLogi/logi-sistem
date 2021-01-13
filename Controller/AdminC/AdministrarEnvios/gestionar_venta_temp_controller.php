<?php

session_start();
date_default_timezone_set('America/Bogota');
$fecha_hora = date("Y-m-d H:i:s");

if ($_POST) {

    require '../../../config.php';

    $product_dao = new Producto_DAO();
    $os_dao = new Orden_serv_DAO();
    $os_vo = new Orden_serv_VO();
    $env_dao = new Envio_DAO();

    $num_venta = $_POST["venta"];

    $datos_pro_venta = json_encode($product_dao->consultaProductos_x_venta_salTemp($num_venta));
    $dat_decode_pro_vent = json_decode($datos_pro_venta);

    $cod_servicio = $dat_decode_pro_vent[0]->t_sal_cod_serv;

    if (!empty($cod_servicio)) {
        if ($cod_servicio == 1) {
            
        }
    } else {
        
    }


    //Verifica si existe una os de LOGI YA de tipo (1)
    if ($dat_decode_pro_vent[0]->t_sal_cod_serv == 1) {
        if (isset($_SESSION['os_logi_ya'])) {
            //insertar productos en tabla de salidas
            if ($product_dao->insertarSalidaProd($num_venta) == 1) {



                if ($env_dao->insertarEnvio_from_select($_SESSION['os_logi_ya'], $num_venta) == 1) {
                    //crea el envio para carga a mensajero

                    $num_id_env_json = json_encode($env_dao->consulta_max_id_x_os($_SESSION['os_logi_ya'])); //retorna el id del envio creado

                    $num_id_env_dec = json_decode($num_id_env_json);

                    $num_id_env = $num_id_env_dec[0]->id_env;

                    $obsrv = "";

                    $es_x_env_vo = new Estado_x_env_VO();
                    $es_x_env_dao = new Estado_x_env_DAO();

                    $es_x_env_vo->setEnvio_id($num_id_env);
                    $es_x_env_vo->setEst_env_id(2);
                    $es_x_env_vo->setFecha_hora($fecha_hora);
                    $es_x_env_vo->setNovedad($obsrv);
                    $es_x_env_vo->setTd_mensajero(1);
                    $es_x_env_vo->setNum_doc_men(162534495867);

                    if ($es_x_env_dao->insertarEstado_x_envio_general($es_x_env_vo) == 1) {
                        //crea estado 2 en bodega origen){
                        echo 1; //si existe una os cargada en la variable de sesion de servicio LOGI YA
                    } else {
                        //error al crear estado de envio
                        echo 'error al crear estado de envio';
                    }
                } else {
                    //error al crear envio en tabla envio
                    echo 'error al crear envio en tabla envio';
                }
            } else {
                //error al insertar producto en tabla salidas
                echo 'error al insertar producto en tabla salidas os LOGI YA creada';
            }
        } else {
            //Si NO existe una os cargada en la variable de sesion LOGI YA
            //insertar productos en tabla de salidas
            if ($product_dao->insertarSalidaProd($num_venta) == 1) {

                $os_vo->setCli_id($_SESSION["td_cli_adm_alst"]);
                $os_vo->setCli_docum($_SESSION["num_doc_cli_adm_alst"]);
                $os_vo->setCod_ciudad(1); //predeterminado Bogota
                $os_vo->setDireccion($_SESSION["direccion_adm_alst"]);
                $os_vo->setPer_contacto("");
                $os_vo->setTelefono($_SESSION["tel_adm_alst"]);
                $os_vo->setTipo_serv_id($dat_decode_pro_vent[0]->t_sal_cod_serv);
                $os_vo->setTipo_env_id($dat_decode_pro_vent[0]->t_sal_cod_env);
                $os_vo->setObservacion("");

                if ($os_dao->insertarOrden_serv($os_vo) == 1) {

                    $es_x_serv_dao = new Est_x_serv_DAO();
                    $es_x_serv_vo = new Est_x_serv_VO();

                    //Consulta la os ingresada para servicio 1 LOGI YA
                    $json_num_os = json_encode($os_dao->consulta_id_UltimaOS_x_cli($_SESSION["td_cli_adm_alst"], $_SESSION["num_doc_cli_adm_alst"], $dat_decode_pro_vent[0]->t_sal_cod_serv));

                    if (!empty($json_num_os)) {
                        $num_os_decode = json_decode($json_num_os);
                        $_SESSION['os_logi_ya'] = $num_os_decode[0]->num;

                        $es_x_serv_vo->setOrden_id($_SESSION['os_logi_ya']);
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


                        $env_dao = new Envio_DAO();

                        $env_dao->insertarEnvio_from_select($_SESSION['os_logi_ya'], $num_venta); //crea el envio para carga a mensajero

                        $num_id_env_json = json_encode($env_dao->consulta_max_id_x_os($_SESSION['os_logi_ya'])); //retorna el id del envio creado

                        $num_id_env_dec = json_decode($num_id_env_json);

                        $num_id_env = $num_id_env_dec[0]->id_env;

                        $obsrv = "";

                        $es_x_env_vo = new Estado_x_env_VO();
                        $es_x_env_dao = new Estado_x_env_DAO();

                        $es_x_env_vo->setEnvio_id($num_id_env);
                        $es_x_env_vo->setEst_env_id(2);
                        $es_x_env_vo->setFecha_hora($fecha_hora);
                        $es_x_env_vo->setNovedad($obsrv);
                        $es_x_env_vo->setTd_mensajero(1);
                        $es_x_env_vo->setNum_doc_men(9874123652);

                        $es_x_env_dao->insertarEstado_x_envio_general($es_x_env_vo); //crea estado 2 en bodega origen

                        echo 1; //si existe una os cargada en la variable de sesion de servicio LOGI YA
                    } else {
                        //error si la consulta de ultima os devuelve vacia
                        echo 'error, la consulta de os LogiYA esta vacia';
                    }
                } else {
                    //error al crear os LOGI YA
                    echo 'error al crear os LOGI YA';
                }
            } else {
                //error al insertar producto en tabla salidas
                echo 'error al insertar producto en tabla salidas os LOGI YA NO creada';
            }
        }
        //************************************************************* *//
        //Verifica si existe una os de tipo NORMAL (2)  
    } elseif ($dat_decode_pro_vent[0]->t_sal_cod_serv == 2) {
        if (isset($_SESSION['os_normal'])) {
            //insertar productos en tabla de salidas
            if ($product_dao->insertarSalidaProd($num_venta) == 1) {

                $env_dao = new Envio_DAO();

                if ($env_dao->insertarEnvio_from_select($_SESSION['os_normal'], $num_venta) == 1) {
                    //crea el envio para carga a mensajero

                    $num_id_env_json = json_encode($env_dao->consulta_max_id_x_os($_SESSION['os_normal'])); //retorna el id del envio creado

                    $num_id_env_dec = json_decode($num_id_env_json);

                    $num_id_env = $num_id_env_dec[0]->id_env;

                    $obsrv = "";

                    $es_x_env_vo = new Estado_x_env_VO();
                    $es_x_env_dao = new Estado_x_env_DAO();

                    $es_x_env_vo->setEnvio_id($num_id_env);
                    $es_x_env_vo->setEst_env_id(2);
                    $es_x_env_vo->setFecha_hora($fecha_hora);
                    $es_x_env_vo->setNovedad($obsrv);
                    $es_x_env_vo->setTd_mensajero(1);
                    $es_x_env_vo->setNum_doc_men(9874123652);

                    if ($es_x_env_dao->insertarEstado_x_envio_general($es_x_env_vo) == 1) {
                        //crea estado 2 en bodega origen){
                        echo 2; //si existe una os cargada en la variable de sesion de servicio NORMAL
                    } else {
                        //error al crear estado de envio
                        echo 'error al crear estado de envio general';
                    }
                } else {
                    //error al crear envio en tabla envio
                    echo 'error al crear envio en tabla envio';
                }
            } else {
                //error al insertar producto en tabla salidas
                echo 'error al insertar producto en tabla salidas os NORMAL creada';
            }
        } else {
            //Si NO existe una os cargada en la variable de sesion os NORMAL
            //insertar productos en tabla de salidas
            if ($product_dao->insertarSalidaProd($num_venta) == 1) {

                $os_vo->setCli_id($_SESSION["td_cli_adm_alst"]);
                $os_vo->setCli_docum($_SESSION["num_doc_cli_adm_alst"]);
                $os_vo->setCod_ciudad(1); //predeterminado Bogota
                $os_vo->setDireccion($_SESSION["direccion_adm_alst"]);
                $os_vo->setPer_contacto("");
                $os_vo->setTelefono($_SESSION["tel_adm_alst"]);
                $os_vo->setTipo_serv_id($dat_decode_pro_vent[0]->t_sal_cod_serv);
                $os_vo->setTipo_env_id($dat_decode_pro_vent[0]->t_sal_cod_env);
                $os_vo->setObservacion("");

                if ($os_dao->insertarOrden_serv($os_vo) == 1) {

                    $es_x_serv_dao = new Est_x_serv_DAO();
                    $es_x_serv_vo = new Est_x_serv_VO();

                    //Consulta la os ingresada para servicio 2 NORMAL
                    $json_num_os = json_encode($os_dao->consulta_id_UltimaOS_x_cli($_SESSION["td_cli_adm_alst"], $_SESSION["num_doc_cli_adm_alst"], $dat_decode_pro_vent[0]->t_sal_cod_serv));

                    if (!empty($json_num_os)) {
                        $num_os_decode = json_decode($json_num_os);
                        $_SESSION['os_normal'] = $num_os_decode[0]->num;

                        $es_x_serv_vo->setOrden_id($_SESSION['os_normal']);
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


                        $env_dao = new Envio_DAO();

                        $env_dao->insertarEnvio_from_select($_SESSION['os_normal'], $num_venta); //crea el envio para carga a mensajero

                        $num_id_env_json = json_encode($env_dao->consulta_max_id_x_os($_SESSION['os_normal'])); //retorna el id del envio creado

                        $num_id_env_dec = json_decode($num_id_env_json);

                        $num_id_env = $num_id_env_dec[0]->id_env;

                        $obsrv = "";

                        $es_x_env_vo = new Estado_x_env_VO();
                        $es_x_env_dao = new Estado_x_env_DAO();

                        $es_x_env_vo->setEnvio_id($num_id_env);
                        $es_x_env_vo->setEst_env_id(2);
                        $es_x_env_vo->setFecha_hora($fecha_hora);
                        $es_x_env_vo->setNovedad($obsrv);
                        $es_x_env_vo->setTd_mensajero(1);
                        $es_x_env_vo->setNum_doc_men(9874123652);

                        $es_x_env_dao->insertarEstado_x_envio_general($es_x_env_vo); //crea estado 2 en bodega origen

                        echo 2; //si existe una os cargada en la variable de sesion de servicio NORMAL
                    } else {
                        //error si la consulta de ultima os devuelve vacia
                        echo 'error, la consulta de os Normal esta vacia';
                    }
                } else {
                    //error al crear os NORMAL
                    echo 'error al crear os NORMAL';
                }
            } else {
                //error al insertar producto en tabla salidas
                echo 'error al insertar producto en tabla salidas os NORMAL creada';
            }
        }
    } else {
        //insertar productos en tabla de salidas
        if ($product_dao->insertarSalidaProd($num_venta) == 1) {
            echo 3;
        } else {
            //error al registrar salida de producto en tabla salidas
            echo 'error al registrar salida de producto en tabla salidas sin reparto';
        }
    }
} else {
    header("location../");
}