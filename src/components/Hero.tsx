export default function Hero() {
  const scrollToReservation = () => {
    const element = document.getElementById('reservation')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section
      id="home"
      style={{
        height: '100vh',
        minHeight: '700px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)',
        overflow: 'hidden',
      }}
    >
      {/* Background Pattern */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          opacity: 0.05,
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      {/* Content */}
      <div
        style={{
          textAlign: 'center',
          color: 'var(--color-white)',
          padding: '2rem',
          zIndex: 1,
        }}
      >
        <p
          style={{
            fontSize: '0.9rem',
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            marginBottom: '1.5rem',
            color: 'var(--color-accent)',
            fontWeight: 500,
          }}
        >
          Experience Culinary Excellence
        </p>
        <h1
          style={{
            fontSize: 'clamp(3rem, 8vw, 6rem)',
            fontFamily: 'var(--font-display)',
            marginBottom: '1.5rem',
            color: 'var(--color-white)',
          }}
        >
          Saveur
        </h1>
        <p
          style={{
            fontSize: '1.25rem',
            maxWidth: '600px',
            margin: '0 auto 2.5rem',
            color: 'rgba(255, 255, 255, 0.8)',
            lineHeight: 1.8,
          }}
        >
          A contemporary dining experience where tradition meets innovation.
          Savor exquisite flavors crafted with passion and precision.
        </p>
        <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button
            onClick={scrollToReservation}
            style={{
              background: 'var(--color-accent)',
              color: 'var(--color-primary)',
              padding: '1rem 2.5rem',
              fontSize: '0.9rem',
              fontWeight: 600,
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
              transition: 'all 0.3s ease',
              borderRadius: '0',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'var(--color-accent-dark)'
              e.currentTarget.style.transform = 'translateY(-2px)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'var(--color-accent)'
              e.currentTarget.style.transform = 'translateY(0)'
            }}
          >
            Reserve a Table
          </button>
          <button
            onClick={() => {
              const element = document.getElementById('menu')
              if (element) element.scrollIntoView({ behavior: 'smooth' })
            }}
            style={{
              background: 'transparent',
              color: 'var(--color-white)',
              padding: '1rem 2.5rem',
              fontSize: '0.9rem',
              fontWeight: 600,
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
              border: '2px solid var(--color-white)',
              transition: 'all 0.3s ease',
              borderRadius: '0',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'var(--color-white)'
              e.currentTarget.style.color = 'var(--color-primary)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent'
              e.currentTarget.style.color = 'var(--color-white)'
            }}
          >
            View Menu
          </button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div
        style={{
          position: 'absolute',
          bottom: '2rem',
          left: '50%',
          transform: 'translateX(-50%)',
          animation: 'bounce 2s infinite',
        }}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
          <path d="M12 5v14M19 12l-7 7-7-7" />
        </svg>
      </div>

      <style>{`
        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% { transform: translateX(-50%) translateY(0); }
          40% { transform: translateX(-50%) translateY(-10px); }
          60% { transform: translateX(-50%) translateY(-5px); }
        }
      `}</style>
    </section>
  )
}
