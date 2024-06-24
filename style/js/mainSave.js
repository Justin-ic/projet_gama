

/*
https://www.youtube.com/watch?v=ViIR9HzLDdo

*/





function simulation(P,frequence,TypeZone,Hb,Hm,nivSignal=-100){
	console.log(" P= "+P+" frequence= "+frequence+" TypeZone= "+TypeZone+" Hb= "+Hb+" Hm= "+Hm);
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

	var A; var B; var Ghe; var Gre;
/*	A = 69.55 + 26.161*Math.log10(frequence) - 13.82*Math.log10(Hb) - Ah;
	B = 44.9-6.55*Math.log10(Hb);
	var HATA = A + B*Math.log10(d) - C;
	dataHATA[frequence] = HATA; 


	   Rayon=0.9842832638457951 m -1
	   Rayon=3.408097000877437 m -20
*/


	A = 46.3 + 33.9*Math.log10(frequence) - 13.28*Math.log10(Hb) - Ah;
	B = 44.9-6.55*Math.log10(Hb);
	Ghe = 20*Math.log10(Hb/200);
	if (Hm < 3) {Gre = 10*Math.log10(Hb/3);} else {Gre = 20*Math.log10(Hb/3);}
	var correcteur=-181;
	var AMPL=144.03;
	C = 0;
	if (TypeZone == "urbaine") {C = 3; correcteur=-160;}
console.log(nivSignal);
	var exposant =((Number(P) - Number(nivSignal) - Number(AMPL) - Number(correcteur) +Number(Gre)+Number(Ghe)-Number(A)-Number(C))/Number(B));
	var COST =  A + B*Math.log10(0.7) - C;
	var Rayon = Math.pow(10,exposant);

	console.log("Dans simulation nivSignal="+nivSignal+" A="+A+" B="+B+" C="+C+" P="+P+" Ghe="+Ghe+" Gre="+Gre+" Op="+( exposant )+ " COST="+COST);
	console.log(" Rayon="+Rayon*1000+" m");
	return Rayon*1000;

}


/*

	C = 0;
	if (TypeZone == "urbaine") {C = 3;}

	/*var COST =  A + B*Math.log10(d) - C;
	dataCOST[frequence] = COST;* /
	var exposant =(P+2-100+Gre+Ghe-A-C)/B;
	var COST =  A + B*Math.log10(0.1) - C;
	var Rayon = Math.pow(10,exposant);
	var verifi = 19-A-B*Math.log10(0.0000011531716402744027)-C;
	console.log("Vérification exposant=="+exposant);

	console.log("Dans simulation A="+A+" B="+B+" C="+C+" P="+P+" Ghe="+Ghe+" Gre="+Gre+" Op="+( (P+Gre-100+Ghe-A-C)/B )+ " COST="+COST);
	console.log(Rayon);
	// console.log(Math.pow(10,47));
	return Rayon*1000;
*/




// Inite map
var dataMarkerMoovId = [];
var dataMarkerMtnId = [];
var dataMarkerOranId = [];
var dataMarkerUpToDate = [];
var CpAllMarker =0;
var MarkerMoovId =0;
var MarkerMtnId =0;
var MarkerOranId =0;

if ($(window).width() < 990) {var zoom=6;} else {var zoom=7;}
var map = L.map('map').setView([7.483100, -5.716920], zoom);

var mainMap = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
});

mainMap.addTo(map);


/*// Default marqueur
var marker = L.marker([7.483100, -5.716920]).addTo(map);


L.semiCircle([5.396574, -3.969319], {
    radius: 90000,
	startAngle: 0,
	stopAngle: 120,
	color: 'red',
	fillColor: '#f03',
	fillOpacity: 0.1,
	weight:1 //border weight
}).addTo(map);

L.semiCircle([5.396574, -3.969319], {
    radius: 90000,
	startAngle: 120,
	stopAngle: 240,
	color: 'red',
	fillColor: '#f03',
	fillOpacity: 0.1,
	weight:1 
}).addTo(map);

L.semiCircle([5.396574, -3.969319], {
    radius: 90000,
	startAngle: 240,
	stopAngle: 360,
	color: 'red',
	fillColor: '#f03',
	fillOpacity: 0.1,
	weight:1 
}).addTo(map);




L.semiCircle([9.452689, -5.624298], {
    radius: 90000,
	startAngle: 0,
	stopAngle: 120,
	color: 'red',
	fillColor: '#f03',
	fillOpacity: 0.1,
	weight:1 //border weight
}).addTo(map);

L.semiCircle([9.452689, -5.624298], {
    radius: 90000,
	startAngle: 120,
	stopAngle: 240,
	color: 'red',
	fillColor: '#f03',
	fillOpacity: 0.1,
	weight:1 
}).addTo(map);

L.semiCircle([9.452689, -5.624298], {
    radius: 90000,
	startAngle: 240,
	stopAngle: 360,
	color: 'red',
	fillColor: '#f03',
	fillOpacity: 0.1,
	weight:1 
}).addTo(map);

*/


