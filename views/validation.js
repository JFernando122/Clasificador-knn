const folds = document.getElementById('folds')
const testFile = document.getElementById('testFile')

const  testFileActive = () => {
    testFile.disabled = false
    testFile.required = true
    folds.disabled = true
    folds.required = false
}

const foldsActive = () => {
    folds.disabled = false
    folds.required = true
    testFile.disabled = true
    testFile.required = false
}