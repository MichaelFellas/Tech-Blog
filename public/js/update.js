const blogPost = async (event) => {
    
    event.preventDefault();
  
    const blogTitle = document.querySelector('.blogTitle').value.trim();
    const blogContent = document.querySelector('.blogContent').value.trim();
   
    if (blogTitle && blogContent) {
      const response = await fetch('/post/3', {
        method: 'PUT',
        body: JSON.stringify({ blogTitle, blogContent }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace('/post/3');   
        console.log("Request Received")
      } else {
        alert('Failed to update blog on DB');
      }
    }
  };
  
  document
    .querySelector('.blogPost-form')
    .addEventListener('submit', blogPost);