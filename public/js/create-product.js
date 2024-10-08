const createProduct = document.getElementById('create-product')

createProduct.addEventListener('submit',(e)=>{
    e.preventDefault()
    const formData = new FormData(createProduct)
    try {
        fetch('/api/products',{
            method:'POST',
            body:formData
        })
    } catch (error) {
        console.log(error)
    }
})