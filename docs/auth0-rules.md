# Auth0 Rules

Documented here for transparency

## Add user role from Airtable

```js
function addRoleFromAirtable(user, context, callback) {
  const Airtable = require('airtable@0.4.3');
  const ManagementClient = require('auth0@2.17.0').ManagementClient;
  const ManagementTokenProvider = require('auth0@2.17.0').ManagementTokenProvider;

  const ROLE_IDS = {
    'StART Staff': 'rol_h2aH436QWStWk7Oj',
    'Advisory Committee': 'rol_auFaVd6qf3rkVake',
    'Curator': 'rol_IrDonW0nV3VCYizi',
    'Artist': 'rol_sjT5Nx0xNb3fRyvu'
  };

  const management = new ManagementClient({
    domain: auth0.domain,
    clientId: configuration.START_DASHBOARD_CLIENT_ID,
    clientSecret: configuration.START_DASHBOARD_CLIENT_SECRET,
    scope: "read:users update:users read:roles update:roles delete:roles",
    tokenProvider: {
     enableCache: true,
     cacheTTLInSeconds: 10
   }
  });
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

    const roleId = ROLE_IDS[record.role] || ROLE_IDS.Artist;
    console.log("getting user roles");
    management.getUserRoles(
      { id: user.user_id },
      (err, data) => {
        if (err) {
          console.log("Error getting user roles: " + err);
          return callback(err);
        }

        const currentRoleId = data.length > 0 ? data[0].id : null;

        // user has no Auth0 role, assign the Artist role from Airtable
        if (!currentRoleId) {
          return management.assignRolestoUser(
            { id : user.user_id},
            { "roles" : [roleId]},
            (err) => {
              if (err) {
                console.log('Error assigning role: ' + err);
                return callback(err);
              }
              return callback(null, user, context);
            }
          );
        }

        // user has an Auth0 role but the role on Airtable has changed
        if (roleId !== currentRoleId) {
          console.log("removing role from user");
          management.removeRolesFromUser(
            { id: user.user_id },
            { roles: data.map(r => r.id) },
            (err, data) => {
              if (err) {
                console.log("Error removing roles: " + err);
                return callback(err);
              }

              console.log("Assigning new role to user: " + record.role);
              management.assignRolestoUser(
                { id : user.user_id},
                { "roles" : [roleId]},
                (err) => {
                  if (err) {
                    console.log('Error assigning role: ' + err);
                    return callback(err);
                  }
                  callback(null, user, context);
                }
              );
            }
          );
        } else {
          // user already has the correct Auth0 role
          console.log("user already has the correct role assigned");
          callback(null, user, context);
        }
    });
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
```js
function (user, context, callback) {
   if (user.email_verified) {
     return callback(null, user, context);
   }

   const loginCount = context.stats && context.stats.loginsCount ? context.stats.loginsCount : 0;
   if (loginCount <= 1) {
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