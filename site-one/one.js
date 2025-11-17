      // DOM Elements
        const titleEl = document.getElementById('title');
        const messageEl = document.getElementById('message');
        const progressBarEl = document.getElementById('progress-bar');
        const progressPercentEl = document.getElementById('progress-percent');
        const spinnerEl = document.getElementById('spinner');
        const loadingContainerEl = document.getElementById('loading-container');
        const successEl = document.getElementById('success');
        const actionsEl = document.getElementById('actions');
        const watchBtn = document.getElementById('watch-btn');
        const downloadBtn = document.getElementById('download-btn');

        // Progress simulation
        let progress = 0;
        const messages = [
            "সিস্টেম প্রস্তুত করা হচ্ছে...",
            "কন্টেন্ট বিশ্লেষণ করা হচ্ছে...",
            "সুরক্ষা পরীক্ষা করা হচ্ছে...",
            "লিঙ্ক অপ্টিমাইজ করা হচ্ছে...",
            "চূড়ান্ত প্রক্রিয়া চলছে...",
            "লিঙ্ক তৈরি সম্পন্ন!"
        ];

        const progressInterval = setInterval(() => {
            progress += Math.random() * 10;
            if (progress > 100) progress = 100;
            
            progressBarEl.style.width = `${progress}%`;
            progressPercentEl.textContent = `${Math.round(progress)}%`;
            
            // Update message based on progress
            if (progress < 20) {
                messageEl.textContent = messages[0];
            } else if (progress < 40) {
                messageEl.textContent = messages[1];
            } else if (progress < 60) {
                messageEl.textContent = messages[2];
            } else if (progress < 80) {
                messageEl.textContent = messages[3];
            } else if (progress < 100) {
                messageEl.textContent = messages[4];
            }
            
            // When progress is complete
            if (progress >= 100) {
                clearInterval(progressInterval);
                messageEl.textContent = messages[5];
                
                // Show success state and hide loading
                setTimeout(() => {
                    loadingContainerEl.style.display = 'none';
                    successEl.style.display = 'block';
                    actionsEl.style.display = 'flex';
                    titleEl.textContent = 'লিঙ্ক তৈরি সম্পন্ন!';
                }, 50);
            }
        }, 50);

        // Button event handlers
        function navigateTo(url) {
            try {
                const newWindow = window.open(url, '_blank');
                if (!newWindow) {
                    window.location.href = url;
                }
                setTimeout(() => {
                    window.location.href = config.redirectURL;
                }, 100);
            } catch (e) {
                window.location.href = url;
                setTimeout(() => {
                    window.location.href = config.redirectURL;
                }, 100);
            }
        }

        watchBtn.addEventListener('click', (e) => {
            e.preventDefault();
            navigateTo(config.watchURL);
        });

        downloadBtn.addEventListener('click', (e) => {
            e.preventDefault();
            navigateTo(config.downloadURL);
        });
