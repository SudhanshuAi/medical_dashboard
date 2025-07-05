import type { Middleware } from '@reduxjs/toolkit';

// Middleware to save state to localStorage
export const localStorageMiddleware: Middleware = store => next => action => {
  const result = next(action);
  
  // Save the entire state to localStorage
  const state = store.getState();
  localStorage.setItem('medical-dashboard-state', JSON.stringify(state));
  
  return result;
};

// Function to load state from localStorage
export const loadStateFromStorage = () => {
  try {
    const serializedState = localStorage.getItem('medical-dashboard-state');
    if (serializedState === null) {
      return undefined;
    }
    const state = JSON.parse(serializedState) || {};
    return {
      inventory: state.inventory || { devices: [] },
      installations: state.installations || { installations: [] },
      training: state.training || { logs: [] },
      serviceVisits: state.serviceVisits || { visits: [] },
      photoLogs: state.photoLogs || { logs: [] },
      alerts: state.alerts || { alerts: [] },
    };
  } catch (err) {
    console.warn('Failed to load state from localStorage:', err);
    return undefined;
  }
};

// Function to clear all data from localStorage
export const clearLocalStorage = () => {
  localStorage.removeItem('medical-dashboard-state');
};

// Function to export data from localStorage
export const exportLocalStorageData = () => {
  try {
    const data = localStorage.getItem('medical-dashboard-state');
    if (data) {
      const blob = new Blob([data], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `medical-dashboard-backup-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  } catch (err) {
    console.error('Failed to export data:', err);
  }
};

// Function to import data to localStorage
export const importLocalStorageData = (file: File): Promise<void> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target?.result as string);
        localStorage.setItem('medical-dashboard-state', JSON.stringify(data));
        resolve();
      } catch (err) {
        reject(new Error('Invalid JSON file'));
      }
    };
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsText(file);
  });
}; 