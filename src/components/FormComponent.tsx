import { Pagination } from '@nextui-org/react';
import { Selection } from '@/components/NextUIWrapper'

import { useState } from 'react';
import type { Section } from '@/types/gymkana';

function FormComponent({ s }: { s: Section }) {
  const questionsPerPage = 4;
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const indexOfLastQuestion = currentPage * questionsPerPage;
  const indexOfFirstQuestion = indexOfLastQuestion - questionsPerPage;
  const currentQuestions = s.questions.slice(indexOfFirstQuestion, indexOfLastQuestion);

  const totalPages = Math.ceil(s.questions.length / questionsPerPage);

  return (
    <div>
      <form>
        {currentQuestions.map((q, index) => (
          <div className='mt-4' key={index}>
            <label className='mx-3'>{q.question /* TODO: Dificultad */}</label>
            <Selection question={q} id={index} />
          </div>
        ))}
      </form>
      {totalPages !== 1 &&
        <Pagination
          isCompact
          showControls
          total={totalPages}
          initialPage={1}
          onChange={handlePageChange}
          className='mt-4'
        />}
    </div>
  );
}

export default FormComponent;
