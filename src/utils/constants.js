// This can be editted quite easily for a new look.
// See: https://mapstyle.withgoogle.com/
export const MAP_STYLE_BASE = [
    {
        "featureType": "administrative",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "lightness": "48"
            },
            {
                "color": "#343a40"
            }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "all",
        "stylers": [
            {
                "color": "#f2f2f2"
            }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "color": "#ff0000"
            }
        ]
    },
    {
        "featureType": "landscape.man_made",
        "elementType": "geometry",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "color": "#004b84"
            },
            {
                "lightness": "90"
            },
            {
                "saturation": "-80"
            }
        ]
    },
    {
        "featureType": "landscape.natural",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#004b84"
            },
            {
                "lightness": "87"
            },
            {
                "saturation": "-66"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "poi.park",
        "elementType": "geometry",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "color": "#c8dfd1"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "all",
        "stylers": [
            {
                "saturation": -100
            },
            {
                "lightness": 45
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "simplified"
            },
            {
                "saturation": "75"
            },
            {
                "lightness": "0"
            },
            {
                "weight": "1.00"
            },
            {
                "gamma": "0.15"
            },
            {
                "hue": "#ffc700"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "geometry",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "lightness": "22"
            },
            {
                "saturation": "-61"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "labels.icon",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "transit",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "simplified"
            },
            {
                "hue": "#009fff"
            },
            {
                "saturation": "-54"
            },
            {
                "lightness": "0"
            },
            {
                "gamma": "1.00"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "all",
        "stylers": [
            {
                "color": "#004b84"
            },
            {
                "visibility": "on"
            },
            {
                "saturation": "-70"
            },
            {
                "lightness": "30"
            },
            {
                "weight": "0.01"
            }
        ]
    }
]
