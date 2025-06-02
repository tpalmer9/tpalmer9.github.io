document.addEventListener("DOMContentLoaded", function() {
    // HEADER Nav Bar
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll("header nav a");
    const headerOffset = 140;
    const slideshow = document.getElementById("slideshow");
    const aboutContent = document.getElementById("about-content");
    const homeLink = document.querySelector("nav a[href='#home']");
    const aboutLink = document.querySelector("nav a[href='#about']");

    // Scroll event for nav highlighting
    window.addEventListener("scroll", function() {
        let currentSection = "";

        sections.forEach(section => {
            const sectionTop = section.offsetTop - headerOffset;
            if (pageYOffset >= sectionTop) {
                currentSection = section.getAttribute("id");
            }
        });

        navLinks.forEach(link => {
            link.classList.remove("active");
            if (link.getAttribute("href").substring(1) === currentSection) {
                link.classList.add("active");
            }
        });
    });

    // Smooth scroll for navigation links
    navLinks.forEach(link => {
        link.addEventListener("click", function(event) {
            event.preventDefault();
            const targetId = link.getAttribute("href").substring(1);

            if (targetId === "home") {
                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });
            } else {
                const targetSection = document.getElementById(targetId);
                const h2 = targetSection.querySelector("h2");
                const elementPosition = h2.offsetTop - headerOffset;

                window.scrollTo({
                    top: elementPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    // Toggle between slideshow and about content on navbar link clicks
    aboutLink.addEventListener("click", function(event) {
        event.preventDefault();

        // Scroll to top before displaying the About content
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

        // Use a timeout to allow scrolling to finish before toggling content
        setTimeout(() => {
            slideshow.style.display = "none"; // Hide the slideshow
            aboutContent.style.display = "flex"; // Show the About content
            homeLink.classList.remove("active");
            aboutLink.classList.add("active");
        }, 500); // Adjust delay (in ms) as needed to match scroll duration
    });

    homeLink.addEventListener("click", function(event) {
        event.preventDefault();
        slideshow.style.display = "block"; // Show the slideshow
        aboutContent.style.display = "none"; // Hide the About content
        aboutLink.classList.remove("active");
        homeLink.classList.add("active");
    });

    // HOME Slideshow
    const slides = document.querySelectorAll(".slide");
    let currentIndex = 0;

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.style.opacity = i === index ? "1" : "0";
        });
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % slides.length; // Loop back to the first image
        showSlide(currentIndex);
    }

    showSlide(currentIndex); // Show the first slide initially
    setInterval(nextSlide, 5000); // Change slide every 5 seconds

});



// Select all grid items and the details box
const gridItems = document.querySelectorAll('.grid-item');
const detailsBox = document.querySelector('.details-box');
const detailsTitle = detailsBox.querySelector('.details-title');
const detailsDescription = detailsBox.querySelector('.details-description');

// Function to handle click event on grid items
gridItems.forEach(item => {
    item.addEventListener('click', function() {
        // Set active state to clicked item and hide others
        gridItems.forEach(el => el.classList.add('hidden'));
        this.classList.remove('hidden');
        this.classList.add('active');

        // Update details box content
        detailsTitle.textContent = this.dataset.title;

        // Get full description from the hidden .full-description div and set it in details box
        const fullDescriptionContent = this.querySelector('.full-description').innerHTML;
        detailsDescription.innerHTML = fullDescriptionContent;

        // Show and expand the details box
        detailsBox.classList.add('active');
    });
});

// Close button logic to reset view
document.getElementById('close-details').addEventListener('click', function() {
    // Reset grid items and hide details box
    gridItems.forEach(el => el.classList.remove('hidden', 'active'));
    detailsBox.classList.remove('active');
});


