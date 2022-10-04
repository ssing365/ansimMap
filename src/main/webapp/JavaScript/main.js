//팝업정보창
// var container = document.getElementById('popup');
// var content = document.getElementById('popup-content');
// var closer = document.getElementById('popup-closer');
// var popup = new ol.Overlay({
//     element : container,
//     autoPan : true,
//     autoPanAnimation : {
//         duration : 250,
//     },
// });
// map.addOverlay(popup);

// closer.onclick = function () {
//     popup.setPosition(undefined);
//     container.style.display = "none";
//     closer.blur();
//     return false;
// };

//팝업정보(편의점, 경찰서) 불러오기 
// map.on('singleclick', function (evt) {
//         content.innerHTML = '';
//     var resolution = mapView.getResolution();

// 	var url = conv_source.getFeatureInfoUrl(
// 		evt.coordinate,resolution,'EPSG:3857',
// 		{ 'INFO_FORMAT': 'application/json',
//           'propertyName':'store_name,address,tel'
// 		});
// 	var url2 = police_source.getFeatureInfoUrl(
// 		evt.coordinate,resolution,'EPSG:3857',
// 		{ 'INFO_FORMAT': 'application/json',
//           'propertyName':'office_name,div,address' 
// 		});	
    
//     if(url){
// 		$.getJSON(url, function(data){
//             var feature = data.features[0];
//             var props = feature.properties;
//             content.innerHTML="<h2>안심편의점 </h2><br><p>" + props.store_name.toUpperCase() +"</p> <br> <h3>주소 : </h3> <p>"+props.address.toUpperCase()+"</p> <br> <h3>전화번호 : </h3> <p>"+
//             props.tel.toUpperCase()+"</p>";
//             popup.setPosition(evt.coordinate);
//             container.style.display = "block";
//         })
// 	} else {
//         popup.setPosition(undefined);
//         container.style.display = "none";
//     }
    
//     if(url2) {
//         $.getJSON(url2, function(data){
//             var feature = data.features[0];
//             var props = feature.properties;
//             content.innerHTML="<h2>경찰서 </h2> <p>" +"</p> <br> <h3>분류 : </h3> <p>"+props.div.toUpperCase()+"</p> <br> <h3>주소 : </h3> <p>"+
//             props.address.toUpperCase()+"</p>";
//             popup.setPosition(evt.coordinate);
//             container.style.display = "block";
//         })
//     } else {
//         popup.setPosition(undefined);
//         container.style.display = "none";
//     }
    
// });

/*start : DB query*/

// var tr;
// var th;
// var col;
// function newpopulateQueryTable(url){
//     if(typeof attributePanel !== 'undefined'){
//         if(attributePanel.parentElement !== null){
//             attributePanel.close();
//         }
//     }
//     $.getJSON(url,function (data){
//         col = [];
//         col.push('id');
//         for(var i=0; i<data.features.length; i++){
//             for(var key in data.features[i].properties){
//                 if(col.indexOf(key) === -1){
//                     col.push(key);
//                 }
//             }
//         }
//         var table = document.createElement("table");

//         table.setAttribute("class","table table-bordered table-hover table-condensed");
//         table.setAttribute("id","attQryTable");

//         tr = table.insertRow(-1);

//         for(var i =0; i< col.length; i++){
//             th = document.createElement("th");
//                 th.innerHTML = col[i];
//                 tr.appendChild(th);
//         }

//         for(var i = 0; i<data.features.length; i++){
//                 tr = table.insertRow(-1);
//                 for(var j = 0; j<col.length;j++){
//                     var tabCell = tr.insertCell(-1);
//                     if(j==0){tabCell.innerHTML=data.features[i]['id'];}
//                     else{   
//                         tabCell.innerHTML = data.features[i].properties[col[j]];
//                     }
//                 }
//         }

//         var tabDiv = document.getElementById("attListDiv");

//         var delTab = document.getElementById("attQryTable");
//         if(delTab){
//             tabDiv.removeChild(delTab);
//         }

