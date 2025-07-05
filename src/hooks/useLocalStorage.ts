import { useCallback } from 'react';
import { clearLocalStorage, exportLocalStorageData, importLocalStorageData } from '../store/localStorageMiddleware';

export const useLocalStorage = () => {
  const exportData = useCallback(() => {
    exportLocalStorageData();
  }, []);

  const importData = useCallback((file: File): Promise<void> => {
    return importLocalStorageData(file);
  }, []);

  const clearData = useCallback(() => {
    clearLocalStorage();
  }, []);

  const getStorageSize = useCallback(() => {
    try {
      const data = localStorage.getItem('medical-dashboard-state');
      if (data) {
        return new Blob([data]).size;
      }
      return 0;
    } catch (error) {
      console.error('Error calculating storage size:', error);
      return 0;
    }
  }, []);

  const getStorageInfo = useCallback(() => {
    try {
      const data = localStorage.getItem('medical-dashboard-state');
      if (data) {
        const parsed = JSON.parse(data);
        const size = new Blob([data]).size;
        const sizeInKB = (size / 1024).toFixed(2);
        
        return {
          hasData: true,
          size: sizeInKB,
          sizeInBytes: size,
          lastModified: new Date().toLocaleString(),
          dataKeys: Object.keys(parsed),
        };
      }
      return {
        hasData: false,
        size: '0',
        sizeInBytes: 0,
        lastModified: null,
        dataKeys: [],
      };
    } catch (error) {
      console.error('Error getting storage info:', error);
      return {
        hasData: false,
        size: '0',
        sizeInBytes: 0,
        lastModified: null,
        dataKeys: [],
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }, []);

  return {
    exportData,
    importData,
    clearData,
    getStorageSize,
    getStorageInfo,
  };
}; 