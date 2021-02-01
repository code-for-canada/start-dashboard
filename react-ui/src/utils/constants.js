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
  artistProfile: process.env.REACT_APP_ARTIST_PROFILE_FORM_ID,
  public_artwork: process.env.REACT_APP_PUBLIC_ARTWORK_FORM_ID,
  internal_artwork: process.env.REACT_APP_INTERNAL_ARTWORK_FORM_ID,
}

export const EXTERNAL_LINKS = {
  locationsTable: process.env.REACT_APP_LOCATIONS_TABLE_URL,
  artworksTable: process.env.REACT_APP_ARTWORKS_TABLE_URL,
  artistsTable: process.env.REACT_APP_ARTISTS_TABLE_URL,
  reportsTable: process.env.REACT_APP_REPORTS_TABLE_URL,
  artistsEntries: process.env.REACT_APP_ARTIST_PROFILE_ENTRIES_URL,
  submissionsTable: process.env.REACT_APP_SUBMISSIONS_TABLE_URL,
  chartsFullScreen: process.env.REACT_APP_CHARTS_FULLSCREEN_URL,
  cognitoForms: process.env.REACT_APP_COGNITO_FORMS_URL,
  submittable: process.env.REACT_APP_SUBMITTABLE_URL,
}

export const IFRAME_URLS = {
  allArtists: process.env.REACT_APP_ALL_ARTISTS_IFRAME,
  artworksByStatus: process.env.REACT_APP_ARTWORKS_BY_STATUS_IFRAME,
  allArtworks: process.env.REACT_APP_ALL_ARTWORKS_IFRAME,
  submissionsByStatus: process.env.REACT_APP_SUBMISSIONS_BY_STATUS_IFRAME,
  newSubmissions: process.env.REACT_APP_NEW_SUBMISSIONS_IFRAME,
  locationsMap: process.env.REACT_APP_LOCATIONS_MAP_IFRAME,
  allLocations: process.env.REACT_APP_ALL_LOCATIONS_IFRAME,
  allReports: process.env.REACT_APP_ALL_REPORTS_IFRAME,
  reportResponses: process.env.REACT_APP_REPORT_RESPONSES,
  artworksByProgramChat: process.env.REACT_APP_ARTWORKS_BY_PROGRAM_CHART,
  artworksByYearChart: process.env.REACT_APP_ARTWORKS_BY_YEAR_CHART,
  artworksByWardChart: process.env.REACT_APP_ARTWORKS_BY_WARD_CHART,
  submissionsByProgramChart: process.env.REACT_APP_SUBMISSIONS_BY_PROGRAM_CHART,
  submissionsByLabelChart: process.env.REACT_APP_SUBMISSIONS_BY_LABEL_CHART,
  artistsByPronounChart: process.env.REACT_APP_ARTISTS_BY_PRONOUN_CHART,
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
      title: 'How-to Guides',
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
