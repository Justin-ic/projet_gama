<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>Document</title>
	<script type="text/javascript" src="style/js/jQuery_v2_2_3.js"></script>
	<script type="text/javascript" src="style/js/bootstrap.min.js"></script>
	<link rel="stylesheet" type="text/css" href="style/css/bootstrap-5.0.2.min.css"> 
	<link rel="stylesheet" type="text/css" href="style/fontawesome/css/all.css"> 
	<link rel="stylesheet" type="text/css" href="style/css/style.css"> 

	<link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
     integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
     crossorigin=""/>

      <!-- Make sure you put this AFTER Leaflet's CSS -->
 <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"
     integrity="sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo="
     crossorigin=""></script>

</head>
<body>
	<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
		<div class="container-fluid">
			<a class="navbar-brand" href="#">Navbar scroll</a>
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
	

<div class="row bordurex divGlobale"> 
	
	<!-- <div class="bordure div-gauche bg-light right sidebar" id="mySidebar"> -->
	<div class="bordure sidebar" id="mySidebar">
		<div class="scrolbox">
			<div class="scrolbox-iner">
				
				ok ca marche <br>ok ca marche <br>ok ca marche <br>ok ca marche <br>ok ca marche <br>ok ca marche <br>ok ca marche <br>	ok ca marche <br>ok ca marche <br>ok ca marche <br>ok ca marche <br>ok ca marche <br>ok ca marche <br>ok ca marche <br>ok ca marche <br>	ok ca marche <br>ok ca marche <br>ok ca marche <br>ok ca marche <br>ok ca marche <br>ok ca marche <br>ok ca marche <br>ok ca marche <br>	ok ca marche <br>ok ca marche <br>ok ca marche <br>ok ca marche <br>ok ca marche <br>ok ca marche <br>ok ca marche <br>ok ca marche <br>	ok ca marche <br>
				ok ca marche <br>
			</div>
		</div>
	</div>


	<div class=" midle-button bg-light bordurex d-flex justify-content-center align-items-center" onclick="togleNavOK()" id="midle-button">
		<span class="fas fa-angle-left h5" id="collapse-button"></span>
	</div>

    

<!-- <div class="bg-dark sous-div-left"> -->
<div class="bg-dark sous-div-left" id="main">
wwww

	<div id="map"></div>
</div>


</div>








	<script type="text/javascript" src="style/js/main.js"></script>

<script>


function togleNavOK() {
	document.getElementById("mySidebar").style.width = "250px";
  document.getElementById("main").style.marginLeft = "250px";
}












function togleNav() {
	const side = document.getElementById("mySidebar");
	if (side.classList.contains('right')) {

	   $('#mySidebar').css('display', "none");
       $('.fa-angle-left').addClass("fa-angle-right");
       $('.fa-angle-right').removeClass('fa-angle-left');

       $('#mySidebar').removeClass('right');
       $('#mySidebar').addClass('left');

       $('#div-droite').css('width', "calc(100% - 30px)");
       $('#midle-button').css('left', 0);
       $('#div-droite').css('left', 30);
       // $('#map').css('width', "calc(100% - 30px)");


	    // resiteMap();
	}else{
		const side = document.getElementById("mySidebar");
		side.classList.remove("left"); // Remove mystyle class from DIV
	    side.classList.add("right"); // Add newone class to DIV
		side.style.display = "block";

		document.getElementById("midle-button").style.left='30%';
		document.getElementById("div-droite").style.left= 'calc(30% + 30px)'; 
		document.getElementById("div-droite").style.width= 'calc(100% - (30% + 30px))';


		const btn =document.getElementById("collapse-button");
	    btn.classList.remove("fa-angle-right"); // Remove mystyle class from DIV
	    btn.classList.add("fa-angle-left"); // Add newone class to DIV
	}

}


$(window).on('resize', function() {
    if($(window).width() < 990){
       $('#mySidebar').css('display', "none");
       $('.fa-angle-left').addClass("fa-angle-right");
       $('.fa-angle-right').removeClass('fa-angle-left');

       $('#mySidebar').removeClass('right');
       $('#mySidebar').addClass('left');

       $('#midle-button').css('left', 0);
       $('#div-droite').css('left', 30);
       

       $('#div-droite').css('width', "calc(100% - 30px)");
       

   }else{
       $('.fa-angle-right').addClass("fa-angle-left");
       $('.fa-angle-left').removeClass('fa-angle-right');

       $('#mySidebar').removeClass('left');
       $('#mySidebar').addClass('right');
       $('#mySidebar').css('display', "block");

       $('#midle-button').css('left', 30 + "%");
       $('#div-droite').css('left', "calc(30% + 30px)");
       $('#div-droite').css('width', "calc(100% - (30% + 30px))");
   }
       
});

</script>



</body>
</html>