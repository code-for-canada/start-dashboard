# Custom Airtable App: Send email from a template

## What does this do?

This lets Airtable users create a mailing list from any table, save it as a view, then send them an email using a Mailjet template.

## Local development

Switch to test app:
```bash
setup:blocks:test
```
Start the local server
```bash
npm run start:dev
```
Navigate into the app directory
```bash
cd airtable-apps/send_email
```
Install dependencies
```bash
npm install
```
Run the block locally
```bash
block run
```

Then open Airtable and find the app in the "Emails" Dashboard. In the app menu, select "Edit app".
In the dialog that comes up, enter `https://localhost:9000`.

Enter the configuration settings if necessary.

Setting name | Description | Value
--- | --- | ---
Dashboard API endpoint | Our API endpoint for email templates | `https://start-dashboard:3000/api/email-templates`
Auth0 token endpoint | The Auth0 API endpoint to retrieve an auth token for the StART Dashboard M2M app. You can find this on the Auth0 settings page for the app | `https://start-dashboard.us.auth0.com/oauth/token`
Auth0 API identifier | The identifier for the app, set on the Auth0 platform | `https://dashboard.streetartoronto.ca/`
Auth0 client ID | The client ID for the StART Dashboard M2M app that the Airtable app is authenticating to | xxx
Auth0 Client Secret | The client ID for the StART Dashboard M2M app that the Airtable app is authenticating to | xxx

## Gotchas

If you're working on Chrome, you may need to change your configuration to allow insecure localhost since we are securing localhost with a self-signed certificate.

Go to `chrome://flags/#allow-insecure-localhost` and enable the feature.


## Deployment

Switch to production app:
```bash
setup:blocks:prod
```
Release the block
```bash
block release
```
Update the app configuration on Airtable with the correct production settings.

## Creating a template on Mailjet for use with this app

Create your template in the 'Transactional Templates' section.

Our API sends all the fields from the Airtable table as the template variables, so any field in Airtable is available under the same name to be inserted into the template.

Save and publish the template.

