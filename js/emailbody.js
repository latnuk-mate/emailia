

export function EmailBody(user , emailBody, formatDate){

    return (
            `
            <div class="flex justify-between items-center mail--body--nav">
                  <div class="flex gap-4">
                    <div class="flex items-center h-9 w-9 rounded-full text-white justify-center p-3 avatar">
                      ${user.from.name[0].toUpperCase()}
                    </div>
                      <div>
                        <h5 class="text-xl font-bold">${user.from.name}</h5>
                        <p class="mt-3">
                          ${formatDate(user.date)}
                          &nbsp; 
                          ${new Date(user.date).toLocaleTimeString()}
                      </p>
                      </div>
                  </div>
                </div>

                <div class="max-w-full m-auto text-sm mt-6 mb-20 p-8">
                    <p>${emailBody}</p>
                 </div>
            
        `
    )

}