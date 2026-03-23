import { useState } from 'react'

const AI_MODELS = {
  'GPT-4':           { kwh: 0.001  },
  'GPT-3.5':         { kwh: 0.0003 },
  'Claude 3 Opus':   { kwh: 0.001  },
  'Claude 3 Sonnet': { kwh: 0.0006 },
  'Claude 3 Haiku':  { kwh: 0.0002 },
  'Gemini Pro':      { kwh: 0.0007 },
  'Gemini Ultra':    { kwh: 0.0012 },
  'DALL-E 3':        { kwh: 0.003  },
  'Midjourney':      { kwh: 0.004  },
  'Llama 3 (local)': { kwh: 0.0002 },
  'Outro':           { kwh: 0.0005 },
}

const TASKS = ['Geração de Texto','Geração de Imagem','Geração de Código','Análise de Dados','Tradução','Sumarização','Outro']
const USERS = ['Empresa','Aluno','Professor','Desenvolvedor']

const sel = {
  width: '100%', padding: '8px 12px', background: '#1e293b', border: '1px solid #334155',
  borderRadius: 8, color: 'white', fontSize: 13, outline: 'none',
}
const inp = { ...sel }

const CARBON_INTENSITY = 400 // gCO2/kWh (média global)

export default function CalcForm({ onSave, loading }) {
  const [form, setForm] = useState({
    model_name: 'GPT-4', task_type: 'Geração de Texto',
    queries_count: '', user_type: 'Desenvolvedor', notes: ''
  })

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const kwh = AI_MODELS[form.model_name]?.kwh || 0.0005
  const queries = Number(form.queries_count) || 0
  const estimated_kwh = kwh * queries
  const estimated_co2_grams = estimated_kwh * CARBON_INTENSITY

  const submit = async (e) => {
    e.preventDefault()
    if (!queries) return
    await onSave({ ...form, queries_count: queries, estimated_kwh, estimated_co2_grams })
    setForm(f => ({ ...f, queries_count: '', notes: '' }))
  }

  return (
    <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        <div>
          <label style={{ color: '#64748b', fontSize: 11, display: 'block', marginBottom: 6 }}>Modelo de IA</label>
          <select style={sel} value={form.model_name} onChange={e => set('model_name', e.target.value)}>
            {Object.keys(AI_MODELS).map(m => <option key={m}>{m}</option>)}
          </select>
        </div>
        <div>
          <label style={{ color: '#64748b', fontSize: 11, display: 'block', marginBottom: 6 }}>Tipo de Tarefa</label>
          <select style={sel} value={form.task_type} onChange={e => set('task_type', e.target.value)}>
            {TASKS.map(t => <option key={t}>{t}</option>)}
          </select>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        <div>
          <label style={{ color: '#64748b', fontSize: 11, display: 'block', marginBottom: 6 }}>Nº de Consultas</label>
          <input style={inp} type="number" min="1" placeholder="ex: 500"
            value={form.queries_count} onChange={e => set('queries_count', e.target.value)} />
        </div>
        <div>
          <label style={{ color: '#64748b', fontSize: 11, display: 'block', marginBottom: 6 }}>Perfil</label>
          <select style={sel} value={form.user_type} onChange={e => set('user_type', e.target.value)}>
            {USERS.map(u => <option key={u}>{u}</option>)}
          </select>
        </div>
      </div>

      {/* Preview */}
      {queries > 0 && (
        <div style={{
          background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.2)',
          borderRadius: 8, padding: 12, display: 'flex', gap: 20
        }}>
          <div>
            <p style={{ color: '#64748b', fontSize: 10 }}>CO₂ Estimado</p>
            <p style={{ color: '#f87171', fontWeight: 700, fontSize: 18 }}>{estimated_co2_grams.toFixed(3)}g</p>
          </div>
          <div>
            <p style={{ color: '#64748b', fontSize: 10 }}>Energia</p>
            <p style={{ color: '#fb923c', fontWeight: 700, fontSize: 18 }}>{(estimated_kwh * 1000).toFixed(3)} Wh</p>
          </div>
        </div>
      )}

      <button type="submit" disabled={loading || !queries} style={{
        width: '100%', padding: '9px', borderRadius: 8, border: 'none',
        background: loading || !queries ? '#1e293b' : '#059669',
        color: 'white', fontSize: 13, fontWeight: 600, cursor: loading || !queries ? 'not-allowed' : 'pointer',
        transition: 'background 0.2s',
      }}>
        {loading ? 'Salvando...' : 'Registrar Uso'}
      </button>
    </form>
  )
}
