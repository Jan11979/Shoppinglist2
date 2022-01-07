import './ShopListe.scss';
import {IPersonalShopList, IShopList} from './FrameWork';
import ShopListElementText from './EditShopListItemText';

interface ElementProps {
    count: number,
    text: string
}

function Element({count, text}: ElementProps) {
    return (
        <div className="ShopListElement">
            < ShopListElementText text={text} count={count} />
        </div>
    )
}

/**
 * #Freitag
 */
interface ElementPropsShoppingListBox {
    list: IPersonalShopList
}
function ShoppingListBox( { list } : ElementPropsShoppingListBox) {
    return (
        <div className="ShopListElementAll" >
            <p> {list.name} </p>
            {list.list.map((e, i) => (< Element key={i} count={e.count} text={e.name}/>))}
        </div>
    )
}

interface ElementPropsShoppingListBoxAll {
    list: IShopList
}
function ShoppingListBoxAll({ list } : ElementPropsShoppingListBoxAll) {
    return (
        <div>
            <p> Listen </p>
            {list.listP.map((e, i) => (< ShoppingListBox key={i} list={e}/>))}
        </div>
    )
}

export default ShoppingListBoxAll

