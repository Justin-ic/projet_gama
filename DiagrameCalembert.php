<!DOCTYPE html>
<html lang="fr">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
  <!-- MDB -->
	<link rel="stylesheet" type="text/css" href="style.css">
  <link rel="icon" type="image/png" href="texxium.png"/>
	<title>TEXXIUM</title>
	<style type="text/css">
		svg{
			width: 100px;
			height: 100px;
		}
	</style>

</head>
<body>

	<svg viewBox="-1 -1 3 3">
		<!-- d est la forme géométrique
		M 0 0 pour positionner le curseur au centre
		L pour dire Line et on donne les coordonnées X Y
		A pour dessiner un arc de cercle

		format= A Rx Ry x-axis Large-arc-flag sweep-flag x y

		1) A=Arc
		2) Rx Ry = Rayon du tracé Ex: 1 0 trace une doite vers la droite 
		3) x-axis = rotation 
		4) Large-arc-flag: 0=+cour chemin 1=+long chemin
		5) sweep-flag: 0=concave 1=Ovale
		6) x y: on trace vers le haut ou bas; Ex:0 1 vers le bas  

		L 0 1 à la fin permet de revenir au point d'origine
		-->


		<path stroke="#000" stroke-width="0.1" d="M 0 0 L 1 0 A 1 1 0 0 1 0 1 L 0 1"></path>
	</svg>

</body>
</html>