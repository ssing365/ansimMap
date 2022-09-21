//범죄지수 레이어
var crmLv1 = new ol.layer.Image({
    title : "등급 1",
    type : 'Layer',
    hover : true,
    visible : false,
    source : new ol.source.ImageWMS({
        url : "http://localhost:8080/geoserver/Ansim/wms",
        params : {"LAYERS":"Ansim:crime_grade_1","TILED":true},
        serverType : 'geoserver',
    })
});
map.addLayer(crmLv1);
var crmLv2 = new ol.layer.Image({
    title : "등급 2",
    type : 'Layer',
    hover : true,
    visible : false,
    source :  new ol.source.ImageWMS({
        url : "http://localhost:8080/geoserver/Ansim/wms",
        params : {"LAYERS":"Ansim:crime_grade_2","TILED":true},
        serverType : 'geoserver',
    })
});
map.addLayer(crmLv2);
var crmLv3 = new ol.layer.Image({
    title : "등급 3",
    type : 'Layer',
    hover : true,
    visible : false,
    source :  new ol.source.ImageWMS({
        url : "http://localhost:8080/geoserver/Ansim/wms",
        params : {"LAYERS":"Ansim:crime_grade_3","TILED":true},
        serverType : 'geoserver',
    })
});
map.addLayer(crmLv3);
var crmLv4 = new ol.layer.Image({
    title : "등급 4",
    type : 'Layer',
    hover : true,
    visible : false,
    source : new ol.source.ImageWMS({
        url : "http://localhost:8080/geoserver/Ansim/wms",
        params : {"LAYERS":"Ansim:crime_grade_4","TILED":true},
        serverType : 'geoserver',
    })
});
map.addLayer(crmLv4);
var crmLv5 = new ol.layer.Image({
    title : "등급 5",
    type : 'Layer',
    hover : true,
    visible : false,
    source : new ol.source.ImageWMS({
        url : "http://localhost:8080/geoserver/Ansim/wms",
        params : {"LAYERS":"Ansim:crime_grade_5","TILED":true},
        serverType : 'geoserver',
    })
});  
map.addLayer(crmLv5);

var levelAll = document.getElementById("levelAll");
function level(x){
    switch(x){
        case 5 :
            if(crmLv5.getVisible()==false) crmLv5.setVisible(true);
            else if(crmLv5.getVisible()==true) crmLv5.setVisible(false);
            break;
        case 4 :
            if(crmLv4.getVisible()==false) crmLv4.setVisible(true);
            else if(crmLv4.getVisible()==true) crmLv4.setVisible(false);
            break;
        case 3 :
            if(crmLv3.getVisible()==false) crmLv3.setVisible(true);
            else if(crmLv3.getVisible()==true) crmLv3.setVisible(false);
            break;
        case 2 :
            if(crmLv2.getVisible()==false) crmLv2.setVisible(true);
            else if(crmLv2.getVisible()==true) crmLv2.setVisible(false);
            break;
        case 1 :
            if(crmLv1.getVisible()==false) crmLv1.setVisible(true);
            else if(crmLv1.getVisible()==true) crmLv1.setVisible(false);
            break;
        case 0 :
            if(levelAll.value=="yes"){
                levelAll.value="no";
                crmLv5.setVisible(true);
                crmLv4.setVisible(true);
                crmLv3.setVisible(true);
                crmLv2.setVisible(true);
                crmLv1.setVisible(true);
            }else if(levelAll.value=="no"){
                levelAll.value="yes";
                crmLv5.setVisible(false);
                crmLv4.setVisible(false);
                crmLv3.setVisible(false);
                crmLv2.setVisible(false);
                crmLv1.setVisible(false);
            }
    }
}

//편의점 레이어
// var Convenience = new ol.layer.Image({
//     title : "안심 편의점",
//     type : 'Point',
//     visible : false,
//     source : conv_source = new ol.source.ImageWMS({
//         url : 'http://localhost:8080/geoserver/Ansim/wms',
//         params : {'LAYERS':'Ansim:conv','TILED' : true},
//         serverType : 'geoserver',
//     })   
//     }); 
// //경찰서 레이어
// var Police = new ol.layer.Image({
//     title : "경찰관서",
//     type : 'Point',
//     visible : false,
//     source : police_source = new ol.source.ImageWMS({
//         url : 'http://localhost:8080/geoserver/Ansim/wms',
//         params : {'LAYERS':'Ansim:police','TILED' : true},
//         serverType : 'geoserver',
//     })
//     });

//범죄주의구간
var warning = new ol.layer.Tile({
    source : new ol.source.TileWMS({ 
        name : "범죄주의구간(전체)",
        url : "http://www.safemap.go.kr/sm/apis.do?apikey=L4MW9WEZ-L4MW-L4MW-L4MW-L4MW9WEZOR",
        params : {'LAYERS':'A2SM_CRMNLHSPOT_TOT','STYLES':'','TILED':true},
    }),
    visible : false
})