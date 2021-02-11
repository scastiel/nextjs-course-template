# Next.js course template

This repository contains the source code for a Next.js app you can use to
publish an interactive course with React.

[Click here to see a demo!](https://nextjs-course-template.vercel.app)

This template was created to be used on
[my course on React hooks at useEffect.dev](https://useeffect.dev).

## Features

- Write lessons using [MDX](https://mdxjs.com/).
- Create sublessons to organize your course content.
- Embed source code in several languages.
- Embed interactive and editable React examples.
- Use the template as a base, customize it for your needs!

## This template uses:

- [Next.js](https://nextjs.org/), using static site generation by default.
- [next-mdx-remote](https://github.com/hashicorp/next-mdx-remote) and
  [remark](https://remark.js.org/) to parse Markdown.
- [Prism](https://prismjs.com/) to highlight the source code examples, with the
  [Dracula theme](https://draculatheme.com/).
- [React Live](https://react-live.netlify.app/) to embed interactive and
  editable examples.
- [TailwindCSS](https://tailwindcss.com/) for styling.

## Usage

1. Clone or fork this repository
2. Install dependencies: `yarn`
3. Run the app: `yarn dev`
4. Open http://localhost:3000 and enjoy 😉

The lessons are located in `lessons` directory.

Because of the current implementation (that you are free to improve), here are
the rules the lessons must follow:

- The files must named with `.mdx` extension.
- The header (between `---`) must include a `title` and a type (`foreword`,
  `lesson`, `sublesson`, or `appendix`).
- For sublessons, the `parent` attribute in the header must refer to a valid
  lesson, and please don’t create loops 😉
- The lessons filenames should be all lowercase.
- The lessons filenames give the order the lessons will be displayed, so I
  recommend prefixing them with an index number or letter.

## Any remark/suggestion/issue?

Please submit an issue (or better, a pull request) if you want to report a
problem or suggest an improvement.

But also know that this template is offered free of charge, and I can’t
guarantee to fix all problems 🙂.
