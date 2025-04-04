let spells;
let input;

async function setup() {
  createCanvas(400, 600);
  
  const spellsRes = await fetch('https://hp-api.onrender.com/api/spells');
  spells = await spellsRes.json();
  setupUI();
}

function setupUI() {
  input = createInput('');
  input.position(20, 20);
  input.input(handleInput);
}

function handleInput() {
  const spellName = input.value().toLowerCase();
  const matchedSpells = spells.filter(s => s.name.toLowerCase().includes(spellName));
  
  if (spellName.length > 0 && matchedSpells.length > 0) {
    background(240);
    fill(0);
    textSize(16);
    textAlign(LEFT);
    matchedSpells.forEach((s, index) => {
      text(s.name, 20, 60 + index * 20);
    });
  } else {
    background(240);
  }
}