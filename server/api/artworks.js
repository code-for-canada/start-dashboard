const { artworksTable } = require('./utils/Airtable')
const { methodNotImplemented, checkScopes } = require('./common')

const createArtwork = (req, res) => {
  const artwork = req.body
  artworksTable.create([artwork], (err, records) => {
    if (err) {
      console.error(err)
      return res.status(500).send({ error: err.message })
    }
    records.forEach(function (record) {
      return res.status(201).send({ record })
    })
  })
}

const updateArtwork = (req, res) => {
  const artwork = req.body
  artworksTable.update([artwork], (err, records) => {
    if (err) {
      console.error(err)
      return res.status(500).send({ error: err.message })
    }
    return res.status(200).send({ records })
  })
}

const getArtwork = (req, res) => {
  const { id } = req.query
  if (!id) {
    return res.status(400).send({ error: "Missing artwork ID" })
  }

  artworksTable.find(id, (err, record) => {
    if (err) {
      console.error(err)
      return res.status(500).send({ error: err.message })
    }

    const artwork = { ...record.fields, id: record.id }
    return res.status(200).send({ artwork })
  })
}

const getArtworksByArtist = async (req, res) => {
  try {
    const { artist } = req.query

    if (!artist) {
      return res.status(400).send({ error: "Missing artist identifier" })
    }

    const records = await artworksTable
      .select({ filterByFormula: `{artist_profile} = '${artist}'` })
      .firstPage()

    const items = records.map(rec => ({ ...rec.fields, id: rec.id }))

    return res.status(200).send({ items })
  } catch (err) {
    console.error(err)
    return res.status(500).send({ error: err.message })
  }
}

module.exports = (req, res) => {
  switch (req.method) {
    case 'POST':
      checkScopes(req, res, createArtwork, ['is:staff'])
      break
    case 'GET':
      const { id, artist } = req.query
      if (id) {
        return checkScopes(req, res, getArtwork, ['is:staff', 'is:artist'])
      } else if (artist) {
        return checkScopes(req, res, getArtworksByArtist, ['is:staff', 'is:artist'])
      }
      break
    case 'PATCH':
      checkScopes(req, res, updateArtwork, ['is:staff'])
      break
    default:
      methodNotImplemented(req, res)
  }
}
