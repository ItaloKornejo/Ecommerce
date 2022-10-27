import React, { useState } from 'react'
import './styles/sliderimages.css'

const SliderImages = ({ product }) => {

  const [indexImg, setIndexImg] = useState(0)
  let defaultIndex=0

  const handlePrev = () => {
    if (indexImg - 1 < 0) {
      setIndexImg(product.productImgs.length - 1)
    } else {
      setIndexImg(indexImg - 1)
    }
  }

  const handleNext = () => {
    if (indexImg + 1 > product.productImgs.length - 1) {
      setIndexImg(0)
    } else {
      setIndexImg(indexImg + 1)
    }
  }

  const handleChange = (index) => {
    setIndexImg(index)
  }

  const checkIndex = (index) => {
    if(index===indexImg){
        return {border:`3px var(--color--3) solid`}
    }else{
      return {border:`3px transparent solid`}
    }
  
  }

  return (
    <div className='slider-container'>
      <div className='slider'>
        <button onClick={handlePrev} className='slider__prev'>&#60;</button>
        <div className='slider__static'>
          <div style={{ transform: `translateX(calc(-${indexImg}/3*100%))` }} className='slider__move'>
            {
              product?.productImgs.map(url => (
                <div key={url} className='slider__img-container'>
                  <img className='slider__img' src={url} alt='' />
                </div>
              ))
            }
          </div>
        </div>
        <button onClick={handleNext} className='slider__next'>&#62;</button>
      </div>
      <div className='slider__bar'>
      {
              product?.productImgs.map((url,index) =>(<div onClick={()=>handleChange(index)} key={url} style={checkIndex(index)} className={`slider__bar-container ${defaultIndex}`}>
                  <img  className='slider__bar-img' src={url} alt='' />
                </div>)
              )
            }
      </div>
    </div>
  )
}

export default SliderImages