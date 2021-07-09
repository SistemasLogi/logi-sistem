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
        <script src="lib/jquery/jquery.min.js"></script>
        <script src="lib/jquery/jquery-migrate.min.js"></script>
        <script src="js/jquery.validate.js" type="text/javascript"></script>
        <script src="js/additional-methods.js" type="text/javascript"></script>
        <script src="js/localization/messages_es.js" type="text/javascript"></script>
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
        <script src="js/Contactenos/contactenos.js" type="text/javascript"></script>

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
                            <div class="carousel-background"><img src="img/intro-carousel/11.jpg" alt=""></div>
                            <div class="carousel-container">
                                <div class="carousel-content">
                                    <h2>Rastreo de Envios</h2>
                                    <p>Realiza un seguimiento del estado de tus envios desde nuestro portal web.</p>
                                    <a href="rastreo_envio.php" class="btn-get-started scrollto">Rastreo de Envios</a>
                                </div>
                            </div>
                        </div>

                        <div class="carousel-item">
                            <div class="carousel-background"><img src="img/intro-carousel/16.jpg" alt=""></div>
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
                                    <a href="#contact" class="btn-get-started scrollto">CONTACTA CON NOSOTROS</a>
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

                        <div class="col-lg-6 box">
                            <i class="ion-android-mail"></i>
                            <h4 class="title"><a href="img/services/LogiYA.jpg" data-lightbox="portfolio" data-title="LOGI YA!" class="link-preview" title="Preview">LOGI YA!</a></h4>
                            <p class="description">Recogemos tus envíos y los entregamos el mismo día. Servicio disponible únicamente en Bogotá, sujeto a restricciones.</p>
                        </div>

                        <div class="col-lg-6 box">
                            <i class="ion-ios-email"></i>
                            <h4 class="title"><a href="img/services/normal.jpg" data-lightbox="portfolio" data-title="MENSAJERIA NORMAL" class="link-preview" title="Preview">NORMAL</a></h4>
                            <p class="description">Recogemos tus envíos y los entregamos entre 1 o 2 días hábiles </p>
                        </div>

                    </div>
                </div>

            </section> <!--#featured-services -->

            <!--==========================
              About Us Section
            ============================-->
            <div id="logistica">
                <section id="about">
                    <div class="container">

                        <header class="section-header">
                            <h3>SERVICIOS</h3>
                            <!--<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>-->
                        </header>

                        <div class="row about-cols">

                            <div class="col-md-3 wow fadeInUp">
                                <div class="about-col">
                                    <div class="img">
                                        <img src="img/services/recaudo.png" alt="" class="img-fluid"/>
                                        <div class="icon"><i class="ion-ios-email-outline"></i></div>
                                    </div>
                                    <h2 class="title"><a style="cursor: pointer;">Mensajería</a></h2>
                                    <p>
                                        Servicio de envio de documentos o paquetes hasta 10 Kg de peso físico o volumen.
                                    </p>
                                </div>
                            </div>

                            <div class="col-md-3 wow fadeInUp" data-wow-delay="0.1s">
                                <div class="about-col">
                                    <div class="img">
                                        <img src="img/services/Mercancias.png" alt="" class="img-fluid"/>
                                        <div class="icon"><i class="ion-ios-box-outline"></i></div>
                                    </div>
                                    <h2 class="title"><a style="cursor: pointer;">Mercancías</a></h2>
                                    <p>
                                        Servicio ideal para envío de paquetes y mercancías con pesos de 11 hasta 40 kilogramos por unidad de empaque y con dimensiones máximas por arista de 4mts x 2mts x 2mts
                                    </p>
                                </div>
                            </div>

                            <div class="col-md-3 wow fadeInUp" data-wow-delay="0.2s">
                                <div class="about-col">
                                    <div class="img">
                                        <img src="img/services/Almacen.png" alt="" class="img-fluid"/>
                                        <div class="icon"><i class="ion-social-buffer-outline"></i></div>
                                    </div>
                                    <h2 class="title"><a style="cursor: pointer;">Almacenamiento</a></h2>
                                    <p>
                                        Servicio de almacenamiento de mercancías no abierto al público, dedicado al procesamiento de ventas online. 
                                    </p>
                                </div>
                            </div>

                            <div class="col-md-3 wow fadeInUp" data-wow-delay="0.3s">
                                <div class="about-col">
                                    <div class="img">
                                        <img src="img/services/fulfillment.jpg" alt="" class="img-fluid"/>
                                        <div class="icon"><i class="ion-ios-filing-outline"></i></div>
                                    </div>
                                    <h2 class="title"><a style="cursor: pointer;">Fulfillment</a></h2>
                                    <p>
                                        Procesamos y alistamos tus ventas con diferentes modalidades de embalaje ó empaque, etiquetado y entrega a operador. 
                                    </p>
                                </div>
                            </div>

                        </div>

                    </div>
                </section>
            </div>
            <!--==========================
              Services Section
            ============================-->

