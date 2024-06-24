

/*
https://www.youtube.com/watch?v=ViIR9HzLDdo

*/


function simulation(P,frequence,TypeZone,Hb,Hm,nivSignal=-100){
	console.log(" P= "+P+" frequence= "+frequence+" TypeZone= "+TypeZone+" Hb= "+Hb+" Hm= "+Hm);



	var A; var B; var Cm =0; var Ah=0; var Q_Coro=0; var Ghe; var Gre;

	// Calcul des gains d'antenne
	Ghe = 20*Math.log10(Hb/200);
	if (Hm < 3) {Gre = 10*Math.log10(Hb/3);} else {Gre = 20*Math.log10(Hb/3);}
	var correcteur=0; // Correcteur final
	// MAPL = -Gain_Ant=17.7  + 𝑵_𝟎=−𝟗𝟔 + F_B_BS=5 + Marge_sh=2.33 + M_pene=15 + M_interf=3 + P_corp_h=3+ Aff
	// -17,7-96+5+2,33+15+3+3
	// var AMPL = 106.63; // Affaiblissement du bilan de liaison
	var AMPL = -85.37; // Affaiblissement du bilan de liaison

	var TypeZoneLocal = TypeZone;
	if (TypeZoneLocal.slice(0,8) == "montagne") {
		console.log("Type montagne");
		var Am=0; var Bm=0; var y=0; var d0 = 100; var lamda = 300/frequence;
		correcteur=-34.3;

		Am = 20*Math.log10((4*Math.PI*d0)/lamda);
		/* montagneuseA = Montagneuse avec lourde densité d'arbres
		 montagneuseB = Vallonné avec densité modérée d'arbres
		 montagneuseC = Terrain plat avec densité d'arbres*/
		if (TypeZoneLocal == "montagneuseA") {
			console.log("Type montagneuseA //"+d0);
			Bm = ((8.2+10.6)/2) + 6*Math.log10(frequence/2000) -10.5*Math.log10(Hm/2); // Terrain type A et B
			y = 4.6 - (0.0075*Hb) + (12.6/Hb);
			// y = 3.6 - (0.005*Hb) + (20/Hb);
		} else if (TypeZoneLocal == "montagneuseB") {
			Bm = ((8.2+10.6)/2) + 6*Math.log10(frequence/2000) -10.5*Math.log10(Hm/2); // Terrain type A et B
			y = 4 - (0.0065*Hb) + (17.1/Hb);
		} else {
			Bm = ((8.2+10.6)/2) + 6*Math.log10(frequence/2000) -20*Math.log10(Hm/2); // Terrain type C
			// y = 4.6 - (0.0075*Hb) + (12.6/Hb);
			y = 3.6 - (0.005*Hb) + (20/Hb);
		}

		console.log(nivSignal); 
		// var exposant =((Number(P) +Number(Gre)+Number(Ghe) - Number(nivSignal) - Number(AMPL) -Number(Am)-Number(Bm))/Number(10*y) ) ;
		var exposant =((Number(P) +Number(Gre)+Number(Ghe) - Number(nivSignal) - Number(AMPL) - Number(correcteur) -Number(Am)-Number(Bm))/Number(10*y) ) ;
		var Erceig =  Number(Am) + 10*y*Math.log10(100/d0) + Number(Bm);
		var Rayon = Math.pow(10,exposant);

		console.log("Dans simulation nivSignal="+nivSignal+" Am="+Am+" Bm="+Bm+" y**="+(10*y*Math.log10(3/d0))+" P="+P+" y="+y+" Ghe="+Ghe+" Gre="+Gre+" Op="+( exposant )+ " Erceig="+Erceig);
		console.log(" Rayon="+Rayon+" m");
		/*La distance de Erceig est en mètre et doit être > 100m pour de meilleurs résultas
		Sinon à partire d=2m, on a des résultats
		// 3jours pour comprendre ça !!!😊😢
		La distance de Erceig est en mètre car son d0=100 qui ne peut pas être en killomètre*/
		return Rayon;
	}


	// Calcul da A et B en fonction de la fréquence
	if (frequence < 1500) {
		A = 69.55 + 26.161*Math.log10(frequence) - 13.82*Math.log10(Hb);
		B = 44.9-6.55*Math.log10(Hb);
	} else if ( 1500 <= frequence <= 2000) {
		A = 46.3 + 33.9*Math.log10(frequence) - 13.28*Math.log10(Hb);
		B = 44.9-6.55*Math.log10(Hb);
	}


	// Ah par defaut
	Ah = (1.1*Math.log10(frequence) - 0.7)*Hm - (1.56*Math.log10(frequence) - 0.8);

	// Calcul de Ah et de la quantitée de correction
	if(TypeZone == "urbinDense"){ // Plateau
		if (200 < frequence <= 400) {
			Ah = 8.29*Math.pow(Math.log10(1.54*Hm), 2) - 1.1;
		} else if (400 < frequence <= 1500) {
			Ah = 3.2*Math.pow(Math.log10(11.75*Hm), 2) - 4.97;
		}
	} else if(TypeZone == "urbain"){ // Ville d'Abidjan
		if (400 < frequence <= 1500) {
			Ah = (1.1*Math.log10(frequence -0.7))*Hm - (1.56*Math.log10(frequence -0.8));
			Cm = 0; // Un facteur corecteur
		} else if (1500 < frequence <= 2000) {
			// Ah prend la valeur par défaut
			Cm = 3; // Un facteur corecteur
		}
	} else if(TypeZone == "subUrbaine"){ // Ville de l'intérieur
		// J'utilise Urbain + Une quantité de correction
		if (400 < frequence <= 1500) {
			Ah = (1.1*Math.log10(frequence -0.7))*Hm - (1.56*Math.log10(frequence -0.8));
			Cm = 0; // Un facteur corecteur
		} else if (1500 < frequence <= 2000) {
			// Ah prend la valeur par défaut
			Cm = 3; // Un facteur corecteur
		}
		Q_Coro = - 2*Math.pow(Math.log10(frequence/28),2) - 5.4;
	} else if(TypeZone == "rurale"){ // Vilage Campement
		// J'utilise lz formule générale + Une quantité de correction
		Q_Coro = - 4.78*Math.pow(Math.log10(frequence),2) - 35.94; // Car pas de désert chez nous
	}


	// Calcul des gains d'antenne
	Ghe = 20*Math.log10(Hb/200);
	if (Hm < 3) {Gre = 10*Math.log10(Hb/3);} else {Gre = 20*Math.log10(Hb/3);}
	var correcteur=117.2; // Correcteur final
	// MAPL = -Gain_Ant=17.7  + 𝑵_𝟎=−𝟗𝟔 + F_B_BS=5 + Marge_sh=2.33 + M_pene=15 + M_interf=3 + P_corp_h=3+ Aff
	// -17,7-96+5+2,33+15+3+3
	var AMPL = -85.37; // Affaiblissement du bilan de liaison
	// var AMPL = 85.37; // Affaiblissement du bilan de liaison

	if (TypeZone == "urbinDense") { 
		correcteur = 65;
	} else if (TypeZone == "urbaine") {
		correcteur = 65;
	} else if (TypeZone == "subUrbaine") {
		correcteur = 117.2;
	} else if (TypeZone == "rurale") {
		correcteur = 117.2;
	}
	console.log(nivSignal);
	// var exposant =((Number(P) - Number(nivSignal) - Number(AMPL) +70 +Number(Gre)+Number(Ghe)-Number(A)-Number(Ah)-Number(Cm)-Number(Q_Coro))/Number(B));
	var exposant =((Number(P) - Number(nivSignal) - Number(AMPL) - Number(correcteur) +Number(Gre)+Number(Ghe)-Number(A)-Number(Ah)-Number(Cm)-Number(Q_Coro))/Number(B));
	var COST =  A + B*Math.log10(0.7) - Cm;
	var Rayon = Math.pow(10,exposant);

	console.log("Dans simulation nivSignal="+nivSignal+" A="+A+" B="+B+" C="+Cm+" P="+P+" Ghe="+Ghe+" Gre="+Gre+" Op="+( exposant )+ " COST="+COST);
	console.log(" Rayon="+Rayon*1000+" m");
	return Rayon*1000;
}





