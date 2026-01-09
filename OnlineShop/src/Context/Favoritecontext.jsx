import {createContext, useState} from "react"


const Favoritecontext= createContext()


const Favoriteprovider=({children})=>{

    const[like, setlike]= useState([])// para marcar los favoritos
    const[element,setelement]= useState([]) // para mostrar los favoritos
    
    const addquit=(product)=>{

      const isfavorite= element.some(item=>item.id===product.id)

      if(!isfavorite){
        const aux= [...element,product]  
        const active= [...like,product.id]
        setlike(active)
      setelement(aux)
      } else{
        const remove= element.filter(item=> item.id!==product.id)
        const inactive= like.filter(item=>item!==product.id)
        setelement(remove)
        setlike(inactive)

      }

      


    }



    return(
        <Favoritecontext.Provider
        value={{
            element,setlike,like,addquit
        }}
        >
            {children}


        </Favoritecontext.Provider>

    )



}

export{Favoritecontext,Favoriteprovider}
