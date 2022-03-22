const comment = document.querySelector(".hide")
const commentBtn = document.querySelector(".enableComment")
const url = document.location.pathname;
const blogId = url.substring(url.lastIndexOf("/") + 1);

commentBtn.addEventListener("click", function () {
    event.preventDefault();
    hide(commentBtn);    
    show(comment);    
});


function hide(element) {
    element.setAttribute("style", "display:none")
}


function show(element) {
    element.setAttribute("style", "display:inline")
}




const blogComment = async (event) => {

    event.preventDefault();
    const content = document.querySelector("#blog-comment").value.trim();
    console.log(content);

    
    console.log(blogId);
      
    if (content && blogId) {
      const response = await fetch(`./comment/${blogId}`, {
        method: "POST",
        body: JSON.stringify({ content, blogId }),
        headers: { "Content-Type": "application/json" },
      });
      if (response.ok) {
        
        alert("Your Comment has been published");
        document.location.reload();
      }
    }
};

  document
  .querySelector(".submitComment")
  .addEventListener('click', blogComment);
  