/*

La fonction doit recevoir 
l'opérateur pour savoir quel icone prendre
Nom
Localisation
Hauteur
Tilt
Azimut
Longitude
Latitude

la bande de fréquence
la le type de zone

*/



// simulation(location,frequence,TypeZone,Hb,Hm,d)
// location donne le type de zone; Tx_P puissance antenne relais
// function setMarker(operateur,idMarker,nom,location,Tx_P,frequence,height,tilt,azimuth,Long,Lat){
// function setMarker(operateur,idMarker,nom,location,height,tilt,azimuth,Long,Lat){
function setMarker(operateur,idMarker=1,nom=null,location,height,tilt=null,azimuth=null,Long,Lat,P,frequence,TypeZone,nivSignal){
	var heightUser = 3;
	var Radius = simulation(P,frequence,TypeZone,height,heightUser,nivSignal);
	// var Radius = simulation(P,frequence,TypeZone,Hb,Hm);
	console.log("okokok");
	console.log(Radius);

	// URL = 'style/fontawesome/marqueurs/marqueur3.png';
	var marq_opera = operateur.toLowerCase()+idMarker;
	URL = 'style/fontawesome/marqueurs/'+marq_opera+"."+dataMarqueur[marq_opera].extension;
	var markerHeight = 40;
	var newWidth = markerHeight * (dataMarqueur[marq_opera].width / dataMarqueur[marq_opera].height); 
	/*Calcule la nouvelle largeur si je donne une nouvelle hauteur de 40px*/
	 // var img =  new Image(); Cette technique est trop lante. La mape s'affiche avant 
	 // d'obtenire les dimensions de l'image



	// Costome marqueur
	var costomIcon = L.icon({
	    iconUrl: URL,

	    // shadowUrl: 'leaf-shadow.png',

	    iconSize:     [, markerHeight], // size of the icon. Ici, on ne touche pas le width
	    /*La taille de l'icon par défaut est de 40px */

	    // shadowSize:   [50, 64], // size of the shadow

	    iconAnchor:   [newWidth/2, markerHeight], // point of the icon which will correspond to marker's location
	    /*iconAnchor: [x, y] La position absolut du marqueur pour corriger sa position.
		  par défaut, l'icon top=0px et left=0px. 
		  comme un marqueur a un pointeur en bas au milieu, on fait x=(1/2)* de la largeure et 
		  y=la hauteur de l'icon */

	    // shadowAnchor: [4, 62],  // the same for the shadow

	    popupAnchor:  [0, -markerHeight] // point from which the popup should open relative to the iconAnchor    
	});

	//Ajout du title
	var markerOptions = {
		icon: costomIcon,
		title: nom.toUpperCase()
	}
	var costomMarqueur = L.marker([Long,Lat], markerOptions).addTo(map);
	var divPopup="<div><b>Operateur: </b>"+operateur[0].toUpperCase()+operateur.slice(1);
	divPopup += "<br><b>Nom: </b>"+nom+"<br><b>Localisation: </b>";
	divPopup += location+"<br><b>Hauteur Pylône: </b>"+height+"m<br><b>Tilt: </b>"+tilt;
	divPopup += "°<br><b>Azimut: </b>";
	divPopup += azimuth+"°<br><b>Longitude (DD): </b>"+Long+"<br><b>Latitude (DD): </b>"+Lat;
	divPopup += "<br><b>Puissance Ant: </b>"+P+"dBm <br><b>Fréquence: </b>"+frequence;
	divPopup += "Mhz <br><b>Type Zone: </b>"+TypeZone[0].toUpperCase()+TypeZone.slice(1);
	divPopup += " <br><b>Rayon estimé: </b>";
	divPopup += Radius.toFixed(2)+"m </div>";
	costomMarqueur.bindPopup(divPopup);
	// var costomMarqueur = L.marker([7.483100, -5.716920], costomIcon).addTo(map);


	var color = "";
	if (operateur.toLowerCase() == "moov") {color="#065cab"}else if (operateur.toLowerCase() == "mtn") {color="#fbcb04"}else{color="#fb6304"}
	var circle = L.circle([Long,Lat], {
	    color: color,
	    fillColor: color,
	    fillOpacity: 0.1,
	    weight:1,
	    radius: Radius
	}).addTo(map).bindPopup("<b>Operateur:"+operateur.toUpperCase()+"</b><br>"+nom);

	dataMarkerUpToDate[]
    if (operateur.toLowerCase() == "moov") {
    	dataMarkerMoovId[MarkerMoovId++] = costomMarqueur;
    	dataMarkerMoovId[MarkerMoovId++] = circle;
    } else if (operateur.toLowerCase() == "mtn") {
    	dataMarkerMtnId[MarkerMtnId++] = costomMarqueur;
    	dataMarkerMtnId[MarkerMtnId++] = circle;
    } else {
    	dataMarkerOranId[MarkerOranId++] = costomMarqueur;
    	dataMarkerOranId[MarkerOranId++] = circle;
    }
}
















