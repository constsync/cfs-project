import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import { InventoryItemModel } from '../../interfaces';

interface GroceryListState {
    items: InventoryItemModel[];
}

const initialState: GroceryListState = {
    items: []
};

const groceryListSlice = createSlice({
    name: 'groceries',
    initialState,
    reducers: {
        addGroceryItem(state: GroceryListState, action: PayloadAction<InventoryItemModel>) {
            console.log('addGroceryItem:', action.payload);
            if (!state.items.map(item => item.id).includes(action.payload.id)) {
                console.log('adding new grocery item');
                state.items.push(action.payload);
            }
        },
        removeGroceryItem(state: GroceryListState, action: PayloadAction<{id: string}>) {
            state.items = state.items.filter(item => item.id !== action.payload.id);
        }, 
        updateGroceryItemQuantity(state: GroceryListState, action: PayloadAction<{id: string, quantity: string}>) {
            console.log('Incoming quantity update:', action.payload.quantity);
            console.log('Incoming id to update:', action.payload.id);

            const targetIndex = state.items.findIndex(item => item.id === action.payload.id);

            state.items[targetIndex].quantity = Number(action.payload.quantity);
        },
        clearGroceryListItems(state: GroceryListState, action: PayloadAction) {
            state.items = []
        }
    }
})

export const {addGroceryItem, updateGroceryItemQuantity, removeGroceryItem, clearGroceryListItems} = groceryListSlice.actions;

export default groceryListSlice.reducer;
