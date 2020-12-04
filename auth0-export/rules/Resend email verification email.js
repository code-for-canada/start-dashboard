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