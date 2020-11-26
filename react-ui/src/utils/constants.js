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

export const USER_GUIDE_DOC =
  'https://docs.google.com/document/d/1yjuWqRLIfkh997wF9z5egVKRfQrU7slyf63GyhdsNhI/edit'

export const PANELS_DATA = [
  {
    id: 'project-updates',
    title: 'Project Updates',
    isVisible: true,
    isSmall: true,
    editLink:
      'https://airtable.com/tblhqR67jrTJ169Cf/viwvQN6OyFyxsPYtq?blocks=hide',
    editText: 'Edit in Airtable',
    frameSrc:
      'https://airtable.com/embed/shrxrrqGr1tu5UKt9?backgroundColor=red&viewControls=on'
  },
  {
    id: 'submit-updates',
    title: 'Submit Update',
    isVisible: true,
    isSmall: true,
    editLink:
      'https://airtable.com/tblhqR67jrTJ169Cf/viwV5AQuGxE4OfNX0?blocks=hide',
    editText: 'Edit in Airtable',
    frameSrc: 'https://airtable.com/embed/shr087J79r2jG6rE2?backgroundColor=red'
  },
  {
    id: 'artwork-status-board',
    title: 'Artwork Status Board',
    isVisible: true,
    isSmall: false,
    editLink:
      'https://airtable.com/tbl5ApSEOzPpe4fwp/viwiX18oxXONzk8th?blocks=hide',
    editText: 'Edit in Airtable',
    frameSrc:
      'https://airtable.com/embed/shrTlL5928ssPbMeP?backgroundColor=red&viewControls=on'
  },
  {
    id: 'submissions',
    title: 'Submissions',
    isVisible: true,
    isSmall: false,
    editLink: 'https://streetartto.submittable.com/submissions',
    editText: 'Edit in Submittable',
    frameSrc:
      'https://airtable.com/embed/shrqukWs4K0JgixB9?backgroundColor=red&viewControls=on',
    guides: [
      {
        title: 'How to set up an application form on Submittable',
        link: `${USER_GUIDE_DOC}#heading=h.wsulqj6ofxsi`
      }
    ]
  },
  {
    id: 'artworks',
    title: 'Artworks',
    isVisible: true,
    isSmall: false,
    editLink:
      'https://airtable.com/tbl5ApSEOzPpe4fwp/viwfmyIqZl3bsj2eo?blocks=hide',
    editText: 'Edit in Airtable',
    frameSrc:
      'https://airtable.com/embed/shrdDGqIxvtiIjFzZ?backgroundColor=red&viewControls=on',
    guides: [
      {
        title: 'How to add an artwork to the database',
        link: `${USER_GUIDE_DOC}#heading=h.sr3v8nph29mu`
      },
      {
        title: 'How to update an artwork’s information',
        link: `${USER_GUIDE_DOC}#heading=h.vrelgewywb8c`
      },
      {
        title: 'How to search and filter artworks',
        link: `${USER_GUIDE_DOC}#heading=h.2pupcjt5sfnf`
      }
    ]
  },
  {
    id: 'artists',
    title: 'Artists',
    isVisible: true,
    isSmall: false,
    editLink: 'https://www.cognitoforms.com/forms/startartistprofile/entries',
    editText: 'Edit in CognitoForms',
    frameSrc:
      'https://airtable.com/embed/shra4E5FrOJS6fzWO?backgroundColor=red&viewControls=on',
    guides: [
      {
        title: 'How to add an artist to the database',
        link: `${USER_GUIDE_DOC}#heading=h.4didquwn4hfy`
      },
      {
        title: 'How to update an artist’s profile',
        link: `${USER_GUIDE_DOC}#heading=h.jtbns3bziflx`
      },
      {
        title: 'How to search and filter artists',
        link: `${USER_GUIDE_DOC}#heading=h.jushirtzch5f`
      }
    ]
  }
]

export const COGNITO_FORMS_IDS = {
  artistProfile: '11'
}

export const AIRTABLE_LINKS = {
  locationsTable: 'https://airtable.com/tbleiRmVudM7u9BDE/viwEgRCnV41UaOmIk/'
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
