import { Component, type ReactNode } from 'react';

interface Props { children: ReactNode; fallback?: ReactNode; }
interface State { hasError: boolean; error?: Error; }

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }
  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="bg-bg-secondary border border-danger/30 rounded-card p-8 text-center m-4">
          <div className="text-danger text-3xl mb-2">!</div>
          <h3 className="text-txt-primary font-heading mb-2">Something went wrong</h3>
          <p className="text-txt-secondary text-sm mb-4">This module encountered an error</p>
          <button onClick={() => this.setState({ hasError: false })}
            className="px-4 py-2 bg-accent text-bg-primary rounded-button font-medium hover:bg-accent-hover transition-colors">
            Try Again
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
