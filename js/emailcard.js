
export const EmailCard = (email, formatDate)=>{
    return(

`
            <div class="flex gap-5">
                <div class="flex items-center h-9 w-9 rounded-full text-white justify-center p-3 avatar">
                    ${email.from.name[0].toUpperCase()}
                </div>
                <div> 
                    <h5 class="flex items-center text-sm mb-0">
                    From: &nbsp; <strong> ${email.from.name} </strong>&nbsp;
                        <span class="">${email.from.email}</span>
                    </h5>
                    <h5 class="mt-1">
                        Subject: <strong>${email.subject}</strong>    
                     </h5>
                    <p class="short_text text-sm mt-2 max-w-xs  truncate overflow-hidden whitespace-nowrap">${email.short_description}</p>
                    <p class="mt-2 text--section">
                        ${formatDate(email.date)}
                        &nbsp; 
                        ${new Date(email.date).toLocaleTimeString()}
                    </p>
                </div>
            </div>   
`
)
}






