import { useState } from 'react'
import { Calendar, Phone, MessageCircle, CheckCircle, User } from 'lucide-react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import logoImage from './assets/logocjodontologia.png'
import './App.css'

function App() {
  const [selectedDate, setSelectedDate] = useState(null)
  const [selectedService, setSelectedService] = useState(null)
  const [selectedDentist, setSelectedDentist] = useState(null)
  const [selectedDay, setSelectedDay] = useState('')
  const [selectedMonth, setSelectedMonth] = useState('')
  const [selectedYear, setSelectedYear] = useState('')

  const dentists = [
    { id: 'cleo', name: 'Dra. Cléo Carolyne', cro: 'CRO/RJ 53352', whatsapp: '5521976092774' },
    { id: 'jose', name: 'Dr. José Victor', cro: 'CRO/RJ 53354', whatsapp: '5521972928808' }
  ]

  const services = [
    { id: 'consulta', name: 'Consulta de Avaliação' },
    { id: 'limpeza', name: 'Limpeza Dental' },
    { id: 'restauracao', name: 'Restauração' },
    { id: 'canal', name: 'Tratamento de Canal' },
    { id: 'ortodontia', name: 'Consulta Ortodôntica' },
    { id: 'implante', name: 'Consulta para Implante' }
  ]

  const months = [
    { value: '01', label: 'Janeiro' },
    { value: '02', label: 'Fevereiro' },
    { value: '03', label: 'Março' },
    { value: '04', label: 'Abril' },
    { value: '05', label: 'Maio' },
    { value: '06', label: 'Junho' },
    { value: '07', label: 'Julho' },
    { value: '08', label: 'Agosto' },
    { value: '09', label: 'Setembro' },
    { value: '10', label: 'Outubro' },
    { value: '11', label: 'Novembro' },
    { value: '12', label: 'Dezembro' }
  ]

  const generateYears = () => {
    const currentYear = new Date().getFullYear()
    const years = []
    for (let i = currentYear; i <= currentYear + 10; i++) {
      years.push(i.toString())
    }
    return years
  }

  const generateDays = () => {
    const days = []
    for (let i = 1; i <= 31; i++) {
      days.push(i.toString().padStart(2, '0'))
    }
    return days
  }

  const handleWhatsAppRedirect = () => {
    if (!selectedDay || !selectedMonth || !selectedYear || !selectedService || !selectedDentist) {
      alert('Por favor, selecione um dentista, uma data completa e um serviço antes de continuar.')
      return
    }

    const service = services.find(s => s.id === selectedService)
    const dentist = dentists.find(d => d.id === selectedDentist)
    const dateStr = `${selectedDay}/${selectedMonth}/${selectedYear}`

    const message = `Olá ${dentist.name} (${dentist.cro})! Gostaria de agendar uma consulta na CJ Odontologia.

📅 Data: ${dateStr}
🦷 Serviço: ${service.name}

Poderia verificar a disponibilidade de horários para esta data?

Obrigado!`

    const whatsappUrl = `https://wa.me/${dentist.whatsapp}?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, '_blank')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Header */}
      <header className="cj-gradient text-white py-6 px-4 shadow-lg">
        <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
          <img 
            src={logoImage} 
            alt="CJ Odontologia" 
            className="h-20 w-auto mb-4 bg-white rounded-lg p-2"
          />
          <h1 className="text-2xl md:text-3xl font-bold mb-2">
            Agendamento Online
          </h1>
          <p className="text-blue-100 text-sm md:text-base">
            Agende sua consulta de forma rápida e prática
          </p>
          <div className="flex items-center gap-2 mt-3 text-blue-100">
            <Phone className="h-4 w-4" />
            <span className="text-sm">(21) 97609-2774</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto p-4 py-8">
        <div className="grid gap-6 md:gap-8">

          {/* Seleção de Dentista */}
          <Card className="shadow-lg border-0">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
              <CardTitle className="flex items-center gap-2 cj-primary-text">
                <User className="h-5 w-5" />
                1. Escolha o Dentista
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {dentists.map((dentist) => (
                  <button
                    key={dentist.id}
                    onClick={() => setSelectedDentist(dentist.id)}
                    className={`dentist-card p-4 rounded-lg border-2 text-left transition-all duration-300 hover:shadow-md ${
                      selectedDentist === dentist.id
                        ? 'border-[#1a3a52] bg-[#1a3a52] text-white'
                        : 'border-gray-200 hover:border-[#1a3a52] hover:bg-blue-50'
                    }`}
                  >
                    <div className="font-semibold text-sm">{dentist.name}</div>
                    <div className={`text-xs mt-1 ${
                      selectedDentist === dentist.id ? 'text-blue-100' : 'text-gray-500'
                    }`}>
                      {dentist.cro}
                    </div>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
          
          {/* Seleção de Serviço */}
          <Card className="shadow-lg border-0">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
              <CardTitle className="flex items-center gap-2 cj-primary-text">
                <CheckCircle className="h-5 w-5" />
                2. Escolha o Serviço
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {services.map((service) => (
                  <button
                    key={service.id}
                    onClick={() => setSelectedService(service.id)}
                    className={`service-card p-4 rounded-lg border-2 text-left transition-all duration-300 hover:shadow-md ${
                      selectedService === service.id
                        ? 'border-[#1a3a52] bg-[#1a3a52] text-white'
                        : 'border-gray-200 hover:border-[#1a3a52] hover:bg-blue-50'
                    }`}
                  >
                    <div className="font-semibold text-sm">{service.name}</div>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Seleção de Data */}
          <Card className="shadow-lg border-0">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
              <CardTitle className="flex items-center gap-2 cj-primary-text">
                <Calendar className="h-5 w-5" />
                3. Escolha a Data
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Dia */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Dia</label>
                  <select
                    value={selectedDay}
                    onChange={(e) => setSelectedDay(e.target.value)}
                    className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-[#1a3a52] focus:outline-none"
                  >
                    <option value="">Selecione o dia</option>
                    {generateDays().map((day) => (
                      <option key={day} value={day}>{day}</option>
                    ))}
                  </select>
                </div>

                {/* Mês */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Mês</label>
                  <select
                    value={selectedMonth}
                    onChange={(e) => setSelectedMonth(e.target.value)}
                    className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-[#1a3a52] focus:outline-none"
                  >
                    <option value="">Selecione o mês</option>
                    {months.map((month) => (
                      <option key={month.value} value={month.value}>{month.label}</option>
                    ))}
                  </select>
                </div>

                {/* Ano */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Ano</label>
                  <select
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(e.target.value)}
                    className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-[#1a3a52] focus:outline-none"
                  >
                    <option value="">Selecione o ano</option>
                    {generateYears().map((year) => (
                      <option key={year} value={year}>{year}</option>
                    ))}
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Resumo e Botão WhatsApp */}
          {(selectedDay || selectedMonth || selectedYear || selectedService || selectedDentist) && (
            <Card className="shadow-lg border-0 bg-gradient-to-r from-green-50 to-emerald-50">
              <CardContent className="p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-4">
                  Resumo do Agendamento
                </h3>
                
                <div className="space-y-2 mb-6">
                  {selectedDentist && (
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-green-600" />
                      <span className="text-sm">
                        <strong>Dentista:</strong> {dentists.find(d => d.id === selectedDentist)?.name}
                      </span>
                    </div>
                  )}
                  {selectedService && (
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm">
                        <strong>Serviço:</strong> {services.find(s => s.id === selectedService)?.name}
                      </span>
                    </div>
                  )}
                  
                  {(selectedDay && selectedMonth && selectedYear) && (
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-green-600" />
                      <span className="text-sm">
                        <strong>Data:</strong> {selectedDay}/{selectedMonth}/{selectedYear}
                      </span>
                    </div>
                  )}
                </div>

                <Button
                  onClick={handleWhatsAppRedirect}
                  className="whatsapp-button w-full text-white font-semibold py-3 px-6 rounded-lg flex items-center justify-center gap-2"
                  disabled={!selectedDay || !selectedMonth || !selectedYear || !selectedService || !selectedDentist}
                >
                  <MessageCircle className="h-5 w-5" />
                  Verificar Disponibilidade via WhatsApp
                </Button>
                
                <p className="text-xs text-gray-600 text-center mt-3">
                  Você será redirecionado para o WhatsApp para verificar horários disponíveis
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="cj-primary text-white py-6 px-4 mt-12">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Phone className="h-4 w-4" />
            <span className="font-semibold">(21) 97609-2774</span>
          </div>
          <p className="text-blue-100 text-sm">
            CJ Odontologia - Cuidando do seu sorriso com excelência
          </p>
        </div>
      </footer>
    </div>
  )
}

export default App
