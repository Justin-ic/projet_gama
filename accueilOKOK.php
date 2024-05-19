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
	<script type="text/javascript" src="style/js/bootstrapv5.0.2.min.js"></script>
	<link rel="stylesheet" type="text/css" href="style/css/bootstrap-5.0.2.min.css"> 
	<link rel="stylesheet" type="text/css" href="style/fontawesome/css/all.css"> 
	<link rel="stylesheet" type="text/css" href="style/css/style2.css"> 



<!-- 	<link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
     integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="crossorigin=""/>

      < !-- Make sure you put this AFTER Leaflet's CSS -- >
 	<script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"
     integrity="sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo="
     crossorigin=""></script> -->

     <!-- Cette version gère les demis-cercles -->
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.1.0/dist/leaflet.css" />
    <script src="https://unpkg.com/leaflet@1.1.0/dist/leaflet.js"></script>
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


	<div class="bordurex sidebar bg-white right" id="mySidebar">
		<div class="scrolbox">
			<div class="scrolbox-iner">
				<h2> Panneau de configuration</h2>
				<div class="d-flex align-items-center justify-content-center mt-3 ">
					<button class="btn btn-primary"  data-bs-toggle="modal" data-bs-target="#AjoutPilone" >Ajouter une antenne</button>
				</div>

				<!-- <div class="d-flex align-items-center justify-content-center bordure">
					<button class="btn btn-success p-1 detailBtn" onclick="ModifMarkers('')" >Modifier</button>
				</div> -->

				<div class="d-flex align-items-center justify-content-center mt-5">
					<span class="mcenter">
						<img src="style/fontawesome/marqueurs/buttonMtn.png" class="btnOp mx-2  active" id="togleMarkMtn"  title="Supprimmer l'opérateur" onclick="togleMarkers('mtn')">
						<br>MTN
					</span>
					<span class="mcenter">
						<img src="style/fontawesome/marqueurs/buttonMoov.png" class="btnOp mx-2 active" id="togleMarkMoov"  title="Supprimmer l'opérateur"onclick="togleMarkers('moov')">
						<br>MOOV
					</span>
					<span class="mcenter">
						<img src="style/fontawesome/marqueurs/buttonOrange.png" class="btnOp mx-2 active" id="togleMarkOrange" title="Supprimmer l'opérateur"onclick="togleMarkers('orange')">
						<br>Orange
					</span>
					<span class="mcenter">
						<img src="style/fontawesome/marqueurs/buttonOk.png" class="btnOp mx-2 active" id="togleMarkStop" title="Supprimmer tous les marqueurs"onclick="togleMarkers('stop')">
						<br>Stop
					</span>
				</div>
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





