// Mobile Menu Toggle
function toggleMobileMenu() {
  const mobileNav = document.getElementById("mobileNav")
  const isVisible = mobileNav.style.display === "block"
  mobileNav.style.display = isVisible ? "none" : "block"
}

function closeMobileMenu() {
  document.getElementById("mobileNav").style.display = "none"
}

// Smooth scroll to section
function scrollToSection(sectionId) {
  const element = document.getElementById(sectionId)
  if (element) {
    element.scrollIntoView({ behavior: "smooth" })
  }
}

let currentSlide = 0
const totalSlides = 4
let carouselInterval

function updateCarousel() {
  const track = document.getElementById("carouselTrack")
  const indicators = document.querySelectorAll(".indicator")

  if (track) {
    track.style.transform = `translateX(-${currentSlide * 100}%)`
  }

  indicators.forEach((indicator, index) => {
    indicator.classList.toggle("active", index === currentSlide)
  })
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % totalSlides
  updateCarousel()
}

function prevSlide() {
  currentSlide = (currentSlide - 1 + totalSlides) % totalSlides
  updateCarousel()
}

function goToSlide(slideIndex) {
  currentSlide = slideIndex
  updateCarousel()
}

function startCarouselAutoplay() {
  carouselInterval = setInterval(nextSlide, 5000) // Avança a cada 5 segundos
}

function stopCarouselAutoplay() {
  if (carouselInterval) {
    clearInterval(carouselInterval)
  }
}

// Form validation and formatting
function formatCPF(value) {
  return value
    .replace(/\D/g, "")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})/, "$1-$2")
    .replace(/(-\d{2})\d+?$/, "$1")
}

