export const prerender = false

import { gymkana as q } from '@/utils/config'
import normalize from '@/utils/normalize'

import type { APIRoute } from 'astro'

export const POST: APIRoute = async ({ request }) => {
	if (request.headers.get('Content-Type') === 'application/json') {
		const body = await request.json()

		const INFO = body.info || ''
		const SECTION = body.section || ''
		const ANSWERS = body.answers || {}

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
