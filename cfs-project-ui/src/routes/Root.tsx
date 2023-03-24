import React, {useEffect, useState} from 'react';

import {useSelector} from 'react-redux';

import {selectInventoryItems} from '../store';

import Container from "react-bootstrap/esm/Container";

import Sidebar from "../components/Sidebar";
import InventoryList from '../components/InventoryList';

export default function Root() {
    const inventoryItems = useSelector(selectInventoryItems);

    return (
        <div className="d-flex">
            <Sidebar/>

            <Container className="mainContent">
                <h4>Inventory List</h4>

                <div className="inventoryTable_area">
                    <InventoryList items={inventoryItems}  />
                </div>
            </Container>
        </div>
    );
}
