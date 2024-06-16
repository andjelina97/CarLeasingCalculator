document.querySelectorAll('#car-type, #car-value, #lease-period, #down-payment').forEach(element => {
    element.addEventListener('input', calculateLeasing);
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