// Sample scholarship data
const scholarshipsData = [
    {
        id: 1,
        university: "University of Toronto",
        country: "ca",
        deadline: "Application Deadline: March 15, 2024",
        description: "Full tuition scholarship for international students in Computer Science and Engineering programs. Includes living allowance and research opportunities."
    },
    {
        id: 2,
        university: "Harvard University",
        country: "us",
        deadline: "Application Deadline: January 1, 2024",
        description: "Merit-based scholarship covering full tuition and living expenses for outstanding graduate students in all fields of study."
    },
    {
        id: 3,
        university: "University of Oxford",
        country: "uk",
        deadline: "Application Deadline: October 15, 2023",
        description: "Rhodes Scholarship for exceptional students pursuing graduate degrees. Covers all university and college fees plus living allowance."
    },
    {
        id: 4,
        university: "Bocconi University",
        country: "italy",
        deadline: "Application Deadline: February 28, 2024",
        description: "International scholarship for Business and Economics programs. Partial tuition coverage with merit-based selection criteria."
    },
    {
        id: 5,
        university: "McGill University",
        country: "ca",
        deadline: "Application Deadline: January 31, 2024",
        description: "Entrance scholarship for international undergraduate students. Renewable based on academic performance."
    },
    {
        id: 6,
        university: "Stanford University",
        country: "us",
        deadline: "Application Deadline: December 1, 2023",
        description: "Knight-Hennessy Scholars program for graduate students. Full funding for up to three years of study in any field."
    },
    {
        id: 7,
        university: "University of Cambridge",
        country: "uk",
        deadline: "Application Deadline: December 5, 2023",
        description: "Gates Cambridge Scholarship for outstanding applicants from outside the UK pursuing graduate studies."
    },
    {
        id: 8,
        university: "University of Milan",
        country: "italy",
        deadline: "Application Deadline: April 30, 2024",
        description: "International student scholarship for STEM programs. Covers tuition fees and provides monthly stipend for living expenses."
    }
];

let currentFilter = 'all';

// Function to show loading modal
function showLoadingModal() {
    const modal = document.getElementById('loading-modal');
    if (modal) {
        modal.style.display = 'block';
    }
}

// Function to hide loading modal
function hideLoadingModal() {
    const modal = document.getElementById('loading-modal');
    if (modal) {
        modal.style.display = 'none';
    }
}

// Function to show success modal
function showSuccessModal() {
    const modal = document.getElementById('success-modal');
    if (modal) {
        modal.style.display = 'block';
    }
}

// Function to close success modal
function closeSuccessModal() {
    const modal = document.getElementById('success-modal');
    if (modal) {
        modal.style.display = 'none';
    }
}

// Function to create scholarship card element
function createScholarshipCard(scholarship, index) {
    const card = document.createElement('div');
    card.className = 'scholarship-card';
    card.style.animationDelay = `${index * 0.1}s`;

    const header = document.createElement('div');
    header.className = 'university-header';

    const flag = document.createElement('div');
    flag.className = `flag ${scholarship.country}`;

    const name = document.createElement('div');
    name.className = 'university-name';
    name.textContent = scholarship.university;

    header.appendChild(flag);
    header.appendChild(name);

    const deadline = document.createElement('div');
    deadline.className = 'deadline';
    deadline.textContent = scholarship.deadline;

    const description = document.createElement('div');
    description.className = 'scholarship-description';
    description.textContent = scholarship.description;

    const button = document.createElement('button');
    button.className = 'apply-btn';
    button.textContent = 'Apply Now';
    button.onclick = () => {
        alert(`Redirecting to ${scholarship.university} application portal...`);
    };

    card.appendChild(header);
    card.appendChild(deadline);
    card.appendChild(description);
    card.appendChild(button);

    return card;
}

// Function to load scholarships
async function loadScholarships(filter = 'all') {
    showLoadingModal();
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    const scholarshipsGrid = document.getElementById('scholarships-grid');
    if (!scholarshipsGrid) return;

    // Clear existing content
    scholarshipsGrid.innerHTML = '';

    // Filter scholarships based on country
    let filteredScholarships = scholarshipsData;
    if (filter !== 'all') {
        filteredScholarships = scholarshipsData.filter(scholarship => scholarship.country === filter);
    }

    // Add scholarship cards with staggered animation
    filteredScholarships.forEach((scholarship, index) => {
        const card = createScholarshipCard(scholarship, index);
        scholarshipsGrid.appendChild(card);
    });

    hideLoadingModal();
}

// Function to filter scholarships by country
function filterScholarships(country) {
    currentFilter = country;
    
    // Update active nav button
    const navButtons = document.querySelectorAll('.nav-btn');
    navButtons.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    
    // Update filter button
    updateFilterButton(country);
    
    loadScholarships(country);
}

// Function to show all scholarships
function showAllScholarships() {
    currentFilter = 'all';
    
    // Remove active class from nav buttons
    const navButtons = document.querySelectorAll('.nav-btn');
    navButtons.forEach(btn => btn.classList.remove('active'));
    
    // Update filter button
    updateFilterButton('all');
    
    loadScholarships('all');
}

// Function to update filter button text
function updateFilterButton(filter) {
    const filterBtn = document.querySelector('.filter-btn');
    if (filterBtn) {
        const countryNames = {
            'all': 'All Countries',
            'ca': 'Canada Only',
            'us': 'United States Only',
            'uk': 'United Kingdom Only',
            'italy': 'Italy Only'
        };
        filterBtn.textContent = countryNames[filter] || 'All Countries';
    }
}

// Function to handle form submission
function handleFormSubmit(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        program: formData.get('program'),
        message: formData.get('message')
    };
    
    // Simulate form submission
    console.log('Form submitted:', data);
    
    // Reset form
    event.target.reset();
    
    // Show success modal
    showSuccessModal();
}

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    // Load initial scholarships
    loadScholarships();
    
    // Set up form submission handler
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmit);
    }
    
    // Close modals when clicking outside
    window.addEventListener('click', function(event) {
        const loadingModal = document.getElementById('loading-modal');
        const successModal = document.getElementById('success-modal');
        
        if (event.target === loadingModal) {
            hideLoadingModal();
        }
        if (event.target === successModal) {
            closeSuccessModal();
        }
    });
});

// Smooth scrolling for navigation (if needed)
function smoothScroll(target) {
    document.querySelector(target).scrollIntoView({
        behavior: 'smooth'
    });
}