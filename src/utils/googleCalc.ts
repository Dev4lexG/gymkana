import { GoogleSpreadsheet } from 'google-spreadsheet'
import { JWT } from 'google-auth-library'
import PQueue from 'p-queue'

// import { config as loadEnv } from 'dotenv'

// loadEnv()

import { gymkana as config } from '@/utils/config'

const jwt = new JWT({
	email: process.env.MAIL,
	key: (process.env.SECRET || '').replace(/\\n/g, '\n'),
	scopes: ['https://www.googleapis.com/auth/spreadsheets'],
})
const doc = new GoogleSpreadsheet(process.env.DOC || '', jwt)

const sections = config.reduce((acc, curr) => {
	// @ts-expect-error
	acc[curr.section] = curr.section
	return acc
}, {})

const RowB = ['uid', 'participantes', 'edad-promedio', 'origen']

config.forEach((s) => {
	RowB.push(s.section)
})

const sectionIndex = {
	start: RowB.findIndex((val) =>
		Object.values(sections).some((value) => value === val),
	),
	finish: RowB.length - 1,
}

const RowA = Array(sectionIndex.start).fill('')
RowA.push('SECCIONES - bien;mal;intentos')

interface uid {
	uid: string
	participantes: number
	'edad-promedio': number
	origen: string
}

let init = false
let RowwB
async function isInit() {
	if (init) return
	await doc.loadInfo()

	const sheet = doc.sheetsById[parseInt(process.env.SHEET || '')]

	await sheet.setHeaderRow(RowA, 1)
	RowwB = await sheet.setHeaderRow(RowB, 2)
	init = true
	return
}

const queue = new PQueue({ interval: 5000, intervalCap: 1 })
export async function insertUID(dat: uid) {
	return queue.add(() => insertUIDq(dat).catch(err => console.error(err)))
}

async function insertUIDq(dat: uid) {
	await isInit()
	const data = { ...dat }
	for (const key in sections) {
		// @ts-expect-error
		if (data[key]) {
			// @ts-expect-error
			data[key] = `${data[key]?.good};${data[key]?.errors};${data[key]?.tryed}`
		}
	}
	await doc.loadInfo()

	const sheet = doc.sheetsById[parseInt(process.env.SHEET || '')]

	const rows = await sheet.getRows()

	console.info('ROWS', rows.length)

	sheet.mergeCells({
		startRowIndex: 0,
		endRowIndex: 1,
		startColumnIndex: sectionIndex.start,
		endColumnIndex: sectionIndex.finish + 1,
	})

	let updated

	rows.forEach(async (row) => {
		if (row.get('uid') == data.uid) {
			updated = true
			row.assign(data)
			await row.save()
			return
		}
	})

	if (!updated) {
		await sheet.addRow(data)
	}
}