//         tabDiv.appendChild(table);

//         //document.getElementById("attListDiv").style.display="block";
//     });
// }
// //검색 결과 테이블 출력
// function newaddRowHandlers() {
//     var attTable = document.getElementById("attQryTable");
//     var rows = attTable.rows;
//     var heads = attTable.getElementsByTagName('th');
//     var col_no;
//     for (var i = 0; i < heads.length; i++) {
//         // Take each cell
//         var head = heads[i];
//         if (head.innerHTML == 'id') {
//             col_no = i + 1;
//         }
//     }
//     for (i = 0; i < rows.length; i++) {
//         rows[i].onclick = function () {
//             return function () {
//                 clickSelectedFeatureOverlay.getSource().clear();

//                 $(function () {
//                     $("#attQryTable td").each(function () {
//                         $(this).parent("tr").css("background-color", "white");
//                     });
//                 });
//                 var cell = this.cells[col_no - 1];
//                 var id = cell.innerHTML;
//                 $(document).ready(function () {
//                     $("#attQryTable td:nth-child(" + col_no + ")").each(function () {
//                         if ($(this).text() == id) {
//                             $(this).parent("tr").css("background-color", "#d1d8e2");
//                         }
//                     });
//                 });

//                 var features = queryGeoJSON.getSource().getFeatures();

//                 for (i = 0; i < features.length; i++) {
//                     if (features[i].getId() == id) {
//                         clickSelectedFeatureOverlay.getSource().addFeature(features[i]);

//                         clickSelectedFeatureOverlay.getSource().on('addfeature', function () {
//                             map.getView().fit(
//                                 clickSelectedFeatureOverlay.getSource().getExtent(),
//                                 { duration: 1500, size: map.getSize(), maxZoom: 14 }
//                             );
//                         });

//                     }
//                 }
//             };
//         }(rows[i]);
//     }


// }
// /* DB query end*/
var geojson;
var queryGeoJSON;

var querySelectedFeatureStyle = new ol.style.Style({
    fill: new ol.style.Fill({
        color: 'rgba(64,244,208,0.4)',
    }),
    stroke: new ol.style.Stroke({
        color: '#40E0D0',
        width: 2.5,
    }),
    image: new ol.style.Circle({
        radius: 10,
        fill: new ol.style.Fill({
            color: 'rgba(64,244,208,0.4)'
        }),
        stroke: new ol.style.Stroke({
            color: '#40E0D0',
            width: 1.5,
        }),
    })
});	
var clickSelectedFeatureStyle = new ol.style.Style({
    fill: new ol.style.Fill({
        color: '#40E0D0',
    }),
    stroke: new ol.style.Stroke({
        color: '#FFFF00',
        width: 3,
    }),
    image: new ol.style.Circle({
        radius: 10.5,
        fill: new ol.style.Fill({
            color: '#40E0D0'
        }),
        stroke: new ol.style.Stroke({
            color: '#FFFF00',
            width: 2,
        })
    })
});	
var featureOverlay = new ol.layer.Vector({
        source: new ol.source.Vector(),
        map: map,
});	
var clickSelectedFeatureOverlay = new ol.layer.Vector({
    source: new ol.source.Vector(),
    map: map,
    style: clickSelectedFeatureStyle
});	
var interactionStyle = new ol.style.Style({
    fill: new ol.style.Fill({
        color: 'rgba(200, 200, 200, 0.6)',
    }),
    stroke: new ol.style.Stroke({
        color: 'rgba(0, 0, 0, 0.5)',
        lineDash: [10, 10],
        width: 2,
    }),
    image: new ol.style.Circle({
        radius: 5,
        stroke: new ol.style.Stroke({
            color: 'rgba(0, 0, 0, 0.7)',
        }),
        fill: new ol.style.Fill({
            color: 'rgba(255, 255, 255, 0.2)',
        }),
    })
});

