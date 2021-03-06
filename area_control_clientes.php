<!DOCTYPE html>
<?php
session_start();
if (!isset($_SESSION["sucursal"])) {
    header("location:index.php");
}
?>
<html lang="es">

    <head>

        <meta http-equiv="Content-type" content="text/html; charset=utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
        <meta name="description" content="">
        <meta name="author" content="">

        <title>CONTROL</title>

        <!-- Favicons -->
        <link href="img/logos/LOGO-ESTILO-icon.ico" rel="icon" type="imagen/ico">
        <link href="img/apple-touch-icon.png" rel="apple-touch-icon">

        <!-- Bootstrap core CSS -->
        <!--<link href="lib/bootstrap/css/bootstrap.css" rel="stylesheet" type="text/css"/>-->
        <link href="lib/bootstrap/css/bootstrap_watch.css" rel="stylesheet" type="text/css"/>
        <!--<link href="lib/bootstrap/css/bootstrap-grid.css" rel="stylesheet" type="text/css"/>-->
        <!--<link href="lib/bootstrap/css/bootstrap-reboot.css" rel="stylesheet" type="text/css"/>-->
        <!--<link href="lib/bootstrap/css/bootstrap-reboot.min.css" rel="stylesheet" type="text/css"/>-->
        <!--<link href="lib/bootstrap/css/bootstrap.min.css" rel="stylesheet" type="text/css"/>-->




        <!-- Custom styles for this template -->
        <link href="css/simple-sidebar.css" rel="stylesheet" type="text/css"/>
        <link href="lib/ionicons/css/ionicons.css" rel="stylesheet" type="text/css"/>
        <link href="css/dataTables.bootstrap4.min.css" rel="stylesheet" type="text/css"/>
        <link href="css/responsive.bootstrap4.min.css" rel="stylesheet" type="text/css"/>
        <link href="css/my_style.css" rel="stylesheet" type="text/css"/>
        <link href="css/style.css" rel="stylesheet" type="text/css"/>
        <link href="js/css/alertify.css" rel="stylesheet" type="text/css"/>
        <link href="js/css/themes/default.min.css" rel="stylesheet" type="text/css"/>

        <!-- Bootstrap core JavaScript -->
        <script src="lib/jquery/jquery-3.3.1.js" type="text/javascript"></script>
        <script src="lib/jquery/jquery.min.js" type="text/javascript"></script>
        <script src="js/jquery.validate.js" type="text/javascript"></script>
        <script src="js/additional-methods.js" type="text/javascript"></script>
        <script src="js/localization/messages_es.js" type="text/javascript"></script>
        <script src="lib/jquery/jquery-migrate.min.js" type="text/javascript"></script>
        <script src="lib/bootstrap/js/bootstrap.bundle.min.js"></script>
        <script src="js/Cliente/cliente_dashboard.js" type="text/javascript"></script>
        <script src="js/Comunes/orden_servicio.js" type="text/javascript"></script>
        <script src="js/Comunes/seguimiento_os.js" type="text/javascript"></script>
        <script src="js/Comunes/seguimiento_envio.js" type="text/javascript"></script>
        <script src="js/Comunes/seguimiento_alist.js" type="text/javascript"></script>
        <script src="js/Comunes/kardex_prod.js" type="text/javascript"></script>

        <script src="js/jquery.dataTables.min.js" type="text/javascript"></script>
        <script src="js/dataTables.bootstrap4.min.js" type="text/javascript"></script>
        <script src="js/dataTables.responsive.min.js" type="text/javascript"></script>
        <script src="js/responsive.bootstrap4.min.js" type="text/javascript"></script>
        <script src="js/custom.js" type="text/javascript"></script>
        <script src="js/alertify.js" type="text/javascript"></script>


    </head>

    <body>

        <div class="d-flex" id="wrapper">

            <!-- Sidebar -->

            <div class="bg-light border-right" id="sidebar-wrapper" style="height: auto; margin-top: 75px;">
                <!--<div class="sidebar-heading">Start Bootstrap </div>-->
                <img src="img/sucursales/<?php echo $_SESSION["numero_suc"]; ?>.png" alt="" title="" />
                <div class="dropdown-divider border-primary"></div>
                <h4 class="card-title" style="color: #D6D6D6;"><?php // echo $_SESSION["sucursal"];                 ?></h4>
                <!--<div class="dropdown-divider"></div>-->

                <div class="list-group list-group-flush">
                    <a class="list-group-item list-group-item-action bg-light text-dark nav-link dropdown-toggle" data-toggle="collapse" href="#multiCollapseExample1" role="button" aria-expanded="false" aria-controls="multiCollapseExample1">
                        <span class="ion-android-document"></span>
                        Ordenes de Servicio
                    </a>
                    <div class="collapse multi-collapse" id="multiCollapseExample1">
                        <div class="card card-body alert-secondary">
                            <a class="dropdown-item enlace" id="enlFormRecoleccion">Solicitar Recolección</a>
                            <div class="dropdown-divider"></div>
                            <a class="dropdown-item enlace" id="enlSeguimientoOS">Seguimiento OS</a>
                            <div class="dropdown-divider"></div>
                            <a class="dropdown-item enlace" id="enlHistorialOS">Historial</a>
                        </div>
                    </div>
                    <a class="list-group-item list-group-item-action bg-light text-dark nav-link dropdown-toggle" data-toggle="collapse" href="#multiCollapseExample2" role="button" aria-expanded="false" aria-controls="multiCollapseExample2">
                        <span class="ion-android-mail"></span>
                        Envios
                    </a>
                    <div class="collapse multi-collapse" id="multiCollapseExample2">
                        <div class="card card-body alert-secondary">
                            <a class="dropdown-item enlace" id="enlSeguimientoEnv">Rastreo Envios</a>
                            <div class="dropdown-divider"></div>
                            <a class="dropdown-item enlace" id="link_vista_dashboard_envios_suc">DashBoard Envios</a>
                            <div class="dropdown-divider"></div>
                            <a class="dropdown-item enlace" id="link_vista_tabla_imp_guias">Reimprimir Guias</a>
                        </div>
                    </div>
                    <a class="list-group-item list-group-item-action bg-light text-dark nav-link dropdown-toggle" data-toggle="collapse" href="#multiCollapseALM" role="button" aria-expanded="false" aria-controls="multiCollapseALM">
                        <span class="ion-ios-home"></span>
                        Almacen
                    </a>
                    <div class="collapse multi-collapse" id="multiCollapseALM">
                        <div class="card card-body alert-secondary">
                            <a class="dropdown-item enlace" id="link_stock_suc">Inventario</a>
                            <div class="dropdown-divider"></div>
                            <a class="dropdown-item enlace" id="link_vista_dash_alist_suc">DashBoard Alistamiento</a>
                            <div class="dropdown-divider"></div>
                            <a class="dropdown-item enlace" id="link_seg_aenv_cl">Seguimiento Alistamiento</a>
                            <div class="dropdown-divider"></div>
                            <a class="dropdown-item enlace" id="link_ent_suc">Entradas</a>
                            <div class="dropdown-divider"></div>
                            <a class="dropdown-item enlace" id="link_rot_inv">Rotación Inventario</a>
                        </div>
                    </div>
                </div>
            </div>
            <!-- /#sidebar-wrapper -->

            <!-- Page Content -->
            <div id="page-content-wrapper">

                <nav class="navbar navbar-expand-lg navbar-light bg-light border-bottom fixed-top">   

                    <!-- Boton menu dashboard -->
                    <button id="menu-toggle" type="button" data-toggle="collapse" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="ion-android-menu"></span>
                    </button>
                    <img id="inicio" src="img/logos/LOGO_CLARO_77x36.png" alt=""/>                    
                    <!--<samp class="navbar-brand"><?php // echo $_SESSION["sucursal"];  ?></samp>-->

                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>

                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="navbar-nav ml-auto">                            
                            <?php
                            if (isset($_SESSION["sucursal"])) {
                                ?>
                                <li class = "nav-item">
                                    <a class = "nav-link" href = "Controller/Login_General/log_aut_control.php">CERRAR SESION</a>
                                </li>
                                <?php
                            } else {
                                ?>
                                <li class = "nav-item">
                                    <a class = "nav-link" href = "inicio_sesion.php">ACCESO CLIENTES</a>
                                </li>
                                <?php
                            }
                            ?>

                        </ul>
                    </div>
                </nav>


                <section id="facts" style="padding:0px;"  class="wow fadeIn next">
                    <div class="container" style="margin-top: 85px; height: auto; margin-bottom: 10px;">

                        <div id="sectionConten" data-spy="scroll">                                

                            <div class="card border-primary mb-3" style="max-width: 100%; border-radius: 0.5rem;">
                                <div class="card-header"><strong class="mr-auto"><legend class="mr-auto">BIENVENIDO <?php // echo $_SESSION["nombre_cli"];                 ?></legend></strong></div>
                                <div class="card-body">
                                    <img class="img-fluid" src="img/sucursales/FONDO/<?php echo $_SESSION["numero_suc"]; ?>.png" alt=""/>
                                </div>
                            </div>
                        </div>

                    </div>                        
                </section> 


            </div>
            <!-- /#page-content-wrapper -->

        </div>
        <div class="modal fade" id="ModalActuEstOS" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document" id="mod-dalog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="ModalEstOSTitle"></h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close" id="btnCloseModal">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body" id="body_mod_os">

                    </div> 
                </div>
            </div>
        </div>
    </body>

</html>