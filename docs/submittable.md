# Submittable

Most Submittable data comes in through Zapier to Airtable.

We make a call to the Submittable API from the StART Dashboard to get the currently available forms for the Artist Dashboard.
However the API doesn't allow us to discern "hidden" forms so we end up showing some forms that are meant to be shared by direct link.

We also make a call to the Submittable API to get applications assigned to an Advisory Committee member for their Dashboard.