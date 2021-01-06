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
        <script src="lib/jquery/jquery.min.js"></script>
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
        <script src="js/principal.js" type="text/javascript"></script>

        <!-- =======================================================
          Theme Name: BizPage
          Theme URL: https://bootstrapmade.com/bizpage-bootstrap-business-template/
          Author: BootstrapMade.com
          License: https://bootstrapmade.com/license/
        ======================================================= -->
    </head>

    <body>
        <?php // require './Navidad.php'; ?>
        <!--==========================
          Header
        ============================-->
        <nav class="navbar navbar-expand-lg navbar-dark bg-transparent fixed-top image-fondo" id="menu">
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <img id="inicio_img" src="img/logos/LOGO_OSCURO_157x73.png" alt=""/>
            <div class="collapse navbar-collapse" id="navbarColor01">
                <?php include './navbar.php'; ?>
            </div>
        </nav>
        <!--==========================
          Intro Section
        ============================-->
        <section id="intro">
            <div class="intro-container">
                <div id="introCarousel" class="carousel  slide carousel-fade" data-ride="carousel">

                    <ol class="carousel-indicators"></ol>

                    <div class="carousel-inner" role="listbox">

                        <div class="carousel-item active">
                            <div class="carousel-background"><img src="img/intro-carousel/10.jpg" alt=""></div>
                            <div class="carousel-container">
                                <div class="carousel-content">
                                    <h2>MENSAJERÍA Y MERCANCÍAS</h2>
                                    <h4><p>Somos el aliado logístico que estabas buscando</p></h4>
                                    <!--<a href="#featured-services" class="btn-get-started scrollto btn-primary">COTIZA TUS ENVIOS</a>-->
                                </div>
                            </div>
                        </div>

                        <div class="carousel-item">
                            <div class="carousel-background"><img src="img/intro-carousel/15.jpg" alt=""></div>
                            <div class="carousel-container">
                                <div class="carousel-content">
                                    <h2>¿Ya vendiste ? Ahora envialo!!!</h2>
                                    <h3><p class="text-secondary"><b>Mercancías</b></p></h3>
                                    <h3><p>Paquetes y mercancías de 11  kg  en adelante</p></h3>
                                    <!--<a href="#featured-services" class="btn-get-started-a scrollto">CONTACTA CON NOSOTROS</a>-->
                                </div>
                            </div>
                        </div>

                        <div class="carousel-item">
                            <div class="carousel-background"><img src="img/intro-carousel/3.jpg" alt=""></div>
                            <div class="carousel-container">
                                <div class="carousel-content">
                                    <h2>Recogemos y Entregamos</h2>
                                    <h5><p>Documentos, paquetes, cajas y mercancías en Bogotá y Medellín, con rapidez , cumplimiento y el debido cuidado que requieren tus envíos</p></h5>
                                    <a href="#featured-services" class="btn-get-started scrollto">CONTACTA CON NOSOTROS</a>
                                </div>
                            </div>
                        </div>

                        <div class="carousel-item">
                            <div class="carousel-background"><img src="img/intro-carousel/12.jpg" alt=""></div>
                            <div class="carousel-container">
                                <div class="carousel-content">
                                    <h2>¿Necesitas enviar varias comunicaciones o invitaciones? Somos tu solución!!!</h2>
                                    <!--<p>Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum.</p>-->
                                    <!--<a href="#featured-services" class="btn-get-started-b scrollto">CONTACTA CON NOSOTROS</a>-->
                                    <h3><p class="text-secondary"><b>Mensajería</b></p></h3>
                                    <h3><p>Documentos y Paquetes hasta  10 kg</p></h3>
                                </div>
                            </div>
                        </div>

                        <div class="carousel-item">
                            <div class="carousel-background"><img src="img/intro-carousel/5.jpg" alt=""></div>
                            <div class="carousel-container">
                                <div class="carousel-content">
                                    <h2>Recaudos contra entrega</h2>
                                    <p>Tus clientes pueden pagar su compra al momento de recibir el envío. Nosotros recaudamos el dinero.</p>
                                </div>
                            </div>
                        </div>

                        <div class="carousel-item">
                            <div class="carousel-background"><img src="img/intro-carousel/11.jpg" alt=""></div>
                            <div class="carousel-container">
                                <div class="carousel-content">
                                    <h2>Rastreo de Envios</h2>
                                    <p>Realiza un seguimiento del estado de tus envios desde nuestro portal web.</p>
                                    <a href="rastreo_envio.php" class="btn-get-started scrollto">Rastreo de Envios</a>
                                </div>
                            </div>
                        </div>

                    </div>

                    <a class="carousel-control-prev" href="#introCarousel" role="button" data-slide="prev">
                        <span class="carousel-control-prev-icon ion-chevron-left" aria-hidden="true"></span>
                        <span class="sr-only">Previous</span>
                    </a>

                    <a class="carousel-control-next" href="#introCarousel" role="button" data-slide="next">
                        <span class="carousel-control-next-icon ion-chevron-right" aria-hidden="true"></span>
                        <span class="sr-only">Next</span>
                    </a>

                </div>
            </div>
        </section><!-- #intro -->

        <main id="main">

            <!--==========================
              Featured Services Section
            ============================-->
            <section id="featured-services">
                <div class="container">
                    <div class="row">

                        <div class="col-lg-4 box">
                            <i class="ion-android-mail"></i>
                            <h4 class="title"><a href="img/services/Mensajero.png" data-lightbox="portfolio" data-title="LOGI YA!" class="link-preview" title="Preview">LOGI YA!</a></h4>
                            <p class="description">Recogemos tus envíos y los entregamos el mismo día. Servicio disponible únicamente en Bogotá, sujeto a restricciones.</p>
                        </div>

                        <div class="col-lg-4 box box-bg">
                            <i class="ion-ios-email"></i>
                            <h4 class="title"><a href="" data-lightbox="portfolio" data-title="MENSAJERIA NORMAL" class="link-preview" title="Preview">MENSAJERIA NORMAL</a></h4>
                            <p class="description">Recogemos tus envíos y los entregamos entre 1 o 2 días hábiles </p>
                        </div>

                        <div class="col-lg-4 box">
                            <i class="ion-ios-albums"></i>
                            <h4 class="title"><a href="" data-lightbox="portfolio" data-title="MENSAJERIA MASIVA" class="link-preview" title="Preview">MENSAJERÍA MASIVA</a></h4>
                            <p class="description"> Servicio de alistamiento y distribución de grandes volúmenes de envíos, con un peso máximo de hasta 350 gr por unidad. </p>
                        </div>

                    </div>
                </div>

            </section> <!--#featured-services -->

            <!--==========================
              About Us Section
            ============================-->
            <section id="about">
                <div class="container">

                    <header class="section-header">
                        <h3>LOGISTICA</h3>
                        <!--<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>-->
                    </header>

                    <div class="row about-cols">

                        <div class="col-md-3 wow fadeInUp">
                            <div class="about-col">
                                <div class="img">
                                    <img src="img/services/Mensajero.png" alt="" class="img-fluid"/>
                                    <div class="icon"><i class="ion-ios-email-outline"></i></div>
                                </div>
                                <h2 class="title"><a style="cursor: pointer;">Mensajería</a></h2>
                                <p>
                                    Servicio ideal para el envío de documentos o paquetes hasta 10 kilogramos de peso físico o peso volumen y con dimensiones máximas por arista de 50 cm
                                </p>
                            </div>
                        </div>

                        <div class="col-md-3 wow fadeInUp" data-wow-delay="0.1s">
                            <div class="about-col">
                                <div class="img">
                                    <img src="img/intro-carousel/14.jpg" alt="" class="img-fluid"/>
                                    <div class="icon"><i class="ion-ios-box-outline"></i></div>
                                </div>
                                <h2 class="title"><a style="cursor: pointer;">Mercancías</a></h2>
                                <p>
                                    Servicio ideal para envío de paquetes y mercancías con pesos de 11 hasta 200 kilogramos por unidad de empaque y con dimensiones máximas por arista de 4mts x 2mts x 2mts
                                </p>
                            </div>
                        </div>

                        <div class="col-md-3 wow fadeInUp" data-wow-delay="0.2s">
                            <div class="about-col">
                                <div class="img">
                                    <img src="img/intro-carousel/8.jpg" alt="" class="img-fluid"/>
                                    <div class="icon"><i class="ion-social-buffer-outline"></i></div>
                                </div>
                                <h2 class="title"><a style="cursor: pointer;">Almacenamiento</a></h2>
                                <p>
                                    Almacenamos y manejamos tu inventario. 
                                </p>
                            </div>
                        </div>

                        <div class="col-md-3 wow fadeInUp" data-wow-delay="0.3s">
                            <div class="about-col">
                                <div class="img">
                                    <img src="img/intro-carousel/13.png" alt="" class="img-fluid"/>
                                    <div class="icon"><i class="ion-ios-filing-outline"></i></div>
                                </div>
                                <h2 class="title"><a href="#">Procesamiento</a></h2>
                                <p>
                                    Procesamos y alistamos tus ventas con diferentes modalidades de embalaje y empaques
                                </p>
                            </div>
                        </div>

                    </div>

                </div>
            </section>

            <!--==========================
              Services Section
            ============================-->

            <section id="services">
                <div class="container">

                    <header class="section-header wow fadeInUp">
                        <h3>SERVICIOS</h3>
                        <h4><p>conoce nuestros portafolio</p></h4>
                    </header>

                    <div class="row">

                        <section id="testimonials" class="section-bg wow fadeInUp col-lg-4 col-center">
                            <div class="testimonial-item">
                                <img src="img/services/service1.jpg" class="testimonial-img testimonial-b-img" alt="">
                                <h3>MENSAJERÍA</h3>
                                <!--<h4>Ceo &amp; Founder</h4>-->
                                <p>
                                    <img src="img/quote-sign-left.png" class="quote-sign-left" alt="">
                                    Servicio ideal para el envío de documentos o paquetes de 1 hasta 5 kilogramos de peso físico o peso volumen y con dimensiones máximas por arista de 50 cm
                                    <img src="img/quote-sign-right.png" class="quote-sign-right" alt="">
                                </p>
                            </div>
                        </section>
                        <section id="testimonials" class="section-bg wow fadeInUp col-lg-4 col-center">
                            <div class="testimonial-item">
                                <img src="img/services/service2.jpg" class="testimonial-img" alt="">
                                <h3>MERCANCÍAS</h3>
                                <!--<h4>Designer</h4>-->
                                <p>
                                    <img src="img/quote-sign-left.png" class="quote-sign-left" alt="">
                                    Servicio ideal para envío de paquetes y mercancías con pesos de 6 hasta 200 kilogramos por unidad de empaque y con dimensiones máximas por arista de 4mts x 2mts x 2mts.
                                    <img src="img/quote-sign-right.png" class="quote-sign-right" alt="">
                                </p>
                            </div>
                        </section>
                        <section id="testimonials" class="section-bg wow fadeInUp col-lg-4 col-center">
                            <div class="testimonial-item">
                                <img src="img/services/service3.jpg" class="testimonial-img testimonial-a-img" alt="">
                                <h3>MENSAJERÍA MASIVA</h3>
                                <!--<h4>Ceo &amp; Founder</h4>-->
                                <p>
                                    <img src="img/quote-sign-left.png" class="quote-sign-left" alt="">
                                    Servicio de alistamiento y distribución de grandes volúmenes de envíos, con un peso máximo de hasta 350 gr por unidad y admitidos en una misma orden de servicio.
                                    <img src="img/quote-sign-right.png" class="quote-sign-right" alt="">
                                </p>
                            </div>
                        </section>
                        <section id="testimonials" class="section-bg wow fadeInUp col-lg-4 col-center">
                            <div class="testimonial-item">
                                <img src="img/services/service1.jpg" class="testimonial-img testimonial-c-img" alt="">
                                <h3>RADICACIÓN DOCUMENTOS</h3>
                                <!--<h4>Ceo &amp; Founder</h4>-->
                                <p>
                                    <img src="img/quote-sign-left.png" class="quote-sign-left" alt="">
                                    Servicio ideal para la radiación de sus documentos con una copia de ellos devuelta a sus instalaciones firmada y sellada por parte del destinatario.
                                    <img src="img/quote-sign-right.png" class="quote-sign-right" alt="">
                                </p>
                            </div>
                        </section>
                        <section id="testimonials" class="section-bg wow fadeInUp col-lg-4 col-center">
                            <div class="testimonial-item">
                                <img src="img/services/service1.jpg" class="testimonial-img testimonial-d-img" alt="">
                                <h3>SERVICIO EXPRESO</h3>
                                <!--<h4>Ceo &amp; Founder</h4>-->
                                <p>
                                    <img src="img/quote-sign-left.png" class="quote-sign-left" alt="">
                                    Por medio de este servicio recogemos tus envíos, y los entregamos en menos de 3 horas. Este servicio aplica únicamente en Bogotá y esta sujeto a restricciones en las localidades de Usme, Ciudad Bolívar, San Cristóbal y Rafael Uribe.
                                    <img src="img/quote-sign-right.png" class="quote-sign-right" alt="">
                                </p>
                            </div>
                        </section>

                    </div>

                </div>
            </section><!-- #services -->

            <!--==========================
              Call To Action Section
            ============================-->
            <section id="call-to-action" class="wow fadeIn">
                <div class="container text-center">

                    <header class="section-header">
                        <h3>NOSOTROS</h3>
                        <!--<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>-->
                    </header>
                    <h3>Nuestra pasión por el servicio nos identifica</h3>
                    <p>Somos una empresa especializada en el sector de la mensajería y el paqueteo. Buscamos brindar soluciones logísticas para la entrega de sus documentos y mercancías; contamos con la infraestructura física, tecnológica y humana, necesaria para prestar un servicio de óptima calidad. Nos enfocamos en el cumplimiento de los tiempos de entrega, en brindar información oportuna cuando se presenten novedades y en entregar sus envíos en perfecto estado</p>
                    <!--<a class="cta-btn" href="#">Call To Action</a>-->
                    <div class="row counters" id="voz">

                        <div class="col-lg-3 col-6 text-center">
                            <span data-toggle="counter-up">96</span><span>%</span>
                            <p>EFECTIVIDAD</p>
                        </div>

                        <div class="col-lg-3 col-6 text-center">
                            <span data-toggle="counter-up">94</span><span>%</span>
                            <p>RAPIDEZ</p>
                        </div>

                        <div class="col-lg-3 col-6 text-center">
                            <span data-toggle="counter-up">97</span><span>%</span>
                            <p>INFORMACIÓN</p>
                        </div>

                        <div class="col-lg-3 col-6 text-center">
                            <span data-toggle="counter-up">99</span><span>%</span>
                            <p>CUIDADO DE SUS ENVÍOS</p>
                        </div>

                    </div>

                </div>



            </section><!-- #call-to-action -->

            <!--==========================
              Skills Section
            ============================-->
            <section id="skills">
                <div class="container">

                    <header class="section-header">
                        <h3>Our Skills</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip</p>
                    </header>

                    <div class="skills-content">

                        <div class="progress">
                            <div class="progress-bar bg-success" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100">
                                <span class="skill">HTML <i class="val">100%</i></span>
                            </div>
                        </div>

                        <div class="progress">
                            <div class="progress-bar bg-info" role="progressbar" aria-valuenow="90" aria-valuemin="0" aria-valuemax="100">
                                <span class="skill">CSS <i class="val">90%</i></span>
                            </div>
                        </div>

                        <div class="progress">
                            <div class="progress-bar bg-warning" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100">
                                <span class="skill">JavaScript <i class="val">75%</i></span>
                            </div>
                        </div>

                        <div class="progress">
                            <div class="progress-bar bg-danger" role="progressbar" aria-valuenow="55" aria-valuemin="0" aria-valuemax="100">
                                <span class="skill">Photoshop <i class="val">55%</i></span>
                            </div>
                        </div>

                    </div>

                </div>
            </section>

            <!--==========================
              Facts Section
            ============================-->
            <section id="facts"  class="wow fadeIn next">
                <div class="container">

                    <header class="section-header">
                        <h3>YA SON MAS DE 10.000 ENVIOS MOVILIZADOS</h3>
                        <h4><p>Gracias a nuestros clientes por confiar en nosotros!</p></h4>
                    </header>
                    <!--
                                        <div class="facts-img">
                                            <img src="img/conten/35645645-300x300.png" alt="" class="img-fluid">
                                        </div>
                                        <div class="facts-img">
                                            <img src="img/conten/545642-300x300.png" alt="" class="img-fluid">
                                        </div>-->

                    <div class="row about-cols">

                        <div class="col-lg-6 wow fadeInUp mx-auto">
                            <div class="about-col ">
                                <div class="img text-center">
                                    <img src="img/conten/35645645-300x300.png" alt="" class="img-fluid">
                                    <!--<div class="icon"><i class="ion-ios-speedometer-outline"></i></div>-->
                                </div>
                                <!--                                <h2 class="title"><a href="#">Our Mission</a></h2>
                                                                <p>
                                                                    Lorem ipsum dolor sit amet, consectetur elit, sed do eiusmod tempor ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                                                </p>-->
                            </div>
                        </div>

                        <div class="col-lg-6 wow fadeInUp" data-wow-delay="0.1s">
                            <div class="about-col">
                                <div class="img text-center">
                                    <img src="img/conten/545642-300x300.png" alt="" class="img-fluid">
                                    <!--<div class="icon"><i class="ion-ios-list-outline"></i></div>-->
                                </div>
                                <!--                                <h2 class="title"><a href="#">Our Plan</a></h2>
                                                                <p>
                                                                    Sed ut perspiciatis unde omnis iste natus error sit voluptatem  doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
                                                                </p>-->
                            </div>
                        </div>  

                        <div class="col-lg-12 wow fadeInUp" data-wow-delay="0.2s">
                            <div class="about-col">
                                <div class="text-center">
                                    <h2 class="title text-center" style="font-weight: bold; padding-top: 20px;">RECOLECCIÓN SIN COSTO</h2>
                                </div>                              
                            </div>
                        </div>                

                    </div>                    
                </div>
            </section><!-- #facts -->

            <!--==========================
              Portfolio Section
            ============================-->
