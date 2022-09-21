
/* start clustering */
var textFill = new ol.style.Fill({
    color: '#fff'
  });
var textStroke = new ol.style.Stroke({
color: 'rgba(0, 0, 0, 0.7)',
width: 3
});
var radius = 5 + 20 * 2;

//편의점 클러스터링
var convArray = [];
var convFeature = [];
$.ajax({
    url: '../Ansim/resources/conv.geojson',
    contentType:'application/json',
    dataType:'json',
    success: function(json1) {
        convArray.push(json1.features[0].geometry)
        for(var i=0; i<850; i++){
            convFeature[i] = new ol.Feature(new ol.geom.Point(ol.proj.transform(convArray[0].geometries[i].coordinates, 'EPSG:4326', 'EPSG:3857')));   
            }  
            source = new ol.source.Vector({
                features: convFeature,
                projection: 'EPSG:3857',
            }); 
            clusterSource = new ol.source.Cluster({
                distance: 40,
                projection: 'EPSG:3857',
                geometryFunction: function(feature) {
                  var geom = feature.getGeometry();
                  if (geom.getType() == 'Point') {
                    return geom;
                  } else if (geom.getType() == 'Polygon') {
                    return geom.getInteriorPoint();
                  }
                  return null;
                },
                source: source
            });
            styleCache = {};
            convCluster = new ol.layer.Vector({
            title : '안심편의점',
            type : 'Layer',
            visible : false,
            source: clusterSource,

            style: function(feature) {
                var size = feature.get('features').length;
                var style = styleCache[size];
                if(size>=13){
                    style = new ol.style.Style({
                        image: new ol.style.Circle({
                          radius: Math.max(10,size),
                          fill: new ol.style.Fill({
                            color: [255, 153, 0, Math.min(1,size*0.016)],
                            stroke : new ol.style.Stroke({
                              color : 'grey',
                              width  : 0.4
                            })
                          })
                        }),
                        text: new ol.style.Text({
                          text: size.toString(),
                          fill: textFill,
                          stroke: textStroke
                        })
                      });
                }else if ( 13>size && size>1 ) {
                    style = new ol.style.Style({
                      image: new ol.style.Circle({
                        radius: Math.max(10,size),
                        fill: new ol.style.Fill({
                          color: [255, 153, 0, Math.min(1,size*0.08)],
                          stroke : new ol.style.Stroke({
                            color : 'grey',
                            width  : 0.4
                          })
                        })
                      }),
                      text: new ol.style.Text({
                        text: size.toString(),
                        fill: textFill,
                        stroke: textStroke
                      })
                    });
                  }else {
                    style = new ol.style.Style({
                        image : new ol.style.RegularShape({
                            radius1 : 14,
                            radius2 : 5,
                            points : 5,
                            angle : Math.PI,
                            fill : new ol.style.Fill({
                                color : [255,153,0,0.6]
                            })
                        }),
                        text : new ol.style.Text({
                            text: size.toString(),
                            fill: textFill,
                            stroke: textStroke
                        })
                    })
                  }
                return style;
            }
            });

            convCluster.getSource().getFeatures();
            map.addLayer(convCluster);
                          
        }       
});

//경찰서 클러스터링
var policeArray = [];
var policeFeature = [];
var policeCluster;
$.ajax({
    url: '../Ansim/resources/pol.geojson',
    contentType:'application/json',
    dataType:'json',
    success: function(json2) {
        policeArray.push(json2.features[0].geometry)
        for(var i=0; i<242; i++){
            policeFeature[i] = new ol.Feature(new ol.geom.Point(ol.proj.transform(policeArray[0].geometries[i].coordinates, 'EPSG:4326', 'EPSG:3857')));   
            }
    
            var source = new ol.source.Vector({
                features: policeFeature,
                projection: 'EPSG:3857',
            }); 
            
            var clusterSource = new ol.source.Cluster({
                distance: 40,
                projection: 'EPSG:3857',
                geometryFunction: function(feature) {
                  var geom = feature.getGeometry();
                  return geom.getType() == 'Point' ? geom : null;
                },
                source: source
            });
            
            var styleCache = {};
            policeCluster = new ol.layer.Vector({
              title : '경찰서',
              type : 'Layer',
              visible : false,
              source: clusterSource,
              style: function(feature) {
                var size = feature.get('features').length;
                var style = styleCache[size];
                if (size>1) {
                    style = new ol.style.Style({
                      image: new ol.style.Circle({
                        radius: Math.max(10,size),
                        fill: new ol.style.Fill({
                          color: [51, 153, 204, Math.min(1,size*0.15)]
                        })
                      }),
                      text: new ol.style.Text({
                        text: size.toString(),
                        fill: textFill,
                        stroke: textStroke
                      })
                    });
                  }else {
                    style = new ol.style.Style({
                        image : new ol.style.RegularShape({
                            radius1 : 14,
                            radius2 : 5,
                            points : 5,
                            angle : Math.PI,
                            fill : new ol.style.Fill({
                                color : [51,153,204,0.6]
                            }),         
                        stroke: new ol.style.Stroke({
                            color : 'white',
                            width : 0.4
                        }),
                        }),
                        text : new ol.style.Text({
                            text: size.toString(),
                            fill: textFill,
                            stroke: textStroke
                        })
                    })
                  }
                return style;
            }
            });

            policeCluster.getSource().getFeatures();
            map.addLayer(policeCluster);
        }
});
/* end clustering */

function addConv(){
    if(convCluster.getVisible()==true){
        convCluster.setVisible(false);
    }else{
        convCluster.setVisible(true)
    }
}

var t = document.getElementById("convBtn");
var x = document.getElementById("convImg");
var st = document.getElementById("convText");
t.onmouseover = function(){
  x.style.backgroundColor='orange';
  st.style.color='orange';
}
t.onmouseleave = function(){
  x.style.backgroundColor='lightgray';
  st.style.color='black';
}

function styleConv(){
  if(t.value=="yes"){
    t.value="no";
    x.style.backgroundColor="orange";
    st.style.color='orange'
    t.onmouseover = function(){
      x.style.backgroundColor='orange';
      st.style.color='orange';
    }
    t.onmouseleave = function(){
      x.style.backgroundColor='orange';
      st.style.color='orange';
    }
  } else if (t.value=="no"){
    t.value="yes";
    x.style.backgroundColor="lightgray";
    st.style.color='black'
    
    t.onmouseleave = function(){
      x.style.backgroundColor='lightgray';
      st.style.color='black';
    }
  }
}

function addPolice(){
    if(policeCluster.getVisible()==true){
        policeCluster.setVisible(false);
    }else{
        policeCluster.setVisible(true);
    }
}


var a = document.getElementById("policeBtn");
var b = document.getElementById("policeImg");
var c = document.getElementById("policeText");
a.onmouseover = function(){
  b.style.backgroundColor='lightblue';
  c.style.color='lightblue';
}
a.onmouseleave = function(){
  b.style.backgroundColor='lightgray';
  c.style.color='black';
}

function stylePolice(){
  if(a.value=="yes"){
    a.value="no";
    b.style.backgroundColor='lightblue';
    c.style.color='skyblue'
    a.onmouseover = function(){
      b.style.backgroundColor='lightblue';
      c.style.color='skyblue';
    }
    
    a.onmouseleave = function(){
      b.style.backgroundColor='lightblue';
      c.style.color='skyblue';
    }
  } else if (a.value=="no"){
    a.value="yes";
    b.style.backgroundColor='lightgray';
    c.style.color='black';
    
    a.onmouseleave = function(){
      b.style.backgroundColor='lightgray';
      c.style.color='black';
    }
  }
}