const csv = require('csv-parser')
const fs = require('fs')

const readFile = async filename => new Promise((resolve,reject)=>{
    let data = [];
    fs.createReadStream(filename).pipe(csv({headers:false}))
    .on('data', row => data.push(Object.values(row)))
    .on('end', () => {
        fs.unlinkSync(filename)
        resolve(data)
    }).on('error', () => {
        fs.unlinkSync(filename)
        reject('Something went wrong hehehe')
    })
})

module.exports = {readFile}