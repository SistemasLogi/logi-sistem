<!DOCTYPE html>

<html lang="en">

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
        <script src="js/main_dashboard.js" type="text/javascript"></script>

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

            <div class="bg-dark border-right" id="sidebar-wrapper" style="height: auto; margin-top: 75px;">
                <!--<div class="sidebar-heading">Start Bootstrap </div>-->
                <img src="img/logos/ampliado.png" alt="" title="" />
                <div class="dropdown-divider"></div>
                <h4 class="card-title" style="color: #D6D6D6;">CLIENTE</h4>
                <!--<div class="dropdown-divider"></div>-->

                <div class="list-group list-group-flush">
                    <a class="list-group-item list-group-item-action bg-dark nav-link dropdown-toggle" data-toggle="collapse" href="#multiCollapseExample1" role="button" aria-expanded="false" aria-controls="multiCollapseExample1">
                        <span class="ion-android-contact"></span>
                        CLIENTE
                    </a>
                    <div class="collapse multi-collapse" id="multiCollapseExample1">
                        <div class="card card-body alert-primary">
                            <a class="dropdown-item enlace" id="link_form_cliente">Nuevo</a>
                            <div class="dropdown-divider"></div>
                            <a class="dropdown-item enlace" id="link_form_editar">Editar</a>
                        </div>
                    </div>
                    <a class="list-group-item list-group-item-action bg-dark nav-link dropdown-toggle" data-toggle="collapse" href="#multiCollapseExample2" role="button" aria-expanded="false" aria-controls="multiCollapseExample1">
                        <span class="ion-folder"></span>
                        ADMINISTRAR BD
                    </a>
                    <div class="collapse multi-collapse" id="multiCollapseExample2">
                        <div class="card card-body alert-primary" id="adminbd">
                            <a class="dropdown-item enlace" bd="admin_ciudades">Ciudades</a>
                            <div class="dropdown-divider"></div>
                            <a class="dropdown-item enlace" bd="admin_tipo_doc">Tipo Documento</a>
                            <div class="dropdown-divider"></div>
                            <a class="dropdown-item enlace" bd="admin_tipo_serv">Tipo Servicio</a>
                            <div class="dropdown-divider"></div>
                            <a class="dropdown-item enlace" bd="admin_tipo_env">Tipo Envio</a>
                            <div class="dropdown-divider"></div>
                            <a class="dropdown-item enlace" bd="admin_estado_serv">Estado Servicio</a>
                            <div class="dropdown-divider"></div>
                            <a class="dropdown-item enlace" bd="admin_estado_env">Estado Envio</a>
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


                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>

                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <?php include './navbar.php'; ?>
                    </div>
                </nav>


                <section id="facts" style="padding:0px;"  class="wow fadeIn next">
                    <div class="container" style="margin-top: 85px; height: auto; margin-bottom: 10px;">

                        <div id="list-formCliente" data-spy="scroll">                                

                        </div>

                    </div>                        
                </section> 


            </div>
            <!-- /#page-content-wrapper -->

        </div>
    </body>

</html>