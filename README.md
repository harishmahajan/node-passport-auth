 *------------------- | ` To run the project follow the following steps ` | -------------------*

Step 1: Navigte to the base folder of project in Commandprompt
    `drive:> projects\folderlocation`

step 2 : Install dependencies first
    run command : `npm install`

step 3 : Start Project 
    run command : `npm start`


*--------------------------| ` Passport Stretagy Steps ` |-------------------------*

------------- ` 1) GOOGLE STRATEGY ` ------------

----------`NOTE : To use Google Strategy for passport Oauth We have to configure some cofiguration using google account which are listed below : `------

Step 1: Go to following link: ` https://developers.google.com/ `

Step 2: Go to projects tab and create new project with your custom name `Example : ApiTest`. 
        select the created project for further process.

Step 3: Go to `Social API` > `Google+ API` > press `Enable` button on Top of Window.

Step 4: Now we have to ctrate credentials for our Apllication > click on `create creadential` in left side menu.
        the `Google+ API` if selected bydefault in `Which api are you using?`
        -->  next we have to select `web browser (javascript)` in `whwre will you be calling the API from?`.
        Choose this option According to your requirements. (`Example : Android, ios, web server, play station, etc `).
        -->  next we have to select `User Data` in `What data you will be Accessing?`. next we have to click on `what credential do i need ?` button. 
        -->  After that we have to input out domain in tab `Authorized javascript origin` as out URL `http://locahost:3000`. same as put in `Authorized redirect URIs` too and click on `create client Id` button.
        -->  next we have to setup `Email` and `Product Name` for our Application. click on `continue` button.

Step 5: Then we get our `Client Id` and `Client Secret` for our created Application in google OAuth.
        we can get this credentials by clicking `credential` tab in side menu, too.

now, we cane use this `client id` and `client secret` in Our Application for `google OAuth passport Stretagy`.



------------- ` 2) FACEBOOK STRATEGY ` ------------