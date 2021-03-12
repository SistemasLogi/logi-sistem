<!DOCTYPE html>
<?php
session_start();
?>
<html lang="es">
    <head>
        <meta charset="utf-8">
        <title>LOGI</title>
        <meta content="width=device-width, initial-scale=1.0" name="viewport">
        <meta content="" name="keywords">
        <meta content="" name="description">

        <!-- Favicons -->
        <link href="img/logos/LOGO-ESTILO-icon.ico" rel="icon" type="imagen/ico">
        <link href="img/apple-touch-icon.png" rel="apple-touch-icon">

        <!-- Google Fonts -->
        <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,300i,400,400i,700,700i|Montserrat:300,400,500,700" rel="stylesheet">

        <!-- Bootstrap CSS File -->
        <link href="lib/bootstrap/css/bootstrap.css" rel="stylesheet">
        <link href="lib/bootstrap/css/bootstrap.min.css" rel="stylesheet" type="text/css"/>

        <!-- Libraries CSS Files -->
        <link href="lib/font-awesome/css/font-awesome.min.css" rel="stylesheet">
        <link href="lib/animate/animate.min.css" rel="stylesheet">
        <link href="lib/ionicons/css/ionicons.min.css" rel="stylesheet">
        <link href="lib/owlcarousel/assets/owl.carousel.min.css" rel="stylesheet">
        <link href="lib/lightbox/css/lightbox.min.css" rel="stylesheet">

        <!-- Main Stylesheet File -->
        <link href="css/style.css" rel="stylesheet">
        <link href="css/my_style.css" rel="stylesheet" type="text/css"/>

        <!-- JavaScript Libraries -->
        <script src="lib/jquery/jquery-3.3.1.js" type="text/javascript"></script>
        <script src="lib/jquery/jquery.min.js" type="text/javascript"></script>
        <script src="js/jquery.validate.js" type="text/javascript"></script>
        <script src="js/additional-methods.js" type="text/javascript"></script>
        <script src="js/localization/messages_es.js" type="text/javascript"></script>
        <script src="lib/jquery/jquery-migrate.min.js"></script>
        <script src="lib/bootstrap/js/bootstrap.bundle.min.js"></script>
        <script src="lib/easing/easing.min.js"></script>
        <script src="lib/superfish/hoverIntent.js"></script>
        <script src="lib/superfish/superfish.min.js"></script>
        <script src="lib/wow/wow.min.js"></script>
        <script src="lib/waypoints/waypoints.min.js"></script>
        <script src="lib/counterup/counterup.min.js"></script>
        <script src="lib/owlcarousel/owl.carousel.min.js"></script>
        <script src="lib/isotope/isotope.pkgd.min.js"></script>
        <script src="lib/lightbox/js/lightbox.min.js"></script>
        <script src="lib/touchSwipe/jquery.touchSwipe.min.js"></script>
        <!-- Contact Form JavaScript File -->
        <!--<script src="contactform/contactform.js"></script>-->

        <!-- Template Main Javascript File -->
        <script src="js/main.js"></script>
        <!--<script src="js/Inicio_Sesion/login.js" type="text/javascript"></script>-->
        <!--<script src="js/principal.js" type="text/javascript"></script>-->

        <!-- =======================================================
          Theme Name: BizPage
          Theme URL: https://bootstrapmade.com/bizpage-bootstrap-business-template/
          Author: BootstrapMade.com
          License: https://bootstrapmade.com/license/
        ======================================================= -->
    </head>

    <body>

        <!--==========================
          Header
        ============================-->
        <nav class="navbar navbar-expand-lg navbar-light bg-light fixed-top image-fondo">
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <img id="inicio" src="img/logos/LOGO_CLARO_157x72.png" alt=""/>
            <div class="collapse navbar-collapse" id="navbarColor01">
                <?php include './navbar.php'; ?>
            </div>
        </nav>

        <!--==========================
          Facts Section
        ============================-->
        <section id="facts"  class="wow fadeIn next">
            <div class="container margen mt-3">

                <header class="section-header">
                    <h3>RASTREO ENVIO</h3>
                    <!--<h4><p>Gracias a nuestros clientes por confiar en nosotros!</p></h4>-->
                </header>

                <?php
                if (isset($_GET["EnvNum"])) {


                    require './config.php';
                    $est_env = new Estado_x_env_DAO();
                    $num_envio = $_GET["EnvNum"];
                    $datosEnvio = json_encode($est_env->consulta_seguimiento_env_x_id("AND e.en_id = " . $num_envio));

                    if (!empty($datosEnvio)) {
                        $id_env_dec = json_decode($datosEnvio);
                        $num_os = $id_env_dec[0]->os_id;
                        $os_dao = new Orden_serv_DAO();

                        $dat_suc = json_encode($os_dao->consulta_datos_suc_os($num_os));

                        if (!empty($dat_suc)) {
                            $dat_suc_dec = json_decode($dat_suc);
                            $nombre_suc = "-" . $dat_suc_dec[0]->suc_nombre;
                        } else {
                            $nombre_suc = "";
                        }

                        $cant_estados = count($id_env_dec); //cantidad de registros que equivalen a los estados por los que pasa el envio
                        $cant_teorico = $cant_estados;
                        $tmp_ult_est = count($id_env_dec) - 1;


                        if ($id_env_dec[$tmp_ult_est]->ee_id == 6 || $id_env_dec[$tmp_ult_est]->ee_id == 7 || $id_env_dec[$tmp_ult_est]->ee_id == 11) {
                            
                        } else {
                            $cant_teorico = $cant_estados + 1; //cantidad teorica para visualizacion
                        }

                        // Ruta del directorio donde están los archivos
                        $path = './img/pruebas_entrega';

                        // Arreglo con todos los nombres de los archivos
                        $files = array_diff(scandir($path), array('.', '..'));

                        foreach ($files as $file) {
                            // Divides en dos el nombre de tu archivo utilizando el . 
                            $data = explode(".", $file);
                            // Nombre del archivo
                            $fileName = $data[0];
                            // Extensión del archivo 
                            $fileExtension = $data[1];

                            if ($num_envio == $fileName) {
                                $ruta_prueba = $fileName . "." . $fileExtension;
                                // Realizamos un break para que el ciclo se interrumpa
                                break;
                            } else {
                                $ruta_prueba = "";
                            }
                        }
                        ?>

                        <div class="row col-lg-12">
                            <div class="toast-body col-lg-12 row">        
                                <div class="alert alert-dismissible alert-secondary col-lg-12" style="border-radius: 0.5rem;">

                                    <h4>Envio N° <em id="etqNumEnv"><?php echo $id_env_dec[0]->en_id ?></em></h4>
                                    <div class="row">
                                        <div class="alert alert-dismissible alert-warning col-lg-6">
                                            <h6><b>REMITE</b></h6>
                                            <p class="mb-0"><strong>NOMBRE: </strong><em id="nom_remite"><?php echo $id_env_dec[0]->cli_nombre . $nombre_suc ?></em></p>
                                            <p class="mb-0"><strong>DIRECCIÓN: </strong><em id="dir_remite"><?php echo $id_env_dec[0]->os_direccion ?></em></p>
                                            <p class="mb-0"><strong>CIUDAD: </strong><em id="ciudad_remite"><?php echo $id_env_dec[0]->ciu_nombre ?></em></p>
                                            <p class="mb-0"><strong>TEL: </strong><em id="tel_remite"><?php echo $id_env_dec[0]->os_tel_cont ?></em></p>
                                        </div>
                                        <div class="alert alert-dismissible alert-primary col-lg-6">
                                            <h6><b>DESTINO</b></h6>
                                            <p class="mb-0"><strong>NOMBRE: </strong><em id="nom_destino"><?php echo $id_env_dec[0]->en_nombre ?></em></p>
                                            <p class="mb-0"><strong>DIRECCIÓN: </strong><em id="dir_destino"><?php echo $id_env_dec[0]->en_direccion ?></em></p>
                                            <p class="mb-0"><strong>CIUDAD: </strong><em id="ciudad_destino"><?php echo $id_env_dec[0]->en_ciudad ?></em></p>
                                            <p class="mb-0"><strong>TEL: </strong><em id="tel_destino"><?php echo $id_env_dec[0]->en_telefono ?></em></p> 
                                        </div>
                                    </div>
                                    <?php
                                    $iconos = "";
                                    $fecha_est = "";
                                    $hora_est = "";
                                    $desc_est = "";

                                    if ($cant_teorico < 3) {
                                        $cant_teorico++;
                                    }

                                    $porcentaje = (100 / ($cant_teorico) * $cant_estados);
                                    ?>
                                    <div class="col-lg-12 table-responsive">  
                                        <table class="table table-hover text-center col-lg-12" id="tableSegEnv">
                                            <thead>
                                                <tr class="table-sm" id="titleEncaTab">
                                                    <?PHP
                                                    for ($i = 0; $i < $cant_teorico; $i++) {
                                                        ?>
                                                        <th scope="col"><span class="ion-android-arrow-dropright" style="font-size: large;"></span></th>
                                                        <?PHP
                                                    }
                                                    ?>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr class="table-sm" id="fechEst">
                                                    <?PHP
                                                    for ($i = 0; $i < $cant_estados; $i++) {
                                                        ?>
                                                        <td><?php echo $id_env_dec[$i]->exe_fec_hora ?></td>
                                                        <?PHP
                                                    }
                                                    if ($cant_estados == 1) {
                                                        ?>
                                                        <td></td>
                                                        <td></td>
                                                        <?php
                                                    } else {
                                                        if ($id_env_dec[$tmp_ult_est]->ee_id == 6 || $id_env_dec[$tmp_ult_est]->ee_id == 7 || $id_env_dec[$tmp_ult_est]->ee_id == 11 || $id_env_dec[$tmp_ult_est]->ee_id == 12) {
                                                            
                                                        } else {
                                                            ?>
                                                            <td></td>
                                                            <?php
                                                        }
                                                    }
                                                    ?>
                                                </tr>
                                                <tr class="table-sm" id="horaEst">

                                                </tr>
                                                <tr>                                                
                                                    <td id="fila_bar" colspan="<?php echo $cant_teorico ?>">
                                                        <div class="progress" style="height:20px; border-radius: 0.7rem;">
                                                            <?php
                                                            if ($cant_estados == 1) {
                                                                ?>
                                                                <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" id="progress_bar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style="width: <?php echo $porcentaje ?>%"></div>
                                                                <?php
                                                            } else {
                                                                if ($id_env_dec[$tmp_ult_est]->ee_id == 6 || $id_env_dec[$tmp_ult_est]->ee_id == 7 || $id_env_dec[$tmp_ult_est]->ee_id == 11 || $id_env_dec[$tmp_ult_est]->ee_id == 12) {
                                                                    ?>
                                                                    <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" id="progress_bar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style="width: 100%"></div>
                                                                    <?php
                                                                } else {
                                                                    ?>
                                                                    <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" id="progress_bar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style="width: <?php echo $porcentaje ?>%"></div>
                                                                    <?php
                                                                }
                                                            }
                                                            ?>
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr class="table-secondary table-sm" id="icon_x_est_env">                       
                                                    <?PHP
                                                    for ($i = 0; $i < $cant_estados; $i++) {
                                                        ?>
                                                        <td id="nov_env"><?php echo $id_env_dec[$i]->ee_desc ?></td>
                                                        <?PHP
                                                    }
                                                    if ($cant_estados == 1) {
                                                        ?>
                                                        <td id="fec_asig">PENDIENTE</td>
                                                        <td id="fec_asig">PENDIENTE</td>
                                                        <?php
                                                    } else {
                                                        if ($id_env_dec[$tmp_ult_est]->ee_id == 6 || $id_env_dec[$tmp_ult_est]->ee_id == 7 || $id_env_dec[$tmp_ult_est]->ee_id == 11 || $id_env_dec[$tmp_ult_est]->ee_id == 12) {
                                                            
                                                        } else {
                                                            ?>
                                                            <td id="fec_asig">PENDIENTE</td>
                                                            <?php
                                                        }
                                                    }
                                                    ?>
                                                </tr>
                                                <tr class="table-sm" id="descEst">
                                                    <?PHP
                                                    for ($i = 0; $i < $cant_estados; $i++) {
                                                        if ($id_env_dec[$i]->ee_id == 1) {
                                                            ?>
                                                            <td><a tabindex="0" class="enlace" role="button" data-toggle="popover" data-placement="top" data-trigger="focus" title="<?php echo $id_env_dec[$i]->ee_desc ?>" data-content="<?php echo $id_env_dec[$i]->exe_novedad ?>"><span class="ion-android-alarm-clock" style="font-size: xx-large; color: #d68800;"></span></a></td>                           
                                                            <?php
                                                        } else if ($id_env_dec[$i]->ee_id == 2) {
                                                            ?>
                                                            <td><a tabindex="0" class="enlace" role="button" data-toggle="popover" data-placement="top" data-trigger="focus" title="<?php echo $id_env_dec[$i]->ee_desc ?>" data-content="<?php echo $id_env_dec[$i]->exe_novedad ?>"><span class="ion-ios-home" style="font-size: xx-large; color: #d68800;"></span></a></td>
                                                            <?php
                                                        } else if ($id_env_dec[$i]->ee_id == 3) {
                                                            ?>
                                                            <td><a tabindex="0" class="enlace" role="button" data-toggle="popover" data-placement="top" data-trigger="focus" title="<?php echo $id_env_dec[$i]->ee_desc ?>" data-content="<?php echo $id_env_dec[$i]->exe_novedad ?>"><span class="ion-jet" style="font-size: xx-large; color: #d68800;"></span></a></td>                                                       
                                                            <?php
                                                        } else if ($id_env_dec[$i]->ee_id == 4) {
                                                            ?>
                                                            <td><a tabindex="0" class="enlace" role="button" data-toggle="popover" data-placement="top" data-trigger="focus" title="<?php echo $id_env_dec[$i]->ee_desc ?>" data-content="<?php echo $id_env_dec[$i]->exe_novedad ?>"><span class="ion-ios-home-outline" style="font-size: xx-large; color: #d68800;"></span></a></td>
                                                            <?php
                                                        } else if ($id_env_dec[$i]->ee_id == 5) {
                                                            ?>
                                                            <td><a tabindex="0" class="enlace" role="button" data-toggle="popover" data-placement="top" data-trigger="focus" title="<?php echo $id_env_dec[$i]->ee_desc ?>" data-content="En Reparto"><span class="ion-android-bicycle" style="font-size: xx-large; color: #d68800;"></span></a></td>
                                                            <?php
                                                        } else if ($id_env_dec[$i]->ee_id == 6) {
                                                            ?>
                                                            <td><a tabindex="0" class="enlace" role="button" data-toggle="popover" data-placement="top" data-trigger="focus" title="<?php echo $id_env_dec[$i]->ee_desc ?>" data-content="Entraga OK"><span class="ion-checkmark-circled" style="font-size: xx-large; color: #009645;"></span></a></td>
                                                            <?php
                                                        } else if ($id_env_dec[$i]->ee_id == 7) {
                                                            ?>
                                                            <td><a tabindex="0" class="enlace" role="button" data-toggle="popover" data-placement="top" data-trigger="focus" title="<?php echo $id_env_dec[$i]->ee_desc ?>" data-content="<?php echo $id_env_dec[$i]->exe_novedad ?>"><span class="ion-arrow-left-a" style="font-size: xx-large; color: #b90808;"></span></a></td>
                                                            <?php
                                                        } else if ($id_env_dec[$i]->ee_id == 8) {
                                                            ?>
                                                            <td><a tabindex="0" class="enlace" role="button" data-toggle="popover" data-placement="top" data-trigger="focus" title="<?php echo $id_env_dec[$i]->ee_desc ?>" data-content="<?php echo $id_env_dec[$i]->exe_novedad ?>"><span class="ion-android-warning" style="font-size: xx-large; color: #d68800;"></span></a></td>
                                                            <?php
                                                        } else if ($id_env_dec[$i]->ee_id == 9) {
                                                            ?>
                                                            <td><a tabindex="0" class="enlace" role="button" data-toggle="popover" data-placement="top" data-trigger="focus" title="<?php echo $id_env_dec[$i]->ee_desc ?>" data-content="<?php echo $id_env_dec[$i]->exe_novedad ?>"><span class="ion-android-warning" style="font-size: xx-large; color: #b90808;"></span></a></td>
                                                            <?php
                                                        } else if ($id_env_dec[$i]->ee_id == 10) {
                                                            ?>
                                                            <td><a tabindex="0" class="enlace" role="button" data-toggle="popover" data-placement="top" data-trigger="focus" title="<?php echo $id_env_dec[$i]->ee_desc ?>" data-content="<?php echo $id_env_dec[$i]->exe_novedad ?>"><span class="ion-android-warning" style="font-size: xx-large; color: #1ea7f7;"></span></a></td>
                                                            <?php
                                                        } else if ($id_env_dec[$i]->ee_id == 11) {
                                                            ?>
                                                            <td><a tabindex="0" class="enlace" role="button" data-toggle="popover" data-placement="top" data-trigger="focus" title="<?php echo $id_env_dec[$i]->ee_desc ?>" data-content="<?php echo $id_env_dec[$i]->exe_novedad ?>"><span class="ion-loop" style="font-size: xx-large; color: #1ea7f7;"></span></a></td>
                                                            <?php
                                                        } else if ($id_env_dec[$i]->ee_id == 12) {
                                                            ?>
                                                            <td><a tabindex="0" class="enlace" role="button" data-toggle="popover" data-placement="top" data-trigger="focus" title="<?php echo $id_env_dec[$i]->ee_desc ?>" data-content="<?php echo $id_env_dec[$i]->exe_novedad ?>"><span class="ion-android-cancel" style="font-size: xx-large; color: #b90808;"></span></a></td>
                                                            <?php
                                                        }
                                                        ?>
                                                        <?PHP
                                                    }
                                                    if ($cant_estados == 1) {
                                                        ?>
                                                        <td><span class="ion-android-bicycle" style="font-size: xx-large; color: #77248c;"></span></td>
                                                        <td><span class="ion-checkmark-circled" style="font-size: xx-large; color: #77248c;"></span></td>
                                                        <?php
                                                    } else {
                                                        if ($id_env_dec[$tmp_ult_est]->ee_id == 6 || $id_env_dec[$tmp_ult_est]->ee_id == 7 || $id_env_dec[$tmp_ult_est]->ee_id == 11 || $id_env_dec[$tmp_ult_est]->ee_id == 12) {
                                                            
                                                        } else {
                                                            ?>
                                                            <td><span class="ion-checkmark-circled" style="font-size: xx-large; color: #77248c;"></span></td>
                                                            <?php
                                                        }
                                                    }
                                                    ?>
                                                </tr>
                                            </tbody>
                                        </table>
                                        <?php
                                        if (!empty($ruta_prueba)) {
                                            ?>
                                            <a type = "button" class = "btn btn-primary float-right" href = "./img/pruebas_entrega/<?php echo $ruta_prueba ?>" target = "_blank"><span class = "ion-android-image" style = "font-size: large;"></span> Ver Prueba de Entrega</a>
                                            <?php
                                        } else {
                                            ?>
                                            <button type = "button" class = "btn btn-primary float-right" disabled=""><span class = "ion-android-image" style = "font-size: large;"></span> Ver Prueba de Entrega</button>
                                            <?php
                                        }
                                        ?>
                                    </div>
                                    <?php
                                } else {
                                    ?>
                                    <h5>NO HAY DATOS</h5>
                                    <?php
                                }
                            } else {
                                ?>
                                <div class="row">                    
                                    <div class="col-lg-12 col-center">
                                        <div class="col-lg-4 col-center">
                                            <form id="formRastreo" name="formRastreo">
                                                <fieldset>
                                                    <div class="form-group">
                                                        <input type="text" class="form-control" id="EnvNum" name="EnvNum" placeholder="Numero guia">
                                                    </div>
                                                    <div class="text-center">
                                                        <button type="submit" class="btn btn-primary">BUSCAR</button>  
                                                    </div>
                                                </fieldset>
                                            </form>

                                        </div>
                                    </div>
                                </div>
                                <?php
                            }
                            ?>
                            <div class="row" id="contAux">

                            </div>

                        </div>
                    </div>
                </div>

            </div>
        </section><!-- #facts -->

    </main>
    <script>
        $('[data-toggle="popover"]').popover({
            trigger: 'focus'
        });
    </script>
    <?PHP require './footer.php'; ?>

</body>
</html>
