<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
if ($_POST) {
    $envio_dao = new Envio_DAO();
    $env_ing = json_encode($envio_dao->consultaEnvIng_x_os($id_os_cliente));
    $array = json_decode($env_ing);

    echo "<div class='col-lg-12' id='tablaEnv'><table class='table table-sm table-hover table-bordered' id='tableEnvios'><thead>"
    . "<tr class='thead-light'>"
    . "<th scope='col'>N° GUIA</th>"
    . "<th scope='col'>DIRECCION DESTINO</th>"
    . "<th scope='col'>CIUDAD DESTINO</th>"
    . "<th scope='col'>DPTO DESTINO</th>"
    . "<th scope='col'>PRODUCTO</th>"
    . "<th scope='col'>PROGRAMADO</th>"
    . "</tr></thead><tbody>";

    for ($i = 0; $i < count($array); $i++) {
        echo '<tr class="table-success table-sm" id="fila' . $i . '"><td>' . $array[$i]->en_guia . "</td>";
        echo '<td>' . $array[$i]->en_direccion . '</td>';
        echo '<td>' . $array[$i]->en_ciudad . '</td>';
        echo '<td>' . $array[$i]->en_departamento . '</td>';
        echo '<td>' . $array[$i]->en_contiene . '</td>';
        echo '<td>' . $array[$i]->en_fec_pro . '</td></tr>';
    }
    echo "</tbody></table></div>";
} else {
    header("location../");
}
