let myMap;
const init = () => {
 myMap = new ymaps.Map("map", {
   center: [59.93916998692174, 30.309015096732622],
   zoom: 11,
   controls: [],
 });
 
 let coords = [
     [59.94554327989287, 30.38935262114668],
     [59.91142323563909, 30.50024587065841],
     [59.88693161784606, 30.319658102103713],
     [59.97033574821672, 30.315194906302924],
   ],
   myCollection = new ymaps.GeoObjectCollection({}, {
     draggable: false,
     iconLayout: 'default#image',
     iconImageHref: './img/marker.svg',
     iconImageSize: [46, 57],
     iconImageOffset: [-35, -52]
   });
 
 for (let i = 0; i < coords.length; i++) {
   myCollection.add(new ymaps.Placemark(coords[i]));
 }
 
 myMap.geoObjects.add(myCollection);
 
 myMap.behaviors.disable('scrollZoom');
};
 
ymaps.ready(init);