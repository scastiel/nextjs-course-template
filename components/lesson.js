import hydrate from 'next-mdx-remote/hydrate'
import { CodeBlock } from './code-block'
import { Note } from './note'

const components = {
  code: CodeBlock,
  aside: Note,
}

export const Lesson = ({ lesson }) => {
  const content = hydrate(lesson.content, { components })

  let header = null
  if (lesson.type === 'lesson') {
    header = (
      <small className="block text-base mb-4">Lesson {lesson.number}</small>
    )
  } else if (lesson.type === 'sublesson') {
    header = (
      <small className="block text-base mb-4">
        Lesson {lesson.parent.number}.{' '}
        <span dangerouslySetInnerHTML={{ __html: lesson.parent.title }} />
      </small>
    )
  }

  let title
  if (lesson.type === 'sublesson') {
    title = (
      <>
        <span className="text-3xl mr-2">{lesson.number}.</span>{' '}
        <span dangerouslySetInnerHTML={{ __html: lesson.title }} />
      </>
    )
  } else {
    title = <span dangerouslySetInnerHTML={{ __html: lesson.title }} />
  }

  return (
    <article className="prose prose-pink max-w-none">
      <h1>
        {header}
        {title}
      </h1>
      {content}
    </article>
  )
}