// simulation(location,frequence,TypeZone,Hb,Hm,d)
// location donne le type de zone; Tx_P puissance antenne relais
// function setMarker(operateur,idMarker,nom,location,Tx_P,frequence,height,tilt,azimuth,Long,Lat){
// function setMarker(operateur,idMarker,nom,location,height,tilt,azimuth,Long,Lat){
function setMarkerDefault(operateur,idMarker=1,nom=null,location,height,tilt=null,azimuth=null,Long,Lat,P,frequence,TypeZone){

	var Radius = simulation(P,frequence,TypeZone,height,3);
	// var Radius = simulation(P,frequence,TypeZone,Hb,Hm);
	console.log("okokok");

	// URL = 'style/fontawesome/marqueurs/marqueur3.png';
	var marq_opera = operateur.toLowerCase()+idMarker;
	URL = 'style/fontawesome/marqueurs/'+marq_opera+"."+dataMarqueur[marq_opera].extension;
	var markerHeight = 40;
	var newWidth = markerHeight * (dataMarqueur[marq_opera].width / dataMarqueur[marq_opera].height); 
	/*Calcule la nouvelle largeur si je donne une nouvelle hauteur de 40px*/
	 // var img =  new Image(); Cette technique est trop lante. La mape s'affiche avant 
	 // d'obtenire les dimensions de l'image



	// Costome marqueur
	var costomIcon = L.icon({
	    iconUrl: URL,

	    // shadowUrl: 'leaf-shadow.png',

	    iconSize:     [, markerHeight], // size of the icon. Ici, on ne touche pas le width
	    /*La taille de l'icon par défaut est de 40px */

	    // shadowSize:   [50, 64], // size of the shadow

	    iconAnchor:   [newWidth/2, markerHeight], // point of the icon which will correspond to marker's location
	    /*iconAnchor: [x, y] La position absolut du marqueur pour corriger sa position.
		  par défaut, l'icon top=0px et left=0px. 
		  comme un marqueur a un pointeur en bas au milieu, on fait x=(1/2)* de la largeure et 
		  y=la hauteur de l'icon */

	    // shadowAnchor: [4, 62],  // the same for the shadow

	    popupAnchor:  [0, -markerHeight] // point from which the popup should open relative to the iconAnchor    
	});

	//Ajout du title
	var markerOptions = {
		icon: costomIcon,
		title: nom.toUpperCase()
	}
	var costomMarqueur = L.marker([Long,Lat], markerOptions).addTo(map);
/*	
	var divPopup="<div><b>Operateur: </b>"+operateur[0].toUpperCase()+operateur.slice(1);
	divPopup += "<br><b>Nom: </b>"+nom+"<br><b>Localisation: </b>";
	divPopup += location+"<br><b>Hauteur: </b>"+height+"m<br><b>Tilt: </b>"+tilt+"°<br><b>Azimut: </b>";
	divPopup += azimuth+"°<br><b>Longitude: </b>"+Long+"<br><b>Latitude: </b>"+Lat;
	divPopup += "<br><b>Puissance: </b>"+P+"dB <br><b>Fréquence: </b>"+frequence;
	divPopup += "Mhz <br><b>TypeZone: </b>"+TypeZone[0].toUpperCase()+TypeZone.slice(1);
	divPopup += " <br><b>Radius: </b>";
	divPopup += Radius.toFixed(2)+"m </div>";*/

	var divPopup="<div><b>Operateur: </b>"+operateur[0].toUpperCase()+operateur.slice(1);
	divPopup += "<br><b>Nom: </b>"+nom+"<br><b>Localisation: </b>";
	divPopup += location+"<br><b>Hauteur Pylône: </b>"+height+"m<br><b>Tilt: </b>"+tilt;
	divPopup += "°<br><b>Azimut: </b>";
	divPopup += azimuth+"°<br><b>Longitude (DD): </b>"+Long+"<br><b>Latitude (DD): </b>"+Lat;
	divPopup += "<br><b>Puissance Ant: </b>"+P+"dBm <br><b>Fréquence: </b>"+frequence;
	divPopup += "Mhz <br><b>Type Zone: </b>"+TypeZone[0].toUpperCase()+TypeZone.slice(1);
	divPopup += " <br><b>Rayon estimé: </b>";
	divPopup += Radius.toFixed(2)+"m </div>";
	

	costomMarqueur.bindPopup(divPopup);
	// var costomMarqueur = L.marker([7.483100, -5.716920], costomIcon).addTo(map);


	var color = "";
	if (operateur.toLowerCase() == "moov") {color="#065cab"}else if (operateur.toLowerCase() == "mtn") {color="#fbcb04"}else{color="#fb6304"}
	var circle = L.circle([Long,Lat], {
	    color: color,
	    fillColor: color,
	    fillOpacity: 0.1,
	    weight:1,
	    radius: Radius
	}).addTo(map).bindPopup("<b>Operateur:"+operateur.toUpperCase()+"</b><br>"+nom);

	if (operateur.toLowerCase() == "moov") {
		dataMarkerMoovId[MarkerMoovId++] = costomMarqueur;
		// updateMarqueur(costomMarqueur);
		dataMarkerMoovId[MarkerMoovId++] = circle;
	} else if (operateur.toLowerCase() == "mtn") {
		dataMarkerMtnId[MarkerMtnId++] = costomMarqueur;
		// updateMarqueur(costomMarqueur);
		dataMarkerMtnId[MarkerMtnId++] = circle;
	} else {
		dataMarkerOranId[MarkerOranId++] = costomMarqueur;
		// updateMarqueur(costomMarqueur);
		dataMarkerOranId[MarkerOranId++] = circle;
	}
}




