// script.js
document.addEventListener('DOMContentLoaded', function() {
    // Mobile navigation toggle functionality
    const navToggle = document.createElement('button');
    navToggle.className = 'nav-toggle';
    navToggle.innerHTML = '<span></span><span></span><span></span>';
    
    const nav = document.querySelector('nav');
    nav.appendChild(navToggle);
    
    navToggle.addEventListener('click', function() {
        document.querySelector('nav ul').classList.toggle('show');
    });
    
    // Form validation
    const newsletterForm = document.querySelector('.newsletter form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value.trim();
            
            if (!isValidEmail(email)) {
                showError(emailInput, 'Please enter a valid email address');
            } else {
                // Simulating form submission
                showSuccess(emailInput, 'Thank you for subscribing!');
                this.reset();
            }
        });
    }
    
    // Recipe rating system (for recipe pages)
    const ratingStars = document.querySelectorAll('.rating-star');
    if (ratingStars.length > 0) {
        ratingStars.forEach(star => {
            star.addEventListener('click', function() {
                const value = this.getAttribute('data-value');
                setRating(value);
            });
            
            star.addEventListener('mouseover', function() {
                const value = this.getAttribute('data-value');
                highlightRating(value);
            });
            
            star.addEventListener('mouseout', function() {
                resetRating();
            });
        });
    }
    
    // Comment form (for recipe pages)
    const commentForm = document.querySelector('.comment-form');
    if (commentForm) {
        commentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const nameInput = this.querySelector('input[name="name"]');
            const commentInput = this.querySelector('textarea[name="comment"]');
            
            if (nameInput.value.trim() === '') {
                showError(nameInput, 'Please enter your name');
                return;
            }
            
            if (commentInput.value.trim() === '') {
                showError(commentInput, 'Please enter your comment');
                return;
            }
            
            addComment(nameInput.value, commentInput.value);
            this.reset();
        });
    }
});

// Helper functions
function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function showError(input, message) {
    // Remove any existing error messages
    const parent = input.parentElement;
    const existingError = parent.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    
    // Add error class and message
    input.classList.add('error');
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    parent.appendChild(errorDiv);
    
    // Remove error after 3 seconds
    setTimeout(() => {
        if (errorDiv.parentElement) {
            errorDiv.remove();
            input.classList.remove('error');
        }
    }, 3000);
}

function showSuccess(input, message) {
    // Remove any existing messages
    const parent = input.parentElement;
    const existingMessage = parent.querySelector('.success-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // Add success class and message
    input.classList.add('success');
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.textContent = message;
    parent.appendChild(successDiv);
    
    // Remove message after 3 seconds
    setTimeout(() => {
        if (successDiv.parentElement) {
            successDiv.remove();
            input.classList.remove('success');
        }
    }, 3000);
}

function setRating(value) {
    const ratingInput = document.querySelector('input[name="rating"]');
    if (ratingInput) {
        ratingInput.value = value;
    }
    
    const ratingStars = document.querySelectorAll('.rating-star');
    ratingStars.forEach(star => {
        const starValue = star.getAttribute('data-value');
        if (starValue <= value) {
            star.classList.add('active');
        } else {
            star.classList.remove('active');
        }
    });
}

function highlightRating(value) {
    const ratingStars = document.querySelectorAll('.rating-star');
    ratingStars.forEach(star => {
        const starValue = star.getAttribute('data-value');
        if (starValue <= value) {
            star.classList.add('hover');
        } else {
            star.classList.remove('hover');
        }
    });
}

function resetRating() {
    const ratingInput = document.querySelector('input[name="rating"]');
    const value = ratingInput ? ratingInput.value : 0;
    
    const ratingStars = document.querySelectorAll('.rating-star');
    ratingStars.forEach(star => {
        star.classList.remove('hover');
        
        const starValue = star.getAttribute('data-value');
        if (starValue <= value) {
            star.classList.add('active');
        } else {
            star.classList.remove('active');
        }
    });
}

function addComment(name, comment) {
    const commentsList = document.querySelector('.comments-list');
    if (!commentsList) return;
    
    const commentItem = document.createElement('div');
    commentItem.className = 'comment';
    
    const commentHeader = document.createElement('div');
    commentHeader.className = 'comment-header';
    
    const commentName = document.createElement('h4');
    commentName.textContent = name;
    
    const commentDate = document.createElement('span');
    commentDate.className = 'comment-date';
    commentDate.textContent = new Date().toLocaleDateString();
    
    commentHeader.appendChild(commentName);
    commentHeader.appendChild(commentDate);
    
    const commentContent = document.createElement('p');
    commentContent.textContent = comment;
    
    commentItem.appendChild(commentHeader);
    commentItem.appendChild(commentContent);
    
    commentsList.appendChild(commentItem);
}