import { configureStore } from '@reduxjs/toolkit';
import inventoryReducer from '../features/inventory/inventorySlice';
import installationsReducer from '../features/installationsSlice';
import trainingReducer from '../features/trainingSlice';
import serviceVisitsReducer from '../features/serviceVisitsSlice';
import photoLogsReducer from '../features/photoLogsSlice';
import alertsReducer from '../features/alertsSlice';
import { localStorageMiddleware, loadStateFromStorage } from './localStorageMiddleware';

// Load initial state from localStorage
const preloadedState = loadStateFromStorage();

export const store = configureStore({
  reducer: {
    inventory: inventoryReducer,
    installations: installationsReducer,
    training: trainingReducer,
    serviceVisits: serviceVisitsReducer,
    photoLogs: photoLogsReducer,
    alerts: alertsReducer,
  },
  preloadedState,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(localStorageMiddleware),
});

// Type helpers
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
