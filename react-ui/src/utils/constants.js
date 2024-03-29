const DEFAULT_MAP_CENTER = { lat: 43.65347810000001, lng: -79.3841277 }

// This can be editted quite easily for a new look.
// See: https://mapstyle.withgoogle.com/
const MAP_STYLE_BASE = [
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

const MAP_STYLE_WARD_DEFAULT = {
  visible: true,
  strokeColor: '#64aae2',
  strokeOpacity: 1,
  strokeWeight: 2,
  fillOpacity: 0.1,
  fillColor: '#64aae2'
}

const MAP_STYLE_WARD_ACTIVE = {
  // Ensure active ward always has border lines on top.
  zIndex: 1000,
  fillColor: '#CFB51D',
  fillOpacity: 0.1,
  strokeColor: '#CFB51D',
  strokeWeight: 2,
  strokeOpacity: 1
}

const USER_GUIDE_DOC =
  'https://docs.google.com/document/d/1yjuWqRLIfkh997wF9z5egVKRfQrU7slyf63GyhdsNhI/edit'

const STAGING_COGNITO_FORMS_IDS = {
  artistProfile: '20',
  artistProfileInternal: '23',
  artworkPublic: '22',
  artworkInternal: '18',
  progressUpdate: '19',
  feedbackForm: '26'
}

const PRODUCTION_COGNITO_FORMS_IDS = {
  artistProfile: '11',
  artistProfileInternal: '25',
  artworkPublic: '13',
  artworkInternal: '14',
  progressUpdate: '17',
  feedbackForm: '26'
}

const STAGING_EXTERNAL_LINKS = {
  locationsTable:
    'https://airtable.com/tblzXlRWkbujP0cmB/viwZVl7oL2J6vFXrh?blocks=hide',
  artworksTable:
    'https://airtable.com/tblqfTnFExxBzVQfm/viwiQN55KSV8FLYxO?blocks=hide',
  artistsTable:
    'https://airtable.com/tbl4rGBxCR0kVn1eZ/viwVXDMGX2hYzTf19?blocks=hide',
  reportsTable:
    'https://airtable.com/tblKQviHByu5XC9Nc/viwkP70sDW2LmS75v?blocks=hide',
  artistProfileEntries:
    'https://www.cognitoforms.com/forms/startartistprofilestaging/entries',
  submissionsTable:
    'https://airtable.com/tblxCvAVrbPZQ7Aww/viwZAVaY6G5panrHt?blocks=hide',
  chartsFullScreen:
    'https://airtable.com/tbl5ApSEOzPpe4fwp/viw2swQLeJ9xwU82F?blocks=bipaTGUTVtapZ6Pgq&bip=full',
  cognitoForms: 'https://www.cognitoforms.com/forms/',
  submittable: 'https://streetartto.submittable.com/submissions',
  airtable: 'https://airtable.com/tblqfTnFExxBzVQfm/viwn70lM4HRJRLJLC/',
  mailjet: 'https://app.mailjet.com/dashboard',
  projectsTable: 'https://airtable.com/tblkc9qX7oysKNhPy/viwy1MGsno8xF4EDj'
}

const PRODUCTION_EXTERNAL_LINKS = {
  locationsTable: 'https://airtable.com/tbleiRmVudM7u9BDE/viwEgRCnV41UaOmIk/',
  artworksTable: 'https://airtable.com/tbl5ApSEOzPpe4fwp/viw2swQLeJ9xwU82F/',
  artistsTable: 'https://airtable.com/tblJMc6wMTi8Awqv2/viwAi9hF74zMe2Eic/',
  reportsTable: 'https://airtable.com/tblpb1NGLAMTCLy4f/viwZaDvrNYkz11wmy/',
  artistProfileEntries:
    'https://www.cognitoforms.com/forms/startartistprofile/entries',
  submissionsTable: 'https://airtable.com/tblcX15UBd7NvgZNz/viwM8QlTmpKoDFJkE/',
  chartsFullScreen:
    'https://airtable.com/tbl5ApSEOzPpe4fwp/viw2swQLeJ9xwU82F?blocks=bipaTGUTVtapZ6Pgq&bip=full',
  cognitoForms: 'https://www.cognitoforms.com/forms/',
  submittable: 'https://streetartto.submittable.com/submissions',
  airtable:
    'https://airtable.com/tbl5ApSEOzPpe4fwp/viwozx55EaH51F1Su?blocks=hide',
  mailjet: 'https://app.mailjet.com/dashboard',
  projectsTable: 'https://airtable.com/tblhVfEz8ONPE1dce/viwmccmhULNDvg3BM'
}

const STAGING_IFRAME_URLS = {
  artworkForm:
    'https://airtable.com/embed/shrfy49OT63VD9Le5?backgroundColor=red',
  allArtists:
    'https://airtable.com/embed/shrEj0c93sj5Xsdxo?backgroundColor=red&viewControls=on',
  artworksPendingReview:
    'https://airtable.com/embed/shrwq1wlPVkJ9zlKO?backgroundColor=red&viewControls=on',
  progressUpdates:
    'https://airtable.com/embed/shrMvrID8UD4Q8DET?backgroundColor=red&viewControls=on',
  artworksByStatus:
    'https://airtable.com/embed/shrZoQMDT0qscReWa?backgroundColor=red&viewControls=on',
  allArtworks:
    'https://airtable.com/embed/shrMp9jqfwztEwISM?backgroundColor=red&viewControls=on',
  submissionsByStatus:
    'https://airtable.com/embed/shrcxH31gW4YMiUfX?backgroundColor=red&viewControls=on',
  newSubmissions:
    'https://airtable.com/embed/shruO65EWsoQwQjWX?backgroundColor=red&viewControls=on',
  locationsMap:
    'https://airtable.com/embed/shrMZzPDkMrjd2EVP?backgroundColor=red',
  allLocations:
    'https://airtable.com/embed/shrnOpNKoDErHN8Bd?backgroundColor=red&viewControls=on',
  allReports:
    'https://airtable.com/embed/shrgUNpVtdqiifmZh?backgroundColor=red&viewControls=on',
  reportResponses:
    'https://airtable.com/embed/shro49RADcLPh4iQa?backgroundColor=red&viewControls=on',
  artworksByProgramChat:
    'https://airtable.com/embed/shrJFkiZ5qTuOlsP4?backgroundColor=red',
  artworksByYearChart:
    'https://airtable.com/embed/shr84nCVbDRxsDzOi?backgroundColor=red',
  artworksByWardChart:
    'https://airtable.com/embed/shrpAYrGHBaptMqrl?backgroundColor=red',
  submissionsByProgramChart:
    'https://airtable.com/embed/shrFngoNz1VsBEdXd?backgroundColor=red',
  submissionsByLabelChart:
    'https://airtable.com/embed/shrT5Mxh53j2s4QRU?backgroundColor=red',
  artistsByPronounChart:
    'https://airtable.com/embed/shrzCmYBr4oLRoADq?backgroundColor=red',
  projectKanban:
    'https://airtable.com/embed/shrun267f6uTN8ZVP?backgroundColor=red&viewControls=on',
  projectsByLeader:
    'https://airtable.com/embed/shrovsu4iuu3nzSci?backgroundColor=red&viewControls=on',
  projectCalendar:
    'https://airtable.com/embed/shre99yRkm3de15FZ?backgroundColor=red&viewControls=on',
  projectGanttChart:
    'https://airtable.com/embed/shrxZuzprSAfKpNo7?backgroundColor=red',
  tasksKanban:
    'https://airtable.com/embed/shrEWIfZMU6Ch5QET?backgroundColor=red&viewControls=on',
  tasksCalendar:
    'https://airtable.com/embed/shr9n0erPGFapZ1gE?backgroundColor=red&viewControls=on'
}

const PRODUCTION_IFRAME_URLS = {
  artworkForm:
    'https://airtable.com/embed/shrMvrXih5f3TAIbN?backgroundColor=red',
  allArtists:
    'https://airtable.com/embed/shra4E5FrOJS6fzWO?backgroundColor=red&viewControls=on',
  artworksPendingReview:
    'https://airtable.com/embed/shrD7vjyY21h6ywuI?backgroundColor=red&layout=card&viewControls=on',
  progressUpdates:
    'https://airtable.com/embed/shrhywybjaOqycbNz?backgroundColor=red&layout=card&viewControls=on',
  artworksByStatus:
    'https://airtable.com/embed/shrTlL5928ssPbMeP?backgroundColor=red&viewControls=on',
  allArtworks:
    'https://airtable.com/embed/shrdDGqIxvtiIjFzZ?backgroundColor=red&viewControls=on',
  submissionsByStatus:
    'https://airtable.com/embed/shrqukWs4K0JgixB9?backgroundColor=red&viewControls=on',
  newSubmissions:
    'https://airtable.com/embed/shrbgSefEwH2I8pgM?backgroundColor=red&viewControls=on',
  locationsMap:
    'https://airtable.com/embed/shrq9Y4H4zVkBhjgx?backgroundColor=red',
  allLocations:
    'https://airtable.com/embed/shrKy239MuejuvGhM?backgroundColor=red&viewControls=on',
  allReports:
    'https://airtable.com/embed/shrA0F6dW6YZwmamP?backgroundColor=red&viewControls=on',
  reportResponses:
    'https://airtable.com/embed/shrNWLDASXGtpK7I4?backgroundColor=red&viewControls=on',
  artworksByProgramChat:
    'https://airtable.com/embed/shr7aNlR2QTzsSqjM?backgroundColor=red',
  artworksByYearChart:
    'https://airtable.com/embed/shrYSQzL3KjngY2xN?backgroundColor=red',
  artworksByWardChart:
    'https://airtable.com/embed/shrsz1PVXK5MIphFj?backgroundColor=red',
  submissionsByProgramChart:
    'https://airtable.com/embed/shrO9gQz4j3rKNvWL?backgroundColor=red',
  submissionsByLabelChart:
    'https://airtable.com/embed/shrDMDeDT8pWNnC1i?backgroundColor=red',
  artistsByPronounChart:
    'https://airtable.com/embed/shrmZGi0nx3NDCsQT?backgroundColor=red',
  projectKanban:
    'https://airtable.com/embed/shrFSNTLbMYF7q25d?backgroundColor=red&viewControls=on',
  projectsByLeader:
    'https://airtable.com/embed/shrf1sKadqz5aT7SV?backgroundColor=red&viewControls=on',
  projectCalendar:
    'https://airtable.com/embed/shrt0EkwJ4GjLlXgj?backgroundColor=red&viewControls=on',
  projectGanttChart:
    'https://airtable.com/embed/shr7qVrUoBx7PYLpR?backgroundColor=red',
  tasksKanban:
    'https://airtable.com/embed/shreZUuRIxXLFiCOb?backgroundColor=red&viewControls=on',
  tasksCalendar:
    'https://airtable.com/embed/shrCwsOUqtneoZ9uS?backgroundColor=red&viewControls=on'
}

const DASHBOARD_VIEW_ORDER = [
  { action: 'staff', role: 'StART Staff' },
  { action: 'reviewer', role: 'Advisory Committee' },
  { action: 'curator', role: 'Curator' },
  { action: 'artist', role: 'Artist' }
]

const COGNITO_FORMS_IDS =
  process.env.REACT_APP_ENV === 'staging'
    ? STAGING_COGNITO_FORMS_IDS
    : PRODUCTION_COGNITO_FORMS_IDS
const EXTERNAL_LINKS =
  process.env.REACT_APP_ENV === 'staging'
    ? STAGING_EXTERNAL_LINKS
    : PRODUCTION_EXTERNAL_LINKS
const IFRAME_URLS =
  process.env.REACT_APP_ENV === 'staging'
    ? STAGING_IFRAME_URLS
    : PRODUCTION_IFRAME_URLS

const DASHBOARD_SHORTCUTS = {
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
      link: EXTERNAL_LINKS.airtable
    },
    {
      title: 'Submittable',
      link: EXTERNAL_LINKS.submittable
    },
    {
      title: 'Mailjet',
      link: EXTERNAL_LINKS.mailjet
    }
  ]
}

export {
  DEFAULT_MAP_CENTER,
  MAP_STYLE_BASE,
  MAP_STYLE_WARD_DEFAULT,
  MAP_STYLE_WARD_ACTIVE,
  USER_GUIDE_DOC,
  DASHBOARD_VIEW_ORDER,
  DASHBOARD_SHORTCUTS,
  COGNITO_FORMS_IDS,
  EXTERNAL_LINKS,
  IFRAME_URLS
}
