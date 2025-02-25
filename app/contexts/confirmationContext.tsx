import React, { createContext, useState, useContext } from 'react';
import type { ReactNode } from 'react';

interface ConfirmationContextProps {
    confirmation: boolean;
    setConfirmation: (value: boolean) => void;
}

const ConfirmationContext = createContext<ConfirmationContextProps | undefined>(undefined);

export const ConfirmationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [confirmation, setConfirmation] = useState<boolean>(false);

    return (
        <ConfirmationContext.Provider value={{ confirmation, setConfirmation }}>
            {children}
        </ConfirmationContext.Provider>
    );
};

export const useConfirmation = (): ConfirmationContextProps => {
    const context = useContext(ConfirmationContext);
    if (!context) {
        throw new Error('useConfirmation must be used within a ConfirmationProvider');
    }
    return context;
};