function formatCNPJ(value) {
  return value
    .replace(/\D/g, "")
    .replace(/(\d{2})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1/$2")
    .replace(/(\d{4})(\d{1,2})/, "$1-$2")
    .replace(/(-\d{2})\d+?$/, "$1")
}

function formatPhone(value) {
  return value
    .replace(/\D/g, "")
    .replace(/(\d{2})(\d)/, "($1) $2")
    .replace(/(\d{4,5})(\d{4})/, "$1-$2")
    .replace(/(-\d{4})\d+?$/, "$1")
}

function validateCPF(cpf) {
  cpf = cpf.replace(/[^\d]+/g, "")
  if (cpf.length !== 11 || !!cpf.match(/(\d)\1{10}/)) return false

  const digits = cpf.split("").map((el) => +el)
  const rest = (count) =>
    ((digits.slice(0, count - 1).reduce((soma, el, index) => soma + el * (count - index), 0) * 10) % 11) % 10

  return rest(10) === digits[9] && rest(11) === digits[10]
}

function validateCNPJ(cnpj) {
  cnpj = cnpj.replace(/[^\d]+/g, "")
  if (cnpj.length !== 14) return false

  if (/^(\d)\1{13}$/.test(cnpj)) return false

  let length = cnpj.length - 2
  let numbers = cnpj.substring(0, length)
  const digits = cnpj.substring(length)
  let sum = 0
  let pos = length - 7

  for (let i = length; i >= 1; i--) {
    sum += numbers.charAt(length - i) * pos--
    if (pos < 2) pos = 9
  }

  let result = sum % 11 < 2 ? 0 : 11 - (sum % 11)
  if (result !== Number.parseInt(digits.charAt(0))) return false

  length = length + 1
  numbers = cnpj.substring(0, length)
  sum = 0
  pos = length - 7

  for (let i = length; i >= 1; i--) {
    sum += numbers.charAt(length - i) * pos--
    if (pos < 2) pos = 9
  }

  result = sum % 11 < 2 ? 0 : 11 - (sum % 11)
  return result === Number.parseInt(digits.charAt(1))
}

// Dashboard integration class
class LeadsManager {
  constructor() {
    this.leadsKey = "jfs_leads_data"
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

  getLeads() {
    const leads = localStorage.getItem(this.leadsKey)
    return leads ? JSON.parse(leads) : []
  }

  saveLeads(leads) {
    localStorage.setItem(this.leadsKey, JSON.stringify(leads))
  }
}

// Form handling
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contactForm")
  const documentoInput = document.getElementById("documento")
  const telefoneInput = document.getElementById("telefone")

  const leadsManager = new LeadsManager()

  updateCarousel()
  startCarouselAutoplay()

  // Pausar autoplay quando hover no carrossel
  const carouselContainer = document.querySelector(".carousel-container")
  if (carouselContainer) {
    carouselContainer.addEventListener("mouseenter", stopCarouselAutoplay)
    carouselContainer.addEventListener("mouseleave", startCarouselAutoplay)
  }

  // Format documento input
  documentoInput.addEventListener("input", (e) => {
    const value = e.target.value.replace(/\D/g, "")
    if (value.length <= 11) {
      e.target.value = formatCPF(e.target.value)
    } else {
      e.target.value = formatCNPJ(e.target.value)
    }
  })

  // Format phone input
  telefoneInput.addEventListener("input", (e) => {
    e.target.value = formatPhone(e.target.value)
  })

  // Form submission
  form.addEventListener("submit", async (e) => {
    e.preventDefault()

    const submitBtn = form.querySelector('button[type="submit"]')
    const formData = new FormData(form)
    const data = Object.fromEntries(formData)

    const instituicoesSelecionadas = Array.from(form.querySelectorAll('input[name="instituicoes"]:checked')).map(
      (checkbox) => checkbox.value,
    )

    // Validate documento
    const documento = data.documento.replace(/\D/g, "")
    if (documento.length === 11) {
      if (!validateCPF(documento)) {
        alert("CPF inválido. Por favor, verifique o número digitado.")
        return
      }
    } else if (documento.length === 14) {
      if (!validateCNPJ(documento)) {
        alert("CNPJ inválido. Por favor, verifique o número digitado.")
        return
      }
    } else {
      alert("Por favor, digite um CPF ou CNPJ válido.")
      return
    }

    // Show loading state
    submitBtn.classList.add("loading")
    submitBtn.disabled = true

    try {
      // Simulate form submission
      await new Promise((resolve) => setTimeout(resolve, 2000))

      leadsManager.addLead({
        nome: data.nome,
        email: data.email,
        documento: data.documento,
        telefone: data.telefone,
        valorEmprestimo: data.valorEmprestimo,
        instituicoes: instituicoesSelecionadas,
      })

      // Create WhatsApp message
      const valorLabels = {
        "ate-5000": "Até R$ 5.000",
        "5000-10000": "R$ 5.000 - R$ 10.000",
        "10000-20000": "R$ 10.000 - R$ 20.000",
        "20000-50000": "R$ 20.000 - R$ 50.000",
        "50000-100000": "R$ 50.000 - R$ 100.000",
        "acima-100000": "Acima de R$ 100.000",
      }

      const instituicoesTexto =
        instituicoesSelecionadas.length > 0
          ? `*Instituições de Interesse:* ${instituicoesSelecionadas.join(", ")}\n`
          : ""

      const message = `*Nova Solicitação de Empréstimo Consignado*

*Nome:* ${data.nome}
*E-mail:* ${data.email}
*CPF/CNPJ:* ${data.documento}
*Telefone:* ${data.telefone}
*Valor Desejado:* ${valorLabels[data.valorEmprestimo]}
${instituicoesTexto}
Enviado através do site JFS Empréstimos Consignados.`

      const whatsappUrl = `https://wa.me/5584999293122?text=${encodeURIComponent(message)}`

      // Show success modal
      showSuccessModal(whatsappUrl)

      // Reset form
      form.reset()
    } catch (error) {
      alert("Erro ao enviar formulário. Tente novamente em alguns instantes.")
    } finally {
      // Hide loading state
      submitBtn.classList.remove("loading")
      submitBtn.disabled = false
    }
  })
})

// Modal functions
function showSuccessModal(whatsappUrl) {
  const modal = document.getElementById("successModal")
  const whatsappLink = document.getElementById("whatsappLink")

  whatsappLink.href = whatsappUrl
  modal.style.display = "flex"

  // Auto redirect to WhatsApp after 3 seconds
  setTimeout(() => {
    window.open(whatsappUrl, "_blank")
  }, 3000)
}

function closeModal() {
  document.getElementById("successModal").style.display = "none"
}

// Close modal when clicking outside
document.getElementById("successModal").addEventListener("click", function (e) {
  if (e.target === this) {
    closeModal()
  }
})

// Close mobile menu when clicking outside
document.addEventListener("click", (e) => {
  const mobileNav = document.getElementById("mobileNav")
  const mobileMenuBtn = document.querySelector(".mobile-menu-btn")

  if (!mobileMenuBtn.contains(e.target) && !mobileNav.contains(e.target)) {
    mobileNav.style.display = "none"
  }
})

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  })
})
