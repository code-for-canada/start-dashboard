const mailjet = require('./utils/Mailjet')
const { methodNotImplemented } = require('./common')

const getTemplates = (req, res) => {
  const request = mailjet
    .get("template", {'version': 'v3'})
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
  const messages = records.map(record => {
    const email = record.email
    const name = record.first_name
    const recordKeys = Object.keys(record)
    let variables = record
    recordKeys.forEach(key => {
      if (!variables[key]) {
        delete variables[key]
      }
    })
    if (!email) return

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
      console.log(result.body)
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
      getTemplates(req, res)
      break
    case 'POST':
      sendTemplateEmail(req, res)
      break
    default:
      methodNotImplemented(req, res)
  }
}