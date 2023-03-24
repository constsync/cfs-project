import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { InventoryItemModel } from "../../interfaces";

interface InventoryState {
    items: InventoryItemModel[];
}

const initialState: InventoryState = {
    items: []
};

const inventoryItemsSlice = createSlice({
    name: 'inventory',
    initialState,
    reducers: {
        addInventoryItem(state: InventoryState, action: PayloadAction<InventoryItemModel>) {
            console.log('addItem:', action.payload);
            const itemName = action.payload.name.toLowerCase();
            console.log('itemName:', itemName);

            // Check to see if the payload is a duplicate - if it's not add payload to items array
            if (!state.items.map(p => p.name).includes(itemName)) {
                state.items.push(action.payload);
                //state.items = [...state.items, action.payload]
            } else {
                console.log('Failed to push item to store because it already exists');
            }
        },
        removeInventoryItem(state: InventoryState, action: PayloadAction<{id: string}>) {
            console.log(`removeItem with id:${action.payload.id}`);
            state.items = state.items.filter(item => item.id !== action.payload.id);
        },
        editInventoryItem(state: InventoryState, action: PayloadAction<{id: string, quantity: string}>) {
            console.log('stateItems:', state.items)
            console.log('Incoming quantity update:', action.payload.quantity);
            console.log('Incoming id to update:', action.payload.id);

            // Find index where id matches the id passed in from payload - edit quantity prop of object at that index
            const targetIndex = state.items.findIndex(item => item.id === action.payload.id);
            console.log('targetIndex:', targetIndex);

            state.items[targetIndex].quantity = Number(action.payload.quantity);
        },
        mergeUpdatedItem(state: InventoryState, action: PayloadAction<InventoryItemModel>) {
            const incomingItem = action.payload
            console.log('incomingItem:', incomingItem);
            console.log('baseItems:', state.items);

            const targetIndex = state.items.findIndex(item => item.id === action.payload.id);
            console.log('merge target:', targetIndex);
            state.items.splice(targetIndex, 1);
            state.items = [...state.items, action.payload];
        }
    }
});

export const {addInventoryItem, removeInventoryItem, editInventoryItem, mergeUpdatedItem} = inventoryItemsSlice.actions;

export default inventoryItemsSlice.reducer;
