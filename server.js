// Custom imports
var config = require('./config');

// NPM Packages
var express = require('express');
var path = require('path');
var helper = require('sendgrid').mail
var sg = require('sendgrid')(config.key);


// Initialiaze Express server  
var app = express();
app.set('port', process.env.PORT || 80);

// Middleware
app.use(require('body-parser')());
app.use(express.static(path.join(__dirname, 'public')))
app.use('/resume', express.static(path.join(__dirname, 'public/imgs/Resume.pdf')));

// Catch-all to render home page
app.get('/*', function(req, res){
    res.sendFile(__dirname + '/public/index.html');
});


// Catch form responses from Contact form and use SendGrid to send the response to my email   
app.post('/form', function(req, res) {
    
    from_email = new helper.Email(config.email)
    to_email = new helper.Email(config.email)
    content = new helper.Content('text/plain', req.body.name + '\n' + req.body.email + '\n' + req.body.text)
    mail = new helper.Mail(from_email, config.subject, to_email, content)
    var request = sg.emptyRequest({
        method: 'POST',
        path: '/v3/mail/send',
        body: mail.toJSON()
    });
 
    sg.API(request, function(error, response) {
        console.log(response.statusCode)
        console.log(response.body)
        console.log(response.headers)
    })
   
     res.redirect(303, '/');
});    
    

app.listen(app.get('port'), function(){
    console.log('Express started on http://localhost:' + 
    app.get('port') + '; press Ctrl-C to terminate.');
});