<!--            <section id="portfolio"  class="section-bg" >
                <div class="container">

                    <header class="section-header">
                        <h3 class="section-title">Our Portfolio</h3>
                    </header>

                    <div class="row">
                        <div class="col-lg-12">
                            <ul id="portfolio-flters">
                                <li data-filter="*" class="filter-active">All</li>
                                <li data-filter=".filter-app">App</li>
                                <li data-filter=".filter-card">Card</li>
                                <li data-filter=".filter-web">Web</li>
                            </ul>
                        </div>
                    </div>

                    <div class="row portfolio-container">

                        <div class="col-lg-4 col-md-6 portfolio-item filter-app wow fadeInUp">
                            <div class="portfolio-wrap">
                                <figure>
                                    <img src="img/portfolio/app1.jpg" class="img-fluid" alt="">
                                    <a href="img/portfolio/app1.jpg" data-lightbox="portfolio" data-title="App 1" class="link-preview" title="Preview"><i class="ion ion-eye"></i></a>
                                    <a href="#" class="link-details" title="More Details"><i class="ion ion-android-open"></i></a>
                                </figure>

                                <div class="portfolio-info">
                                    <h4><a href="#">App 1</a></h4>
                                    <p>App</p>
                                </div>
                            </div>
                        </div>

                        <div class="col-lg-4 col-md-6 portfolio-item filter-web wow fadeInUp" data-wow-delay="0.1s">
                            <div class="portfolio-wrap">
                                <figure>
                                    <img src="img/portfolio/web3.jpg" class="img-fluid" alt="">
                                    <a href="img/portfolio/web3.jpg" class="link-preview" data-lightbox="portfolio" data-title="Web 3" title="Preview"><i class="ion ion-eye"></i></a>
                                    <a href="#" class="link-details" title="More Details"><i class="ion ion-android-open"></i></a>
                                </figure>

                                <div class="portfolio-info">
                                    <h4><a href="#">Web 3</a></h4>
                                    <p>Web</p>
                                </div>
                            </div>
                        </div>

                        <div class="col-lg-4 col-md-6 portfolio-item filter-app wow fadeInUp" data-wow-delay="0.2s">
                            <div class="portfolio-wrap">
                                <figure>
                                    <img src="img/portfolio/app2.jpg" class="img-fluid" alt="">
                                    <a href="img/portfolio/app2.jpg" class="link-preview" data-lightbox="portfolio" data-title="App 2" title="Preview"><i class="ion ion-eye"></i></a>
                                    <a href="#" class="link-details" title="More Details"><i class="ion ion-android-open"></i></a>
                                </figure>

                                <div class="portfolio-info">
                                    <h4><a href="#">App 2</a></h4>
                                    <p>App</p>
                                </div>
                            </div>
                        </div>

                        <div class="col-lg-4 col-md-6 portfolio-item filter-card wow fadeInUp">
                            <div class="portfolio-wrap">
                                <figure>
                                    <img src="img/portfolio/card2.jpg" class="img-fluid" alt="">
                                    <a href="img/portfolio/card2.jpg" class="link-preview" data-lightbox="portfolio" data-title="Card 2" title="Preview"><i class="ion ion-eye"></i></a>
                                    <a href="#" class="link-details" title="More Details"><i class="ion ion-android-open"></i></a>
                                </figure>

                                <div class="portfolio-info">
                                    <h4><a href="#">Card 2</a></h4>
                                    <p>Card</p>
                                </div>
                            </div>
                        </div>

                        <div class="col-lg-4 col-md-6 portfolio-item filter-web wow fadeInUp" data-wow-delay="0.1s">
                            <div class="portfolio-wrap">
                                <figure>
                                    <img src="img/portfolio/web2.jpg" class="img-fluid" alt="">
                                    <a href="img/portfolio/web2.jpg" class="link-preview" data-lightbox="portfolio" data-title="Web 2" title="Preview"><i class="ion ion-eye"></i></a>
                                    <a href="#" class="link-details" title="More Details"><i class="ion ion-android-open"></i></a>
                                </figure>

                                <div class="portfolio-info">
                                    <h4><a href="#">Web 2</a></h4>
                                    <p>Web</p>
                                </div>
                            </div>
                        </div>

                        <div class="col-lg-4 col-md-6 portfolio-item filter-app wow fadeInUp" data-wow-delay="0.2s">
                            <div class="portfolio-wrap">
                                <figure>
                                    <img src="img/portfolio/app3.jpg" class="img-fluid" alt="">
                                    <a href="img/portfolio/app3.jpg" class="link-preview" data-lightbox="portfolio" data-title="App 3" title="Preview"><i class="ion ion-eye"></i></a>
                                    <a href="#" class="link-details" title="More Details"><i class="ion ion-android-open"></i></a>
                                </figure>

                                <div class="portfolio-info">
                                    <h4><a href="#">App 3</a></h4>
                                    <p>App</p>
                                </div>
                            </div>
                        </div>

                        <div class="col-lg-4 col-md-6 portfolio-item filter-card wow fadeInUp">
                            <div class="portfolio-wrap">
                                <figure>
                                    <img src="img/portfolio/card1.jpg" class="img-fluid" alt="">
                                    <a href="img/portfolio/card1.jpg" class="link-preview" data-lightbox="portfolio" data-title="Card 1" title="Preview"><i class="ion ion-eye"></i></a>
                                    <a href="#" class="link-details" title="More Details"><i class="ion ion-android-open"></i></a>
                                </figure>

                                <div class="portfolio-info">
                                    <h4><a href="#">Card 1</a></h4>
                                    <p>Card</p>
                                </div>
                            </div>
                        </div>

                        <div class="col-lg-4 col-md-6 portfolio-item filter-card wow fadeInUp" data-wow-delay="0.1s">
                            <div class="portfolio-wrap">
                                <figure>
                                    <img src="img/portfolio/card3.jpg" class="img-fluid" alt="">
                                    <a href="img/portfolio/card3.jpg" class="link-preview" data-lightbox="portfolio" data-title="Card 3" title="Preview"><i class="ion ion-eye"></i></a>
                                    <a href="#" class="link-details" title="More Details"><i class="ion ion-android-open"></i></a>
                                </figure>

                                <div class="portfolio-info">
                                    <h4><a href="#">Card 3</a></h4>
                                    <p>Card</p>
                                </div>
                            </div>
                        </div>

                        <div class="col-lg-4 col-md-6 portfolio-item filter-web wow fadeInUp" data-wow-delay="0.2s">
                            <div class="portfolio-wrap">
                                <figure>
                                    <img src="img/portfolio/web1.jpg" class="img-fluid" alt="">
                                    <a href="img/portfolio/web1.jpg" class="link-preview" data-lightbox="portfolio" data-title="Web 1" title="Preview"><i class="ion ion-eye"></i></a>
                                    <a href="#" class="link-details" title="More Details"><i class="ion ion-android-open"></i></a>
                                </figure>

                                <div class="portfolio-info">
                                    <h4><a href="#">Web 1</a></h4>
                                    <p>Web</p>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>
            </section>-->

            <!--==========================
              Clients Section
            ============================-->
            <section id="clients" class="wow fadeInUp">
                <div class="container">

                    <header class="section-header">
                        <h3>Our Clients</h3>
                    </header>

                    <div class="owl-carousel clients-carousel">
                        <img src="img/clients/client-1.png" alt="">
                        <img src="img/clients/client-2.png" alt="">
                        <img src="img/clients/client-3.png" alt="">
                        <img src="img/clients/client-4.png" alt="">
                        <img src="img/clients/client-5.png" alt="">
                        <img src="img/clients/client-6.png" alt="">
                        <img src="img/clients/client-7.png" alt="">
                        <img src="img/clients/client-8.png" alt="">
                    </div>

                </div>
            </section>

            <!--==========================
              Clients Section
            ============================-->
            <section id="testimonials" class="section-bg wow fadeInUp">
                <div class="container">

                    <header class="section-header">
                        <h3>SERVICIOS</h3>
                        <div class="testimonial-item">
                            <h4>conoce nuestros portafolio</h4>
                        </div>

                    </header>

                    <div class="owl-carousel testimonials-carousel">

                        <div class="testimonial-item">
                            <img src="img/services/service1.jpg" class="testimonial-img" alt="">
                            <h3>MENSAJERÍA</h3>
                            <h4>Ceo &amp; Founder</h4>
                            <p>
                                <img src="img/quote-sign-left.png" class="quote-sign-left" alt="">
                                Servicio ideal para el envío de documentos o paquetes de 1 hasta 5 kilogramos de peso físico o peso volumen y con dimensiones máximas por arista de 50 cm
                                <img src="img/quote-sign-right.png" class="quote-sign-right" alt="">
                            </p>
                        </div>

                        <div class="testimonial-item">
                            <img src="img/services/service2.jpg" class="testimonial-img" alt="">
                            <h3>MERCANCÍAS</h3>
                            <h4>Designer</h4>
                            <p>
                                <img src="img/quote-sign-left.png" class="quote-sign-left" alt="">
                                Servicio ideal para envío de paquetes y mercancías con pesos de 6 hasta 200 kilogramos por unidad de empaque y con dimensiones máximas por arista de 4mts x 2mts x 2mts.
                                <img src="img/quote-sign-right.png" class="quote-sign-right" alt="">
                            </p>
                        </div>

                        <div class="testimonial-item">
                            <img src="img/testimonial-3.jpg" class="testimonial-img" alt="">
                            <h3>MENSAJERÍA MASIVA</h3>
                            <h4>Store Owner</h4>
                            <p>
                                <img src="img/quote-sign-left.png" class="quote-sign-left" alt="">
                                Servicio de alistamiento y distribución de grandes volúmenes de envíos, con un peso máximo de hasta 350 gr por unidad y admitidos en una misma orden de servicio.
                                <img src="img/quote-sign-right.png" class="quote-sign-right" alt="">
                            </p>
                        </div>

                        <div class="testimonial-item">
                            <img src="img/testimonial-4.jpg" class="testimonial-img" alt="">
                            <h3>Matt Brandon</h3>
                            <h4>Freelancer</h4>
                            <p>
                                <img src="img/quote-sign-left.png" class="quote-sign-left" alt="">
                                Fugiat enim eram quae cillum dolore dolor amet nulla culpa multos export minim fugiat minim velit minim dolor enim duis veniam ipsum anim magna sunt elit fore quem dolore labore illum veniam.
                                <img src="img/quote-sign-right.png" class="quote-sign-right" alt="">
                            </p>
                        </div>

                        <div class="testimonial-item">
                            <img src="img/testimonial-5.jpg" class="testimonial-img" alt="">
                            <h3>John Larson</h3>
                            <h4>Entrepreneur</h4>
                            <p>
                                <img src="img/quote-sign-left.png" class="quote-sign-left" alt="">
                                Quis quorum aliqua sint quem legam fore sunt eram irure aliqua veniam tempor noster veniam enim culpa labore duis sunt culpa nulla illum cillum fugiat legam esse veniam culpa fore nisi cillum quid.
                                <img src="img/quote-sign-right.png" class="quote-sign-right" alt="">
                            </p>
                        </div>

                    </div>

                </div>
            </section>

            <!--==========================
              Team Section
            ============================-->
            <section id="team">
                <div class="container">
                    <div class="section-header wow fadeInUp">
                        <h3>Team</h3>
                        <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque</p>
                    </div>

                    <div class="row">

                        <div class="col-lg-3 col-md-6 wow fadeInUp">
                            <div class="member">
                                <img src="img/team-1.jpg" class="img-fluid" alt="">
                                <div class="member-info">
                                    <div class="member-info-content">
                                        <h4>Walter White</h4>
                                        <span>Chief Executive Officer</span>
                                        <div class="social">
                                            <a href=""><i class="fa fa-twitter"></i></a>
                                            <a href=""><i class="fa fa-facebook"></i></a>
                                            <a href=""><i class="fa fa-google-plus"></i></a>
                                            <a href=""><i class="fa fa-linkedin"></i></a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay="0.1s">
                            <div class="member">
                                <img src="img/team-2.jpg" class="img-fluid" alt="">
                                <div class="member-info">
                                    <div class="member-info-content">
                                        <h4>Sarah Jhonson</h4>
                                        <span>Product Manager</span>
                                        <div class="social">
                                            <a href=""><i class="fa fa-twitter"></i></a>
                                            <a href=""><i class="fa fa-facebook"></i></a>
                                            <a href=""><i class="fa fa-google-plus"></i></a>
                                            <a href=""><i class="fa fa-linkedin"></i></a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay="0.2s">
                            <div class="member">
                                <img src="img/team-3.jpg" class="img-fluid" alt="">
                                <div class="member-info">
                                    <div class="member-info-content">
                                        <h4>William Anderson</h4>
                                        <span>CTO</span>
                                        <div class="social">
                                            <a href=""><i class="fa fa-twitter"></i></a>
                                            <a href=""><i class="fa fa-facebook"></i></a>
                                            <a href=""><i class="fa fa-google-plus"></i></a>
                                            <a href=""><i class="fa fa-linkedin"></i></a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay="0.3s">
                            <div class="member">
                                <img src="img/team-4.jpg" class="img-fluid" alt="">
                                <div class="member-info">
                                    <div class="member-info-content">
                                        <h4>Amanda Jepson</h4>
                                        <span>Accountant</span>
                                        <div class="social">
                                            <a href=""><i class="fa fa-twitter"></i></a>
                                            <a href=""><i class="fa fa-facebook"></i></a>
                                            <a href=""><i class="fa fa-google-plus"></i></a>
                                            <a href=""><i class="fa fa-linkedin"></i></a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>
            </section>

            <!--==========================
              Contact Section
            ============================-->
            <section id="contact" class="section-bg wow fadeInUp">
                <div class="container">

                    <div class="section-header">
                        <h3>Contact Us</h3>
                        <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque</p>
                    </div>

                    <div class="row contact-info">

                        <div class="col-md-4">
                            <div class="contact-address">
                                <i class="ion-ios-location-outline"></i>
                                <h3>Address</h3>
                                <address>A108 Adam Street, NY 535022, USA</address>
                            </div>
                        </div>

                        <div class="col-md-4">
                            <div class="contact-phone">
                                <i class="ion-ios-telephone-outline"></i>
                                <h3>Phone Number</h3>
                                <p><a href="tel:+155895548855">+1 5589 55488 55</a></p>
                            </div>
                        </div>

                        <div class="col-md-4">
                            <div class="contact-email">
                                <i class="ion-ios-email-outline"></i>
                                <h3>Email</h3>
                                <p><a href="mailto:info@example.com">info@example.com</a></p>
                            </div>
                        </div>

                    </div>

                    <div class="form">
                        <div id="sendmessage">Your message has been sent. Thank you!</div>
                        <div id="errormessage"></div>
                        <form action="" method="post" role="form" class="contactForm">
                            <div class="form-row">
                                <div class="form-group col-md-6">
                                    <input type="text" name="name" class="form-control" id="name" placeholder="Your Name" data-rule="minlen:4" data-msg="Please enter at least 4 chars" />
                                    <div class="validation"></div>
                                </div>
                                <div class="form-group col-md-6">
                                    <input type="email" class="form-control" name="email" id="email" placeholder="Your Email" data-rule="email" data-msg="Please enter a valid email" />
                                    <div class="validation"></div>
                                </div>
                            </div>
                            <div class="form-group">
                                <input type="text" class="form-control" name="subject" id="subject" placeholder="Subject" data-rule="minlen:4" data-msg="Please enter at least 8 chars of subject" />
                                <div class="validation"></div>
                            </div>
                            <div class="form-group">
                                <textarea class="form-control" name="message" rows="5" data-rule="required" data-msg="Please write something for us" placeholder="Message"></textarea>
                                <div class="validation"></div>
                            </div>
                            <div class="text-center"><button type="submit">Send Message</button></div>
                        </form>
                    </div>

                </div>
            </section>

        </main>

        <?PHP require './footer.php'; ?>

    </body>
</html>
