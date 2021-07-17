<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * Description of Est_x_envio
 *
 * @author ANDRES
 */
class Est_x_envio extends Model {

    //put your code here
    protected $table = "est_x_envio";
    public $timestamp = false;
    protected $fillable = [
        'exe_en_id',
        'exe_ee_id',
        'exe_fec_hora',
        'exe_novedad',
        'td_id_men',
        'num_doc_men'
    ];
    protected $primary_key = ['exe_en_id', 'exe_ee_id', 'exe_fec_hora'];
    public $incrementing = false;

    public function estado_env() {
        return $this->belongsTo(Empleado::class, ['emp_td_id', 'emp_num_doc'], ['emp_td_id', 'emp_num_doc']);
    }

}
