import { createSlice, nanoid } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { PhotoLog, NewPhotoLog } from '../components/PhotoUploadForm';

interface PhotoLogsState {
    logs: PhotoLog[];
}

const initialState: PhotoLogsState = {
    logs: [],
};

const photoLogsSlice = createSlice({
    name: 'photoLogs',
    initialState,
    reducers: {
        addPhotoLog: {
            reducer: (state, action: PayloadAction<PhotoLog>) => {
                state.logs.push(action.payload);
            },
            prepare: (log: NewPhotoLog) => {
                const id = nanoid();
                const uploadDate = new Date().toISOString();
                // Simulate file upload by creating a blob URL
                const imageUrl = URL.createObjectURL(log.image);
                return { payload: { ...log, id, uploadDate, imageUrl } };
            },
        },
        updatePhotoLog: (state, action: PayloadAction<{ id: string; caption: string }>) => {
            const log = state.logs.find(l => l.id === action.payload.id);
            if (log) {
                log.caption = action.payload.caption;
            }
        },
        deletePhotoLog: (state, action: PayloadAction<string>) => {
            const logToDelete = state.logs.find(l => l.id === action.payload);
            if (logToDelete) {
                URL.revokeObjectURL(logToDelete.imageUrl);
            }
            state.logs = state.logs.filter(l => l.id !== action.payload);
        },
    },
});

export const { addPhotoLog, updatePhotoLog, deletePhotoLog } = photoLogsSlice.actions;
export default photoLogsSlice.reducer;
