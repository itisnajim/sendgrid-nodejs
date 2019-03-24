var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors')
const sgMail = require('@sendgrid/mail');


var app = express();
app.use(cors());
app.use(bodyParser.json({ type: 'application/json' }));
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));


app.get('/', function(req, res) {
    res.set('Content-Type', 'text/html');
    res.send(new Buffer(`
     <h2>sendgrid-nodejs</h2> 
     <p>Example of using nodejs to send emails via https://sendgrid.com</p>
     <p><a href="https://github.com/itisnajim/sendgrid-nodejs">https://github.com/itisnajim/sendgrid-nodejs</a></p>
    
     <h2>Main code</h2>
     <p><a href="https://github.com/sendgrid/sendgrid-nodejs/tree/master/packages/mail">GITHUB REPO: Mail Service for the Sendgrid v3 Web API</a></p>
     <code>
     const sgMail = require('@sendgrid/mail'); 
     sgMail.setApiKey(APIKEY_HERE);
    const msg = {
        to: to,
        from: from,
        subject: subject,
        html: html,
    };
    sgMail.send(msg)
        .then(sgData=>{
            console.log("sgData=", sgData);
        })
        .catch(errs=>{
            console.log("sgMail errs", errs);
        })
     </code>
     <br>
     <hr>
     <br>
     <h2>FOR TEST YOU CAN USE REST API POST</h2>
     <code>
    curl --request POST \\
    --url http://sendgrid-nodejs-oxailstudiosnode.7e14.starter-us-west-2.openshiftapps.com \\
    --header "Authorization: Bearer $SENDGRID_API_KEY" \\
    --header 'Content-Type: application/json' \\
    --data '{"personalizations": [{"to": [{"email": "test@example.com"}]}],"from": {"email": "test@example.com"},"subject": "Sending with SendGrid is Fun","content": [{"type": "text/plain", "value": "and easy to do anywhere, even with cURL"}]}'
    </code>
    <br>
    <hr>
    <br>
    <h2>Note: </h2>
    <code>
    <p>If you have a browser-only applications, you can bypass cors using the demo above
    but is NOT RECOMMENDED</p>
    <p>read: </p>
    <p><a href="https://sendgrid.com/docs/for-developers/sending-email/cors/">https://sendgrid.com/docs/for-developers/sending-email/cors/</a></p>
    
    </code>
    `));

});

app.post('/', function (req, res) {

    var APIKEY = req.headers.authorization;
    if(APIKEY) APIKEY = APIKEY.slice(APIKEY.indexOf(" ")+1);
    let data = req.body;
    let to = data.personalizations[0].to[0].email;
    let subject = data.subject;
    let from = data.from.email;
    let html = data.content[0].value;
    console.log(data, "APIKEY=", APIKEY, "to=", to, "subject=", subject, "from=",from, "html=", html);
    //*
    sgMail.setApiKey(APIKEY);
    const msg = {
        to: to,
        from: from,
        subject: subject,
        html: html,
    };
    sgMail.send(msg)
        .then(sgData=>{
            console.log("sgData=", sgData);
            res.statusCode = 201;
            res.json(sgData);
        })
        .catch(errs=>{
            console.log("sgMail errs", errs);
            res.statusCode = 500;
            res.json(errs);
        })

})

// setup ports
var server_port = process.env.OPENSHIFT_NODEJS_PORT || 8080;
var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0';
// server listens in on port
app.listen(server_port, server_ip_address, function () {
    console.log( "Listening on " + server_ip_address + ", server_port " + server_port );
});