const assert=require('node:assert/strict');
const {questions:q,isCorrect,createSession}=require('./questions.js');
// Independent, manually reviewed key: do not derive expected answers from question.answer.
const key=['eat','are eating','drinks','is calling','eats','are having','drinks / is drinking','I am cooking dinner now.','do not','does not',"They aren't eating noodles now.","He isn't drinking juice now.",'Do you usually eat lunch at school?','What is she cooking now?',"No, he doesn't.",'Yes, they are.','We usually eat pasta on Fridays.','is making','Where does she usually eat lunch?','I am not eating now.'];
assert.equal(q.length,20);assert.equal(new Set(q.map(x=>x.id)).size,20);
const perfect=createSession(),zero=createSession(),mixed=createSession();
assert.equal(perfect.submit(1,key[1]),null);
assert.equal(perfect.submit(0,'   '),null);
q.forEach((item,i)=>{
  assert(isCorrect(item,key[i]),`Key ${i+1}`);
  assert(!isCorrect(item,'wrong answer'),`Reject incorrect ${i+1}`);
  if(item.type==='choice'){
    assert.equal(item.options.filter(v=>isCorrect(item,v)).length,1);
    assert.equal(new Set(item.options).size,item.options.length);
  }
  if(item.type==='order'){
    const words=s=>s.toLowerCase().replace(/[.,!?]/g,'').split(' ').sort();
    assert.deepEqual([...item.tokens].map(s=>s.toLowerCase()).sort(),words(key[i]));
  }
  assert(perfect.submit(i,key[i]).correct);
  assert.equal(perfect.submit(i,key[i]),null,'No double scoring');
  zero.submit(i,'wrong answer');mixed.submit(i,i%2?key[i]:'wrong answer');
});
assert.equal(perfect.score,20);assert.equal(zero.score,0);assert.equal(mixed.score,10);
assert.equal(perfect.submit(20,'extra'),null);
assert.equal(createSession().score,0);
for(const [index,variants] of [[7,["I'm cooking dinner now.",'  I AM   COOKING dinner now!  ']],[8,["don’t",'do not']],[9,["doesn’t",'does not']],[11,['He is not drinking juice now.']]]){
  variants.forEach(v=>assert(isCorrect(q[index],v),v));
}
for(const [index,wrong] of [[4,'eat'],[5,'having'],[7,'I cooking dinner now.'],[9,"don't"],[11,'He not drinking juice now.'],[13,'What she is cooking now?'],[14,"No, he don't."]])assert(!isCorrect(q[index],wrong));
const fs=require('node:fs');
for(const file of ['app.js','questions.js','index.html','style.css']){
  const text=fs.readFileSync(`${__dirname}/${file}`,'utf8');
  assert(!/localStorage|sessionStorage|psq_|STUDENTS|leaderboard|XMLHttpRequest/.test(text),`Privacy ${file}`);
}
console.log('PASS: 20 independent answer keys; 20 wrong answers; all distractors and word sets; 20/20, 0/20, 10/20; duplicate/empty/out-of-order guards; contractions; reset; privacy.');

assert(fs.readFileSync(__dirname+'/app.js','utf8').includes('https://english-unit1-results.petinek.chatgpt.site'));
