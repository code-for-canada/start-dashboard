# Auth0

There are several places where we use Auth0:
- App and API configuration on the Auth0 dashboard
- Hooks and Rules within Auth0
- Connecting to Auth0 from our dashboard client app using [auth0-react](https://github.com/auth0/auth0-react)
- Connecting to Auth0 using the REST API from our dashboard backend

## Apps

### StART Digital
StART Digital is the client side app for user authentication and authorization on the StART Dashboard.

### StART Dashboard
StART Dashboard is the machine-to-machine app that allows us to connect to our backend from other apps, like Airtable or Auth0 rules/hooks.

## APIs

### StART Dashboard API
We use this to manage the access tokens for our dashboard API. Based on the user roles and permissions set in Auth0, when the client requests a token for the dashboard API it will have the appropriate permissions that we can then parse in the backend.

## Rules

### Add user role and account data from Airtable
This rule runs on every authentication and does the following:
- ensure the email is verified before accessing account data
- fetch the user record from the Accounts table based on the `auth0_id` field
- check the user role from Airtable and set that role within Auth0 if it isn't already set
- attach the account data from Airtable to the token

### Resend email verification email
This rule runs on every authentication and does the following:
- if this is the first time authenticating (account creation) do nothing
- on any subsequent authentication, if the user hasn't verified their email, resend the email verification

## Hooks

### Post-registration hook (save-to-airtable-accounts)
This hook runs when a user has registered. It does the following:
- search for the user in the Account table by email address
- if the user has a record in Airtable and already has an Auth0 account, do nothing.
- if the user has a record but no Auth0 account, update it with the Auth0 id, first name and last name
- if there is no user record, create one



