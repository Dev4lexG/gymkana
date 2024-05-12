import { Select, SelectItem } from '@nextui-org/react'

export default function AccordionWrapper() {
	return (
		<Select
			isRequired
			label='Pregunta...'
            labelPlacement="outside"
            placeholder='Selecciona una opción'
			className='max-w-xs'
		>
			
				<SelectItem key="1" value="5">
					Opción 1
				</SelectItem>
                <SelectItem key="2" value="5">
                Opción 2
				</SelectItem>
                <SelectItem key="3" value="5">
                Opción 3
				</SelectItem>
                <SelectItem key="4" value="5">
                Opción 4
				</SelectItem>
                <SelectItem key="5" value="5">
					Opción...
				</SelectItem>
		</Select>
	)
}
