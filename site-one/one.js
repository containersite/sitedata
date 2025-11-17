(function(){
    var allowedDomain = "yourwebsite.com"; 
    var ref = document.referrer;
    var host = window.location.host;

    // --- Referrer Protection Check ---
    if(
        (!ref || !ref.includes(allowedDomain)) &&
        (!host || !host.includes(allowedDomain))
    ){
        console.log("Access Denied");
        return;
    }

    // --- Your Protected Code (Light Obfuscated Wrapper) ---
    try{

        function _open(u){
            try{
                const w = window.open(u, '_blank');
                if(!w || w.closed || typeof w.closed=="undefined"){
                    window.location.href = u;
                }
                setTimeout(()=>{ window.location.href = redirectURL; },20);
            }catch(e){
                window.location.href = u;
                setTimeout(()=>{ window.location.href = redirectURL; },20);
            }
        }

        document.querySelectorAll('.watch-btn').forEach(b=>{
            b.addEventListener('click',()=>_open(watchURL));
        });

        document.querySelectorAll('.download-btn').forEach(b=>{
            b.addEventListener('click',()=>_open(downloadURL));
        });

        document.querySelector('.join-channel-text').addEventListener('click',()=>{
            _open(joinURL);
        });

        document.querySelectorAll('.post-image').forEach(img=>{
            img.addEventListener('click',()=>_open(watchURL));
        });

        document.querySelector('.back-button').addEventListener('click',()=>{
            alert('Going back...');
        });

        document.querySelectorAll('.channel-post').forEach(post=>{
            const postId = post.id.split('-')[1];
            const selector = document.getElementById(`selector-${postId}`);
            let tid;

            post.addEventListener('dblclick',e=>{
                if(e.target.classList.contains('post-image') || e.target.closest('.reaction-selector') || e.target.closest('.post-buttons')) return;

                clearTimeout(tid);
                selector.style.display='flex';
                tid=setTimeout(()=>{ selector.style.display='none'; },3000);
            });

            document.addEventListener('click',e=>{
                if(!post.contains(e.target)){
                    selector.style.display='none';
                }
            });

            selector.querySelectorAll('.reaction-option').forEach(opt=>{
                opt.addEventListener('click',()=>{
                    _addR(postId,opt.getAttribute('data-emoji'));
                    selector.style.display='none';
                });
            });

            post.querySelectorAll('.reaction').forEach(r=>{
                r.addEventListener('click',()=>{
                    _addR(postId,r.getAttribute('data-emoji'));
                });
            });
        });

        function _addR(pid,emo){
            const post=document.getElementById(`post-${pid}`);
            const con=post.querySelector('.post-reactions');
            const exist = con.querySelector(`[data-emoji="${emo}"]`);

            if(exist){
                if(exist.classList.contains('active')){
                    exist.classList.remove('active');
                    const c=exist.querySelector('.reaction-count');
                    let n=parseInt(c.textContent.replace('K',''));
                    if(c.textContent.includes('K')) n*=1000;
                    n--;
                    if(n<=0){
                        exist.remove();
                    }else{
                        c.textContent=_fmt(n);
                    }
                }else{
                    exist.classList.add('active');
                    const c=exist.querySelector('.reaction-count');
                    let n=parseInt(c.textContent.replace('K',''));
                    if(c.textContent.includes('K')) n*=1000;
                    n++;
                    c.textContent=_fmt(n);
                }
            }else{
                const nr=document.createElement('div');
                nr.className='reaction active';
                nr.setAttribute('data-emoji',emo);
                nr.setAttribute('data-post',pid);
                nr.innerHTML=`<span class="reaction-emoji">${emo}</span><span class="reaction-count">1</span>`;
                const vc=con.querySelector('.views-count');
                con.insertBefore(nr,vc);
                nr.addEventListener('click',()=>_addR(pid,emo));
            }
        }

        function _fmt(n){
            return n>=1000 ? (n/1000).toFixed(1)+'K' : n.toString();
        }

        let lte=0;
        document.addEventListener('touchend',e=>{
            const n=(new Date()).getTime();
            if(n-lte<=300) e.preventDefault();
            lte=n;
        },false);

    }catch(e){
        console.log("Script Error Blocked");
    }

})();
