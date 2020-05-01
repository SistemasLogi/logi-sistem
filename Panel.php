<!-- 
* Copyright 2016 Carlos Eduardo Alfaro Orellana
-->
<!DOCTYPE html>
<html lang="es">
    <head>
        <meta http-equiv="Content-type" content="text/html; charset=utf-8">
        <title>LOGI</title>
        <meta content="width=device-width, initial-scale=1.0" name="viewport">

        <!-- Google Fonts -->
        <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,300i,400,400i,700,700i|Montserrat:300,400,500,700" rel="stylesheet">

        <!-- Favicons -->
        <link href="img/logos/LOGO-ESTILO-icon.ico" rel="icon">
        <link href="img/apple-touch-icon.png" rel="apple-touch-icon">

        <!-- Bootstrap CSS File -->
        <link href="lib/bootstrap/css/bootstrap.css" rel="stylesheet">
        <link href="lib/bootstrap/css/bootstrap.min.css" rel="stylesheet" type="text/css"/>

        <!-- Libraries CSS Files -->
        <link href="css/dataTables.bootstrap4.min.css" rel="stylesheet" type="text/css"/>
        <link href="css/responsive.bootstrap4.min.css" rel="stylesheet" type="text/css"/>

        <!-- Normalize CSS -->
        <link rel="stylesheet" href="css/normalize.css">

        <!-- Materialize CSS -->
        <!--<link rel="stylesheet" href="css/materialize.min.css">-->

        <!-- Material Design Iconic Font CSS -->
        <link rel="stylesheet" href="css/material-design-iconic-font.min.css">

        <!-- Malihu jQuery custom content scroller CSS -->
        <link rel="stylesheet" href="css/jquery.mCustomScrollbar.css">

        <!-- Sweet Alert CSS -->
        <link rel="stylesheet" href="css/sweetalert.css">

        <!-- Main Stylesheet File -->
        <link href="css/my_style.css" rel="stylesheet" type="text/css"/>
        <link href="js/css/alertify.css" rel="stylesheet" type="text/css"/>
        <link href="js/css/themes/default.min.css" rel="stylesheet" type="text/css"/>

        <!-- MaterialDark CSS -->
        <link rel="stylesheet" href="css/style_dashboard.css">
    </head>
    <body>
        <!-- Nav Lateral -->
        <section class="NavLateral full-width">
            <div class="NavLateral-FontMenu full-width ShowHideMenu"></div>
            <div class="NavLateral-content full-width">
                <header class="NavLateral-title full-width center-align">
                    <img src="img/logos/ampliado.png" alt="" title="" /><i class="zmdi zmdi-close NavLateral-title-btn ShowHideMenu"></i>
                </header>
                <figure class="full-width NavLateral-logo">
                    <img src="assets/img/logo.png" alt="material-logo" class="responsive-img center-box">
                    <figcaption class="center-align">Herramientas de Administración</figcaption>
                </figure> 
                <div class="NavLateral-Nav">
                    <ul class="full-width">
                        <li>
                            <a href="#" class="NavLateral-DropDown  waves-effect waves-light"><i class="zmdi zmdi-folder-person zmdi-hc-fw"></i> <i class="zmdi zmdi-chevron-down NavLateral-CaretDown"></i>CLIENTE</a>
                            <ul class="full-width">
                                <li><a href="#" id="link_form_cliente" class="waves-effect waves-light">Nuevo / Editar</a></li>
                                <li class="NavLateralDivider"></li>
                                <li><a href="table.html" class="waves-effect waves-light">Table</a></li>
                            </ul>
                        </li>
                        <li class="NavLateralDivider"></li>
                        <li>
                            <a href="#" class="NavLateral-DropDown  waves-effect waves-light"><i class="zmdi zmdi-widgets zmdi-hc-fw"></i> <i class="zmdi zmdi-chevron-down NavLateral-CaretDown"></i> Components</a>
                            <ul class="full-width">
                                <li><a href="button.html" class="waves-effect waves-light">Button</a></li>
                                <li class="NavLateralDivider"></li>
                                <li><a href="form.html" class="waves-effect waves-light">Forms</a></li>
                            </ul>
                        </li>
                        <li class="NavLateralDivider"></li>
                        <li>
                            <a href="#" class="NavLateral-DropDown  waves-effect waves-light"><i class="zmdi zmdi-view-web zmdi-hc-fw"></i> <i class="zmdi zmdi-chevron-down NavLateral-CaretDown"></i> Sample Pages</a>
                            <ul class="full-width">
                                <li><a href="template.html" class="waves-effect waves-light">Blank Page</a></li>
                            </ul>
                        </li>   
                    </ul>
                </div>  
            </div>  
        </section>

        <!-- Page content -->
        <section class="ContentPage full-width">
            <!-- Nav Info -->
            <div class="ContentPage-Nav full-width navbarnavbar-dark bg-dark">
                <ul class="full-width">
                    <li class="btn-MobileMenu ShowHideMenu"><a href="#" class="tooltipped waves-effect waves-light" data-position="bottom" data-delay="50" data-tooltip="Menu"><i class="zmdi zmdi-more-vert"></i></a></li>
                    <li><figure><img src="assets/img/user.png" alt="UserImage"></figure></li>
                    <li style="padding:0 5px;">User Name</li>
                    <li><a href="#" class="tooltipped waves-effect waves-light btn-ExitSystem" data-position="bottom" data-delay="50" data-tooltip="Cerrar Sesion"><i class="zmdi zmdi-power"></i></a></li>
                    <!--<li><a href="#" class="tooltipped waves-effect waves-light btn-Search" data-position="bottom" data-delay="50" data-tooltip="Search"><i class="zmdi zmdi-search"></i></a></li>-->
                    <li><a href="index.php" class="tooltipped waves-effect waves-light btn-Home" data-position="bottom" data-delay="50" data-toggle="tooltip" data-placement="bottom" title="" data-original-title="Inicio"><i class="zmdi zmdi-home"></i></a></li>

                </ul>   
            </div>

            <div class="container margen_top">
                <div id="list-formCliente">
                    <!-- Tiles -->

                </div>
            </div>
            

            <!--             Footer    
                        <footer class="footer-MaterialDark">
                            <div class="NavLateralDivider"></div>
                            <div class="footer-copyright">
                                <div class="container center-align">
                                    © 2016 Carlos Eduardo Alfaro Orellana
                                </div>
                            </div>
                        </footer>-->
        </section>

        <!-- jQuery -->
        <script src="lib/jquery/jquery-3.3.1.js" type="text/javascript"></script>
        <script src="js/jquery.validate.js" type="text/javascript"></script>
        <script src="js/additional-methods.js" type="text/javascript"></script>
        <script src="js/localization/messages_es.js" type="text/javascript"></script>
        <script src="lib/bootstrap/js/bootstrap.bundle.min.js"></script>
        <script src="js/jquery.dataTables.min.js" type="text/javascript"></script>
        <script src="js/dataTables.bootstrap4.min.js" type="text/javascript"></script>
        <script src="js/dataTables.responsive.min.js" type="text/javascript"></script>
        <script src="js/responsive.bootstrap4.min.js" type="text/javascript"></script>
        <script src="js/custom.js" type="text/javascript"></script>
        <script src="js/alertify.js" type="text/javascript"></script>

        <!-- Sweet Alert JS -->
        <script src="js/sweetalert.min.js"></script>

        <!-- Materialize JS -->
        <!--<script src="js/materialize.min.js"></script>-->

        <!-- Malihu jQuery custom content scroller JS -->
        <script src="js/jquery.mCustomScrollbar.concat.min.js"></script>

        <!-- MaterialDark JS -->
        <script src="js/main_dashboard.js"></script>
    </body>
</html>