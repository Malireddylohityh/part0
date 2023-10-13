

Settings

Hi! Here some our recommendations to get the best out of BLACKBOX:

Be as clear as possible

End the question in what language you want the answer to be, e.g: ‘connect to mongodb in python
or you can just
Go to Blackbox
Here are some suggestion (choose one):
Write a function that reads data from a json file
How to delete docs from mongodb in phyton
Connect to mongodb in nodejs
Ask any coding question
send
refresh
Blackbox AI Chat is in beta and Blackbox is not liable for the content generated. By using Blackbox, you acknowledge that you agree to agree to Blackbox's Terms and Privacy Policy
Skip to content
 
Search…
All gists
Back to GitHub
@Malireddylohityh 
@nuragic
nuragic/app.js file
Forked from saniko/app.js file
Created 11 years ago • Report abuse
Code
Revisions
2
Forks
1
<script src="https://gist.github.com/nuragic/4760962.js"></script>
app.js file
   define([

  'jquery',
  'underscore',
  'backbone',
  'marionette', 
  'handlebars',
  'text!templates/app_view.html',

  'modules/mainMenuView/mainMenuView',
  'modules/dashboard/dashboard',
],
function ($, _, Backbone, Marionette, Handlebars, tmpl, mainMenuView, dashboard ) {


    Backbone.Marionette.TemplateCache.prototype.compileTemplate = function(rawTemplate) {

        return Handlebars.compile(rawTemplate);
    };

    var App = new Backbone.Marionette.Application();

    App.addRegions({

         main: '#main'
    });

    App.addInitializer(function() {

       this.initAppLayout();   
    });

    App.on("initialize:after", function(){

      Backbone.history.start({ pushState: true });
    });

    App.initAppLayout = function() {

        AppLayout = Backbone.Marionette.Layout.extend({

         template: tmpl,

         regions: {
             userInfo: "#userInfo",
             mainMenu: "#mainMenu",
             content: "#content"
         },

        });

        var layout = new AppLayout();
        App.main.show(layout);

        App.main.currentView.mainMenu.show(new mainMenuView.Views.menu());
        App.main.currentView.content.show(new dashboard.Views.main());    

       // this can be a main menu navigation
       // this will change content at the "main" app screen
       // your links should include the role=nav-main-app

        $('a[role=nav-main-app]').click(function(e) {
          App.Router.navigate( $(this).attr('href'), {trigger: true});
          e.preventDefault(); 
        });  

    };

    return App;

});
app.js file:
   define([

  'jquery',
  'underscore',
  'backbone',
  'marionette', 
  'handlebars',
  'text!templates/app_view.html',

  'modules/mainMenuView/mainMenuView',
  'modules/dashboard/dashboard',
],
function ($, _, Backbone, Marionette, Handlebars, tmpl, mainMenuView, dashboard ) {


    Backbone.Marionette.TemplateCache.prototype.compileTemplate = function(rawTemplate) {

        return Handlebars.compile(rawTemplate);
    };

    var App = new Backbone.Marionette.Application();

    App.addRegions({

         main: '#main'
    });

    App.addInitializer(function() {

       this.initAppLayout();   
    });

    App.on("initialize:after", function(){

      Backbone.history.start({ pushState: true });
    });

    App.initAppLayout = function() {

        AppLayout = Backbone.Marionette.Layout.extend({

         template: tmpl,

         regions: {
             userInfo: "#userInfo",
             mainMenu: "#mainMenu",
             content: "#content"
         },

        });

        var layout = new AppLayout();
        App.main.show(layout);

        App.main.currentView.mainMenu.show(new mainMenuView.Views.menu());
        App.main.currentView.content.show(new dashboard.Views.main());    

       // this can be a main menu navigation
       // this will change content at the "main" app screen
       // your links should include the role=nav-main-app

        $('a[role=nav-main-app]').click(function(e) {
          App.Router.navigate( $(this).attr('href'), {trigger: true});
          e.preventDefault(); 
        });  

    };

    return App;

});
config.js file
// Use ECMAScript 5 Strict Mode
"use strict";

// Define jQuery as AMD module
define.amd.jQuery = true;

// Set the require.js configuration for your application.
require.config({

  // Initialize the application with the main application file
  deps: ["main"],

  paths: {

    libs: "../assets/js/libs",
    plugins: "../assets/js/plugins",

    // Libraries
    jquery: "../assets/js/libs/jquery",
    underscore: "../assets/js/libs/lodash",
    backbone: "../assets/js/libs/backbone",
    marionette: "../assets/js/libs/backbone.marionette",
    handlebars: "../assets/js/libs/handlebars",

    //plugins
    text : "../assets/js/plugins/text",
    i18n : "../assets/js/plugins/i18n",
    cookie: '../assets/js/plugins/jquery.cookie',

    //general
    UserSession: "../assets/js/libs/userSession",
  },

  config: {
        //Set the config for the i18n
        //module ID
        i18n: {
            locale: 'fr-fr'
        }
    },

  shim: {

     marionette: {
      deps: ['backbone'],
      exports: 'Backbone.Marionette'
    },

    backbone: {
      deps: ["underscore", "jquery"],
      exports: "Backbone"
    },

    handlebars: {
      deps: [],
      exports: "Handlebars"
    }

  }
});

