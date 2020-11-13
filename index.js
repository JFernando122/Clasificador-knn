const {readFile} = require('./fileHandler')
const express = require('express')
const multer = require("multer")
const {convertData,generateConfusionMatrix,getBestMatrix} = require('./dataProccesor')
const {validateWithFile,validateWithCrossValidation} = require('./validation')

const upload = multer({dest:"./uploads/", preservePath:true})

const app = express()

app.use(express.static('views'))
app.use(express.urlencoded({extended:false}))
app.use(express.json())

app.set('view engine','ejs')

app.post('/',upload.fields([{name: 'trainData',maxCount:1},{name: 'testFile', maxCount: 1}]), async (req,res) =>{
    const traindata = await readFile(`./uploads/${req.files.trainData[0].filename}`)
    const formatedTrainData = convertData(traindata)
    const k = parseInt(req.body.k)
    const distance = req.body.distance
    let knnPredictions, bayesPredictions, actualPredictions;
    let knn,bayes;
    if(req.body.validation == "testFile"){
        const testData = await readFile(`./uploads/${req.files.testFile[0].filename}`)
        let formatedTestData = convertData(testData)
        const predictions = validateWithFile(formatedTrainData.slice(0),formatedTestData.slice(0),{k,distance})
        knnPredictions = predictions.knnPredictions
        bayesPredictions = predictions.bayesPredictions
        actualPredictions = predictions.actualPredictions
        knn = generateConfusionMatrix(knnPredictions,actualPredictions)
        bayes = generateConfusionMatrix(bayesPredictions,actualPredictions)
    }else if(req.body.validation == "folds"){
        const folds = req.body.folds
        const predictions = validateWithCrossValidation(formatedTrainData.slice(0),{folds,distance,k})
        knnPredictions = predictions.predictedLabelsKnn
        bayesPredictions = predictions.predictedLabelsBayes
        actualPredictions = predictions.actualLabels
        knn = getBestMatrix(knnPredictions,actualPredictions)
        bayes = getBestMatrix(bayesPredictions,actualPredictions)
    }
    res.render('results',{
        bayes,knn
    })
})

app.listen(5000, () => console.log("Server up and running"))