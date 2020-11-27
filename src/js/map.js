import L from 'leaflet/dist/leaflet.js';

const mapNodeId = 'map';

const mapNode = document.getElementById(mapNodeId);

if (mapNode) {
  const lat = mapNode.getAttribute('data-lat');
  const lon = mapNode.getAttribute('data-lon');
  const zoom = mapNode.getAttribute('data-zoom');

  const accessToken = 'pk.eyJ1IjoibWljaGlhcm8iLCJhIjoiY2tlYWJpb3JvMGI0ODJ5dDB6dTR3enhuayJ9.lc4KAfa-6vpkA7FGJD1-pA';
  const attribution = `© <a href="https://www.mapbox.com/map-feedback/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>`;
  const styleUrl = `https://api.mapbox.com/styles/v1/michiaro/ckf8rkp9n5s1s19qnje23jtn4/tiles/{z}/{x}/{y}?access_token=${accessToken}`;
  const pinUrl = 'http://www.rosanalitica.dubaua.ru/images/map-pin.png';

  const mapInstance = L.map('map').setView([lat, lon], zoom);
  const tileLayer = L.tileLayer(styleUrl, { attribution });
  tileLayer.addTo(mapInstance);

  mapInstance.invalidateSize(true);

  const customMarker = L.icon({
    iconUrl: pinUrl,
    iconSize: [44, 62],
    iconAnchor: [22, 62],
  });
  const marker = L.marker([lat, lon], { icon: customMarker });
  marker.addTo(mapInstance);
}
