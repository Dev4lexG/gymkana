export interface Section {
	urlName: string
	section: string
	image?: string
	intro?: string
	explanation?: string
	questions: Array<Question>
}

export interface Question {
	question: string
	answers: Array<string>
	expected: Array<String>
	difficulty: 1 | 2 | 3
}
