const wordEl=document.getElementById("word"),wrongLettersEl=document.getElementById("wrong-letters"),playAgainBtn=document.getElementById("play-again"),popup=document.getElementById("popup-container"),notification=document.getElementById("notification-container"),finalMessage=document.getElementById("final-message"),successAudio=document.getElementById("success"),failAudio=document.getElementById("fail"),figureParts=document.querySelectorAll(".figure-part"),words=["application","programming","interface","wizard"];let selectedWord=words[Math.floor(Math.random()*words.length)];const correctLetters=[],wrongLetters=[];function displayWord(){wordEl.innerHTML=`
        ${selectedWord.split("").map(e=>`
        <li class="letter">
            ${correctLetters.includes(e)?e:" "}
        </li>
        `).join("")}
    `;let e=wordEl.innerText.replace(/\n/g,"");e===selectedWord&&(finalMessage.innerHTML=`
    <h2>
        Congratulations! You won!
    </h2>
    <div class="icon-container">
        <lord-icon
            class="lord-icon"
            src="https://cdn.lordicon.com/ihyatngg.json"
            trigger="loop"
            delay="2000"
            colors="primary:#4be1ec,secondary:#cb5eee"
            style="width:250px;height:250px">
        </lord-icon>
    </div>
  `,popup.style.display="flex")}function updateWrongLettersEl(){wrongLettersEl.innerHTML=`
    ${wrongLetters.length>0?"<p>Wrong</p>":""}
    ${wrongLetters.map(e=>`<span>${e}</span>`)}
  `,figureParts.forEach((e,t)=>{let o=wrongLetters.length;t<o?e.style.display="block":e.style.display="none",wrongLetters.length===figureParts.length&&(finalMessage.innerHTML=`
        <h2>
            Unfortunately you lost.
          </h2>
          <div class="icon-container">
            <lord-icon
                class="lord-icon"
                src="https://cdn.lordicon.com/gclzwloa.json"
                trigger="loop"
                delay="2000"
                colors="primary:#4be1ec,secondary:#cb5eee"
                style="width:250px;height:250px">
            </lord-icon>
          </div>
        `,popup.style.display="flex")})}function showNotification(){notification.classList.add("show"),setTimeout(()=>{notification.classList.remove("show")},2e3)}window.addEventListener("keydown",e=>{if(e.keyCode>=65&&e.keyCode<=90){let t=e.key;selectedWord.includes(t)?correctLetters.includes(t)?showNotification():(correctLetters.push(t),successAudio.play(),displayWord()):wrongLetters.includes(t)?showNotification():(wrongLetters.push(t),failAudio.play(),updateWrongLettersEl())}}),playAgainBtn.addEventListener("click",()=>{correctLetters.splice(0),wrongLetters.splice(0),selectedWord=words[Math.floor(Math.random()*words.length)],displayWord(),updateWrongLettersEl(),popup.style.display="none"}),displayWord();