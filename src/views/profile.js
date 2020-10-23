import React from 'react'
import DefaultLayout from '../layouts/default-layout'

class Profile extends React.Component {
  componentDidMount () {
    const script = document.createElement("script");

    script.onload = () => {
      if (window.Cognito) {
        window.Cognito.load("forms", { id: "11" })
      }
    }
    script.src = "https://www.cognitoforms.com/s/vQtvojkwk0qKXX6uRXdPYA";
    script.async = true;

    document.body.appendChild(script);
  }

  render() {
    return(
      <DefaultLayout>
        <div className="cognito mt-1 mb-1">
        </div>
      </DefaultLayout>
    )
  }
}

export default Profile
