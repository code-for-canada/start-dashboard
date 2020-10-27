import React, { useEffect, useState } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { Grid } from '@material-ui/core';
import { Link, useLocation, useHistory } from 'react-router-dom'

const ProfileURL = ({ url }) => {
  const [copied, setCopied] = useState(false)

  const copyURL = async () => {
    await navigator.clipboard.writeText(url)
    setCopied(true)
  }

  return(
    <div className="profile-url">
      <div className="bg-light url p-2">
        <code id="copy-url" className="text-dark mr-2">{url}</code>
        <button className="btn btn-secondary btn-sm" onClick={copyURL}>{`${copied ? 'Copied!' : 'Copy'}`}</button>
      </div>
    </div>
  )
}

const Profile = () => {
  const { user } = useAuth0()
  const hash = useLocation().hash
  const history = useHistory()
  const [ cognitoLoaded, setCognitoLoaded ] = useState(false)
  const [ forms, setForms ] = useState([])
  const [ artist, setArtist ] = useState(null)

  const loadCognito = () => {
    window.Cognito.load("forms", { id: "11" })
    setCognitoLoaded(true)
  }

  useEffect(() => {
    /* eslint-disable react-hooks/exhaustive-deps */
    if (!cognitoLoaded && hash) {
      loadCognito()
    }
  }, [cognitoLoaded])

  useEffect(() => {
    const getArtist = async() => {
      const res = await fetch(`/api/artist?email=${encodeURIComponent(user.email)}`)
      const data = await res.json()
      if (data.records.length > 0) {
        const artistRecord = data.records[0]
        setArtist({ ...artistRecord.fields, id: artistRecord.id })
      }
    }

    getArtist()
  }, [user])

  useEffect(() => {
    /* eslint-disable react-hooks/exhaustive-deps */
    if (!hash && artist?.view_url) {
      const urlHash = artist.view_url.split('#')[1]
      history.push(`/dashboard/#${urlHash}`)
    }
  }, [artist])

  useEffect(() => {
    const getSubmittableForms = async() => {
      const res = await fetch(`/api/forms`)
      const data = await res.json()

      if (data.error) {
        return console.log(data.error)
      }

      const activeForms = data?.items?.filter(i => {
        let today = new Date()
        const isStarted = i.start_date ? (new Date(i.start_date) <= today) : true
        const isExpired = i.expire_date ? (new Date(i.expire_date) < today) : false

        return i.active && isStarted && !isExpired
      })
      setForms(activeForms)
    }

    getSubmittableForms()
  }, [])

  const hasProfile = window.location.href.split("#")[1]
  const editUrlFragment = artist?.edit_url.split("/profile")[1]
  const editUrl = `/profile${editUrlFragment}`

  return(
    <>
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <div className="panel outlined bg-white p-4">
          <p>Welcome to StART Digital!</p>
          {
            !hasProfile &&
            <React.Fragment>
              <p>This is the online home of Street Art Toronto.</p>
              <p>Now that you've registered, you have access to the Artist Dashboard. You can create your Artist Profile and apply to current opportunities. If you are joining in a different capacity, you will need someone from the StART team to give you the appropriate permissions on this platform.</p>
            </React.Fragment>
          }
          {
            artist && hasProfile &&
            <React.Fragment>
              <p>Please make sure to keep your profile up to date. This is how we contact you about your current projects, ongoing applications or future opportunities we think you would be interested in.</p>
              <p>If you're applying for one of our programs, we may ask you for the link to your Artist Profile. You can copy it here.</p>
              <ProfileURL url={artist.view_url} />
            </React.Fragment>
          }
        </div>
      </Grid>
    </Grid>
    <Grid container spacing={2}>
      <Grid item xs={12} md={6}>
        <div className="panel outlined bg-white p-4">
          {
            hasProfile ?
            <React.Fragment>
              <div className="cognito">
              </div>
              <Link className="btn btn-primary mt-2" to={editUrl}>Edit your profile</Link>
            </React.Fragment> :
            <React.Fragment>
              <h2 className="mb-4">StART Artist Profile</h2>
              <p>Create an artist profile to join the StART artist community.</p>
              <p>What is this profile for?</p>
              <ul className="ml-4">
                <li>We review your artist profile when you apply to participate in our programs</li>
                <li>For artworks you produce with StART, your profile lets you control the information that shows up on our public map</li>
                <li>We may contact you about upcoming opportunities that fit your profile.</li>
              </ul>
              <a href={`/profile`} className="btn btn-primary">Create your profile</a>
            </React.Fragment>
          }
        </div>
      </Grid>
      <Grid item xs={12} md={6}>
        <div className="panel outlined bg-white p-4">
          <h2 className="mb-4">Current opportunities</h2>
          <ul className="list-unstyled">
          {
            forms.map(form => <li key={form.category_id} className="mb-2"><a href={form.form_url} target="_blank" rel="noopener noreferrer">{form.name}</a></li>)
          }
          </ul>
        </div>
      </Grid>
    </Grid>
    </>
  )
}

export default Profile
