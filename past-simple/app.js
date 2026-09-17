const VERBS = [
  {base:"play", past:"played", rule:"regular"},
  {base:"watch", past:"watched", rule:"regular"},
  {base:"visit", past:"visited", rule:"regular"},
  {base:"start", past:"started", rule:"regular"},
  {base:"cook", past:"cooked", rule:"regular"},
  {base:"paint", past:"painted", rule:"regular"},
  {base:"fish", past:"fished", rule:"regular"},
  {base:"sail", past:"sailed", rule:"regular"},
  {base:"dive", past:"dived", rule:"e"},
  {base:"walk", past:"walked", rule:"regular"},
  {base:"shout", past:"shouted", rule:"regular"},
  {base:"chase", past:"chased", rule:"e"},
  {base:"cross", past:"crossed", rule:"regular"},
  {base:"laugh", past:"laughed", rule:"regular"},
  {base:"brush", past:"brushed", rule:"regular"},
  {base:"skateboard", past:"skateboarded", rule:"regular"},
  {base:"use", past:"used", rule:"e"},
  {base:"like", past:"liked", rule:"e"},
  {base:"shop", past:"shopped", rule:"double"},

  {base:"go", past:"went", rule:"irregular"},
  {base:"see", past:"saw", rule:"irregular"},
  {base:"eat", past:"ate", rule:"irregular"},
  {base:"have", past:"had", rule:"irregular"},
  {base:"buy", past:"bought", rule:"irregular"},
  {base:"make", past:"made", rule:"irregular"},
  {base:"come", past:"came", rule:"irregular"},
  {base:"take", past:"took", rule:"irregular"},
  {base:"do", past:"did", rule:"irregular"},
  {base:"read", past:"read", rule:"irregular"},
  {base:"swim", past:"swam", rule:"irregular"},
  {base:"get", past:"got", rule:"irregular"},
  {base:"catch", past:"caught", rule:"irregular"},
  {base:"meet", past:"met", rule:"irregular"}
];

const RULES = {
  regular:{short:"+ -ed", label:"pridaj -ed", explain:"Pravidelné sloveso: pridaj -ed."},
  e:{short:"+ -d", label:"sloveso končí na -e → +d", explain:"Sloveso už končí na -e, preto pridaj iba -d."},
  double:{short:"zdvojenie", label:"zdvoj poslednú spoluhlásku + -ed", explain:"Pri krátkom slovese ako shop zdvoj poslednú spoluhlásku a pridaj -ed."},
  irregular:{short:"irregular", label:"nepravidelný tvar", explain:"Toto sloveso je nepravidelné. Minulý tvar sa učíme ako dvojicu."}
};

let state = JSON.parse(localStorage.getItem("psq_state") || '{"correct":0,"attempts":0,"streak":0,"mastery":{}}');
let mode = "form";
let current = null;
let answered = false;
let challenge = {items:[], index:0, score:0, mistakes:[], answered:false};

function save(){
  localStorage.setItem("psq_state", JSON.stringify(state));
  updateStats();
}
function updateStats(){
  const mastered = Object.values(state.mastery || {}).filter(v => v >= 2).length;
  document.getElementById("masteredStat").textContent = mastered;
  document.getElementById("streakStat").textContent = state.streak || 0;
  document.getElementById("accuracyStat").textContent = state.attempts ? Math.round(state.correct/state.attempts*100)+"%" : "—";
}
function openTab(id){
  document.querySelectorAll(".panel").forEach(x=>x.classList.toggle("active",x.id===id));
  document.querySelectorAll(".nav button").forEach(x=>x.classList.toggle("active",x.dataset.tab===id));
  if(id==="practice") setTimeout(()=>document.getElementById("answerInput").focus(),100);
}
document.querySelectorAll(".nav button").forEach(btn=>btn.addEventListener("click",()=>openTab(btn.dataset.tab)));

