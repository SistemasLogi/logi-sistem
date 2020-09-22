<?php

session_start();
if ($_POST) {
    require '../../../config.php';

    date_default_timezone_set('America/Bogota');
    $fecha_hora = date("Y-m-d H:i:s");

    $product_dao = new Producto_DAO();
    $os_dao = new Orden_serv_DAO();
    $os_vo = new Orden_serv_VO();

    $num_venta = $_POST["venta"];

    $datos_pro_venta = json_encode($product_dao->consultaProductos_x_venta_salTemp($num_venta));
    $dat_decode_pro_vent = json_decode($datos_pro_venta);


    //Verifica si existe una os de LOGI YA de tipo (1)
    if ($dat_decode_pro_vent[0]->t_sal_cod_serv == 1) {
        if (isset($_SESSION['os_logi_ya'])) {
            if ($product_dao->insertarSalidaProd($num_venta) == 1) {

                $env_dao = new Envio_DAO();
                $env_vo = new Envio_VO();

                $env_vo->setNum_orden_serv($_SESSION['os_logi_ya']);//**os existente
                $env_vo->setNum_guia($_POST["inputRefGuia"]);
                $env_vo->setCantidad($_POST["inputCantidadEnv"]);
                $env_vo->setPeso_kg(0);
                $env_vo->setAlto_cm(0);
                $env_vo->setAncho_cm(0);
                $env_vo->setLargo_cm(0);
                $env_vo->setTrayecto("");
                $env_vo->setNombre($_POST["inputNombreDestino"]);
                $env_vo->setDireccion($_POST["inputDirDestino"]);
                $env_vo->setTelefono($_POST["inputTeleDestino"]);
                $env_vo->setCiudad_dest($dpto_ciu[0]->ciu_nombre);
                $env_vo->setDepto_dest($dpto_ciu[0]->dep_desc);
                $env_vo->setNovedad($_POST["inputObserv"]);
                $env_vo->setContenido($_POST["inputContenido"]);
                $env_vo->setValor_declarado(0);

                echo 1; //si existe una os cargada en la variable de sesion
            } else {
                
            }
            echo 1; //si existe una os cargada en la variable de sesion
        } else {
            //Si NO existe una os cargada en la variable de sesion
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

                //Consulta la os ingresada para servicio 1
                $json_num_os = json_encode($os_dao->consulta_id_UltimaOS_x_cli($_SESSION["td_cli_adm_alst"], $_SESSION["num_doc_cli_adm_alst"], $dat_decode_pro_vent[0]->t_sal_cod_serv));

                if (!empty($json_num_os)) {
                    $num_os_decode = json_decode($json_num_os);
                    $_SESSION['os_logi_ya'] = $num_os_decode[0]->num;

                    $es_x_serv_vo->setOrden_id($_SESSION['os_logi_ya']);
                    $es_x_serv_vo->setEstado_id(1); //predefinido 1 programada           
                    $es_x_serv_vo->setFecha_hora($fecha_hora);
                    $es_x_serv_vo->setNovedad("");
                    $es_x_serv_vo->setTd_mensajero(1); //cc usuario global LOGI
                    $es_x_serv_vo->setNum_doc_mensajero(162534495867); //num predefinido usuario global LOGI
                    //realiza el traking de la os
                    $es_x_serv_dao->insertar_est_x_os($es_x_serv_vo);

                    $es_x_serv_vo->setEstado_id(2); //Asignado
                    $es_x_serv_dao->insertar_est_x_os($es_x_serv_vo);

                    $es_x_serv_vo->setEstado_id(3); //Realizado
                    $es_x_serv_dao->insertar_est_x_os($es_x_serv_vo);

                    echo $_SESSION['os_logi_ya'];
                } else {
                    echo ""; //error si la consulta de ultima os devuelve vacia
                }
            } else {
                echo ""; //error al crear os LOGI YA
            }
        }
        //Verifica si existe una os de tipo normal (2)  
    } elseif ($dat_decode_pro_vent[0]->t_sal_cod_serv == 2) {
        if (isset($_SESSION['os_normal'])) {
            echo 2; //si existe una os cargada en la variable de sesion
        } else {
            //Si NO existe una os cargada en la variable de sesion
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

                //Consulta la os ingresada para servicio 1
                $json_num_os = json_encode($os_dao->consulta_id_UltimaOS_x_cli($_SESSION["td_cli_adm_alst"], $_SESSION["num_doc_cli_adm_alst"], $dat_decode_pro_vent[0]->t_sal_cod_serv));

                if (!empty($json_num_os)) {
                    $num_os_decode = json_decode($json_num_os);
                    $_SESSION['os_normal'] = $num_os_decode[0]->num;

                    $es_x_serv_vo->setOrden_id($num_os_decode[0]->num);
                    $es_x_serv_vo->setEstado_id(1); //predefinido 1 programada           
                    $es_x_serv_vo->setFecha_hora($fecha_hora);
                    $es_x_serv_vo->setNovedad("");
                    $es_x_serv_vo->setTd_mensajero(1); //cc usuario global LOGI
                    $es_x_serv_vo->setNum_doc_mensajero(162534495867); //num predefinido usuario global LOGI
                    //realiza el traking de la os
                    $es_x_serv_dao->insertar_est_x_os($es_x_serv_vo);

                    $es_x_serv_vo->setEstado_id(2); //Asignado
                    $es_x_serv_dao->insertar_est_x_os($es_x_serv_vo);

                    $es_x_serv_vo->setEstado_id(3); //Realizado
                    $es_x_serv_dao->insertar_est_x_os($es_x_serv_vo);

                    echo $_SESSION['os_normal'];
                } else {
                    echo ""; //error si la consulta de ultima os devuelve vacia
                }
            } else {
                echo ""; //error al crear os LOGI YA
            }
        }
    }
} else {
    header("location../");
}