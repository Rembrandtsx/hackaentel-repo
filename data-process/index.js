const csvFilePath = 'positivos_covid.csv';
const csv = require('csvtojson');
const fs = require("fs");

let deptos = {};
let provinc = {};
let district = {};

csv()
.fromFile(csvFilePath, { encoding: "latin1" })
.then((jsonObj)=>{
    jsonObj.forEach(el=>{
        deptos[el.DEPARTAMENTO] = (deptos[el.DEPARTAMENTO] || 0)+1;
        provinc[el.PROVINCIA] = (provinc[el.PROVINCIA] || 0)+1;
        district[el.DISTRITO] = (district[el.DISTRITO] || 0)+1;
    });

    let deptosArr = [];
    let provincArr = [];
    let districtArr = [];
    for (var dep in deptos) {
        deptosArr.push({name: dep[0] + dep.slice(1).toLowerCase(), value: deptos[dep]});
    }
    for (var pro in provinc) {
        provincArr.push({name: pro[0] + pro.slice(1).toLowerCase(), value: provinc[pro]});
    }
    for (var dis in district) {
        districtArr.push({name: dis[0] + dis.slice(1).toLowerCase(), value: district[dis]});
    }

    fs.writeFileSync("../result.json",JSON.stringify( {Departamento: deptosArr, Provincia: provincArr, Distrito: districtArr}))

});