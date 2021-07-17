<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * Description of Aenvio
 *
 * @author ANDRES
 */
class Aenvio extends Model {

    //put your code here
    protected $table = "a_envio";
    public $timestamp = false;
    protected $fillable = [
        'aen_id',
        'aen_guia_op',
        'aen_venta',
        'os_id',
        'ope_id',
        'aen_cantidad',
        'aen_nombre',
        'aen_direccion',
        'aen_telefono',
        'aen_ciudad',
        'aen_departamento',
        'aen_observ',
        'aen_valor_flete_op'
    ];
    protected $primary_key = ['aen_id'];
    public $incrementing = false;

//    public function estado_env() {
//        return $this->belongsTo(Empleado::class, ['emp_td_id', 'emp_num_doc'], ['emp_td_id', 'emp_num_doc']);
//    }

}
