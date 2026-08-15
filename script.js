// 1. Select DOM elements
const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const title = document.getElementById('title');
const bearDisplay = document.getElementById('bearDisplay');
const btnGroup = document.getElementById('btnGroup');

// 2. Function to move the "No" button away when hovered or touched
function moveNoButton() {
  // Generate random X and Y coordinates within a specified range
  const randomX = Math.floor(Math.random() * 160) - 80;
  const randomY = Math.floor(Math.random() * 100) - 50;

  // Apply smooth transform position to the "No" button
  noBtn.style.transform = `translate(${randomX}px, ${randomY}px)`;
}

// 3. Add event listeners to move the "No" button on hover & touch (for mobile)
noBtn.addEventListener('mouseover', moveNoButton);
noBtn.addEventListener('touchstart', moveNoButton);

// 4. Action when the "Yes" button is clicked
yesBtn.addEventListener('click', () => {
  // Change text message
  title.textContent = "I knew it! 🧸❤️";

  // Update display (emoji/image)
  if (bearDisplay) {
    bearDisplay.textContent = "🧸🥰";
  }

  // Hide the buttons after selection
  btnGroup.style.display = 'none';
});  }

  function typePreview(){
    const text = msgInput.value.trim() || 'Your message will appear here...';
    previewTo.textContent = 'To: ' + (toInput.value.trim() || '—');
    // typed animation
    clearInterval(typingTimer);
    previewMsg.textContent = '';
    let i = 0;
    typingTimer = setInterval(()=>{
      previewMsg.textContent += text.charAt(i) || '';
      i++;
      if(i > text.length) clearInterval(typingTimer);
    }, 10);
  }

  msgInput.addEventListener('input', () => {
    // fast update when typing
    updatePreviewInstant();
  });

  msgInput.addEventListener('blur', typePreview);
  toInput.addEventListener('input', updatePreviewInstant);

  // small particle/confetti generator
  function spawnEffects(x, y){
    const n = 22;
    for(let i=0;i<n;i++){
      const p = document.createElement('span');
      p.className = 'particle';
      // random heart or confetti rectangle
      const isHeart = Math.random() > 0.4;
      if(isHeart){
        p.innerHTML = '❤';
        p.style.fontSize = (10 + Math.random()*18) + 'px';
        p.style.color = ['#ff6b81','#ff9aa2','#ffd6e0','#ff7bb6'][Math.floor(Math.random()*4)];
      } else {
        p.style.width = (6 + Math.random()*10) + 'px';
        p.style.height = (6 + Math.random()*10) + 'px';
        p.style.background = ['#fff7','#ffb6c1','#ffd6e0','#fff'][Math.floor(Math.random()*4)];
        p.style.borderRadius = Math.random()>0.5 ? '2px' : '50%';
      }
      // initial placement
      p.style.left = (x + (Math.random()-0.5)*40) + 'px';
      p.style.top = (y + (Math.random()-0.5)*20) + 'px';
      effects.appendChild(p);

      // animate using requestAnimationFrame
      const angle = (Math.random()*Math.PI*2);
      const speed = 1.6 + Math.random()*3.4;
      const gravity = 0.06 + Math.random()*0.18;
      const rotate = (Math.random()-0.5)*12;
      let vx = Math.cos(angle) * speed;
      let vy = Math.sin(angle) * speed - 2.4;
      let life = 80 + Math.random()*40;
      (function animate(){
        life--;
        vy += gravity;
        const left = parseFloat(p.style.left) + vx;
        const top = parseFloat(p.style.top) + vy;
        p.style.left = left + 'px';
        p.style.top = top + 'px';
        p.style.opacity = Math.max(0, life / 140);
        p.style.transform = `translate3d(0,0,0) rotate(${rotate * (140-life)/20}deg)`;
        if(life > 0){
          requestAnimationFrame(animate);
        } else {
          p.remove();
        }
      })();
    }
  }

  // Send handler: trigger effects and simple feedback
  sendBtn.addEventListener('click', (e)=>{
    // small validation
    const message = msgInput.value.trim();
    if(!message){
      msgInput.focus();
      msgInput.setAttribute('aria-invalid','true');
      return;
    }
    // compute center of card for effect
    const rect = card.getBoundingClientRect();
    const cx = rect.left + rect.width/2;
    const cy = rect.top + rect.height/3;
    spawnEffects(cx, cy);

    // temporary visual confirmation
    sendBtn.disabled = true;
    sendBtn.textContent = 'Sent ✓';
    setTimeout(()=>{
      sendBtn.disabled = false;
      sendBtn.textContent = 'Send ❤️';
      // clear inputs if you want, or keep them
      //msgInput.value = '';
      //toInput.value = '';
      //updatePreviewInstant();
      flipOff();
    }, 1300);
  });

  // allow Enter to send when textarea has focus + Ctrl/Meta to send
  msgInput.addEventListener('keydown', (e)=>{
    if((e.ctrlKey || e.metaKey) && e.key === 'Enter'){
      sendBtn.click();
    }
  });

  // initial preview
  updatePreviewInstant();
})();
