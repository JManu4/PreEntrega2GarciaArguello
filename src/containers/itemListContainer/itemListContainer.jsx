import { useEffect, useState } from 'react'
import './itemListContainer.css'
import { useParams } from 'react-router-dom'
import { Spin } from 'antd';
import ItemList from '../../components/itemList/itemList'

import { collection, getDocs, query, where  } from 'firebase/firestore'
import { db } from '../../firebase/client'

const ItemListContainer = ( ) => {

    const { idCategoria } = useParams()
    const [ productos, setProductos ] = useState([])
    const [ loading, setLoading ] = useState(true)

    useEffect( () => {
        setLoading(true)
        if (!idCategoria) {
            const productRef = collection (db, 'productos')
            getDocs (productRef)
                .then ( (snapshot => {
                    const dataFiltrada = snapshot.docs.map ( doc => ( {...doc.data(), id: doc.id} ))
                    setProductos(dataFiltrada)
                }
                ))
                .catch ( e => console.error(e) )
                .finally ( () => setLoading(false) )
        } else {
            const productPorCategoria = query (
                collection (db, 'productos'),
                where ('categoria', '==', `${idCategoria}` )
            )
            getDocs (productPorCategoria)
                .then ( (snapshot => {
                    const dataFiltrada = snapshot.docs.map ( doc => ( {...doc.data(), id: doc.id} ))
                    setProductos(dataFiltrada)
                }
                ))
                .catch ( e => console.error(e) )
                .finally ( () => setLoading(false) )
        }
    }, [idCategoria] )

// Loading spin
    const contentStyle = { padding: 50, background: 'rgba(0, 0, 0, 0.05)', borderRadius: 4 };
    const content = <div style={contentStyle} />;
    if (loading) {
        return (
            <h2><Spin tip="Cargando..." size="large">{content}</Spin></h2>
        )
    }

    return (
        <div className='ItemListContainer'>
            {!idCategoria ? (
                <div>
                    <h1>Todos nuestros productos</h1>
                    <h3>Bienvenid@</h3>
                </div>
                ) : (
                    <h1>{idCategoria.toUpperCase()}</h1>
                )}
            <ItemList todosLosProductos={productos} /> 
        </div>
    )
}
export default ItemListContainer