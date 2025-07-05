import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface Device {
  id: string;
  type: string;
  facility: string;
  status: 'Online' | 'Offline' | 'Maintenance';
  battery: number;
  lastServiceDate: string;
  contract?: 'AMC' | 'CMC';
  amcStatus: 'Active' | 'Inactive' | 'Expired';
  amcStartDate?: string;
  amcEndDate?: string;
}

interface InventoryState {
  devices: Device[];
}

const initialState: InventoryState = {
  devices: [],
};

const inventorySlice = createSlice({
  name: 'inventory',
  initialState,
  reducers: {
    setDevices(state, action: PayloadAction<Device[]>) {
      state.devices = action.payload;
    },
    addDevice(state, action: PayloadAction<Device>) {
      state.devices.push(action.payload);
    },
    updateDevice(state, action: PayloadAction<Device>) {
      const index = state.devices.findIndex((d) => d.id === action.payload.id);
      if (index !== -1) {
        state.devices[index] = action.payload;
      }
    },
    deleteDevice(state, action: PayloadAction<string>) {
      state.devices = state.devices.filter((d) => d.id !== action.payload);
    },
  },
});

export const { setDevices, addDevice, updateDevice, deleteDevice } = inventorySlice.actions;
export default inventorySlice.reducer;
