const lands = [
    {
        title: "Beautiful 10 Acres in Ball Ground",
        images: ["2.jpg", "3.jpg"],
        location: "Ball Ground, GA",
        price: 150000,
        size: 10,
        owner: "John Smith",
        email: "john.smith@example.com",
        description: "Gorgeous rolling land perfect for your dream home or farm."
    },
    {
        title: "5 Acres Near Savannah",
        images: ["3.jpg", "2.jpg"],
        location: "Savannah, GA",
        price: 95000,
        size: 5,
        owner: "Alice Johnson",
        email: "alice.johnson@example.com",
        description: "Wooded land minutes from downtown Savannah."
    }
];

// Only run listing if on index.html
if (document.getElementById('landList')) {
    const landList = document.getElementById('landList');

    lands.forEach((land, index) => {
        const card = document.createElement('div');
        card.className = 'land-card';
        card.onclick = () => {
            localStorage.setItem('selectedLand', JSON.stringify(land));
            window.location.href = 'details.html';
        };
        card.innerHTML = `
      <img src="${land.images[0]}" alt="${land.title}" class="land-image">
      <div class="land-details">
        <h3>${land.title}</h3>
        <p><strong>Location:</strong> ${land.location}</p>
        <p><strong>Price:</strong> $${land.price.toLocaleString()}</p>
      </div>
    `;
        landList.appendChild(card);
    });
}

// Only run details if on details.html
if (document.getElementById('detailsContent')) {
    const land = JSON.parse(localStorage.getItem('selectedLand'));
    const detailsContent = document.getElementById('detailsContent');
    const mainImage = document.getElementById('mainImage');
    const contactOwner = document.getElementById('contactOwner');

    detailsContent.innerHTML = `
    <h2>${land.title}</h2>
    <p><strong>Owner:</strong> ${land.owner}</p>
    <p><strong>Location:</strong> ${land.location}</p>
    <p><strong>Price:</strong> $${land.price.toLocaleString()}</p>
    <p><strong>Size:</strong> ${land.size} acres</p>
    <p>${land.description}</p>
  `;

    contactOwner.href = `mailto:${land.email}?subject=Inquiry about ${land.title}`;

    // Gallery logic
    let currentImage = 0;

    function showImage() {
        mainImage.src = land.images[currentImage];
    }

    function nextImage() {
        currentImage = (currentImage + 1) % land.images.length;
        showImage();
    }

    function prevImage() {
        currentImage = (currentImage - 1 + land.images.length) % land.images.length;
        showImage();
    }

    window.nextImage = nextImage;
    window.prevImage = prevImage;

    showImage();

    // Autoplay slideshow
    setInterval(nextImage, 3000); // Change every 3 seconds
}

function goBack() {
    window.location.href = 'index.html';
}
