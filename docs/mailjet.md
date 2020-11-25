# Mailjet

We use Mailjet for the transactional template emails and the Send API. It's integrated through Zapier, Airtable, and our Dashboard API.

## Zapier
Currntly we have live triggers for the following events:
- Artist profile is created
- Dashboard role is updated

## Airtable
We have a custom Airtable app that can send template emails to a list of contacts from a view. It uses the `/api/email-templates` endpoint on the StART Dashboard API.

