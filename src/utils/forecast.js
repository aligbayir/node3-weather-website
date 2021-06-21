const request = require("request")

const forecast=(latitude, longitude, callback)=>{
    const url = "http://api.weatherstack.com/current?access_key=13ae8b4eb01a84ba9523d225fab40139&query="+latitude +","+longitude+"&units=f"

    request({url,json:true},(error,{body})=>{
        if (error) {
            callback("Unable to connect weather service",undefined)
        }else if(body.error){
            callback("Unable to find location",undefined)
        }else{
            const humidity =body.current.humidity
            const feelsLike=body.current.feelslike
            const temperature=body.current.temperature
            callback(undefined,body.current.weather_descriptions[0]+". It is " +temperature+ " degree and " +"It feels like "+feelsLike+" degree. And the humidity is "+humidity+" percent")
        }
    })
}

module.exports=forecast