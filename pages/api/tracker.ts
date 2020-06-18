import { NextApiHandler } from 'next'
import * as T from 'runtypes'
import Airtable from 'airtable'

const table = new Airtable().base(process.env.AIRTABLE_BASE_ID!)(
  process.env.AIRTABLE_TABLE_NAME!,
)

async function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

const TrackerBody = T.Record({
  kind: T.Union(T.Literal('Pee'), T.Literal('Poop')),
  location: T.Union(T.Literal('Balcony'), T.Literal('Pad'), T.Literal('Floor')),
}).asReadonly()

export type TrackerBody = T.Static<typeof TrackerBody>

const handler: NextApiHandler = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(404).send('')
  }

  const { body } = req

  if (!TrackerBody.guard(body)) {
    return res.status(422).send('')
  }

  const record = await table.create({
    Date: new Date().toISOString(),
    Kind: body.kind,
    Location: body.location,
  })

  console.log('Added new record to Airtable:', record.id, record.fields)

  res.status(204).send('')
}

export default handler
