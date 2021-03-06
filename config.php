<?php

/**
 * Archivo que controla las rutas requeridas para un correcto 
 * funcionemiento de la aplicacion
 */
ob_start();
//session_start();
//ini_set(display_errors,1);
$r_r = "";
while (!file_exists($r_r . 'Class/Mysql/Datos.php')) {
    $r_r .= '../';
}
/* * Clases de conexion a BD* */
require $r_r . 'Class/Mysql/Datos.php';
require $r_r . 'Class/Mysql/MySQL.php';

/* * Clases de tipo VO* */
require $r_r . 'Class/VO/Cliente_VO.php';
require $r_r . 'Class/VO/Usuario_pass_VO.php';
require $r_r . 'Class/VO/Ciudad_VO.php';
require $r_r . 'Class/VO/Tipo_doc_VO.php';
require $r_r . 'Class/VO/Tipo_serv_VO.php';
require $r_r . 'Class/VO/Tipo_envio_VO.php';
require $r_r . 'Class/VO/Estado_serv_VO.php';
require $r_r . 'Class/VO/Estado_env_VO.php';
require $r_r . 'Class/VO/Estado_aenv_VO.php';
require $r_r . 'Class/VO/Depto_VO.php';
require $r_r . 'Class/VO/Orden_serv_VO.php';
require $r_r . 'Class/VO/Est_x_serv_VO.php';
require $r_r . 'Class/VO/Envio_VO.php';
require $r_r . 'Class/VO/Estado_x_env_VO.php';
require $r_r . 'Class/VO/Empleado_VO.php';
require $r_r . 'Class/VO/Sucursales_VO.php';
require $r_r . 'Class/VO/Producto_VO.php';
require $r_r . 'Class/VO/Operadores_VO.php';
require $r_r . 'Class/VO/AEnvio_VO.php';
require $r_r . 'Class/VO/Est_x_aenv_VO.php';
require $r_r . 'Class/VO/Stock_VO.php';
require $r_r . 'Class/VO/Cargo_VO.php';
require $r_r . 'Class/VO/Tipo_pago_VO.php';
require $r_r . 'Class/VO/Estado_usu_VO.php';

/* * Clases de tipo DAO* */
require $r_r . 'Class/DAO/Cliente_DAO.php';
require $r_r . 'Class/DAO/Usuario_pass_DAO.php';
require $r_r . 'Class/DAO/Ciudad_DAO.php';
require $r_r . 'Class/DAO/Tipo_doc_DAO.php';
require $r_r . 'Class/DAO/Tipo_serv_DAO.php';
require $r_r . 'Class/DAO/Tipo_envio_DAO.php';
require $r_r . 'Class/DAO/Estado_serv_DAO.php';
require $r_r . 'Class/DAO/Estado_env_DAO.php';
require $r_r . 'Class/DAO/Estado_aenv_DAO.php';
require $r_r . 'Class/DAO/Depto_DAO.php';
require $r_r . 'Class/DAO/Orden_serv_DAO.php';
require $r_r . 'Class/DAO/Est_x_serv_DAO.php';
require $r_r . 'Class/DAO/Envio_DAO.php';
require $r_r . 'Class/DAO/Estado_x_env_DAO.php';
require $r_r . 'Class/DAO/Empleado_DAO.php';
require $r_r . 'Class/DAO/Sucursales_DAO.php';
require $r_r . 'Class/DAO/Producto_DAO.php';
require $r_r . 'Class/DAO/Operadores_DAO.php';
require $r_r . 'Class/DAO/AEnvio_DAO.php';
require $r_r . 'Class/DAO/Est_x_aenv_DAO.php';
require $r_r . 'Class/DAO/Stock_DAO.php';
require $r_r . 'Class/DAO/Cargo_DAO.php';
require $r_r . 'Class/DAO/Tipo_pago_DAO.php';
require $r_r . 'Class/DAO/Estado_usu_DAO.php';

/* * Clase PDF * */
require $r_r . 'Class/PDF/fpdf/fpdf.php';
/* * Clase Email* */
require $r_r . 'Class/EMAIL/Envio_MAIL.php';
/* * Clase QR* */
require $r_r . 'Class/QR/phpqrcode/qrlib.php';
?>