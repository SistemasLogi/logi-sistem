<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Envio_MAIL
 *
 * @author ti
 */
require 'PHPMailer/PHPMailerAutoload.php';

class Envio_MAIL {

    function Envio_Email_Form($origen, $correo_destino, $asunto, $cuerpo_mensaje, $correo_copia) {
        $mail = new PHPMailer();
        $mail->isSMTP();
        $mail->SMTPAuth = true;
        $mail->SMTPSecure = 'tls';
        $mail->Host = 'smtp.gmail.com';
        $mail->Port = '587';
        $mail->Username = 'andres.pruebasand0313@gmail.com';
        $mail->Password = 'c4l1ch3OEIE';
        $mail->setFrom($origen, 'LOGI Web');
//        $mail->setFrom($origen);
        $mail->addAddress($correo_destino);
        $mail->addCC($correo_copia);
        $mail->Subject = $asunto;
        $mail->Body = $cuerpo_mensaje;
        $mail->isHTML(true);

        $respuesta;
        if ($mail->send()) {
            $respuesta = 'Enviado';
        } else {
            $respuesta = 'No enviado';
        }
        return $respuesta;
    }

}
