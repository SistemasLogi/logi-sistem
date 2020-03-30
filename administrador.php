<!DOCTYPE html>
<?php
session_start();
if (!isset($_SESSION["adminlogi"])) {
    header("location:index.php");
}
?>
<html lang="es">
    <head>
        <?php include './lib_css_js.php'; ?>
        <script src="js/Admin_web/admin.js" type="text/javascript"></script>
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
                    <!--menu superior-->
                    <div class="col-lg-12">
                        <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
                            <b class="navbar-brand">Menú</b>
                            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor03" aria-controls="navbarColor03" aria-expanded="false" aria-label="Toggle navigation">
                                <span class="navbar-toggler-icon"></span>
                            </button>

                            <div class="collapse navbar-collapse" id="navbarColor03">
                                <ul class="navbar-nav mr-auto">
                                    <li class = "nav-item dropdown show"> 
                                        <a class="nav-link dropdown-toggle" data-toggle="dropdown" href="#" aria-expanded="false">Administrar BD</a>
                                        <div class="dropdown-menu" aria-labelledby="aplica" id="adminbd">
                                            <a class="dropdown-item enlace" bd="admin_ciudades">Ciudades</a>
                                            <a class="dropdown-item enlace" bd="admin_tipo_doc">Tipo Documento</a>
                                            <a class="dropdown-item enlace" bd="admin_tipo_serv">Tipo Servicio</a>
                                            <a class="dropdown-item enlace" bd="admin_tipo_env">Tipo Envio</a>
                                            <a class="dropdown-item enlace" bd="admin_estado_serv">Estado Servicio</a>
                                            <a class="dropdown-item enlace" bd="admin_estado_env">Estado Envio</a>
                                        </div> 
                                    </li>
                                    <li class = "nav-item dropdown show">
                                        <a class="nav-link dropdown-toggle" data-toggle="dropdown" href="#" aria-expanded="false">Aplicaciones</a>
                                        <div class="dropdown-menu" aria-labelledby="aplica">                                        
                                            <a class="dropdown-item enlace" href="http://190.253.237.34:8008/siesa/jsp/ag.jsp?s=Real" target="_self" id="enlSiesa">Autogestión</a>
                                        </div>
                                    </li>                              

                                    <li class = "nav-item">
                                        <a class="nav-link enlace" id="enlCliente">Cliente</a>
                                    </li>               
                                </ul>
                            </div>
                        </nav>
                        <!--seccion de menu lateral-->
                        <div class="col-lg-12" id="conten">

                        </div>  
                    </div>

                </div>
            </div>
        </section><!-- #facts -->

    </main>

    <?PHP // require './footer.php'; ?>

</body>
</html>
