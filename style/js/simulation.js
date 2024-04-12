/*1) Je fais varier la fréquence de 50 à 3600MHz en mintenant les autres constants
   puis je recupère les valeurs de l'affaiblissements pour les deux formules
   Je fais la même chose pour les trois types de milieux
   Total= 6 courbes

2) Je fais varier la distance de 1 à 50Km pour la même fréquence 3000 MHz
   pour les deux formules et les 3 type de milieux*/
var dataHATA=[]; var dataCOST=[];
function simulation(location,frequence,TypeZone,Hb,Hm,d){
	var C =0; var Ah=0; 
	if (TypeZone == "urbaine") {
		C=0;
		if (frequence <= 200) {
			Ah = 8.29*Math.pow(Math.log10(1.54*Hm),2) - 1.1;
		} else {
			Ah = 3.2*Math.pow(Math.log10(11.75*Hm),2) - 4.97;
		}
	} else if (TypeZone == "subUrbaine") {
		C = 5.4 + 2*Math.pow(Math.log10(frequence/28),2);
		Ah = (1.1*Math.log10(frequence) - 0.7)*Hm - (1.56*Math.log10(frequence) - 0.8);
	} else  if (TypeZone == "rurale") {
		C = 40.94 + 4.78*Math.pow(Math.log10(frequence),2) - 18.33*Math.log10(frequence);
		Ah = (1.1*Math.log10(frequence) - 0.7)*Hm - (1.56*Math.log10(frequence) - 0.8);
	}
	var A = 69.55 + 26.161*Math.log10(frequence) - 13.82*Math.log10(Hb) - Ah;
	var B = 44.9-6.55*Math.log10(Hb);
	var HATA = A + B*Math.log10(d) - C;
	dataHATA[frequence] = HATA;



	A = 46.3 + 33.9*Math.log10(frequence) - 13.28*Math.log10(Hb) - Ah;
	B = 44.9-6.55*Math.log10(Hb);
	C = 0;
	if (TypeZone == "urbaine") {C = 3;}
	var COST =  A + B*Math.log10(d) - C;
	dataCOST[frequence] = COST;
}



function pipline(){
	for (var i = 400; i <= 4000; i++) {
	// simulation(location,frequence,TypeZone,Hb,Hm,d)
	// simulation("Abidjan",i,"urbaine",20,3,0.01); // Simulation 1
	simulation("Abidjan",i,"rurale",20,3,0.3); // Simulation 2
	}

}


for (var i = 4; i <= 39; i++) {
	// simulation(location,frequence,TypeZone,Hb,Hm,d)
	// simulation("Abidjan",i,"urbaine",20,3,0.01); // Simulation 1
	pipline(i*100,((i+1)*100)-1 ); // Simulation 2
}




// console.log(dataHATA);
/*// console.log(dataCOST);

var dataString= "";
dataHATA.forEach(AfficheDataHA);

console.log(dataString);
function AfficheDataHA(affaib,frequence){
	// console.log(dataString);
	dataString = dataString+" "+frequence+";"+affaib+"<br>";
	// console.log(dataString);
 document.getElementById("simulationHATA").innerHTML = dataString;
}*/









var dataStringHATA= "<h1>Smulation HATA</h1>";
var dataStringCOST= "<h1>Smulation COST</h1>";
dataHATA.forEach(AfficheDataHATA);
// dataCOST.forEach(AfficheDataCOST);

function AfficheDataHATA(affaib,frequence){
	// console.log(dataStringHATA);
	dataStringHATA = dataStringHATA+""+frequence+";"+affaib+"<br>";
	// console.log(dataStringHATA);
 document.getElementById("simulationHATA").innerHTML = dataStringHATA;
}

function AfficheDataCOST(affaib,frequence){
	// console.log(dataStringHATA);
	dataStringCOST = dataStringCOST+""+frequence+";"+affaib+"<br>";
	// console.log(dataStringHATA);
 document.getElementById("simulationCOST").innerHTML = dataStringCOST;
}





/*
force je travaile avec les données réelles précise de l'environnement
je ne tient pas conpte de la transmission car les la fréquence ne le permet pas
je n'utilise pas un modèle 2D mais 3D en me basant sur le tilte de l'antenne
coordonnées curvilignes en fonction du tilte


si je rencontre un obstacle, je refléchis dans la direction spéculative et je perd en puissance

*/





