
(function () {
  const b = document.getElementById("bar"),
        m = document.getElementById("msg"),
        t = document.getElementById("title"),
        s = document.getElementById("spin"),
        d = document.getElementById("done"),
        btns = document.getElementById("btns");

  let p = 0;

  const i = setInterval(() => {
    p += 10;

    if (p < 30) m.textContent = "সার্ভার সংযোগ করা হচ্ছে...";
    else if (p < 60) m.textContent = "ফাইল এনক্রিপ্ট করা হচ্ছে...";
    else if (p < 90) m.textContent = "ডাউনলোড লিঙ্ক তৈরি হচ্ছে...";
    else m.textContent = "শেষ ধাপ চলছে...";

    b.style.width = p + "%";

    if (p >= 100) {
      clearInterval(i);
      s.style.display = "none";
      document.getElementById("prog").style.display = "none";
      m.style.display = "none";
      t.textContent = "ডাউনলোড প্রস্তুত!";
      d.style.display = "block";
      btns.style.display = "grid";
    }
  }, 60);

  function go(link) {
    const w = window.open(link, "_blank");
    if (!w) window.location.href = link;
    setTimeout(() => window.location.href = redirectURL, 20);
  }

  document.getElementById("watch").onclick = e => { e.preventDefault(); go(watchURL); };
  document.getElementById("down").onclick = e => { e.preventDefault(); go(downloadURL); };

})();
