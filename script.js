 const url='http://api.quotable.io/random';
 let count=0;
 let arrvalue;
 let wrongc=0;
 const timer=document.getElementById('timer');
 document.getElementById('quoteInput').addEventListener('input',()=>{
    wrongc=0;
    const arrquotes=document.getElementById('realquote').querySelectorAll('span');
    arrvalue=document.getElementById('quoteInput').value.split('');
    let correct=true;
    arrquotes.forEach((characterSpan,index)=>{
        const character=arrvalue[index];
        if(character==null)
        {
            correct=false;
            characterSpan.classList.remove('incorrect');
            characterSpan.classList.remove('correct');
        }
        else if(character===characterSpan.innerText)
        {
            characterSpan.classList.add('correct');
            characterSpan.classList.remove('incorrect');
        }
        else
        {
            wrongc=wrongc+1;
            correct=false;
            characterSpan.classList.remove('correct');
            characterSpan.classList.add('incorrect');
        }
    })
    if(correct)
    {
        getNextQuote();
    }
 });
 function getRandomQuote()
 {
    return fetch(url)
    .then(response=>response.json())
    .then(data=>data.content)
 }
 async function getNextQuote()
 {
    const quote=await getRandomQuote();
    document.getElementById('realquote').innerText='';
    await quote.split('').forEach(character=>{
        const characterSpan=document.createElement('span');
        characterSpan.innerText=character;
        document.getElementById('realquote').appendChild(characterSpan);
    })
    document.getElementById('quoteInput').value=null;
    startTimer();
 }
 let interval;
 function startTimer()
 {
    
    timer.innerText=0;
    interval=setInterval(setseconds,1000);
 }
 function printspeed()
 {
    for(let i=0;i<arrvalue.length;i++)
    {
        if(arrvalue[i]===' ')
        {
            count=count+1;
        }
    }
    if(wrongc<=5)
    {
        alert("your speed "+count+" wpm");
    }
    else
    {
        alert("you have typed too many mistakes");
    }
    location.reload();
 }
 let timeinsec=0;
 function setseconds()
 {
    timeinsec=timeinsec+1;
    timer.innerText=timeinsec;
    if(timeinsec===60)
    {
        printspeed();
    }
 }
 getNextQuote();