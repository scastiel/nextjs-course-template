export const BrowserMockup = ({ title, children }) => {
  return (
    <>
      <style jsx>{`
        .title {
          position: relative;
        }
        .title::before {
          display: block;
          position: absolute;
          content: '';
          top: 1.2rem;
          left: 1em;
          width: 0.5em;
          height: 0.5em;
          border-radius: 50%;
          background-color: #f44;
          box-shadow: 0 0 0 2px #f44, 1.5em 0 0 2px #9b3, 3em 0 0 2px #fb5;
        }
      `}</style>
      <div
        className="mt-16 border border-gray-200 shadow-xl rounded-lg bg-gray-100 overflow-hidden"
        style={{ maxWidth: 'calc(100vw - 1rem)' }}
      >
        <div className="px-24 sm:px-32 lg:px-48 title border-b border-b-gray-200 p-2 text-sm">
          <div className="bg-gray-200 p-1 text-gray-500 text-center rounded">
            {title}
          </div>
        </div>
        <div
          className="overflow-y-scroll p-2 lg:p-6 bg-white"
          style={{ maxHeight: '32rem' }}
        >
          {children}
        </div>
      </div>
    </>
  )
}
