<?php

namespace App\Models;

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

use Illuminate\Database\Eloquent\Model;

/**
 * Description of Empleado
 *
 * @author TECNOLOGIA-LOGI
 */
class Empleado extends Model {

    //put your code here
    protected $table = "empleados";
    public $timestamps = false;
    protected $filebase = ['emp_td_id', 'emp_num_doc', 'emp_nombre', 'emp_tel', 'emp_cel', 'emp_direccion', 'emp_email', 'esu_id'];

    public function est_x_envio() {
        return $this->hasMany(Est_x_envio::class);
    }

}
