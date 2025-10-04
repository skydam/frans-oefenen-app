import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('App error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-red-50 flex items-center justify-center p-8">
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-md">
            <h1 className="text-2xl font-bold text-red-600 mb-4">
              Er is iets misgegaan
            </h1>
            <p className="text-gray-700 mb-4">
              De app is vastgelopen. Probeer de pagina te vernieuwen.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition-colors"
            >
              Vernieuwen
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
