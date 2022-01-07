import './EditShopList.scss';
import React from "react";
import {IShopList} from "./FrameWork";
import ShopListElementText from './EditShopListItemText';





/**
 * #Freitag
 */
interface ElementProps {
    myId:           number,
    count:          number,
    text:           string,
    listData:       IShopList,
    setterListe:    Function,
    dirtyIndex:     number
}
function ShopListElement({myId, count, text, listData, setterListe, dirtyIndex}: ElementProps) {

    const handleShopListElementEventAdd: React.MouseEventHandler<HTMLButtonElement> = (event) => {
        console.log("handleShopListElementEventAdd", listData.listP[dirtyIndex].list[myId].name);
        listData.listP[dirtyIndex].list[myId].count = listData.listP[dirtyIndex].list[myId].count + 1;
        setterListe({...listData});
    }
    const handleShopListElementEventSub: React.MouseEventHandler<HTMLButtonElement> = (event) => {
        console.log("handleShopListElementEventSub", listData.listP[dirtyIndex].list[myId].name);
        if( listData.listP[dirtyIndex].list[myId].count > 0 ){
            listData.listP[dirtyIndex].list[myId].count = listData.listP[dirtyIndex].list[myId].count - 1;
            setterListe({...listData});
        }

    }
    const handleShopListElementEventKill: React.MouseEventHandler<HTMLButtonElement> = (event) => {
        console.log("handleShopListElementEventKill", listData.listP[dirtyIndex].list[myId].name);
//        listData.listP[dirtyIndex].list.splice(myId);
        const index = listData.listP[dirtyIndex].list.indexOf(listData.listP[dirtyIndex].list[myId], 0);
        if (index > -1) {
            listData.listP[dirtyIndex].list.splice(index, 1);
        }
        setterListe({...listData});
    }

    return (
        <div className="ShopListElement">
            <div className="ShopListElementItemsLeft">
                < ShopListElementText text={text} count={count} />                
            </div>
            <div className="ShopListElementButtonsRight">
                <button type="button" className="ToDo" onClick={handleShopListElementEventAdd}>➕</button>
                <button type="button" className="ToDo" onClick={handleShopListElementEventSub}>➖</button>
                <button type="button" className="ToDo" onClick={handleShopListElementEventKill}>🗑</button>
            </div>
        </div>
    )
}

export default ShopListElement
