<!DOCTYPE html>
<?php
session_start();
if (!isset($_SESSION["mensajero_logi"])) {
    header("location:index.php");
}
?>
<html lang="es">

    <head>

        <meta http-equiv="Content-type" content="text/html; charset=utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
        <meta name="description" content="">
        <meta name="author" content="">

        <title>LOGI</title>

        <!-- Favicons -->
        <link href="img/logos/LOGO-ESTILO-icon.ico" rel="icon">

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
        <link href="css/dataTables.checkboxes.css" rel="stylesheet" type="text/css"/>
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
        <script src="js/Mensajero/mensajero_dash.js" type="text/javascript"></script>

        <script src="js/jquery.dataTables.min.js" type="text/javascript"></script>
        <script src="js/dataTables.bootstrap4.min.js" type="text/javascript"></script>
        <script src="js/dataTables.responsive.min.js" type="text/javascript"></script>
        <script src="js/responsive.bootstrap4.min.js" type="text/javascript"></script>
        <script src="js/dataTables.checkboxes.min.js" type="text/javascript"></script>
        <script src="js/custom.js" type="text/javascript"></script>
        <script src="js/alertify.js" type="text/javascript"></script>


    </head>

    <body>

        <div class="d-flex" id="wrapper">        
            <!-- /#sidebar-wrapper -->

            <!-- Page Content -->
            <div id="page-content-wrapper">

                <nav class="navbar navbar-expand-lg navbar-light bg-light border-bottom fixed-top">   

                    <!--                     Boton menu dashboard 
                                        <button id="menu-toggle" type="button" data-toggle="collapse" aria-expanded="false" aria-label="Toggle navigation">
                                            <span class="ion-android-menu"></span>
                                        </button>-->
                    <img id="inicio" src="img/logos/LOGO_CLARO_77x36.png" alt=""/>

                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>

                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <?php include './navbar.php'; ?>
                    </div>
                </nav>


                <section id="facts" style="padding:0px;"  class="wow fadeIn next">
                    <div class="container" style="margin-top: 85px; height: auto; margin-bottom: 10px;">

                        <div id="sectionConten" data-spy="scroll"> 

                            <nav class="navbar navbar-expand-lg navbar-light" style="border-radius: 0.5rem; background-color: #eee9f6;">
                                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor02" aria-controls="navbarColor02" aria-expanded="false" aria-label="Toggle navigation">
                                    <span class="navbar-toggler-icon"></span>
                                </button>

                                <div class="collapse navbar-collapse" id="navbarColor02">
                                    <ul class="navbar-nav mr-auto" id="items">
                                        <li class="nav-item active" id="itemenlCrearOs">
                                            <a class="nav-link enlace" id="enlCrearOs">Hoy</a>
                                        </li>
                                        <li class="nav-item" id="itemenlFormOrdenServ">
                                            <a class="nav-link enlace" id="enlFormOrdenServ">Manifiestos<span class="sr-only">(current)</span></a>
                                        </li>
                                        <li class="nav-item" id="itemenlSeguimiento">
                                            <a class="nav-link enlace" id="enlSeguimiento">Seguimiento</a>
                                        </li>
                                        <li class="nav-item" id="itemenlEnProceso">
                                            <a class="nav-link enlace" id="enlEnProceso">En proceso</a>
                                        </li>
                                    </ul>
                                </div>
                            </nav>

                            <div class="toast show border-primary col-lg-12 mt-2" role="alert" aria-live="assertive" aria-atomic="true" style="max-width: 100%; border-radius: 0.5rem;">
                                <div class="toast-header"><strong class="mr-auto"><h5><?php echo $_SESSION["nombre_cli"]; ?></h5></strong><strong class="mr-auto text-lg-left"><h5>$ 150.000</h5></strong></div>
                                <div class="card-body"> 

                                    <div class="alert alert-dismissible alert-primary" style="border-radius: 0.5rem;">
                                        <div class="row">
                                            <div class="col-5">
                                                <h6 class="alert-heading text-nowrap">N° Envio: <b class="text-primary">10235</b></h6>
                                            </div>
                                            <div class="col-5">
                                                <button type="button" class="btn btn-primary btn-sm float-right">Gestión</button>
                                            </div>                                            
                                        </div>

                                        <table class="table table-hover table-sm table-responsive text-nowrap">
                                            <thead>
                                                <tr>
                                                    <th scope="col">Guia OP</th>
                                                    <th scope="col">Dirección</th>
                                                    <th scope="col">Nombre</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <th>40127476857</th>
                                                    <td>Carrera 11#84-09 piso 3y4 Bogota - TEAM</td>
                                                    <td>LUIS ALBERTO BOTERO / PRESIDENTE</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <div class="alert alert-dismissible alert-warning" style="border-radius: 0.5rem;">
                                        <h6 class="alert-heading">N° Envio: <b class="text-primary">10235</b></h6>
                                        <table class="table table-hover table-sm table-responsive text-nowrap">
                                            <thead>
                                                <tr>
                                                    <th scope="col">Guia OP</th>
                                                    <th scope="col">Dirección</th>
                                                    <th scope="col">Nombre</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <th>40127476857</th>
                                                    <td>Carrera 11#84-09 piso 3y4 Bogota - TEAM</td>
                                                    <td>LUIS ALBERTO BOTERO / PRESIDENTE</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <div class="alert alert-dismissible alert-success" style="border-radius: 0.5rem;">
                                        <h6 class="alert-heading">N° Envio: <b class="text-primary">10235</b></h6>
                                        <table class="table table-hover table-sm table-responsive text-nowrap">
                                            <thead>
                                                <tr>
                                                    <th scope="col">Guia OP</th>
                                                    <th scope="col">Dirección</th>
                                                    <th scope="col">Nombre</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <th class="text-success">40127476857</th>
                                                    <td>Carrera 11#84-09 piso 3y4 Bogota - TEAM</td>
                                                    <td>LUIS ALBERTO BOTERO / PRESIDENTE</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>

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