import remark from 'remark'
import html from 'remark-html'

export const markdownToHtml = async (markdown) => {
  const result = await remark().use(html).process(markdown)
  return result.toString()
}

export const markdownTitleToHtml = async (title) => {
  return (await markdownToHtml(title)).replace(/<\/?p>/g, '')
}
