'use strict'

const Developer = use('App/Models/Developer')
const Team = use('App/Models/Team')
const Database = use('Database')
const Hash = use('Hash')

class AccessController {

    async login ({ request }){
        const { email, password }=request.all()
    
        // function validateEmail(email) {
        //     var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        //     return re.test(String(email).toLowerCase());
        // }
    
        if (!email || !validateEmail(email)){
            return {
                status: 0,
                message:"Invalid email address. "+email
            }
        }
        else if (!password  || password.length<5){
            return {
                status: 0,
                message:"Invalid password"
            }
        }
        else{ //Select from DB
    
            //const exist = await Developer.select('email').where({email:email})
            const exist = await Database.select('email', 'password', 'firstname', 'lastname', 'teamid').from('developers').where({email:email})
    
            if (exist[0].password && exist[0].password.length>0){//Email & password does not exist
                const verifyPassword = await Hash.verify(password, exist[0].password)
    
                if (verifyPassword){
                return {
                    status: 1,
                    message: `Welcome  ${exist[0].firstname}`,
                    data: {
                        firstname: exist[0].firstname,
                        lastname: exist[0].lastname,
                        teamID: exist[0].teamID,
                        dbBassword: exist[0].password
                        }
                     }
                }
                else{
                    return {
                        status: 0,
                        message:"Invalid password"
                    }                            
                } 
            }
            
            else{
                var dev ="NO!!!_"+JSON.stringify(exist)
                return dev;
            }
        }
    }
    
    


}

module.exports = AccessController
