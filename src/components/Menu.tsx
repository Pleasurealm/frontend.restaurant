import { useState } from 'react'

const menuCategories = [
  { id: 'starters', label: 'Starters' },
  { id: 'mains', label: 'Main Courses' },
  { id: 'desserts', label: 'Desserts' },
  { id: 'drinks', label: 'Beverages' },
]

const menuItems: Record<string, { name: string; description: string; price: string }[]> = {
  starters: [
    { name: 'Tuna Tartare', description: 'Sushi-grade tuna, avocado mousse, citrus ponzu, crispy wonton', price: '$18' },
    { name: 'Burrata Caprese', description: 'Fresh burrata, heirloom tomatoes, basil pesto, aged balsamic', price: '$16' },
    { name: 'Seared Scallops', description: 'Pan-seared scallops, cauliflower puree, pancetta, capers', price: '$22' },
    { name: 'Truffle Arancini', description: 'Crispy risotto balls, black truffle, parmesan aioli', price: '$14' },
  ],
  mains: [
    { name: 'Wagyu Ribeye', description: 'A5 Japanese Wagyu, bone marrow butter, roasted shallots, pomme puree', price: '$85' },
    { name: 'Pan-Roasted Duck', description: 'Duck breast, cherry gastrique, wild rice, charred vegetables', price: '$42' },
    { name: 'Lobster Linguine', description: 'Maine lobster, cherry tomatoes, garlic, white wine, fresh herbs', price: '$48' },
    { name: 'Herb-Crusted Lamb', description: 'Rack of lamb, mint chimichurri, roasted fingerlings', price: '$52' },
    { name: 'Wild Mushroom Risotto', description: 'Porcini, chanterelle, truffle oil, pecorino romano', price: '$34' },
  ],
  desserts: [
    { name: 'Chocolate Souffle', description: 'Valrhona chocolate, creme anglaise, gold leaf', price: '$16' },
    { name: 'Tiramisu', description: 'Espresso-soaked ladyfingers, mascarpone, cocoa', price: '$14' },
    { name: 'Creme Brulee', description: 'Vanilla bean custard, caramelized sugar, fresh berries', price: '$12' },
    { name: 'Sorbet Trio', description: 'Seasonal fruit selection, fresh mint', price: '$10' },
  ],
  drinks: [
    { name: 'Signature Martini', description: 'Grey Goose, dry vermouth, blue cheese olive', price: '$18' },
    { name: 'Old Fashioned', description: 'Woodford Reserve, Angostura, orange, luxardo cherry', price: '$16' },
    { name: 'Wine Selection', description: 'Curated organic and biodynamic wines, ask your server', price: '$14+' },
    { name: 'Craft Cocktails', description: 'Seasonal rotating selection, prepared tableside', price: '$15' },
  ],
}

export default function Menu() {
  const [activeCategory, setActiveCategory] = useState('starters')

  return (
    <section
      id="menu"
      style={{
        padding: '6rem 2rem',
        background: 'var(--color-white)',
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <p
            style={{
              fontSize: '0.9rem',
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              marginBottom: '1rem',
              color: 'var(--color-accent)',
              fontWeight: 500,
            }}
          >
            Our Selection
          </p>
          <h2
            style={{
              fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
              fontFamily: 'var(--font-display)',
              color: 'var(--color-primary)',
            }}
          >
            The Menu
          </h2>
        </div>

        {/* Category Tabs */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '1rem',
            flexWrap: 'wrap',
            marginBottom: '3rem',
          }}
        >
          {menuCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              style={{
                background: activeCategory === category.id ? 'var(--color-primary)' : 'transparent',
                color: activeCategory === category.id ? 'var(--color-white)' : 'var(--color-primary)',
                padding: '0.75rem 1.5rem',
                fontSize: '0.85rem',
                fontWeight: 500,
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
                border: `2px solid var(--color-primary)`,
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                if (activeCategory !== category.id) {
                  e.currentTarget.style.background = 'rgba(26, 26, 26, 0.1)'
                }
              }}
              onMouseLeave={(e) => {
                if (activeCategory !== category.id) {
                  e.currentTarget.style.background = 'transparent'
                }
              }}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* Menu Items */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '2rem',
          }}
        >
          {menuItems[activeCategory]?.map((item, index) => (
            <div
              key={index}
              style={{
                padding: '1.5rem',
                background: 'var(--color-secondary)',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)'
                e.currentTarget.style.boxShadow = '0 10px 40px rgba(0,0,0,0.1)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'baseline',
                  marginBottom: '0.75rem',
                }}
              >
                <h3
                  style={{
                    fontSize: '1.25rem',
                    fontFamily: 'var(--font-display)',
                    color: 'var(--color-primary)',
                  }}
                >
                  {item.name}
                </h3>
                <span
                  style={{
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    color: 'var(--color-accent)',
                  }}
                >
                  {item.price}
                </span>
              </div>
              <p
                style={{
                  color: 'var(--color-text-light)',
                  fontSize: '0.95rem',
                  lineHeight: 1.6,
                }}
              >
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
