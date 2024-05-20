import normalize from '@/utils/normalize';
import { randomize } from '@/utils/randomize';
import { Select, SelectItem, Accordion, AccordionItem, Code, Divider } from '@nextui-org/react';
import { useState } from 'react';

interface Question {
    question: string,
    difficulty: number,
    answers: Array<string>
}

interface Selection extends Question {
    required?: boolean
    placeholder?: string
}


export function Selection({ question: q, section: s }: { question: Selection, section: string }) {

    const localData = JSON.parse(localStorage.getItem(s) || '')

    if (!('answers' in localData)) {
        localData['answers'] = {}
    }

    const answersData = localData['answers']


    const changeCallback = (e: React.ChangeEvent<HTMLSelectElement>) => {

        const localData1 = JSON.parse(localStorage.getItem(s) || '')

        if (!('answers' in localData1)) {
            localData1['answers'] = {}
        }

        const answersData1 = localData1['answers']

        const labelData = e.target.value.split('-')
        const [key, value] = labelData

        answersData1[key] = value

        localStorage.setItem(s, JSON.stringify(localData1))
    }




    return (
        <Select
            isRequired={q.required ?? true}
            placeholder={q.placeholder ?? 'Selecciona una opción'}
            className='max-w-xs mt-1'
            aria-label={q.question}
            key={normalize(q.question)}
            defaultSelectedKeys={answersData[normalize(q.question)] ? [normalize(q.question) + '-' + answersData[normalize(q.question)]] : ''}

            onChange={changeCallback}
        >
            {randomize(q.answers).map((answer, index) => {
                return (
                    <SelectItem key={normalize(q.question) + '-' + normalize(answer)} value={answer} >
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