<!-- Modal Ajouter antenne-->
<div class="modal fade " id="AjoutPilone" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="false" style="z-index: 99001; " >
  <div class="modal-dialog modal-dialog-centered ">
    <div class="modal-content col-10">

    <form action="#" method="GET" id="myForm" class="">
        <div class="modal-header">
            <h1 class="modal-title fs-7 text-center" id="NPInscrit">Caractéristiques du pylône</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
        	
        	<div class="row">
        		<div class="col-6 form-group">
        			<b>Opérateur: <span class="text-danger">*</span></b>
        			<select class="form-control" required name="operateur">
        				<option selected disabled>Choisir...</option>
        				<option value="Orange">Orange</option>
        				<option value="mtn">MTN</option>
        				<option value="moov">MOOV</option>
        			</select>
        		</div>
        		<div class="col-6 form-group mb-3">
        			<label for="nomAntenne"><b>Nom antenne:</b></label>
        			<input class="form-control" name="nomAntenne" type="text" id="nomAntenne" aria-describedby="helpAntenne" placeholder="Nom antenne" required>
        			<small id="helpAntenne" class="form-text text-muted">Facultatif</small>
        		</div>
        	</div>



        	<div class="row">
        		<div class="col-6 form-group mb-3 mt-3">
        			<label for="localisation"><b>Localisation;</b></label>
        			<input class="form-control" name="localisation" type="text" id="localisation" aria-describedby="helpLocal" placeholder="Donnez la région" required>
        			<small id="helpLocal" class="form-text text-muted">Facultatif</small>
        		</div>


        		<div class="col-6 form-group mb-3 mt-3">
        			<label for="puissance"><b>Puissance Ant(dBm): <span class="text-danger">*</span></b></label>
        			<input class="form-control" name="puissance" type="number" step="0.01" min="0"  id="puissance" aria-describedby="" placeholder="Puissance" required>
        		</div>
        	</div>

        	

        	<div class="row">
        		<div class="col-6 form-group mb-3 mt-3">
        			<label for="longitude"><b>Longitude en Degré décimale (DD): <span class="text-danger">*</span></b></label>
        			<input class="form-control" name="longitude" type="number" step="0.000001" id="longitude" aria-describedby="" placeholder="Longitude" required>
        		</div>



        		<div class="col-6 form-group mb-3 mt-3">
        			<label for="latitude"><b>Latitude en Degré décimale (DD): <span class="text-danger">*</span></b></label>
        			<input class="form-control" name="latitude" type="number" step="0.000001" id="latitude" aria-describedby="" placeholder="Latitude" required>
        		</div>
        	</div>
        	

        	<div class="row">
        		<div class="col-6 form-group mb-3 mt-3">
        			<label for="hauteur"><b>Hauteur pylône(m) : <span class="text-danger">*</span></b></label>
        			<input class="form-control" name="hauteur" type="number" step="0.01" min="0" id="hauteur" aria-describedby="" placeholder="Hauteur" required>
        		</div>


        		<div class="col-6 form-group mb-3 mt-3">
        			<label for="frequence"><b>Fréquence(Mhz) : <span class="text-danger">*</span></b></label>
        			<input class="form-control" name="frequence" type="number" step="0.001" min="0" id="frequence" aria-describedby="" placeholder="Fréquence" required>
        		</div>
        	</div>

        	
        	<div class="row">

        		<div class="col-6 form-group mb-3 mt-3">
        			<div class="form-group">
        				<b>Type de la zone: <span class="text-danger">*</span></b>
        				<select class="form-control" required name="typeZone">
        					<option  selected disabled >Choisir...</option>
        					<option value="urbinDense">Urbaine dense</option>
        					<option value="urbaine">Urbaine</option>
        					<option value="subUrbaine">Périurbaine</option>
        					<option value="rurale">Rurale</option>
        					<option value="montagneuseA">Type A: Montagneuse avec lourde densité d'arbres</option>
        					<option value="montagneuseB">Type B: Vallonné avec densité modérée d'arbres</option>
        					<option value="montagneuseC">Type C: Terrain plat avec densité d'arbres</option>
        				</select>
        			</div>
        		</div>

        		<div class="col-6 form-group mb-3 mt-3">
        			<label for="nivSignal"><b>Nineau du signal souhaité (dBm) : <span class="text-danger">*</span></b></label>
        			<input class="form-control" name="nivSignal" type="number" step="0.01" min="-160" id="nivSignal" aria-describedby="" placeholder="Signal souhaité" required>
        		</div>

        	</div>

        </div>
        <div class="modal-footer">
        	<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fremer</button>
        	<button onclick="addAntenne()" type="button" class="btn btn-primary" data-bs-dismiss="modal">Valider</button>
        </div>
    </form><!-- fin form -->
    </div>
  </div>
</div>


<!-- Modal Modiffier antenne-->
<div class="modal fade " id="ModifPilone" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="false" style="z-index: 99001; " >
  <div class="modal-dialog modal-dialog-centered ">
    <div class="modal-content col-10">
