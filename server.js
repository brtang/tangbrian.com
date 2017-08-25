var express = require('express');
var path = require('path');
var app = express();
//Link in body-parser
app.use(require('body-parser')());



//Set handlebars
/*
var handlebars = require('express3-handlebars').create({
        defaultLayout:'main',
        helpers: {
            section: function(name, options){
                if(!this._sections) this._sections = {};
                this._sections[name] = options.fn(this);
                return null;
            }
        }        
});

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
*/


app.set('port', process.env.PORT || 8080);


//MongoDB stuff
/*
var mongoose = require('mongoose');
var db = mongoose.connection;
db.on('error', console.error);

 var formSchema = new mongoose.Schema({
        name: String,
        email: String,
        text: String
    });

    var Form = mongoose.model('Form', formSchema);
    
mongoose.connect('mongodb://localhost:27017/test');
*/

//SendGrid stuff
 /* var helper = require('sendgrid').mail
  from_email = new helper.Email('brtang@ucsc.edu')
  to_email = new helper.Email('brtang@ucsc.edu')
  subject = 'BrianTang.com: New Form Response'
  content = new helper.Content('text/plain', 'Hello, Email!')
  mail = new helper.Mail(from_email, subject, to_email, content)
 
  var sg = require('sendgrid')('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');
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

app.use('/', express.static(path.join(__dirname, 'public')))

app.use('/resume', express.static(path.join(__dirname, 'public/imgs/Resume.pdf')));

app.get('*', function(req, res){
return res.redirect('/')});

//Catch form submits from About page    
app.post('/view1', function(req, res) {
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
 
    var sg = require('sendgrid')('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');
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

    
     res.redirect(303, '/about');
});    
    



app.listen(app.get('port'), function(){
    console.log('Express started on http://localhost:' + 
    app.get('port') + '; press Ctrl-C to terminate.');
});

