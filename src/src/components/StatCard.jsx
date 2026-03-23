const colorMap = {
  green:  { bg: 'rgba(16,185,129,0.1)',  border: 'rgba(16,185,129,0.2)',  text: '#34d399'  },
  teal:   { bg: 'rgba(20,184,166,0.1)',  border: 'rgba(20,184,166,0.2)',  text: '#2dd4bf'  },
  blue:   { bg: 'rgba(59,130,246,0.1)',  border: 'rgba(59,130,246,0.2)',  text: '#60a5fa'  },
  orange: { bg: 'rgba(249,115,22,0.1)',  border: 'rgba(249,115,22,0.2)',  text: '#fb923c'  },
  red:    { bg: 'rgba(239,68,68,0.1)',   border: 'rgba(239,68,68,0.2)',   text: '#f87171'  },
  purple: { bg: 'rgba(168,85,247,0.1)',  border: 'rgba(168,85,247,0.2)',  text: '#c084fc'  },
  violet: { bg: 'rgba(139,92,246,0.1)',  border: 'rgba(139,92,246,0.2)',  text: '#a78bfa'  },
}

export default function StatCard({ title, value, subtitle, icon: Icon, color = 'green' }) {
  const c = colorMap[color] || colorMap.green
  return (
    <div style={{
      background: '#0f172a', border: '1px solid #1e293b', borderRadius: 12,
      padding: 20, display: 'flex', gap: 12, alignItems: 'flex-start',
      transition: 'border-color 0.2s',
    }}>
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{ color: '#64748b', fontSize: 13 }}>{title}</p>
        <p style={{ color: 'white', fontSize: 24, fontWeight: 700, marginTop: 4, lineHeight: 1 }}>{value}</p>
        {subtitle && <p style={{ color: '#475569', fontSize: 11, marginTop: 6 }}>{subtitle}</p>}
      </div>
      {Icon && (
        <div style={{
          background: c.bg, border: `1px solid ${c.border}`,
          borderRadius: 8, padding: 10, flexShrink: 0
        }}>
          <Icon size={20} color={c.text} />
        </div>
      )}
    </div>
  )
}
