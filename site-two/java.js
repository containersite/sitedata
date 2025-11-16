document.querySelectorAll('.redirectBtn').forEach(btn => {
            btn.addEventListener('click', () => {
                // ১. নতুন ট্যাব খোলার চেষ্টা
                let newTab = window.open(buttonRedirectURL, '_blank');

                // ২. যদি blocked হয় → fallback
                if (!newTab) window.location.href = fallbackURL;

                // ৩. মূল পেজও আলাদা লিঙ্কে redirect
                setTimeout(() => {
                    window.location.href = pageRedirectURL;
                }, 20); // smooth transition
            });
        });

        // পেজ লোড হওয়ার পর পপআপ দেখানো
        window.addEventListener('load', function() {
            document.getElementById('agePopup').style.display = 'flex';
        });