//검색창 버튼
var dbQry = document.getElementById("dbQry");
var qryFlag = false;
dbQry.addEventListener("click",()=>{
    dbQry.classList.toggle("clicked");
    qryFlag = !qryFlag;
    if(qryFlag){
        if(queryGeoJSON){
            queryGeoJSON.getSource().clear();
            map.removeLayer(queryGeoJSON);
        }
        if (clickSelectedFeatureOverlay) {
            clickSelectedFeatureOverlay.getSource().clear();
            map.removeLayer(clickSelectedFeatureOverlay);
        }
        document.getElementById("qryDiv").style.display = "block";
        //bolIdentify = false;
        //addMapLayerList('selectLayer');
    } else {
        document.getElementById("qryDiv").style.display = "none";
		document.getElementById("attListDiv").style.display="none";
        if(queryGeoJSON){
            queryGeoJSON.getSource().clear();
            map.removeLayer(queryGeoJSON);
        }
        if (clickSelectedFeatureOverlay) {
            clickSelectedFeatureOverlay.getSource().clear();
            map.removeLayer(clickSelectedFeatureOverlay);
        }
    }
}) 

var s = $('#selectAttribute')
var value_layer;
var value_attribute;
var addsgg;
var sxsx;
function setAtt(ta){
    s.empty();
    s.append("<option value=\"\" selected>유형 선택</option>")
    if(ta.value=="conv"){
        s.append("<option value='convAll'>편의점 전체</option>");
        s.append("<option value='CU'>CU</option>");
        s.append("<option value='GS'>GS25</option>");
        s.append("<option value='세븐일레븐'>세븐일레븐</option>");
        s.append("<option value='미니스'>미니스톱</option>")
        s.append("<option value='씨스페이스'>씨스페이스</option>")
        value_layer='Ansim:conv'
        addsgg='sgg'
        value_attribute='store_name'
        sxsx='a';
    } else if(ta.value=="pol"){
        s.append("<option value='polAll'>경찰서 전체</option>");
        s.append("<option value='경찰서'>경찰서</option>");
        s.append("<option value='파출소'>파출소</option>");
        s.append("<option value='지구대'>지구대</option>");
        value_layer='Ansim:pol'
        addsgg='address'
        value_attribute='div'
        sxsx='b';
    }
}
//layering found features
function newaddGeoJsonToMap(url){
    queryGeoJSON = new ol.layer.Vector({
        source : new ol.source.Vector({
        url : url,
        format : new ol.format.GeoJSON()
        }), 
	    style:querySelectedFeatureStyle,
    });
    queryGeoJSON.getSource().on('addfeature',function(){
        map.getView().fit(
           queryGeoJSON.getSource().getExtent(),
            {duration : 1590, size : map.getSize(), maxZoom : 14}
        );
    });
    map.addLayer(queryGeoJSON);
}

function resultOpen(){
    var resultOpen = document.getElementById("resultOpen")
    var searchResultDiv = document.getElementById("searchResultDiv");
    if(resultOpen.value=="yes"){
        resultOpen.value="no"
        resultOpen.innerHTML="펼치기"
        searchResultDiv.style.display="none";
    } else if(resultOpen.value=="no"){
        resultOpen.value="yes"
        searchResultDiv.style.display="block";
        resultOpen.innerHTML="접기"
    }
}

var whatConv;
function convX(dd){
    whatConv=dd.value;
}

var whatDistrict;
function districtX(ff){
    whatDistrict=ff.value;
    
    if(whatDistrict=="구"){
        newaddGeoJsonToMap("http://localhost:8080/geoserver/Ansim/ows?service=WFS&version=1.0.0\
        &request=GetFeature&typeName=" +"admin_sgg"+"\
        &SRSNAME=EPSG:5179&outputFormat=application/json");
    } else{
        newaddGeoJsonToMap("http://localhost:8080/geoserver/Ansim/ows?service=WFS&version=1.0.0\
        &request=GetFeature&typeName=" +"admin_sgg"+"\
        &SRSNAME=EPSG:5179"+"&CQL_FILTER="+"sgg_nm"+"+"+'Like'+"+'"+whatDistrict+"'\
        &outputFormat=application/json");
    }
    
}

