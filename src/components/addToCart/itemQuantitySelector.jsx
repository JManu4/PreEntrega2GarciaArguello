import { useContext, useState } from 'react'
import { ShopContext } from '../../contexts/shopContext'
import './itemQuantitySelector.css'


const ItemQuantitySelector = ( { unProducto } ) => {

    const { addNewToCart, carrito, addSameToCart } = useContext(ShopContext)

    const [num, setNum] = useState(1)
    const suma = () => { setNum( num + 1 ) }
    const resta = () => {
        if ( num !== 1 ) {
            setNum( num - 1 )
        }
    }

    // const [ sameProduct, setSameProduct ] = useState(false)
    // Porque useState no funciona?
    var sameProduct = false
    const isSameProdAndAddToCart = () => {
        carrito.forEach( (item) => {
            if (item.name == unProducto.nombre) {
                item.quantity = item.quantity + num
                sameProduct = true
                addSameToCart()
            }
        } )
        if ( !sameProduct ) {
            addNewToCart( {name: unProducto.nombre, price: unProducto.precio, quantity: num } )
            sameProduct = false
        }
    }

    return (
        <div className='addToCartContainer'>
            <div className='addToCart'>
                <button onClick={ resta } className='quitar'>-</button> 
                <p className='cantidad'>{num}</p>
                <button onClick={ suma } className='agregar'>+</button> 
            </div>
            <button className='alCarritoBtn' onClick={ isSameProdAndAddToCart }>Agregar al carrito</button>
        </div>
    )
}
export default ItemQuantitySelector