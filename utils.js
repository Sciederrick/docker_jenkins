const validateOperands = (op1, op2) => {
    if (!(op1 && op2)) return false

    op1 = parseInt(op1)
    op2 = parseInt(op2)

    return isNaN(op1) && isNaN(op2) ? false : { op1, op2 }
}

module.exports = {
    validateOperands
}

