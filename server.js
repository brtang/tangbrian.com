var express = require('express');
var path = require('path');
var app = express();
//Link in body-parser
app.use(require('body-parser')());





app.set('port', process.env.PORT || 80);


//SendGrid stuff
 /* var helper = require('sendgrid').mail
  from_email = new helper.Email('brtang@ucsc.edu')
  to_email = new helper.Email('brtang@ucsc.edu')
  subject = 'BrianTang.com: New Form Response'
  content = new helper.Content('text/plain', 'Hello, Email!')
  mail = new helper.Mail(from_email, subject, to_email, content)
 
  var sg = require('sendgrid')('XXXXXXXXXXXXXXXXXXXXXXXXX');
  var request = sg.emptyRequest({
    method: 'POST',
    path: '/v3/mail/send',
    body: mail.toJSON()
  });
 
  sg.API(request, function(error, response) {
    console.log(response.statusCode)
    console.log(response.body)
    console.log(response.headers)
  })*/

app.use(express.static(path.join(__dirname, 'public')))

app.use('/resume', express.static(path.join(__dirname, 'public/imgs/Resume.pdf')));

app.get('/*', function(req, res){
    res.sendFile(__dirname + '/public/index.html');
});



//Catch form submits from About page    
app.post('/form', function(req, res) {
    console.log(req.body.name);
    console.log(req.body.email);
    console.log(req.body.text);
    
   /* var form = new Form({
        name: req.body.name,
        email: req.body.email,
        text: req.body.text
    });
    form.save(function(err, form){
        if(err) return console.error(err);
        console.dir(form);
    });*/
     var helper = require('sendgrid').mail
    from_email = new helper.Email('brtang@ucsc.edu')
    to_email = new helper.Email('brtang@ucsc.edu')
    subject = 'BrianTang.com: New Form Response'
    content = new helper.Content('text/plain', req.body.name + '\n' + req.body.email + '\n' + req.body.text)
    mail = new helper.Mail(from_email, subject, to_email, content)
 
    var sg = require('sendgrid')('XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX');
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

