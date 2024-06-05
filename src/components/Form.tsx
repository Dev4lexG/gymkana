
import { Popup } from '@/components/Popup'

import { Image } from '@nextui-org/react'
import FormComponent from '@/components/FormComponent'
import SectionPagination from '@/components/SectionPagination'

export default function Form({ s, id }: { s: any, id: any }) {

    const handleClick = (event: any) => { };

    return (
        <>
            <Popup />
            <h1 className='text-6xl'>{s.section}</h1>
            <Image src='' />
            <p>{s.intro}</p>
            <h3>¡Vamos a por esas preguntas! 😁</h3>

            <FormComponent s={s} click={handleClick} />
            <br />
            <SectionPagination current={id} click={handleClick} />
        </>
    )

}