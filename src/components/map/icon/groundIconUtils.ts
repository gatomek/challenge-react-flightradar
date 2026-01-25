import groundHeadSvg from '../../assets/ground.head.svg';
import groundHeadSelSvg from '../../assets/ground.head.sel.svg';
import groundSvg from '../../assets/ground.svg';
import groundSelSvg from '../../assets/ground.sel.svg';
import L from 'leaflet';

export const groundHeadIcon = L.icon({
    iconUrl: groundHeadSvg,
    iconSize: [30, 30],
    iconAnchor: [15, 15],
    tooltipAnchor: [0, -15],
    className: 'custom-icon'
});

export const groundHeadSelIcon = L.icon({
    iconUrl: groundHeadSelSvg,
    iconSize: [30, 30],
    iconAnchor: [15, 15],
    tooltipAnchor: [0, -15],
    className: 'custom-icon'
});

export const groundIcon = L.icon({
    iconUrl: groundSvg,
    iconSize: [30, 30],
    iconAnchor: [15, 15],
    tooltipAnchor: [0, -15],
    className: 'custom-icon'
});

export const groundSelIcon = L.icon({
    iconUrl: groundSelSvg,
    iconSize: [30, 30],
    iconAnchor: [15, 15],
    tooltipAnchor: [0, -15],
    className: 'custom-icon'
});

export const paramsToGroundIcon = (marker: undefined | boolean, heading: undefined | number) => {
    if (heading) {
        return marker ? groundHeadSelIcon : groundHeadIcon;
    }

    return marker ? groundSelIcon : groundIcon;
};
