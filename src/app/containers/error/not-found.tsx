import * as React from 'react';
import { Component, ReactNode } from 'react';

class NotFound extends Component {
    public render(): ReactNode {
        return (
            <div className="error error-not-found">
                <h1>Not found</h1>
            </div>
        );
    }
}

export { NotFound };
