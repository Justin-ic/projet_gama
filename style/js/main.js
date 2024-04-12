

/*
https://www.youtube.com/watch?v=ViIR9HzLDdo

*/

// Inite map

var map = L.map('map').setView([7.483100, -5.716920], 7);

var mainMap = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
});

mainMap.addTo(map);


// Default marqueur
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
function setMarker(operateur,idMarker,nom,location,Tx_P,frequence,height,tilt,azimuth,Long,Lat){
// function setMarker(operateur,idMarker,nom,location,height,tilt,azimuth,Long,Lat){

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
	var divPopup="<div><b>Operateur:</b>"+operateur+"<br><b>Nom:</b>"+nom+"<br><b>Localisation:</b>"+location+"<br><b>Hauteur:</b>"+height+"<br><b>Tilt:</b>"+tilt+"<br><b>Azimut:</b>"+azimuth+"<br><b>Longitude:</b>"+Long+"<br><b>Latitude:</b>"+Lat+" </div>";
	costomMarqueur.bindPopup(divPopup);
	// var costomMarqueur = L.marker([7.483100, -5.716920], costomIcon).addTo(map);


	var color = "";
	if (operateur.toLowerCase() == "moov") {color="#065cab"}else if (operateur.toLowerCase() == "mtn") {color="#fbcb04"}else{color="#fb6304"}
	var circle = L.circle([Long,Lat], {
	    color: color,
	    fillColor: color,
	    fillOpacity: 0.1,
	    weight:1,
	    radius: 20000
	}).addTo(map).bindPopup("<b>Operateur:"+operateur.toUpperCase()+"</b><br>"+nom);

   // } // Fin onload
}

data = Array(
	// { "Operateur": "mnt", "Nom": "Antenne Abobo 2 PK18", "Localisation": "Abobo", "Hauteur": 30, "Tilt": 20, "Azimut": 30, "Longitude": 5.390813,-4.017894, "Latitude": -4.017894}
	["mtn",2,"Antenne Abobo 2 PK18","Abobo",20,29,30,5.390813,-4.017894],
	["mtn",2,"Antenne Abobo 2 PK18","Abobo",20,29,30,5.389077,-4.016011],
	["moov",2,"Antenne Abobo 2 PK18","Abobo",20,29,30,5.395797, -4.017141],
	["mtn",2,"Antenne M'bahiakro","M'bahiakro",20,29,30,7.776929, -3.935311],
	["orange",1,"Worodougou","Worodougou",20,29,30,8.639274, -7.136666],
	["mtn",1,"Antenne Aghien","Aghien, Abidjan",20,29,30,5.385849, -3.997097],
	["moov",1,"Antenne Soubré","Soubré",20,29,30,6.123073, -7.020676],
	["mtn",2,"Antenne Marcory Centre","Marcory Centre, Abidjan",20,29,30,5.303997, -3.990157],
	["mtn",2,"Antenne Bondoukou","Bondoukou",20,29,30,8.286521, -3.887349]
	);

// console.log(data);


setMarker("mtn",2,"Antenne Bondoukou","Bondoukou",20,29,30,8.286521, -3.887349);
setMarker("mtn",2,"Antenne Abobo 2 PK18","Abobo",20,29,30,5.390813,-4.017894);
// setMarker("mtn",2,"Antenne Abobo 2 PK18","Abobo",20,29,30,5.389077,-4.016011);
// setMarker("moov",2,"Antenne Abobo 2 PK18","Abobo",20,29,30,5.395797, -4.017141);
setMarker("mtn",2,"Antenne M'bahiakro","M'bahiakro",20,29,30,7.776929, -3.935311);
setMarker("orange",1,"Worodougou","Worodougou",20,29,30,8.639274, -7.136666);
setMarker("mtn",1,"Antenne Aghien","Aghien, Abidjan",20,29,30,5.385849, -3.997097);
setMarker("moov",1,"Antenne Soubré","Soubré",20,29,30,6.123073, -7.020676);
// setMarker("mtn",2,"Antenne Marcory Centre","Marcory Centre, Abidjan",20,29,30,5.303997, -3.990157);





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




  


/*





img.width img.height== main.js:114:10
169 176 main.js:115:10
C'est bon main.js:118:10
169 176 main.js:119:10
img.width img.height== main.js:114:10
169 176 main.js:115:10
C'est bon main.js:118:10
169 176 main.js:119:10
img.width img.height== main.js:114:10
169 176 main.js:115:10
C'est bon main.js:118:10
169 176 main.js:119:10
img.width img.height== main.js:114:10
169 176 main.js:115:10
C'est bon main.js:118:10
169 176 main.js:119:10
img.width img.height== main.js:114:10
169 176 main.js:115:10
C'est bon main.js:118:10
169 176 main.js:119:10
img.width img.height== main.js:114:10
165 177 main.js:115:10
C'est bon main.js:118:10
165 177 main.js:119:10
img.width img.height== main.js:114:10
109 177 main.js:115:10
C'est bon main.js:118:10
109 177 main.js:119:10
img.width img.height== main.js:114:10
111 177 main.js:115:10
C'est bon main.js:118:10
111 177 main.js:119:10
img.width img.height== main.js:114:10
109 178 main.js:115:10
C'est bon





*/