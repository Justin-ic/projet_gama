<?php 

// Gestion marqueurs
/*$URL_Marqueur="style/fontawesome/marqueurs/marqueurData.txt";

if (!file_exists($URL_Marqueur)) {
	$myfile = fopen($URL_Marqueur, "w");
	fclose($myfile);
}

$contenu = file_get_contents($URL_Marqueur);

$URL_dossier = str_replace("/marqueurData.txt", "", $URL_Marqueur);
*/



$URL_dossier = "style/fontawesome/marqueurs";
$scandir = scandir($URL_dossier,1);
foreach($scandir as $fichier){
	$fichier = strtolower($fichier);
	if (strpos($fichier,".jpg") || strpos($fichier,".png")) {
		$extension_nom = explode(".",$fichier);
		$size = getimagesize($URL_dossier."/".$fichier);
		
		$dataMarqueur[$extension_nom[0]] = array("width"=>$size[0], "height"=>$size[1],"extension"=>"$extension_nom[1]");
	}
  
}?>

<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>TEXXIUM</title>
	<link rel="icon" type="image/png" href="texxium.png"/>

	<script type="text/javascript" src="style/js/jQuery_v2_2_3.js"></script>
	<script type="text/javascript" src="style/js/bootstrap.min.js"></script>
	<link rel="stylesheet" type="text/css" href="style/css/bootstrap-5.0.2.min.css"> 
	<link rel="stylesheet" type="text/css" href="style/fontawesome/css/all.css"> 
	<link rel="stylesheet" type="text/css" href="style/css/style2.css"> 

<!-- 	<link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
     integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="crossorigin=""/>

      < !-- Make sure you put this AFTER Leaflet's CSS -- >
 	<script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"
     integrity="sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo="
     crossorigin=""></script> -->
<img src="http://localhost/storage/sliders/March2024/4905KPyKatzeEljDv56d.jpg" style="width:100px">

     <!-- Cette version gère les demis-cercles -->
     <link rel="stylesheet" href="https://unpkg.com/leaflet@1.1.0/dist/leaflet.css" />
    <script src="https://unpkg.com/leaflet@1.1.0/dist/leaflet.js"></script>

    <!--  <link rel="stylesheet" href="style/css//leaflet.css" />
    <script src="style/js/leaflet.js"></script> -->
    
    <script src="style/js/Semicircle.js"></script>

</head>
<body>
	

	<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
		<div class="container-fluid">
			<a class="navbar-brand" href="#"><img src="texxium.png" class="logo d-flex align-items-center" alt="texxium logo"></a>
			<button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarScroll" aria-controls="navbarScroll" aria-expanded="false" aria-label="Toggle navigation">
				<span class="navbar-toggler-icon"></span>
			</button>
			<div class="collapse navbar-collapse" id="navbarScroll">
				<ul class="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll" style="--bs-scroll-height: 100px;">
					<li class="nav-item">
						<a class="nav-link active" aria-current="page" href="#">Home</a>
					</li>
					<li class="nav-item">
						<a class="nav-link" href="#">Link</a>
					</li>
					<li class="nav-item dropdown">
						<a class="nav-link dropdown-toggle" href="#" id="navbarScrollingDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
							Link
						</a>
						<ul class="dropdown-menu" aria-labelledby="navbarScrollingDropdown">
							<li><a class="dropdown-item" href="#">Action</a></li>
							<li><a class="dropdown-item" href="#">Another action</a></li>
							<li><hr class="dropdown-divider"></li>
							<li><a class="dropdown-item" href="#">Something else here</a></li>
						</ul>
					</li>
					<li class="nav-item">
						<a class="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Link</a>
					</li>
				</ul>
				<form class="d-flex">
					<input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
					<button class="btn btn-outline-success" type="submit">Search</button>
				</form>
			</div>
		</div>
	</nav>


	<!-- <div class="bordure div-gauche bg-light right sidebar" id="mySidebar"> -->
	<div class="bordurex sidebar bg-white right" id="mySidebar">
		<div class="scrolbox">
			<div class="scrolbox-iner">
				
				<h2>Panneau de configuration</h2>
			</div>
		</div>
	</div>



	<div class=" midle-button bg-light bordurex d-flex justify-content-center align-items-center" onclick="togleNav()" id="midle-button">
		<span class="fas fa-angle-left h5" id="collapse-button"></span>
	</div>


	<div class="bg-primary bordurex sous-div-left" id="main">
		<div id="map"></div>
	</div>
<!-- <div id="map"></div> -->

<div id="img"></div>
	<script type="text/javascript">
		/*function togleNavOK() {
			document.getElementById("mySidebar").style.width = "0px";
			document.getElementById("main").style.marginLeft = "0px";
		}*/





function togleNav() {
	const side = document.getElementById("mySidebar");
	if (side.classList.contains('right')) {

	   $('#mySidebar').css('width', "0px");
	   $('#main').css('margin-left', "30px");

	   
       $('.fa-angle-left').addClass("fa-angle-right");
       $('.fa-angle-right').removeClass('fa-angle-left');

       $('#mySidebar').removeClass('right');
       $('#mySidebar').addClass('left');
       $('#midle-button').css('left', 0);

	}else{


	   $('#mySidebar').css('width', "30%");
	   $('#main').css('margin-left', "calc(10% + 30px)");


	   $('.fa-angle-right').addClass("fa-angle-left");
       $('.fa-angle-left').removeClass('fa-angle-right');

       $('#mySidebar').removeClass('left');
       $('#mySidebar').addClass('right');
       $('#midle-button').css('left', "30%");

	}

}





$(window).on('resize', function() {
    if($(window).width() < 990){
       

    $('#mySidebar').css('width', "0px");
	   $('#main').css('margin-left', "30px");

	   
       $('.fa-angle-left').addClass("fa-angle-right");
       $('.fa-angle-right').removeClass('fa-angle-left');

       $('#mySidebar').removeClass('right');
       $('#mySidebar').addClass('left');
       $('#midle-button').css('left', 0);
       

   }else{

   	$('#mySidebar').css('width', "30%");
	   $('#main').css('margin-left', "calc(10% + 30px)");


	   $('.fa-angle-right').addClass("fa-angle-left");
       $('.fa-angle-left').removeClass('fa-angle-right');

       $('#mySidebar').removeClass('left');
       $('#mySidebar').addClass('right');
       $('#midle-button').css('left', "30%");
   }
       
});



var dataMarqueur = <?=json_encode($dataMarqueur)?>;



	</script>
	<script type="text/javascript" src="style/js/main.js"></script>

</body>
</html>