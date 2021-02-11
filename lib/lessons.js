import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { markdownTitleToHtml } from './markdown'
import renderToString from 'next-mdx-remote/render-to-string'
import { CodeBlock } from '../components/code-block'
import { Note } from '../components/note'

const lessonsDirectory = path.resolve('lessons')

export async function getLessonContent(slug) {
  const allLessons = await getLessons()

  const lesson = allLessons.find((l) => l.slug === slug)
  const lessonWithContent = {
    ...lesson,
    title: await markdownTitleToHtml(lesson.title),
  }

  const fullPath = path.join(lessonsDirectory, `${slug.toLowerCase()}.mdx`)
  if (!fs.existsSync(fullPath)) throw new Error(`Unknown lesson ${slug}`)
  lessonWithContent.content = await renderToString(
    matter(fs.readFileSync(fullPath, 'utf8')).content,
    { components: { code: CodeBlock, aside: Note } }
  )

  if (lesson.parentSlug) {
    const parent = allLessons.find((l) => l.slug === lesson.parentSlug)
    if (!parent) throw new Error(`Unknown parent lesson ${lesson.parentSlug}`)
    lessonWithContent.parent = {
      title: await markdownTitleToHtml(parent.title),
      slug: parent.slug,
      number: parent.number || null,
    }
  }

  if (lesson.nextSlug) {
    const next = allLessons.find((l) => l.slug === lesson.nextSlug)
    if (!next) throw new Error(`Unknown next lesson ${lesson.nextSlug}`)
    lessonWithContent.next = {
      title: await markdownTitleToHtml(next.title),
      slug: next.slug,
      number: next.number || null,
    }
  }

  if (lesson.previousSlug) {
    const previous = allLessons.find((l) => l.slug === lesson.previousSlug)
    if (!previous)
      throw new Error(`Unknown previous lesson ${lesson.previousSlug}`)
    lessonWithContent.previous = {
      title: await markdownTitleToHtml(previous.title),
      slug: previous.slug,
      number: previous.number || null,
    }
  }

  return lessonWithContent
}

export async function getLessons() {
  const slugs = fs
    .readdirSync(lessonsDirectory)
    .map((f) => f.replace(/\.mdx?$/, ''))

  const lessons = slugs.map((slug) => {
    const fullPath = path.join(lessonsDirectory, `${slug.toLowerCase()}.mdx`)
    if (!fs.existsSync(fullPath)) {
      throw new Error(`Unknown lesson ${slug}`)
    }
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data } = matter(fileContents)
    return { ...data, slug }
  })

  let previous
  for (const lesson of lessons) {
    if (previous) {
      lesson.previousSlug = previous.slug
      previous.nextSlug = lesson.slug
    }
    previous = lesson
  }

  return lessons
}
