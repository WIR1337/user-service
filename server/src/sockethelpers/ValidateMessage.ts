export function validMessage(message:any) {
     if(Object.prototype.toString.call(message) === '[object Object]'){

        const requiredKeys = ['id', 'user_id', 'username','action_type','action_data','action_time'];
        const keys = Object.keys(message)

        for (const key of keys) {
            if (!(key in message)) {
              return false;
            }
        }
        console.log(keys)
        return true
     }

    return false
}
