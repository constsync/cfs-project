import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';

import {BsFillGearFill} from 'react-icons/bs';
import {MdNumbers} from 'react-icons/md';

import {InventoryItemModel} from '../interfaces';

import InventoryItem from './InventoryItem';

import '../styles/components/InventoryList.css';

interface Props {
    items: InventoryItemModel[];
}

export default function InventoryList(props: Props) {
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
                                <th>Status</th>
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
