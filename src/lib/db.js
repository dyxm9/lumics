// =====================================================
// LUMICS Database Layer
// Usa localStorage (funciona sem servidor!)
// Para produção: substitua pelo Supabase
// =====================================================

export const db = {
  // Criar registro
  create(entity, data) {
    const items = this.list(entity)
    const newItem = {
      ...data,
      id: Date.now().toString() + Math.random().toString(36).slice(2),
      created_date: new Date().toISOString(),
      updated_date: new Date().toISOString(),
    }
    localStorage.setItem(entity, JSON.stringify([newItem, ...items]))
    return newItem
  },

  // Listar (com ordenação opcional)
  list(entity, sortBy = '-created_date', limit = 50) {
    try {
      const items = JSON.parse(localStorage.getItem(entity) || '[]')
      const desc = sortBy.startsWith('-')
      const field = sortBy.replace('-', '')
      const sorted = [...items].sort((a, b) => {
        if (desc) return a[field] > b[field] ? -1 : 1
        return a[field] > b[field] ? 1 : -1
      })
      return sorted.slice(0, limit)
    } catch {
      return []
    }
  },

  // Deletar
  delete(entity, id) {
    const items = this.list(entity).filter(i => i.id !== id)
    localStorage.setItem(entity, JSON.stringify(items))
  },

  // Filtrar
  filter(entity, filters) {
    return this.list(entity).filter(item =>
      Object.entries(filters).every(([k, v]) => item[k] === v)
    )
  }
}

// Entidades disponíveis (mesmas da versão Base44)
export const entities = {
  AIUsageLog: {
    list: (sort, limit) => db.list('AIUsageLog', sort, limit),
    create: (data) => db.create('AIUsageLog', data),
    delete: (id) => db.delete('AIUsageLog', id),
    filter: (f) => db.filter('AIUsageLog', f),
  },
  PromptSession: {
    list: (sort, limit) => db.list('PromptSession', sort, limit),
    create: (data) => db.create('PromptSession', data),
    delete: (id) => db.delete('PromptSession', id),
  }
}
