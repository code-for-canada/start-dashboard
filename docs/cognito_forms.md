# CognitoForms

The main use for Cognito Forms is to create editable forms for Airtable records, since Airtable doesn't offer that.

We use Cognito Forms to edit the following items:
- Artist Profile
- Artworks
- Reports

On the embedded forms, we can hook into certain client-side events as documented [here](https://www.cognitoforms.com/support/62/data-integration/client-side-events). We use this to prefill some data from the user account and the auth0 account ID.

The data from CognitoForms is imported to Airtable via Zapier. However we should treat Airtable as the source of truth as the records can be also be updated through Airtable when the account data is updated from the Dashboard.


### Known issues:
- we can't import multiple select values from Airtable into Cognito Forms through Zapier, only from Cognito Forms to Airtable.