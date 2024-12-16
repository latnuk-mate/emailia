import { EmailBody } from './emailbody.js';
import {EmailCard} from './emailcard.js';
import { getMailsFromDB } from './getMailsFromDb.js';
import { formatDate } from './format.js';


var _countPage = 1;



// sidebar master slide & slave slide...
const emails = document.querySelector('.email--list');
const body = document.querySelector('.email--body');



// filter part active logic...
const filters = document.querySelectorAll(".filter--section ul li");

// setting up the filter button..
filters.forEach(item => {
    item.addEventListener('click', ()=>{
        filters.forEach(item => item.classList.remove('active'));
        item.classList.add('active')
    })
});




/*  functions to call the APIs  */

// get all the mail list...
async function getMails(page){
    const mails = await fetch(`https://flipkart-email-mock.vercel.app/?page=${page}`);
    const res = await mails.json();
    const data = res.list;

    return data;
}

// get the mail body...
async function getMailBody(id){
    const mails = await fetch(`https://flipkart-email-mock.vercel.app/?id=${id}`);
    const res = await mails.json();
    const data = res.body;

    return data;
}


function generateEmailCards(items , el){
    // create a card of emails...
    items.map(email => {
        const div = document.createElement('div');
        div.className = "bg-white border rounded-lg px-6 py-4 mb-2 cursor-pointer emails";

        // let's create a fav mark..
        const span = document.createElement('span');
        span.className = "hidden justify-end fav--text";
        span.textContent = "favourite";

        div.innerHTML = EmailCard(email, formatDate);

        // attach the span..
        div.appendChild(span);

        div.onclick = () => setMailBody(span, div, email, email.id, formatDate);

        el.appendChild(div);

    });
}


async function renderMails(page=1){
    const emailList = await getMails(page);

    // clear up the html of emails
    emails.innerHTML = "";

    // creating mails..
    generateEmailCards(emailList, emails);

}


async function setMailBody(span , el, user , id, formatDate){
        // set body part visible
        body.style.display = 'block'; 

        // set mails as read..
        el.classList.add('read');

    let emailBody = await getMailBody(id); // get the email body...


    // creating a button for fav item
    const button = document.createElement('button');
    button.className = "fav--btn px-5 py-2 rounded-[100px] text-sm text-white";
    button.textContent = "Mark as favorite";    
    button.onclick = () => addToFavourite(span, user);


      //  creating a body section...
    const div = document.createElement('div');
    // place the body content
    div.innerHTML = EmailBody(user, emailBody, formatDate);

    // clear the whole body on every call before paint...
    body.innerHTML = "";

    body.appendChild(div);


    // append the button to the div...
    document.querySelector('.mail--body--nav').appendChild(button);



    // mark the mail as read..
    addToRead(user);

}


function addToFavourite (span , email){

        // set the fav text visible..
        span.classList.replace('hidden', 'flex');

        const maildata = JSON.parse(localStorage.getItem('mails'));

        // get the mails and update it.
        if(maildata){
            maildata.map(mail => {
                if(mail.id === email.id){
                    mail.flag = 'fav';
                }
            })
        }
        
        // setting it to localstorage...
        localStorage.setItem('mails', JSON.stringify(maildata));
}

function addToRead(user){
        // get the data from db...
        const maildata = JSON.parse(localStorage.getItem('mails')) || [];

        user['flag'] = 'read';  // assign a flag as read...
        // store it before filter if we see the same mail..
        const mails = maildata.find((item) => item.id === user.id);
        if(mails){
            return ;
        }else{
          maildata.push(user);  
        }
        
       
      // setting it to localstorage...
      localStorage.setItem('mails', JSON.stringify(maildata));
}


// fix the flag option.. fav and read 


    // trigger the call...
    const viewFavButton = document.getElementById('fav_mails');

    viewFavButton.addEventListener('click', ()=>{
        emails.innerHTML= "";
        body.style.display = 'none';

        // hide the pagination..
        document.querySelector('.paginateBtn').classList.replace('flex', 'hidden');

        const mails = getMailsFromDB('favorite');

          // creating mails..
        generateEmailCards(mails, emails);


    });

    const viewReadMailButton = document.getElementById('read_mails');

    viewReadMailButton.addEventListener('click', async()=>{
        emails.innerHTML= "";
        body.style.display = 'none';

        // hide the pagination..
        document.querySelector('.paginateBtn').classList.replace('flex', 'hidden');

        const readMails = getMailsFromDB('read');

          // creating mails..
        generateEmailCards(readMails, emails);

    } )


const viewAllMailButton = document.getElementById('all_mails');

viewAllMailButton.addEventListener('click', async()=>{
    emails.innerHTML= "";
    body.style.display = 'none';

    // show the pagination..
    document.querySelector('.paginateBtn').classList.replace('hidden', 'flex');

    const allMails = await getMails(1);

      // creating mails..
    generateEmailCards(allMails, emails);
});




// get the pagination...
const prevBtn = document.querySelector('.prev_btn');
const nextBtn = document.querySelector('.next_btn');

prevBtn.addEventListener('click', ()=>{
    // page should be reference here not a func var..
    if(_countPage <= 1){
        return ;
    }else{
        _countPage = _countPage -1;
        renderMails(_countPage)
    }
});


nextBtn.addEventListener('click', ()=>{
    if(_countPage >= 2){
        return ;
    }else{
        _countPage = _countPage + 1;
        renderMails(_countPage)
    }
});




// first render all mails from first page.
renderMails();

