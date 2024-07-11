<?php
require_once "configuraciones.php";

$p=explode("/",$_GET['ver']);
if($p[0]=="listamonedas"){
$qwe=new Configuracion();
$qwe->listardivisas($p[1]);
}

?>