<?php

if ($_POST) {
    require '../../config.php';
    $objMail = new Envio_MAIL();

    $correo_origen = ('andres.pruebasand0313@gmail.com');
    $correo_destino = 'andres.pruebasand0313@gmail.com';
    $correo_copia = 'sac@grupologi.co';
    $asunto = $_POST["inputAsunto"];
    $cuerpo_mensaje = "Nombre: " . $_POST["inputNombreCont"] . "<br>"
            . "Ciudad contacto: " . $_POST["inputCiudad"] . "<br>"
            . "Telefono: " . $_POST["inputTelefonoCont"] . "<br>"
            . "Correo Contacto: " . $_POST["inputCorreroCont"] . "<br><br>"
            . $_POST["txaMensaje"];

    $objMail->Envio_Email_Form($correo_origen, $correo_destino, $asunto, $cuerpo_mensaje, $correo_copia);
} else {
    header("location../");
}
