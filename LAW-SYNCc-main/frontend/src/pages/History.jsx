import { History as HistoryIcon, Trash2, Clock, ArrowRight, BookOpen } from 'lucide-react';

export default function History({
  historyItems,
  onClearHistory,
  onSelectTermById,
  onNavigate
}) {
  const formatTime = (isoString) => {
    if (!isoString) return 'Recently';
    const date = new Date(isoString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ' on ' + date.toLocaleDateString([], { month: 'short', day: 'numeric' });
  };

  return (
    <div className="history-page-view">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '2rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: '#d4af37', fontWeight: 700, fontSize: '0.85rem', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
            <HistoryIcon size={18} />
            <span>Search & View Log</span>
          </div>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '2.2rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
            Recent Activity History ({historyItems.length})
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1rem' }}>
            Terms and definitions you recently inspected or searched.
          </p>
        </div>

        {historyItems.length > 0 && (
          <button
            className="btn-secondary"
            style={{ color: '#ef4444', borderColor: '#fecaca' }}
            onClick={onClearHistory}
          >
            <Trash2 size={16} />
            <span>Clear History</span>
          </button>
        )}
      </div>

      {historyItems.length > 0 ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
          {historyItems.map((item, index) => (
            <div
              key={index}
              style={{
                background: '#ffffff',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-lg)',
                padding: '1.25rem 1.5rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                cursor: 'pointer',
                transition: 'all 0.2s',
                boxShadow: 'var(--shadow-sm)'
              }}
              onClick={() => onSelectTermById(item.id)}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
                <div
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: 'var(--radius-md)',
                    background: '#f8fafc',
                    border: '1px solid var(--border-subtle)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#64748b'
                  }}
                >
                  <Clock size={18} />
                </div>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                    <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.15rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                      {item.word}
                    </h3>
                    <span className="category-pill category-civil" style={{ fontSize: '0.72rem' }}>
                      {item.category}
                    </span>
                  </div>
                  <p style={{ color: '#64748b', fontSize: '0.88rem', marginTop: '0.2rem' }}>
                    {item.simpleMeaning ? item.simpleMeaning.slice(0, 85) + '...' : ''}
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <span style={{ fontSize: '0.82rem', color: '#94a3b8', whiteSpace: 'nowrap' }}>
                  {formatTime(item.timestamp)}
                </span>
                <ArrowRight size={16} color="#64748b" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div
          style={{
            textAlign: 'center',
            padding: '4rem 2rem',
            background: '#ffffff',
            borderRadius: 'var(--radius-xl)',
            border: '1px dashed var(--border-subtle)'
          }}
        >
          <div
            style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              background: '#f1f5f9',
              color: '#64748b',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.25rem'
            }}
          >
            <HistoryIcon size={28} />
          </div>
          <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', fontWeight: 700, marginBottom: '0.5rem' }}>
            No search history yet
          </h3>
          <p style={{ color: '#64748b', fontSize: '0.96rem', maxWidth: '440px', margin: '0 auto 1.5rem', lineHeight: 1.6 }}>
            Whenever you search or inspect legal terms, they will be automatically recorded here so you can retrace your steps.
          </p>
          <button className="btn-primary" onClick={() => onNavigate('dictionary')}>
            <BookOpen size={16} />
            <span>Search Dictionary</span>
          </button>
        </div>
      )}
    </div>
  );
}
