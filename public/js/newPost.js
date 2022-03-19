const blogPost = async (event) => {
    event.preventDefault();
  
    const blogTitle = document.querySelector('.blogTitle').value.trim();
    const blogContent = document.querySelector('.blogContent').value.trim();
  
    if (blogTitle && blogContent) {
      const response = await fetch('/blog', {
        method: 'POST',
        body: JSON.stringify({ blogTitle, blogContent }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace('/blog');
        console.log("Request Received")
      } else {
        alert('Failed to post blog to DB');
      }
    }
  };
  
  document
    .querySelector('.blogPost-form')
    .addEventListener('submit', blogPost);