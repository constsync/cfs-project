import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {v4 as uuid} from 'uuid';

import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Modal from 'react-bootstrap/Modal';

import Sidebar from '../components/Sidebar';
import GroceryListItem from '../components/GroceryListItem';

import {selectGroceryListItems, selectInventoryItems} from '../store';
import {addGroceryItem, clearGroceryListItems} from '../store/slices/GroceryListSlice';
import {mergeUpdatedItem} from '../store/slices/InventorySlice';

import {InventoryItemModel} from '../interfaces';

import '../styles/views/GroceryList.css';

export default function GroceryListScreen() {
    const dispatch = useDispatch();

    const currentInventoryItems = useSelector(selectInventoryItems);
    const currentGroceryItems = useSelector(selectGroceryListItems);

    const [showAddNewModal, toggleAddNewModal] = useState<boolean>(false);

    const handleMergeInventoryItems = () => {
        console.log('handleMergeInventoryItems');
        currentGroceryItems.forEach(item => {
            dispatch(mergeUpdatedItem(item))
        });

        dispatch(clearGroceryListItems());
        alert('Inventory table updated!');
    };

    const openAddNewModal = () => {
        toggleAddNewModal((showAddNewModal) => true);
    };

    const closeAddNewModal = () => {
        toggleAddNewModal((showAddNewModal) => !showAddNewModal);
    };

    const stockFormData = {
        itemName: '',
        itemQuantity: '',
        itemUnits: '',
        itemLocation: '',
        itemExpiration: ''
    }

    // Form handlers
    const [formData, setFormData] = useState(stockFormData);

    const storageOptions = [
        {
            name: 'Freezer',
            value: 'freezer'
        },
        {
            name: 'Refrigerator',
            value: 'refrigerator'
        },
        {
            name: 'Pantry',
            value: 'pantry'
        },
        {
            name: 'Cabinet',
            value: 'cabinet'
        },
        {
            name: 'Other/Dry',
            value: 'other/dry'
        },
        {
            name: 'Other/Cold',
            value: 'other/cold'
        },
        {
            name: 'Other',
            value: 'other'
        }
    ];

    // @ts-ignore
    const onInputChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.id]: e.target.value
        }));
    };

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('onSubmit formData:', formData);

        const id = uuid();

        const payload = {
            id,
            name: formData.itemName.toLowerCase(),
            location: formData.itemLocation,
            quantity: Number(formData.itemQuantity),
            units: formData.itemUnits,
            expires: formData.itemExpiration
        };

        console.log('final payload:', payload);
        console.log('adding new grocery item from modal form');
        // Check to see if current payload object exists in groceryItemsList
        dispatch(addGroceryItem(payload));

        // Reset form fields
        setFormData(stockFormData);

        // closeModal
        closeAddNewModal();
    };

    useEffect(() => {
        const itemsToReplenish = currentInventoryItems.filter((item: InventoryItemModel) => {
            if (item.quantity < 2) {
                return item;
            }
        }).forEach((item: InventoryItemModel) => dispatch(addGroceryItem(item)));

        console.log('items to replenish:', itemsToReplenish);
    }, []);

    return (
        <div className="d-flex">
            <Sidebar/>
            <>
                <Container className="mainContent">
                    <h4>Grocery List</h4>

                    <div className="groceryList_header d-flex">
                        <div className="groceryList_actionBtns">
                            <Button className="groceryList_actionBtn" variant="primary" onClick={openAddNewModal}>Add New</Button>
                            &nbsp;
                            {currentGroceryItems.length > 0 ? <Button className="groceryList_actionBtn" variant="primary" onClick={handleMergeInventoryItems}>Update Inventory</Button> : null}
                        </div>
                    </div>

                    <div className="d-flex flex-column">
                        {currentGroceryItems.length > 0 ? (
                            currentGroceryItems.map(item => <GroceryListItem key={item.id} item={item} />)
                        ) : (
                            <div>
                                <p>No grocery items...</p>
                            </div>
                        )}
                    </div>
                </Container>

                <Modal show={showAddNewModal} onHide={closeAddNewModal} centered={true}>
                    <Modal.Header closeButton>
                        <Modal.Title>
                            Add New Item
                        </Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <form onSubmit={onSubmit}>
                            <div className="d-flex flex-column align-items-center">
                                <input id="itemName" className="form-control mb-2" type="text" placeholder="Item name" value={formData.itemName} onChange={onInputChange} required />
                                <input id="itemQuantity" className="form-control mb-2" type="number" placeholder="Quantity" value={formData.itemQuantity} onChange={onInputChange} required />
                                <input id="itemUnits" className="form-control mb-2" type="text" placeholder="Units" value={formData.itemUnits} onChange={onInputChange} required />
                                <select id="itemLocation" className="form-control mb-2" value={formData.itemLocation} onChange={onInputChange} required>
                                    {storageOptions.map(item => <option value={item.value}>{item.name}</option>)}
                                </select>
                                <input id="itemExpiration" className="form-control mb-2" type="date" placeholder="Expiration date" value={formData.itemExpiration} onChange={onInputChange} required />

                                <Button className="modalActionBtn" variant="success" type="submit">
                                    Save
                                </Button>
                            </div>
                        </form>
                    </Modal.Body>
                </Modal>
            </>
        </div>
    );
}
