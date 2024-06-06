export const prerender = false

import { gymkana as q } from '@/utils/config'
import normalize from '@/utils/normalize'
import ana from '@/gymkana_analitycs.json'
import * as fs from 'fs'

import type { APIRoute } from 'astro'
import path from 'path'

// Declara el objeto `data` con un tipo específico
const data = ana || {}

export const POST: APIRoute = async ({ request }) => {
	if (request.headers.get('Content-Type') === 'application/json') {
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

		// @ts-expect-error
		const trySt = data?.[INFO.uid]?.[SECTION]
		const tryes = {
			good: trySt?.good || 0,
			bad: trySt?.bad || 0,
			tryed: trySt?.tryed || 0,
		}

		const tmp = tryes

		const response = matchAnswers.reduce((acc: any, a: any) => {
			ANSWERS[normalize(a.question)] =
				normalize(a.expected[0]) === ANSWERS[normalize(a.question)]

			ANSWERS[normalize(a.question)] ? tryes.good++ : tryes.bad++
			return ANSWERS
		}, {})

		!(tmp.good === tryes.good && tmp.bad === tryes.bad) && tryes.tryed++
		// @ts-expect-error
		if (INFO && !data[INFO.uid]) {
			// @ts-expect-error
			data[INFO.uid] = {
				participantes: INFO.participantes,
				'edad-promedio': INFO['edad-promedio'],
				origen: INFO.origen,
				motivacion: INFO.motivacion,
			}
		}

		// @ts-expect-error
		data[INFO.uid][SECTION] = tryes

		console.log(data)

		fs.writeFileSync(
			path.resolve('gymkana_analitycs.json'),
			JSON.stringify(data, null, 2),
		)

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
