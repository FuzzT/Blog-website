const express = require('express')
const app = express();
const ejs = require('ejs')
const _ = require('lodash')
const bodyParser = require('body-parser');
const jsdom = require('jsdom')
app.use(express.static('public'))

const homeStartingContent = "sdkjbvskjnbvnernvennksvbserovbefgbhvjdiibnersdvc njsdajvndsjjvdjsv nvsdnv"
const aboutContent = "In literary theory, a text is any object that can be read, whether this object is a work of literature, a street sign, an arrangement of buildings on a city block, or styles of clothing. It is a coherent set of signs that transmits some kind of informative message."
const contactContent = " Looking for inspiration for your Contact Us page? See these 39 amazing examples from ecommerce, SaaS, agencies, and other brands."
// const nameForInput = window.document.getElementById("name").value

let posts = []
app.set('view engine','ejs')
app.use(bodyParser.urlencoded({extended:true}))


app.get("/",(req,res)=>{
    res.render("home",{homeStartingContent,posts})
})
app.get("/about",(req,res)=>{
    res.render("about",{aboutContent})
})
app.get("/contact",(req,res)=>{
    res.render("contact",{contactContent})
})
app.get("/compose",(req,res)=>{
    res.render("compose")
})
app.post("/compose",(req,res)=>{
    const pTitle = req.body.publish
    const pBody = req.body.postBody;
    const postAll = {
        pTitle,
        pBody
    }
    posts.push(postAll)
    res.redirect("/")
})

app.get("/posts/:postName",(req,res)=>{
    const requestedTitle = _.lowerCase(req.params.postName);

    posts.forEach((post)=>{
        const storedVariable = _.lowerCase(post.pTitle);
        if(requestedTitle === storedVariable){ 
            res.render("post",{
                title: post.pTitle,             
                content: post.pBody
            })

        }
    })

})
app.listen("3000",()=>{
    console.log("server is running...");
})