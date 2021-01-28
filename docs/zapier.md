# Zapier


## Application Process (Submittable)

### SUBMITTABLE > AIRTABLE - Import new submission from Submittable
When someone submits an application on Submittable, it gets imported into the `submissions` table on Airtable
### AIRTABLE - Update submission in Airtable with program data
When a new record is created in the `submissions` table on Airtable, find the program data and add it to the submission record.
### SUBMITTABLE > AIRTABLE - Update submission status from Submittable
When the submission status is updated in Submittable, update the status in Airtable.
### SUBMITTABLE > AIRTABLE - import new staff members
Import staff accounts to Airtable when a new one is added.

## Artist Profiles (CognitoForms)

### COGNITOFORMS > AIRTABLE > MAILJET - Create artist profile
When an artist profile is created:
- import the artist profile to the `artist_profiles` table in Airtable
- send an email to the artist using the `ARTIST PROFILES - Artist profile created` template

### COGNITOFORMS > AIRTABLE - Update artist profile
When an artist updates their profile, import those changes to the `artist_profiles` table

## Artworks (CognitoForms)

### AIRTABLE > COGNITOFORMS - Create artwork editing forms when new artwork is added in Airtable
- when a new artwork is added to the database, create two records in Cognito Forms: one is for the public fields that the artist can edit, and the other is for internal information that only StART Staff can edit.

### COGNITOFORMS > AIRTABLE - Update artwork internal fields
When someone updates their artwork, update the data in Airtable
### COGNITOFORMS > AIRTABLE - Update artwork public information
When start staff updates an artwork, update the data in Airtable

## Reports

### COGNITOFORMS > AIRTABLE - import report responses
- import report responses to Airtable (only partial data at the moment)


## Dashboard Admin

Not active right now

## POC: CognitoForms application process

Not active right now

## REOI

Not active right now