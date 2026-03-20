import styles from './Historypays.module.css'
import { Authcontext } from '../../Context/Authcontext'
import { useContext, useState } from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Flex, Space, Table, Tag } from 'antd';
function Historypays() {
    const [data, setdata] = useState([])
    const nav = useNavigate()
    const { username } = useContext(Authcontext)
    useEffect(() => {
        const cargar = async () => {
            const res = await fetch(`http://localhost:3000/api/auth/getallpayments/${username}`)
            const data = await res.json()
            setdata(data)
        }
        cargar()
    }, [])
    const columns = [
        {
            title: 'Username',
            dataIndex: 'username',
            key: 'username',
        },
        {
            title: 'Order ID',
            dataIndex: 'orderid',
            key: 'orderid',
        },
        {
            title: 'Total',
            dataIndex: 'total',
            key: 'total',
        },
        {
            title: 'Products',
            dataIndex: 'products',
            key: 'products',
        },
        {
            title: 'Date',
            dataIndex: 'date',
            key: 'date',
        },

    ]
    return (
        <div className={styles.bg}>
            <div className={styles.container}>
                <h1>Historypays : {username}</h1>
                {/* {data.map(item => (
                    <div key={item.orderid}>
                        <p>Order ID: {item.orderid}</p>
                        <p>Total: {item.total}</p>
                        <p>Products: {item.products.map(p => (
                            <>
                                <p>name : {p.name}</p>
                                <p>price : {p.price}</p>
                                <p>cant : {p.cant}</p>
                            </>
                        ))}</p>
                    </div>
                ))} */}
                <div className={styles.tablecontainer}>
                    <Table columns={columns} style={{ width: 1000 }} loading={data.length === 0} dataSource={data.length > 0 ? data.map(item => {
                        return {
                            username: item.username,
                            orderid: item.orderid,
                            total: item.total,
                            date: item.date,
                            products: item.products.map(p => (
                                <>
                                    <p>Product: {p.name}</p>
                                    <p>Price: {p.price}</p>
                                    <p> Cant: {p.cant}</p>
                                </>
                            ))

                        }
                    }) : []} />
                </div>
            </div>
            <div className={styles.btncontainer}>
                <button className={styles.btn} onClick={() => nav('/myaccount')}>Back</button>
            </div>
        </ div>
    )

}




export default Historypays
