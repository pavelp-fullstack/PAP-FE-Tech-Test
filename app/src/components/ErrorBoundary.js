import React from "react";
import ErrorInfo from "./ErrorInfo";

export default class ErrorBoundary extends React.Component {
    state = {
        hasError: false,
        error: { message: "", stack: "" },
        info: { componentStack: "" },
    };

    static getDerivedStateFromError = (error) => {
        return { hasError: true };
    };

    componentDidCatch = (error, info) => {
        this.setState({ error, info });
    };

    render() {
        const { hasError, error } = this.state;
        const { children } = this.props;

        return hasError ? <ErrorInfo error={error}/> : children;
    }
}
