export const randomize = (a: Array<any>) => {
	return a.sort(() => Math.random() - 0.5)
}
