<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * Description of Orden_servicio
 *
 * @author LOGI
 */
class Ciudad extends Model {

    //put your code here
    protected $table = "ciudad";
    public $timestamp = false;
    protected $fillable = [
        'ciu_id',
        'dep_id',
        'ciu_nombre'
    ];
    protected $primary_key = ['ciu_id'];
    public $incrementing = false;

//    public function estado_env() {
//        return $this->belongsTo(Empleado::class, ['emp_td_id', 'emp_num_doc'], ['emp_td_id', 'emp_num_doc']);
//    }
}
