export const prerender = false

import { gymkana as q } from '@/utils/config'
import { insertUID } from '@/utils/googleCalc'
import normalize from '@/utils/normalize'
import type { APIRoute } from 'astro'

// Declara el objeto `data` con un tipo específico

const sections = q.reduce((acc, curr) => {
	// @ts-expect-error
	acc[curr.urlName] = curr.section
	return acc
}, {})

export const POST: APIRoute = async ({ request }) => {
	if (request.headers.get('Content-Type') === 'application/json') {
		let data = {}
		const body = await request.json()

		const INFO = body.info
		const SECTION = body.section || ''
		const ANSWERS = body.answers || {}

		// Asigna los valores al objeto `data`

		// @ts-expect-error
		const { questions } = q.find((s) => s.urlName === SECTION)

		const matchAnswers = questions.filter(
			// @ts-expect-error
			(q) => ANSWERS[normalize(q.question)],
		)

		const response = matchAnswers.reduce((acc: any, a: any) => {
			ANSWERS[normalize(a.question)] =
				normalize(a.expected[0]) === ANSWERS[normalize(a.question)]

			return ANSWERS
		}, {})
		if (body.action == 'update') {
			// @ts-expect-error
			if (INFO && !data[INFO.uid]) {
				// @ts-expect-error
				data[INFO.uid] = {
					participantes: INFO.participantes,
					'edad-promedio': INFO['edad-promedio'],
					origen: INFO.origen,
				}
			}

			/* Object.values(response).forEach((val) => {
	if (val === false) {
		body.errors['errors']++
		} else if (val === true) {
			body.errors['good']++
			}
			})
			body.errors['tryed']++ */
			// @ts-expect-error
			data[INFO.uid][sections[SECTION]] = body.errors

			// @ts-expect-error
			const dat = data[INFO.uid]

			dat['uid'] = INFO.uid

			fetch('http://144.24.199.81:10030/insertUID', {
				method: 'POST',
				body: JSON.stringify({ docId: process.env.DOC, sheetId: process.env.SHEET, email: process.env.MAIL, key: process.env.SECRET, data: dat, config: q}),
				headers: {
					'Content-Type': 'application/json'
				}
			}).catch(err => console.error(err))
			
			// insertUID(dat).catch(console.error)
		}
		return new Response(JSON.stringify(response), {
			headers: {
				'content-type': 'application/json;charset=UTF-8',
			},
		})
	}
	return new Response(JSON.stringify(''), {
		headers: {
			'content-type': 'application/json;charset=UTF-8',
		},
	})
}