function simulation_xx(P,frequence,TypeZone,Hb,Hm,nivSignal=-100){
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
	B = (44.9-6.55)*Math.log10(Hb);
	var HATA = A + B*Math.log10(d) - C;
	dataHATA[frequence] = HATA; 


	   Rayon=0.9842832638457951 m -1
	   Rayon=3.408097000877437 m -20
*/


	A = 46.3 + 33.9*Math.log10(frequence) - 13.28*Math.log10(Hb) - Ah;
	B = (44.9-6.55)*Math.log10(Hb);
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
var dataAllMarker = [];
var foncArgs = [];
var markerId = 0;


var dataMarkerMoovId = [];
var dataMarkerMtnId = [];
var dataMarkerOranId = [];
var dataMarkerUpToDate = [];
var MarkerMoovId =0;
var MarkerMtnId =0;
var MarkerOranId =0;

if ($(window).width() < 990) {var zoom=6;} else {var zoom=7;}
var map = L.map('map').setView([7.483100, -5.716920], zoom);

// Ajouter une couche de tuiles OpenStreetMap
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
	startAngle: -60,
	stopAngle: 20,
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

function setMarker(operateur,idMarker=1,nom=null,location,height,tilt=null,azimuth=null,Long,Lat,P,frequence,TypeZone,nivSignal,MarkModif=null){
	var itmp = 0;
	/*foncArgs[itmp++]=operateur; foncArgs[itmp++]=idMarker; foncArgs[itmp++]=nom; 
	foncArgs[itmp++]=location; foncArgs[itmp++]=height; foncArgs[itmp++]=tilt; 
	foncArgs[itmp++]=azimuth; foncArgs[itmp++]=Long; foncArgs[itmp++]=Lat; foncArgs[itmp++]=P; 
	foncArgs[itmp++]=frequence; foncArgs[itmp++]=TypeZone; foncArgs[itmp++]=nivSignal;*/
	foncArgs[0]=operateur; foncArgs[1]=idMarker; foncArgs[2]=nom; 
	foncArgs[3]=location; foncArgs[4]=height; foncArgs[5]=tilt; 
	foncArgs[6]=azimuth; foncArgs[7]=Long; foncArgs[8]=Lat; foncArgs[9]=P; 
	foncArgs[10]=frequence; foncArgs[11]=TypeZone; foncArgs[12]=nivSignal;

	var heightUser = 3;
	var Radius = simulation(P,frequence,TypeZone,height,heightUser,nivSignal);
	if (frequence < 400 || frequence > 2600) { 
		alert("Désolé, la frequence doit appartenir à [400 MHz, 2600 MHz].");
		return 0;
	}else if ((Radius/1000) > 200) {
		alert("Désolé, la couverture est trop grande ( > 200 Km ). \rRevoyez les paramètres s'il vous plaît !");
		return 0;
	}else if (TypeZone.indexOf("montagne") !== -1) {
		if (Radius < 2) {
			alert("Désolé! Le rayon est trop petit (< 2m); non autorisé par le modèle.");
			return 0;
		} else if (Radius >= 2 && Radius < 100) {
			alert("Attention! d < 100. \rCette configuration ne donne pas de bon résultats.");
		}
	}
	// var Radius = simulation(P,frequence,TypeZone,Hb,Hm);
	// console.log("okokok");
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
	var LocalMarkerId;
	if (MarkModif == null) {LocalMarkerId= ++markerId}else{LocalMarkerId=MarkModif;} // Si c'est un nouveau marker, j'augment
	var markerOptions = {
		icon: costomIcon,
		costomId: LocalMarkerId,
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
	divPopup += (Radius/1000).toFixed(2)+" Km ";

	divPopup +='<div class="d-flex align-items-center justify-content-center ">';
	divPopup +='<button class="btn btn-success  p-1 detailBtn mt-1" ';
	divPopup +='data-bs-toggle="modal"';
	divPopup +='data-bs-target="#ModifPilone" data-bs-whatever="'+LocalMarkerId+'">Modifier</button>';
	divPopup +='</div>';
	divPopup +='</div>';
	costomMarqueur.bindPopup(divPopup);
	// var costomMarqueur = L.marker([7.483100, -5.716920], costomIcon).addTo(map);


	var color = "";
	if (operateur.toLowerCase() == "moov") {color="#065cab"}else if (operateur.toLowerCase() == "mtn") {color="#fbcb04"}else{color="#fb6304"}
	
	if (azimuth == -1) {
		var circle = L.circle([Long,Lat], {
			color: color,
			fillColor: color,
			fillOpacity: 0.1,
			weight:1,
			radius: Radius
		}).addTo(map).bindPopup("<b>Operateur:"+operateur.toUpperCase()+"</b><br>"+nom);
	} else {
		console.log(Number(Number(azimuth)-60));
		console.log(Number(Number(azimuth)+60));
		var circle = L.semiCircle([Long,Lat], {
			radius: Radius,
			startAngle: Number(Number(azimuth)-60),
			stopAngle: Number(Number(azimuth)+60),
			color: color,
			fillColor: color,
			fillOpacity: 0.1,
			weight:1 
		}).addTo(map);
	}
	

	
	var MarIndiv=[];
    if (operateur.toLowerCase() == "moov") {
    	MarIndiv =['moov',MarkerMoovId];
    	dataMarkerMoovId[MarkerMoovId++] = costomMarqueur;
    	dataMarkerMoovId[MarkerMoovId++] = circle;
    } else if (operateur.toLowerCase() == "mtn") {
    	MarIndiv =['mtn',MarkerMtnId];
    	dataMarkerMtnId[MarkerMtnId++] = costomMarqueur;
    	dataMarkerMtnId[MarkerMtnId++] = circle;
    } else {
    	MarIndiv =['orange',MarkerOranId];
    	dataMarkerOranId[MarkerOranId++] = costomMarqueur;
    	dataMarkerOranId[MarkerOranId++] = circle;
    }

    if (MarkModif == null) {
    	dataAllMarker[LocalMarkerId] = [[costomMarqueur],[circle],[foncArgs],MarIndiv];
    }else{
    	dataAllMarker[MarkModif] = [[costomMarqueur],[circle],[foncArgs],MarIndiv];
    }
    
	foncArgs =[]; MarIndiv =[];
}










/*

Pylône:
location
Long
Lat
TypeZone



antenne: 
idPylone
operateur
height
tilt
azimuth
Puissance
frequence

*/





// simulation(location,frequence,TypeZone,Hb,Hm,d)
// location donne le type de zone; Tx_P puissance antenne relais
// function setMarker(operateur,idMarker,nom,location,Tx_P,frequence,height,tilt,azimuth,Long,Lat){
// function setMarker(operateur,idMarker,nom,location,height,tilt,azimuth,Long,Lat){
function setMarkerDefault(operateur,idMarker=1,nom=null,location,height,tilt=null,azimuth=null,Long,Lat,P,frequence,TypeZone){
	var itmp = 0;
	/*foncArgs[itmp++]=operateur; foncArgs[itmp++]=idMarker; foncArgs[itmp++]=nom; 
	foncArgs[itmp++]=location; foncArgs[itmp++]=height; foncArgs[itmp++]=tilt; 
	foncArgs[itmp++]=azimuth; foncArgs[itmp++]=Long; foncArgs[itmp++]=Lat; foncArgs[itmp++]=P; 
	foncArgs[itmp++]=frequence; foncArgs[itmp++]=TypeZone; foncArgs[itmp++]=nivSignal;*/
	foncArgs[0]=operateur; foncArgs[1]=idMarker; foncArgs[2]=nom; 
	foncArgs[3]=location; foncArgs[4]=height; foncArgs[5]=tilt; 
	foncArgs[6]=azimuth; foncArgs[7]=Long; foncArgs[8]=Lat; foncArgs[9]=P; 
	foncArgs[10]=frequence; foncArgs[11]=TypeZone; foncArgs[12]=-100;

	var Radius = simulation(P,frequence,TypeZone,height,3);
	// var Radius = simulation(P,frequence,TypeZone,Hb,Hm);
	// console.log("okokok");

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
		costomId: ++markerId,
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
	divPopup += (Radius/1000).toFixed(2)+"  Km ";

	divPopup +='<div class="d-flex align-items-center justify-content-center ">';
	divPopup +='<button class="btn btn-success  p-1 detailBtn mt-1" ';
	divPopup +=' data-bs-toggle="modal" ';
	// divPopup +='onclick="ModifMarkers(\''+markerId+'\')" data-bs-toggle="modal" ';
	divPopup +='data-bs-target="#ModifPilone" data-bs-whatever="'+markerId+'">Modifier</button>';
	divPopup +='</div>';
	divPopup +='</div>';
	
					// data-bs-target="#evaluer" data-bs-whatever='<?=json_encode($data)?>'
				
	

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

	var MarIndiv=[];
	if (operateur.toLowerCase() == "moov") {
		MarIndiv =['moov',MarkerMoovId];
		dataMarkerMoovId[MarkerMoovId++] = costomMarqueur;
		dataMarkerMoovId[MarkerMoovId++] = circle;
	} else if (operateur.toLowerCase() == "mtn") {
		MarIndiv =['mtn',MarkerMtnId];
		dataMarkerMtnId[MarkerMtnId++] = costomMarqueur;
		dataMarkerMtnId[MarkerMtnId++] = circle;
	} else {
		MarIndiv =['orange',MarkerOranId];
		dataMarkerOranId[MarkerOranId++] = costomMarqueur;
		dataMarkerOranId[MarkerOranId++] = circle;
	}

	dataAllMarker[markerId] = [[costomMarqueur],[circle],[foncArgs],MarIndiv];
	foncArgs =[]; MarIndiv =[];
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
/*data = Array(
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
*/

// console.log (data);
data.forEach(appel_f_marqueur);
function appel_f_marqueur(item, index) {
/*  console.log (index); 
  console.log (item);*/
  console.log (item[10]);

  setMarkerDefault(item[0],item[1],item[2],item[3],item[4],item[5],item[6],item[7],item[8],item[9],item[10],item[11]); 
}



const exampleModal = document.getElementById('ModifPilone')
exampleModal.addEventListener('show.bs.modal', event => {
  // Button that triggered the modal
		var button = event.relatedTarget
  // Extract info from data-bs-* attributes
		var data = button.getAttribute('data-bs-whatever')
  // If necessary, you could initiate an AJAX request here
  // and then do the updating in a callback.
  //
  // Update the modal's content.
	console.log(data);

	var prop=dataAllMarker[data][2][0];
	console.log(prop[12]);
	$('[name="M_operateur"]').val(prop[0]);
	$('[name="M_nomAntenne"]').val(prop[2]);
	$('[name="M_localisation"]').val(prop[3]);
	$('[name="M_puissance"]').val(prop[9]);
	$('[name="M_longitude"]').val(prop[7]);
	$('[name="M_latitude"]').val(prop[8]);
	$('[name="M_hauteur"]').val(prop[4]);
	$('[name="M_frequence"]').val(prop[10]);
	$('[name="M_typeZone"]').val(prop[11]);
	$('[name="M_nivSignal"]').val(prop[12]);

	$('[name="idMarker"]').val(data); // à utilisé dans la fonction ModifAntenne

	
})




function ModifAntenne() {
/*
    Je ne dois pas enlever la ligne du tableau dataAllMarker mais je dois modifier 
    car les indices sont utilisés dans le bouton modifier du title marker*/


	// Je nétoie la carte
	var id = $('[name="idMarker"]').val();
	map.removeLayer(dataAllMarker[id][0][0]);
	map.removeLayer(dataAllMarker[id][1][0]);

	// J'enlève l'élément du marker indiv
	var op=dataAllMarker[id][3][0];
	var index=Number(dataAllMarker[id][3][1]);
	
	if (op == "moov") {
		dataMarkerMoovId.splice(index, 2); // Enlève le marker et son cercle
	} else if (op == "mtn") {
		dataMarkerMtnId.splice(index, 2); // Enlève le marker et son cercle
	} else {
		dataMarkerOranId.splice(index, 2); // Enlève le marker et son cercle xxxxxxxxxxxxXX
	}

	var operateur = $('[name="M_operateur"]').val();
	var nomAntenne = $('[name="M_nomAntenne"]').val();
	var localisation = $('[name="M_localisation"]').val();
	var puissance = $('[name="M_puissance"]').val();
	var longitude = $('[name="M_longitude"]').val();
	var latitude = $('[name="M_latitude"]').val();
	var hauteur = $('[name="M_hauteur"]').val();
	var frequence = $('[name="M_frequence"]').val();
	var typeZone = $('[name="M_typeZone"]').val();
	var nivSignal = $('[name="M_nivSignal"]').val();
	var azimut = $('[name="M_azimut"]').val();
	// console.log("xxxxxxxxxxxxX"+azimut+"X");
	if (azimut=="") {
		setMarker(operateur, 2,nomAntenne, localisation, hauteur, 0,-1,longitude, latitude, puissance, frequence, typeZone, nivSignal,id) ;
	} else {
		setMarker(operateur, 2,nomAntenne, localisation, hauteur, 0,azimut,longitude, latitude, puissance, frequence, typeZone, nivSignal,id) ;
	}
}





function togleMarkers(operateur){
	if (operateur.toLowerCase() == "moov") {
		const side = document.getElementById("togleMarkMoov");
		
		if (side.classList.contains('active')) {
			// console.log(dataMarkerMoovId[0] );
			for (var i = 0; i < dataMarkerMoovId.length; i++) {
				// console.log(dataMarkerMoovId[i]);
				// map.removeLayer(dataMarkerMoovId[i]);
        		// L'élément existe à cet index
				if (typeof dataMarkerMoovId[i] !== 'undefined') {map.removeLayer(dataMarkerMoovId[i]);}
			}
			$('#togleMarkMoov').removeClass('active');
			$('#togleMarkMoov').prop('src',"style/fontawesome/marqueurs/buttonEtteind.png");
		} else {
			for (var i = 0; i < dataMarkerMoovId.length; i++) {
				// L'élément existe à cet index
				// dataMarkerMoovId[i].addTo(map);
				if (typeof dataMarkerMoovId[i] !== 'undefined') {dataMarkerMoovId[i].addTo(map);}
			}
			$('#togleMarkMoov').addClass('active');
			$('#togleMarkMoov').prop('src', "style/fontawesome/marqueurs/buttonMoov.png");
		}
		
    } else if (operateur.toLowerCase() == "mtn") {
	    	const side = document.getElementById("togleMarkMtn");
	    	if (side.classList.contains('active')) {
	    		for (var i = 0; i < dataMarkerMtnId.length; i++) {
	    			// map.removeLayer(dataMarkerMtnId[i]);
	    			// L'élément existe à cet index
	    			if (typeof dataMarkerMtnId[i] !== 'undefined') {map.removeLayer(dataMarkerMtnId[i]);}
	    		}
	    		$('#togleMarkMtn').removeClass('active');
	    		$('#togleMarkMtn').prop('src',"style/fontawesome/marqueurs/buttonEtteind.png");

	    	} else {
	    		for (var i = 0; i < dataMarkerMtnId.length; i++) {
	    			// dataMarkerMtnId[i].addTo(map);
	    			if (typeof dataMarkerMtnId[i] !== 'undefined') {dataMarkerMtnId[i].addTo(map);}
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
	    			// map.removeLayer(dataMarkerOranId[i]);
	    			// L'élément existe à cet index
	    			if (typeof dataMarkerOranId[i] !== 'undefined') {map.removeLayer(dataMarkerOranId[i]);}
	    		}
	    		$('#togleMarkOrange').removeClass('active');
	    		$('#togleMarkOrange').prop('src',"style/fontawesome/marqueurs/buttonEtteind.png");
	    	} else {
	    		for (var i = 0; i < dataMarkerOranId.length; i++) {
	    			// dataMarkerOranId[i].addTo(map);
	    			if (typeof dataMarkerOranId[i] !== 'undefined') {dataMarkerOranId[i].addTo(map);}
	    		}
	    		$('#togleMarkOrange').addClass('active');
	    		$('#togleMarkOrange').prop('src', "style/fontawesome/marqueurs/buttonOrange.png");
	    	}

    }else if (operateur.toLowerCase() == "stop"){

	    	const side = document.getElementById("togleMarkStop");
	    	if (side.classList.contains('active')) {
	    		for (var i = 0; i < dataMarkerMtnId.length; i++) {
	    			// map.removeLayer(dataMarkerMtnId[i]);
	    			// L'élément existe à cet index
	    			if (typeof dataMarkerMtnId[i] !== 'undefined') {map.removeLayer(dataMarkerMtnId[i]);}
	    		}
	    		for (var i = 0; i < dataMarkerMoovId.length; i++) {
	    			// map.removeLayer(dataMarkerMoovId[i]);
	    			// L'élément existe à cet index
	    			if (typeof dataMarkerMoovId[i] !== 'undefined') {map.removeLayer(dataMarkerMoovId[i]);}
	    		}
	    		for (var i = 0; i < dataMarkerOranId.length; i++) {
	    			// map.removeLayer(dataMarkerOranId[i]);
	    			// L'élément existe à cet index
	    			if (typeof dataMarkerOranId[i] !== 'undefined') {map.removeLayer(dataMarkerOranId[i]);}
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
	    			// dataMarkerMtnId[i].addTo(map);
	    			if (typeof dataMarkerMtnId[i] !== 'undefined') {dataMarkerMtnId[i].addTo(map);}
	    		}
	    		for (var i = 0; i < dataMarkerMoovId.length; i++) {
	    			// dataMarkerMoovId[i].addTo(map);
	    			if (typeof dataMarkerMoovId[i] !== 'undefined') {dataMarkerMoovId[i].addTo(map);}
	    		}
	    		for (var i = 0; i < dataMarkerOranId.length; i++) {
	    			// dataMarkerOranId[i].addTo(map);
	    			if (typeof dataMarkerOranId[i] !== 'undefined') {dataMarkerOranId[i].addTo(map);}
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
} // Fin function togleMarkers



/*
Zone urbaine fortement dense 
Plateau:
5.319277, -4.016457
Rue Alphonse Daudet, Abidjan


5.330312, -4.021607
Bd Angoulvant, Abidjan




5.342793, -4.026414
Marché adjamé Abidjan


5.480830, -4.074567
Stade Olympique Alassane Ouattara d’Ebimpé, FWJG+856






Zone urbaine dense 
Treichville:
5.305969, -4.014262
Treichville Centre, Abidjan

5.306373, -4.007704
BS. PLANETE SERVICE, 20 BP 991 Abidjan 20 Treichville (Immeuble Nana Yamousso Avenue 13, Rue 38, Abidjan


Macory 
5.299221, -3.986451
AZALAÏ HOTEL ABIDJAN, 8227+5HV, 11BP1024 Abidjan 11, Rue d'Agboville, Abidjan







*/