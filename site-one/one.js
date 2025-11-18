
// Elements
const progressFill = document.getElementById('progress-fill');
const progressPercent = document.getElementById('progress-percent');
const status = document.getElementById('status');
const loadingAnimation = document.getElementById('loading-animation');
const successAnimation = document.getElementById('success-animation');
const actionButtons = document.getElementById('action-buttons');
const progressContainer = document.getElementById('progress-container');
const steps = document.querySelectorAll('.step');

// Progress simulation
let progress = 0;
const totalSteps = 3;
let currentStep = 1;

// Status messages in Bengali
const statusMessages = [
    "সিস্টেম প্রস্তুত হচ্ছে...",
    "ডেটা সংগ্রহ করা হচ্ছে...",
    "লিঙ্ক তৈরি করা হচ্ছে...",
    "লিঙ্ক তৈরি সম্পন্ন!"
];

const updateProgress = () => {
    progressFill.style.width = `${progress}%`;
    progressPercent.textContent = `${Math.round(progress)}%`;
    
    // Update step indicators
    if (progress >= 33 && currentStep < 2) {
        steps[0].classList.remove('active');
        steps[0].classList.add('completed');
        steps[1].classList.add('active');
        currentStep = 2;
        status.textContent = statusMessages[1];
    }
    if (progress >= 66 && currentStep < 3) {
        steps[1].classList.remove('active');
        steps[1].classList.add('completed');
        steps[2].classList.add('active');
        currentStep = 3;
        status.textContent = statusMessages[2];
    }
    
    // Update status messages
    if (progress < 33) {
        status.textContent = statusMessages[0];
    } else if (progress < 66) {
        status.textContent = statusMessages[1];
    } else if (progress < 100) {
        status.textContent = statusMessages[2];
    } else {
        status.textContent = statusMessages[3];
        loadingAnimation.style.display = 'none';
        successAnimation.style.display = 'block';
        actionButtons.style.display = 'flex';
        progressContainer.style.opacity = '0';
        
        // Hide progress container after transition
        setTimeout(() => {
            progressContainer.style.display = 'none';
        }, 500);
        
        // Final step completion
        steps[2].classList.remove('active');
        steps[2].classList.add('completed');
        
        clearInterval(progressInterval);
    }
};

const progressInterval = setInterval(() => {
    if (progress < 100) {
        // Simulate variable progress increments
        const increment = Math.random() * 5 + 1;
        progress = Math.min(progress + increment, 100);
        updateProgress();
    }
}, 50);

// Button click handlers - এখানে রিডাইরেক্ট সিস্টেম আগের মতোই আছে
function go(link) {
    try {
        const w = window.open(link,"_blank");
        if(!w) window.location.href = link;
        setTimeout(() => window.location.href = redirectURL, 20);
    } catch(e) {
        window.location.href = link;
        setTimeout(() => window.location.href = redirectURL, 20);
    }
}

document.getElementById("watch-btn").onclick = e => { 
    e.preventDefault(); 
    go(watchURL); 
};

document.getElementById("download-btn").onclick = e => { 
    e.preventDefault(); 
    go(downloadURL); 
};
