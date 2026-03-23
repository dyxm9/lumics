import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { entities } from '../lib/db'
import { Leaf, Grid3X3, Wand2, ArrowRight, Zap, Globe, TrendingDown,
         GitCompare, Target, Newspaper, Award, FlaskConical } from 'lucide-react'

const tools = [
  { icon: Leaf,        name: 'Green AI Intelligence', path: '/greenai',    color: '#10b981', desc: 'Monitore CO₂ e energia do seu uso de IA em tempo real.'        },
  { icon: Grid3X3,     name: 'LUMICS Grid',            path: '/grid',       color: '#14b8a6', desc: 'Otimize horários com base em energia renovável disponível.'    },
  { icon: Wand2,       name: 'Prompt Optimizer',       path: '/optimizer',  color: '#8b5cf6', desc: 'Reduza tokens e impacto ambiental dos seus prompts com IA.'   },
  { icon: GitCompare,  name: 'Comparador',             path: '/comparator', color: '#3b82f6', desc: 'Compare modelos de IA por eficiência energética e qualidade.' },
  { icon: Target,      name: 'Metas de Carbono',       path: '/goals',      color: '#f59e0b', desc: 'Defina e acompanhe metas pessoais de sustentabilidade.'       },
  { icon: Newspaper,   name: 'Green AI News',          path: '/news',       color: '#06b6d4', desc: 'Últimas notícias sobre Green Tech e IA sustentável.'          },
  { icon: Award,       name: 'Selo & Ranking',         path: '/seal',       color: '#ec4899', desc: 'Certifique suas práticas e veja o ranking de modelos eco.'    },
  { icon: FlaskConical,name: 'Simulador',              path: '/simulator',  color: '#a855f7', desc: 'Calcule o impacto de diferentes cenários de uso de IA.'      },
]

const pillars = [
  { emoji: '📚', title: 'Educação',        desc: 'Ensinar uso sustentável da IA' },
  { emoji: '💼', title: 'Trabalho',        desc: 'Profissões em IA sustentável'  },
  { emoji: '🌱', title: 'Sustentabilidade', desc: 'Reduzir o impacto da IA'      },
]

export default function Home() {
  const [stats, setStats] = useState({ logs: 0, co2: 0, prompts: 0 })

  useEffect(() => {
    const logs = entities.AIUsageLog.list()
    const sessions = entities.PromptSession.list()
    const co2 = logs.reduce((s, l) => s + (l.estimated_co2_grams || 0), 0)
    setStats({ logs: logs.length, co2: Math.round(co2 * 10) / 10, prompts: sessions.length })
  }, [])

  return (
    <div style={{ minHeight: '100vh', background: '#020817', padding: '40px 24px' }}>
      {/* Hero */}
      <div style={{ maxWidth: 700, margin: '0 auto 56px', textAlign: 'center' }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.2)',
          borderRadius: 999, padding: '6px 16px', marginBottom: 24
        }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#34d399' }} />
          <span style={{ color: '#6ee7b7', fontSize: 13, fontWeight: 500 }}>Plataforma de IA Sustentável</span>
        </div>
        <h1 style={{ fontSize: 'clamp(32px, 6vw, 56px)', fontWeight: 800, color: 'white', lineHeight: 1.15, marginBottom: 20 }}>
          Torne sua{' '}
          <span style={{ background: 'linear-gradient(90deg, #34d399, #2dd4bf)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Inteligência Artificial
          </span>
          {' '}mais verde
        </h1>
        <p style={{ color: '#94a3b8', fontSize: 17, lineHeight: 1.7, marginBottom: 32 }}>
          LUMICS conecta educação, trabalho e sustentabilidade para reduzir o impacto ambiental da IA. Monitore, otimize e evolua.
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 12, flexWrap: 'wrap' }}>
          <Link to="/greenai" style={{
            background: '#059669', color: 'white', padding: '12px 24px',
            borderRadius: 10, textDecoration: 'none', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 8
          }}>Começar agora <ArrowRight size={16} /></Link>
          <Link to="/reports" style={{
            background: 'transparent', color: '#cbd5e1', padding: '12px 24px',
            borderRadius: 10, textDecoration: 'none', fontWeight: 600,
            border: '1px solid #334155'
          }}>Ver Relatórios</Link>
        </div>
      </div>

      {/* Stats */}
      <div style={{ maxWidth: 700, margin: '0 auto 56px', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
        {[
          { label: 'Sessões Registradas', value: stats.logs },
          { label: 'CO₂ Monitorado (g)',  value: stats.co2.toLocaleString('pt-BR') },
          { label: 'Prompts Otimizados',  value: stats.prompts },
        ].map(({ label, value }) => (
          <div key={label} style={{
            background: '#0f172a', border: '1px solid #1e293b', borderRadius: 12,
            padding: '20px 16px', textAlign: 'center'
          }}>
            <p style={{ fontSize: 28, fontWeight: 800, color: 'white' }}>{value}</p>
            <p style={{ color: '#64748b', fontSize: 12, marginTop: 6 }}>{label}</p>
          </div>
        ))}
      </div>

      {/* Tools grid */}
      <div style={{ maxWidth: 900, margin: '0 auto 56px' }}>
        <h2 style={{ textAlign: 'center', color: 'white', fontSize: 24, fontWeight: 700, marginBottom: 8 }}>Nossas Ferramentas</h2>
        <p style={{ textAlign: 'center', color: '#64748b', fontSize: 14, marginBottom: 32 }}>8 soluções integradas para uma IA mais sustentável</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 16 }}>
          {tools.map(({ icon: Icon, name, path, color, desc }) => (
            <Link key={path} to={path} style={{
              background: '#0f172a', border: '1px solid #1e293b', borderRadius: 12,
              padding: 20, textDecoration: 'none', display: 'flex', flexDirection: 'column', gap: 12,
              transition: 'border-color 0.2s, transform 0.2s',
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = color; e.currentTarget.style.transform = 'translateY(-2px)' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = '#1e293b'; e.currentTarget.style.transform = 'none' }}
            >
              <div style={{
                width: 40, height: 40, borderRadius: 10,
                background: color + '20', display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}>
                <Icon size={20} color={color} />
              </div>
              <div>
                <p style={{ color: 'white', fontWeight: 600, fontSize: 13, marginBottom: 4 }}>{name}</p>
                <p style={{ color: '#64748b', fontSize: 12, lineHeight: 1.5 }}>{desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Pillars */}
      <div style={{ maxWidth: 700, margin: '0 auto' }}>
        <h2 style={{ textAlign: 'center', color: 'white', fontSize: 20, fontWeight: 700, marginBottom: 24 }}>Os 3 Pilares da LUMICS</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
          {pillars.map(({ emoji, title, desc }) => (
            <div key={title} style={{
              background: '#0f172a', border: '1px solid #1e293b', borderRadius: 12,
              padding: 20, textAlign: 'center'
            }}>
              <div style={{ fontSize: 32, marginBottom: 12 }}>{emoji}</div>
              <p style={{ color: 'white', fontWeight: 600, marginBottom: 6 }}>{title}</p>
              <p style={{ color: '#64748b', fontSize: 12, lineHeight: 1.5 }}>{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
