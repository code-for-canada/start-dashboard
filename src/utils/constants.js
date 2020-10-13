export const DEFAULT_MAP_CENTER = { lat: 43.65347810000001, lng: -79.3841277 }

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

export const PANELS_DATA = [
  {
    id: 'project-updates',
    title: 'Project Updates',
    isVisible: true,
    isSmall: true,
    editLink: 'https://airtable.com/tblhqR67jrTJ169Cf/viwvQN6OyFyxsPYtq?blocks=hide',
    editText: 'Edit in Airtable',
    frameSrc: 'https://airtable.com/embed/shrxrrqGr1tu5UKt9?backgroundColor=red&viewControls=on',
  },
  {
    id: 'submit-updates',
    title: 'Submit Update',
    isVisible: true,
    isSmall: true,
    editLink: 'https://airtable.com/tblhqR67jrTJ169Cf/viwV5AQuGxE4OfNX0?blocks=hide',
    editText: 'Edit in Airtable',
    frameSrc: 'https://airtable.com/embed/shr087J79r2jG6rE2?backgroundColor=red',
  },
  {
    id: 'artwork-status-board',
    title: 'Artwork Status Board',
    isVisible: false,
    isSmall: false,
    editLink: 'https://airtable.com/tbl5ApSEOzPpe4fwp/viwiX18oxXONzk8th?blocks=hide',
    editText: 'Edit in Airtable',
    frameSrc: 'https://airtable.com/embed/shrTlL5928ssPbMeP?backgroundColor=red&viewControls=on',
  },
  {
    id: 'submissions',
    title: 'Submissions',
    isVisible: true,
    isSmall: false,
    editLink: 'https://streetartto.submittable.com/submissions',
    editText: 'Edit in Submittable',
    frameSrc: 'https://airtable.com/embed/shrqukWs4K0JgixB9?backgroundColor=red&viewControls=on',
  },
  {
    id: 'artworks',
    title: 'Artworks',
    isVisible: true,
    isSmall: false,
    editLink: 'https://airtable.com/tbl5ApSEOzPpe4fwp/viwfmyIqZl3bsj2eo?blocks=hide',
    editText: 'Edit in Airtable',
    frameSrc: 'https://airtable.com/embed/shrdDGqIxvtiIjFzZ?backgroundColor=red&viewControls=on',
  },
  {
    id: 'artists',
    title: 'Artists',
    isVisible: false,
    isSmall: false,
    editLink: 'https://www.cognitoforms.com/forms/artistprofile/entries',
    editText: 'Edit in CognitoForms',
    frameSrc: 'https://airtable.com/embed/shrJegAZi7w7Kj5ue?backgroundColor=red&viewControls=on',
  },
]
