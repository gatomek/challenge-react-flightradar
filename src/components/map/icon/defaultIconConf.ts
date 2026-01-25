import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

import L from 'leaflet';

const DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    shadowSize: [41, 41],
    shadowAnchor: [13, 41],
    popupAnchor: [1, -34],
    tooltipAnchor: [14, -21]
});

export function defaultIconConfig() {
    L.Marker.prototype.options.icon = DefaultIcon;
}
