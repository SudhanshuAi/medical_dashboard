import { createSlice, nanoid } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { TrainingLog, NewTrainingLog } from '../components/TrainingForm';

interface TrainingState {
    logs: TrainingLog[];
}

const initialState: TrainingState = {
    logs: [],
};

const trainingSlice = createSlice({
    name: 'training',
    initialState,
    reducers: {
        addTrainingLog: {
            reducer: (state, action: PayloadAction<TrainingLog>) => {
                state.logs.push(action.payload);
            },
            prepare: (log: Omit<NewTrainingLog, 'installationId'>, installationId: string) => {
                const id = nanoid();
                return { payload: { id, installationId, ...log } };
            },
        },
    },
});

export const { addTrainingLog } = trainingSlice.actions;
export default trainingSlice.reducer;
