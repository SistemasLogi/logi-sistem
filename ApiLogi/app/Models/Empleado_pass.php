<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * Description of Empleado_pass
 *
 * @author ANDRES
 */
class Empleado_pass extends Model {

    //put your code here
    //put your code here
    protected $table = "usuario_emp_pass";
    public $timestamp = false;
    protected $fillable = ['ue_td_id', 'ue_num_doc', 'car_id', 'ue_usuario', 'ue_password'];
    protected $primary_key = ['ue_td_id', 'ue_num_doc'];
    public $incrementing = false;

    public function estado_x_envio() {
//        return $this->belongsTo(Empleado::class, ['emp_td_id', 'emp_num_doc']); //el segundo parametro es la llave foranea en la tabla de la relacion
    }

}
