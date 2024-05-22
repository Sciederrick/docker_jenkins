// @ts-nocheck
const { validateOperands } = require('./utils')
const { sum, subtract, multiply, divide } = require('./lib/ops')

const express = require('express')
const app = express()
const port = 3000

app.use(express.urlencoded({ extended:true }))
app.use(express.static('public'))

app.get('/', (_, res) => {
    return res.sendFile(__dirname + '/views/index.html')
})

app.get('/api/ops/addition', (req, res) => {
    const validInputs = validateOperands(req.query.op1, req.query.op2)
    if (!validInputs) {
        return res.status(400).json({ message: 'op1 and op2 are invalid.'})
    }
        
    return res.json({
        status: 'ok',
        operation: 'addition',
        answer: sum(validInputs.op1, validInputs.op2)
    })
})

app.get('/api/ops/subtraction', (req, res) => {
    const validInputs = validateOperands(req.query.op1, req.query.op2)
    if (!validInputs) {
        return res.status(400).json({ message: 'op1 and op2 are invalid.'})
    }
        
    return res.json({
        status: 'ok',
        operation: 'subtraction',
        answer: subtract(validInputs.op1, validInputs.op2)
    })
})

app.get('/api/ops/multiplication', (req, res) => {
    const validInputs = validateOperands(req.query.op1, req.query.op2)
    if (!validInputs) {
        return res.status(400).json({ message: 'op1 and op2 are invalid.'})
    }
        
    return res.json({
        status: 'ok',
        operation: 'multiplication',
        answer: multiply(validInputs.op1, validInputs.op2)
    })
})

app.get('/api/ops/division', (req, res) => {
    const validInputs = validateOperands(req.query.op1, req.query.op2)
    if (!validInputs) {
        return res.status(400).json({ message: 'op1 and op2 are invalid.'})
    }
        
    return res.json({
        status: 'ok',
        operation: 'division',
        answer: divide(validInputs.op1, validInputs.op2)
    })
})

app.listen(port, () => {
    console.log(`Basic calculator api listening on port ${port}`)
})