<!--            <section id="services">
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
                                <h4>Ceo &amp; Founder</h4>
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
                                <h4>Designer</h4>
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
                                <h4>Ceo &amp; Founder</h4>
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
                                <h4>Ceo &amp; Founder</h4>
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
                                <h4>Ceo &amp; Founder</h4>
                                <p>
                                    <img src="img/quote-sign-left.png" class="quote-sign-left" alt="">
                                    Por medio de este servicio recogemos tus envíos, y los entregamos en menos de 3 horas. Este servicio aplica únicamente en Bogotá y esta sujeto a restricciones en las localidades de Usme, Ciudad Bolívar, San Cristóbal y Rafael Uribe.
                                    <img src="img/quote-sign-right.png" class="quote-sign-right" alt="">
                                </p>
                            </div>
                        </section>

                    </div>

                </div>
            </section> #services -->

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
                    <p>Somos una empresa especializada en el sector logístico. Ofrecemos soluciones integrales para la entrega de sus envíos; contamos con la infraestructura física, tecnológica y humana, necesaria para brindar un servicio de alto nivel con tiempos de entrega mas rápidos.</p>
                    <p>Sabemos que no basta con tener buen producto y un buen precio, sino que se debe entregar cuando y como el cliente lo desee.</p> <!--<a class="cta-btn" href="#">Call To Action</a>-->
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
                    <h3>La clave es adaptarse rápidamente a las nuevas necesidades</h3>
                </div>



            </section><!-- #call-to-action -->
            <!--==========================
              Clients Section
            ============================-->
            <section id="testimonials" class="section-bg wow fadeInUp">
                <div class="container">

                    <header class="section-header">
                        <h3>MAS SERVICIOS</h3>
                        <!--                        <div class="testimonial-item">
                                                    <h4>conoce nuestros portafolio</h4>
                                                </div>-->

                    </header>

                    <div class="owl-carousel testimonials-carousel">

                        <div class="testimonial-item">
                            <img src="img/services/recaudo.png" class="testimonial-img" alt="">
                            <h3>Recaudos contra entrega</h3>
                            <!--<h4>Ceo &amp; Founder</h4>-->
                            <p>
                                <img src="img/quote-sign-left.png" class="quote-sign-left" alt="">
                                Tus clientes pueden pagar su compra al momento de recibir el envío. Nosotros recaudamos el dinero.
                                <img src="img/quote-sign-right.png" class="quote-sign-right" alt="">
                            </p>
                        </div>

                        <div class="testimonial-item">
                            <img src="img/services/service2.jpg" class="testimonial-img" alt="">
                            <h3>Mensajería masiva</h3>
                            <!--<h4>Designer</h4>-->
                            <p>
                                <img src="img/quote-sign-left.png" class="quote-sign-left" alt="">
                                Servicio de alistamiento y distribución de grandes volúmenes de envíos, con un peso máximo de hasta 350 gr por unidad.
                                <img src="img/quote-sign-right.png" class="quote-sign-right" alt="">
                            </p>
                        </div>

                        <div class="testimonial-item">
                            <img src="img/services/procesamiento.jpg" class="testimonial-img" alt="">
                            <h3>Procesamiento</h3>
                            <!--<h4>Store Owner</h4>-->
                            <p>
                                <img src="img/quote-sign-left.png" class="quote-sign-left" alt="">
                                Servicio de alistamiento y distribución de grandes volúmenes de envíos, con un peso máximo de hasta 350 gr por unidad y admitidos en una misma orden de servicio.
                                <img src="img/quote-sign-right.png" class="quote-sign-right" alt="">
                            </p>
                        </div>

                        <!--                        <div class="testimonial-item">
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
                                                </div>-->

                    </div>

                </div>
            </section>
            <!--==========================
              Skills Section
            ============================-->
<!--            <section id="skills">
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
            </section>-->

            <!--==========================
              Facts Section
            ============================-->
            <section id="facts"  class="wow fadeIn next">
                <div class="container">

                    <header class="section-header text-center">
                        <h3>Logística para ecommerce</h3>
                        <h2><b style="color: #550055;">Fulfillment</b></h2>
                    </header>

                    <div class="row about-cols">

                        <div class="col-md-4 wow fadeInUp" data-wow-delay="0.2s">
                            <div class="about-col">
                                <div class="img">
                                    <img src="img/services/ecomerce.png" alt="" class="img-fluid"/>
                                    <!--<div class="icon"><i class="ion-ios-eye-outline"></i></div>-->
                                </div>                               
                            </div>
                        </div>

                        <div class="col-md-8 wow fadeInUp">
                            <div class="about-col">
                                <div class="img">
                                    <!--<img src="img/about-mission.jpg" alt="" class="img-fluid">-->
                                    <!--<div class="icon"><i class="ion-ios-speedometer-outline"></i></div>-->
                                </div>
