import React, {useState, useMemo, useEffect} from 'react';

interface Props {
    quantity: number;
}

export default function Status(props: Props) {
    const { quantity } = props;
    const [statusColor, setStatusColor] = useState<string>('');

    const itemStatus = useMemo(() => {
        const yC = "#FFEB3B",
            gC = "#4CAF50",
            rC = "#F44336";

        if (quantity > 2) {
            return gC;
        } else if (quantity > 1 && quantity <= 2) {
            return yC;
        } else {
            return rC;
        }
    }, [quantity]);
    console.log('itemStatus:', itemStatus);

    useEffect(() => {
        console.log(`quan changed:${itemStatus}`);
        // @ts-ignore
        setStatusColor(itemStatus);
    }, [itemStatus]);

    return (
        <td className="status" style={{backgroundColor: statusColor}}></td>
    );
}