config.js file:
// Use ECMAScript 5 Strict Mode
"use strict";

// Define jQuery as AMD module
define.amd.jQuery = true;

// Set the require.js configuration for your application.
require.config({

  // Initialize the application with the main application file
  deps: ["main"],

  paths: {

    libs: "../assets/js/libs",
    plugins: "../assets/js/plugins",

    // Libraries
    jquery: "../assets/js/libs/jquery",
    underscore: "../assets/js/libs/lodash",
    backbone: "../assets/js/libs/backbone",
    marionette: "../assets/js/libs/backbone.marionette",
    handlebars: "../assets/js/libs/handlebars",

    //plugins
    text : "../assets/js/plugins/text",
    i18n : "../assets/js/plugins/i18n",
    cookie: '../assets/js/plugins/jquery.cookie',

    //general
    UserSession: "../assets/js/libs/userSession",
  },

  config: {
        //Set the config for the i18n
        //module ID
        i18n: {
            locale: 'fr-fr'
        }
    },

  shim: {

     marionette: {
      deps: ['backbone'],
      exports: 'Backbone.Marionette'
    },

    backbone: {
      deps: ["underscore", "jquery"],
      exports: "Backbone"
    },

    handlebars: {
      deps: [],
      exports: "Handlebars"
    }

  }
});

controller.js file
define([
  'jquery',
  'underscore',
  'backbone',
  'marionette',
  'app',
  'userSession'
], 
function($, _, Backbone, Marionette, App, userSession) {

    return {

        goto_path1: function () {

            this.isAuthenticated();
            require(['modules/files/files_for_modul1'], function(someview){

                var currentView = new someview.Views.main();
                App.main.currentView.content.show(currentView);          
          })
        },

         goto_path2:  function () {

            this.isAuthenticated();
            require(['modules/files/files_for_modul2'], function(someOtherview){

                var currentView = new someOtherview.Views.main();
                App.main.currentView.content.show(currentView);    
            })
        },
        isAuthenticated: function() {

          if(!userSession.authenticated()){
               App.Router.navigate('login', {trigger: true});
           }
        }

    }   

});
controller.js file
  define([
  'jquery',
  'underscore',
  'backbone',
  'marionette',
  'app',
  'userSession'
], 
function($, _, Backbone, Marionette, App, userSession) {

    return {

        goto_path1: function () {

            this.isAuthenticated();
            require(['modules/files/files_for_modul1'], function(someview){

                var currentView = new someview.Views.main();
                App.main.currentView.content.show(currentView);          
          })
        },

         goto_path2:  function () {

            this.isAuthenticated();
            require(['modules/files/files_for_modul2'], function(someOtherview){

                var currentView = new someOtherview.Views.main();
                App.main.currentView.content.show(currentView);    
            })
        },
        isAuthenticated: function() {

          if(!userSession.authenticated()){
               App.Router.navigate('login', {trigger: true});
           }
        }

    }   

});
controller.js file:
define([
  'jquery',
  'underscore',
  'backbone',
  'marionette',
  'app',
  'userSession'
], 
function($, _, Backbone, Marionette, App, userSession) {

    return {

        goto_path1: function () {

            this.isAuthenticated();
            require(['modules/files/files_for_modul1'], function(someview){

                var currentView = new someview.Views.main();
                App.main.currentView.content.show(currentView);          
          })
        },

         goto_path2:  function () {

            this.isAuthenticated();
            require(['modules/files/files_for_modul2'], function(someOtherview){

                var currentView = new someOtherview.Views.main();
                App.main.currentView.content.show(currentView);    
            })
        },
        isAuthenticated: function() {

          if(!userSession.authenticated()){
               App.Router.navigate('login', {trigger: true});
           }
        }

    }   

});
controller.js file:
  define([
  'jquery',
  'underscore',
  'backbone',
  'marionette',
  'app',
  'userSession'
], 
function($, _, Backbone, Marionette, App, userSession) {

    return {

        goto_path1: function () {

            this.isAuthenticated();
            require(['modules/files/files_for_modul1'], function(someview){

                var currentView = new someview.Views.main();
                App.main.currentView.content.show(currentView);          
          })
        },

         goto_path2:  function () {

            this.isAuthenticated();
            require(['modules/files/files_for_modul2'], function(someOtherview){

                var currentView = new someOtherview.Views.main();
                App.main.currentView.content.show(currentView);    
            })
        },
        isAuthenticated: function() {

          if(!userSession.authenticated()){
               App.Router.navigate('login', {trigger: true});
           }
        }

    }   

});
index.html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
  <meta name="viewport" content="width=device-width,initial-scale=1">

  <title>Backbone.js</title>

  <!-- Application styles -->
  <!-- <link rel="stylesheet" href="/assets/css/index.css"> -->
  <!-- Frameworks -->
  <link rel="stylesheet" href="assets/css/bootstrap.min.css">
  <link rel="stylesheet" href="assets/css/bootstrap-responsive.min.css">
  
