// React component file (AccordionWrapper.js)
import { Accordion, AccordionItem, Chip, Code, Divider } from '@nextui-org/react';

export default function AccordionWrapper() {
  return (
    <Accordion variant="bordered" className='my-4'>
      <AccordionItem key="1" aria-label="Accordion 1" title="Primera sección">
        Preguntas:
        <ul className='list-disc pl-5 mt-1 mb-3'>
          <li>Pregunta 1</li>
          <li>Pregunta 2</li>
          <li>Pregunta 3</li>
          <li>Pregunta 4...</li>
        </ul>
        Dificultad: <Chip color='warning' >Media</Chip> 
        <Divider className='my-2'/>
        <Code color='secondary'>*Esto es una idea de implementación*</Code>
      </AccordionItem>
      <AccordionItem key="2" aria-label="Accordion 2" title="Segunda sección">
      Preguntas:
        <ul className='list-disc pl-5 mt-1 mb-3'>
          <li>Pregunta 1</li>
          <li>Pregunta 2</li>
          <li>Pregunta 3</li>
          <li>Pregunta 4...</li>
        </ul>
        Dificultad: <Chip color='danger' >Difícil</Chip> 
        <Divider className='my-2'/>
        <Code color='secondary'>*Esto es una idea de implementación*</Code>
      </AccordionItem>
      <AccordionItem key="3" aria-label="Accordion 3" title="Tercera sección">
      Preguntas:
        <ul className='list-disc pl-5 mt-1 mb-3'>
          <li>Pregunta 1</li>
          <li>Pregunta 2</li>
          <li>Pregunta 3</li>
          <li>Pregunta 4...</li>
        </ul>
        Dificultad: <Chip color='success' >Fácil</Chip> 
        <Divider className='my-2'/>
        <Code color='secondary'>*Esto es una idea de implementación*</Code>
      </AccordionItem>
    </Accordion>
  );
}