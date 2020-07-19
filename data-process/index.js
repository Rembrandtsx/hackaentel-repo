const csvFilePath='positivos_covid.csv'
const csv=require('csvtojson')
const fs = require("fs")
let deptos={}
let provinc={}
let district={}
csv()
.fromFile(csvFilePath)
.then((jsonObj)=>{
    jsonObj.forEach(el=>{
        deptos[el.DEPARTAMENTO] = (deptos[el.DEPARTAMENTO] || 0)+1;
        provinc[el.PROVINCIA] = (provinc[el.PROVINCIA] || 0)+1;
        district[el.DISTRITO] = (district[el.DISTRITO] || 0)+1;

    })

    fs.writeFileSync("result.json",JSON.stringify( {departamentos: deptos, provincias: provinc, distritos: district}))

    /**
     * [
     * 	{a:"1", b:"2", c:"3"},
     * 	{a:"4", b:"5". c:"6"}
     * ]
     */ 
})