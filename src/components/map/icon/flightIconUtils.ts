import L from 'leaflet';

import flightHeadSvg from '../../assets/flight.head.svg';
import flightHeadSelSvg from '../../assets/flight.head.sel.svg';
import flightSvg from '../../assets/flight.svg';
import flightSelSvg from '../../assets/flight.sel.svg';

const flightHeadIcon = L.icon({
    iconUrl: flightHeadSvg,
    iconSize: [30, 30],
    iconAnchor: [15, 15],
    tooltipAnchor: [0, -15],
    className: 'custom-icon'
});

const flightHeadSelIcon = L.icon({
    iconUrl: flightHeadSelSvg,
    iconSize: [30, 30],
    iconAnchor: [15, 15],
    tooltipAnchor: [0, -15],
    className: 'custom-icon'
});

const flightIcon = L.icon({
    iconUrl: flightSvg,
    iconSize: [30, 30],
    iconAnchor: [15, 15],
    tooltipAnchor: [0, -15],
    className: 'custom-icon'
});

const flightSelIcon = L.icon({
    iconUrl: flightSelSvg,
    iconSize: [30, 30],
    iconAnchor: [15, 15],
    tooltipAnchor: [0, -15],
    className: 'custom-icon'
});

export const paramsToFlightIcon = (marker: undefined | boolean, heading: undefined | number) => {
    if (heading) {
        return marker ? flightHeadSelIcon : flightHeadIcon;
    }

    return marker ? flightSelIcon : flightIcon;
};
