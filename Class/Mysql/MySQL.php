<?php

class MySQL {

    private $conexion;
    var $dato_conn;

    private function conectar() {

        $this->dato_conn = new Datos();
        $this->conexion = new mysqli($this->dato_conn->get_hostname(), $this->dato_conn->get_usuario(), $this->dato_conn->get_clave(), $this->dato_conn->get_DB());
        if ($this->conexion->connect_errno) {
            return "Fallo la conexion a MySQL: (" . $this->conexion->connect_errno . ")" . $this->conexion->connect_error;
        } else {
            $this->conexion->query("SET NAMES 'utf8'");
            return "OK";
        }

//        $this->dato_conn = new Datos();
//        if (!isset($this->conexion)) {
//            $this->conexion = (mysqli_connect($this->dato_conn->get_hostname(), $this->dato_conn->get_usuario(), $this->dato_conn->get_clave())) or die(mysql_error());
//            mysqli_select_db($this->conexion,$this->dato_conn->get_DB()) or die(mysql_error());
//        }
    }

//    public function MySQLI() {
//        
//    }

    private function consulta($sql) {
        $this->conectar();
        $r = mysqli_query($this->conexion, $sql);
        if (!$r) {
            $this->cerrar();
            return "-1";
            exit;
        }
        return $r;
    }

    public function query($Select) {
        $datos_db = $this->consulta($Select);
        if ($this->num_rows($datos_db) > 0) {
            $c = 0;
            while ($r = $this->fetch_array($datos_db)) {
                $lis[$c] = $r;
                $c++;
            }
            mysqli_free_result($datos_db);
            $this->cerrar();
            return $lis;
        }
        $this->cerrar();
        return 0;
    }

    public function rows_selected($select) {
        $num_filas = $this->consulta($select);
        return $this->num_rows($num_filas);
    }    

    public function execute_query($Modificar) {
        $datos_db = $this->consulta($Modificar);
        return $datos_db;
    }

    private function fetch_array($consulta) {
        return mysqli_fetch_array($consulta);
    }

    private function fetch_object($consulta) {
        return mysqli_fetch_object($consulta);
    }

    private function num_rows($consulta) {
        return mysqli_num_rows($consulta);
    }

    private function cerrar() {
        try {
            mysqli_close($this->conexion);
            $this->conexion = null;
        } catch (Exception $e) {
            
        }
    }

}

?> 