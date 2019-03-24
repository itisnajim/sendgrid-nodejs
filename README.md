# sendgrid-nodejs

Example of using nodejs to send emails via https://sendgrid.com

#demo

http://sendgrid-nodejs-oxailstudiosnode.7e14.starter-us-west-2.openshiftapps.com/

#Main code

Mail Service for the Sendgrid v3 Web API
Repo: https://github.com/sendgrid/sendgrid-nodejs/tree/master/packages/mail

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


#FOR TEST YOU CAN USE REST API POST

    curl --request POST \
    --url http://sendgrid-nodejs-oxailstudiosnode.7e14.starter-us-west-2.openshiftapps.com \
    --header "Authorization: Bearer $SENDGRID_API_KEY" \
    --header 'Content-Type: application/json' \
    --data '{"personalizations": [{"to": [{"email": "test@example.com"}]}],"from": {"email": "test@example.com"},"subject": "Sending with SendGrid is Fun","content": [{"type": "text/plain", "value": "and easy to do anywhere, even with cURL"}]}'
 
 
#Note

If you have a browser-only applications, you can bypass cors using the demo above
but is `not recommended` 

read:
https://sendgrid.com/docs/for-developers/sending-email/cors/
