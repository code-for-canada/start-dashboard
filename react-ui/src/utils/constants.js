export const DEFAULT_MAP_CENTER = { lat: 43.65347810000001, lng: -79.3841277 }

// This can be editted quite easily for a new look.
// See: https://mapstyle.withgoogle.com/
export const MAP_STYLE_BASE = [
  {
    featureType: 'administrative',
    elementType: 'labels.text.fill',
    stylers: [
      {
        lightness: '48'
      },
      {
        color: '#343a40'
      }
    ]
  },
  {
    featureType: 'landscape',
    elementType: 'all',
    stylers: [
      {
        color: '#f2f2f2'
      }
    ]
  },
  {
    featureType: 'landscape',
    elementType: 'geometry.fill',
    stylers: [
      {
        visibility: 'on'
      },
      {
        color: '#ff0000'
      }
    ]
  },
  {
    featureType: 'landscape.man_made',
    elementType: 'geometry',
    stylers: [
      {
        visibility: 'on'
      },
      {
        color: '#004b84'
      },
      {
        lightness: '90'
      },
      {
        saturation: '-80'
      }
    ]
  },
  {
    featureType: 'landscape.natural',
    elementType: 'geometry.fill',
    stylers: [
      {
        color: '#004b84'
      },
      {
        lightness: '87'
      },
      {
        saturation: '-66'
      }
    ]
  },
  {
    featureType: 'poi',
    elementType: 'all',
    stylers: [
      {
        visibility: 'off'
      }
    ]
  },
  {
    featureType: 'poi.park',
    elementType: 'geometry',
    stylers: [
      {
        visibility: 'on'
      },
      {
        color: '#c8dfd1'
      }
    ]
  },
  {
    featureType: 'road',
    elementType: 'all',
    stylers: [
      {
        saturation: -100
      },
      {
        lightness: 45
      }
    ]
  },
  {
    featureType: 'road.highway',
    elementType: 'all',
    stylers: [
      {
        visibility: 'simplified'
      },
      {
        saturation: '75'
      },
      {
        lightness: '0'
      },
      {
        weight: '1.00'
      },
      {
        gamma: '0.15'
      },
      {
        hue: '#ffc700'
      }
    ]
  },
  {
    featureType: 'road.arterial',
    elementType: 'geometry',
    stylers: [
      {
        visibility: 'on'
      },
      {
        lightness: '22'
      },
      {
        saturation: '-61'
      }
    ]
  },
  {
    featureType: 'road.arterial',
    elementType: 'labels.icon',
    stylers: [
      {
        visibility: 'off'
      }
    ]
  },
  {
    featureType: 'transit',
    elementType: 'all',
    stylers: [
      {
        visibility: 'simplified'
      },
      {
        hue: '#009fff'
      },
      {
        saturation: '-54'
      },
      {
        lightness: '0'
      },
      {
        gamma: '1.00'
      }
    ]
  },
  {
    featureType: 'water',
    elementType: 'all',
    stylers: [
      {
        color: '#004b84'
      },
      {
        visibility: 'on'
      },
      {
        saturation: '-70'
      },
      {
        lightness: '30'
      },
      {
        weight: '0.01'
      }
    ]
  }
]

export const MAP_STYLE_WARD_DEFAULT = {
  visible: true,
  strokeColor: '#64aae2',
  strokeOpacity: 1,
  strokeWeight: 2,
  fillOpacity: 0.1,
  fillColor: '#64aae2'
}

export const MAP_STYLE_WARD_ACTIVE = {
  // Ensure active ward always has border lines on top.
  zIndex: 1000,
  fillColor: '#CFB51D',
  fillOpacity: 0.1,
  strokeColor: '#CFB51D',
  strokeWeight: 2,
  strokeOpacity: 1
}

export const USER_GUIDE_DOC =
  'https://docs.google.com/document/d/1yjuWqRLIfkh997wF9z5egVKRfQrU7slyf63GyhdsNhI/edit'

export const COGNITO_FORMS_IDS = {
  artistProfile: '11',
  artwork: '13',
  partnershipProgramFinalReport: '15'
}

export const EXTERNAL_LINKS = {
  locationsTable: 'https://airtable.com/tbleiRmVudM7u9BDE/viwEgRCnV41UaOmIk/',
  artworksTable: 'https://airtable.com/tbl5ApSEOzPpe4fwp/viw2swQLeJ9xwU82F/',
  artistsTable: 'https://airtable.com/tblJMc6wMTi8Awqv2/viwAi9hF74zMe2Eic/',
  artistsEntries:
    'https://www.cognitoforms.com/forms/startartistprofile/entries',
  submissionsTable: 'https://airtable.com/tblcX15UBd7NvgZNz/viwM8QlTmpKoDFJkE/',
  chartsFullScreen:
    'https://airtable.com/tbl5ApSEOzPpe4fwp/viw2swQLeJ9xwU82F?blocks=bipaTGUTVtapZ6Pgq&bip=full'
}

export const DASHBOARD_VIEW_ORDER = [
  { action: 'staff', role: 'StART Staff' },
  { action: 'reviewer', role: 'Advisory Committee' },
  { action: 'curator', role: 'Curator' },
  { action: 'artist', role: 'Artist' }
]

export const DASHBOARD_SHORTCUTS = {
  staff: [
    {
      title: 'Tools and Services (with credentials)',
      link:
        'https://docs.google.com/document/d/1UTIEjy1KRCjGA6yQ7SQBBm5yi-QKoFJyaIfMVR7XzhI/edit'
    },
    {
      title: 'User Guides',
      link:
        'https://docs.google.com/document/d/1yjuWqRLIfkh997wF9z5egVKRfQrU7slyf63GyhdsNhI/edit'
    },
    {
      title: 'Airtable',
      link:
        'https://airtable.com/tbl5ApSEOzPpe4fwp/viwozx55EaH51F1Su?blocks=hide'
    },
    {
      title: 'Submittable',
      link: 'https://streetartto.submittable.com/'
    },
    {
      title: 'Mailjet',
      link: 'https://app.mailjet.com/dashboard'
    }
  ]
}
