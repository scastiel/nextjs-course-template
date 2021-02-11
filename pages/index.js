import { BrowserMockup } from '../components/browser-mockup'
import Layout from '../components/layout'
import { Lesson } from '../components/lesson'
import { getLessonContent } from '../lib/lessons'

const Home = ({ lesson }) => {
  return (
    <Layout widthClass="max-w-4xl">
      <div className="flex flex-col items-center mb-16">
        <div className="flex flex-col self-stretch">
          <p className="text-center text-4xl mt-32 font-bold">
            This is the demo of a{' '}
            <strong className="text-pink-800 font-bold">template</strong> you
            <br className="hidden sm:inline" /> can use to create{' '}
            <strong className="text-pink-800 font-bold">
              courses with Next.js
            </strong>
            .
          </p>
        </div>
        <div className="text-center mt-8">
          <a href="/course" className="btn btn-primary btn-big">
            Go to the course
          </a>
        </div>

        <div data-aos="fade" className="flex flex-col self-stretch">
          <p className="text-center text-4xl mt-32 font-bold">
            It‘s open source!
          </p>

          <p className="text-center text-2xl mt-6 text-gray-500 leading-8">
            I created this template for my{' '}
            <a href="https://useeffect.dev" className="text-pink-800">
              course on React hooks
            </a>
            .
          </p>
          <p className="text-center text-2xl mt-3 text-gray-500 leading-8">
            You’ll find on the GitHub repository the information you’ll
            <br className="hidden sm:inline" />
            need if you want to use it, or if you are just curious 😉
          </p>

          <div className="text-center mt-8">
            <a
              href="https://github.com/scastiel/nextjs-course-template"
              className="btn btn-primary btn-big"
            >
              Go to the GitHub repo
            </a>
          </div>
        </div>

        <div className="flex flex-col self-stretch">
          <p className="text-center text-4xl mt-32 font-bold">
            You can embed a{' '}
            <strong className="text-pink-800 font-bold">preview</strong> on the
            home page 😱
          </p>

          <BrowserMockup title="example.com">
            <Lesson lesson={lesson} />
            <div className="my-8 flex flex-col space-y-2 items-center">
              <span>Liked this lesson?</span>
              <a className="btn btn-primary" href="/course">
                Continue learning
              </a>
            </div>
          </BrowserMockup>
        </div>
      </div>
    </Layout>
  )
}

export async function getStaticProps() {
  return {
    props: { lesson: await getLessonContent('01.01-first-sublesson') },
  }
}

export default Home
