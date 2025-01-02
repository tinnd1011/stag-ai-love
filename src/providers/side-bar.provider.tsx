'use client'

import { menus } from "@/utils/menu";
import { createContext, useState } from "react";

interface SidebarContextType {
    activeTab: string;
    setActiveTab: (tab: string) => void;
}

export const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export function SidebarProvider({ children }: { children: React.ReactNode }) {
    const [activeTab, setActiveTab] = useState(menus[1].hash);

    return (
        <SidebarContext.Provider value={{ activeTab, setActiveTab }}>
            {children}
        </SidebarContext.Provider>
    );
}