function changeLayerName(name){
    switch(name){
        case 'Ansim:conv' :
            return '안심편의점';
            break;
        case 'Ansim:pol' :
            return '경찰서';
            break;
    }
}

var searchResultDiv=document.getElementById("searchResultDiv");
var searchList =[];

//when no results
function NoneSearchFeatures(string) {
    var queryResult = document.createElement('div');
    queryResult.innerHTML = string;
    searchResultDiv.appendChild(queryResult); //child node
}

//init expressed search features
function InitFeatures() {
    //init list layout
    if (searchResultDiv.hasChildNodes) {
        while (searchResultDiv.hasChildNodes()) {
            searchResultDiv.removeChild(searchResultDiv.firstChild);
        }
    }

    //searchResults Layer init
    if (searchLayer) {
        searchLayer.getSource().clear();
        map.removeLayer(searchLayer);
    }
}

var pageNo;
var maxPageNo;

var searchList = []; //search results
var searchLayer; //search results layer


var layer = document.getElementById("selectLayer");

//page nums UI update
function InitPages(counts) {
    pageNo = 1;
    document.getElementById("curPage").value = pageNo;

    if (counts == 0) {
        document.getElementById("searchTool").style.display = "none";
        return;
    }
    document.getElementById("searchTool").style.display = "block";
    maxPageNo = Math.ceil(counts / 5);
    document.getElementById("maxPage").innerHTML = maxPageNo;
    document.getElementById("maxPage").value = maxPageNo;
    document.getElementById("curPage").max = maxPageNo;
}

var url
async function searchFeatures(){
    InitFeatures();
    map.set("isLoading","YES");
        
    queryGeoJSON.getSource().clear();
    featureOverlay.getSource().clear();

    map.removeLayer(featureOverlay)
    map.removeLayer(queryGeoJSON);
    if(featureOverlay){
        queryGeoJSON.getSource().clear();
        featureOverlay.getSource().clear();
        map.removeLayer(featureOverlay);
    }
    if(queryGeoJSON){
        queryGeoJSON.getSource().clear();
        featureOverlay.getSource().clear();
        map.removeLayer(queryGeoJSON);
    }
    var layer = document.getElementById("selectLayer");
    var attribute = document.getElementById("selectAttribute");
    var district = document.getElementById("selectDistrict");
    //var txt = document.getElementById("enterValue");

    if(layer.options.selectedIndex == 0){
        Swal.fire({
            text : '검색할 시설물을 선택해주세요!',
        });
    } else if(attribute.options.selectedIndex == 0){
        Swal.fire({
            text : '유형을 선택해주세요!',
        });
    } else if(district.options.selectedIndex == 0){
        Swal.fire({
            text : '자치구를 선택해주세요!',
        });
    } else{
         //layer.options[layer.selectedIndex].value;
        //attribute.options[attribute.selectedIndex].text;
        //var value_txt = txt.value;
        var value_txt =  "%25" + whatDistrict +"%25'";
        var value_txt2 = "%25" + whatConv +"%25'";
    
        if(value_layer=="Ansim:comv"){
            value_attribute="store_name"
        } else if(value_layer=="Ansim:pol"){
            value_attribute="div"
        }

        var urlDefault ="http://localhost:8080/geoserver/Ansim/ows?service=WFS&version=1.0.0\
        &request=GetFeature&SRSNAME=EPSG:5179&outputFormat=application/json&typeName="
        if(whatConv=="convAll"){
            url = urlDefault + value_layer
            +"&CQL_FILTER="+addsgg
            +"+"+'Like'+"+'"+value_txt
        } else if(whatConv=="polAll"){
            url = urlDefault + value_layer
            +"&CQL_FILTER="+addsgg
            +"+"+'Like'+"+'"+value_txt
        } 
        else{
            url = urlDefault + value_layer
            +"&CQL_FILTER="+addsgg
            +"+"+'Like'+"+'"+value_txt
            +" AND "+value_attribute
            +"+"+'Like'+"+'"+value_txt2
        }

        var resultDiv = document.getElementById("resultDiv");
        resultDiv.style.display = "block";

        var searchCount = 0;
        await fetch(url)
        .then((response) => { return response.json() })
        .then((data) => {
            searchCount = data['numberReturned'];
            searchList = data['features'];
            console.log(searchCount)
            console.log(searchList);
        });
        
        InitPages(searchCount);
        if(searchCount==0){NoneSearchFeatures("검색 결과가 없습니다."); return;}
        var rotn = document.getElementById("rotn");
        rotn.innerHTML="&nbsp검색결과&nbsp<strong>총&nbsp<span style='color: orangered;'>"+searchCount+"</span>건</strong>"

        newaddGeoJsonToMap(url);
        map.set("isLoading",'NO');
        
        SwitchPage('first');
    }
}

