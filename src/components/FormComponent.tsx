import { Button, Link, Pagination } from '@nextui-org/react'
import { Selection } from '@/components/NextUIWrapper'

import { useEffect, useState } from 'react'
import type { Section } from '@/types/gymkana'
import normalize from '@/utils/normalize'

interface sectionSaved {
  page: number
  answers: answerSaved
}

interface answerSaved {
  [key: string]: boolean
}
const svg = {
  back: `<svg aria-hidden="true" fill="none" focusable="false" height="1em" role="presentation" viewBox="0 0 24 24" width="1em"><path d="M15.5 19l-7-7 7-7" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"></path></svg>`,
  to: `<svg aria-hidden="true" fill="none" focusable="false" height="1em" role="presentation" viewBox="0 0 24 24" width="1em" class="rotate-180"><path d="M15.5 19l-7-7 7-7" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"></path></svg>`
}

function FormComponent({ s }: { s: Section }) {

  const aas = {
    page: 1,
    answers: {}
  }

  if (localStorage.getItem(s.urlName) == null) {
    localStorage.setItem(s.urlName, JSON.stringify(aas))
  }

  const questionsPerPage = 4

  const [currentPage, setCurrentPage] = useState(JSON.parse(localStorage.getItem(s.urlName) || '')?.page)

  const [validationData, setValidationData] = useState({});


  const indexOfLastQuestion = currentPage * questionsPerPage
  const indexOfFirstQuestion = indexOfLastQuestion - questionsPerPage
  const currentQuestions = s.questions.slice(indexOfFirstQuestion, indexOfLastQuestion)


  const totalPages = Math.ceil(s.questions.length / questionsPerPage)

  useEffect(() => {
    handlePageChange(currentPage, '')
  }, [])


  const handlePageChange = (page: number, action: string) => {

    const localData1 = JSON.parse(localStorage.getItem(s.urlName) || '')

    if (!('answers' in localData1)) {
      localData1['answers'] = {}
    }

    const answersData1 = localData1['answers']



    const fData = {
      uid: '',
      section: s.urlName,
      answers: answersData1
    }


    if (action === 'next' && page < totalPages) {
      page++;
    } else if (action === 'prev' && page > 1) {
      page--;
      setCurrentPage(page)
      const data1 = JSON.parse(localStorage.getItem(s.urlName) || '')

      data1.page = page

      localStorage.setItem(s.urlName, JSON.stringify(data1))
    }


    fetch('/gymkana/validate.json', {
      method: 'POST',
      body: JSON.stringify(fData),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(a => a.json().then(data => {

      const currr = currentQuestions.reduce((acc: any, current: any) => {
        acc[normalize(current.question)] = data[normalize(current.question)];
        return acc;
      }, {});

      setValidationData(data)

      if (Object.values(currr).some(value => Boolean(!value))) {
        localStorage.removeItem('finish_' + s.urlName + '_')
        return
      }

      if (action === 'next' && page == totalPages) {
        setTimeout(() => {
          localStorage.setItem('finish_' + s.urlName + '_', '1')
          window.location.href = '/gymkana'
        }, 1000)
      }

      setCurrentPage(page)
      const data1 = JSON.parse(localStorage.getItem(s.urlName) || '')

      data1.page = page

      localStorage.setItem(s.urlName, JSON.stringify(data1))
    })
    ).catch(e => {
      console.log(e)
    })
  }

  return (
    <>
      <form>
        {currentQuestions.map((q, index) => (
          <div className='mt-4' key={index}>
            <label className=''>{q.question /* TODO: Dificultad */}</label>
            <Selection question={q} section={s.urlName} isCorrect={
              // @ts-expect-error
              validationData[normalize(q.question)]
            } />
          </div>
        ))}
      </form>
      <div className='flex flex-row items-center  mt-4  justify-center gap-2'>
        {totalPages !== 1 && (
          <>

            <Button onPress={() => handlePageChange(currentPage, 'prev')} className='min-w-6' disabled={currentPage == 1}><span dangerouslySetInnerHTML={{ __html: svg.back }}></span></Button>

            <Pagination
              isCompact
              total={totalPages}
              isDisabled
              initialPage={currentPage}
              page={currentPage}
              className='w-[fit-content] opacity-100'
            />

          </>

        )}
        <Button
          onPress={() => handlePageChange(currentPage, 'next')}
          className='min-w-6'>
          <span dangerouslySetInnerHTML={{ __html: currentPage == totalPages ? 'Finalizar' : svg.to }}>
          </span>
        </Button>
      </div>
    </>
  )
}

export default FormComponent