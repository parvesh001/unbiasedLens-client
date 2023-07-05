import React, { Component } from "react";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  static getDerivedStateFromError(error) {
    // Update state to indicate an error has occurred
    console.log('error occured')
    return { hasError: true, error: error.message };
  }

  render() {
    if (this.state.hasError) {
      // Render an error message or fallback UI
      return <h6 className="text-center mt-2">Something went wrong! Please try again.</h6>;
    }

    // Render the children components
    return this.props.children;
  }
}

export default ErrorBoundary;
