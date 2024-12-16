
// a date formatter function...
export const formatDate = (date)=>{
    if (!(date instanceof Date)) {
        date = new Date(date); 
    }

    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    day = day < 10 ? '0' + day : day;
    month = month < 10 ? '0' + month : month;

    return `${day}/${month}/${year}`;
}