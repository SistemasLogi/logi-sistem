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
class Orden_servicio extends Model {

    //put your code here
    protected $table = "orden_serv";
    public $timestamp = false;
    protected $fillable = [
        'os_id',
        'cli_td_id',
        'cli_num_doc',
        'ciu_id',
        'os_direccion',
        'os_per_cont',
        'os_tel_cont',
        'ts_id',
        'te_id',
        'os_observacion'
    ];
    protected $primary_key = ['os_id'];
    public $incrementing = false;

//    public function estado_env() {
//        return $this->belongsTo(Empleado::class, ['emp_td_id', 'emp_num_doc'], ['emp_td_id', 'emp_num_doc']);
//    }
}
