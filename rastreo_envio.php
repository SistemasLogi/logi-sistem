<!DOCTYPE html>
<html lang="es">
    <head>
        <meta charset="utf-8">
        <title>LOGI</title>
        <meta content="width=device-width, initial-scale=1.0" name="viewport">
        <meta content="" name="keywords">
        <meta content="" name="description">

        <!-- Favicons -->
        <link href="img/logos/LOGO-ESTILO-icon.ico" rel="icon">
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
        <!--<script src="js/main.js"></script>-->
        <script src="js/Inicio_Sesion/login.js" type="text/javascript"></script>
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
            <img id="inicio" src="img/logos/LOGO-ESTILO-154x61.png" alt=""/>
            <div class="collapse navbar-collapse" id="navbarColor01">
                <?php include './navbar.php'; ?>
            </div>
        </nav>

        <!--==========================
          Facts Section
        ============================-->
        <section id="facts"  class="wow fadeIn next">
            <div class="container margen">

                <header class="section-header">
                    <h3>RASTREO ENVIO</h3>
                    <!--<h4><p>Gracias a nuestros clientes por confiar en nosotros!</p></h4>-->
                </header>

                <div class="row col-lg-12">
                    <div class="toast-body col-lg-12 row">        
                        <div class="alert alert-dismissible alert-secondary col-lg-12" style="border-radius: 0.5rem;">
                            <form class="form-inline my-2 my-lg-0 form-group-sm"  method="get" action="Controller/AdminC/AdministrarEnvios/consulta_est_env_get_controller.php" >                                    
                                <b>Buscar N° Envio :</b>
                                <input class="form-control form-control-sm mr-sm-2" type="number" id="inpBuscaNumEnv" name="inpBuscaNumEnv" placeholder="Buscar N°">
                                <button type="submit" class="btn btn-outline-primary btn-sm">BUSCAR</button>    
                            </form>
                            <h4>Envio N° <em id="etqNumEnv"></em></h4>
                            <div class="row">
                                <div class="alert alert-dismissible alert-warning col-lg-6">
                                    <h5><b>REMITE</b></h5>
                                    <p class="mb-0"><strong>NOMBRE: </strong><em id="nom_remite"></em></p>
                                    <p class="mb-0"><strong>DIRECCIÓN: </strong><em id="dir_remite"></em></p>
                                    <p class="mb-0"><strong>CIUDAD: </strong><em id="ciudad_remite"></em></p>
                                    <p class="mb-0"><strong>TEL: </strong><em id="tel_remite"></em></p>
                                </div>
                                <div class="alert alert-dismissible alert-primary col-lg-6">
                                    <h5><b>DESTINO</b></h5>
                                    <p class="mb-0"><strong>NOMBRE: </strong><em id="nom_destino"></em></p>
                                    <p class="mb-0"><strong>DIRECCIÓN: </strong><em id="dir_destino"></em></p>
                                    <p class="mb-0"><strong>CIUDAD: </strong><em id="ciudad_destino"></em></p>
                                    <p class="mb-0"><strong>TEL: </strong><em id="tel_destino"></em></p> 
                                </div>
                            </div>
                            <div class="col-lg-12 table-responsive">  
                                <table class="table table-hover text-center col-lg-12" id="tableSegEnv">
                                    <thead>
                                        <tr class="table-sm" id="titleEncaTab">

                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr class="table-sm" id="fechEst">

                                        </tr>
                                        <tr class="table-sm" id="horaEst">

                                        </tr>
                                        <tr>
                                            <td id="fila_bar" colspan="">
                                                <div class="progress" style="height:20px; border-radius: 0.7rem;">
                                                    <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" id="progress_bar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style="width: 1%"></div>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr class="table-secondary table-sm" id="icon_x_est_env">                       

                                        </tr>
                                        <tr class="table-sm" id="descEst">

                                        </tr>
                                    </tbody>
                                </table>
                            </div>


                            <div class="row" id="contAux">

                            </div>

                        </div>
                    </div>
                </div>

            </div>
        </section><!-- #facts -->

    </main>

    <?PHP require './footer.php'; ?>

</body>
</html>
