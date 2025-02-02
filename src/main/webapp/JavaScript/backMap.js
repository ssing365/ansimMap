var mapView = new ol.View ({
	center: ol.proj.fromLonLat([127, 37.53]), 
    minZoom : 11,
    zoom: 11,
});

var map = new ol.Map({
	target : 'map',
	view : mapView,
    controls : []
});

var layerList = [];
var draw;
//배경지도
proj4.defs('EPSG:5179', '+proj=tmerc +lat_0=38 +lon_0=127.5 +k=0.9996+x_0=1000000 +y_0=2000000 +ellps=GRS80 +units=m +no_defs');
ol.proj.proj4.register(proj4);
var baroEkey = 'C8241B5A615F7E110AC37EE2F733C0EF';
var white_edu = new ol.layer.Tile({
    title : '교육용 백지도',
    type : 'base',
    visible:false,
    source: new ol.source.WMTS({
        projection:"EPSG:5179",
        tileGrid:new ol.tilegrid.WMTS({
            origin:[-200000.0,4000000.0],
            matrixIds:["L05","L06","L07","L08","L09","L10","L11","L12","L13","L14","L15","L16","L16","L17","L18"],
            resolutions:[2088.96, 1044.48, 522.24, 261.12, 130.56, 65.28, 32.64, 16.32, 8.16, 4.08, 2.04, 1.02, 0.51, 0.255],

        }),
        layer:"white_edu_map",
        format:"image/png",
        url:"http://map.ngii.go.kr/openapi/Gettile.do?apikey="+baroEkey
    }),
});
map.addLayer(white_edu);
var Japanese = new ol.layer.Tile({
    title : 'Japanese',
    type : 'base',
    source: new ol.source.WMTS({
        projection:"EPSG:5179",
        tileGrid:new ol.tilegrid.WMTS({
            origin:[-200000.0,4000000.0],
            matrixIds:["L05","L06","L07","L08","L09","L10","L11","L12","L13","L14","L15","L16","L16","L17","L18"],
            resolutions:[2088.96, 1044.48, 522.24, 261.12, 130.56, 65.28, 32.64, 16.32, 8.16, 4.08, 2.04, 1.02, 0.51, 0.255],

        }),
        layer:"japanese_map",
        format:"image/png",
        url:"http://map.ngii.go.kr/openapi/Gettile.do?apikey="+baroEkey
    }),
    visible:false
});
map.addLayer(Japanese);
var English = new ol.layer.Tile({
    title : 'English',
    type : 'base',
    source: new ol.source.WMTS({
        projection:"EPSG:5179",
        tileGrid:new ol.tilegrid.WMTS({
            origin:[-200000.0,4000000.0],
            matrixIds:["L05","L06","L07","L08","L09","L10","L11","L12","L13","L14","L15","L16","L16","L17","L18"],
            resolutions:[2088.96, 1044.48, 522.24, 261.12, 130.56, 65.28, 32.64, 16.32, 8.16, 4.08, 2.04, 1.02, 0.51, 0.255],

        }),
        layer:"english_map",
        format:"image/png",
        url:"http://map.ngii.go.kr/openapi/Gettile.do?apikey="+baroEkey
    }),
    visible:false
}); 
map.addLayer(English);
var Korean = new ol.layer.Tile({
    title : '일반 지도',
    type : 'base',
    source: new ol.source.WMTS({
        projection:"EPSG:5179",
        tileGrid:new ol.tilegrid.WMTS({
            origin:[-200000.0,4000000.0],
            matrixIds:["L05","L06","L07","L08","L09","L10","L11","L12","L13","L14","L15","L16","L16","L17","L18"],
            resolutions:[2088.96, 1044.48, 522.24, 261.12, 130.56, 65.28, 32.64, 16.32, 8.16, 4.08, 2.04, 1.02, 0.51, 0.255],

        }),
        layer:"korean_map",
        format:"image/png",
        url:"http://map.ngii.go.kr/openapi/Gettile.do?apikey="+baroEkey
    }),
    visible:true
});
map.addLayer(Korean);
var color = new ol.layer.Tile({
    title : '색각 지도',
    type : 'base',
    source: new ol.source.WMTS({
        projection:"EPSG:5179",
        tileGrid:new ol.tilegrid.WMTS({
            origin:[-200000.0,4000000.0],
            matrixIds:["L05","L06","L07","L08","L09","L10","L11","L12","L13","L14","L15","L16","L16","L17","L18"],
            resolutions:[2088.96, 1044.48, 522.24, 261.12, 130.56, 65.28, 32.64, 16.32, 8.16, 4.08, 2.04, 1.02, 0.51, 0.255],

        }),
        layer:"color_map",
        format:"image/png",
        url:"http://map.ngii.go.kr/openapi/Gettile.do?apikey="+baroEkey
    }),
    visible:false
});
map.addLayer(color);
var Chinese = new ol.layer.Tile({
    title : 'Chinese',
    type : 'base',
    source: new ol.source.WMTS({
        projection:"EPSG:5179",
        tileGrid:new ol.tilegrid.WMTS({
            origin:[-200000.0,4000000.0],
            matrixIds:["L05","L06","L07","L08","L09","L10","L11","L12","L13","L14","L15","L16","L16","L17","L18"],
            resolutions:[2088.96, 1044.48, 522.24, 261.12, 130.56, 65.28, 32.64, 16.32, 8.16, 4.08, 2.04, 1.02, 0.51, 0.255],

        }),
        layer:"chinese_map",
        format:"image/png",
        url:"http://map.ngii.go.kr/openapi/Gettile.do?apikey="+baroEkey
    }),
    visible:false
});
map.addLayer(Chinese);

