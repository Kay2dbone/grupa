'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

const Route = use('Route')

//Route.on('/').render('welcome')


Route.group(()=>{
    Route.get('/clientlogin', 'platform/AccessController.clientlogin')
    Route.get('/devlogin', 'platform/AccessController.devlogin')
    Route.post('/forgotpassword', 'platform/AccessController.forgotpassword')
    Route.post('/resetpassword', 'platform/AccessController.resetpassword')
    Route.post('/contactus', 'platform/AccessController.contactus')
       //.middleware('auth')
    }).prefix('auth');
    
     
    //Onboarding Team Route
    Route.group(()=>{
        Route.get('/', 'DeveloperController.index')
        Route.post('/newteam', 'onboarding/DevController.newteam')
        Route.post('/verifyemail', 'onboarding/DevController.verifyemail')
        Route.post('/addteams', 'onboarding/DevController.addTeams')
        Route.post('/verifydev', 'onboarding/DevController.verifyDeveloper')
        Route.post('/addtoportfolio', 'onboarding/DevController.addtoportfolio')
        Route.post('/teamdetails', 'onboarding/DevController.teamDetails')
        Route.post('/bankdetails', 'onboarding/DevController.bankdetails')
        
        }).prefix('on-dev');
    
    
    //Onboarding Client Route
    Route.group(()=>{  
        Route.get('/register', 'onboarding/ClientController.register')
        Route.post('/projectbrief', 'onboarding/ClientController.projectbrief')
        Route.post('/verifyemail', 'onboarding/ClientController.verifyemail')        
        }).prefix('on-client');

        
    Route.group(()=>{ //Team Dashboard
        Route.get('/portfolio', 'dev/DeashboardController.portfolio')
        Route.get('/projects', 'dev/DeashboardController.projects')
        Route.post('/..', 'dev/DeashboardController...')
        Route.post('/..', 'dev/DeashboardController...')
        Route.post('/..', 'dev/DeashboardController...')
        }).prefix('dev');
    
    


    //Dev Team Settings
    Route.group(()=>{
        Route.post('/changepassword', 'dev/settings/DeveloperController.login')
        Route.post('/changebankdetails', 'dev/settings/DeveloperController.dashboard')
        Route.post('/removeamember', 'dev/settings/DeveloperController.register')
        Route.post('/addamember', 'dev/settings/DeveloperController.addamember')
        Route.post('/..', 'dev/settings/DeveloperController...')

        }).prefix('dev/settings');
            
 

    //Client Dashboard
    Route.group(()=>{ 
        Route.get('/projectlist', 'clients/DashboardController.projectlist')
        Route.post('/makepayment', 'clients/DashboardController.makepayment')
        Route.post('/newproject', 'clients/DashboardController.newproject')
        Route.post('/editproject', 'clients/DashboardController.editproject')
        }).prefix('client/dashboard');

        

    //Client Settings
    Route.group(()=>{
        Route.get('/changepassword', 'clients/SettingController.changepassword')
        Route.post('/..', 'clients/SettingController...')
        }).prefix('client/settings');
        
    

        //Grupa Admin
    Route.group(()=>{
        Route.post('/login', 'grupa/GrupaAdminController.login')
        Route.get('/payments', 'grupa/GrupaAdminController.payments')
        Route.get('/changepassword', 'grupa/GrupaAdminController.login')
        Route.get('/paymentreports', 'grupa/GrupaAdminController.paymentreports')
        Route.post('/paydevteam', 'grupa/GrupaAdminController.paydevteam')
        Route.post('/dashboard', 'grupa/GrupaAdminController.dashboard')
        }).prefix('grupa');
    