import React, {useState} from 'react';

import { useDispatch } from 'react-redux';

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

import { BsThreeDotsVertical } from 'react-icons/bs';
import { MdNumbers } from 'react-icons/md';

import { InventoryItemModel } from '../interfaces';

import { updateGroceryItemQuantity, removeGroceryItem } from '../store/slices/GroceryListSlice';

interface Props {
    item: InventoryItemModel
}

export default function GroceryListItem(props: Props) {
    const dispatch = useDispatch();

    const [showEditModal, toggleEditModal] = useState<boolean>(false);
    const [newQuantity, setNewQuantity] = useState<number>(0);

    const openEditModal = (event: React.SyntheticEvent) => {
        toggleEditModal((showEditModal) => true);
    };

    const closeEditModal = () => {
        toggleEditModal((showEditModal) => !showEditModal);
    };

    const handleEditGroceryItem = (id: string, quantity: string) => {
        dispatch(updateGroceryItemQuantity({id, quantity}));
        closeEditModal();
    };

    const handleDeleteItem = (id: string) => {
        dispatch(removeGroceryItem({id}));
    };

    return (
        <>
            <div className="d-flex justify-content-around align-items-center bg-white border mb-2">
                    <div className="d-flex flex-column text-center w-25 p-2">
                        <span className="font-weight-bold text-uppercase">
                            Name
                        </span>

                        <span className="text-capitalize">
                            {props.item.name}
                        </span>
                    </div>

                    <div className="d-flex flex-column text-center w-25 p-2">
                        <span className="font-weight-bold text-uppercase">
                            Quantity
                        </span>

                        <span>
                            {props.item.quantity}
                        </span>
                    </div>

                    <div className="d-flex flex-column text-center w-25 p-2">
                        <span className="font-weight-bold text-uppercase">
                            Units
                        </span>

                        <span className="text-capitalize">
                            {props.item.units}
                        </span>
                    </div>

                    <button className="text-center" onClick={event => openEditModal(event)}>
                        <BsThreeDotsVertical/>
                    </button>
            </div>

            <Modal show={showEditModal} onHide={closeEditModal} centered={true}>
                <Modal.Header closeButton>
                    <Modal.Title>{props.item.name.toLocaleUpperCase()} <MdNumbers/>{props.item.id}</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    {/*
                    // @ts-ignore */}
                    <form onSubmit={(e) => { e.preventDefault(); handleEditGroceryItem(props.item.id, newQuantity)}}>
                        <div className="d-flex flex-column align-items-center">
                            <span>Quantity</span>
                            <input className="form-control" type="number" defaultValue={props.item.quantity} onChange={(e) => setNewQuantity(Number(e.target.value))} />
                        </div>

                        <div className="d-flex justify-content-around mt-5">
                            <Button className="modalActionBtn" variant="danger" onClick={() => handleDeleteItem(props.item.id)}>Delete</Button>
                            <Button className="modalActionBtn" type="submit">Save</Button>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>
        </>
    );
}