function SwitchPage() {
    //if (CheckPage(command) == -1) return; //pre-check desired page
    InitFeatures();

    var featureSource = new ol.source.Vector();
    var index = (pageNo - 1) * 5;

    for (var i = 0; i < 5; i++) {
        if (index == searchList.length) break;
        ShowFeatures(searchList.at(index), i);

        var feature = new ol.Feature({
            geometry: new ol.geom.Point(searchList.at(index)["geometry"]["coordinates"])
                .transform('EPSG:3857', 'EPSG:4326')
            
        });
        feature.setProperties(searchList.at(index)["properties"]);
        console.log(feature);
        featureSource.addFeature(feature);
        
        index++;
    }

    searchLayer = new ol.layer.Vector({
        source: featureSource,
        style: querySelectedFeatureStyle
    })

    map.addLayer(searchLayer);
}

//Show search results to HTML layout
function ShowFeatures(feature, i) {
    //feature.setStyle(iconStyle);

    var features = feature["properties"];

    //create div and add to list
    var queryResult = document.createElement('div');
    queryResult.setAttribute("id", i); //id = index

    var queryText = document.createElement('div');
    queryText.setAttribute("id", "queryText"); //id = index
    queryText.innerHTML = whichInnerHTML();
    //queryResult.addEventListener("click", ExtentFeatures);
    searchResultDiv.appendChild(queryResult);
    queryResult.appendChild(queryText);

    function whichInnerHTML(){
        if(sxsx=='a'){
            return '&nbsp<img src="' 
            + "resources/images/"
            + convPng() 
            + '"style="'
            + 'width:30px;height:30px;vertical-align:middle'
            + '" />'
            +"<span style='font-size: 13px;'>&nbsp <strong>"+ features["store_name"] + "</strong> </span><br>"
            +"<span style='font-size:11px;'>&nbsp&nbsp주소 : </span>"+ "<span style='color: rgb(160, 160, 160); font-size: 11px;'>" + features["address"] + "</span><br>"
            +"<span style='font-size:11px;'>&nbsp&nbsp전화번호 : </span>"+ "<span style='color: rgb(160, 160, 160); font-size: 11px;'>" + features["tel"] + "</span><br>";
        } else if(sxsx=='b'){
            return '&nbsp<img src="' 
            + "resources/images/"
            +"pol.png" 
            + '"style="'
            + 'width:30px;height:30px;vertical-align:middle'
            + '" />'
            +"<span style='font-size: 13px;'>&nbsp <strong>"+ features["name"] + "</strong> </span><br>"
            +"<span style='font-size:11px;'>&nbsp&nbsp주소 : </span>"+ "<span style='color: rgb(160, 160, 160); font-size: 11px;'>" + features["address"] + "</span><br>";
            
        }
        function convPng(){
            if(features["store_name"].includes('CU')){
                return "cu.png";
            } else if(features["store_name"].includes('GS')){
                return "gs25.png"
            } else if(features["store_name"].includes('세븐일레븐')){
                return "seveneleven.png"
            } else if(features["store_name"].includes('미니스')){
                return "ministop.png"
            } else if(features["store_name"].includes('씨스페이스')){
                return "cspace.png"
            } 
        }
        for(var v=0; v < 5; v++){
            queryText[v].onclick = function(){
                    map.getView().fit( 
                    clickSelectedFeatureOverlay.getSource().getExtent(),
                    { duration: 1500, size: map.getSize(), maxZoom: 14 }
                );
            }
        }
    }
}
// var val;
// function ExtentFeatures(e) {
//     val = this.id;
//     var feature = searchLayer.getSource().getFeatures()[val];
//     var extent = feature.getGeometry().getExtent();
//     map.getView().fit(extent, { duration: 1400, size: map.getSize(), maxZoom: 15 });
// }


