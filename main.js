const express = require('express')
const bodyParser = require('body-parser')
const fs = require('fs')

const app = express()

app.use(bodyParser.urlencoded({extended:false}))

//removed savedetails form action="/savedetails"
app.get('/login', (req,res,next)=>{
    res.send('<form onsubmit="localStorage.setItem(`username`, document.getElementById(`username`).value)" action="/" ><input id="username" type="text" placeholder="username" name="username"><button type="submit">Login</button></form>')
})

//save username in local storage and redirect to chat window
app.post('/', (req,res,next)=>{
   
    console.log(req.body)

    fs.writeFile('chats.txt', req.body.hidden + ':' + req.body.message + ' ', {flag: 'a'}, err =>{
        res.redirect('/')
    })
    
})

app.get('/',(req,res,next)=>{

    fs.readFile('chats.txt', (err, data) => {
        data = data.toString()
        if(data === ''){
            res.send('<p>No chats exist</p><form onsubmit="document.getElementById(`hidden`).value = localStorage.getItem(`username`)" action="/" method="POST"><input type="text" placeholder="enter message" name="message"><input id="hidden" type="hidden" name="hidden"><button type="submit">Send</button></form>')
        }
        else{
            res.send(`<p>${data}</p><form onsubmit="document.getElementById('hidden').value  = localStorage.getItem('username')" action="/" method="POST"><input type="text" placeholder="enter message" name="message"><input id="hidden" type="hidden" name="hidden"><button type="submit">Send</button></form>`)
        }
    })   
})

app.use('/',(req,res,next)=>{
    res.send('<h1>Page Not Found</h1>')
})

app.listen(3000)