var P=19; var corrector=210;

	// operateur  idMarker nom  location  height  tilt  azimuth  Long  Lat  P  frequence  TypeZone
data = Array(
	["mtn",1,"Folon","Folon",20,29,30,9.842626, -7.468468,P,1800,"rurale"],
	["moov",1,"Boundiali","Boundiali",20,29,30,9.455786, -6.203278,P,900,"rurale"],
	["mtn",1,"Ferkessédougou","Ferkessédougou",20,29,30,9.496919, -5.212327,P,900,"rurale"],
	["orange",1,"Poro","Poro",20,29,30, 8.935867, -5.748418 ,P,1800,"rurale"],
	["orange",1,"Worodougou","Worodougou",20,29,30, 8.364933, -7.095350 ,P,1800,"rurale"],
	["orange",1,"Kabadougou","Kabadougou",20,29,30, 9.184507, -7.079070 ,P,1800,"rurale"],
	["mtn",1,"Niakaramandougou","Département Niakaramandougou",20,29,30, 8.772829, -5.079119 ,P,900,"rurale"],
	["moov",1,"Bouna","Bouna",20,29,30, 9.720625, -3.919403 ,P,900,"rurale"],
	["mtn",1,"Bounkani","Bounkani",20,29,30, 8.737470, -2.901740 ,P,900,"rurale"],
	["orange",1,"Dabakala","Dabakala",20,29,30, 8.323288, -4.050853 ,P,1800,"rurale"],
	// ["mtn",1,"Katiola","Katiola",20,29,30, 8.139953, -5.100244 ,P,800,"subUrbaine"],
	["moov",1,"Tanda","Tanda",20,29,30, 7.909860, -3.633766 ,P,800,"rurale"],
	["mtn",1,"Bouaké","Bouaké",20,29,30, 7.612360, -4.603380 ,P,1800,"rurale"],
	["orange",1,"Sakassou","Sakassou",20,29,30, 7.402848, -5.610694 ,P,800,"rurale"],
	["mtn",1,"Daloa","Daloa",20,29,30, 7.192195, -6.348100 ,P,800,"rurale"],
	["orange",1,"Bangolo","Bangolo",30,29,30, 7.068839, -7.084396 ,P,800,"rurale"],
	["moov",1,"Man","Man",20,29,30, 6.935652, -7.856323 ,P,800,"rurale"],
	["mtn",1,"Guiglo","Guiglo",20,29,30, 6.187884, -7.535379 ,P,800,"rurale"],
	["orange",1,"Soubré","Soubré",30,29,30, 6.127101, -6.897625 ,P,800,"rurale"],
	["mtn",1,"Issia","Issia",20,29,30, 6.443879, -6.215707 ,P,1800,"rurale"],
	["mtn",1,"San-Pédro","San-Pédro",20,29,30, 5.091811, -6.809888 ,P,800,"rurale"],
	["moov",1,"Sassandra","Sassandra",20,29,30, 5.111197, -6.023884 ,P,800,"rurale"],
	["orange",1,"Lôh-Djiboua","Lôh-Djiboua",20,29,30, 5.496481, -5.367494 ,P,800,"rurale"],
	["mtn",1,"District Autonome du Yamoussoukro","District Autonome du Yamoussoukro",20,29,30, 6.805433, -5.201728 ,P,900,"rurale"],
	["mtn",1,"Bongouanou","Bongouanou",20,29,30, 6.641612, -4.468444 ,P,1200,"rurale"],
	["moov",1,"M'bahiakro","M'bahiakro",20,29,30, 7.560803, -4.111411 ,P,2000,"rurale"],
	["mtn",1,"Adzopé","Adzopé",20,29,30, 6.221026, -3.665893 ,P,1200,"rurale"],
	["orange",1,"Alépé","Alépé",20,29,30, 5.630421, -3.652079 ,P,2000,"rurale"],
	["mtn",1,"Sud-Comoé","Sud-Comoé",20,29,30, 5.366320, -3.058465 ,P,1200,"rurale"],
	["moov",1,"Ebimpé","Ebimpé",20,29,30, 5.497579, -4.077525 ,P,1200,"subUrbaine"],
	["mtn",1,"Anyama","Anyama",20,29,30, 5.505239, -4.050978 ,P,2000,"urbaine"],
	["orange",1,"Anyama Ahouabo","Anyama Ahouabo",20,29,30, 5.499302, -4.027316 ,P,2000,"urbaine"],
	["mtn",1,"Anyama-Adjamé","Anyama-Adjamé",20,29,30, 5.485515, -4.031453 ,P,1500,"urbaine"],
	["moov",1,"PK 18 Agoueto, Abidjan","PK 18 Agoueto, Abidjan",20,29,30, 5.444173, -4.052500 ,P,1500,"urbaine"],
	["orange",1,"Yopougon Kouté, Abidjan","Yopougon Kouté, Abidjan",20,29,30, 5.320840, -4.080931 ,P,1500,"urbaine"],
	["mtn",1,"Biétry, Abidjan","Biétry, Abidjan",20,29,30, 5.279615, -3.976680 ,P,2000,"urbaine"],
	["moov",1,"Port-Bouet, Abidjan","Port-Bouet, Abidjan",30,29,30, 5.261727, -3.893326 ,P,2600,"urbaine"],
	["orange",1,"Blockhauss, Abidjan","Blockhauss, Abidjan",20,29,30, 5.324061, -4.004304 ,P,2000,"urbaine"]
  );


