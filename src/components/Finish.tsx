import { Button, Link } from "@nextui-org/react";

export function Finish() {

	const sections = localStorage.getItem('sections')?.split(',') || '' as unknown as Array<string>

	if (!sections.filter) return (
		<>
			<div className='text-center mt-10 mb-5'>
				<h1 className="text-4xl">¡Has terminado esta sección! 💪</h1>
			</div>
			<div className='flex flex-col justify-center'>
				<Button
					href={'/'}
					as={Link}
					color='primary'
					variant='solid'
					className='my-4 mx-auto'
				>
					Volver al inicio
				</Button>
			</div>
		</>
	)

	const queue = sections.filter((v) => !localStorage.getItem(`finish_${v.split('|')[0]}_`)
	)

	if (queue.length === 0) {
		return (
			<>
				<div className='text-center mt-10 mb-5'>
					<h1 className="text-4xl">¡Enhorabuena, has terminado la Gymkana! 😁</h1>
				</div>
				<div className='flex flex-col justify-center'>
					<Button
						href={'/'}
						as={Link}
						color='primary'
						variant='solid'
						className='my-4 mx-auto'
					>
						Volver al inicio
					</Button>
				</div>
			</>
		)
	}

	const random = queue[Math.floor(Math.random() * queue.length)].split('|')

	const v = {
		url: random[0],
		name: random[1]
	}

	return (
		<>
			<div className='text-center mt-10 mb-5'>
				<h1 className="text-4xl">¡Has terminado esta sección! 💪</h1>
			</div>
			<div className='flex flex-col justify-center'>
				<Button
					href={'/gymkana/' + v.url}
					as={Link}
					color='primary'
					variant='solid'
					className='my-4 mx-auto'
				>
					Continúa con {v.name}
				</Button>
			</div>
		</>
	)
}
