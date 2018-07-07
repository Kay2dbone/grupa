'use strict'

const Developer = use('App/Models/Developer')
const Team = use('App/Models/Team')
const Database = use('Database')
const Hash = use('Hash')
var crypto = require("crypto");


class DevController {

    apiResponse(status, message, data=null){
        return{
            status:     status,
            message:    message,
            data:       data
        }
    }
    
    async registerDev (email, teamid){
        var regToken = crypto.randomBytes(50).toString('hex')
        const newTeam = await Developer.create({ email: email, teamid: teamid, regtoken: regToken}) 
        return newTeam  
    }
    
    hasDuplicates(array) {
        return (new Set(array)).size !== array.length;
    }


    validateEmail(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
    

  
//***********************************************NEW TEAM**************************************************************
//*******************************************************************************************************************
    async newteam ({ request }){
    
        const { email, teamname } = request.all()
    
        if (!email || !this.validateEmail(email)){
        return {
                status: 0,
                message: "Invalid email type ",
                data:   ""
            }
        }
        else if (!teamname || teamname.length<5 || teamname.length>20){
            return {
                status: 0,
                message: "Invalid team name. You may use alphanumeric characters between 5 and 20",
                data:   ""
            }
        }
    
        const teamexist = await Database.select('email').from('teams').where({email:email})
    
        if (teamexist.length>0){
            return {
                status: 0,
                message: "Team already exist!",
                data:   ""
                }
        }
    
        const developerexist = await Database.select('email').from('developers').where({email:email})

        if (developerexist.length>0){
            return {
                status: 0,
                message: "This user already exist!",
                data:   ""
                }
        }
    
            /////>>>>>>>>>>>>SendEmail
            const regToken = Math.floor(Math.random() * (100001 - 999998 + 1)) + 999998;

            const newTeam = await Team.create({ email:email, teamname: teamname, regtoken: regToken})

            if (!newTeam.$attributes.id && !teamID>0){
                return {
                    status: 0,
                    message: "Oops! Try again later!",
                    data:   ""
                    }    
            }
            var teamID  =newTeam.$attributes.id

            if (teamID && teamID>0){
                const newDeveloper = await Developer.create({ email:email, teamid: teamID, teamlead: 1})
                
                const samp = {
                    a: newTeam.$attributes,
                    b: newDeveloper.$attributes
                }
    
                return {
                    status: 1,
                    message: "A token has been sent to your email address. Please provide the token to verify your email",
                    data:   samp
                }
            }  
    }
    
    
//***************************************************VERIFY EMAIL **********************************************************
//*************************************************************************************************************
      async verifyemail( { request }){
          const {email, regToken} = request.all()
                if (!email || !this.validateEmail(email)){
                    return {
                        status: 0,
                        message: "Invalid email type ",
                        data:   ""
                    }
                }
                if (!regToken){
                    return {
                        status: 0,
                        message: "Invalid token ",
                        data:   ""
                    }
                }
    
    
      const getToken = await Database.select('regtoken', 'emailverificationstatus').from('teams').where({email: email}).first()
               if (!getToken){

                return this.apiResponse(0, "Invalid request","")

                }
                else if (getToken.regtoken){

                    if (regToken!=getToken.regtoken){

                        return this.apiResponse(0, "Invalid token!","")
                    }

                    else{

                        var accessToken = crypto.randomBytes(90).toString('hex')

                        const setToken = await Database.table('developers')
                        .where('email', email)
                        .update('accesstoken', accessToken)

                        var data=  {accessToken: accessToken}

                        return this.apiResponse(0, "Token is correct! You may proceed.", data)

                    }
                }
    
            }//endVerifyemail
    
    
    
    //*************************************************************************************************************
    //*************************************************************************************************************
     async teamDetails ({ request }){
         ///>>>validateUser 

         var email = "grupa1@gmail.com"
       const {username, specialization, bondduration, country, domicilestate, address, password, confirmpassword } = request.all()
                var usernameRegex = /^[a-zA-Z0-9]+$/;
                if (!username){

                    return this.apiResponse(0, "Invalid in username. You can only use alphanumeric characters.", "")

                }
                else if (username.length< 6 || username.length>15){

                    return this.apiResponse(0, "Invalid in Username. 6-15 alphanumeric characters required.", "")
                }
                if (!specialization){

                }
                
                if (!country){

                    return this.apiResponse(0, "Country?", "")
                }
                else if (!domicilestate){

                    return this.apiResponse(0, "State?", "")

                }
    
                if (!password){

                    return this.apiResponse(0, "Password? Secure your account!", "")

                }
    
                if (!confirmpassword){

                    return this.apiResponse(0, "Verify your password!", "")
                }
    
                if (password!=confirmpassword){

                    return this.apiResponse(0, "Passwords are not the same", "")

                }
    
                var lowerCaseLetters = /[a-z]/g;
                var upperCaseLetters = /[A-Z]/g;      
                var numbers = /[0-9]/g;
    
            //   if(!(password.match(lowerCaseLetters))) { 
            //     return {
            //         status: 0,
            //         message: "Password must include atleast a character",
            //     }
            // }
            //   else if(!password.match(upperCaseLetters)) { 
            //     return {
            //         status: 0,
            //         message: "Password must include atleast a character",
            //     }
    
            //   } 
            //  else if(!password.match(numbers)) { 
            //     return {
            //         status: 0,
            //         message: "Password must include atleast a number",
            //     }
            //   }
            
            if(password.length < 8) {

                return this.apiResponse(0, "Password too short! 8 or more characters required", "")

            }
    
            const safePassword = await Hash.make(password)
            //const newTeamDetails = await Developer.create({ email:email, teamname: teamname, regtoken: regToken})
            const newTeamDetails = await Database
            .table('developers')
            .where('email', email)
            .update({password: safePassword, username: username, country: country, domicilestate: domicilestate })
    
            return this.apiResponse(1, "Your data has been stored!", newTeamDetails)

            }//endofTeamDetails 1
    





//*********************************************ADD DEVELOPER TO TEAM****************************************************************
//*******************************************************************************************************************
        async addTeams ({ request }) {
        var newEmail5=""
        var newEmail6 = ""
        var teamID=1
            const { email1, email2, email3, email4, email5, email6 } = request.all()

            if (!email1 || !email2 || !email3 || !email4){
                return this.apiResponse(0, "A team on Grupa must have atleast 4 members.")
            }
            
            else if (!this.validateEmail(email1)){
                return this.apiResponse(0, "Email 1 is not a valid email address.")
            }

            else if (!this.validateEmail(email2)){
                return this.apiResponse(0, "Email 2 is not a valid email address.")
            }

            else if (!this.validateEmail(email3)){
                return this.apiResponse(0, "Email 3 is not a valid email address.")
            }

            else if (!this.validateEmail(email4)){
                return this.apiResponse(0, "Email 4 is not a valid email address.")
            }

            if (email5 && email5!=undefined){
                if (!this.validateEmail(email5)){
                    return this.apiResponse(0, "Email 5 is not a valid email address.")
                }
                newEmail5 = email5
                
                if (email6 && email6!=undefined){
                    if (!this.validateEmail(email6)){
                        return this.apiResponse(0, "Email 6 is not a valid email address.")
                    }
                    newEmail6 = email6
                }
            }
            

            const emailArray = [email1, email2, email3, email4, newEmail5]
            
            if (this.hasDuplicates(emailArray)){
                return this.apiResponse(3, "Duplicate emails present!","")
            }
 
            //var e1 = "kay1@gmail.com"; var e2 = "kay20@gmail.com"; var e3 = "kay28@gmail.com"
 
            const exist = await Database.select('email')
            .from('developers')
            .whereIn('email', [email1, email2, email3, email4, newEmail5, newEmail6])

            if (exist.length>0){
                return this.apiResponse(2, "Atleast one of these users already exist and cannot be registered to another team", exist)
            }
            
            this.registerDev(email1, teamID)
            this.registerDev(email2, teamID)
            this.registerDev(email3, teamID)
            this.registerDev(email4, teamID)
            if (newEmail5.length>0){
            this.registerDev(newEmail5, teamID)
                if (newEmail6.length>0){
            this.registerDev(newEmail6, teamID)
                }    
            }

            return this.apiResponse(1, "Congratulations! Access links have been sent to your team members. Welcome to Grupa one again", "")

        }//end-AddTeam



//**********************************************VERIFY DEVELOPER***************************************************************
//***********************************************************************************************************************
    async verifyDeveloper ({ request }){
        
        const { token } = request.all()

        if (!token || token==undefined || token.length<4){
            return this.apiResponse(0, "Invalid token", "")
        }

        var illegalChars = /\W/;
        if (illegalChars.test(token)){
            return this.apiResponse(0, "Invalid token", "")
        }
        else{
            const ver = await Database.select('email', 'teamid').from('developers').where({regtoken: token}).first()
            
            if (!ver.email){
            return this.apiResponse(0, "Invalid token", "")
            }
            else{
                var accessToken = crypto.randomBytes(90).toString('hex')

                const setToken = await Database.table('developers')
                .where('token', token)
                .update('accesstoken', accessToken)
            
                return this.apiResponse(1, "Welcome to Grupa! Fill the form to complete your registration", accessToken)
            }
        }
    }///endVerifyDeveloper



    async developerDetails ({ request }){

        const { firstname, lastname, address, domicilestate, specialization, phonenumber, password, confirmpassword, regToken } = request.all()

        if (!firstname || !lastname ){

            return this.apiResponse(0, "Your name is required.", "")

        }
        else if (firstname.length< 2 || firstname.length>20 || lastname.length< 2 || lastname.length>20 ){

            return this.apiResponse(0, "First name and last name should be between 2-20 characters each.", "")
        }

        if (!specialization){

        }

        if (!phonenumber){

            return this.apiResponse(0, "Phone number?", "")
        }


        if (!address){

            return this.apiResponse(0, "Address?", "")
        }

        else if (!domicilestate){

            return this.apiResponse(0, "State?", "")

        }

        if (!password){

            return this.apiResponse(0, "Password? Secure your account!", "")

        }

        if (!confirmpassword){

            return this.apiResponse(0, "Verify your password!", "")
        }

        if (password!=confirmpassword){

            return this.apiResponse(0, "Passwords are not the same", "")

        }

        const safePassword = await Hash.make(password)
        const devrow = await Database.table('developers')
                        .where('regtoken', regToken)
                        .update({firstname:firstname, lastname:lastname, address: address, password: safePassword, domicilestate: domicilestate, phonenumber: phonenumber})



    }//endDeveloperDetails

        
    









}////endofClass

module.exports = DevController
