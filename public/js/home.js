async function addComment(id) {
    try {
        
        const res = await fetch(`/api/blogs/:id`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
        console.log(body)
            location.href = `/comments/${id}`
    } catch (error) {
        console.error(error)
    }
    console.log(id);
};