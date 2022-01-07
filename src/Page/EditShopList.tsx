import './EditShopList.scss';
import {IPersonalShopList, IShopList, IShopListItem} from './FrameWork';
import {ChangeEvent, useState} from 'react';
import {FocusEvent} from 'react';
import ShopListElement from "./EditShopListItem";


interface ElementPropsSoppingListEditBox {
    listData: IShopList,
    setterListe: Function
}

/**
 * #Freitag
 */


interface ElementPropsSaveShopListElement {
    listData: IShopList,
    setterListe: Function,
    dirtyIndex: number
}

function SaveShopListElement({listData, setterListe, dirtyIndex}: ElementPropsSaveShopListElement) {
    if (dirtyIndex === -1) {
        return (
            <div>
                <p>Leer</p>
            </div>
        )
    } else {
        return (
            <div>
                {listData.listP[dirtyIndex].list.map((e, i) => (
                    < ShopListElement key={i} myId={i} count={e.count} text={e.name} listData={listData}
                                      setterListe={setterListe} dirtyIndex={dirtyIndex}/>))}
            </div>
        )
    }
}

function SoppingListEditBox({listData, setterListe}: ElementPropsSoppingListEditBox) {
    let bootName = "";
    let bootIndex = -1;
    if (listData.listP.length !== 0) {
        bootName = listData.listP[0].name;
        bootIndex = 0
    }
    const [listPIndex, setlistPIndex] = useState(bootIndex);
    const [name, setName] = useState("");
    const [newItem, setItem] = useState("");
    const [newItemCount, setItemCount] = useState(1);

    const onChangeName = (event: ChangeEvent<HTMLInputElement>, superText: string) => {
        if (event.target.value.length < 11) {
            setName(event.target.value);
            console.log("superText=", superText);
        }
    }
    const onChangeNewItemCount = (event: ChangeEvent<HTMLInputElement>) => {
        let newNumber = parseInt(event.target.value);
        if ((newNumber > 0) && (newNumber < 201)) {
            setItemCount(newNumber);
        } else if (newNumber === 0) {
            // Hier soll ein ? rein ist aber nicht so einfach
            setItemCount(newNumber)// ?
        }

    }
    const onChangeNewItem = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.value.length < 21) {
            setItem(event.target.value);
        }
    }

    const handleFocusEvent = (event: FocusEvent<HTMLInputElement>) => {
        let newName = event.target.value;
        let newIndex = -1;

        function findName(item: IPersonalShopList, index: number, serchName: string) {
            if (item.name.toLowerCase() === serchName.toLowerCase()) {
                newIndex = index;
            }
        }

        listData.listP.map((e, i) => (findName(e, i, newName)));
        if (newIndex === -1) {
            let newPersonalItem: IPersonalShopList = {name: newName, id: listData.listP.length, list: []};
            listData.listP.push(newPersonalItem);
            setterListe({...listData});
            newIndex = listData.listP.length - 1;
            setlistPIndex(newIndex)
        } else {
            setlistPIndex(newIndex)
        }
        console.log("handleFocusEvent", event.target.value);
    };

    const handleKillListEvent: React.MouseEventHandler<HTMLButtonElement> = (event) => {
        const index = listData.listP.indexOf(listData.listP[listPIndex], 0);
        if (index > -1) {
            listData.listP.splice(index, 1);
        }
        setterListe({...listData});
        if (listData.listP.length === 0) {
            setlistPIndex(-1);
            setName("")
        } else {
            setlistPIndex(0);
            setName(listData.listP[0].name)
        }

    }
    const handleAddEvent: React.MouseEventHandler<HTMLButtonElement> = (event) => {
        console.log("handleAddEventonClick", newItem);
        if (newItem.length !== 0) {
            let newList = listData.listP[listPIndex].list;
            let newItemObj: IShopListItem = {name: newItem, count: newItemCount};
            newList.push(newItemObj);
            listData.listP[listPIndex].list = newList;
            setterListe({...listData});

            setItemCount(1);
            setItem("");
        }
    }
//    newItemCount, setItemCount
//    <button type="button" className="ToDo" onClick={()}>Add</button>
    return (
        <div className="InputBox">
            <p>Wer soll Einkaufen</p>
            <input value={name} type="text" onChange={(e) => onChangeName(e, "Hallo Event")} onBlur={handleFocusEvent}/>
            <button type="button" className="ToDo" onClick={(handleKillListEvent)}>🗑</button>

            <p>Neuer Artikel</p>

            <input className="NewItemCountInput" value={newItemCount} type="number"
                   onChange={onChangeNewItemCount}/>
            <input className="NewItemInput" value={newItem} type="text"
                   onChange={onChangeNewItem}/>

            <button type="button" className="ToDo" onClick={handleAddEvent}>Add</button>
            < SaveShopListElement listData={listData} setterListe={setterListe} dirtyIndex={listPIndex}/>
        </div>
    )
}

/*
{listData.listP[listPIndex].list.map((e, i) => (
                < ShopListElement key={i} myId={i} count={e.count} text={e.name} listData={listData}
                                  setterListe={setterListe} dirtyIndex={listPIndex}/>))}
 */


export default SoppingListEditBox