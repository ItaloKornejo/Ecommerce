import React from 'react'
import './styles/searchproducts.css'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useRef, useState } from 'react'
import { setSearchGlobal } from '../../store/slices/search.slice'
import { useNavigate, useParams } from 'react-router-dom'


const SearchProducts = () => {

  const [searchWord,setSearchWord] = useState('')
  const formSearch = useRef('')
  const dispatch = useDispatch()
  const navigate = useNavigate()

  // if(true){
  //   console.log('FROM BAR SEARCH',filter);
  // }

  const handleFilterWord = (e) => {
    e.preventDefault()
		const formSearchWord = formSearch.current;
    console.log(formSearchWord.value.length);
		if ( formSearchWord.value.length >1) {
			dispatch(setSearchGlobal(['word', formSearchWord.value]))
		} else {
			console.log('handle SEARCH WORD FAKE');
		}
	}

  const handleFilterNowWord = (e) => {
    if ( searchWord.length===0) {
      navigate(`/`)
		} 
    setSearchWord(e.target.value)
     dispatch(setSearchGlobal(['word', e.target.value]))
  }

  return (
    <div className='search-container'>
      <input  value={searchWord } onChange={handleFilterNowWord} ref={formSearch}  type='text' className='search__input'/>
      <button onClick={handleFilterWord} className='search__btn'><i className='bx bx-search'></i></button>
    </div>
  )
}

export default SearchProducts