<!-- <img src="texxium.png" alt=""> -->
    <form action="#" method="GET" id="myFormModif" class="">
        <div class="modal-header modifModal"> 
            <h1 class="modal-title fs-7 text-center" id="NPInscrit">Modiffiez le pylône</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
        	
        	<div class="row">
        		<div class="col-6 form-group">
        			<b>Opérateur: <span class="text-danger">*</span></b>
        			<select class="form-control" required name="M_operateur">
        				<option selected disabled>Choisir...</option>
        				<option value="orange">Orange</option>
        				<option value="mtn">MTN</option>
        				<option value="moov">MOOV</option>
        			</select>
        		</div>
        		<div class="col-6 form-group mb-3">
        			<label for="nomAntenne"><b>Nom antenne:</b></label>
        			<input class="form-control" name="M_nomAntenne" type="text" id="nomAntenne" aria-describedby="helpAntenne" placeholder="Nom antenne" required>
        			<small id="helpAntenne" class="form-text text-muted">Facultatif</small>
        		</div>
        	</div>



        	<div class="row">
        		<div class="col-6 form-group mb-3 mt-3">
        			<label for="localisation"><b>Localisation;</b></label>
        			<input class="form-control" name="M_localisation" type="text" id="localisation" aria-describedby="helpLocal" placeholder="Donnez la région" required>
        			<small id="helpLocal" class="form-text text-muted">Facultatif</small>
        		</div>


        		<div class="col-6 form-group mb-3 mt-3">
        			<label for="puissance"><b>Puissance Ant(dBm): <span class="text-danger">*</span></b></label>
        			<input class="form-control" name="M_puissance" type="number" step="0.01" min="0"  id="puissance" aria-describedby="" placeholder="Puissance" required>
        		</div>
        	</div>

        	

        	<div class="row">
        		<div class="col-6 form-group mb-3 mt-3">
        			<label for="longitude"><b>Longitude en Degré décimale (DD): <span class="text-danger">*</span></b></label>
        			<input class="form-control" name="M_longitude" type="number" step="0.000001" id="longitude" aria-describedby="" placeholder="Longitude" required>
        		</div>



        		<div class="col-6 form-group mb-3 mt-3">
        			<label for="latitude"><b>Latitude en Degré décimale (DD): <span class="text-danger">*</span></b></label>
        			<input class="form-control" name="M_latitude" type="number" step="0.000001" id="latitude" aria-describedby="" placeholder="Latitude" required>
        		</div>
        	</div>
        	

        	<div class="row">
        		<div class="col-6 form-group mb-3 mt-3">
        			<label for="hauteur"><b>Hauteur pylône(m) : <span class="text-danger">*</span></b></label>
        			<input class="form-control" name="M_hauteur" type="number" step="0.01" min="0" id="hauteur" aria-describedby="" placeholder="Hauteur" required>
        		</div>


        		<div class="col-6 form-group mb-3 mt-3">
        			<label for="frequence"><b>Fréquence(Mhz) : <span class="text-danger">*</span></b></label>
        			<input class="form-control" name="M_frequence" type="number" step="0.001" min="0" id="frequence" aria-describedby="" placeholder="Fréquence" required>
        		</div>
        	</div>

        	
        	<div class="row">

        		<div class="col-6 form-group mb-3 mt-3">
        			<div class="form-group">
        				<b>Type de la zone: <span class="text-danger">*</span></b>
        				<select class="form-control" required name="M_typeZone">
        					<option  selected disabled >Choisir...</option>
        					<option value="urbinDense">Urbaine dense</option>
        					<option value="urbaine">Urbaine</option>
        					<option value="subUrbaine">Périurbaine</option>
        					<option value="rurale">Rurale</option>
        					<option value="montagneuseA">Montagneuse avec lourde densité d'arbres</option>
        					<option value="montagneuseB">Vallonné avec densité modérée d'arbres</option>
        					<option value="montagneuseC">Terrain plat avec densité d'arbres</option>
        				</select>
        			</div>
        		</div>

        		<div class="col-6 form-group mb-3 mt-3">
        			<label for="nivSignal"><b>Nineau du signal souhaité (dBm) : <span class="text-danger">*</span></b></label>
        			<input class="form-control" name="M_nivSignal" type="number" step="0.01" min="-160" id="nivSignal" aria-describedby="" placeholder="Signal souhaité" required>
        		</div>

        	</div>

        </div>
        <input  type="hidden" name="idMarker" type="number"  required>
        <div class="modal-footer">
        	<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fremer</button>
        	<button onclick="ModifAntenne()" type="button" class="btn btn-primary" data-bs-dismiss="modal">Modifier</button>
        </div>
    </form><!-- fin form -->
    </div>
  </div>
