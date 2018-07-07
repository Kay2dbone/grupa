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

Route.on('/').render('welcome')


Route.group(()=>{
    Route.get('/login', 'AuthController.login')
    Route.post('/register', 'AuthController.register')
    Route.post('/login', 'onboarding/DevController.login')   //.middleware('auth')
    }).prefix('auth');
    
    
    Route.group(()=>{    //Onboarding Team Route
        Route.get('/', 'DeveloperController.index')
        Route.post('/newteam', 'onboarding/DevController.newteam')
        Route.post('/verifyemail', 'onboarding/DevController.verifyemail')
        Route.post('/addteams', 'onboarding/DevController.addTeams')
        Route.post('/verifydev', 'onboarding/DevController.verifyDeveloper')
        Route.post('/addtoportfolio', 'onboarding/DevController.addtoportfolio')
        Route.post('/teamdetails', 'onboarding/DevController.teamDetails')
        Route.post('/bankdetails', 'onboarding/DevController.bankdetails')
        
        }).prefix('on-dev');
    
    
    Route.group(()=>{    //Onboarding Client Route
        Route.get('/', 'onboarding/ClientController.index')
        Route.post('/login', 'onboarding/ClientController.login')   //.middleware('auth')
        Route.post('/dashboard', 'onboarding/ClientController.dashboard')
        Route.get('/portfolio', 'onboarding/ClientController.portfolio')
        Route.post('/addtoportfolio', 'onboarding/ClientController.addtoportfolio')
        Route.post('/newteam', 'onboarding/ClientController.newteam')
        Route.post('/verifyemail', 'onboarding/ClientController.verifyemail')        
        }).prefix('on-client');
    
    
    
    Route.group(()=>{ //Dev Team Settings
        Route.get('/changepassword', 'DeveloperController.login')
        Route.post('/changebankdetails', 'DeveloperController.dashboard')
        Route.post('/', 'DeveloperController.register')
        Route.post('/register', 'DeveloperController.register')
        Route.post('/register', 'DeveloperController.register')
        Route.post('/register', 'DeveloperController.register')
        Route.post('/register', 'DeveloperController.register')
        }).prefix('dev/settings');
            
    
    Route.group(()=>{ //Client
        Route.get('/changepassword', 'DeveloperController.login')
        Route.post('/makepayment', 'DeveloperController.makepayment')
        Route.post('/', 'DeveloperController.register')
        Route.post('/startaproject', 'DeveloperController.register')
        Route.post('/register', 'DeveloperController.register')
        Route.post('/register', 'DeveloperController.register')
        Route.post('/register', 'DeveloperController.register')
        }).prefix('client');
        
    
    Route.group(()=>{ //Grupa Admin
        Route.get('/changepassword', 'DeveloperController.login')
        Route.post('/changebankdetails', 'DeveloperController.dashboard')
        Route.post('/', 'DeveloperController.register')
        Route.post('/paymentreports', 'DeveloperController.paymentreports')
        Route.post('/payments', 'DeveloperController.register')
        Route.post('/paydeteam', 'DeveloperController.register')
        Route.post('/register', 'DeveloperController.register')
        }).prefix('grupa');
    