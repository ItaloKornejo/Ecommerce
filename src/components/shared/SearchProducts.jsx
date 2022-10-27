import React from 'react'
import './styles/searchproducts.css'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useRef, useState } from 'react'
import { setSearchGlobal } from '../../store/slices/search.slice'


const SearchProducts = () => {

  const [searchWord,setSearchWord] = useState('')
  const formSearch = useRef('')
  const dispatch = useDispatch()

  const handleFilterWord = (e) => {
		const formSearchWord = formSearch.current;
		if ( formSearchWord.value.length >1) {
			e.preventDefault()
			dispatch(setSearchGlobal(['word', formSearchWord.value]))
		} else {
			console.log('handle SEARCH WORD FAKE');
		}
	}

  const handleFilterNowWord = (e) => {
    setSearchWord(e.target.value)
    dispatch(setSearchGlobal(['word', e.target.value]))
  }

// const InputSearch = ({inputText, setInputText}) => {

//   const handleChange = e => {
//     setInputText(e.target.value)
//   }

//   return (
//     <input value={inputText} onChange={handleChange} type="text" />
//   )
// }

// export default InputSearch


// console.log('FREOM SEARCH: ',searchWord);

  return (
    <div className='search-container'>
      <input  value={searchWord } onChange={handleFilterNowWord} ref={formSearch}  type='text' className='search__input'/>
      <button onClick={handleFilterWord} className='search__btn'><i className='bx bx-search'></i></button>
    </div>
  )
}

export default SearchProducts