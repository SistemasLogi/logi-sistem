<!DOCTYPE html>
<?php
session_start();
if (!isset($_SESSION["cliente_a"])) {
    header("location:index.php");
}
?>
<html lang="es">
    <head>
        <?php include './lib_css_js.php'; ?>
        <script src="js/Cliente/cliente.js" type="text/javascript"></script>
    </head>

    <body>

        <!--==========================
          Header
        ============================-->
        <?php include './navbar.php'; ?>
        <!--==========================
          Facts Section
        ============================-->
        <section id="facts"  class="wow fadeIn next">
            <div class="container margen_top">

                <header class="section-header">
                    <h2><?php echo $_SESSION["nombre_cli"]; ?></h2>
                    <!--<h4><p>Gracias a nuestros clientes por confiar en nosotros!</p></h4>-->
                </header>

                <div class="row">
                    <div class="col-lg-12">
                        <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
                            <b class="navbar-brand">Menú</b>
                            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor03" aria-controls="navbarColor03" aria-expanded="false" aria-label="Toggle navigation">
                                <span class="navbar-toggler-icon"></span>
                            </button>

                            <div class="collapse navbar-collapse" id="navbarColor03">
                                <ul class="navbar-nav mr-auto">                                                                

                                    <li class = "nav-item">
                                        <a class="nav-link enlace" id="enlFormRecoleccion">Solicitar Recolección</a>
                                    </li> 
                                    <li class = "nav-item">
                                        <a class="nav-link enlace" id="enlFormInforme">Informe</a>
                                    </li> 
                                    <li class = "nav-item">
                                        <a class="nav-link enlace" id="enlPruebasEntrega">Pruebas</a>
                                    </li> 
                                    <li class = "nav-item">
                                        <a class="nav-link enlace" id="enlTarifas">Tarifas</a>
                                    </li> 
                                    <li class = "nav-item">
                                        <a class="nav-link enlace" id="enlIndicadores">Indicadores</a>
                                    </li> 

                                </ul>
                            </div>
                        </nav>
                        <!--seccion de menu lateral--> 
                    </div>  
                </div>

                <div class="row">
                    <div class="col-lg-12" id="sectionConten">

                    </div> 
                </div>

            </div>
        </section><!-- #facts -->

    </main>

    <?PHP // require './footer.php'; ?>

</body>
</html>