// console.log (data);
data.forEach(appel_f_marqueur);
function appel_f_marqueur(item, index) {
/*  console.log (index); 
  console.log (item);*/
  console.log (item[10]);

  setMarkerDefault(item[0],item[1],item[2],item[3],item[4],item[5],item[6],item[7],item[8],item[9],item[10],item[11]); 
}



const img = new Image();
URL = 'style/fontawesome/marqueurs/moov11.png';
img.src = URL;
var newWidth ;


	img.style.height="40px";

	 newWidth = 40 * (img.width / img.height); 
	/*Calcule la nouvelle largeur si je donne une nouvelle hauteur de 40px*/
	// console.log(newWidth);


// console.log(newWidth);


	// Costome marqueur
	var costomIcon = L.icon({
	    iconUrl: 'style/fontawesome/marqueurs/moov11.png',




	    // shadowUrl: 'leaf-shadow.png',

	    iconSize:     [, 40], // size of the icon. Ici, on ne touche pas le width
	    /*La taille de l'icon par défaut est de 40px */

	    // shadowSize:   [50, 64], // size of the shadow

	    iconAnchor:   [newWidth/2, 40], // point of the icon which will correspond to marker's location
	    /*iconAnchor: [x, y] La position absolut du marqueur pour corriger sa position.
		  par défaut, l'icon top=0px et left=0px. 
		  comme un marqueur a un pointeur en bas au milieu, on fait x=(1/2)* de la largeure et 
		  y=la hauteur de l'icon */

	    // shadowAnchor: [4, 62],  // the same for the shadow

	    popupAnchor:  [0, -40] // point from which the popup should open relative to the iconAnchor    
	});

	//Ajout du title
	var markerOptions = {
		icon: costomIcon,
		title: 'Je suis fort'
	}  
	var costomMarqueur = L.marker([7.483100, -5.716920], markerOptions).addTo(map);
	var divPopup="<div><b>Nom:</b>.... <br><b>Localisation:</b>....<br> <b>Hauteur:</b>.... <br><b>Tilt:</b>.... <br><b>Azimut:</b>.... <br><b>Longitude:</b>.... <br><b>Latitude:</b>.... </div>";
	costomMarqueur.bindPopup(divPopup);
	// var costomMarqueur = L.marker([7.483100, -5.716920], costomIcon).addTo(map);



	var circle = L.circle([7.483100, -5.716920], {
	    color: 'red',
	    fillColor: '#f03',
	    fillOpacity: 0.1,
	    weight:1, //border weight
	    radius: 20000
	}).addTo(map).bindPopup("I am a circle.");




