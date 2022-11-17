import React from 'react';
import ErrorPage from '../ErrorPage';

export interface ErrorBoundaryState {
    hasError?: boolean;
}

export default class ErrorBoundary extends React.Component<{}, ErrorBoundaryState> {
    static getDerivedStateFromError() {
        return {hasError: true};
    }

    constructor(props: {}) {
        super(props);
        this.state = {hasError: false};
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        // eslint-disable-next-line no-console
        console.error(error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return <ErrorPage code={500} />;
        }

        return this.props.children;
    }
}
