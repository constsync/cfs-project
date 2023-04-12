import React from 'react';

import {NavLink, useLocation} from 'react-router-dom';

import '../styles/components/Sidebar.css';

export default function Sidebar() {
    const location = useLocation();
    const [pathName, setPathName] = React.useState<string>('');

    React.useEffect(() => {

        setPathName(location.pathname);
        console.log('path:', location.pathname);
    }, []);

    return (
        <div id="sidebar">
            <div className="sidebar_content">
                <div className={`sidebar_link ${pathName === '/' ? 'active_tab' : null}`}>
                    <NavLink to="/">
                        Inventory
                    </NavLink>
                </div>

                <div className={`sidebar_link ${pathName === '/grocery-list' ? 'active_tab' : null}`}>
                    <NavLink to="/grocery-list">
                        Grocery list
                    </NavLink>
                </div>
            </div>
        </div>
    );
}
