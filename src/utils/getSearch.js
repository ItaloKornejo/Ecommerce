const getSearch = (products,search) => {
   switch(search[0]){
    case 'price': {
        // console.log(product.price>search[1], product.price<search[2]);
        return products.filter(product => (parseInt(product.price)>parseInt(search[1]) && parseInt(product.price)<parseInt(search[2])))
    }
    case 'category':  return products.filter(product => (product.category.name===search[1]))
    case 'word': {
        return products.map(product => {
            const productWord = product.title.toLocaleLowerCase()
            const wordSearch = search[1].toLocaleLowerCase()
            const equalWord = productWord.search(wordSearch)
            if(equalWord>=0){
                return product
            }else{
                return 
            }
        }).filter(item=>item)
        
    }
    default: return  products
    }
}
export default getSearch