import Link from 'next/link'
import Layout from '../../components/layout'
import { getLessonContent, getLessons } from '../../lib/lessons'
import { Lesson } from '../../components/lesson'

export async function getStaticProps({ params }) {
  const lesson = await getLessonContent(params.slug)
  return { props: { lesson } }
}

export async function getStaticPaths() {
  const lessons = await getLessons()
  return {
    paths: lessons.map((l) => ({ params: { slug: l.slug } })),
    fallback: false,
  }
}

const BookPage = ({ lesson }) => {
  return (
    <Layout title={lesson.title}>
      <header className="text-sm mb-6">
        <Link href="/course">
          <a className="text-pink-600">← Back to lessons</a>
        </Link>
      </header>
      <Lesson lesson={lesson} />
      <footer className="my-12 flex justify-end">
        {lesson.next && (
          <Link href={`/course/${lesson.next.slug}`}>
            <a className="text-pink-600 text-2xl">
              <span dangerouslySetInnerHTML={{ __html: lesson.next.title }} /> →
            </a>
          </Link>
        )}
      </footer>
    </Layout>
  )
}

export default BookPage
