import q from '@/gymkana.json'
import type { Section } from '@/types/gymkana'

q.forEach(({ questions }) => {
	questions.forEach((q) => {
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
})
// @ts-expect-error
export const config: Array<Section> = q as const