function choice(arr){ return arr[Math.floor(Math.random()*arr.length)]; }
function sample(arr,n){ return [...arr].sort(()=>Math.random()-.5).slice(0,n); }
function poolForMode(){
  if(mode==="regular") return VERBS.filter(v=>v.rule!=="irregular");
  if(mode==="irregular") return VERBS.filter(v=>v.rule==="irregular");
  return VERBS;
}
function newPractice(){
  answered=false;
  current=choice(poolForMode());
  const feedback=document.getElementById("feedback");
  feedback.className="feedback";
  feedback.innerHTML="";
  document.getElementById("nextBtn").classList.add("hidden");
  document.getElementById("hintBtn").classList.remove("hidden");
  document.getElementById("practiceVerb").textContent=current.base;
  const ruleMode = mode==="rule";
  document.getElementById("practiceType").textContent = ruleMode ? "VYBER PRAVIDLO" : (mode==="irregular" ? "NEPRAVIDELNÉ SLOVESO" : mode==="regular" ? "PRAVIDELNÉ SLOVESO" : "NAPÍŠ MINULÝ TVAR");
  document.getElementById("textAnswerBlock").classList.toggle("hidden",ruleMode);
  document.getElementById("choiceBlock").classList.toggle("hidden",!ruleMode);
  const input=document.getElementById("answerInput");
  input.value="";
  if(ruleMode) buildRuleChoices();
  else setTimeout(()=>input.focus(),50);
}
function buildRuleChoices(){
  const box=document.getElementById("choiceBlock");
  box.innerHTML="";
  const keys=["regular","e","double","irregular"];
  keys.forEach(key=>{
    const b=document.createElement("button");
    b.className="choice";
    b.textContent=RULES[key].label;
    b.onclick=()=>checkRule(key,b);
    box.appendChild(b);
  });
}
function record(correct, verb){
  state.attempts++;
  if(correct){
    state.correct++;
    state.streak=(state.streak||0)+1;
    state.mastery[verb.base]=(state.mastery[verb.base]||0)+1;
  } else {
    state.streak=0;
  }
  save();
}
function showFeedback(correct, custom=""){
  const box=document.getElementById("feedback");
  box.className="feedback "+(correct?"ok":"bad");
  box.innerHTML=custom || (correct
    ? `<b>Správne.</b> ${current.base} → <b>${current.past}</b><br>${RULES[current.rule].explain}`
    : `<b>Ešte nie.</b> Správne je ${current.base} → <b>${current.past}</b><br>${RULES[current.rule].explain}`);
  document.getElementById("nextBtn").classList.remove("hidden");
  document.getElementById("hintBtn").classList.add("hidden");
}
function checkForm(){
  if(answered) return;
  const ans=document.getElementById("answerInput").value.trim().toLowerCase();
  if(!ans) return;
  answered=true;
  const correct=ans===current.past.toLowerCase();
  record(correct,current);
  showFeedback(correct);
}
function checkRule(key,btn){
  if(answered) return;
  answered=true;
  const correct=key===current.rule;
  record(correct,current);
  document.querySelectorAll("#choiceBlock .choice").forEach(b=>b.disabled=true);
  showFeedback(correct, correct
    ? `<b>Správne.</b> ${current.base} → <b>${current.past}</b><br>${RULES[current.rule].explain}`
    : `<b>Nie celkom.</b> ${current.base} patrí sem: <b>${RULES[current.rule].label}</b>.<br>${current.base} → <b>${current.past}</b>`);
}
document.getElementById("checkBtn").onclick=checkForm;
document.getElementById("answerInput").addEventListener("keydown",e=>{if(e.key==="Enter")checkForm()});
document.getElementById("nextBtn").onclick=newPractice;
document.getElementById("hintBtn").onclick=()=>{
  const box=document.getElementById("feedback");
  box.className="feedback ok";
  box.innerHTML=`<b>Nápoveda:</b> ${RULES[current.rule].explain} Prvé písmeno minulého tvaru je <b>${current.past[0].toUpperCase()}</b>.`;
};

document.querySelectorAll(".mode").forEach(btn=>btn.addEventListener("click",()=>{
  document.querySelectorAll(".mode").forEach(x=>x.classList.remove("active"));
  btn.classList.add("active");
  mode=btn.dataset.mode;
  newPractice();
}));

function speak(text){
  if(!("speechSynthesis" in window)) return;
  speechSynthesis.cancel();
  const u=new SpeechSynthesisUtterance(text);
  u.lang="en-GB";
  u.rate=.82;
  speechSynthesis.speak(u);
}
document.getElementById("speakBtn").onclick=()=>speak(current.base);

