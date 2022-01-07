import './FrameWork.scss';

import {Route, Routes} from "react-router-dom";
import DrawMenu from "./NavMenu";
import {useEffect, useState} from "react";
import ShoppingListBoxAll from "./ShopListe";
import SoppingListEditBox from "./EditShopList";

export interface IShopListItem {
    name:   string;
    count:  number;
}
export interface IPersonalShopList {
    id:     number;
    name:   string;
    list:   IShopListItem[];
}
export interface IShopList {
    id:     number;
    name:   string;
//    list:   IShopListItem[];
    listP:  IPersonalShopList[];
}

/**
 * #Freitag
 */
function CreateData(storageKey: string): IShopList {
    const listeItem: IShopListItem[] = [
        {name: "Milch", count: 2},
        {name: "Butter", count: 1},
        {name: "Bier", count: 6}
    ];
    const listeItem2: IShopListItem[] = [
        {name: "Milch2", count: 1},
        {name: "Butter2", count: 1},
        {name: "Bier2", count: 1}
    ];
    const listePerson: IPersonalShopList[] = [
        {name: "Jan", id: 1, list: listeItem},
        {name: "Peter", id: 2,  list: listeItem2}
    ];
    let tmpAllData: IShopList = {id: -1, name: "JanX", /*list: listeItem,*/ listP: listePerson};
    let stringAllData = JSON.stringify(tmpAllData);
    let tmpDataString = localStorage.getItem(storageKey) || stringAllData;
    tmpAllData = JSON.parse(tmpDataString);

    return tmpAllData;
}
/**
 * #Freitag
 */
function DrawFrameWork() {
    const STORAGE_KEY = 'MeinWirklichTollerKey123';
    const [listeAllData, setListe] = useState(CreateData(STORAGE_KEY));
    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(listeAllData));
        console.log("useEffect->StoreContent:",listeAllData.name);
    }, [listeAllData]);

    if (listeAllData.id === -1) {
        listeAllData.id = 1;
        listeAllData.name = "Jan";
        let newAllData = {...listeAllData};
        setListe(newAllData);
    }



// <Route path="/" element={< TextOutputBox( listeAllData ) />} />
    return (
        <div>
            <div>
                <header className="Header">
                    <div>
                        <Routes>
                            <Route path="/" element={<h1>Home</h1>}/>
                            <Route path="/Edit" element={<h1>Edit</h1>}/>
                            <Route path="/About" element={<h1>About</h1>}/>
                        </Routes>
                        < DrawMenu />
                    </div>
                </header>
            </div>
            <div className="Body">
                <div className="LeftBody">
                    <Routes>
                        <Route path="/" element={ <p>Left</p>  }/>
                        <Route path="/Edit" element={ <p>Left</p> }/>
                        <Route path="/About" element={<img src={"https://thispersondoesnotexist.com/image"} className="App-logoL" alt="logo"/>}/>
                    </Routes>

                </div>
                <div className="MidBody">
                    <Routes>
                        <Route path="/" element={ < ShoppingListBoxAll list={listeAllData} /> }/>
                        <Route path="/Edit" element={ < SoppingListEditBox listData={listeAllData} setterListe={setListe} /> }/>
                        <Route path="/About" element={<img src={"https://thispersondoesnotexist.com/image"} className="App-logoM" alt="logo"/>}/>
                    </Routes>
                </div>
                <div className="RightBody">
                    <Routes>
                        <Route path="/" element={ <p>Right</p>  }/>
                        <Route path="/Edit" element={ <p>Right</p> }/>
                        <Route path="/About" element={<img src={"https://thispersondoesnotexist.com/image"} className="App-logoR" alt="logo"/>}/>
                    </Routes>
                </div>
            </div>
            <div className="BottomBody">
                <p>Ende</p>
            </div>
        </div>
    )
}
//<img src={"https://thispersondoesnotexist.com/image"} className="App-logo" alt="logo"/>
export default DrawFrameWork;