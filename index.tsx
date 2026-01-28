import React, { ErrorInfo, ReactNode, Component } from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import App from './App';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

interface ErrorBoundaryProps {
  children?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

// Fix: Gebruik Component van react en declareer state expliciet om TypeScript errors met props en state te voorkomen
class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  // Fix: Expliciete declaratie van state voorkomt "Property 'state' does not exist" fouten in TS
  state: ErrorBoundaryState = { hasError: false, error: null };

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  render() {
    // Fix: 'this.state' is nu correct herkend door de property declaratie hierboven
    if (this.state.hasError) {
      return (
        <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#fef2f2', padding: '20px', fontFamily: 'sans-serif' }}>
          <div style={{ maxWidth: '400px', width: '100%', backgroundColor: 'white', borderRadius: '12px', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)', padding: '24px', border: '1px solid #fee2e2' }}>
            <h1 style={{ fontSize: '20px', fontWeight: 'bold', color: '#dc2626', marginBottom: '8px' }}>Oeps! Er ging iets mis</h1>
            <p style={{ color: '#4b5563', marginBottom: '16px' }}>De website kon niet correct worden geladen.</p>
            <pre style={{ backgroundColor: '#f9fafb', padding: '12px', borderRadius: '6px', fontSize: '12px', color: '#6b7280', overflow: 'auto' }}>
              {this.state.error?.message}
            </pre>
            <button 
              onClick={() => window.location.reload()}
              style={{ marginTop: '16px', width: '100%', backgroundColor: '#dc2626', color: 'white', padding: '10px', borderRadius: '8px', border: 'none', fontWeight: 'bold', cursor: 'pointer' }}
            >
              Pagina verversen
            </button>
          </div>
        </div>
      );
    }

    // Fix: 'this.props' is nu correct overgenomen van de Component base class met de juiste generics
    return this.props.children;
  }
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <ErrorBoundary>
      <HashRouter>
        <App />
      </HashRouter>
    </ErrorBoundary>
  </React.StrictMode>
);