</head>

<body>
  <!-- Main container -->
  <div role="main" id="main"></div>

  <!-- Application source -->
  <script data-main="app/config" src="assets/js/libs/require.js"></script>
</body>
</html>
main content template
<div id="main-layout" type="layout">
	
	<div class="container-fluid">
		
	  <div class="row-fluid">
	  	
	    <div class="span2" >
	      <!--Sidebar content-->
	      <nav id="mainMenu" class="mainMenu">menu</nav>
	    </div>
	    
	    <div class="span10">
	    	
	    	<div >
		      <!--Body content-->
		       <header id="userInfo" class="userInfo">header</header>
	        </div>

	     
	      <!--Body content-->
	      <div style="height: 500px;background-color: #f2f2f2">
	      		<section id="content" class="content"></section>
	      </div>
	       
	      <!--Body content-->
	      <div >
		      <footer id="footer" class="footer">
			  	 <p>VERSION:1.1</p>
			   
		  	  </footer>
	     </div>
	      
	    </div>
	    
	  </div> 
	  
	</div>
	
</div>
main.js file
   define([
    "jquery", 
    "app", 
    "router",
    'userSession'
],
function ($, App, router,userSession) {

  "use strict";

  $(function() {

    App.Router = router; 
    App.start();


   // if(userSession.authenticated())
       //alert("us");


  });

});
main.js file:
   define([
    "jquery", 
    "app", 
    "router",
    'userSession'
],
function ($, App, router,userSession) {

  "use strict";

  $(function() {

    App.Router = router; 
    App.start();


   // if(userSession.authenticated())
       //alert("us");


  });

});
nav template
<section id="menu">
	
  <h1>Contents</h1>

  <ul>
    <li><a href="dashboard" role="nav-main-app">DASHBOARD</a></li>
    <li><a href="reports" role="nav-main-app">REPORTS</a></li>
    <li><a href="payments" role="nav-main-app">PAYMENTS</a></li>
    <li><a href="settings" role="nav-main-app">SETTINGS</a></li>
  </ul>
  
  
 
</section>
some html template using handlebars
<div>
	dashboard
	
	<div class="hero-unit">
		  <h1>Heading</h1>
		  <p>Tagline</p>
		  <p>
		  	<div>{{ok}}</div>
				<div>{{cancel}}</div>
				<div>{{this.feedUrl}}</div>
		    <a class="btn btn-primary btn-large">
		        
		    </a>
		  </p>
	</div>
</div>
userSession.js file
  define([
     'jquery',
     'underscore',
      'backbone',
      'cookie'
    ],
function($, _, Backbone, cookie){

    var UserSession = Backbone.Model.extend({

        defaults: {

            'accessToken': null,
            'userId': null
        },

        initialize: function(){

            this.load();
        },

        authenticated: function(){

            return Boolean(this.get('accessToken'));
        },

        save: function(authHash){

            $.cookie('userId', authHash.id);
            $.cookie('accessToken', authHash.accessToken);
        },

        load: function(){

            this.userId = $.cookie('userId');
            this.accessToken = $.cookie('accessToken');
        }
    })

    return new UserSession();

});
userSession.js file:
  define([
     'jquery',
     'underscore',
      'backbone',
      'cookie'
    ],
function($, _, Backbone, cookie){

    var UserSession = Backbone.Model.extend({

        defaults: {

            'accessToken': null,
            'userId': null
        },

        initialize: function(){

            this.load();
        },

        authenticated: function(){

            return Boolean(this.get('accessToken'));
        },

        save: function(authHash){

            $.cookie('userId', authHash.id);
            $.cookie('accessToken', authHash.accessToken);
        },

        load: function(){

            this.userId = $.cookie('userId');
            this.accessToken = $.cookie('accessToken');
        }
    })

    return new UserSession();

});
@Malireddylohityh
 
Leave a comment
No file chosen
Attach files by dragging & dropping, selecting or pasting them.
Footer
© 2023 GitHub, Inc.
Footer navigation
Terms
Privacy
Security
Status
Docs
Contact GitHub
Pricing
API
Training
Blog
About
