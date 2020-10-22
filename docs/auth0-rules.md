# Auth0 Rules

Documented here for transparency

## Add user role from Airtable

```
function addRoleFromAirtable(user, context, callback) {
  const Airtable = require('airtable@0.4.3');

  // Ensure user is verified
  if (!user.email || !user.email_verified) {
    return callback(null, user, context);
  }

  getRecord(user.email, (err, record) => {
    if (err) return callback(err);

    context.idToken['https://streetartoronto.ca/name'] = record.name;
    context.idToken['https://streetartoronto.ca/role'] = record.role;
    context.idToken['https://streetartoronto.ca/programs'] = record.programs;
    context.idToken['https://streetartoronto.ca/program_names'] = record.program_names;

    callback(null, user, context);
  });

  // Select user by email and get roles and programs
  function getRecord(email, done) {

    const base = new Airtable({
      apiKey: configuration.AIRTABLE_API_KEY
    }).base(configuration.AIRTABLE_BASE_ID);

    const formula = `{email} = "${email}"`;

    base('access_control').select({
      maxRecords: 3,
      filterByFormula: formula
    }).firstPage(function page(err, records) {
      if (err) { console.error(err); done(err); }
      if (!records) { done('Empty response from Airtable'); }

      const record = records[0];
      const role = record.get('role');
      const programs = record.get('programs');
      const program_names = record.get('program_names');
      const name = record.get('first_name');

      done(null, { name: name, role: role, programs: programs, program_names: program_names });
    });
  }
}
```

## Resend verification email
```
function (user, context, callback) {
   if (user.email_verified) {
     return callback(null, user, context);
   }

   var ManagementClient = require('auth0@2.9.1').ManagementClient;
   var management = new ManagementClient({
     token: auth0.accessToken,
     domain: auth0.domain
   });

   var params = {
       user_id: user.user_id
   };

    management.sendEmailVerification(params, function (err) {
       if (err) {
         // Handle error.
         console.log(err);
       }
       callback(null, user, context);
    });
 }
 ```