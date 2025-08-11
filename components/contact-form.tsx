"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { Loader2 } from "lucide-react"

export function ContactForm() {
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    documento: "",
    telefone: "",
    valorEmprestimo: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Simular envio do formulário
      await new Promise((resolve) => setTimeout(resolve, 2000))

      toast({
        title: "Formulário enviado com sucesso!",
        description: "Nossa equipe entrará em contato em breve.",
      })

      // Limpar formulário
      setFormData({
        nome: "",
        email: "",
        documento: "",
        telefone: "",
        valorEmprestimo: "",
      })
    } catch (error) {
      toast({
        title: "Erro ao enviar formulário",
        description: "Tente novamente em alguns instantes.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <Card className="border-0 shadow-xl">
      <CardHeader>
        <CardTitle>Solicite sua Simulação</CardTitle>
        <CardDescription>Preencha os dados abaixo e receba uma proposta personalizada</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="nome">Nome Completo</Label>
            <Input
              id="nome"
              type="text"
              placeholder="Digite seu nome completo"
              value={formData.nome}
              onChange={(e) => handleInputChange("nome", e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">E-mail</Label>
            <Input
              id="email"
              type="email"
              placeholder="seu@email.com"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="documento">CPF/CNPJ</Label>
            <Input
              id="documento"
              type="text"
              placeholder="000.000.000-00"
              value={formData.documento}
              onChange={(e) => handleInputChange("documento", e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="telefone">Telefone para Contato</Label>
            <Input
              id="telefone"
              type="tel"
              placeholder="(84) 99999-9999"
              value={formData.telefone}
              onChange={(e) => handleInputChange("telefone", e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="valor">Faixa de Valor do Empréstimo</Label>
            <Select
              value={formData.valorEmprestimo}
              onValueChange={(value) => handleInputChange("valorEmprestimo", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione a faixa de valor" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ate-5000">Até R$ 5.000</SelectItem>
                <SelectItem value="5000-10000">R$ 5.000 - R$ 10.000</SelectItem>
                <SelectItem value="10000-20000">R$ 10.000 - R$ 20.000</SelectItem>
                <SelectItem value="20000-50000">R$ 20.000 - R$ 50.000</SelectItem>
                <SelectItem value="50000-100000">R$ 50.000 - R$ 100.000</SelectItem>
                <SelectItem value="acima-100000">Acima de R$ 100.000</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Enviando...
              </>
            ) : (
              "Solicitar Simulação"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
