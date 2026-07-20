const checkoutModal = document.getElementById('checkoutModal');
const checkoutForm = document.getElementById('checkoutForm');
const checkoutStatus = document.getElementById('checkoutStatus');
const statusMessage = checkoutStatus?.querySelector('.alert');
const productNameInput = document.getElementById('productName');
const productPriceInput = document.getElementById('productPrice');
const selectedProductInput = document.getElementById('selectedProduct');
const customerNameInput = document.getElementById('customerName');
const customerEmailInput = document.getElementById('customerEmail');
const quantityInput = document.getElementById('quantity');
const checkoutMessage = document.getElementById('checkoutMessage');

const modal = bootstrap.Modal.getOrCreateInstance(checkoutModal);

function formatCurrency(value) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(value);
}

document.querySelectorAll('.buy-btn').forEach((button) => {
  button.addEventListener('click', () => {
    const name = button.dataset.name;
    const price = Number(button.dataset.price);

    productNameInput.value = name;
    productPriceInput.value = formatCurrency(price);
    selectedProductInput.value = name;
    customerNameInput.value = '';
    customerEmailInput.value = '';
    quantityInput.value = '1';
    checkoutMessage.className = 'alert d-none';
    checkoutMessage.textContent = '';

    modal.show();
  });
});

checkoutForm?.addEventListener('submit', (event) => {
  event.preventDefault();

  const name = customerNameInput.value.trim();
  const email = customerEmailInput.value.trim();
  const quantity = Number(quantityInput.value);
  const product = selectedProductInput.value;

  if (!name || !email || !product || quantity < 1) {
    checkoutMessage.className = 'alert alert-danger';
    checkoutMessage.textContent = 'Please complete all required fields.';
    return;
  }

  const total = Number(productPriceInput.value.replace(/[^\d]/g, '')) * quantity;

  checkoutMessage.className = 'alert alert-success';
  checkoutMessage.textContent = `Thank you, ${name}! Your order for ${quantity} × ${product} has been placed successfully. Total: ${formatCurrency(total)}. A confirmation email will be sent to ${email}.`;

  if (checkoutStatus) {
    statusMessage.textContent = `Order confirmed for ${product}.`;
    checkoutStatus.classList.remove('d-none');
  }

  modal.hide();
});
