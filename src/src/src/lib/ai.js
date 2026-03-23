// =====================================================
// LUMICS AI Layer
// Suporta: OpenAI (pago) e Groq (GRATUITO)
// Configure no arquivo .env
// =====================================================

const PROVIDER = import.meta.env.VITE_AI_PROVIDER || 'groq'
const OPENAI_KEY = import.meta.env.VITE_OPENAI_API_KEY
const GROQ_KEY = import.meta.env.VITE_GROQ_API_KEY

// Chame esta função em qualquer página, igual ao base44
export async function invokeLLM({ prompt, responseJsonSchema = null }) {
  if (PROVIDER === 'groq') {
    return callGroq(prompt, responseJsonSchema)
  }
  return callOpenAI(prompt, responseJsonSchema)
}

// --- GROQ (GRATUITO) ---
async function callGroq(prompt, schema) {
  const systemMsg = schema
    ? `Responda APENAS com JSON válido seguindo este schema: ${JSON.stringify(schema)}. Sem texto extra, apenas o JSON.`
    : 'Você é um assistente especialista em sustentabilidade e IA.'

  const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${GROQ_KEY}`
    },
    body: JSON.stringify({
      model: 'llama-3.1-8b-instant',
      messages: [
        { role: 'system', content: systemMsg },
        { role: 'user', content: prompt }
      ],
      temperature: 0.7,
      max_tokens: 2000
    })
  })

  const data = await res.json()
  const content = data.choices?.[0]?.message?.content || ''

  if (schema) {
    try {
      // Extrai JSON mesmo se vier com texto ao redor
      const match = content.match(/\{[\s\S]*\}/)
      return JSON.parse(match ? match[0] : content)
    } catch {
      console.error('Erro ao parsear JSON:', content)
      return {}
    }
  }
  return content
}

// --- OPENAI (PAGO, mais poderoso) ---
async function callOpenAI(prompt, schema) {
  const res = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${OPENAI_KEY}`
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: prompt }],
      response_format: schema ? { type: 'json_object' } : { type: 'text' },
      temperature: 0.7
    })
  })

  const data = await res.json()
  const content = data.choices?.[0]?.message?.content || ''

  return schema ? JSON.parse(content) : content
}
