import React, {useState, useRef} from 'react';

import {useDispatch} from 'react-redux';

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

import { InventoryItemModel } from '../interfaces';

import { removeInventoryItem, editInventoryItem } from '../store/slices/InventorySlice';

import { BsThreeDotsVertical } from 'react-icons/bs';
import { MdNumbers } from 'react-icons/md';

import Status from './Status';

interface Props {
    item: InventoryItemModel;
}

export default function InventoryItem(props: Props) {
    const dispatch = useDispatch();

    const [showEditModal, toggleEditModal] = useState<boolean>(false);
    const [newQuantity, setNewQuantity] = useState<number>(0);

    const editModalBtnRef = useRef(null);

    const formatDate = (dateStr: string) => {
        return new Date(dateStr).toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"short", day:"numeric"});
    };

    const openEditModal = (event: React.SyntheticEvent) => {
        // @ts-ignore
        let attr = editModalBtnRef.current.getAttribute('data-rid');
        console.log('attr:', attr);

        toggleEditModal((showEditModal) => true);
    };

    const closeEditModal = () => {
        toggleEditModal((showEditModal) => !showEditModal);
    };

    const handleDeleteItem = (id: string) => {
        console.log('handleDeleteItem');
        dispatch(removeInventoryItem({id}));
    };

    const handleSaveEdit = (id: string, quantity: string) => {
        console.log(`edit info id: ${id} q:${quantity}`);

        dispatch(editInventoryItem({id, quantity}));

        closeEditModal();
    };

    return (
        <>
            <tr className="inventoryList_tableItem">
                <td>{formatDate(props.item.expires)}</td>
                <td className="text-capitalize">{props.item.name}</td>
                <td>{props.item.quantity}</td>
                <Status quantity={props.item.quantity}/>
                <td className="text-uppercase">{props.item.units}</td>
                <td className="text-uppercase">{props.item.location}</td>
                <td className="text-center">
                    <button onClick={event => openEditModal(event)} data-rid={props.item.id} ref={editModalBtnRef}>
                        <BsThreeDotsVertical/>
                    </button>
                </td>
            </tr>

            <Modal show={showEditModal} onHide={closeEditModal} centered={true}>
                <Modal.Header closeButton>
                    <Modal.Title>{props.item.name.toLocaleUpperCase()} <MdNumbers/>{props.item.id}</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    {/*
                    // @ts-ignore */}
                    <form onSubmit={(e) => { e.preventDefault(); handleSaveEdit(props.item.id, newQuantity)}}>
                        <div className="d-flex flex-column align-items-center">
                            <span>Quantity</span>
                            <input 
                                className="form-control"
                                type="number"
                                min={0}
                                defaultValue={props.item.quantity}
                                onChange={(e) => setNewQuantity(Number(e.target.value))}
                            />
                        </div>

                        <div className="d-flex justify-content-around mt-5">
                            <Button className="modalActionBtn" variant="danger" onClick={() => handleDeleteItem(props.item.id)}>
                                Delete
                            </Button>
                            <Button className="modalActionBtn" type="submit">
                                Save
                            </Button>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>
        </>
    );
}
