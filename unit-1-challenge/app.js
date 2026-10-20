(() => {
  'use strict';
  const {questions,createSession}=UnitOne;
  const $=id=>document.getElementById(id);
  const RESULTS_API=location.hostname==='pvavak.github.io'?'https://english-unit1-results.petinek.chatgpt.site':'';
  let session,index=0,selected='',ordered=[],locked=false,uploadContext=null,pendingPayload=null,studentAuth=null;
  function element(tag,text,className){const node=document.createElement(tag);if(text!==undefined)node.textContent=text;if(className)node.className=className;return node;}
  async function start(){
    if(pendingPayload)return;
    $('start-error').textContent='';$('start').disabled=true;$('restart').disabled=true;
    try{
      uploadContext=null;
      if($('record-result').checked){
        if(!studentAuth){
          const username=$('student-name').value.trim(),password=$('student-password').value;
          if(!username||!password)throw new Error('Vyplň svoje prihlasovacie meno a heslo.');
          studentAuth=await request('/api/student-login',{username,password});
          $('student-password').value='';
        }
        const result=await request('/api/start',{studentToken:studentAuth.studentToken});
        uploadContext={id:result.id,token:result.token,studentCode:result.studentCode,username:result.username};

      }
      $('signed-in').textContent=uploadContext?'Prihlásený účet: '+uploadContext.username:'Tréning bez odoslania';session=createSession();index=0;$('intro').hidden=true;$('results').hidden=true;$('quiz').hidden=false;render();
    }catch(error){if(error.status===401)studentAuth=null;$('intro').hidden=false;$('results').hidden=true;$('start-error').textContent=error.message;}
    finally{$('start').disabled=false;$('restart').disabled=false;}
  }
  async function request(path,payload){
    const controller=new AbortController(),timer=setTimeout(()=>controller.abort(),15000);
    try{const response=await fetch(RESULTS_API+path,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload),signal:controller.signal});const data=await response.json();if(!response.ok){const error=new Error(data.error||'Odoslanie sa nepodarilo. Skús to znova.');error.status=response.status;throw error;}return data;}
    catch(error){if(error.name==='AbortError'||error instanceof TypeError)throw new Error('Spojenie sa nepodarilo. Skontroluj internet a skús to znova.');throw error;}
    finally{clearTimeout(timer);}
  }
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
    if(uploadContext){pendingPayload={id:uploadContext.id,token:uploadContext.token,answers:session.responses.map(r=>r.value)};sendResult();}
    else{$('send-status').className='feedback';$('send-status').textContent='Tréning bez odoslania. Tento výsledok sa učiteľovi neuložil.';$('retry-send').hidden=true;}
  }
  async function sendResult(){if(!pendingPayload)return;$('retry-send').hidden=true;$('restart').disabled=true;$('send-status').className='feedback';$('send-status').textContent='Odosielam výsledok učiteľovi… Nezatváraj stránku.';
    try{const receipt=await request('/api/submit',pendingPayload);$('send-status').textContent=`✓ Výsledok bol uložený učiteľovi. ${uploadContext.username} · ${receipt.score}/20. Môžeš zavrieť stránku.`;pendingPayload=null;$('restart').disabled=false;}
    catch(error){$('send-status').className='feedback bad';$('send-status').textContent=`Výsledok sa zatiaľ neuložil. ${error.message} Nezatváraj stránku a použi tlačidlo na opätovné odoslanie.`;$('retry-send').hidden=false;}
  }
  $('start').onclick=start;$('restart').onclick=start;$('answer-form').onsubmit=check;
  $('next').onclick=()=>{if(!locked)return;if(index<questions.length-1){index++;render();}else finish();};
  $('retry-send').onclick=sendResult;
  $('record-result').onchange=()=>{$('student-fields').hidden=!$('record-result').checked;};
  $('logout').onclick=()=>{studentAuth=null;uploadContext=null;session=null;$('student-password').value='';$('student-name').value='';$('results').hidden=true;$('quiz').hidden=true;$('intro').hidden=false;$('student-name').focus();};
  ['student-name','student-password'].forEach(id=>$(id).addEventListener('keydown',e=>{if(e.key==='Enter'){e.preventDefault();start();}}));
})();
