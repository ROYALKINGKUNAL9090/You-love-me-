const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const question = document.getElementById('question');
const gif = document.getElementById('gif');

// Make the "No" button swap positions when hovered or clicked
noBtn.addEventListener('mouseover', moveButton);
noBtn.addEventListener('click', moveButton);

function moveButton() {
  const x = Math.floor(Math.random() * 200) - 100;
  const y = Math.floor(Math.random() * 100) - 50;
  noBtn.style.transform = `translate(${x}px, ${y}px)`;
}

// Action when "Yes" is clicked
yesBtn.addEventListener('click', () => {
  question.innerHTML = "I knew it 🥵";
  gif.src = "https://media.giphy.com/media/26hpUreAnP8i8sA5q/giphy.gif"; // Success GIF
  noBtn.style.display = 'none';
  yesBtn.style.display = 'none';
});