</div>



	<script type="text/javascript">
		/*function togleNavOK() {
			document.getElementById("mySidebar").style.width = "0px";
			document.getElementById("main").style.marginLeft = "0px";
		}*/


function addAntenne() {
	 var operateur = document.getElementsByName("operateur");
	 var nomAntenne = document.getElementsByName("nomAntenne");
	 var localisation = document.getElementsByName("localisation");
	 var puissance = document.getElementsByName("puissance");
	 var longitude = document.getElementsByName("longitude");
	 var latitude = document.getElementsByName("latitude");
	 var hauteur = document.getElementsByName("hauteur");
	 var frequence = document.getElementsByName("frequence");
	 var typeZone = document.getElementsByName("typeZone");
	 var nivSignal = document.getElementsByName("nivSignal");
	 // console.log("operateur="+operateur[0].value+" nomAntenne="+nomAntenne[0].value+" localisation="+localisation[0].value+" puissance="+puissance[0].value+" longitude="+longitude[0].value+" latitude="+latitude[0].value+" hauteur="+hauteur[0].value+" frequence="+frequence[0].value+" typeZone"+typeZone[0].value);
     setMarker(operateur[0].value,2,nomAntenne[0].value,localisation[0].value,hauteur[0].value,0,0,longitude[0].value,latitude[0].value,puissance[0].value,frequence[0].value,typeZone[0].value,nivSignal[0].value);
}



 // setMarker(operateur,idMarker=null,nom=null,location,height,tilt=null,azimuth=null,Long,Lat,P,frequence,TypeZone){
  


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
		$('#main').css('margin-left', "calc(10% + 30px)");

		$('.fa-angle-right').addClass("fa-angle-left");
		$('.fa-angle-left').removeClass('fa-angle-right');

		$('#mySidebar').removeClass('left');
		$('#mySidebar').addClass('right');
	  


		if($(window).width() >= 990){
			$('#main').css('margin-left', "calc(10% + 30px)");
			$('#midle-button').css('left', "30%");
			$('.sidebar').css('width', "30%");

	     }else if ($(window).width() > 500 && $(window).width() < 990) {
	     	$('#mySidebar').css('width', "50%");
			
			$('#midle-button').css('left', "calc(50% - 30px)");
	     }else {
	     	$('#mySidebar').css('width', "calc(100% - 30px)");
			
			$('#midle-button').css('left', "calc(100% - 30px)");
			console.log("dans 730");
	     }

	}

}


if($(window).width() < 990){
	const side = document.getElementById("mySidebar");
	if (side.classList.contains('right')) {
		$('#mySidebar').css('width', "0px");
		$('#main').css('margin-left', "30px");

		$('.fa-angle-left').addClass("fa-angle-right");
		$('.fa-angle-right').removeClass('fa-angle-left');

		$('#mySidebar').removeClass('right');
		$('#mySidebar').addClass('left');
		$('#midle-button').css('left', "0px");
	}
}else{
	$('.sidebar').css('width', "30%");
	$('#midle-button').css('left', "30%");
	$('#main').css('margin-left', "calc(10% + 30px)");
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

  <script type="text/javascript" src="style/js/popper.min.js"></script> 


</body>
</html>


<!-- 



 -->