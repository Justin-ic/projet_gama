<!DOCTYPE html>
<html>
<head>
	<title>LesFontes</title>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<link rel="stylesheet" type="text/css" href="css/all.css">
	<link rel="stylesheet" type="text/css" href="Mcss/bootstrap/bootstrap.css"> <!-- si le fichier html et le dossier se trouve -->
	<link rel="stylesheet" type="text/css" href="Mcss/Fonte.css"> <!-- dans le même endroit, on ne met pas de / au debut -->

</head>
<body>
	
<div class="fontawesome">Les <i class="justin">fontawesome</i>: résumé par Justin <br> 
 Copie le nom et met le dans une classe pour obtenir le résultat.</div>



<div class="container-fluid"> <!-- grace a boostrap, j'ai réussi à metre au mêm niveau tous ces éléments -->
		
<?php 

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// ENCAPSULATION DES DONNES
// $Conf = "Conf";
// if (is_dir($Conf)) {
// 	
// }else{mkdir($Conf);}
//
//$MOISCORRIGE = "Conf/MOIS_CORRIGE"; 									
// if (is_dir($MOISCORRIGE)) {
// 	
// }else{mkdir($MOISCORRIGE);}


$font_bands = fopen("fontawesome_bands.html", "w");
fwrite($font_bands, "
<!DOCTYPE html>
<html>
<head>
	<title>LesFontes</title>
	<meta charset=\"utf-8\">
	<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">
	<link rel=\"stylesheet\" type=\"text/css\" href=\"css/all.css\">
	<link rel=\"stylesheet\" type=\"text/css\" href=\"Mcss/bootstrap/bootstrap.css\"> <!-- si le fichier html et le dossier se trouve -->
	<link rel=\"stylesheet\" type=\"text/css\" href=\"Mcss/Fonte.css\"> <!-- dans le même endroit, on ne met pas de / au debut -->

</head>
<body>
	
<div class=\"fontawesome\">
   Les <i class=\"justin\">fontawesome</i>: résumé par Justin <br> 
   Les BANDS<br>
   Copie le nom et met le dans une classe pour obtenir le résultat.
</div>



<div class=\"container-fluid\">


<!--************************************************************************************************************ -->

    <div class=\"row droite\">
         <strong class=\"Numereau_de_ligne\"><?= 1 ?></strong>          
");



$font_regular = fopen("fontawesome_regular.html", "w");
fwrite($font_regular, "
<!DOCTYPE html>
<html>
<head>
	<title>LesFontes</title>
	<meta charset=\"utf-8\">
	<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">
	<link rel=\"stylesheet\" type=\"text/css\" href=\"css/all.css\">
	<link rel=\"stylesheet\" type=\"text/css\" href=\"Mcss/bootstrap/bootstrap.css\"> <!-- si le fichier html et le dossier se trouve -->
	<link rel=\"stylesheet\" type=\"text/css\" href=\"Mcss/Fonte.css\"> <!-- dans le même endroit, on ne met pas de / au debut -->

</head>
<body>
	
<div class=\"fontawesome\">
   Les <i class=\"justin\">fontawesome</i>: résumé par Justin <br> 
   Les REGULAR<br>
   Copie le nom et met le dans une classe pour obtenir le résultat.
</div>



<div class=\"container-fluid\">


<!--************************************************************************************************************ -->

    <div class=\"row droite\">
         <strong class=\"Numereau_de_ligne\"><?= 1 ?></strong>          
        
");




$font_solid= fopen("fontawesome_solid.html", "w");
fwrite($font_solid, "
<!DOCTYPE html>
<html>
<head>
	<title>LesFontes</title>
	<meta charset=\"utf-8\">
	<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">
	<link rel=\"stylesheet\" type=\"text/css\" href=\"css/all.css\">
	<link rel=\"stylesheet\" type=\"text/css\" href=\"Mcss/bootstrap/bootstrap.css\"> <!-- si le fichier html et le dossier se trouve -->
	<link rel=\"stylesheet\" type=\"text/css\" href=\"Mcss/Fonte.css\"> <!-- dans le même endroit, on ne met pas de / au debut -->

</head>
<body>
	
<div class=\"fontawesome\">
   Les <i class=\"justin\">fontawesome</i>: résumé par Justin <br> 
   Les SOLIDE<br>
   Copie le nom et met le dans une classe pour obtenir le résultat.
</div>



<div class=\"container-fluid\">


<!--************************************************************************************************************ -->

    <div class=\"row droite\">
         <strong class=\"Numereau_de_ligne\"><?= 1 ?></strong>     
        
");



  ?> <div class="row droite"> 
        <strong class="Numereau_de_ligne">1</strong><?php

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// **************************************************************************************************************
$d = "svgs/brands";
$ListeContenu_brands = scandir($d); // Recupere le contenu du dossier dans un tableau
$n = count($ListeContenu_brands); // Le nombre d'éléments
?><pre><?php // echo $n; print_r($ListeContenu_brands) ?></pre> <?php
$nbLigne = 1;
$nbElement = 1;

for ($i = 2; $i < count($ListeContenu_brands); $i++) {
    $NomFichier = $ListeContenu_brands[$i];
    $NomFichier = str_replace(".svg", "", $NomFichier);
    $NomFichier = "fab fa-".$NomFichier;
//    $NomFichier = "fab fa-".$NomFichier." ".($i-1);

    if ($nbElement==10) {
        $nbElement=1;
        $nbLigne++;
fwrite($font_bands, "
            <strong>
                <span class=\"$NomFichier\"></span><br>
                <i>$NomFichier</i>
            </strong>

");
        ?>
        <strong>
            <span class="<?= $NomFichier ?>"></span><br>
            <i><?= $NomFichier ?></i>
        </strong>
        <?php
        
        
fwrite($font_bands, "
        </div>
<!--************************************************************************************************************ -->


<!--************************************************************************************************************ -->
        <div class=\"row droite\">
            <strong class=\"Numereau_de_ligne\">$nbLigne</strong>
");

    ?></div><?php
    
    ?> <div class="row droite">
        <strong class="Numereau_de_ligne"><?= $nbLigne ?></strong><?php
        
    }else if ($i==count($ListeContenu_brands)-1){
fwrite($font_bands, "
            <strong>
                <span class=\"$NomFichier\"></span><br>
                <i>$NomFichier</i>
            </strong>
            </div>  <br><br>
");
        ?>
        <strong>
            <span class="<?= $NomFichier ?>"></span><br>
            <i><?= $NomFichier ?></i>
        </strong>
    </div> <br><br>
        <?php
    }else {
        $nbElement++;
fwrite($font_bands, "
            <strong>
                <span class=\"$NomFichier\"></span><br>
                <i>$NomFichier</i>
            </strong>
");
         ?>
        <strong>
            <span class="<?= $NomFichier ?>"></span><br>
            <i><?= $NomFichier ?></i>
        </strong>
        <?php
    }
}
    

   // **************************************************************************************************************




// **************************************************************************************************************
 ?> <div class="row droite">
        <strong class="Numereau_de_ligne">1</strong><?php

$d = "svgs/regular";
$ListeContenu_regular = scandir($d); // Recupere le contenu du dossier dans un tableau
$n = count($ListeContenu_regular); // Le nombre d'éléments
?> <?php
$nbLigne = 1;
$nbElement = 1;

for ($i = 2; $i < count($ListeContenu_regular); $i++) {
    $NomFichier = $ListeContenu_regular[$i];
    $NomFichier = str_replace(".svg", "", $NomFichier);
    $NomFichier = "fas fa-".$NomFichier;

    if ($nbElement==10) {
        $nbElement=1;
        $nbLigne++;
fwrite($font_regular, "
            <strong>
                <span class=\"$NomFichier\"></span><br>
                <i>$NomFichier</i>
            </strong>
");
        ?>
        <strong>
            <span class="<?= $NomFichier ?>"></span><br>
            <i><?= $NomFichier ?></i>
        </strong>
        <?php
        
        
fwrite($font_regular, "
        </div>
<!--************************************************************************************************************ -->


<!--************************************************************************************************************ -->
        <div class=\"row droite\">
            <strong class=\"Numereau_de_ligne\">$nbLigne</strong>
");

    ?></div><?php
    
    ?> <div class="row droite">
        <strong class="Numereau_de_ligne"><?= $nbLigne ?></strong><?php
        
    }else if ($i==count($ListeContenu_regular)-1){
fwrite($font_regular, "
            <strong>
                <span class=\"$NomFichier\"></span><br>
                <i>$NomFichier</i>
            </strong>
            </div>  <br><br>
");
        ?>
        <strong>
            <span class="<?= $NomFichier ?>"></span><br>
            <i><?= $NomFichier ?></i>
        </strong>
    </div> <br><br>
        <?php
    }else {
        $nbElement++;
fwrite($font_regular, "
            <strong>
                <span class=\"$NomFichier\"></span><br>
                <i>$NomFichier</i>
            </strong>
");
         ?>
        <strong>
            <span class="<?= $NomFichier ?>"></span><br>
            <i><?= $NomFichier ?></i>
        </strong>
        <?php
    }
}
// **************************************************************************************************************


// **************************************************************************************************************
 ?> <div class="row droite">
        <strong class="Numereau_de_ligne">1</strong><?php
        
$d = "svgs/solid";
$ListeContenu_solid = scandir($d); // Recupere le contenu du dossier dans un tableau
$n = count($ListeContenu_solid); // Le nombre d'éléments
?> <?php
$nbLigne = 1;
$nbElement = 1;

for ($i = 2; $i < count($ListeContenu_solid); $i++) {
    $NomFichier = $ListeContenu_solid[$i];
    $NomFichier = str_replace(".svg", "", $NomFichier);
    $NomFichier = "fas fa-".$NomFichier;

    if ($nbElement==10) {
        $nbElement=1;
        $nbLigne++;
fwrite($font_solid, "
            <strong>
                <span class=\"$NomFichier\"></span><br>
                <i>$NomFichier</i>
            </strong>
");
        ?>
        <strong>
            <span class="<?= $NomFichier ?>"></span><br>
            <i><?= $NomFichier ?></i>
        </strong>
        <?php
        
        
fwrite($font_solid, "
        </div>
<!--************************************************************************************************************ --> <br>


<!--************************************************************************************************************ -->
        <div class=\"row droite\">
            <strong class=\"Numereau_de_ligne\">$nbLigne</strong>
");

    ?></div><?php
    
    ?> <div class="row droite">
        <strong class="Numereau_de_ligne"><?= $nbLigne ?></strong><?php
        
    }else if ($i==count($ListeContenu_solid)-1){
fwrite($font_solid, "
            <strong>
                <span class=\"$NomFichier\"></span><br>
                <i>$NomFichier</i>
            </strong>
            </div>  <br><br>
");
        ?>
        <strong>
            <span class="<?= $NomFichier ?>"></span><br>
            <i><?= $NomFichier ?></i>
        </strong>
    </div> <br><br>
        <?php
    }else {
        $nbElement++;
fwrite($font_solid, "
            <strong>
                <span class=\"$NomFichier\"></span><br>
                <i>$NomFichier</i>
            </strong>
");
         ?>
        <strong>
            <span class="<?= $NomFichier ?>"></span><br>
            <i><?= $NomFichier ?></i>
        </strong>
        <?php
    }
}
// **************************************************************************************************************

fclose($font_bands);
fclose($font_regular);
fclose($font_solid);
?>
      
</div>

</body>
</html>
