// Dashboard functionality
class Dashboard {
  constructor() {
    this.leadsKey = "jfs_leads_data"
    this.init()
  }

  init() {
    // Protect the page
    if (!window.protectPage()) return

    // Set current user
    const currentUser = window.auth.getCurrentUser()
    document.getElementById("currentUser").textContent = `Olá, ${currentUser}`

    // Load and display data
    this.loadLeads()
    this.updateStats()
  }

  getLeads() {
    const leads = localStorage.getItem(this.leadsKey)
    return leads ? JSON.parse(leads) : []
  }

  saveLeads(leads) {
    localStorage.setItem(this.leadsKey, JSON.stringify(leads))
  }

  addLead(leadData) {
    const leads = this.getLeads()
    const newLead = {
      id: Date.now(),
      timestamp: new Date().toISOString(),
      ...leadData,
    }
    leads.push(newLead)
    this.saveLeads(leads)
    return newLead
  }

  loadLeads() {
    const leads = this.getLeads()
    const tableBody = document.getElementById("leadsTableBody")
    const emptyState = document.getElementById("emptyState")

    if (leads.length === 0) {
      emptyState.style.display = "block"
      return
    }

    emptyState.style.display = "none"

    // Sort leads by date (newest first)
    leads.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))

    tableBody.innerHTML = leads
      .map((lead) => {
        const date = new Date(lead.timestamp)
        const formattedDate =
          date.toLocaleDateString("pt-BR") +
          " " +
          date.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })

        const valorLabels = {
          "ate-5000": "Até R$ 5.000",
          "5000-10000": "R$ 5.000 - R$ 10.000",
          "10000-20000": "R$ 10.000 - R$ 20.000",
          "20000-50000": "R$ 20.000 - R$ 50.000",
          "50000-100000": "R$ 50.000 - R$ 100.000",
          "acima-100000": "Acima de R$ 100.000",
        }

        return `
                <tr>
                    <td>${formattedDate}</td>
                    <td>${lead.nome}</td>
                    <td>${lead.email}</td>
                    <td>${lead.telefone}</td>
                    <td>${lead.documento}</td>
                    <td>${valorLabels[lead.valorEmprestimo] || lead.valorEmprestimo}</td>
                </tr>
            `
      })
      .join("")
  }

  updateStats() {
    const leads = this.getLeads()
    const now = new Date()
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000)
    const monthAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000)

    const leadsToday = leads.filter((lead) => {
      const leadDate = new Date(lead.timestamp)
      return leadDate >= today
    }).length

    const leadsWeek = leads.filter((lead) => {
      const leadDate = new Date(lead.timestamp)
      return leadDate >= weekAgo
    }).length

    const leadsMonth = leads.filter((lead) => {
      const leadDate = new Date(lead.timestamp)
      return leadDate >= monthAgo
    }).length

    document.getElementById("totalLeads").textContent = leads.length
    document.getElementById("leadsToday").textContent = leadsToday
    document.getElementById("leadsWeek").textContent = leadsWeek
    document.getElementById("leadsMonth").textContent = leadsMonth
  }
}

// Initialize dashboard
document.addEventListener("DOMContentLoaded", () => {
  window.dashboard = new Dashboard()
})

// Function to add sample data for testing
function addSampleData() {
  const sampleLeads = [
    {
      nome: "João Silva Santos",
      email: "joao.silva@email.com",
      documento: "123.456.789-00",
      telefone: "(84) 99999-1234",
      valorEmprestimo: "10000-20000",
    },
    {
      nome: "Maria Oliveira Costa",
      email: "maria.oliveira@email.com",
      documento: "987.654.321-00",
      telefone: "(84) 98888-5678",
      valorEmprestimo: "5000-10000",
    },
    {
      nome: "Pedro Almeida Ferreira",
      email: "pedro.almeida@email.com",
      documento: "456.789.123-00",
      telefone: "(84) 97777-9012",
      valorEmprestimo: "20000-50000",
    },
  ]

  sampleLeads.forEach((lead) => {
    window.dashboard.addLead(lead)
  })

  window.dashboard.loadLeads()
  window.dashboard.updateStats()
}

// Expose function globally for testing
window.addSampleData = addSampleData
