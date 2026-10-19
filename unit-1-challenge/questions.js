(function (root) {
  'use strict';
  const questions = [
    {id:1,group:'Present simple',type:'choice',instruction:'Vyber správny tvar slovesa.',prompt:'I usually ___ toast for breakfast.',options:['am eating','eat','eats'],answer:'eat',explanation:'Usually označuje zvyk. Po I použijeme v present simple základný tvar eat.'},
    {id:2,group:'Present continuous',type:'choice',instruction:'Vyber správny tvar slovesa.',prompt:'Look! They ___ soup.',options:['are eating','eat','is eating'],answer:'are eating',explanation:'Look! upozorňuje na dej práve teraz. Po they použijeme are + eating.'},
    {id:3,group:'Present simple',type:'input',instruction:'Doplň správny tvar slovesa drink.',prompt:'My brother ___ milk every morning.',answer:'drinks',explanation:'Every morning označuje zvyk. My brother = he, preto pridáme -s: drinks.'},
    {id:4,group:'Present continuous',type:'choice',instruction:'Vyber správny tvar slovesa.',prompt:'Listen! Mum ___ us to dinner.',options:['call','calls','is calling'],answer:'is calling',explanation:'Listen! nás upozorňuje na to, čo počujeme teraz. Mum = she: is calling.'},
    {id:5,group:'Usually or now?',type:'input',instruction:'Doplň správny tvar slovesa eat.',prompt:'She usually ___ cereal for breakfast.',answer:'eats',explanation:'Usually označuje zvyk. Po she má sloveso v present simple koncovku -s: eats.'},
    {id:6,group:'Usually or now?',type:'input',instruction:'Doplň celý chýbajúci tvar slovesa have.',prompt:'We ___ lunch now.',answer:'are having',explanation:'Now = práve teraz. Po we použijeme are + having.'},
    {id:7,group:'Usually or now?',type:'choice',instruction:'Vyber správnu dvojicu.',prompt:'He usually ___ water, but right now he ___ milk.',options:['drinks / drinks','drinks / is drinking','is drinking / drinks'],answer:'drinks / is drinking',explanation:'Zvyk: he drinks. Dej práve teraz: he is drinking.'},
    {id:8,group:'Usually or now?',type:'input',instruction:'Oprav vetu. Napíš ju celú.',prompt:'I cooking dinner now.',answer:'I am cooking dinner now.',explanation:'Pri deji teraz potrebujeme aj am: I am cooking dinner now.'},
    {id:9,group:'Make it negative',type:'input',instruction:'Doplň zápor. Použi don’t alebo do not.',prompt:'I ___ eat olives.',answer:"don't",explanation:'Po I tvoríme zápor pomocou don’t / do not + základný tvar slovesa.'},
    {id:10,group:'Make it negative',type:'input',instruction:'Doplň zápor. Použi doesn’t alebo does not.',prompt:'She ___ like tomatoes.',answer:"doesn't",explanation:'Po she použijeme doesn’t / does not. Sloveso like už nemá -s.'},
    {id:11,group:'Make it negative',type:'choice',instruction:'Vyber správny zápor vety.',prompt:'They are eating noodles now.',options:["They don't eating noodles now.","They aren't eating noodles now.","They aren't eat noodles now."],answer:"They aren't eating noodles now.",explanation:'Zápor present continuous: are not / aren’t + sloveso s -ing.'},
    {id:12,group:'Make it negative',type:'order',instruction:'Poskladaj zápornú vetu kliknutím na slová.',prompt:'On teraz nepije džús.',tokens:['juice','drinking',"isn't",'now','He'],answer:"He isn't drinking juice now.",explanation:'Po he nasleduje isn’t + drinking. He isn’t drinking juice now.'},
    {id:13,group:'Ask & answer',type:'order',instruction:'Poskladaj otázku kliknutím na slová.',prompt:'Jedávaš zvyčajne obed v škole?',tokens:['lunch','you','school','Do','at','usually','eat'],answer:'Do you usually eat lunch at school?',explanation:'Otázka o zvyku: Do + you + základný tvar eat.'},
    {id:14,group:'Ask & answer',type:'order',instruction:'Poskladaj otázku kliknutím na slová.',prompt:'Čo ona práve teraz varí?',tokens:['cooking','she','What','now','is'],answer:'What is she cooking now?',explanation:'Otázka o deji teraz: What + is + she + cooking?'},
    {id:15,group:'Ask & answer',type:'choice',instruction:'Odpovedz záporne.',prompt:'Does he like salad?',options:["No, he doesn't.","No, he don't.","No, he isn't."],answer:"No, he doesn't.",explanation:'Na otázku s Does odpovedáme does / doesn’t: No, he doesn’t.'},
    {id:16,group:'Ask & answer',type:'order',instruction:'Poskladaj kladnú krátku odpoveď.',prompt:'Are they making sandwiches now?',tokens:['are','Yes','they'],answer:'Yes, they are.',explanation:'Na otázku s Are they odpovedáme Yes, they are. V krátkej odpovedi netreba opakovať making.'},
    {id:17,group:'Usually or now?',type:'choice',instruction:'Prečítaj text. Ktorá veta opisuje zvyk?',passage:'We usually eat pasta on Fridays. Today we are eating chicken. Dad is making a salad now.',prompt:'Vyber vetu o pravidelnej činnosti.',options:['Today we are eating chicken.','Dad is making a salad now.','We usually eat pasta on Fridays.'],answer:'We usually eat pasta on Fridays.',explanation:'Usually a on Fridays označujú pravidelný zvyk. Preto eat, nie are eating.'},
    {id:18,group:'Usually or now?',type:'input',instruction:'Prečítaj text. Doplň celý chýbajúci tvar slovesa make.',passage:'We usually eat pasta on Fridays. Today we are eating chicken. Dad is making a salad now.',prompt:'Dad ___ a salad now.',answer:'is making',explanation:'Ide o dej práve teraz: Dad is making. Pri make odoberieme koncové e a pridáme -ing.'},
    {id:19,group:'Ask & answer',type:'choice',instruction:'Vyber správnu otázku o zvyku.',prompt:'Chceš zistiť, kde ona zvyčajne obeduje.',options:['Where is she usually eat lunch?','Where does she usually eat lunch?','Where does she usually eats lunch?'],answer:'Where does she usually eat lunch?',explanation:'Present simple: Where + does + she + základný tvar eat. Po does nepridávame -s.'},
    {id:20,group:'Make it negative',type:'choice',instruction:'Vyber správnu vetu: Teraz nejem.',prompt:'Použi present continuous.',options:["I don't eating now.","I am not eat now.","I am not eating now."],answer:'I am not eating now.',explanation:'Po I použijeme am not + eating. Present continuous potrebuje am/is/are aj -ing.'}
  ];
  function normalize(value) {
    return String(value).toLowerCase().trim().replace(/[’‘`]/g,"'")
      .replace(/\bdon't\b/g,'do not').replace(/\bdoesn't\b/g,'does not')
      .replace(/\bisn't\b/g,'is not').replace(/\baren't\b/g,'are not')
      .replace(/\bi'm\b/g,'i am').replace(/\bhe's\b/g,'he is')
      .replace(/\bshe's\b/g,'she is').replace(/\bthey're\b/g,'they are')
      .replace(/\bwe're\b/g,'we are').replace(/[.,!?]/g,'').replace(/\s+/g,' ').trim();
  }
  function isCorrect(question, value) { return normalize(value) === normalize(question.answer); }
  function createSession() {
    const responses = [];
    return {
      responses,
      get score() { return responses.filter(r=>r.correct).length; },
      submit(index,value) {
        if(index !== responses.length || index >= questions.length || !normalize(value)) return null;
        const response={id:questions[index].id,value,correct:isCorrect(questions[index],value)};
        responses.push(response); return response;
      }
    };
  }
  const api={questions,normalize,isCorrect,createSession};
  if(typeof module !== 'undefined' && module.exports) module.exports=api;
  else root.UnitOne=api;
})(typeof window !== 'undefined' ? window : this);
