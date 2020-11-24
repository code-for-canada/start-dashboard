/**
@param {object} user - The user being created
@param {string} user.id - user id
@param {string} user.tenant - Auth0 tenant name
@param {string} user.username - user name
@param {string} user.email - email
@param {boolean} user.emailVerified - is e-mail verified?
@param {string} user.phoneNumber - phone number
@param {boolean} user.phoneNumberVerified - is phone number verified?
@param {object} user.user_metadata - user metadata
@param {object} user.app_metadata - application metadata
@param {object} context - Auth0 connection and other context info
@param {string} context.requestLanguage - language of the client agent
@param {object} context.connection - information about the Auth0 connection
@param {object} context.connection.id - connection id
@param {object} context.connection.name - connection name
@param {object} context.connection.tenant - connection tenant
@param {object} context.webtask - webtask context
@param {function} cb - function (error, response)
*/
module.exports = function (user, context, cb) {
  const auth0_id = `auth0|${user.id}`;
  const Airtable = require('airtable');
  const base = new Airtable({
      apiKey: context.webtask.secrets.AIRTABLE_API_KEY
    }).base(context.webtask.secrets.AIRTABLE_BASE_ID);

  const saveUserToAirtable = () => {
    base('accounts').create([
      {
        "fields": {
          "username": user.username,
          "first_name": user.user_metadata.first_name,
          "last_name": user.user_metadata.last_name,
          "email": user.email,
          "role": "Artist",
          "auth0_id": auth0_id
        }
      }
    ], function(err, records) {
      if (err) {
        console.error(err);
        return;
      }
      records.forEach(function (record) {
        console.log("Created", record.getId());
      });
    });
    cb()
  }

  const updateUserOnAirtable = (existingRecord) => {
    base('accounts').update([
      {
        "id": existingRecord.id,
        "fields": {
          "auth0_id": auth0_id,
          "first_name": user.user_metadata.first_name,
          "last_name": user.user_metadata.last_name,
        }
      }
    ], function(err, records) {
      if (err) {
        console.error(err);
        return;
      }
      records.forEach(function (record) {
        console.log("Updated", record.getId());
      });
    });
    cb()
  }
    
  base('accounts')
    .select({ filterByFormula: `{email} = '${user.email}'` })
    .firstPage((err, records) => {
      if (err) {
        console.error(err);
        saveUserToAirtable()
      }
      if (records.length === 0) {
        saveUserToAirtable()
      } else {
        const existingRecord = records[0]
        if (existingRecord.auth0_id) {
          return cb('This user already has an account')
        }
        updateUserOnAirtable(existingRecord)
      }
    });
};
