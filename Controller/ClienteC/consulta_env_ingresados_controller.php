<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
if ($_POST) {

    echo "<div class='table-responsive text-nowrap' id='tablaEnv'><table class='table table-striped table-sm table-bordered' id='tableEnvios'><thead>"
    . "<tr class='table-primary'>"
    . "<th scope='col'>N° GUIA</th>"
    . "<th scope='col'>REFERENCIA</th>"
    . "<th scope='col'>DESTINATARIO</th>"
    . "<th scope='col'>DIRECCION DESTINO</th>"
    . "<th scope='col'>TELEFONO DESTINO</th>"
    . "<th scope='col'>CIUDAD DESTINO</th>"
    . "<th scope='col'>DPTO DESTINO</th>"
    . "<th scope='col'>PRODUCTO</th>"
    . "<th scope='col'>ESTADO</th>"
    . "<th scope='col'>FECHA EST</th>"
    . "</tr></thead><tbody>";

    for ($i = 0; $i < count($array); $i++) {
        echo '<tr class="table-sm" id="fila' . $i . '">';
        echo '<td>' . $array[$i]->en_id . "</td>";
        echo '<td>' . $array[$i]->en_guia . "</td>";
        echo '<td>' . $array[$i]->en_nombre . "</td>";
        echo '<td>' . $array[$i]->en_direccion . '</td>';
        echo '<td>' . $array[$i]->en_telefono . '</td>';
        echo '<td>' . $array[$i]->en_ciudad . '</td>';
        echo '<td>' . $array[$i]->en_departamento . '</td>';
        echo '<td>' . $array[$i]->en_contiene . '</td>';
        echo '<td>' . $array[$i]->ee_desc . '</td>';
        echo '<td>' . $array[$i]->exe_fec_hora . '</td></tr>';
    }
    echo "</tbody></table></div>";
    echo "<form class='form-inline' id='formImprimirRem'>"
    . "<legend>Imprimir Remesas</legend>"
    . "<div class='input-group mb-2 mr-sm-2 input-group-sm col-lg-2' style='display: none;'>"
    . "<div class='input-group-prepend'>"
    . "<div class='input-group-text'>N° OS</div>"
    . "</div>"
    . "<input type='number' id='inputNumOS' name='inputNumOS' class='form-control form-control-sm'>"
    . "</div>"
    . "<div class='input-group mb-2 mr-sm-2 input-group-sm col-lg-2'>"
    . "<div class='input-group-prepend'>"
    . "<div class='input-group-text'>Pag. Desde</div>"
    . "</div>"
    . "<input type='number' id='inputHojaDesde' name='inputHojaDesde' class='form-control form-control-sm' value='1'>"
    . "</div>"
    . "<div class='input-group mb-2 mr-sm-2 input-group-sm col-lg-2'>"
    . "<div class='input-group-prepend'>"
    . "<div class='input-group-text'>Pag. Hasta</div>"
    . "</div>"
    . "<input type='number' id='inputHojaHasta' name='inputHojaHasta' class='form-control form-control-sm' value='300'>"
    . "</div>"
    . "<button type='submit' class='btn btn-primary mb-2 btn-sm' id='btnGenImp' name='btnGenImp'>Imprimir Remesas</button>"
    . "<div>"
    . "<small id='emailHelp' class='form-text text-muted'>&nbsp;&nbsp;Para evitar errores, se debe realizar impresiones de maximo 300 páginas.</small>"
    . "</div>"
    . "</form>"
    . "<div id='menErrorImprimir'></div>";
} else {
    header("location../");
}
