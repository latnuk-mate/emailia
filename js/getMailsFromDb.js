

function getMails(key){
    const mails = localStorage.getItem(key) || null;

    if(!mails){
        return ;
    }else{
        return JSON.parse(mails);
    }
}


export const getMailsFromDB = (type)=>{
    if(type === 'favorite'){
        return getMails('mails').filter(item => item.flag === 'fav')
    }

    if(type === 'read'){
        return getMails('mails').filter(item => item.flag === 'read');
    }
}