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
	console.info('SHEETID')
	console.info(process.env.SHEET)
	console.info('SECRET')
	console.info(process.env.SECRET)
	console.info('MAIL')
	console.info(process.env.MAIL)
	console.info('DOC')
	console.info(process.env.DOC)
	
	return queue.add(() => insertUIDq(dat).catch(err => console.error(err)
}

async function insertUIDq(dat: uid) {
	await isInit()
	console.info('runn')
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

	const rowss = await sheet.getRows()

	const newData = {}

	rowss.forEach((row) => {
		const obj = row.toObject()

		// @ts-expect-error
		newData[obj.uid] = {}
		for (const key in obj) {
			if (obj[key]) {
				const ke = obj[key].split(';')
				if (ke.length === 3) {
					// @ts-expect-error
					newData[obj.uid][key] = { good: ke[0], errors: ke[1], tryed: ke[2] }
				}
				// @ts-expect-error
				else newData[obj.uid][key] = obj[key]
			}
		}
	})
	return newData
}
