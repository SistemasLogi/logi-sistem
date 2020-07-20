<?php

require '../../../Class/phpspreadsheet/vendor/autoload.php';

use PhpOffice\PhpSpreadsheet\IOFactory;

require '../../../config.php';

date_default_timezone_set('America/Bogota');
$fecha_hora_now = date("Y-m-d H:i:s");
$fech_solo = date('Y-m-d');

if ($_POST) {

    $suc = $_POST["suc"];

    $xls_name = '../../../Files/Temp_inv/' . $suc . '.xlsx';

    $spreadsheet = IOFactory::load($xls_name);
    $sheetData = $spreadsheet->getActiveSheet()->toArray(null, true, true, true);

    if ($sheetData[1]['A'] == "CODIGO" && $sheetData[1]['B'] == "SKU" && $sheetData[1]['C'] == "DESCRIPCION" && $sheetData[1]['D'] == "CANTIDAD") {

        $prod_dao = new Producto_DAO();
        $producto_vo = new Producto_VO();
        $suc_dao = new Sucursales_DAO();
        $stock_dao = new Stock_DAO();
        $stock_vo = new Stock_VO();

        $datos_suc = json_encode($suc_dao->consultaSuc_x_num($suc));
        $datos_suc_dec = json_decode($datos_suc);


        $sql_nuevo = "INSERT INTO productos VALUES "; //cabecera del insert
        $sql_entrada = "INSERT INTO entrada_prod VALUES "; //cabecera del insert
        $sql_stock = "INSERT INTO stock VALUES "; //cabecera del insert


        $reg_todos = "";
        $reg_new = "";
        $reg_stock = "";

        echo "<div class='alert alert-dismissible alert-info'>"
        . "<h4 class='alert-heading'>Entradas de Hoy " . $fech_solo . "</h4>"
        . "<strong>Cliente Suc: " . $datos_suc_dec[0]->suc_nombre . "</strong><br>"
        . "Entrada correctamente cargada al sistema, los productos no existentes en la Base de datos fueron creados."
        . "</div>";

        echo "<div class='alert alert-dismissible alert-danger' id='mensActuStock'>"
        . "<strong>El Stock debe ser Actualizado, </strong>por favor pulse el boton para actualizar Stock"
        . "</div>"
        . "<div><button type='button' class='btn btn-info' id='btnActualizaStock'>Actualizar Stock</button></div>";

        echo "<div class='table-responsive text-nowrap col-lg-12' id='tablaEntradas'><table class='table table-striped table-sm table-bordered' id='tableEntInven'>"
        . "<thead>"
        . "<tr style='background-color: #00E7E9'>"
        . "<th scope='col'>CODIGO</th>"
        . "<th scope='col'>SKU</th>"
        . "<th scope='col'>DESCRIPCION</th>"
        . "<th scope='col'>CANTIDAD</th>"
        . "</tr></thead><tbody>";

        for ($i = 2; $i <= count($sheetData); $i++) {

            $producto_vo->setSuc_numero($suc);
            $producto_vo->setCod_prod($sheetData[$i]['A']);
            $producto_vo->setSku_prod($sheetData[$i]['B']);
            $producto_vo->setDescripcion($sheetData[$i]['C']);
            $producto_vo->setUbicacion($sheetData[$i]['E']);
            $producto_vo->setCant_ent($sheetData[$i]['D']);
            $producto_vo->setFecha($fecha_hora_now);
            $producto_vo->setFecha_reg($fecha_hora_now);
            $producto_vo->setDetalle("");

            $cod = $sheetData[$i]['A'];
            $sku = $sheetData[$i]['B'];
            $desc = $sheetData[$i]['C'];
            $cant = $sheetData[$i]['D'];


            $existe = $prod_dao->consultaProd_exist($suc, $producto_vo->getCod_prod());

            if (empty($existe)) {
                $reg_new .= "(" . $producto_vo->getSuc_numero() . ", "
                        . "'" . $producto_vo->getCod_prod() . "', '" . $producto_vo->getSku_prod() . "', '" . $producto_vo->getDescripcion() . "', "
                        . "'" . $producto_vo->getUbicacion() . "', '" . $producto_vo->getFecha_reg() . "'),";

                $stock_vo->setNum_sucursal($suc);
                $stock_vo->setCod_producto($sheetData[$i]['A']);
                $stock_vo->setFecha_stock($fecha_hora_now);
                $stock_vo->setCantidad_stk($sheetData[$i]['D']);
                $stock_vo->setObserv_stock("");

                $reg_stock .= "(" . $stock_vo->getNum_sucursal() . ",'" . $stock_vo->getCod_producto() . "', '" . $stock_vo->getFecha_stock() . "', "
                        . "" . $stock_vo->getCantidad_stk() . ", '" . $stock_vo->getObserv_stock() . "'),";
                //*******actualizar stock con funcion estructurada*****//
            } else {
                $stk_prod = json_encode($stock_dao->consultaStockProd($producto_vo->getCod_prod()));
                $stk_prod_dec = json_decode($stk_prod);                
                $stk_fecha_old= $stk_prod_dec[0]->stk_fecha;
                $stk_actual = json_encode($stock_dao->consultaStockActual($producto_vo->getCod_prod(), $suc, $stk_fecha_old, $fecha_hora_now));
                $stk_actual_dec = json_decode($stk_actual);
                $nueva_cantidad = ($stk_actual_dec[0]->total + $sheetData[$i]['D']);
                
                $stock_dao->actualizarStock($fecha_hora_now, $nueva_cantidad, $suc, $producto_vo->getCod_prod());
            }
            $reg_todos .= "('" . $producto_vo->getFecha() . "', " . $producto_vo->getSuc_numero() . ", "
                    . "'" . $producto_vo->getCod_prod() . "', '" . $producto_vo->getCant_ent() . "', '" . $producto_vo->getDetalle() . "'),";

            //*******actualizar stock con funcion estructurada*****//

            echo "<tr><td>" . $cod . "</td>";
            echo "<td>" . $sku . "</td>";
            echo "<td>" . $desc . "</td>";
            echo "<td>" . $cant . "</td></tr>";
        }
        if (!empty($reg_new)) {
            $reg_new = trim($reg_new, ",");
            $reg_new .= ";";
            $prod_dao->insertarBloqueProductoNuevo($sql_nuevo . $reg_new);

            $reg_stock = trim($reg_stock, ",");
            $reg_stock .= ";";
            $stock_dao->insertarBloqueStock($sql_stock . $reg_stock);
        }

        $reg_tod = trim($reg_todos, ",");
        $reg_tod .= ";";
        $prod_dao->insertarBloqueEnTabla($sql_entrada . $reg_tod);

        echo "</tbody></table></div>";
    } else {
        echo "<div class='alert alert-dismissible alert-danger'>"
        . "<button type='button' class='close' data-dismiss='alert'>&times;</button>"
        . "<strong>El archivo no coincide con la base de datos, </strong>por favor diligencie la información solicitada en el archivo plantilla."
        . "</div>";
    }
//    
} else {
    header("location../");
}