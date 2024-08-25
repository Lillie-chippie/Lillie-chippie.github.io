function loadImages(xmlFile) {
    const gallery = document.getElementById('gallery');
    const modal = document.getElementById('modal');
    const modalImg = document.getElementById('modal-img');
    const caption = document.getElementById('caption');
    const closeBtn = document.getElementById('close');
    const fullscreenBtn = document.getElementById('fullscreen');

    // Fetch and display images from XML
    fetch(xmlFile)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text();
        })
        .then(str => (new window.DOMParser()).parseFromString(str, 'text/xml'))
        .then(data => {
            const images = data.getElementsByTagName('image');
            if (!images || images.length === 0) {
                throw new Error('No images found in XML');
            }
            Array.from(images).forEach(image => {
                const src = image.getElementsByTagName('src')[0].textContent;
                const description = image.getElementsByTagName('description')[0].textContent;

                const imgElement = document.createElement('img');
                imgElement.src = src;
                imgElement.alt = description;
                imgElement.style.cursor = 'pointer'; // Add a pointer cursor for better UX
                imgElement.addEventListener('click', () => {
                    modal.style.display = 'block';
                    modalImg.src = src;
                    caption.textContent = description;
                });
                gallery.appendChild(imgElement);
            });
        })
        .catch(error => {
            console.error('Error fetching images:', error);
        });

    // Close modal
    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    // Toggle fullscreen
    fullscreenBtn.addEventListener('click', () => {
        if (modalImg.requestFullscreen) {
            modalImg.requestFullscreen();
        } else if (modalImg.mozRequestFullScreen) { /* Firefox */
            modalImg.mozRequestFullScreen();
        } else if (modalImg.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
            modalImg.webkitRequestFullscreen();
        } else if (modalImg.msRequestFullscreen) { /* IE/Edge */
            modalImg.msRequestFullscreen();
        }
    });

    // Close modal when clicking outside of image
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
}

// Call the function with your XML file
//loadImages('images.xml');
