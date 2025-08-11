// Authentication system
class AuthSystem {
  constructor() {
    this.users = {
      admin: "jfs2024",
      jfs: "admin123",
    }
    this.sessionKey = "jfs_auth_session"
    this.usersKey = "jfs_custom_users"

    this.loadCustomUsers()
  }

  loadCustomUsers() {
    const customUsers = localStorage.getItem(this.usersKey)
    if (customUsers) {
      try {
        const parsed = JSON.parse(customUsers)
        this.users = { ...this.users, ...parsed }
      } catch (e) {
        console.error("Erro ao carregar usuários customizados:", e)
      }
    }
  }

  saveCustomUsers() {
    const defaultUsers = { admin: "jfs2024", jfs: "admin123" }
    const customUsers = {}

    for (const [username, password] of Object.entries(this.users)) {
      if (!defaultUsers[username]) {
        customUsers[username] = password
      }
    }

    localStorage.setItem(this.usersKey, JSON.stringify(customUsers))
  }

  register(username, password, adminKey) {
    // Verificar chave administrativa
    if (adminKey !== "jfs2024admin") {
      return { success: false, error: "Chave administrativa inválida" }
    }

    // Verificar se usuário já existe
    if (this.users[username]) {
      return { success: false, error: "Usuário já existe" }
    }

    // Validar dados
    if (!username || username.length < 3) {
      return { success: false, error: "Usuário deve ter pelo menos 3 caracteres" }
    }

    if (!password || password.length < 6) {
      return { success: false, error: "Senha deve ter pelo menos 6 caracteres" }
    }

    // Adicionar usuário
    this.users[username] = password
    this.saveCustomUsers()

    return { success: true }
  }

  login(username, password) {
    if (this.users[username] && this.users[username] === password) {
      const session = {
        username: username,
        loginTime: new Date().toISOString(),
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // 24 hours
      }
      localStorage.setItem(this.sessionKey, JSON.stringify(session))
      return true
    }
    return false
  }

  logout() {
    localStorage.removeItem(this.sessionKey)
    window.location.href = "login.html"
  }

  isAuthenticated() {
    const session = localStorage.getItem(this.sessionKey)
    if (!session) return false

    try {
      const sessionData = JSON.parse(session)
      const now = new Date()
      const expires = new Date(sessionData.expires)

      if (now > expires) {
        this.logout()
        return false
      }

      return true
    } catch (e) {
      localStorage.removeItem(this.sessionKey)
      return false
    }
  }

  getCurrentUser() {
    const session = localStorage.getItem(this.sessionKey)
    if (!session) return null

    try {
      const sessionData = JSON.parse(session)
      return sessionData.username
    } catch (e) {
      return null
    }
  }

  requireAuth() {
    if (!this.isAuthenticated()) {
      window.location.href = "login.html"
      return false
    }
    return true
  }
}

// Initialize auth system
const auth = new AuthSystem()

function showLogin() {
  document.getElementById("loginForm").style.display = "block"
  document.getElementById("registerForm").style.display = "none"
  document.getElementById("formTitle").innerText = "Acesso ao Dashboard"
  document.getElementById("formDescription").innerText =
    "Entre com suas credenciais para acessar o painel administrativo"

  // Atualizar abas
  document.querySelectorAll(".tab-btn").forEach((btn) => btn.classList.remove("active"))
  document.querySelector(".tab-btn:first-child").classList.add("active")
}

function showRegister() {
  document.getElementById("loginForm").style.display = "none"
  document.getElementById("registerForm").style.display = "block"
  document.getElementById("formTitle").innerText = "Cadastro"
  document.getElementById("formDescription").innerText = "Crie uma conta para acessar o painel administrativo"

  // Atualizar abas
  document.querySelectorAll(".tab-btn").forEach((btn) => btn.classList.remove("active"))
  document.querySelector(".tab-btn:last-child").classList.add("active")
}

// Login and register form handling
document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm")
  const registerForm = document.getElementById("registerForm")

  if (loginForm) {
    // If already authenticated, redirect to dashboard
    if (auth.isAuthenticated()) {
      window.location.href = "dashboard.html"
      return
    }

    loginForm.addEventListener("submit", async (e) => {
      e.preventDefault()

      const submitBtn = loginForm.querySelector('button[type="submit"]')
      const errorDiv = document.getElementById("loginError")
      const formData = new FormData(loginForm)

      const username = formData.get("username")
      const password = formData.get("password")

      // Show loading state
      submitBtn.classList.add("loading")
      submitBtn.disabled = true
      errorDiv.style.display = "none"

      try {
        // Simulate network delay
        await new Promise((resolve) => setTimeout(resolve, 1000))

        if (auth.login(username, password)) {
          // Success - redirect to dashboard
          window.location.href = "dashboard.html"
        } else {
          // Show error
          errorDiv.style.display = "block"
        }
      } catch (error) {
        errorDiv.textContent = "Erro interno. Tente novamente."
        errorDiv.style.display = "block"
      } finally {
        // Hide loading state
        submitBtn.classList.remove("loading")
        submitBtn.disabled = false
      }
    })

    if (registerForm) {
      registerForm.addEventListener("submit", async (e) => {
        e.preventDefault()

        const submitBtn = registerForm.querySelector('button[type="submit"]')
        const errorDiv = document.getElementById("registerError")
        const successDiv = document.getElementById("registerSuccess")
        const formData = new FormData(registerForm)

        const username = formData.get("newUsername")
        const password = formData.get("newPassword")
        const confirmPassword = formData.get("confirmPassword")
        const adminKey = formData.get("adminKey")

        // Show loading state
        submitBtn.classList.add("loading")
        submitBtn.disabled = true
        errorDiv.style.display = "none"
        successDiv.style.display = "none"

        try {
          // Validate passwords match
          if (password !== confirmPassword) {
            errorDiv.textContent = "As senhas não coincidem"
            errorDiv.style.display = "block"
            return
          }

          // Simulate network delay
          await new Promise((resolve) => setTimeout(resolve, 1000))

          const result = auth.register(username, password, adminKey)

          if (result.success) {
            successDiv.style.display = "block"
            registerForm.reset()

            // Auto switch to login after 2 seconds
            setTimeout(() => {
              showLogin()
            }, 2000)
          } else {
            errorDiv.textContent = result.error
            errorDiv.style.display = "block"
          }
        } catch (error) {
          errorDiv.textContent = "Erro interno. Tente novamente."
          errorDiv.style.display = "block"
        } finally {
          // Hide loading state
          submitBtn.classList.remove("loading")
          submitBtn.disabled = false
        }
      })
    }
  }
})

// Logout function for dashboard
function logout() {
  auth.logout()
}

// Protect dashboard pages
function protectPage() {
  return auth.requireAuth()
}
