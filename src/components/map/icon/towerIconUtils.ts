import towerSvg from '../../assets/tower.svg';
import towerSelSvg from '../../assets/tower.sel.svg';
import L from 'leaflet';

const towerIcon = L.icon({
    iconUrl: towerSvg,
    iconSize: [30, 30],
    iconAnchor: [15, 15],
    tooltipAnchor: [0, -15],
    className: 'custom-icon'
});

const towerSelIcon = L.icon({
    iconUrl: towerSelSvg,
    iconSize: [30, 30],
    iconAnchor: [15, 15],
    tooltipAnchor: [0, -15],
    className: 'custom-icon'
});

export const paramsToTowerIcon = (marker: undefined | boolean) => {
    return marker ? towerSelIcon : towerIcon;
};
