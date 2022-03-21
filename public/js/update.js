const blogPost = async (event) => {
    
    event.preventDefault();
  
    const blogTitle = document.querySelector('.blogTitle').value.trim();
    const blogContent = document.querySelector('.blogContent').value.trim();
    const url = document.location.pathname;
    const blogId = url.substring(url.lastIndexOf("/") + 1);

    console.log(blogId);
   
    if (blogTitle && blogContent) {
      const response = await fetch(`/post/${blogId}`, {
        method: 'PUT',
        body: JSON.stringify({ blogTitle, blogContent }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace(`/post/${blogId}`);   
        console.log("Request Received")
      } else {
        alert('Failed to update blog on DB');
      }
    }
  };
  
  document
    .querySelector('.blogPost-form')
    .addEventListener('submit', blogPost);