<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * Description of Empleado
 *
 * @author ANDRES
 */
class Empleado extends Model {

    //put your code here
    //put your code here
    protected $table = "empleados";
    public $timestamp = false;
    protected $fillable = ['emp_td_id', 'emp_num_doc', 'emp_nombre', 'emp_tel', 'emp_cel', 'emp_direccion', 'emp_email', 'esu_id'];
    protected $primary_key = ['emp_td_id', 'emp_num_doc'];
    public $incrementing = false;

    public function estado_x_envio() {
        return $this->hasMany(Est_x_envio::class, ['td_id_men', 'num_doc_men']);
    }

}
