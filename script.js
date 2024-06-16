document.querySelectorAll('#car-type, #car-value, #lease-period, #down-payment').forEach(element => {
    element.addEventListener('input', calculateLeasing);
});

document.addEventListener('DOMContentLoaded', () => {
    const inputPairs = document.querySelectorAll('.input-pair');

    inputPairs.forEach(pair => {
        const rangeInput = pair.querySelector('input[type="range"]');
        const numberInput = pair.querySelector('input[type="number"]');

        // Function to sync the number input value to the range input
        const syncNumberInputToRange = () => {
            const value = parseInt(numberInput.value);
            if (!isNaN(value) && value >= rangeInput.min && value <= rangeInput.max) {
                rangeInput.value = value;
            }
        };

        // Function to sync the range input value to the number input
        const syncRangeInputToNumber = () => {
            numberInput.value = rangeInput.value;
        };

        // Update number input value when range input changes
        rangeInput.addEventListener('input', syncRangeInputToNumber);

        // Update range input value when number input changes
        numberInput.addEventListener('input', syncNumberInputToRange);

        // Ensure number input value is always valid when it loses focus
        numberInput.addEventListener('blur', syncNumberInputToRange);
    });
});

function calculateLeasing() {
    const carType = document.getElementById('car-type').value;
    const carValue = parseFloat(document.getElementById('car-value').value);
    const leasePeriod = parseInt(document.getElementById('lease-period').value);
    const downPaymentPercent = parseFloat(document.getElementById('down-payment').value);

    if (!carValue || !leasePeriod || !downPaymentPercent) {
        return;
    }

    if (carValue < 10000 || carValue > 200000) {
        alert('Car value must be between $10,000 and $200,000');
        return;
    }

    if (downPaymentPercent < 10 || downPaymentPercent > 50) {
        alert('Down payment must be between 10% and 50%');
        return;
    }

    const interestRate = carType === 'new' ? 2.99 : 3.7;
    const downPaymentAmount = carValue * (downPaymentPercent / 100);
    const loanAmount = carValue - downPaymentAmount;
    const monthlyInterestRate = (interestRate / 100) / 12;
    const monthlyInstallment = (loanAmount * monthlyInterestRate) / (1 - Math.pow(1 + monthlyInterestRate, -leasePeriod));
    const leasingCost = monthlyInstallment * leasePeriod + downPaymentAmount;

    document.getElementById('leasing-cost').textContent = `${leasingCost.toFixed(2)}`;
    document.getElementById('down-payment-amount').textContent = `${downPaymentAmount.toFixed(2)}`;
    document.getElementById('monthly-installment').textContent = `${monthlyInstallment.toFixed(2)}`;
    document.getElementById('interest-rate').textContent = `${interestRate.toFixed(2)}%`;
}