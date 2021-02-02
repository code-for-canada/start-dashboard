# Airtable

## Tables and integrations

- Artworks
  - Records created by Zapier when a submission is accepted on Submittable
  - Linked to `artists`, `locations`, `programs`, and `submissions`
  - Fields that can be updated directly on Airtable:
    - media
    - title
    - medium
    - width
    - height
    - sqft
    - status

- Artists
  - Records sourced from existing `artworks` records and complemented with data from previous submissions from Submittable
  - There's an Artists form on CognitoForms for updating these records but that will be replaced by the StaRT Artist Profile form
  - Most of these records have been migrated to the `artist_profiles` table but there are several with the same email address

- Submissions
  - Records imported from Submittable via Zapier
  - Linked to `forms` and `programs`
  - Status is updated from Submittable via Zapier

- EOIs
  - this table is imported from CognitoForms via Zapier
  - the REOI took place in 2019 so this data is pretty static

- Programs
  - This table is used to document the programs used in `submissions` and `forms`
  - Records should be added directly to Airtable

- Forms
  - This table allows us to add the program name and year to the `submissions` table
  - There's no way to reliably get the program name and year from a Submittable form, so this table hooks that up for us
  - Whenever a new form is added to Submittable it needs to be added here too
  - The `submittable_category_id` comes from the URL in the edit link, i.e. for `https://streetartto.submittable.com/categories/edit/172661` the ID is 172661. Admittedly this is a terrible way to get the ID. Probably a better way would be to set up a chron job in our Dashboard API to fetch all the forms and write any new ones to Airtable. Or create another Airtable custom app or script to do it.

- Locations
  - Records were originally sourced from the existing `artworks` records
  - Records can be added through a custom form on the StART Dashboard
  - Records can only be updated directly on Airtable
  - Linked to `artworks`

- Organizations
  - not really used right now, sourced from the `partners` field in the existing `artworks` table

- Cabinets
  - imported from City of Toronto spreadsheet
  - should eventually be linked to `locations` but not done yet

- Project Updates
  - kind of a proof of concept for collecting data in the field that could lead to status updates
  - records created through an embedded Airtable form on the StART Dashboard
  - not linked to anything yet and needs to be reworked

- Accounts
  - Records imported from Auth0 via an Auth0 Hook (see `docs/auth0` and `auth0-export`)
  - Updated on the 'My account' page on the StART Dashboard
  - Linked to `artist_profiles`

- Artist profiles
  - Records are imported from the 'StART Artist Profile' form on CognitoForms via Zapier
  - The form is embedded in the StART Dashboard
  - Records can be updated by editing the CognitoForm form
  - `email`, `first_name`, and `last_name` are updated through an Airtable automation when the corresponding fields in the `accounts` table are updated
  - Linked to `artworks`, `artists`, and `accounts`

- Submittable staff
  - Records are imported from Submittable via Zapier
  - Linked to `accounts`
  - Used to fetch applications from Submittable for the account filtering on user id


## Apps (formerly known as Blocks)

### Send an email from a Mailjet template
This allows Airtable users to create a mailing list as a view, then select a Mailjet template and send it to the list.
Code and further docs are in `airtable-apps/send_email`

## Automations

### Link new account with existing artist profile
This automation runs when a new record is created in `accounts`. It does the following:
- Search for a record in `artist_profiles` with a matching email address
- If there is a matching record, link the account to the artist profile

### Update artist profile with name and email from account
This automation runs when a record in `accounts` is updated.
- it only runs on records linked to an artist profile (in the 'Has artist profile' view)
- if the `email`, `first_name`, or `last_name` fields change, it updates the corresponding fields in the `artists_profile` table

## Scripts

### Invitation to claim artist profile
You can find this script in the Emails dashboard in the Apps panel. It's triggered by a button click in the `accounts` table. When someone clicks on the "Send invitation email" button on a record, the script does the following:
- Check that the user doesn't already have an account (no value in `auth0_id` field)
- Check that the record has an email set
- Get an auth token from the Auth0 Management API
- Send a request to the StART Dashboard API with the token to send an email using the Mailjet template 'ACCOUNTS - Invitation to create account'



## Known issues
- limited permission settings for different roles
- no form view for updating records
- no way to embed blocks that include scripts or custom blocks
- when you embed a block the viewer has access to the full table data



