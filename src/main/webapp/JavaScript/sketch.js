
// 거리측정
var measureLength = document.getElementById("measureLength");
var lengthFlag = false;
measureLength.addEventListener("click", () => {
    measureLength.classList.toggle('clicked');
    lengthFlag = !lengthFlag;
    document.getElementById("map").style.cursor = "default";
    if (lengthFlag) {
        addInteraction('LineString');
    } else {
        map.removeInteraction(draw);
        source2.clear();
        const elements = document.getElementsByClassName("ol-tooltip ol-tooltip-static");
        while (elements.length > 0) elements[0].remove();
        map.removeOverlay(helpTooltip);
    }
})

var measureExtent = document.getElementById("measureExtent");
var areaFlag = false;
measureExtent.addEventListener("click", () => {
    measureExtent.classList.toggle('clicked');
    areaFlag = !areaFlag;
    document.getElementById("map").style.cursor = "default";
    if (areaFlag) {
        addInteraction('Polygon');
    } else {
        map.removeInteraction(draw);
        source2.clear();
        const elements = document.getElementsByClassName("ol-tooltip ol-tooltip-static");
        while (elements.length > 0) elements[0].remove();
        map.removeOverlay(helpTooltip);
    }
})

 var continuePolygonMsg = '더블클릭으로 그리기를 종료합니다.';
 var continueLineMsg = '더블클릭으로 그리기를 종료합니다.';

 var draw; // global so we can remove it later
 
 var source2 = new ol.source.Vector();
 var vector = new ol.layer.Vector({
     source: source2,
     style: new ol.style.Style({
         fill: new ol.style.Fill({
             color: 'rgba(255, 255, 255, 0.2)',
         }),
         stroke: new ol.style.Stroke({
             color: '#ffcc33',
             width: 2,
         }),
         image: new ol.style.Circle({
             radius: 7,
             fill: new ol.style.Fill({
                 color: '#ffcc33',
             }),
         }),
     }),
 })
 map.addLayer(vector);
 
 function addInteraction(intType) {
     draw = new ol.interaction.Draw({
         source: source2,
         type: intType,
         style: interactionStyle
     });
     map.addInteraction(draw);
 
     createMeasureTooltip();
     createHelpTooltip();
 
     var pointerMoveHandler = function (evt) {
         if (evt.dragging) {
             return;
         }
         /** @type {string} */
        var helpMsg = '그리기';
 
         if (sketch) {
             var geom = sketch.getGeometry();
             if (geom instanceof ol.geom.Polygon) {
               helpMsg = continuePolygonMsg;
             } else if (geom instanceof ol.geom.LineString) {
               helpMsg = continueLineMsg;
             }
         }
 
         helpTooltipElement.innerHTML = helpMsg;
         helpTooltip.setPosition(evt.coordinate);
 
         helpTooltipElement.classList.remove('hidden');
     };
 
     map.on('pointermove', pointerMoveHandler);
 
     // var listener;
     draw.on('drawstart', function (evt) {
         // set sketch
         sketch = evt.feature;
 
         /** @type {import("../src/ol/coordinate.js").Coordinate|undefined} */
         var tooltipCoord = evt.coordinate;
 
         //listener = sketch.getGeometry().on('change', function (evt) {
         sketch.getGeometry().on('change', function (evt) {
             var geom = evt.target;
             var output;
             if (geom instanceof ol.geom.Polygon) {
                 output = formatArea(geom);
                 tooltipCoord = geom.getInteriorPoint().getCoordinates();
             } else if (geom instanceof ol.geom.LineString) {
                 output = formatLength(geom);
                 tooltipCoord = geom.getLastCoordinate();
             }
             measureTooltipElement.innerHTML = output;
             measureTooltip.setPosition(tooltipCoord);
         });
     });
 
     draw.on('drawend', function () {
         measureTooltipElement.className = 'ol-tooltip ol-tooltip-static';
         measureTooltip.setOffset([0, -7]);
         // unset sketch
         sketch = null;
         // unset tooltip so that a new one can be created
         measureTooltipElement = null;
         createMeasureTooltip();
         //ol.Observable.unByKey(listener);
     });
 }
 
 var sketch;
 var helpTooltipElement;
 var helpTooltip;
 
 function createHelpTooltip() {
     if (helpTooltipElement) {
         helpTooltipElement.parentNode.removeChild(helpTooltipElement);
     }
     helpTooltipElement = document.createElement('div');
     helpTooltipElement.className = 'ol-tooltip hidden';
     helpTooltip = new ol.Overlay({
         element: helpTooltipElement,
         offset: [15, 0],
         positioning: 'center-left',
     });
     map.addOverlay(helpTooltip);
 }
 
 var measureTooltipElement;
 
 var measureTooltip;
 
 /**
  * Creates a new measure tooltip
  */
 
 function createMeasureTooltip() {
     if (measureTooltipElement) {
         measureTooltipElement.parentNode.removeChild(measureTooltipElement);
     }
     measureTooltipElement = document.createElement('div');
     measureTooltipElement.className = 'ol-tooltip ol-tooltip-measure';
     measureTooltip = new ol.Overlay({
         element: measureTooltipElement,
         offset: [0, -15],
         positioning: 'bottom-center',
     });
     map.addOverlay(measureTooltip);
 }
 
 /**
  * Format length output.
  * @param {LineString} line The line.
  * @return {string} The formatted length.
  */
 var formatLength = function (line) {
     var length = ol.sphere.getLength(line);
     var output;
     if (length > 100) {
         output = Math.round((length / 1000) * 100) / 100 + ' ' + 'km';
     } else {
         output = Math.round(length * 100) / 100 + ' ' + 'm';
     }
     return output;
 };
 
 /**
  * Format area output.
  * @param {Polygon} polygon The polygon.
  * @return {string} Formatted area.
  */
 var formatArea = function (polygon) {
     var area = ol.sphere.getArea(polygon);
     var output;
     if (area > 10000) {
         output = Math.round((area / 1000000) * 100) / 100 + ' ' + 'km<sup>2</sup>';
     } else {
         output = Math.round(area * 100) / 100 + ' ' + 'm<sup>2</sup>';
     }
     return output;
 };