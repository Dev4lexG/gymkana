import { Pagination } from '@nextui-org/react'
import { Selection } from '@/components/NextUIWrapper'

import { useEffect, useState } from 'react'
import type { Section } from '@/types/gymkana'

interface sectionSaved {
  page: number
  answers: answerSaved
}

interface answerSaved {
  [key: string]: boolean
}

function FormComponent({ s }: { s: Section }) {
  const questionsPerPage = 4

  if (localStorage.getItem(s.urlName) === null) {
    const page = {
      page: 1
    }
    localStorage.setItem(s.urlName, JSON.stringify(page))

  }

  const [currentPage, setCurrentPage] = useState(JSON.parse(localStorage.getItem(s.urlName) || '').page)

  interface Answer {
    question: string
    answer: string
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    const data = JSON.parse(localStorage.getItem(s.urlName) || '')

    data.page = page

    localStorage.setItem(s.urlName, JSON.stringify(data))
    console.log(data)
  }

  const indexOfLastQuestion = currentPage * questionsPerPage
  const indexOfFirstQuestion = indexOfLastQuestion - questionsPerPage
  const currentQuestions = s.questions.slice(indexOfFirstQuestion, indexOfLastQuestion)

  const totalPages = Math.ceil(s.questions.length / questionsPerPage)

  return (
    <div>
      <form>
        {currentQuestions.map((q, index) => (
          <div className='mt-4' key={index}>
            <label className=''>{q.question /* TODO: Dificultad */}</label>
            <Selection question={q} section={s.urlName} />
          </div>
        ))}
      </form>
      {totalPages !== 1 &&
        <Pagination
          isCompact
          showControls
          total={totalPages}
          initialPage={currentPage}
          onChange={handlePageChange}
          className='mt-4 mx-auto w-[fit-content]'
        />}
    </div>
  )
}

export default FormComponent