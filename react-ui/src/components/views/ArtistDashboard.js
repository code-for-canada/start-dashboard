import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { useAuth0 } from '@auth0/auth0-react'
import { Grid, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Link, useLocation, useHistory } from 'react-router-dom'

import { COGNITO_FORMS_IDS } from 'utils/constants'
import { Block, BlockTitle } from 'components/common/Block'
import EmbeddedCognitoForm from 'components/forms/EmbeddedCognitoForm'
import Loading from 'components/common/Loading'
import ReportsList from 'components/common/ReportsList'
import ArtworksList from 'components/common/ArtworksList'
import { getArtist, getResource } from 'utils/apiHelper'

const useStyles = makeStyles(theme => ({
  codeArea: {
    backgroundColor: theme.palette.action.hover,
    padding: theme.spacing(1),
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginTop: theme.spacing(1)
  },
  code: {
    flex: '1 1 auto',
    alignSelf: 'center',
    wordBreak: 'break-word',
    marginRight: theme.spacing(1)
  },
  list: {
    listStyle: 'none',
    paddingLeft: 0,
    marginLeft: 0
  },
  button: {
    marginTop: theme.spacing(2)
  },
  container: {
    marginTop: theme.spacing(2)
  }
}))

const ProfileURL = ({ url }) => {
  const [copied, setCopied] = useState(false)
  const classes = useStyles()

  const copyURL = async () => {
    await navigator.clipboard.writeText(url)
    setCopied(true)
  }

  return (
    <div className={classes.codeArea}>
      <code id="copy-url" className={classes.code}>
        {url}
      </code>
      <Button size="small" onClick={copyURL}>
        {`${copied ? 'Copied!' : 'Copy'}`}
      </Button>
    </div>
  )
}

ProfileURL.propTypes = {
  url: PropTypes.string
}

const WelcomeMessage = ({ artist }) => {
  if (artist) {
    const editProfileHash = artist?.edit_hash || ''
    return (
      <React.Fragment>
        <BlockTitle title="Welcome to StART Digital!" />
        <p>This is the online home of Street Art Toronto.</p>
        <p className="mb-3">
          Please make sure to keep your profile up to date. This is how we
          expand our awareness of street art creatives who are interested and
          available to participate in StART projects. Your profile will assist
          Advisory Panel members when considering artists and other participants
          for StART Projects.
        </p>
        <Button
          component={Link}
          to={`/profile/edit${editProfileHash}`}
          variant="contained"
          color="primary">
          Edit your profile
        </Button>
      </React.Fragment>
    )
  }

  return (
    <React.Fragment>
      <BlockTitle title="Welcome to StART Digital!" />
      <p>This is the online home of Street Art Toronto.</p>
      <p>
        Now that you&apos;ve registered, you can create your Artist Profile and
        apply to current opportunities.
      </p>
    </React.Fragment>
  )
}

WelcomeMessage.propTypes = {
  artist: PropTypes.object
}

const ArtistProfile = ({ artist, user }) => {
  const [profilePending, setProfilePending] = useState(false)
  const profileHash = useLocation().hash
  const hasProfile = artist
  const isOwnProfile = artist?.view_hash === profileHash
  const isEmailVerified = user && user.email_verified
  const editProfileHash = artist?.edit_hash || ''
  const classes = useStyles()

  useEffect(() => {
    const isPending = window.localStorage.getItem('artist-profile-pending')

    if (isPending && !hasProfile) {
      return setProfilePending(true)
    }

    if (isPending && hasProfile) {
      window.localStorage.removeItem('artist-profile-pending')
      return setProfilePending(false)
    }
  }, [hasProfile])

  if (profilePending) {
    return (
      <React.Fragment>
        <BlockTitle title="Your StART Artist Profile" />
        <p>Your profile is being processed. Please try refreshing the page.</p>
      </React.Fragment>
    )
  }

  if (hasProfile) {
    return (
      <React.Fragment>
        <BlockTitle title="Your StART Artist Profile" />
        <EmbeddedCognitoForm
          formId={COGNITO_FORMS_IDS.artistProfile}
          showForm={isOwnProfile}
        />
        <Button
          component={Link}
          to={`/profile/edit${editProfileHash}`}
          variant="contained"
          color="primary">
          Edit your profile
        </Button>
      </React.Fragment>
    )
  }

  return (
    <React.Fragment>
      <BlockTitle title="StART Artist Profile" />
      <p>Create an artist profile to join the StART artist community.</p>
      <p>What is this profile for?</p>
      <ul className="ml-4">
        <li>
          We review your artist profile when you apply to participate in our
          programs
        </li>
        <li>
          For artworks you produce with StART, your profile lets you control the
          information that shows up on our public map
        </li>
        <li>
          This is how we expand our awareness of street art creatives who are
          interested and available to participate in StART projects. We may
          contact you about upcoming opportunities that fit your profile.
        </li>
      </ul>
      {isEmailVerified ? (
        <Button
          className={classes.button}
          component={Link}
          to={`/profile/new/${user.sub}`}
          variant="contained"
          color="primary">
          Create your profile
        </Button>
      ) : (
        <p>
          You must verify your email before you can access your artist profile.
        </p>
      )}
    </React.Fragment>
  )
}

