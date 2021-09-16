const express = require("express");
const request = require("request");
const app = express();
const https = require("https");


app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.get("/", function (req, res) {
    res.sendFile(__dirname + "/signup.html");
})
app.post("/", function (req,res) {
    const first = req.body.firstName;
    const last = req.body.lastName;
    const Email = req.body.email;
    var data = {
        members: [
            {
                email_address: Email,
                status: "subscribed",
                merge_fields: {
                    FNAME: first,
                    LNAME: last
                }


            }
        ]
    }
    const jsonData = JSON.stringify(data);
    const url = 'https://us6.api.mailchimp.com/3.0/lists/c96540e2e8'
    const option = {
        method: "Post",
        auth:"sumit1:d7f710e535b35203f62d7a512a14ec82-us6"
    }
    const request=https.request(url, option, function (response) {
        if (response.statusCode === 200) {
            res.sendFile(__dirname + "/success.html");
        } else {
            res.sendFile(__dirname + "/failure.html")
        }
        response.on("data", function (data) {
            console.log(JSON.parse(data));
        })
    })
    request.write(jsonData);
    request.end();
    app.post("/failure", function (req, res) {
        res.redirect("/")
    })
})

app.listen(process.env.PORT||3000, function () {
    console.log("Server is running at port 3000");
})

// key
// e80e4681a444723db90dc497ea9de871 - us6

// c96540e2e8