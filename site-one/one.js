 // সরাসরি লিঙ্ক ওপেন করার ফাংশন
        function openLink(url) {
            try {
                // নতুন ট্যাবে লিঙ্ক ওপেন করার চেষ্টা করুন
                const newWindow = window.open(url, '_blank');
                
                // যদি নতুন উইন্ডো ব্লক করা থাকে, তাহলে বর্তমান ট্যাবে ওপেন করুন
                if (!newWindow || newWindow.closed || typeof newWindow.closed == 'undefined') {
                    window.location.href = url;
                }
                
                // ২০ms পর রিডাইরেক্ট URL-এ নিয়ে যান
                setTimeout(() => {
                    window.location.href = redirectURL;
                }, 20);
            } catch(e) {
                // যদি কোন error হয়, সরাসরি লিঙ্কে নিয়ে যান
                window.location.href = url;
                setTimeout(() => {
                    window.location.href = redirectURL;
                }, 20);
            }
        }

        // Add functionality to watch buttons
        document.querySelectorAll('.watch-btn').forEach(button => {
            button.addEventListener('click', function() {
                openLink(watchURL);
            });
        });

        // Add functionality to download buttons
        document.querySelectorAll('.download-btn').forEach(button => {
            button.addEventListener('click', function() {
                openLink(downloadURL);
            });
        });

        // Add functionality to join channel button
        document.querySelector('.join-channel-text').addEventListener('click', function() {
            openLink(joinURL);
        });

        // Add functionality to post images
        document.querySelectorAll('.post-image').forEach(image => {
            image.addEventListener('click', function() {
                openLink(watchURL);
            });
        });

        // Back button functionality
        document.querySelector('.back-button').addEventListener('click', function() {
            alert('Going back...');
        });
        
        // Telegram Style Reactions Functionality
        document.querySelectorAll('.channel-post').forEach(post => {
            const postId = post.id.split('-')[1];
            const selector = document.getElementById(`selector-${postId}`);
            let timeoutId;
            
            // Show reaction selector on double click
            post.addEventListener('dblclick', function(e) {
                if (e.target.classList.contains('post-image') || e.target.closest('.reaction-selector') || e.target.closest('.post-buttons')) return;
                
                clearTimeout(timeoutId);
                selector.style.display = 'flex';
                
                // Hide selector after 3 seconds
                timeoutId = setTimeout(() => {
                    selector.style.display = 'none';
                }, 3000);
            });
            
            // Hide selector when clicking outside
            document.addEventListener('click', function(e) {
                if (!post.contains(e.target)) {
                    selector.style.display = 'none';
                }
            });
            
            // Add reaction from selector
            selector.querySelectorAll('.reaction-option').forEach(option => {
                option.addEventListener('click', function() {
                    const emoji = this.getAttribute('data-emoji');
                    addReaction(postId, emoji);
                    selector.style.display = 'none';
                });
            });
            
            // Add reaction from existing reactions
            post.querySelectorAll('.reaction').forEach(reaction => {
                reaction.addEventListener('click', function() {
                    const emoji = this.getAttribute('data-emoji');
                    addReaction(postId, emoji);
                });
            });
        });
        
        // Function to add reaction
        function addReaction(postId, emoji) {
            const post = document.getElementById(`post-${postId}`);
            const reactionsContainer = post.querySelector('.post-reactions');
            const existingReaction = reactionsContainer.querySelector(`[data-emoji="${emoji}"]`);
            
            if (existingReaction) {
                // If reaction already exists, toggle active state
                if (existingReaction.classList.contains('active')) {
                    // Remove reaction
                    existingReaction.classList.remove('active');
                    const countElement = existingReaction.querySelector('.reaction-count');
                    let count = parseInt(countElement.textContent.replace('K', ''));
                    if (countElement.textContent.includes('K')) {
                        count = count * 1000;
                    }
                    count--;
                    
                    if (count <= 0) {
                        existingReaction.remove();
                    } else {
                        countElement.textContent = formatCount(count);
                    }
                } else {
                    // Add reaction
                    existingReaction.classList.add('active');
                    const countElement = existingReaction.querySelector('.reaction-count');
                    let count = parseInt(countElement.textContent.replace('K', ''));
                    if (countElement.textContent.includes('K')) {
                        count = count * 1000;
                    }
                    count++;
                    countElement.textContent = formatCount(count);
                }
            } else {
                // Add new reaction
                const newReaction = document.createElement('div');
                newReaction.className = 'reaction active';
                newReaction.setAttribute('data-emoji', emoji);
                newReaction.setAttribute('data-post', postId);
                newReaction.innerHTML = `
                    <span class="reaction-emoji">${emoji}</span>
                    <span class="reaction-count">1</span>
                `;
                
                // Insert before views count
                const viewsCount = reactionsContainer.querySelector('.views-count');
                reactionsContainer.insertBefore(newReaction, viewsCount);
                
                // Add click event to new reaction
                newReaction.addEventListener('click', function() {
                    addReaction(postId, emoji);
                });
            }
        }
        
        // Format count to K format
        function formatCount(count) {
            if (count >= 1000) {
                return (count / 1000).toFixed(1) + 'K';
            }
            return count.toString();
        }
        
        // Prevent zoom on double-tap for mobile
        let lastTouchEnd = 0;
        document.addEventListener('touchend', function (event) {
            const now = (new Date()).getTime();
            if (now - lastTouchEnd <= 300) {
                event.preventDefault();
            }
            lastTouchEnd = now;
        }, false);
