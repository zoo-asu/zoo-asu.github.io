"use strict";angular.module("yvyUiApp",["ngAnimate","ngAria","ngCookies","ngMessages","ngResource","ngRoute","ngSanitize","ngTouch","angularUtils.directives.dirPagination"]).config(["$routeProvider",function(a){a.when("/mapa",{templateUrl:"views/mapa_zoo_asu.html",activetab:"mapa"}).when("/datos",{templateUrl:"views/data_list.html",controller:"DataTableCtrl",activetab:"datos"}).when("/about-us",{templateUrl:"views/about-us.html",activetab:"about"}).when("/",{templateUrl:"views/main.html",activetab:"home"}).otherwise({redirectTo:"/mapa"})}]),angular.module("yvyUiApp").controller("ActiveTabCtrl",["$scope","$route",function(a,b){a.route=b}]),angular.module("yvyUiApp").controller("DataTableCtrl",["$scope","zooAsuFactory",function(a,b){b.getAnimales().then(function(b){a.animales=b}),a.pagesize=10,a.sortType="nombre",a.sortReverse=!1,a.search={},a.activateSortCol=function(b){a.sortType==b?a.sortReverse=!a.sortReverse:(a.sortType=b,a.sortReverse=!1)}}]),angular.module("yvyUiApp").factory("zooAsuFactory",["$http","$q",function(a,b){return{getCentroZoo:function(){return{geometry:{coordinates:[-25.25032,-57.5721],type:"Point"},properties:{},type:"Feature"}},getGeojson:function(){return a.get("data/zoo-as.geojson").then(function(a){return a.data})},getAnimales:function(){return a.get("data/animales.json").then(function(a){return a.data})}}}]),angular.module("yvyUiApp").directive("mapaZooAsu",["zooAsuFactory","$timeout",function(a,b){return{restrict:"E",replace:!1,scope:{data:"=",filtro:"=",detalle:"=",periodo:"=",modal:"="},templateUrl:"views/directives/template_mapa.html",link:function(b,c,d){function e(a){var b,c,d="glyphicon";switch(a.properties.amenity){case"bench":c="pink",b="screenshot";break;case"waste_basket":c="black",b="trash";break;case"drinking_water":c="blue",b="tint";break;default:c="orange",b="home"}return L.AwesomeMarkers.icon({icon:b,markerColor:c,prefix:d})}function f(a){try{return"Polygon"==a.geometry.type&&"attraction"==a.properties.tourism}catch(b){return!1}}function g(a){var b=L.polygon(a.geometry.coordinates);if("undefined"!=typeof a.properties.name){var c=b.getBounds().getCenter(),d=c.lat;c.lat=c.lng,c.lng=d,L.marker(c,{icon:L.divIcon({className:"leaflet-label",html:a.properties.name,iconSize:[100,40]})}).addTo(D)}}function h(a){if("undefined"!=typeof a.properties.amenity)switch(a.properties.amenity){case"parking":return r;case"toilets":return s;case"water_point":return t;case"ranger_station":return w}else if("undefined"!=typeof a.properties.tourism)switch(a.properties.tourism){case"attraction":case"theme_park":return p;case"zoo":return u;case"museum":return w}else if("undefined"!=typeof a.properties.natural)switch(a.properties.natural){case"wood":case"grassland":case"tree":case"tree_row":return v;case"water":return t}else if("undefined"!=typeof a.properties.landuse)switch(a.properties.landuse){case"grass":case"meadow":return v}else if("undefined"!=typeof a.properties.building)switch(a.properties.building){case"school":case"yes":case"public":return w}else if("undefined"!=typeof a.properties.highway)switch(a.properties.highway){case"rest_area":return q;case"path":case"footway":case"road":return x;case"service":case"unclassified":return y}else{if("undefined"!=typeof a.properties.barrier)return z;if("undefined"!=typeof a.properties.attraction)switch(a.properties.highway){case"animal":return w}}return{color:"#ff0000",fillColor:"#ff0000",weight:4}}function i(a){var b=h(a);return{color:b.color,fillColor:b.fillColor,weight:b.weight,fillOpacity:A,dashArray:"3",opacity:1,html:"cualquier cosa"}}var j=function(){C.tilesLoaded=!0,n()},k=function(){function c(a,b){b.on({click:d})}function d(a){var c=!1;angular.forEach(n,function(d){a.target.feature.id===d.geojson_id&&(b.modal=d,c=!0)}),b.$apply(),c&&$("#descripcion-modal").modal("show"),console.log("La unidad cliqueada tiene el identificador: "+a.target.feature.id)}m();var f=C.LAYERS(),g=f.OPEN_STREET_MAPS.on("load",j),h=(f.MAPQUEST.on("load",j),f.CARTODB.on("load",j)),k=L.map("map",{maxZoom:C.zoomMax,minZoom:C.zoomMin,worldCopyJump:!0,attributionControl:!1}).setView(a.getCentroZoo().geometry.coordinates,C.zoomMin).on("baselayerchange",m),l=a.getGeojson();C.all_features=a.getGeojson(),l.then(function(a){L.geoJson(a,{pointToLayer:function(a,b){return L.marker(b,{icon:e(a)})},style:function(a){return i(a)},onEachFeature:c,filter:function(a,b){return"tree"==a.properties.natural?!1:"drystream"==a.properties.waterway?!1:"camp_site"==a.properties.tourism?!1:-1!=a.id.indexOf("node/")?!1:!0}}).addTo(k),C.geoJsonFeatures=a});var n=[];a.getAnimales().then(function(a){n=a});var o={"Calles OpenStreetMap":g,"Blanco y Negro":h};return k.addLayer(g),L.control.layers(o).addTo(k),k},l=_.throttle(function(a){if(D.getZoom()>=C.zoomMax){if(!B){var b=C.all_features,c=D.getBounds();b.then(function(a){_.filter(a.features,function(a){var b=[a.geometry.coordinates[1],a.geometry.coordinates[0]];return c.contains(b)}),_.each(a.features,function(a){f(a)&&g(a)})}),B=!0}}else B&&(D.eachLayer(function(a){"undefined"!=typeof a._icon&&a._icon.className.indexOf("leaflet-label")>-1&&D.removeLayer(a)}),B=!1)},200),m=function(){},n=function(){},o=function(){var a=L.geoJson();C.geoJsonLayer=a,C.geoJsonLayer.on("mouseover",function(a){}),C.geoJsonLayer.addTo(D),D.on("move",l)},p={color:"#6f4e37",fillColor:"#6f4e37",weight:3},q={color:"#f09109",fillColor:"#f09109",weight:3},r={color:"#ff0000",fillColor:"#ff0000",weight:3},s={color:"#0b3b0b",fillColor:"#0b3b0b",weight:3},t={color:"#1c86c6",fillColor:"#1c86c6",weight:3},u={color:"#079109",fillColor:"#079109",weight:5},v={color:"#079109",fillColor:"#079109",weight:3},w={color:"#900c3f",fillColor:"#900c3f",weight:3},x={color:"#aba8a4",fillColor:"#aba8a4",weight:3},y={color:"#8c8a87",fillColor:"#8c8a87",weight:5},z={color:"#61210b",fillColor:"#61210b",weight:3},A="0.3",B=!1,C=C||{};C.tilesLoaded=!1,C.zoomMin=17,C.zoomMax=20,C.LAYERS=function(){var a=L.tileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{minZoom:3}),b=L.tileLayer("http://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png",{attribution:'&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'}),c=L.tileLayer("http://otile{s}.mqcdn.com/tiles/1.0.0/{type}/{z}/{x}/{y}.{ext}",{type:"sat",ext:"jpg",attribution:'Tiles Courtesy of <a href="http://www.mapquest.com/">MapQuest</a> &mdash; Portions Courtesy NASA/JPL-Caltech and U.S. Depart. of Agriculture, Farm Service Agency',subdomains:"1234"});return{OPEN_STREET_MAPS:a,MAPQUEST:c,CARTODB:b}};var D=k();o()}}}]);