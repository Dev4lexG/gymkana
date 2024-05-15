import { randomize } from '@/utils/randomize';
import { Select, SelectItem, Accordion, AccordionItem, Code, Divider } from '@nextui-org/react';

interface Question {
    question: string,
    difficulty: number,
    answers: Array<string>
}

interface Selection extends Question {
    required?: boolean
    placeholder?: string
}


export function Selection({ question: q, id: i }: { question: Selection, id: number }) {
    return (
        <Select
            isRequired={q.required ?? true}
            placeholder={q.placeholder ?? 'Selecciona una opción'}
            className='max-w-xs mt-1'
            aria-label={q.question}
        >
            {randomize(q.answers).map((answer, index) => {
                return (
                    <SelectItem key={i + '-' + index} value={answer} >
                        {answer}
                    </SelectItem>
                )
            })}
        </Select>
    )
}


type AccQuestion = Omit<Question, 'answers'>

interface Accordion {
    section: string
    questions: Array<AccQuestion>
    comment?: string
}

export function AccordionWrapper({ sections: q }: { sections: Array<Accordion> }) {
    return (
        <Accordion variant="bordered" className='my-4'>
            {q.map((s, index) => {
                return (
                    <AccordionItem key={index} aria-label={s.section} title={s.section}
                        startContent={'|' /* TODO: color */}
                        subtitle={'Difucultad promedio ' /* TODO: color  y tipo de dificultad */}
                    >
                        Preguntas:
                        <ul className='list-disc pl-5 mt-1 mb-3'>
                            {s.questions.map((q) => {
                                return (
                                    <li>{q.question}</li>
                                )
                            })}
                        </ul>
                        {s.comment && (
                            <>
                                <Divider className='my-2' />
                                <Code color='secondary' /* TODO: Colores diferentes */ >{s.comment}</Code>
                            </>
                        )}
                    </AccordionItem>
                )
            })}
        </Accordion>
    )
}