// https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/button
function updateMarqueur(){
	for (var i = 0; i < dataMarkerMoovId.length; i++) {
				// console.log(dataMarkerMoovId[i]);
		// map.removeLayer(dataMarkerMoovId[i]);
		dataMarkerMoovId[i].addEventListener("mouseup", (e) => {
			console.log(e);
			switch (e.originalEvent.button) {
			case 0:
				console.log("Left button clicked.");
				break;
			case 1:
				console.log("Middle button clicked.");
				break;
			case 2:
				console.log("Right button clicked.");
				break;
			default:
				console.log(`Unknown button code: ${e.originalEvent.button}`);
			}
		});
	}

}


updateMarqueur();




function togleMarkers(operateur){
	if (operateur.toLowerCase() == "moov") {
		const side = document.getElementById("togleMarkMoov");
		
		if (side.classList.contains('active')) {
			// console.log(dataMarkerMoovId[0] );
			for (var i = 0; i < dataMarkerMoovId.length; i++) {
				// console.log(dataMarkerMoovId[i]);
				map.removeLayer(dataMarkerMoovId[i]);
			}
			$('#togleMarkMoov').removeClass('active');
			$('#togleMarkMoov').prop('src',"style/fontawesome/marqueurs/buttonEtteind.png");
		} else {
			for (var i = 0; i < dataMarkerMoovId.length; i++) {
				dataMarkerMoovId[i].addTo(map);
			}
			$('#togleMarkMoov').addClass('active');
			$('#togleMarkMoov').prop('src', "style/fontawesome/marqueurs/buttonMoov.png");
		}
		
    } else if (operateur.toLowerCase() == "mtn") {
	    	const side = document.getElementById("togleMarkMtn");
	    	if (side.classList.contains('active')) {
	    		for (var i = 0; i < dataMarkerMtnId.length; i++) {
	    			map.removeLayer(dataMarkerMtnId[i]);
	    		}
	    		$('#togleMarkMtn').removeClass('active');
	    		$('#togleMarkMtn').prop('src',"style/fontawesome/marqueurs/buttonEtteind.png");

	    	} else {
	    		for (var i = 0; i < dataMarkerMtnId.length; i++) {
	    			dataMarkerMtnId[i].addTo(map);
	    		}
	    		$('#togleMarkMtn').addClass('active');
	    		$('#togleMarkMtn').prop('src', "style/fontawesome/marqueurs/buttonMtn.png");

	    	}

    } else if (operateur.toLowerCase() == "orange"){

	    	const side = document.getElementById("togleMarkOrange");
	    	if (side.classList.contains('active')) {
				// console.log(dataMarkerOranId[0] );
	    		for (var i = 0; i < dataMarkerOranId.length; i++) {
	    			// console.log(dataMarkerOranId[i]);
	    			map.removeLayer(dataMarkerOranId[i]);
	    		}
	    		$('#togleMarkOrange').removeClass('active');
	    		$('#togleMarkOrange').prop('src',"style/fontawesome/marqueurs/buttonEtteind.png");
	    	} else {
	    		for (var i = 0; i < dataMarkerOranId.length; i++) {
	    			dataMarkerOranId[i].addTo(map);
	    		}
	    		$('#togleMarkOrange').addClass('active');
	    		$('#togleMarkOrange').prop('src', "style/fontawesome/marqueurs/buttonOrange.png");
	    	}

    }else if (operateur.toLowerCase() == "stop"){

	    	const side = document.getElementById("togleMarkStop");
	    	if (side.classList.contains('active')) {
	    		for (var i = 0; i < dataMarkerMtnId.length; i++) {
	    			map.removeLayer(dataMarkerMtnId[i]);
	    		}
	    		for (var i = 0; i < dataMarkerMoovId.length; i++) {
	    			map.removeLayer(dataMarkerMoovId[i]);
	    		}
	    		for (var i = 0; i < dataMarkerOranId.length; i++) {
	    			map.removeLayer(dataMarkerOranId[i]);
	    		}
	    		$('#togleMarkStop').removeClass('active');
	    		$('#togleMarkMtn').prop('src',"style/fontawesome/marqueurs/buttonEtteind.png");
	    		$('#togleMarkMoov').prop('src',"style/fontawesome/marqueurs/buttonEtteind.png");
	    		$('#togleMarkOrange').prop('src',"style/fontawesome/marqueurs/buttonEtteind.png");
	    		$('#togleMarkStop').prop('src',"style/fontawesome/marqueurs/buttonEtteind.png");
	    		$('#togleMarkMoov').removeClass('active');
	    		$('#togleMarkMtn').removeClass('active');
	    		$('#togleMarkOrange').removeClass('active');

	    	} else {
	    		for (var i = 0; i < dataMarkerMtnId.length; i++) {
	    			dataMarkerMtnId[i].addTo(map);
	    		}
	    		for (var i = 0; i < dataMarkerMoovId.length; i++) {
	    			dataMarkerMoovId[i].addTo(map);
	    		}
	    		for (var i = 0; i < dataMarkerOranId.length; i++) {
	    			dataMarkerOranId[i].addTo(map);
	    		}
	    		$('#togleMarkStop').addClass('active');
	    		$('#togleMarkMtn').prop('src', "style/fontawesome/marqueurs/buttonMtn.png");
	    		$('#togleMarkMoov').prop('src', "style/fontawesome/marqueurs/buttonMoov.png");
	    		$('#togleMarkOrange').prop('src', "style/fontawesome/marqueurs/buttonOrange.png");
	    		$('#togleMarkStop').prop('src', "style/fontawesome/marqueurs/buttonOk.png");
	    		$('#togleMarkMoov').addClass('active');
	    		$('#togleMarkMtn').addClass('active');
	    		$('#togleMarkOrange').addClass('active');
	    	}

    }
}













