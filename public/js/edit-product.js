document.addEventListener('click',async (e) => {
    if(e.target && e.target.classList.contains("btn-delete")){
        const [,id] = e.target.id.split('-')
        try {
            await fetch(`/api/products/${id}`,{
                method:'DELETE'
            })
        } catch (error) {
            console.log(error)
        }

    }
})