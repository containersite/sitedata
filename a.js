export default {
    async fetch(request) {
      const allowedDomains = [
        "dgserfwer3.blogspot.com",
        "example.com",
        "testsite.net",
        "mysite.xyz",
        "myothersite.org"
      ];
  
      const url = new URL(request.url);
      const referer = request.headers.get("Referer") || "";
  
      // Referrer check
      if (!allowedDomains.some(d => referer.includes(d))) {
        if (url.pathname === "/js") {
          return new Response("/* Access Denied */", { status: 403, headers: { "content-type": "text/javascript" } });
        } else if (url.pathname === "/css") {
          return new Response("/* Access Denied */", { status: 403, headers: { "content-type": "text/css" } });
        } else {
          return new Response("Access Denied", { status: 403 });
        }
      }
  
      // Route JS
      if (url.pathname === "/js") {
        const githubJS = "https://containersite.github.io/sitedata/site-one/one.js";
        const res = await fetch(githubJS);
        const js = await res.text();
  
        // Send JS directly, no eval
        return new Response(js, {
          headers: { "content-type": "text/javascript", "Cache-Control": "no-store" }
        });
      }
  
      // Route CSS
      if (url.pathname === "/css") {
        const githubCSS = "https://containersite.github.io/sitedata/site-one/one.css";
        const res = await fetch(githubCSS);
        const css = await res.text();
  
        return new Response(css, {
          headers: { "content-type": "text/css", "Cache-Control": "no-store" }
        });
      }
  
      // Default response for other routes
      return new Response("Not Found", { status: 404 });
    }
  };
  
