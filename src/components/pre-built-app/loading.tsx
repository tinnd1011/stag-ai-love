import React from 'react';

interface AppLoadingStateProps {
  title: string;
}

export const AppLoadingState: React.FC<AppLoadingStateProps> = ({ title }) => (
  <div className="flex items-center justify-center h-full">
    <div className="flex flex-col items-center gap-2">
      <div className="w-6 h-6 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin" />
      <p className="text-sm text-gray-600">Loading {title}...</p>
    </div>
  </div>
);