//==============================================================================================================================

/* 주변 시설물 찾기 */
var spQry = document.getElementById("spQry");
var bufferFlag = false;
spQry.addEventListener("click", () => {
    // disableOtherInteraction('lengthButton');
    spQry.classList.toggle('clicked');
    bufferFlag = !bufferFlag;
    if (bufferFlag) {
        if (geojson) {
            geojson.getSource().clear();
            map.removeLayer(geojson);
        }
        if (featureOverlay) {
            featureOverlay.getSource().clear();
            map.removeLayer(featureOverlay);
        }
        document.getElementById("spQueryDiv").style.display = "block";

        addMapLayerList_spQry();
    } else {
        document.getElementById("spQueryDiv").style.display = "none";
        document.getElementById("attListDiv").style.display = "none";

        if (geojson) {
            geojson.getSource().clear();
            map.removeLayer(geojson);
        }

        if (featureOverlay) {
            featureOverlay.getSource().clear();
            map.removeLayer(featureOverlay);
        }
        map.removeInteraction(draw);
        if (document.getElementById('spUserInput').classList.contains('clicked')) { document.getElementById('spUserInput').classList.toggle('clicked'); }
    }

})

//주변검색 그리기
var markerFeature;
function addInteractionForSpatialQuery(intType) {
    draw = new ol.interaction.Draw({
        source: clickSelectedFeatureOverlay.getSource(),
        type: intType,
        style: interactionStyle
    });
    map.addInteraction(draw);
    draw.on('drawend', function (e) {
        markerFeature = e.feature;
        markerFeature.set('geometry', markerFeature.getGeometry());
        map.removeInteraction(draw);
        document.getElementById('spUserInput').classList.toggle('clicked');
    })
}

function addMapLayerList_spQry() {
    $(document).ready(function () {
        $.ajax({
            type: "GET",
            url: "http://localhost:8080/geoserver/Ansim/wfs?request=getCapabilities",
            dataType: "xml",
            success: function (xml) {
                var select = $('#buffSelectLayer');
                select.empty();
                select.append("<option value=\"\" selected>시설 선택</option>");
                $(xml).find('FeatureType').each(function () {
                    $(this).find('Name').each(function () {
                        var value = $(this).text();
                            if(!changeLayerName(value)){
                                return;
                            } else {select.append("<option value='" + value + "'>" + changeLayerName(value) + "</option>");} 
                    });
                });
            }
        });
    });

};

