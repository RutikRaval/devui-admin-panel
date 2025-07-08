// CodeBlock.jsx
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism'

const CodeBlock = ({ language = 'javascript', code = '' }) => {
    return (
        <div style={{ marginBottom: '1rem' }}>
            <strong style={{ display: 'block', marginBottom: '0.5rem' }}>
                {language.toUpperCase()}
            </strong>
            <SyntaxHighlighter
                language={language}
                style={oneDark}
                showLineNumbers
                wrapLines
                wrapLongLines
                customStyle={{
                    borderRadius: '8px',
                    padding: '1rem',
                    fontSize: '0.9rem',
                    whiteSpace: 'pre-wrap',
                    wordBreak: 'break-all',     // ✅ forces long unbroken strings to wrap
                    // overflowX: 'auto',
                    // display:'block',
                    maxHeight: '250px',
                }}
            >
                {code}
            </SyntaxHighlighter>

        </div>
    )
}

export default CodeBlock
