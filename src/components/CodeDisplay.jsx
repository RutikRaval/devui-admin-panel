// src/components/CodeDisplay.jsx
import React, { useState, useEffect } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { materialDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { FiCopy, FiCheck } from 'react-icons/fi';
import './CodeDisplay.css';

const CodeDisplay = ({ componentName }) => {
    const [activeTab, setActiveTab] = useState('react');
    const [copied, setCopied] = useState(false);
    const [codeSnippets, setCodeSnippets] = useState({
        react: '',
        angular: '',
        html: '',
        css: ''
    });
    const [loading, setLoading] = useState(true);

    // Simulate fetching code snippets from an API
    useEffect(() => {
        setLoading(true);

        // In a real app, this would be an API call
        setTimeout(() => {
            // Sample code snippets for demonstration
            const snippets = {
                react: `import React from 'react';
import { Button } from '@devui/components';

const ${componentName}Example = () => {
  return (
    <div className="${componentName.toLowerCase()}-container">
      <Button variant="primary">Click Me</Button>
    </div>
  );
};

export default ${componentName}Example;`,

                angular: `import { Component } from '@angular/core';
import { ButtonModule } from '@devui/angular';

@Component({
  selector: 'app-${componentName.toLowerCase()}',
  standalone: true,
  imports: [ButtonModule],
  template: \`
    <div class="${componentName.toLowerCase()}-container">
      <d-button variant="primary">Click Me</d-button>
    </div>
  \`,
  styles: [\`
    .${componentName.toLowerCase()}-container {
      padding: 1rem;
    }
  \`]
})
export class ${componentName}Example {}`,

                html: `<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" href="/devui.css">
</head>
<body>
  <div class="${componentName.toLowerCase()}-container">
    <button class="d-btn d-btn-primary">Click Me</button>
  </div>
  
  <script src="/devui.js"></script>
</body>
</html>`,

                css: `.${componentName.toLowerCase()}-container {
  padding: 1rem;
  background-color: #f5f5f5;
  border-radius: 8px;
}`
            };

            setCodeSnippets(snippets);
            setLoading(false);
        }, 800);
    }, [componentName]);

    const handleCopy = () => {
        navigator.clipboard.writeText(codeSnippets[activeTab]);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const getLanguage = () => {
        switch (activeTab) {
            case 'react': return 'jsx';
            case 'angular': return 'typescript';
            case 'html': return 'html';
            case 'css': return 'css';
            default: return 'jsx';
        }
    };

    const getFilename = () => {
        switch (activeTab) {
            case 'react': return `${componentName}Example.jsx`;
            case 'angular': return `${componentName}Example.component.ts`;
            case 'html': return 'index.html';
            case 'css': return 'styles.css';
            default: return 'example.jsx';
        }
    };

    return (
        <div className="code-display">
            <div className="editor-header">
                <div className="window-controls">
                    <span className="control close"></span>
                    <span className="control minimize"></span>
                    <span className="control maximize"></span>
                </div>
                <div className="file-tabs">
                    <button
                        className={`tab ${activeTab === 'react' ? 'active' : ''}`}
                        onClick={() => setActiveTab('react')}
                    >
                        React
                    </button>
                    <button
                        className={`tab ${activeTab === 'angular' ? 'active' : ''}`}
                        onClick={() => setActiveTab('angular')}
                    >
                        Angular
                    </button>
                    <button
                        className={`tab ${activeTab === 'html' ? 'active' : ''}`}
                        onClick={() => setActiveTab('html')}
                    >
                        HTML
                    </button>
                    <button
                        className={`tab ${activeTab === 'css' ? 'active' : ''}`}
                        onClick={() => setActiveTab('css')}
                    >
                        CSS
                    </button>
                </div>
                <div className="file-info">{getFilename()}</div>
            </div>

            <div className="editor-body">
                {loading ? (
                    <div className="loading-indicator">
                        <div className="spinner"></div>
                        Loading code...
                    </div>
                ) : (
                    <div className="code-container">
                        <button className="copy-button" onClick={handleCopy}>
                            {copied ? <><FiCheck /> Copied!</> : <><FiCopy /> Copy</>}
                        </button>

                        <SyntaxHighlighter
                            language={getLanguage()}
                            style={vscDarkPlus}
                            // style={materialDark}
                            showLineNumbers
                            customStyle={{
                                margin: 0,
                                padding: '1rem',
                                background: 'none',
                                fontSize: '14px',
                                borderRadius: 0
                            }}
                        >
                            {codeSnippets[activeTab]} 
                        </SyntaxHighlighter>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CodeDisplay;