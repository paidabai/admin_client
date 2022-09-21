import React from 'react';
import {Outlet} from "react-router-dom";

function Product(props) {
    return (
        <div>
            <Outlet/>
        </div>
    );
}

export default Product;