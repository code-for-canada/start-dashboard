# StART Dashboard: Developer Docs

Note: To find any pre-created credentials for this project, please see the
"StART: Passwords" Google Doc.

## Auth0 Account

All configuration mentioned will be added to your `.env` file in the project's root directory.

1. Sign up for an Auth0 account.
2. Visit your applications listing page:  
   `https://manage.auth0.com/dashboard/us/YOURUSERNAME/applications`
3. Click the app name, "Default App".
4. In the "Settings" tab:
    - Note the Domain and enter it as `REACT_APP_AUTH0_DOMAIN` in your `.env` config.
    - Note the Client ID and enter it as `REACT_APP_AUTH0_CLIENT_ID` in your `.env` config.
5. Under "Allowed Callback URLs", enter `http://localhost:3000`

## Google Maps API Key

WIP

## Airtable API Key

This credential is used to modify data in Airtable from the dashboard.

Warning: These keys work at the **user level**, and so your API key will allow
any modifications that your Airtable user account allows.

Given the above, the API key / account should ideally have:
- a permission scope on your database no greater than required: `editor`, rather than `creator` or `owner`.
- access to only databases that are required by the dashboard, ie. `StART V3` database.

You may wish to create a new user to meet the above recommendations.

All configuration mentioned will be added to your `.env` file in the project's root directory.

1. Log into the Airtable account you'd like to use for API access.
2. Visit the database, and note the base ID in the URL (the part of path beginning with `appXXXXXXX`).
    - Enter this as `START_AIRTABLE_BASE` in your `.env` config.
3. Visit your account page: https://airtable.com/account
4. Generate an API key if it doesn't already exist.
5. Enter this key as `START_AIRTABLE_TOKEN` in your `.env` config.
