# CognitoForms

The main use for CognitoForms is the StART Artist Profile and the REOI.

The StART Artist Profile is embedded in the Dashboard front end on the Artist Dashboard and the Profile page.

On the embedded forms, we can hook into certain client-side events as documented [here](https://www.cognitoforms.com/support/62/data-integration/client-side-events). We use this to prefill some data from the user account and the auth0 account ID.

The data from CognitoForms is imported to Airtable via Zapier. However we should treat Airtable as the source of truth as the records can be also be updated through Airtable when the account data is updated from the Dashboard.

