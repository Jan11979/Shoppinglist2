/**
 * #Freitag
 */

import './EditShopList.scss';
import React from "react";

/**
 * #Freitag
 */
interface ShopListElementTextProps {
    count:          number,
    text:           string
}

function ShopListElementText({count, text }:  ShopListElementTextProps ) {
    var countString = count.toString();
    if( count === 0 ){
        countString = "?";
    }
    return (
        <div className="ShopListElementItemsLeft">
            <div>{countString}</div> <div>X </div> <div>{text}</div>
        </div>
    )
}


export default ShopListElementText