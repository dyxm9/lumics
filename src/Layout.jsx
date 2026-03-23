import { useState } from 'react'
import { Outlet, Link, useLocation } from 'react-router-dom'
import {
  LayoutDashboard, Leaf, Grid3X3, Wand2, FileBarChart2,
  Award, FlaskConical, GraduationCap, Globe,
  GitCompare, Target, Newspaper, Menu, X, Zap
} from 'lucide-react'

const navItems = [
  { name: "Início",                path: "/home",        icon: LayoutDashboard },
  { name: "Green AI Intelligence", path: "/greenai",     icon: Leaf            },
  { name: "LUMICS Grid",           path: "/grid",        icon: Grid3X3         },
  { name: "Prompt Optimizer",      path: "/optimizer",   icon: Wand2           },
  { name: "Comparador de Modelos", path: "/comparator",  icon: GitCompare      },
  { name: "Metas de Carbono",      path: "/goals",       icon: Target          },
  { name: "Green AI News",         path: "/news",        icon: Newspaper       },
  { name: "Selo & Ranking",        path: "/seal",        icon: Award           },
  { name: "Simulador de Impacto",  path: "/simulator",   icon: FlaskConical    },
  { name: "Academia LUMICS",       path: "/academy",     icon: GraduationCap   },
  { name: "Impacto Global",        path: "/global",      icon: Globe           },
  { name: "Relatórios",            path: "/reports",     icon: FileBarChart2   },
]

export default function Layout() {
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#020817' }}>
      {/* Sidebar desktop */}
      <aside style={{
        width: 240, background: '#0f172a', borderRight: '1px solid #1e293b',
        position: 'fixed', top: 0, bottom: 0, zIndex: 40,
        display: 'flex', flexDirection: 'column'
      }} className="hidden lg:flex">
        {/* Logo */}
        <div style={{ padding: '20px', borderBottom: '1px solid #1e293b' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{
              width: 36, height: 36, borderRadius: 12,
              background: 'linear-gradient(135deg, #34d399, #0d9488)',
              display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>
              <Zap size={18} color="white" />
            </div>
            <div>
              <p style={{ fontWeight: 700, fontSize: 18, color: 'white', lineHeight: 1 }}>LUMICS</p>
              <p style={{ fontSize: 10, color: '#34d399', letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: 2 }}>
                Green AI Platform
              </p>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, padding: 12, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 2 }}>
          {navItems.map(({ name, path, icon: Icon }) => {
            const active = pathname === path
            return (
              <Link key={path} to={path} style={{
                display: 'flex', alignItems: 'center', gap: 12,
                padding: '10px 12px', borderRadius: '0 8px 8px 0',
                textDecoration: 'none', fontSize: 13, fontWeight: 500,
                borderLeft: `2px solid ${active ? '#10b981' : 'transparent'}`,
                background: active ? 'rgba(16,185,129,0.1)' : 'transparent',
                color: active ? '#34d399' : '#94a3b8',
                transition: 'all 0.15s',
              }}
                onMouseEnter={e => { if (!active) e.currentTarget.style.background = 'rgba(255,255,255,0.04)' }}
                onMouseLeave={e => { if (!active) e.currentTarget.style.background = 'transparent' }}
              >
                <Icon size={16} style={{ flexShrink: 0 }} />
                {name}
              </Link>
            )
          })}
        </nav>

        {/* Status */}
        <div style={{ padding: 16, borderTop: '1px solid #1e293b' }}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 8,
            background: 'rgba(6,78,59,0.4)', borderRadius: 8,
            padding: '10px 12px', border: '1px solid rgba(6,78,59,0.5)'
          }}>
            <span style={{
              width: 6, height: 6, borderRadius: '50%', background: '#34d399',
              animation: 'pulse 2s infinite'
            }} />
            <span style={{ fontSize: 12, color: '#6ee7b7', fontWeight: 500 }}>Monitoramento ativo</span>
          </div>
        </div>
      </aside>

      {/* Mobile top bar */}
      <div style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
        background: '#0f172a', borderBottom: '1px solid #1e293b',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 16px', height: 56,
      }} className="lg:hidden">
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{
            width: 28, height: 28, borderRadius: 8,
            background: 'linear-gradient(135deg, #34d399, #0d9488)',
            display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}>
            <Zap size={14} color="white" />
          </div>
          <span style={{ fontWeight: 700, color: 'white' }}>LUMICS</span>
        </div>
        <button onClick={() => setOpen(v => !v)}
          style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', padding: 8 }}>
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 40,
          background: '#020817', paddingTop: 56, overflowY: 'auto'
        }} className="lg:hidden">
          <nav style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 4 }}>
            {navItems.map(({ name, path, icon: Icon }) => (
              <Link key={path} to={path} onClick={() => setOpen(false)} style={{
                display: 'flex', alignItems: 'center', gap: 12,
                padding: '12px 16px', borderRadius: 12,
                textDecoration: 'none', fontSize: 15, fontWeight: 500,
                background: pathname === path ? 'rgba(6,78,59,0.5)' : 'transparent',
                color: pathname === path ? '#6ee7b7' : '#94a3b8',
              }}>
                <Icon size={20} />
                {name}
              </Link>
            ))}
          </nav>
        </div>
      )}

      {/* Conteúdo */}
      <main style={{ flex: 1, paddingTop: 56, minHeight: '100vh' }} className="lg:pl-60 lg:pt-0">
        <Outlet />
      </main>
    </div>
  )
}
