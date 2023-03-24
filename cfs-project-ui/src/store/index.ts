import { configureStore } from '@reduxjs/toolkit';

import inventorySlice from './slices/InventorySlice';
import groceryListSlice from './slices/GroceryListSlice';

const store = configureStore({
    reducer: {
        inventory: inventorySlice,
        groceries: groceryListSlice
    }
});

type RootState = ReturnType<typeof store.getState>;

export const selectInventoryItems = (state: RootState) => state.inventory.items;
export const selectGroceryListItems = (state: RootState) => state.groceries.items;

export default store;
