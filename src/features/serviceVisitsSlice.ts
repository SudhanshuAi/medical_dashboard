import { createSlice, nanoid } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { ServiceVisit, NewServiceVisit } from '../components/ServiceVisitForm';

interface ServiceVisitsState {
    visits: ServiceVisit[];
}

const initialState: ServiceVisitsState = {
    visits: [],
};

const serviceVisitsSlice = createSlice({
    name: 'serviceVisits',
    initialState,
    reducers: {
        addServiceVisit: {
            reducer: (state, action: PayloadAction<ServiceVisit>) => {
                state.visits.push(action.payload);
            },
            prepare: (visit: NewServiceVisit) => {
                const id = nanoid();
                return { payload: { id, ...visit } };
            },
        },
        updateServiceVisit: (state, action: PayloadAction<ServiceVisit>) => {
            const index = state.visits.findIndex(v => v.id === action.payload.id);
            if (index !== -1) {
                state.visits[index] = action.payload;
            }
        },
        deleteServiceVisit: (state, action: PayloadAction<string>) => {
            state.visits = state.visits.filter(v => v.id !== action.payload);
        },
    },
});

export const { addServiceVisit, updateServiceVisit, deleteServiceVisit } = serviceVisitsSlice.actions;
export default serviceVisitsSlice.reducer;
