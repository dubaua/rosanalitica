import L from 'leaflet';

const mapNodeId ='map';

if (document.getElementById(mapNodeId)) {
  const accessToken =
    'pk.eyJ1IjoibWljaGlhcm8iLCJhIjoiY2tlYWJpb3JvMGI0ODJ5dDB6dTR3enhuayJ9.lc4KAfa-6vpkA7FGJD1-pA';
  const attribution = `© <a href="https://www.mapbox.com/map-feedback/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>`;
  const styleUrl = `https://api.mapbox.com/styles/v1/michiaro/ckf8rkp9n5s1s19qnje23jtn4/tiles/{z}/{x}/{y}?access_token=${accessToken}`;
  
  const mapInstance = L.map('map').setView([59.883644, 30.330233], 15);
  const tileLayer = L.tileLayer(styleUrl, { attribution });
  tileLayer.addTo(mapInstance);
  
  mapInstance.invalidateSize(true);
  
  // TODO добавить маркер
  // const marker = L.marker([59.883644, 30.330233]).addTo(mapInstance);
}
