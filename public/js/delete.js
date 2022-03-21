const deleteButton = document.querySelector(".delete");
const url = document.location.pathname;
const blogId = url.substring(url.lastIndexOf("/") + 1);


async function deletePost() {
    if (confirm("Are you sure you want to delete this post?")) {
      const response = await fetch(`/post/${blogId}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });
      if (response.ok) {
        
        console.log("woo")
      }
    }
}

deleteButton.addEventListener("click", deletePost);