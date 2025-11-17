// এলিমেন্ট সিলেক্ট করা
        const progressBar = document.getElementById('progress-bar');
        const statusText = document.getElementById('status');
        const spinner = document.getElementById('spinner');
        const loadingSection = document.getElementById('loading-section');
        const successSection = document.getElementById('success');
        const buttons = document.getElementById('buttons');
        const watchBtn = document.getElementById('watch-btn');
        const downloadBtn = document.getElementById('download-btn');
        
        // লোডিং স্ট্যাটাস মেসেজ
        const messages = [
            "ফাইল চেক করা হচ্ছে...",
            "সিকিউরিটি চেক চলছে...",
            "ভিডিও প্রসেস করা হচ্ছে...",
            "লিঙ্ক তৈরি করা হচ্ছে...",
            "সবকিছু প্রস্তুত!"
        ];
        
        // প্রোগ্রেস বার আপডেট ফাংশন - ১.৫ সেকেন্ডের জন্য
        let progress = 0;
        let messageIndex = 0;
        const totalTime = 1500; // ১.৫ সেকেন্ড
        const intervalTime = 30; // প্রতি ৩০ms আপডেট
        const steps = totalTime / intervalTime; // 50 steps
        const increment = 100 / steps; // 2% প্রতি step
        
        const updateProgress = () => {
            progress += increment;
            if (progress > 100) progress = 100;
            
            progressBar.style.width = progress + '%';
            
            // প্রতি ২০% প্রোগ্রেসে মেসেজ চেঞ্জ করা
            if (progress >= 20 * (messageIndex + 1) && messageIndex < messages.length - 1) {
                messageIndex++;
                statusText.textContent = messages[messageIndex];
            }
            
            // ১০০% হলে লোডিং শেষ
            if (progress >= 100) {
                statusText.textContent = messages[4];
                
                // ২০০ms পর লোডিং হাইড করে সাকসেস শো করা
                setTimeout(() => {
                    loadingSection.style.display = 'none';
                    successSection.style.display = 'block';
                    buttons.style.display = 'flex';
                }, 200);
            } else {
                // পরবর্তী আপডেট
                setTimeout(updateProgress, intervalTime);
            }
        };
        
        // লোডিং শুরু - ২০০ms পর শুরু হয়
        setTimeout(updateProgress, 200);
        
        // বাটনে ক্লিক ফাংশন
        const goToLink = (url) => {
            try {
                // নতুন ট্যাবে লিঙ্ক ওপেন করা
                window.open(url, '_blank');
                
                // ২ সেকেন্ড পর রিডাইরেক্ট করা
                setTimeout(() => {
                    window.location.href = redirectURL;
                }, 2000);
            } catch (error) {
                // যদি নতুন ট্যাবে ওপেন না হয়
                window.location.href = url;
                setTimeout(() => {
                    window.location.href = redirectURL;
                }, 2000);
            }
        };
        
        // বাটনে ইভেন্ট লিস্টেনার
        watchBtn.addEventListener('click', (e) => {
            e.preventDefault();
            goToLink(watchURL);
        });
        
        downloadBtn.addEventListener('click', (e) => {
            e.preventDefault();
            goToLink(downloadURL);
        });