/*



9.106500, -7.483028
Kabadougou


9.455786, -6.203278
Boundiali

9.496919, -5.212327
Ferkessédougou

8.935867, -5.748418
Poro

8.772829, -5.079119
Département Niakaramandougou

9.720625, -3.919403
Bouna

8.737470, -2.901740
Bounkani

8.323288, -4.050853
Dabakala

8.139953, -5.100244
Katiola

7.909860, -3.633766
Tanda

7.612360, -4.603380
Bouaké

7.402848, -5.610694
Sakassou

7.192195, -6.348100
Daloa

7.068839, -7.084396
Bangolo

6.935652, -7.856323
Man

6.187884, -7.535379
Guiglo

6.127101, -6.897625
Soubré

6.443879, -6.215707
Issia

5.091811, -6.809888
San-Pédro

5.111197, -6.023884
Sassandra

5.496481, -5.367494
Lôh-Djiboua

6.805433, -5.201728
District Autonome du Yamoussoukro

6.641612, -4.468444
Bongouanou

7.560803, -4.111411
M''bahiakro

6.221026, -3.665893
Adzopé

5.630421, -3.652079
Alépé

5.366320, -3.058465
Sud-Comoé


5.497579, -4.077525
Ebimpé

5.505239, -4.050978
Anyama

5.499302, -4.027316
Anyama Ahouabo

5.485515, -4.031453
Anyama-Adjamé

5.444173, -4.052500
PK 18 Agoueto, Abidjan

5.320840, -4.080931
Yopougon Kouté, Abidjan

5.279615, -3.976680
Biétry, Abidjan

5.261727, -3.893326
Port-Bouet, Abidjan

5.324061, -4.004304
Blockhauss, Abidjan








\begin{frame}
    \frametitle{C) Résultats: contrôle de précision}

    \begin{figure}[h] % Utilisation de l'environnement figure
        \centering % Centre l'image horizontalement
        \includegraphics[width=0.8\textwidth]{image/resultat_mesure.png}
        %\caption{illustration du problème}
        \label{fig:tableMission} % Étiquette pour faire référence à l'image dans le texte
    \end{figure} 

\end{frame}




https://www.youtube.com/watch?v=X_OkQqqsK68
*/

















