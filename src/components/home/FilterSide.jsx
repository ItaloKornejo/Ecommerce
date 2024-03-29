import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { setSearchGlobal } from '../../store/slices/search.slice'
import './styles/filterside.css'

const FilterSide = ({ showFilter }) => {

	const formPriceFrom = useRef(null);
	const formPriceTo = useRef(null);
	const navigate = useNavigate()
	const filterSwal = withReactContent(Swal)
	const [categories, setCategories] = useState()
	const searchFilter = useSelector(state => state.search)
	const products = useSelector(state => state.products)
	const dispatch = useDispatch()


	useEffect(() => {
		const URL = 'https://e-commerce-api.academlo.tech/api/v1/products/categories'
		axios.get(URL)
			.then(res => setCategories(res.data.data.categories))
			.catch(err => console.log(err))
	}, [])


	useEffect(() => {
	  if(searchFilter?.[0]!=='price'){
		formPriceTo.current.value=null;
		formPriceFrom.current.value=null;
	  }
	}, [searchFilter])
	

	const handleFilterPrice = (e) => {
		e.preventDefault()
		const priceFrom = formPriceFrom.current;
		const priceTo = formPriceTo.current;
		if (parseInt(priceFrom.value) >= 0 && parseInt(priceTo.value) > parseInt(priceFrom.value)) {
			navigate(`/${priceFrom.value + '-' + priceTo.value}`)
		} else {
			filterSwal.fire({
				title: <strong>Failed search</strong>,
				html: <span>invalid fields</span>,
				timer: 1800,
				icon: 'error'
			})
		}
	}

	const handleFilterCategory = (category) => {
		if (category === 'all') {
			dispatch(setSearchGlobal(['all']))
		} else {
			dispatch(setSearchGlobal(['category', category]))	
		}
		navigate(`/`)
	}

	const handlefilter = () => {
		if (showFilter) {
			return 'filter__show'
		}
	}


	return (
		<div className={`filter-container ${handlefilter()}`}>
			<div className='filter__price-container'>
				<input id="priceToggle" className="filter__price-input" type="checkbox" defaultChecked="." />
				<label htmlFor="priceToggle" className="filter__price-label">Price<i className='bx bx-chevron-down'></i></label>
				<div className="filter__price-content">
					<form className='filter__price-form'>
						<div className='price__filter-from'>
							<label htmlFor='priceFrom'>From</label>
							<input ref={formPriceFrom} type="number" id='priceFrom' placeholder='0' />
						</div>
						<div className='price__filter-to'>
							<label htmlFor='priceTo'>To</label>
							<input ref={formPriceTo} type="number" id='priceTo' autoComplete="on" />

						</div>
						<button onClick={handleFilterPrice} className='filter__price-btn' >Filter price</button>
					</form>
				</div>
			</div>
			<div className='filter__category-container'>
				<input id="categoryToggle" className="filter__category-input" type="checkbox" defaultChecked="." />
				<label htmlFor="categoryToggle" className="filter__category-label">Category<i className='bx bx-chevron-down'></i></label>
				<div className="filter__category-content">
					<div className='filter__categories'>
						<p onClick={() => handleFilterCategory('all')}>All Products</p>
						{
							categories?.map(category => <p key={category.id} onClick={() => handleFilterCategory(category.name)}>{category.name}</p>)
						}
					</div>

				</div>

			</div>
		</div>

	)
}

export default FilterSide