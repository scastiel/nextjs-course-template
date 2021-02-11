import { BrowserMockup } from '../components/browser-mockup'
import Layout from '../components/layout'
import { Lesson } from '../components/lesson'
import { getLessonContent } from '../lib/lessons'

const Home = ({ lesson }) => {
  return (
    <Layout widthClass="max-w-4xl">
      <div className="flex flex-col items-center mb-16">
        <div
          id="preview"
          data-aos="fade"
          className="flex flex-col self-stretch"
        >
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