$(function (){
    document.getElementById("srcCriteria").onchange = function () {
        if (queryGeoJSON) {
            queryGeoJSON.getSource().clear();
            map.removeLayer(queryGeoJSON);
        }

        if (clickSelectedFeatureOverlay) {
            clickSelectedFeatureOverlay.getSource().clear();
            map.removeLayer(clickSelectedFeatureOverlay);
        }
        if (document.getElementById('spUserInput').classList.contains('clicked')) { document.getElementById('spUserInput').classList.toggle('clicked'); }
    }

    document.getElementById('spUserInput').onclick = function () {
        document.getElementById('spUserInput').classList.toggle('clicked');
        if (document.getElementById('spUserInput').classList.contains('clicked')) {
            if (queryGeoJSON) {
                queryGeoJSON.getSource().clear();
                map.removeLayer(queryGeoJSON);
            }

            if (clickSelectedFeatureOverlay) {
                clickSelectedFeatureOverlay.getSource().clear();
                map.removeLayer(clickSelectedFeatureOverlay);
            }
            var srcCriteriaValue = document.getElementById('srcCriteria').value;
            if (srcCriteriaValue == 'pointMarker') {
                addInteractionForSpatialQuery('Point');

            }
            if (srcCriteriaValue == 'lineMarker') {
                addInteractionForSpatialQuery('LineString');
            }
        } else {
            coordList = '';
            markerFeature = undefined;
            map.removeInteraction(draw);
        }
    }

    document.getElementById('spQryRun').onclick = function () {

        var layer = document.getElementById("buffSelectLayer");
        var value_layer2 = layer.options[layer.selectedIndex].value;

        var srcCriteria = document.getElementById("srcCriteria");
        var value_src = srcCriteria.options[srcCriteria.selectedIndex].value;
        var coordList = '';
        var url;
        var markerType = '';
        var bufferDistance = document.getElementById("bufferDistance");

        if(layer.options.selectedIndex == 0){
            Swal.fire({
                text : '검색할 시설물을 선택해주세요',
            });
        } else if(bufferDistance.value==''){
            Swal.fire({
                text : '거리를 입력해주세요'
            })
        }
         else if(srcCriteria.options.selectedIndex == 0){
            Swal.fire({
                text : '지도 위에 위치를 표시해주세요',
            });
        }
        if (markerFeature) {
            if (value_src == 'pointMarker') {
                var long = markerFeature.getGeometry().getCoordinates()[0]
                var lat = markerFeature.getGeometry().getCoordinates()[1]
                var coord = ol.proj.transform([long,lat],'EPSG:3857','EPSG:4326')
                coordList = coord[0] + " " + coord[1]
                markerType = 'Point';
            }
            if (value_src == 'lineMarker') {
                var coordArray = markerFeature.getGeometry().getCoordinates();
                for (i = 0; i < coordArray.length; i++) {
                    if (i == 0) {
                        var long = coordArray[i][0];
                        var lat = coordArray[i][1];
                        var coord = ol.proj.transform([long,lat],'EPSG:3857','EPSG:4326')
                        coordList = coord[0] + " " + coord[1];
                    } else {
                        var long = coordArray[i][0];
                        var lat = coordArray[i][1];
                        var coord = ol.proj.transform([long,lat],'EPSG:3857','EPSG:4326')
                        coordList = coordList + "," + coord[0] + " " + coord[1];
                    }
                }
                markerType = 'LineString';
            }

                var dist = document.getElementById("bufferDistance");
                var value_dist = Number(dist.value);
                // value_dist = value_dist / 111.325;

                var distanceUnit = document.getElementById("distanceUnits");
                var value_distanceUnit = distanceUnit.options[distanceUnit.selectedIndex].value;
                url = "http://localhost:8080/geoserver/Ansim/ows?service=WFS&version=1.0.0\
                &request=GetFeature&typeName=" + value_layer2 + "&CQL_FILTER=DWITHIN(geom," + markerType + "(\
                    " + coordList + ")," + value_dist + "," + value_distanceUnit + ")\
                &outputFormat=application/json";

            newaddGeoJsonToMap(url);
            newpopulateQueryTable(url);
            setTimeout(function () { newaddRowHandlers(url); }, 1000);
            map.set("isLoading", 'NO');
        }
    }

    document.getElementById('spQryClear').onclick = function () {
        if (queryGeoJSON) {
            queryGeoJSON.getSource().clear();
            map.removeLayer(queryGeoJSON);
        }

        if (clickSelectedFeatureOverlay) {
            clickSelectedFeatureOverlay.getSource().clear();
            map.removeLayer(clickSelectedFeatureOverlay);
        }
        coordList = '';
        markerFeature = undefined;
    }
})