/*


// *********************** Une recherche de une Journée entière de 2h à 18h

//  --------------------TROUVER LE MILIEU DE DEUX POINS --------------------
function getMidpoint(lat1, lon1, lat2, lon2) {
    // Calculer les moyennes des latitudes et des longitudes
    const midLat = (lat1 + lat2) / 2;
    const midLon = (lon1 + lon2) / 2;

    // Retourner les coordonnées du point médian
    return { latitude: midLat, longitude: midLon };
}

// Exemple d'utilisation
const pointMidle1 = { latitude: -7.556323, longitude: 6.935652 }; // Paris
const pointMidle2 = { latitude: -7.084396, longitude: 7.768839 }; // New York

const midpoint = getMidpoint(pointMidle1.latitude, pointMidle1.longitude, pointMidle2.latitude, pointMidle2.longitude);
console.log(`Le point médian est à la latitude ${midpoint.latitude}, longitude ${midpoint.longitude}`);

var PtMidle1 =[pointMidle1.longitude,pointMidle1.latitude];
var PtMidle2 =[pointMidle2.longitude,pointMidle2.latitude];
L.marker(PtMidle1).addTo(map);
L.marker(PtMidle2).addTo(map);
L.marker([midpoint.longitude,midpoint.latitude]).addTo(map).bindPopup('Milieu');
let droiteMidle1 = L.polyline([PtMidle1, PtMidle2], {color: 'red'}).addTo(map);
	var circle = L.circle([midpoint.longitude,midpoint.latitude], {
	    color: 'red',
	    fillColor: 'red',
	    fillOpacity: 0.1,
	    weight:1,
	    radius: 5000
	}).addTo(map);


  
 // --------------------TROUVER L'INTERSECTION ENTRE DEUX POINS --------------------

// Définir les coordonnées des points pour les droites
let point1 = [7.068839, -7.084396];
let point2 = [6.443879, -6.215707];
let point3 = [7.192195, -6.3481];
let point4 = [6.127101, -6.897625];

	var circle = L.circle([point1[0],point1[1]], {
	    color: 'red',
	    fillColor: 'red',
	    fillOpacity: 0.1,
	    weight:1,
	    radius: 500
	}).addTo(map);
	var circle = L.circle([point2[0],point2[1]], {
	    color: 'red',
	    fillColor: 'red',
	    fillOpacity: 0.1,
	    weight:1,
	    radius: 500
	}).addTo(map);
	var circle = L.circle([point3[0],point3[1]], {
	    color: 'red',
	    fillColor: 'red',
	    fillOpacity: 0.1,
	    weight:1,
	    radius: 500
	}).addTo(map);
	var circle = L.circle([point4[0],point4[1]], {
	    color: 'red',
	    fillColor: 'red',
	    fillOpacity: 0.1,
	    weight:1,
	    radius: 500
	}).addTo(map);


// Tracer les droites sur la carte
let droite1 = L.polyline([point1, point2], {color: 'red'}).addTo(map);
let droite2 = L.polyline([point3, point4], {color: 'blue'}).addTo(map);

// Calculer les coordonnées de l'intersection
let intersection = trouverIntersection(point1, point2, point3, point4);

// Tracer le point d'intersection sur la carte
L.marker(intersection).addTo(map).bindPopup('Intersection');

// Fonction pour trouver l'intersection entre deux droites
function trouverIntersection(point1, point2, point3, point4) {
    let x1 = point1[0], y1 = point1[1];
    let x2 = point2[0], y2 = point2[1];
    let x3 = point3[0], y3 = point3[1];
    let x4 = point4[0], y4 = point4[1];

    // Calculer les coordonnées de l'intersection
    let x = ((x1*y2 - y1*x2) * (x3-x4) - (x1-x2) * (x3*y4 - y3*x4)) / ((x1-x2) * (y3-y4) - (y1-y2) * (x3-x4));
    let y = ((x1*y2 - y1*x2) * (y3-y4) - (y1-y2) * (x3*y4 - y3*x4)) / ((x1-x2) * (y3-y4) - (y1-y2) * (x3-x4));
   
    return [x, y];
}






 // --------------------TRACER UNE ELLIPSE ENTRE DEUX POINS --------------------

// Définir les coordonnées des deux points (début et fin)
let startPoint = L.latLng(6.443879,-6.215707);
let endPoint = L.latLng(7.068839,-7.084396);

// Calculer le milieu entre les deux points
let centerPoint = L.latLngBounds(startPoint, endPoint).getCenter();


// Calculer la distance entre les deux points (en mètres)
let distance = startPoint.distanceTo(endPoint);

// Calculer le demi-axe long (50% de la distance) et le demi-axe court (25% de la distance)
let demiAxeLong = distance / 2;
let demiAxeCourt = demiAxeLong * 0.1; // Tu peux ajuster ce coefficient selon ton besoin

// Calculer l'angle entre les deux points
// let angle = Math.atan2(endPoint.lng - startPoint.lng, endPoint.lat - startPoint.lat)*(180/Math.PI);
let angle = Math.atan2(endPoint.lat - startPoint.lat, endPoint.lng - startPoint.lng)*(180/Math.PI);
// if (angle<0) {angle +=360;}

// Créer une ellipse
let ellipse = L.ellipse(centerPoint,[demiAxeLong, demiAxeCourt] , -angle, {
    color: 'green',
    fillColor: 'green',
    fillOpacity: 0.5
}).addTo(map);
console.log(centerPoint);
console.log(angle);
// Ajouter les marqueurs pour les points de départ et d'arrivée
L.marker(startPoint).addTo(map);
L.marker(endPoint).addTo(map);

 // -------------------- FIN DE LA JOURNEE --------------------*/