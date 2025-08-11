import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Menu, Phone, Mail, MapPin, Clock, Shield, Users, TrendingUp } from "lucide-react"
import { ContactForm } from "@/components/contact-form"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">JFS</h1>
                <p className="text-xs text-gray-600">Empréstimos Consignados</p>
              </div>
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex space-x-8">
              <a href="#inicio" className="text-gray-700 hover:text-blue-600 font-medium">
                Início
              </a>
              <a href="#quem-somos" className="text-gray-700 hover:text-blue-600 font-medium">
                Quem Somos
              </a>
              <a href="#servicos" className="text-gray-700 hover:text-blue-600 font-medium">
                Serviços
              </a>
              <a href="#contato" className="text-gray-700 hover:text-blue-600 font-medium">
                Contato
              </a>
            </nav>

            {/* Mobile menu button */}
            <Button variant="ghost" size="sm" className="md:hidden">
              <Menu className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section id="inicio" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Badge className="mb-4 bg-blue-100 text-blue-800 hover:bg-blue-100">
              Empréstimos com as melhores taxas do mercado
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Crédito Consignado
              <span className="text-blue-600 block">Rápido e Seguro</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Oferecemos as melhores condições em empréstimos consignados para aposentados, pensionistas e servidores
              públicos. Aprovação rápida e taxas competitivas.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                Simular Empréstimo
              </Button>
              <Button size="lg" variant="outline">
                Falar com Especialista
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Quem Somos Section */}
      <section id="quem-somos" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-4 bg-blue-100 text-blue-800 hover:bg-blue-100">Quem Somos</Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Mais de 10 anos facilitando o acesso ao crédito
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                A JFS Empréstimos Consignados é uma empresa especializada em crédito consignado, oferecendo soluções
                financeiras personalizadas para aposentados, pensionistas e servidores públicos em todo o Brasil.
              </p>
              <p className="text-lg text-gray-600 mb-8">
                Nossa missão é democratizar o acesso ao crédito com transparência, agilidade e as melhores taxas do
                mercado, sempre priorizando o atendimento humanizado e a satisfação dos nossos clientes.
              </p>
              <div className="grid grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">10+</div>
                  <div className="text-sm text-gray-600">Anos de experiência</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">50k+</div>
                  <div className="text-sm text-gray-600">Clientes atendidos</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">98%</div>
                  <div className="text-sm text-gray-600">Satisfação</div>
                </div>
              </div>
            </div>
            <div className="relative">
              <img src="/images/about-image.png" alt="Equipe JFS Empréstimos" className="rounded-lg shadow-xl" />
            </div>
          </div>
        </div>
      </section>

      {/* O que fazemos Section */}
      <section id="servicos" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-blue-100 text-blue-800 hover:bg-blue-100">Nossos Serviços</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">O que fazemos</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Oferecemos soluções completas em crédito consignado com processo 100% digital e atendimento personalizado.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
                <CardTitle>Aposentados INSS</CardTitle>
                <CardDescription>
                  Empréstimos consignados para aposentados do INSS com as melhores taxas e condições especiais.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6 text-blue-600" />
                </div>
                <CardTitle>Pensionistas</CardTitle>
                <CardDescription>
                  Crédito consignado para pensionistas com processo simplificado e aprovação rápida.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <TrendingUp className="w-6 h-6 text-blue-600" />
                </div>
                <CardTitle>Servidores Públicos</CardTitle>
                <CardDescription>
                  Empréstimos consignados para servidores públicos federais, estaduais e municipais.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <Clock className="w-6 h-6 text-blue-600" />
                </div>
                <CardTitle>Aprovação Rápida</CardTitle>
                <CardDescription>
                  Processo 100% digital com aprovação em até 24 horas e liberação do crédito em até 48h.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6 text-blue-600" />
                </div>
                <CardTitle>Segurança Total</CardTitle>
                <CardDescription>
                  Processo seguro e transparente, com proteção total dos seus dados pessoais.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <Phone className="w-6 h-6 text-blue-600" />
                </div>
                <CardTitle>Atendimento Especializado</CardTitle>
                <CardDescription>
                  Equipe especializada disponível para esclarecer dúvidas e auxiliar em todo o processo.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contato" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <Badge className="mb-4 bg-blue-100 text-blue-800 hover:bg-blue-100">Entre em Contato</Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Solicite sua simulação gratuita</h2>
              <p className="text-lg text-gray-600 mb-8">
                Preencha o formulário ao lado e nossa equipe entrará em contato para apresentar as melhores condições
                para seu empréstimo consignado.
              </p>

              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-blue-600" />
                  <span className="text-gray-700">(84) 99929-3122</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-blue-600" />
                  <span className="text-gray-700">contato@jfsemprestimos.com.br</span>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="w-5 h-5 text-blue-600" />
                  <span className="text-gray-700">Natal, Rio Grande do Norte</span>
                </div>
              </div>
            </div>

            <div>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-bold">JFS</h3>
                  <p className="text-sm text-gray-400">Empréstimos Consignados</p>
                </div>
              </div>
              <p className="text-gray-400">
                Facilitando o acesso ao crédito com transparência e as melhores condições do mercado.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Serviços</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Aposentados INSS</li>
                <li>Pensionistas</li>
                <li>Servidores Públicos</li>
                <li>Simulação Gratuita</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Contato</h4>
              <ul className="space-y-2 text-gray-400">
                <li>(84) 99929-3122</li>
                <li>contato@jfsemprestimos.com.br</li>
                <li>Natal, RN</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 JFS Empréstimos Consignados. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
