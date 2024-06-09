import normalize from '@/utils/normalize';
import { randomize } from '@/utils/randomize';
import { Select, SelectItem, Accordion, AccordionItem, Code, Divider, Button, Link } from '@nextui-org/react';
import { useState } from 'react';

interface Question {
    question: string,
    difficulty: number,
    answers: Array<string>

    expected: Array<String>
}

interface Selection extends Question {
    required?: boolean
    placeholder?: string
}


export function Selection({ question: q, section: s, isCorrect }: { question: Selection, section: string, isCorrect: boolean }) {

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
        <>
            <Select
                isMultiline={true}
                isRequired={q.required ?? true}
                placeholder={q.placeholder ?? 'Selecciona una opción'}
                className='max-w-xs mt-1'
                aria-label={q.question}
                color={isCorrect ? 'success' : isCorrect == undefined ? 'warning' : 'danger'}
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
        </>
    )
}


type AccQuestion = Omit<Question, 'answers'>

interface Accordion {
    section: string
    questions: Array<AccQuestion>
    urlName: string
    comment?: string
}

export function AccordionWrapper({ sections: q }: { sections: Array<Accordion> }) {

    localStorage.setItem('sections', q.map((v) => { return [v.urlName, v.section].toString().replace(',', '|') }).toString())

    return (
        <Accordion variant="bordered" className='my-4'>
            {q.map((s, index) => {
                const completed = localStorage.getItem('finish_' + s.urlName + '_') == '1'

                const datas = localStorage.getItem('__' + s.urlName) && JSON.parse(localStorage.getItem('__' + s.urlName) || '')
                const sd = {
                    good: datas?.good,
                    errors: datas?.errors
                }
                return (
                    <AccordionItem key={index} aria-label={s.section} title={s.section}
                        startContent={'|'}
                        classNames={{
                            subtitle: completed ? "text-success" : "text-warning",
                            startContent: completed ? "text-success" : "text-warning"
                        }}
                        subtitle={
                            <>
                                {completed ? 'Completado' : 'Incompleto'}
                                <span className='text-white'>
                                    {(sd?.good || sd?.errors) && <>&nbsp;Totales -</>}
                                    {sd?.good ? <>&nbsp;| Aciertos: <span className='text-success'>{sd.good}</span></> : ''}
                                    {sd?.errors ? <>&nbsp;| Errores: <span className='text-danger'>{sd.errors}</span></> : ''}
                                </span>
                            </>
                        }
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
                        <Button
                            as={Link}
                            color={completed ? "success" : "warning"}
                            href={'/gymkana/' + s.urlName}
                            variant="flat"
                        >
                            {completed ? "Editar" : "Empezar"} {s.section.toLowerCase()}
                        </Button>
                    </AccordionItem>
                )
            })}
        </Accordion >
    )
}
