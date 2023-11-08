export function validMessage(message:any) {
  const parsedMessage = JSON.parse(message)

  if(Object.prototype.toString.call(parsedMessage) === '[object Object]'){
     const requiredKeys = ['id', 'user_id', 'username','action_type','action_data','action_time'];
     const keys = Object.keys(parsedMessage)
     
     for (const key of keys) {
         if (!(requiredKeys.includes(key))) {
           return false;
         }
     }
     return true
  }

 return false
}