function renderVerbs(filter=""){
  const list=document.getElementById("verbList");
  const q=filter.trim().toLowerCase();
  const arr=VERBS.filter(v=>v.base.includes(q)||v.past.includes(q));
  list.innerHTML="";
  arr.forEach(v=>{
    const item=document.createElement("button");
    item.className="verb-item";
    item.style.textAlign="left";
    item.onclick=()=>speak(v.base+". "+v.past);
    item.innerHTML=`<div><b>${v.base} → ${v.past}</b><small>${RULES[v.rule].label}</small></div><span class="tiny-tag">${RULES[v.rule].short}</span>`;
    list.appendChild(item);
  });
}
document.getElementById("searchInput").addEventListener("input",e=>renderVerbs(e.target.value));

function startChallenge(){
  challenge={items:sample(VERBS,10),index:0,score:0,mistakes:[],answered:false};
  document.getElementById("challengeStart").style.display="none";
  document.getElementById("challengeResult").style.display="none";
  document.getElementById("challengeQ").style.display="flex";
  showChallenge();
}
function showChallenge(){
  challenge.answered=false;
  const v=challenge.items[challenge.index];
  document.getElementById("challengeCounter").textContent=`${challenge.index+1} / 10`;
  document.getElementById("challengeVerb").textContent=v.base;
  document.getElementById("challengeInput").value="";
  document.getElementById("challengeFeedback").className="feedback";
  document.getElementById("challengeFeedback").innerHTML="";
  document.getElementById("challengeNext").classList.add("hidden");
  document.getElementById("challengeCheck").classList.remove("hidden");
  document.getElementById("challengeBar").style.width=`${challenge.index*10}%`;
  setTimeout(()=>document.getElementById("challengeInput").focus(),50);
}
function checkChallenge(){
  if(challenge.answered) return;
  const input=document.getElementById("challengeInput");
  const ans=input.value.trim().toLowerCase();
  if(!ans) return;
  challenge.answered=true;
  const v=challenge.items[challenge.index];
  const correct=ans===v.past.toLowerCase();
  record(correct,v);
  if(correct) challenge.score++;
  else challenge.mistakes.push(v);
  const fb=document.getElementById("challengeFeedback");
  fb.className="feedback "+(correct?"ok":"bad");
  fb.innerHTML=correct
    ? `<b>Správne:</b> ${v.base} → ${v.past}`
    : `<b>Správny tvar:</b> ${v.base} → <b>${v.past}</b>`;
  document.getElementById("challengeNext").classList.remove("hidden");
  document.getElementById("challengeCheck").classList.add("hidden");
  document.getElementById("challengeBar").style.width=`${(challenge.index+1)*10}%`;
}
function nextChallenge(){
  if(challenge.index<9){
    challenge.index++;
    showChallenge();
  }else finishChallenge();
}
function finishChallenge(){
  document.getElementById("challengeQ").style.display="none";
  document.getElementById("challengeResult").style.display="block";
  document.getElementById("challengeScore").textContent=`${challenge.score}/10`;
  const title = challenge.score===10 ? "Máš to." : challenge.score>=8 ? "Veľmi dobré." : challenge.score>=6 ? "Dobrá cesta." : "Ešte jeden tréning.";
  document.getElementById("challengeTitle").textContent=title;
  document.getElementById("challengeSummary").textContent=challenge.mistakes.length
    ? "Tieto tvary si ešte zopakuj:"
    : "Všetkých desať tvarov bolo správne.";
  const box=document.getElementById("challengeMistakes");
  box.innerHTML="";
  challenge.mistakes.forEach(v=>{
    const s=document.createElement("span");
    s.className="example"; s.textContent=`${v.base} → ${v.past}`;
    box.appendChild(s);
  });
}
document.getElementById("startChallenge").onclick=startChallenge;
document.getElementById("restartChallenge").onclick=startChallenge;
document.getElementById("challengeCheck").onclick=checkChallenge;
document.getElementById("challengeNext").onclick=nextChallenge;
document.getElementById("challengeInput").addEventListener("keydown",e=>{
  if(e.key==="Enter"){
    if(challenge.answered) nextChallenge(); else checkChallenge();
  }
});

document.getElementById("resetBtn").onclick=()=>{
  if(confirm("Naozaj chceš vynulovať uložený pokrok?")){
    state={correct:0,attempts:0,streak:0,mastery:{}};
    save();
  }
};

renderVerbs();
updateStats();
newPractice();
