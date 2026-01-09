import { createContext, useState } from "react";


const Cartcontext= createContext()



const Cartprovider=({children})=>{

const [cartitems,setcartitems]=useState([])
const [total,settotal]=useState(0)
const [able,setable]= useState([]) //Para guardar los id de los productos que se agregan al carrito
// const [cant,setcant]= useState(0)
const add=(product,index)=>{

    const repeated= cartitems.some(item=>item.id===product.id)
    if(!repeated){
        const active= [...able,product.id]
        setable(active)
        const buy= [...cartitems,{...product, cant: 1}]

        setcartitems(buy)
        settotal(prev=>prev+product.precio)
    }
    // if(repeated){

    //     const rep= [...cartitems].map(item=>{
    //         return item.id===product.id ? {...item , cant: item.cant+1} : item
    //     })
    //     setcartitems(rep)
    //     settotal(prev=>prev+product.precio)
    // }else{
    //     const buy= [...cartitems,{...product,cant: 1}]
    //     setcartitems(buy)
    //     settotal(prev=>prev+product.precio)
        
    // }

    

    
  
}


const remove=(product,index)=>{
    const repeat= cartitems.some(item=>item.id===product.id)


    if(repeat){
        const quit= cartitems.filter(item=>item.id!==product.id)
        setcartitems(quit)
        settotal(prev=>prev-(product.precio*product.cant))
        const inactive= able.filter(item=>item!==product.id)
        setable(inactive)

    }
   

}

const incrementcant=(product)=>{


    

    const updatecant=[...cartitems].map((item)=>
    item.id==product.id ? {...item, cant: item.cant+1}: item
    )
    setcartitems(updatecant)
    settotal(prev=>prev+product.precio)

}
const decrementcant=(product)=>{
    const cuantity= cartitems.find(item=>item.id===product.id)


    if(cuantity.cant>1){
        const updatecant=[...cartitems].map(item=>item.id===product.id
        ?{...item , cant: item.cant-1}: item
    )
    setcartitems(updatecant)
        

    }else{
        const updated=cartitems.filter(item=>item.id!==product.id)

        setcartitems(updated)
        const inactive= able.filter(item=>item!==product.id)
        setable(inactive)
    }
    settotal(prev=>prev-product.precio)
}
return(

    <Cartcontext.Provider
    value={{
        cartitems,remove,add,total,incrementcant,decrementcant,able,
    }}>
    {children}
    </Cartcontext.Provider>
)


}
export {Cartcontext, Cartprovider}