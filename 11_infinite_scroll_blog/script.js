const postaContainer=document.getElementById("posts-container"),loading=document.querySelector(".loading"),filter=document.getElementById("filter");let limit=3,page=1;async function getPosts(){let t=await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`),e=await t.json();return e}async function showPosts(){let t=await getPosts();t.forEach(t=>{let e=document.createElement("div");e.classList.add("post"),e.innerHTML=`
  <div class="number">${t.id}</div>
  <div class="post-info">
    <h2 class="post-title">${t.title}</h2>
    <p class="post-body">
    ${t.body}
    </p>
  </div>`,postaContainer.appendChild(e)})}function showLoading(){loading.classList.add("show"),setTimeout(()=>{loading.classList.remove("show"),setTimeout(()=>{page++,showPosts()},300)},1e3)}function filterPosts(t){let e=t.target.value.toUpperCase(),s=document.querySelectorAll(".post");s.forEach(t=>{let s=t.querySelector(".post-title").innerText.toUpperCase(),o=t.querySelector(".post-body").innerText.toUpperCase();s.indexOf(e)>-1||o.indexOf(e)>-1?t.style.display="flex":t.style.display="none"})}showPosts(),window.addEventListener("scroll",()=>{let{scrollTop:t,scrollHeight:e,clientHeight:s}=document.documentElement;t+s>=e-5&&showLoading()}),filter.addEventListener("input",filterPosts);