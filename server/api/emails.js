const mailjet = require('./utils/Mailjet')
const { methodNotImplemented, checkScopes } = require('./common')

const getTemplates = (req, res) => {
  const request = mailjet
    .get('template', { 'version': 'v3' })
    .request()

  request
    .then((result) => {
      return res
        .status(200)
        .send({ templates: result.body })
    })
    .catch((err) => {
      console.log(err)
      return res.
        status(500)
        .send({ error: err })
    })
}

const sendTemplateEmail = (req, res) => {
  const { records, template } = req.body
  const missingEmails = records.filter(r => !r.email)

  if (missingEmails.length) {
    return res.status(400).send({
      error: `${missingEmails.length} records are missing an email address.`,
      records: missingEmails
    })
  }

  const messages = records.map(record => {
    const email = record.email
    if (!email) return

    const name = record.first_name
    const recordKeys = Object.keys(record)
    let variables = record
    recordKeys.forEach(key => {
      if (!variables[key]) {
        delete variables[key]
      }
    })

    return {
      From: {
        Email: 'streetart@toronto.ca',
        Name: 'StART Digital',
      },
      To: [
        {
          Email: email,
          Name: name,
        },
      ],
      TemplateID: template,
      TemplateLanguage: true,
      Variables: variables
    }
  })

  const request = mailjet.post('send', { version: 'v3.1' }).request({
    Messages: messages
  })

  request
    .then(result => {
      return res.status(200).send(result)
    })
    .catch(err => {
      console.log(err)
      return res.status(500).send({ error: err })
    })
  }

module.exports = (req, res) => {
  switch (req.method) {
    case 'GET':
      checkScopes(req, res, getTemplates, ['is:staff'])
      break
    case 'POST':
      checkScopes(req, res, sendTemplateEmail, ['is:staff'])
      break
    default:
      methodNotImplemented(req, res)
  }
}
