<!-- https://www.tutorialspoint.com/chartjs/chartjs_syntax.htm   tutoriel

https://www.google.com/imgres?imgurl=https%3A%2F%2Fcdn.filestackcontent.com%2F347MJ45pS9yYRj904SRM&tbnid=PI6je0gTv_5pGM&vet=12ahUKEwimwu-y5ZGFAxX5TKQEHXmKBpQQxiAoBXoECAAQKg..i&imgrefurl=https%3A%2F%2Fwww.codementor.io%2F%40louisabainbridge%2Fsee-how-far-you-can-travel-within-a-time-limit-with-leaflet-traveltime-api-polygons-sf3mbgcl3&docid=dlOEulzoXWfyZM&w=750&h=605&itg=1&q=Leaflet%20repr%C3%A9senter%20des%20ivmaps%20sur%20une%20carte&ved=2ahUKEwimwu-y5ZGFAxX5TKQEHXmKBpQQxiAoBXoECAAQKg

https://www.codementor.io/@louisabainbridge/see-how-far-you-can-travel-within-a-time-limit-with-leaflet-traveltime-api-polygons-sf3mbgcl3

https://www.geoapify.com/tutorial/graw-isoline-with-leaflet-geojson 


https://handsondataviz.org/geojsonio.html


https://github.com/Leaflet/Leaflet.heat 
pour la video 
https://www.youtube.com/watch?app=desktop&v=mbRz6MTvDHk



https://github.com/pa7/heatmap.js/tree/develop


https://snazzymaps.com/style/65127/template xxxxxxxxxxxxxxxxxxxxxxxxxxxxx










Azimut cartographique

En cartographie, l'azimut est également mesuré à partir du point cardinal nord.

Il s'agit de l'angle d'une direction comptée dans le sens horaire à partir du nord géographique. L'azimut d'un point à l'est est de 90 ° et à l'ouest de 270 ° sexagésimaux. Le terme azimut n'est utilisé que lorsqu'il s'agit de nord géographique. Lorsque vous commencez à compter à partir du nord magnétique, on l'appelle souvent le relèvement ou l'azimut magnétique. En géodésie ou topographie géodésique, l'azimut est utilisé pour déterminer l'orientation d'un système de triangulation.

En cartographie, et surtout en topographie, les azimuts sont souvent exprimés en centièmes plutôt qu'en degrés sexagésimaux.


Sur un pilone, on a 3 antennes donc chaque antenne couver 120°


Semicircle.js:
startAngle: start angle of the semicircle
stopAngle: stop angle of the semicircle
Angles are defined like compass courses: 0 = north, 90 = east, etc. 








-->

<!DOCTYPE html>
<html lang="fr">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
  <!-- MDB -->
	<link rel="stylesheet" type="text/css" href="style.css">
  <link rel="icon" type="image/png" href="texxium.png"/>
	<title>TEXXIUM</title>

</head>
<body>

<?php 
	/*$content = file_get_contents('csv.txt');
	$names = fopen("name.txt", "r");
	$find1 = "***";
	$find2 = "xxx";

	for ($i=1; $i <=113 ; $i++) { 
		$pos = strpos($content, "***");
		$id="A".$i;
		if ($pos === FALSE) {
		    echo "La chaîne n'a pas été trouvée";
		} else {

			// $newstring = substr_replace($haystack, $replace, $pos, strlen($needle));

			$content = substr_replace($content, $id, $pos, strlen($find1));
		    echo "La chaîne a été trouvée. Pos=".$pos." fois=".$i."<br>";
		}

		// $name = trim(fgets($names));
		$title= trim(fgets($names));
		$pos = strpos($content, "xxx");
		if ($pos === FALSE) {
		    echo "La chaîne n'a pas été trouvée";
		} else {
			$content = substr_replace($content, $title, $pos, strlen($find2));
		    echo "La chaîne a été trouvée. Pos=".$pos." fois=".$i."<br>";
		}
	}

	$fichier = fopen("csvCoro.txt", "w");
	fwrite($fichier, $content);
	fclose($fichier);
	fclose($names);*/



?>

	<div class="map" id="map">
		<div class="map__image">
			<?php include('svg_departement.php'); ?>
		</div>
		<div class="map__liste">
			Carte de départements 
		</div>
	</div>

</body>
</html>

<!-- 


<svg width="400" height="400">
  <circle cx="200" cy="200" r="150" fill="none" stroke="black" stroke-width="2" />
  <path id="arc" fill="none" stroke="red" stroke-width="2" />
</svg>

<script>
  // Function to draw an arc
  function drawArc(startAngle, endAngle) {
    var centerX = 200;
    var centerY = 200;
    var radius = 150;

    var startX = centerX + radius * Math.cos(startAngle);
    var startY = centerY + radius * Math.sin(startAngle);

    var endX = centerX + radius * Math.cos(endAngle);
    var endY = centerY + radius * Math.sin(endAngle);

    var largeArcFlag = endAngle - startAngle <= Math.PI ? "0" : "1";

    var pathData = [
      "M", startX, startY,
      "A", radius, radius, 0, largeArcFlag, 0, endX, endY
    ].join(" ");

    document.getElementById("arc").setAttribute("d", pathData);
  }

  // Function to update the arc orientation based on azimuth
  function updateArcOrientation(azimuth) {
    var startAngle = (azimuth - 90) * Math.PI / 180; // Start angle at north
    var endAngle = (azimuth + 90) * Math.PI / 180;   // End angle at south

    drawArc(startAngle, endAngle);
  }

  // Example usage: Update arc orientation with azimuth
  var azimuth = /* your azimuth value */;
  updateArcOrientation(azimuth);
</script>





 -->