var Satellite = new ol.layer.Tile({
    title : '위성지도',
    type : 'base',
    source: new ol.source.WMTS({
        projection:"EPSG:5179",
        tileGrid:new ol.tilegrid.WMTS({
            origin:[-200000.0,4000000.0],
            matrixIds:["L05","L06","L07","L08","L09","L10","L11","L12","L13","L14","L15","L16","L16","L17","L18"],
            resolutions:[2088.96, 1044.48, 522.24, 261.12, 130.56, 65.28, 32.64, 16.32, 8.16, 4.08, 2.04, 1.02, 0.51, 0.255],

        }),
        layer:"satellite_map",
        format:"image/png",
        url:"http://map.ngii.go.kr/openapi/Gettile.do?apikey="+baroEkey
    }),
    visible:false
});
map.addLayer(Satellite);



function backMapBtn(){
    var backMapBtn = document.getElementById("backMapBtn")
    var backMapList = document.getElementById("backMapList")
    if (backMapBtn.value=="yes"){
        backMapBtn.value="no";
        backMapBtn.style.backgroundColor="rgba(0,60,136,1)"
        backMapBtn.style.color="white"
        backMapBtn.onmouseover = function()
        {
          this.style.backgroundColor = "rgba(0,60,136,0.6)";
        }
        backMapBtn.onmouseleave = function(){
          this.style.backgroundColor ="rgba(0,60,136,1)";
          this.style.color="white"
        }
        backMapList.style.display = 'block';
    } else {
        backMapBtn.value="yes";
        backMapBtn.style.backgroundColor="rgba(0, 60, 136,0.6)"
        backMapBtn.style.color="black"
        backMapBtn.onmouseover=function(){
            this.style.backgroundColor="rgba(0,60,136,1)"
        }
        backMapBtn.onmouseleave = function(){
            this.style.backgroundColor ="rgba(22, 85, 167, 0.6)";
          }
        backMapList.style.display = 'none';
    }
}
function changeBackMap(tileMap){
    Korean.setVisible(false);
    color.setVisible(false);
    Japanese.setVisible(false);
    Chinese.setVisible(false);
    white_edu.setVisible(false);
    Satellite.setVisible(false);
    English.setVisible(false);
    tileMap.setVisible(true);
}
// // //hover
// var selectPointerMove = new ol.interaction.Select({
//     condition: ol.events.condition.pointerMove
//   });
// map.addInteraction(selectPointerMove);
// selectPointerMove.on('select', function(e) {
// document.getElementById('status').innerHTML = '&nbsp;' +
//     e.target.getFeatures().getLength() +
//     ' selected features (last operation selected ' + e.selected.length +
//     ' and deselected ' + e.deselected.length + ' features)';
// });
  

//마우스 포지션
var mousePosition = new ol.control.MousePosition({
    className : "mousePosition",
	projection : "EPSG:4326",
	coordinateFormat : ol.coordinate.toStringHDMS
});
map.addControl(mousePosition);

//축척바
var scaleControl = new ol.control.ScaleLine
map.addControl(scaleControl);

// 현위치 찾기
var intervalAutolocate;
var posCurrent;

var geolocation = new ol.Geolocation({
    trackingOptions: {
        enableHighAccuracy: true,
    },
    tracking: true,
    projection: mapView.getProjection()
});

var positionFeature = new ol.Feature();
positionFeature.setStyle(
    new ol.style.Style({
        image: new ol.style.Circle({
            radius: 6,
            fill: new ol.style.Fill({
                color: '#3399CC',
            }),
            stroke: new ol.style.Stroke({
                color: '#fff',
                width: 2,
            }),
        }),
    })
);
var accuracyFeature = new ol.Feature();

var currentPositionLayer = new ol.layer.Vector({
    map: map,
    source: new ol.source.Vector({
        features: [accuracyFeature, positionFeature],
    }),
});

function startAutolocate() {
    var coordinates = geolocation.getPosition();
    positionFeature.setGeometry(coordinates ? new ol.geom.Point(coordinates) : null);
    mapView.setCenter(coordinates);
    mapView.setZoom(16);
    accuracyFeature.setGeometry(geolocation.getAccuracyGeometry());
    intervalAutolocate = setInterval(function () {
        var coordinates = geolocation.getPosition();
        var accuracy = geolocation.getAccuracyGeometry()
        positionFeature.setGeometry(coordinates ? new ol.geom.Point(coordinates) : null);
        map.getView().setCenter(coordinates);
        mapView.setZoom(16);
        accuracyFeature.setGeometry(accuracy);
    }, 20000);
}

function stopAutolocate() {
    clearInterval(intervalAutolocate);
    positionFeature.setGeometry(null);
    accuracyFeature.setGeometry(null);
}

// live location
$("#liveLocationBtn").on("click", function (event) {
    $("#liveLocationBtn").toggleClass("clicked");
    if ($("#liveLocationBtn").hasClass("clicked")) {
        startAutolocate();
    } else {
        stopAutolocate();
    }
});