// src/components/CodeEditor.jsx
import React, { useEffect, useState } from 'react';
import AceEditor from 'react-ace';
import './CodeEditer.css';


// Import languages
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/mode-html';
import 'ace-builds/src-noconflict/mode-css';
import 'ace-builds/src-noconflict/mode-typescript';

// Import themes
import 'ace-builds/src-noconflict/theme-monokai';
import 'ace-builds/src-noconflict/theme-github';

const CodeEditor = ({ language = 'javascript', value = '', onChange }) => {
    const [code, setCode] = useState('');

    useEffect(() => {
        setCode(value); 
    }, [value]);

    const handleCodeChange = (value) => {
        setCode(value);
        onChange && onChange(value);
    };
const getAceMode = (lang) => {
  switch (lang.toLowerCase()) {
    case 'react':
    case 'javascript':
      return 'javascript';
    case 'typescript':
    case 'angular':
      return 'typescript';
    case 'html':
      return 'html';
    case 'css':
      return 'css';
    default:
      return 'javascript'; // fallback
  }
};

    return (
        <div className="code-editer">
            <div className="editor-header">
                <div className="window-controls">
                    <span className="control close"></span>
                    <span className="control minimize"></span>
                    <span className="control maximize"></span>
                </div>
            </div>

            <div className="editor-body" >


                <AceEditor
                    mode={getAceMode(language)}
                    theme="monokai"
                    name="devui_code_editor"
                    value={code}
                    onChange={handleCodeChange}
                    fontSize={14}
                   
                    showPrintMargin={true}
                    showGutter={true}
                    highlightActiveLine={true}
                    setOptions={{
                        enableBasicAutocompletion: true,
                        enableLiveAutocompletion: true,
                        showLineNumbers: true,
                        tabSize: 2,
                    }}
                    
                />
            </div>

        </div>





    );
};

export default CodeEditor;
