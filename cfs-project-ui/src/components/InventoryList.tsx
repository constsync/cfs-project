import React, {useState, useEffect, useCallback, useRef} from 'react';

import {useDispatch} from 'react-redux';

import Table from 'react-bootstrap/Table';
import Modal from 'react-bootstrap/Modal';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';

import {BsFillGearFill, BsThreeDotsVertical} from 'react-icons/bs';

import {MdNumbers} from 'react-icons/md';

import { editInventoryItem, removeInventoryItem } from '../store/slices/InventorySlice';

import { InventoryItemModel } from '../interfaces';

import '../styles/components/InventoryList.css';

interface InventoryItemProps {
    item: InventoryItemModel
}

function InventoryItem(props: InventoryItemProps) {
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
                <td className="text-uppercase">{props.item.units}</td>
                <td className="text-capitalize">{props.item.location}</td>
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

interface InventoryListProps {
    items: InventoryItemModel[]
}

export default function InventoryList(props: InventoryListProps) {
    return (
        <Container>
            {props.items.length > 0 ? (
                <>
                    <div className="inventoryList_header d-flex">
                        <div className="inventoryList_itemsCount">
                            <span>Items <MdNumbers/> {props.items.length}</span>
                        </div>
                    </div>

                    <Table bordered striped hover>
                        <thead>
                            <tr>
                                <th>Expiration Date</th>
                                <th>Name</th>
                                <th>Quantity</th>
                                <th>Units</th>
                                <th>Location</th>
                                <th className="text-center">
                                    <BsFillGearFill/>
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {props.items.map(item => <InventoryItem key={`${item.name}-${item.id}`} item={item}/>)}
                        </tbody>
                    </Table>
                </>
            ) : (
                <>
                    <div>
                        <span>No inventory items to show</span>
                    </div>
                </>
            )}
        </Container>
    );
}
