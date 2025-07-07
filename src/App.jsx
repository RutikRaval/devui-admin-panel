// src/App.js
import React from 'react';
import CodeDisplay from './components/CodeDisplay';
import './App.css';

function App() {
  return (
    <div className="app">
      <header>
        <h1>DevUI Component Library</h1>
        <p>Beautiful, accessible components for your web applications</p>
      </header>
      
      <main>
        <section className="component-section">
          <h2>Button Component</h2>
          <div className="component-preview">
            <button className="d-btn d-btn-primary"> Button</button>
          </div>
          
          <div className="code-section">
            <h3>Implementation Code</h3>
            <CodeDisplay componentName="Button" />
          </div>
        </section>
        
        <section className="component-section">
          <h2>Card Component</h2>
          <div className="component-preview">
            <div className="d-card">
              <h3>Preview Card</h3>
              <p>This is a sample card component</p>
            </div>
          </div>
          
          <div className="code-section">
            <h3>Implementation Code</h3>
            <CodeDisplay componentName="Card" />
          </div>
        </section>
      </main>
      
      <footer>
        <p>DevUI • Open-source UI Component Library</p>
      </footer>
    </div>
  );
}

export default App;