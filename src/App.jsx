import './App.css'
import Home from './pages/Home'
import { Route, Routes } from 'react-router-dom'
import ProtectedRoutes from './pages/ProtectedRoutes'
import Purchases from './pages/Purchases'
import Cart from './pages/Cart'
import ProductId from './pages/ProductId'
import Footer from './components/shared/Footer'
import Header from './components/shared/Header'
import axios from 'axios'
import { useEffect } from 'react'
import Login from './pages/Login'
import getConfig from './utils/getConfig'
import Register from './pages/Register'

function App() {

	return (
		<div className="App">
			<Header />
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/product/:id' element={<ProductId />} />
				<Route path='/login' element={<Login/>}/>
				<Route path='/register' element={<Register/>}/>

				<Route element={<ProtectedRoutes />}>
					<Route path='/purchases' element={<Purchases />} />
				</Route>
			</Routes>
			<Footer />
		</div>
	)
}

export default App
