async function editPage(id) {
    try {
        const blogObj = {
            "title": document.querySelector("#title").value,
            "body": document.querySelector("#body").value,
        }
        
        const res = await fetch(`/api/blogs/${id}`, {
            method: "PUT",
            body: JSON.stringify(blogObj),
            headers: {
                "Content-Type": "application/json"
            }
        })
            location.href = "/profile"
    } catch (error) {
        console.error(error)
    }
    console.log(id);
};

async function deletePost(id) {
    try {
        
        const res = await fetch(`/api/blogs/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        })
        location.href = "/profile"
    } catch (error) {
        console.error(error)
    }
}