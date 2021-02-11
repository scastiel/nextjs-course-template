import Link from 'next/link'
import { Fragment } from 'react'
import Layout from '../../components/layout'
import { getLessons } from '../../lib/lessons'

export const getStaticProps = async () => {
  return {
    props: {
      lessons: await getLessons(),
    },
  }
}

const LessonsList = ({ lessons }) => {
  return (
    <>
      {lessons.map((lesson) => (
        <Fragment key={lesson.slug}>
          <li className="border border-b-0 last:border-b first:rounded-t-md last:rounded-b-md border-gray-200 bg-white hover:bg-pink-50">
            <Link href={`/course/${lesson.slug}`}>
              <a
                className={`block p-2 ${
                  lesson.parentSlug ? 'pl-8 text-sm' : ''
                }`}
              >
                {lesson.parentSlug && <span>↳</span>}
                {lesson.number && (
                  <span className="inline-block w-8 text-right mr-2 text-sm tabular-nums">
                    {lesson.number}.
                  </span>
                )}
                <span dangerouslySetInnerHTML={{ __html: lesson.title }} />
              </a>
            </Link>
          </li>
        </Fragment>
      ))}
    </>
  )
}

const LessonGroup = ({ title, lessons }) => {
  return (
    <>
      {title && <h2 className="text-xl mt-8 mb-2 font-bold">{title}</h2>}
      <ul className="rounded-md shadow-lg">
        <LessonsList lessons={lessons} />
      </ul>{' '}
    </>
  )
}

const Index = ({ lessons }) => {
  return (
    <Layout widthClass="max-w-3xl w-full">
      <div className="prose my-8">
        <h1>Course outline</h1>
      </div>
      {lessons ? (
        <>
          <LessonGroup lessons={lessons.filter((l) => l.type === 'foreword')} />
          <LessonGroup
            title="Lessons"
            lessons={lessons.filter(
              (l) => l.type === 'lesson' || l.type === 'sublesson'
            )}
          />
          <LessonGroup
            title="Appendices"
            lessons={lessons.filter((l) => l.type === 'appendix')}
          />
        </>
      ) : (
        <p>An error has occurred.</p>
      )}
    </Layout>
  )
}

export default Index
