import q from '@/gymkana.json'
import type { Section } from '@/types/gymkana'
import normalize from './normalize'

q.forEach((s) => {
	s.questions.forEach((q) => {
		// @ts-expect-error
		q.expected = []
		q.answers.forEach((a, i) => {
			if (a.startsWith('*')) {
				a = a.substring(1)
				

				// @ts-expect-error
				q.expected.push(a)
				q.answers[i] = a
			}
		})
	})
	// @ts-expect-error
	s.urlName = normalize(s.section)
})
// @ts-expect-error
export const gymkana: Array<Section> = q as const