<!--                                <p>
                                    Lorem ipsum dolor sit amet, consectetur elit, sed do eiusmod tempor ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                </p>-->
                                <h4>
                                    <ul>
                                        <li type="disc">Cliente realiza la compra en el sitio web / recibimos la orden.</li>
                                        <li type="disc">Realizamos proceso de Picking and Packing.</li>
                                        <li type="disc">Enviamos a reparto el pedido.</li>
                                        <li type="disc">Recaudo del valor de la compra y entrega del producto al comprador.</li>
                                        <li type="disc">Logística inversa en caso de devoluciones y cambios.</li>
                                    </ul>
                                </h4>
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
                        <h3>YA SON MAS DE 15.000 ENVIOS MOVILIZADOS</h3>
                        <h4><p>Gracias a nuestros clientes por confiar en nosotros!</p></h4>
                    </header>

                    <div class="owl-carousel clients-carousel">
                        <img src="img/clients/8000123654.png" alt=""/>
                        <img src="img/clients/8005230014.png" alt=""/>
                        <img src="img/clients/900873298.png" alt=""/>
                        <img src="img/clients/900456987.png" alt=""/>
                        <img src="img/clients/900987412.png" alt=""/>
                        <img src="img/clients/8110286501.png" alt=""/>
                    </div>

                </div>
            </section>

            <!--==========================
              Team Section
            ============================-->
<!--            <section id="team">
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
            </section>-->

            <!--==========================
              Contact Section
            ============================-->
            <section id="contact" class="section-bg wow fadeInUp">
                <div class="container">

                    <div class="section-header">
                        <h3>CONTACTENOS</h3>
                        <h4><p>Dejanos un mensaje para saber en que te podemos ayudar, nos comunicaremos contigo lo antes posible.</p></h4>
                    </div>

                    <div class="row contact-info">

                        <div class="col-md-4">
                            <div class="contact-address">
                                <i class="ion-ios-location-outline"></i>
                                <h3>DIRECCIÓN</h3>
                                <address>CR 31 C N° 1 C - 31 Bogota D.C.</address>
                            </div>
                        </div>

                        <div class="col-md-4 embed-responsive embed-responsive-16by9">
                            <!--<div class="contact-phone">-->
                            <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d497.1202855374095!2d-74.10609525426453!3d4.600778186460162!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1ses!2sco!4v1609964748414!5m2!1ses!2sco" width="380" height="200" frameborder="0" style="border:0;" allowfullscreen="" aria-hidden="false" tabindex="0"></iframe>
                            <!--</div>-->
                        </div>

                        <div class="col-md-4">
                            <div class="contact-phone">
                                <i class="ion-ios-telephone-outline"></i>
                                <h3>TELÉFONO</h3>
                                <p><a href="tel:+0312695105"><em>+57(1)</em> 2695105</a></p>
                            </div>
                        </div>

                    </div>

                    <div class="form">
                        <form role="form" class="contactForm" id="formContactenos" name="formContactenos">
                            <div class="form-row">
                                <div class="form-group col-md-6">
                                    <input type="text" name="inputNombreCont" class="form-control" id="inputNombreCont" placeholder="Nombre o razón social"/>
                                </div>
                                <div class="form-group col-md-3">
                                    <input type="text" class="form-control" name="inputCiudad" id="inputCiudad" placeholder="Ciudad"/>
                                </div>
                                <div class="form-group col-md-3">
                                    <input type="text" class="form-control" name="inputTelefonoCont" id="inputTelefonoCont" placeholder="Télefono"/>
                                </div>
                            </div>
                            <div class="form-row">
                                <div class="form-group col-md-6">
                                    <input type="text" class="form-control" name="inputAsunto" id="inputAsunto" placeholder="Asunto"/>
                                </div>
                                <div class="form-group col-md-6">
                                    <input type="text" class="form-control" name="inputCorreroCont" id="inputCorreroCont" placeholder="Correo contacto"/>
                                </div>
                            </div>
                            <div class="form-group">
                                <textarea class="form-control" name="txaMensaje" id="txaMensaje" rows="5" placeholder="Mensaje"></textarea>
                            </div>
                            <div class="text-center"><button type="submit" id="btnEnviarCont" name="btnEnviarCont">ENVIAR</button></div>
                        </form>
                    </div>
                    <div id="mensajeContacto">

                    </div>

                </div>
            </section>

        </main>

        <?PHP require './footer.php'; ?>

    </body>
</html>
