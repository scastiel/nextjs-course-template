import {
  useState,
  useEffect,
  useCallback,
  useMemo,
  useDebugValue,
  useContext,
  useReducer,
  useRef,
  createContext,
} from 'react'
import Highlight, { defaultProps } from 'prism-react-renderer'
import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live'
import theme from 'prism-react-renderer/themes/dracula'

export const CodeBlock = ({ className, metastring, children }) => {
  const [, language] = (className || '').match(/language-(.*)/) || []

  if (metastring === 'live') {
    return (
      <LiveProvider
        code={children.trim()}
        scope={{
          useState,
          useEffect,
          useCallback,
          useMemo,
          useDebugValue,
          useContext,
          useReducer,
          useRef,
          createContext,
        }}
        theme={theme}
        noInline
      >
        <div className="p-2" style={{ backgroundColor: '#282a36' }}>
          <LiveEditor
            style={{
              fontSize: '0.875em',
              fontFamily:
                'font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
              whiteSpace: 'nowrap',
              overflowX: 'auto',
            }}
          />
          <div
            className="text-xs px-2"
            style={{ borderLeft: '4px solid #ff5555' }}
          >
            <LiveError />
          </div>
          <div className="p-2">
            <div className="rounded-lg" style={{ borderColor: '#6272a4' }}>
              <div
                className="rounded-t-lg text-xs px-2 py-1"
                style={{ backgroundColor: '#6272a4' }}
              >
                Result
              </div>
              <div className="p-2 live-result">
                <LivePreview />
              </div>
            </div>
          </div>
        </div>
      </LiveProvider>
    )
  }

  return (
    <Highlight
      {...defaultProps}
      code={children.trim()}
      language={language || ''}
      theme={theme}
    >
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre className={className} style={{ ...style, padding: '20px' }}>
          {tokens.map((line, i) => (
            <div key={i} {...getLineProps({ line, key: i })}>
              {line.map((token, key) => (
                <span key={key} {...getTokenProps({ token, key })} />
              ))}
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  )
}
