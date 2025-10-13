import { useState } from 'react'
import './BillingApp.css'

// Object-Oriented Programming: Product class
class Product {
  constructor(
    public id: number,
    public name: string,
    public price: number,
    public category: string
  ) {}

  getFormattedPrice(): string {
    return `$${this.price.toLocaleString('es-CL')}`
  }
}

// Object-Oriented Programming: InvoiceItem class
class InvoiceItem {
  constructor(public product: Product, public quantity: number) {}

  getSubtotal(): number {
    return this.product.price * this.quantity
  }

  getFormattedSubtotal(): string {
    return `$${this.getSubtotal().toLocaleString('es-CL')}`
  }
}

// Object-Oriented Programming: Invoice class
class Invoice {
  private static nextId = 1
  public id: number
  public items: InvoiceItem[] = []
  public date: Date
  public customerName: string

  constructor(customerName: string) {
    this.id = Invoice.nextId++
    this.customerName = customerName
    this.date = new Date()
  }

  addItem(product: Product, quantity: number): void {
    const existingItem = this.items.find((item) => item.product.id === product.id)

    if (existingItem) {
      existingItem.quantity += quantity
    } else {
      this.items.push(new InvoiceItem(product, quantity))
    }
  }

  removeItem(productId: number): void {
    this.items = this.items.filter((item) => item.product.id !== productId)
  }

  getSubtotal(): number {
    return this.items.reduce((total, item) => total + item.getSubtotal(), 0)
  }

  getTax(): number {
    return this.getSubtotal() * 0.19 // IVA 19%
  }

  getTotal(): number {
    return this.getSubtotal() + this.getTax()
  }

  getFormattedSubtotal(): string {
    return `$${this.getSubtotal().toLocaleString('es-CL')}`
  }

  getFormattedTax(): string {
    return `$${this.getTax().toLocaleString('es-CL')}`
  }

  getFormattedTotal(): string {
    return `$${this.getTotal().toLocaleString('es-CL')}`
  }

  getInvoiceNumber(): string {
    return `BOL-${String(this.id).padStart(6, '0')}`
  }

  getFormattedDate(): string {
    return this.date.toLocaleDateString('es-CL', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }
}

// Sample products
const SAMPLE_PRODUCTS: Product[] = [
  new Product(1, 'Café Americano', 2500, 'Bebidas'),
  new Product(2, 'Café Latte', 3200, 'Bebidas'),
  new Product(3, 'Cappuccino', 3500, 'Bebidas'),
  new Product(4, 'Té Verde', 2000, 'Bebidas'),
  new Product(5, 'Sandwich Jamón y Queso', 4500, 'Comida'),
  new Product(6, 'Croissant', 2800, 'Comida'),
  new Product(7, 'Ensalada César', 5500, 'Comida'),
  new Product(8, 'Panini Pollo', 5000, 'Comida'),
  new Product(9, 'Brownie', 2200, 'Postres'),
  new Product(10, 'Cheesecake', 3800, 'Postres'),
]

export const BillingApp: React.FC = () => {
  const [invoice, setInvoice] = useState<Invoice>(new Invoice('Cliente General'))
  const [customerName, setCustomerName] = useState('Cliente General')
  const [selectedCategory, setSelectedCategory] = useState<string>('Todas')
  const [completedInvoices, setCompletedInvoices] = useState<Invoice[]>([])
  const [showReceipt, setShowReceipt] = useState<Invoice | null>(null)

  const categories = ['Todas', ...Array.from(new Set(SAMPLE_PRODUCTS.map((p) => p.category)))]

  const filteredProducts =
    selectedCategory === 'Todas'
      ? SAMPLE_PRODUCTS
      : SAMPLE_PRODUCTS.filter((p) => p.category === selectedCategory)

  const handleAddProduct = (product: Product) => {
    const newInvoice = Object.assign(Object.create(Object.getPrototypeOf(invoice)), invoice)
    newInvoice.items = [...invoice.items]
    newInvoice.addItem(product, 1)
    setInvoice(newInvoice)
  }

  const handleRemoveItem = (productId: number) => {
    const newInvoice = Object.assign(Object.create(Object.getPrototypeOf(invoice)), invoice)
    newInvoice.items = [...invoice.items]
    newInvoice.removeItem(productId)
    setInvoice(newInvoice)
  }

  const handleUpdateQuantity = (productId: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      handleRemoveItem(productId)
      return
    }

    const newInvoice = Object.assign(Object.create(Object.getPrototypeOf(invoice)), invoice)
    newInvoice.items = invoice.items.map((item) => {
      if (item.product.id === productId) {
        return new InvoiceItem(item.product, newQuantity)
      }
      return item
    })
    setInvoice(newInvoice)
  }

