import React from 'react';

type TestProps = {
    children: React.ReactNode;
};

export default function Test({ children }: TestProps) {
    return (
        <div>
            {children}
        </div>
    );
}
