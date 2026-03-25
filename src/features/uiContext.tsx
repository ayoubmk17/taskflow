import React, { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

type UIType = 'MUI' | 'Bootstrap';

interface UIContextType {
    uiType: UIType;
    toggleUI: () => void;
}

const UIContext = createContext<UIContextType | undefined>(undefined);

export const UIProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [uiType, setUiType] = useState<UIType>('MUI');

    const toggleUI = () => {
        setUiType((prev) => (prev === 'MUI' ? 'Bootstrap' : 'MUI'));
    };

    return (
        <UIContext.Provider value={{ uiType, toggleUI }}>
            {children}
        </UIContext.Provider>
    );
};

export const useUI = () => {
    const context = useContext(UIContext);
    if (!context) {
        throw new Error('useUI must be used within a UIProvider');
    }
    return context;
};
