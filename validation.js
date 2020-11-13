const {GaussianNB} = require('ml-naivebayes')
const {labelSeparator,getDataTypes,dataDivider} = require('./dataProccesor')
const {knn} = require('./k-nn')

const validateWithFile = (trainData,testData,{k = 2, distance = 'Eucledian'}) =>{
    const trainInfo = labelSeparator([...trainData])
    const testInfo = labelSeparator([...testData])
    let NB = new GaussianNB()
    NB.train(trainInfo.attributes,trainInfo.labels)
    return {
        knnPredictions: knn(trainInfo.attributes,trainInfo.labels,testInfo.attributes,getDataTypes(trainInfo.attributes[0]),{k,func: distance}),
        bayesPredictions: NB.predict(testInfo.attributes),
        actualPredictions: testInfo.labels
    }
}

const validateWithCrossValidation = (trainData,{folds = 2, k = 2, distance = 'Eucledian'}) => {
    let dividedData = dataDivider(trainData,folds).map(item => labelSeparator(item))
    const dataTypes = getDataTypes(dividedData[0].attributes[0])
    let predictedLabelsKnn = []
    let predictedLabelsBayes = []
    let actualLabels = []
    for(let i = 0; i < dividedData.length; i++){
        const testInfo = dividedData[i]
        const trainInfo = dividedData.reduce((total,current,index) => {
            if(index != i)
                total = {
                    attributes: [...total.attributes , ...current.attributes],
                    labels: [...total.labels , ...current.labels]
                }
            return total
        }, {attributes: [], labels: []})
        let predictionknn = knn(trainInfo.attributes,trainInfo.labels,testInfo.attributes,dataTypes,{k,func: distance})
        predictedLabelsKnn.push(predictionknn)
        let NB = new GaussianNB()
        NB.train(trainInfo.attributes,trainInfo.labels)
        let predictionBayes = NB.predict(testInfo.attributes)
        predictedLabelsBayes.push(predictionBayes)
        actualLabels.push(testInfo.labels)
    }
    return {predictedLabelsKnn, predictedLabelsBayes,actualLabels}
}
 module.exports = {
     validateWithCrossValidation,
     validateWithFile
 } 