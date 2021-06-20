const express =require("express")
const path =require("path")
const hbs=require("hbs")
const { registerPartials } = require("hbs")
const geocode =require("./utils/geocode")
const forecast = require("./utils/forecast")

const app =express()

//Define paths for express config
const publicDirectoryPath=path.join(__dirname,"../public")
const viewsPath=path.join(__dirname,"../templates/views")
const partialsPath=path.join(__dirname,"../templates/partials")

//setup handlebars engine and views location
app.set("view engine","hbs")
app.set("views",viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get("", (req,res)=>{
    res.render("index",{
        title:"weather app",
        name:"Ali Bayır"
    })
})

app.get("/about", (req,res)=>{
    res.render("about",{
        title:"About Me",
        name:"Ali Bayır"
    })
})

app.get("/help",(req,res)=>{
    res.render("help",{
        title:"Welcome To Help Page",
        name:"Ali Bayır"
    })
})



app.get("/weather", (req,res)=>{
    if (req.query.address) {
        geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
            if (error) {
              return res.send({error})
            }
             forecast(latitude,longitude, (error, forecastData) => {
                 if (error) {
                    return res.send({error})
                 }
                 res.send({
                     forecast:forecastData,
                     location,
                     address:req.query.address
                 })
                 console.log(forecastData)
              })
         })
    }
})

app.get("/products", (req,res)=>{
    if (!req.query.search) {
        return res.send({
            error:"you must provide search term"
        })
    }

    console.log(req.query.search)
    res.send({
        products:[]
    })
})

app.get("/help/*",(req,res)=>{
    res.render("404",{
        title:"404",
        name:"Ali",
        errorMessage:"Help Article Not Found"
    })
})

app.get("*",(req,res)=>{
    res.render("404",{
        title:"404",
        name:"Ali",
        errorMessage:"Page Not Found"
    })
})

app.listen(3000, ()=>{
    console.log("server is up in port 3000")
})