ArtistProfile.propTypes = {
  artist: PropTypes.object,
  user: PropTypes.object
}

const FormsList = () => {
  const [forms, setForms] = useState()
  const classes = useStyles()

  useEffect(() => {
    const abortController = new AbortController()

    const getForms = async () => {
      try {
        const opts = { signal: abortController.signal }
        const data = await getResource({ resource: 'forms', opts })

        if (data.error) {
          return console.log(data.error)
        }

        const activeForms = data.items?.filter(i => {
          const today = new Date()
          const isStarted = i.start_date
            ? new Date(i.start_date) <= today
            : true
          const isExpired = i.expire_date
            ? new Date(i.expire_date) < today
            : false

          return i.active && isStarted && !isExpired
        })

        if (activeForms?.length > 0) {
          setForms(activeForms)
        }
      } catch (err) {
        if (abortController.signal.aborted) {
          console.log('Request to fetch Submittable forms was aborted')
        } else {
          console.log('Error fetching Submittable forms', err)
        }
      }
    }

    if (!forms) {
      getForms()
    }

    return () => {
      abortController.abort()
    }
  }, [forms])

  if (forms?.length > 0) {
    return (
      <ul className={classes.list}>
        {forms.map(form => (
          <li key={form.category_id} className="mb-2">
            <a href={form.form_url} target="_blank" rel="noopener noreferrer">
              {form.name}
            </a>
          </li>
        ))}
      </ul>
    )
  }

  return <p>No current opportunities.</p>
}

const ArtistDashboard = () => {
  const { user, getAccessTokenSilently, isAuthenticated } = useAuth0()
  const location = useLocation()
  const history = useHistory()
  const [artist, setArtist] = useState(null)
  const [isLoading, setLoading] = useState(true)
  const classes = useStyles()

  // fetch the artist profile for the authed user
  useEffect(() => {
    const abortController = new AbortController()
    const getArtistProfile = async () => {
      try {
        const token = await getAccessTokenSilently({
          audience: 'https://dashboard.streetartoronto.ca/'
        })

        const opts = {
          signal: abortController.signal,
          headers: {
            Authorization: `Bearer ${token}`
          }
        }

        const profileId = user['https://streetartoronto.ca/artist_profile_id']

        if (!profileId) {
          console.log('This account does not have a profile.')
          return setLoading(false)
        }

        const data = await getArtist({ opts })

        if (data.error) {
          console.log(data.error)
          return setLoading(false)
        }

        if (data.record) {
          const artistRecord = data.record
          setArtist({ ...artistRecord.fields, id: artistRecord.id })
        }
        setLoading(false)
      } catch (err) {
        if (abortController.signal.aborted) {
          console.log('Request to fetch artist was aborted')
        } else {
          console.log('Error fetching artist', err)
          setLoading(false)
        }
      }
    }

    if (isAuthenticated && !artist) {
      getArtistProfile()
    }

    return () => {
      abortController.abort()
    }
  }, [user, getAccessTokenSilently, isAuthenticated, artist])

  // add profile hash if artist has profile
  useEffect(() => {
    const isShowingProfile = !!location.hash
    if (!isShowingProfile && artist) {
      history.replace(`/dashboard/artist${artist?.view_hash || ''}`)
    }
  }, [artist, location, history])

  if (isLoading) {
    return <Loading />
  }

  return (
    <div className={classes.container}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Block>
            <WelcomeMessage artist={artist} />
          </Block>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Block>
            <ArtistProfile artist={artist} user={user} />
          </Block>
        </Grid>
        <Grid item xs={12} md={6}>
          {artist && <ArtworksList artist={artist} />}
          {artist && <ReportsList artist={artist} />}

          <Block>
            <BlockTitle title="Current opportunities" />
            <FormsList />
          </Block>
        </Grid>
      </Grid>
    </div>
  )
}

export default ArtistDashboard
