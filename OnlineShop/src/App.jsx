import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
// import './App.css'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './Pages/Login/Login';
import Register from './Pages/Home/Register';
import Shop from './Pages/Shop/Shop';
import About from './Pages/About/About';
import Cart from './Pages/Cart/Cart';
import Navbar from './Pages/Shop/Navbar';
import { Cartprovider } from './Context/Cartcontext';
import { Authprovider } from './Context/Authcontext';
import { Favoriteprovider } from './Context/Favoritecontext';
import Favorites from './Pages/Favorites/Favorites';
import Myaccount from './Pages/Myaccount/Myaccount';
import Changepwd from './Pages/Changepwd/Changepwd';
function App() {
  // const [count, setCount] = useState(0)
// const [listedproducts,setlistedproducts]=useState([])
// const add= (product)=>{

//   const buy= [...listedproducts,product]
//   setlistedproducts(buy)
// }

// const remove=(product)=>{

//   const del= listedproducts.filter((item)=>item.id!==product.id)
//   setlistedproducts(del)
// }

// const writemail=(value)=>{
// setemail(value)
// }
  return (
    <Cartprovider>
      <Favoriteprovider>
      <Authprovider>

      <Router>
          <Routes>
              <Route path='/' element={<Navigate to="/login" replace />}></Route>
              <Route path='/login' element={<Login/>}></Route>
              <Route path='/register' element={<Register/>}></Route>
              <Route path='/shop' element={<Shop/>}></Route>
              <Route path='/about' element={<About/>} ></Route>
              <Route path='/cart' element={<Cart/>}></Route>
              <Route path='/favorites' element={<Favorites/>} ></Route>
              <Route path='/myaccount' element={<Myaccount/>}></Route>
              <Route path='/changepwd' element={<Changepwd/>}></Route>
          </Routes>

      </Router>
        </Authprovider>
      </Favoriteprovider>
    </Cartprovider>
  )
}

export default App