  const handleCompleteInvoice = () => {
    if (invoice.items.length === 0) {
      alert('Agregue al menos un producto a la boleta')
      return
    }

    setCompletedInvoices([...completedInvoices, invoice])
    setShowReceipt(invoice)
    setInvoice(new Invoice(customerName))
  }

  const handleNewInvoice = () => {
    setInvoice(new Invoice(customerName))
    setShowReceipt(null)
  }

  const downloadReceipt = (inv: Invoice) => {
    const receiptText = `
${'='.repeat(40)}
BOLETA ELECTRÓNICA
${'='.repeat(40)}

Número: ${inv.getInvoiceNumber()}
Fecha: ${inv.getFormattedDate()}
Cliente: ${inv.customerName}

${'='.repeat(40)}
DETALLE DE PRODUCTOS
${'='.repeat(40)}

${inv.items
  .map(
    (item) =>
      `${item.product.name}
Cantidad: ${item.quantity} x ${item.product.getFormattedPrice()}
Subtotal: ${item.getFormattedSubtotal()}`
  )
  .join('\n\n')}

${'='.repeat(40)}
RESUMEN
${'='.repeat(40)}

Subtotal:    ${inv.getFormattedSubtotal()}
IVA (19%):   ${inv.getFormattedTax()}
TOTAL:       ${inv.getFormattedTotal()}

${'='.repeat(40)}
Gracias por su compra
${'='.repeat(40)}
    `.trim()

    const BOM = '\uFEFF'
    const blob = new Blob([BOM + receiptText], { type: 'text/plain;charset=utf-8;' })
    const link = document.createElement('a')
    const url = URL.createObjectURL(blob)
    link.setAttribute('href', url)
    link.setAttribute('download', `boleta-${inv.getInvoiceNumber()}.txt`)
    link.style.visibility = 'hidden'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  return (
    <div className="billing-app">
      <div className="billing-app__header">
        <h2>💰 Sistema de Boletas - POS</h2>
        <p>Aplicación de punto de venta con programación orientada a objetos</p>
      </div>

      {showReceipt ? (
        <div className="billing-app__receipt-view">
          <div className="billing-app__receipt">
            <h3>✅ Boleta Generada</h3>
            <div className="billing-app__receipt-content">
              <div className="billing-app__receipt-header">
                <div>
                  <strong>Número:</strong> {showReceipt.getInvoiceNumber()}
                </div>
                <div>
                  <strong>Fecha:</strong> {showReceipt.getFormattedDate()}
                </div>
                <div>
                  <strong>Cliente:</strong> {showReceipt.customerName}
                </div>
              </div>

              <div className="billing-app__receipt-items">
                <h4>Productos</h4>
                {showReceipt.items.map((item) => (
                  <div key={item.product.id} className="billing-app__receipt-item">
                    <div>{item.product.name}</div>
                    <div>
                      {item.quantity} x {item.product.getFormattedPrice()} ={' '}
                      {item.getFormattedSubtotal()}
                    </div>
                  </div>
                ))}
              </div>

              <div className="billing-app__receipt-summary">
                <div className="billing-app__receipt-line">
                  <span>Subtotal:</span>
                  <span>{showReceipt.getFormattedSubtotal()}</span>
                </div>
                <div className="billing-app__receipt-line">
                  <span>IVA (19%):</span>
                  <span>{showReceipt.getFormattedTax()}</span>
                </div>
                <div className="billing-app__receipt-line billing-app__receipt-line--total">
                  <span>TOTAL:</span>
                  <span>{showReceipt.getFormattedTotal()}</span>
                </div>
              </div>
            </div>

            <div className="billing-app__receipt-actions">
              <button className="billing-app__btn billing-app__btn--primary" onClick={handleNewInvoice}>
                📝 Nueva Boleta
              </button>
              <button
                className="billing-app__btn billing-app__btn--secondary"
                onClick={() => downloadReceipt(showReceipt)}
              >
                💾 Descargar
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="billing-app__main">
          <div className="billing-app__sidebar">
            <div className="billing-app__customer">
              <label>
                <strong>Cliente:</strong>
                <input
                  type="text"
                  value={customerName}
                  onChange={(e) => {
                    setCustomerName(e.target.value)
                    invoice.customerName = e.target.value
                  }}
                  placeholder="Nombre del cliente"
                />
              </label>
            </div>

            <div className="billing-app__categories">
              <strong>Categorías:</strong>
              <div className="billing-app__category-list">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    className={`billing-app__category-btn ${selectedCategory === cat ? 'active' : ''}`}
                    onClick={() => setSelectedCategory(cat)}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="billing-app__products">
              <strong>Productos:</strong>
              <div className="billing-app__product-grid">
                {filteredProducts.map((product) => (
                  <button
                    key={product.id}
                    className="billing-app__product-card"
                    onClick={() => handleAddProduct(product)}
                  >
                    <div className="billing-app__product-name">{product.name}</div>
                    <div className="billing-app__product-price">{product.getFormattedPrice()}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="billing-app__invoice-panel">
            <div className="billing-app__invoice-header">
              <h3>Boleta Actual</h3>
              <div className="billing-app__invoice-number">{invoice.getInvoiceNumber()}</div>
            </div>

            {invoice.items.length === 0 ? (
              <div className="billing-app__empty">
                <p>👈 Seleccione productos del menú</p>
              </div>
            ) : (
              <>
                <div className="billing-app__invoice-items">
                  {invoice.items.map((item) => (
                    <div key={item.product.id} className="billing-app__invoice-item">
                      <div className="billing-app__invoice-item-name">{item.product.name}</div>
                      <div className="billing-app__invoice-item-controls">
                        <button onClick={() => handleUpdateQuantity(item.product.id, item.quantity - 1)}>
                          −
                        </button>
                        <span>{item.quantity}</span>
                        <button onClick={() => handleUpdateQuantity(item.product.id, item.quantity + 1)}>
                          +
                        </button>
                      </div>
                      <div className="billing-app__invoice-item-price">{item.product.getFormattedPrice()}</div>
                      <div className="billing-app__invoice-item-subtotal">{item.getFormattedSubtotal()}</div>
                      <button
                        className="billing-app__invoice-item-remove"
                        onClick={() => handleRemoveItem(item.product.id)}
                      >
                        🗑️
                      </button>
                    </div>
                  ))}
                </div>

                <div className="billing-app__invoice-summary">
                  <div className="billing-app__summary-line">
                    <span>Subtotal:</span>
                    <span>{invoice.getFormattedSubtotal()}</span>
                  </div>
                  <div className="billing-app__summary-line">
                    <span>IVA (19%):</span>
                    <span>{invoice.getFormattedTax()}</span>
                  </div>
                  <div className="billing-app__summary-line billing-app__summary-line--total">
                    <span>TOTAL:</span>
                    <span>{invoice.getFormattedTotal()}</span>
                  </div>
                </div>

                <button className="billing-app__complete-btn" onClick={handleCompleteInvoice}>
                  ✅ Generar Boleta
                </button>
              </>
            )}

            {completedInvoices.length > 0 && (
              <div className="billing-app__history">
                <h4>Historial ({completedInvoices.length})</h4>
                <div className="billing-app__history-list">
                  {completedInvoices.slice(-5).reverse().map((inv) => (
                    <div key={inv.id} className="billing-app__history-item">
                      <span>{inv.getInvoiceNumber()}</span>
                      <span>{inv.getFormattedTotal()}</span>
                      <button onClick={() => downloadReceipt(inv)}>💾</button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
