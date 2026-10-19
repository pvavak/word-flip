(() => {
  'use strict';
  const {questions,createSession}=UnitOne;
  const $=id=>document.getElementById(id);
  let session,index=0,selected='',ordered=[],locked=false;
  function element(tag,text,className){const node=document.createElement(tag);if(text!==undefined)node.textContent=text;if(className)node.className=className;return node;}
  function start(){session=createSession();index=0;$('intro').hidden=true;$('results').hidden=true;$('quiz').hidden=false;render();}
  function updateStats(){ $('counter').textContent=`Úloha ${index+1} z ${questions.length}`;$('score').textContent=`${session.score} / 20 bodov`;$('progress').value=session.responses.length; }
  function render(){
    locked=false;selected='';ordered=[];const q=questions[index];updateStats();
    $('group').textContent=q.group;$('instruction').textContent=q.instruction;$('question-title').textContent=q.prompt;
    $('passage').hidden=!q.passage;$('passage').textContent=q.passage||'';
    $('answer-area').replaceChildren();$('validation').textContent='';$('feedback').hidden=true;$('next').hidden=true;$('check').hidden=false;
    if(q.type==='choice'){
      const box=element('div',undefined,'options');box.setAttribute('role','group');box.setAttribute('aria-label','Možnosti odpovede');box.lang='en';
      q.options.forEach((value,i)=>{const b=element('button',undefined,'option');b.type='button';b.setAttribute('aria-pressed','false');b.append(element('span',String.fromCharCode(65+i),'letter'),element('span',value));b.onclick=()=>{selected=value;box.querySelectorAll('button').forEach(x=>x.setAttribute('aria-pressed',String(x===b)));$('validation').textContent='';};box.append(b);});$('answer-area').append(box);
    }else if(q.type==='input'){
      const label=element('label','Tvoja odpoveď','input-label');label.htmlFor='answer';const input=element('input');input.id='answer';input.type='text';input.autocomplete='off';input.spellcheck=false;input.setAttribute('autocapitalize','none');input.setAttribute('aria-describedby','instruction validation');input.lang='en';input.oninput=()=>{$('validation').textContent='';};$('answer-area').append(label,input);
    }else{
      const sentence=element('div',undefined,'sentence');sentence.id='sentence';sentence.setAttribute('aria-label','Tvoja zostavená veta');sentence.setAttribute('aria-live','polite');sentence.lang='en';
      const bank=element('div',undefined,'word-bank');bank.id='bank';bank.lang='en';
      q.tokens.forEach((word,i)=>{const b=element('button',word,'word');b.type='button';b.dataset.token=i;b.onclick=()=>{if(locked)return;ordered.push(i);drawSentence();};bank.append(b);});
      const undo=element('button','Vymazať vetu','undo');undo.type='button';undo.onclick=()=>{if(!locked){ordered=[];drawSentence();}};$('answer-area').append(sentence,bank,undo);
    }
    $('question-title').focus();
  }
  function drawSentence(){const q=questions[index];$('sentence').replaceChildren();ordered.forEach((token,position)=>{const b=element('button',q.tokens[token],'word');b.type='button';b.setAttribute('aria-label',`Odobrať slovo ${q.tokens[token]}`);b.onclick=()=>{if(!locked){ordered.splice(position,1);drawSentence();}};$('sentence').append(b);});$('bank').querySelectorAll('button').forEach(b=>b.disabled=ordered.includes(Number(b.dataset.token)));$('validation').textContent='';}
  function check(e){
    e.preventDefault();if(locked)return;const q=questions[index];
    const value=q.type==='input'?$('answer').value:q.type==='choice'?selected:ordered.map(i=>q.tokens[i]).join(' ');
    if(!value.trim()||(q.type==='order'&&ordered.length!==q.tokens.length)){$('validation').textContent=q.type==='choice'?'Najprv vyber jednu odpoveď.':q.type==='order'?'Použi všetky slová. Ich poradie môžeš meniť.':'Najprv napíš odpoveď.';if(q.type==='input')$('answer').focus();return;}
    const response=session.submit(index,value);if(!response)return;locked=true;updateStats();
    $('answer-area').querySelectorAll('button,input').forEach(el=>el.disabled=true);
    if(q.type==='choice')$('answer-area').querySelectorAll('.option').forEach((b,i)=>{if(q.options[i]===q.answer)b.classList.add('correct');else if(q.options[i]===selected)b.classList.add('wrong');});
    $('check').hidden=true;const fb=$('feedback');fb.replaceChildren(element('strong',response.correct?'✓ Správne! +1 bod':'Skús si zapamätať správne riešenie.'),element('p',`Správna odpoveď: ${q.answer}`),element('p',q.explanation));fb.className=`feedback${response.correct?'':' bad'}`;fb.hidden=false;
    $('next').textContent=index===questions.length-1?'Pozrieť výsledok →':'Ďalšia úloha →';$('next').hidden=false;$('next').focus();
  }
  function finish(){
    $('quiz').hidden=true;$('results').hidden=false;$('result-title').textContent=session.score===20?'All twenty. Well done!':session.score>=16?'Great work!':'Každý pokus ťa posúva.';
    $('result-score').replaceChildren(document.createTextNode(session.score),element('small',' / 20 bodov'));
    $('result-message').textContent=session.score===20?'V tomto pokuse máš všetkých 20 odpovedí správne.':`Správne: ${session.score} z 20 (${session.score*5} %). Pozri si vysvetlenia pri chybách a potom to skús znova.`;
    $('review').replaceChildren();questions.forEach((q,i)=>{const r=session.responses[i];const d=element('details');const summary=element('summary');summary.append(element('span',r.correct?'✓ Správne':'↻ Zopakuj','review-state'+(r.correct?'':' bad')),document.createTextNode(`${i+1}. ${q.prompt}`));d.append(summary);if(q.passage)d.append(element('p',q.passage));d.append(element('p',`Tvoja odpoveď: ${r.value}`),element('p',`Správna odpoveď: ${q.answer}`),element('p',q.explanation));$('review').append(d);});$('result-title').focus();
  }
  $('start').onclick=start;$('restart').onclick=start;$('answer-form').onsubmit=check;
  $('next').onclick=()=>{if(!locked)return;if(index<questions.length-1){index++;render();}else finish();};
})();
