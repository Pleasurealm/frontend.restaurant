export default function About() {
  const features = [
    { title: 'Fresh Ingredients', description: 'Locally sourced, seasonal ingredients from trusted farms' },
    { title: 'Award-Winning Chef', description: 'Executive Chef Marcus Chen, 2x James Beard nominee' },
    { title: 'Intimate Setting', description: 'Just 40 seats for an exclusive dining experience' },
    { title: 'Wine Cellar', description: 'Over 200 curated selections from around the world' },
  ]

  return (
    <section
      id="about"
      style={{
        padding: '6rem 2rem',
        background: 'var(--color-primary)',
        color: 'var(--color-white)',
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '4rem',
            alignItems: 'center',
          }}
        >
          {/* Image Side */}
          <div style={{ position: 'relative' }}>
            <img
              src="https://images.pexels.com/photos/262047/pexels-photo-262047.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt="Restaurant interior"
              style={{
                width: '100%',
                height: '400px',
                objectFit: 'cover',
              }}
            />
            <div
              style={{
                position: 'absolute',
                bottom: '-20px',
                right: '-20px',
                width: '150px',
                height: '150px',
                border: '3px solid var(--color-accent)',
                display: 'grid',
                placeItems: 'center',
                background: 'var(--color-primary)',
              }}
            >
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '2.5rem', fontWeight: 700, color: 'var(--color-accent)' }}>15</div>
                <div style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Years</div>
              </div>
            </div>
          </div>

          {/* Content Side */}
          <div>
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
              Our Story
            </p>
            <h2
              style={{
                fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
                fontFamily: 'var(--font-display)',
                marginBottom: '1.5rem',
                color: 'var(--color-white)',
              }}
            >
              About Saveur
            </h2>
            <p
              style={{
                fontSize: '1.1rem',
                lineHeight: 1.8,
                marginBottom: '1.5rem',
                color: 'rgba(255, 255, 255, 0.8)',
              }}
            >
              Founded in 2010, Saveur has been a cornerstone of fine dining in the city.
              Our philosophy is simple: source the finest ingredients, treat them with respect,
              and create dishes that tell a story.
            </p>
            <p
              style={{
                fontSize: '1.1rem',
                lineHeight: 1.8,
                marginBottom: '2.5rem',
                color: 'rgba(255, 255, 255, 0.8)',
              }}
            >
              We believe that every meal should be an experience—a moment to savor,
              to connect, and to create memories. Our intimate dining room and dedicated
              team ensure that each visit is unforgettable.
            </p>

            {/* Features */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '1.5rem',
              }}
            >
              {features.map((feature, index) => (
                <div key={index}>
                  <h4
                    style={{
                      fontSize: '1rem',
                      color: 'var(--color-accent)',
                      marginBottom: '0.5rem',
                      fontWeight: 600,
                    }}
                  >
                    {feature.title}
                  </h4>
                  <p
                    style={{
                      fontSize: '0.9rem',
                      color: 'rgba(255, 255, 255, 0.7)',
                      lineHeight: 1.6,
                    }}
                  >
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
