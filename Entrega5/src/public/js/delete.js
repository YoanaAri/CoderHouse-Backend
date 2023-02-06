const id = document.querySelector('#id').value;
    
fetch(`/api/products/${id}`, {
    method: 'DELETE',
    headers: {
        'Content-Type': 'application/json',
    },
})
.then(res => res.json())
.then(data => {
    window.location.href = '/'
})
