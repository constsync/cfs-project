import React, {useEffect} from 'react';

import {
  createBrowserRouter,
  RouterProvider,
  Route
} from 'react-router-dom';

import { useDispatch } from 'react-redux';

import { addInventoryItem } from './store/slices/InventorySlice';

import './App.css';

import Topbar from './components/Topbar';

import Root from './routes/Root';
import GroceryListScreen from './routes/GroceryListScreen';
import { InventoryItemModel } from './interfaces';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root/>,
  },
  {
    path: "/grocery-list",
    element: <GroceryListScreen />,
  },
]);

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    console.log('one time...');

    async function handleFetch() {
      const data = await fetch('http://localhost:8081/api/inventory/items').then((res) => res.json()).then((resData) => {
        
        console.log('resData:', resData.data.items);
        return resData.data.items;
      }).catch((error) => console.error('Failed to fetch inventory items:', error));

      if (data) {
        // Iterate through array of items & dispatch action to add each object to redux store
        data.forEach((item: InventoryItemModel) => dispatch(addInventoryItem(item)));
      }
    }

    handleFetch();
  }, []);

  return (
    <div className="App">
      <header>
        <Topbar/>
      </header>

      <main>
        <RouterProvider router={router} />
      </main>
    </div>
  );
}
