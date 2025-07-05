import { createSlice, nanoid } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Installation } from '../components/InstallationForm';

// This is a simplified version for the slice. The full Installation interface is in the form component.
// This is the type of data coming from the form, before an ID is assigned.
export type NewInstallation = Omit<Installation, 'id' | 'unboxingPhotoUrl'> & { unboxingPhoto: File | null };

interface InstallationsState {
    installations: Installation[];
}

const initialState: InstallationsState = {
    installations: [],
};

const installationsSlice = createSlice({
    name: 'installations',
    initialState,
    reducers: {
        addInstallation: {
            reducer: (state, action: PayloadAction<Installation>) => {
                state.installations.push(action.payload);
            },
            prepare: (installation: NewInstallation) => {
                const id = nanoid();
                // Use the base64 string from the form for unboxingPhotoUrl
                const unboxingPhotoUrl = (installation as any).unboxingPhotoUrl || '';
                const { unboxingPhoto, ...rest } = installation;
                return { payload: { id, ...rest, unboxingPhotoUrl } };
            },
        },
        updateInstallation: (state, action: PayloadAction<Installation>) => {
            const index = state.installations.findIndex(inst => inst.id === action.payload.id);
            if (index !== -1) {
                state.installations[index] = action.payload;
            }
        },
        deleteInstallation: (state, action: PayloadAction<string>) => {
            state.installations = state.installations.filter(inst => inst.id !== action.payload);
        },
    },
});

export const { addInstallation, updateInstallation, deleteInstallation } = installationsSlice.actions;
export default installationsSlice.reducer;
