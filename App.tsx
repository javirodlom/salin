import React, { useState } from 'react';
import { ChatWidget } from './components/ChatWidget';
import mapImage from './assets/mapa_mexico.png';
import { RevealOnScroll } from './components/RevealOnScroll';
import { supabase } from './services/supabase';

function App() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    establishment: '',
    email: '',
    phone: ''
  });

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from('contacts')
        .insert([
          {
            name: formData.name,
            establishment: formData.establishment,
            email: formData.email,
            phone: formData.phone
          }
        ]);

      if (error) throw error;

      setShowSuccessMessage(true);
      setFormData({ name: '', establishment: '', email: '', phone: '' });
      setTimeout(() => setShowSuccessMessage(false), 5000);
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Hubo un error al enviar el formulario. Por favor intenta de nuevo.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <nav className="sticky top-0 z-40 bg-white/95 dark:bg-background-dark/95 backdrop-blur-md border-b border-gray-100 dark:border-gray-800 transition-colors duration-300 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5">
              <div className="relative h-8 w-auto">
                <div className="flex items-center gap-1.5">
                  <div className="relative h-8 w-6">
                    <svg className="h-full w-full" fill="none" viewBox="0 0 32 48" xmlns="http://www.w3.org/2000/svg">
                      <path d="M16 24C7.16344 24 0 16.8366 0 8C0 3.58172 3.58172 0 8 0H16C24.8366 0 32 7.16344 32 16C32 20.4183 28.4183 24 24 24H16Z" fill="#EB3E50"></path>
                      <path d="M16 24C24.8366 24 32 31.1634 32 40C32 44.4183 28.4183 48 24 48H16C7.16344 48 0 40.8366 0 32C0 27.5817 3.58172 24 8 24H16Z" fill="#0C2A4D"></path>
                    </svg>
                  </div>
                  <div className="font-display font-bold text-2xl tracking-tight flex">
                    <span className="text-secondary dark:text-white">sal</span>
                    <span className="text-primary">in</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#soluciones" className="text-sm font-semibold text-secondary dark:text-gray-300 hover:text-primary transition-colors">Soluciones</a>
            <a href="#logistica" className="text-sm font-semibold text-secondary dark:text-gray-300 hover:text-primary transition-colors">Logística</a>
            <a href="#contacto" className="text-sm font-semibold text-secondary dark:text-gray-300 hover:text-primary transition-colors">Contacto</a>
            <button
              onClick={toggleChat}
              className="bg-secondary hover:bg-opacity-90 text-white text-sm font-bold py-2.5 px-5 rounded-xl shadow-lg transition-transform transform active:scale-[0.98]"
            >
              Hablar con Agente
            </button>
          </div>
          <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-secondary dark:text-white md:hidden">
            <span className="material-symbols-outlined">menu</span>
          </button>
        </div>
      </nav>

      <main className="w-full bg-white dark:bg-background-dark shadow-2xl shadow-black/5">
        <section className="relative pt-12 pb-20 lg:pt-24 lg:pb-32 px-6 overflow-hidden bg-hero-gradient dark:bg-hero-gradient-dark">
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-primary/5 rounded-full blur-3xl dark:bg-primary/10 pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 -ml-10 -mb-10 w-40 h-40 bg-secondary/5 rounded-full blur-2xl dark:bg-blue-900/10 pointer-events-none"></div>

          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-center relative z-10">
            <div className="text-center md:text-left">
              <RevealOnScroll>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 mb-6 text-[11px] font-bold tracking-wider text-primary bg-white dark:bg-surface-dark border border-primary/10 rounded-full uppercase shadow-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
                  Distribución Farmacéutica Integral
                </span>
                <h1 className="font-display text-[2.5rem] md:text-5xl lg:text-6xl font-bold leading-[1.1] mb-6 text-secondary dark:text-white tracking-tight">
                  Su aliado <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-rose-600">tecnológico</span> y logístico en salud.
                </h1>
                <p className="text-text-muted-light dark:text-text-muted-dark text-lg md:text-xl mb-10 leading-relaxed font-medium max-w-xl mx-auto md:mx-0">
                  Simplificamos la complejidad regulatoria y logística para farmacias y clínicas. Tecnología punta para su tranquilidad.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-10 text-left">
                  <div className="flex sm:flex-col items-center sm:items-start gap-3 p-3 rounded-xl hover:bg-white/60 dark:hover:bg-white/5 transition-colors">
                    <div className="bg-white dark:bg-surface-dark p-2.5 rounded-xl shadow-sm text-primary ring-1 ring-gray-100 dark:ring-gray-700">
                      <span className="material-symbols-outlined filled">inventory_2</span>
                    </div>
                    <div>
                      <h3 className="font-bold text-[15px] text-secondary dark:text-white leading-tight mb-0.5">Gestión FEFO</h3>
                      <p className="text-sm text-text-muted-light dark:text-text-muted-dark leading-snug">Reduzca mermas con IA.</p>
                    </div>
                  </div>
                  <div className="flex sm:flex-col items-center sm:items-start gap-3 p-3 rounded-xl hover:bg-white/60 dark:hover:bg-white/5 transition-colors">
                    <div className="bg-white dark:bg-surface-dark p-2.5 rounded-xl shadow-sm text-primary ring-1 ring-gray-100 dark:ring-gray-700">
                      <span className="material-symbols-outlined filled">verified_user</span>
                    </div>
                    <div>
                      <h3 className="font-bold text-[15px] text-secondary dark:text-white leading-tight mb-0.5">Cumplimiento</h3>
                      <p className="text-sm text-text-muted-light dark:text-text-muted-dark leading-snug">NOM-059 Garantizada.</p>
                    </div>
                  </div>
                  <div className="flex sm:flex-col items-center sm:items-start gap-3 p-3 rounded-xl hover:bg-white/60 dark:hover:bg-white/5 transition-colors">
                    <div className="bg-white dark:bg-surface-dark p-2.5 rounded-xl shadow-sm text-primary ring-1 ring-gray-100 dark:ring-gray-700">
                      <span className="material-symbols-outlined filled">local_shipping</span>
                    </div>
                    <div>
                      <h3 className="font-bold text-[15px] text-secondary dark:text-white leading-tight mb-0.5">Entregas 24/7</h3>
                      <p className="text-sm text-text-muted-light dark:text-text-muted-dark leading-snug">Rastreo en tiempo real.</p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                  <button
                    onClick={() => setIsChatOpen(true)}
                    className="bg-accent-gradient hover:shadow-lg hover:shadow-primary/40 text-white font-bold py-4 px-8 rounded-xl shadow-md shadow-primary/20 transition-all transform hover:-translate-y-0.5 active:scale-[0.98] flex items-center justify-center gap-2 text-lg"
                  >
                    Solicitar demostración
                    <span className="material-symbols-outlined text-xl">arrow_forward</span>
                  </button>
                  <a className="group flex items-center justify-center gap-1 text-center text-sm font-semibold text-secondary/70 dark:text-text-muted-dark hover:text-primary transition-colors py-2 px-4" href="#logistica">
                    Conoce cómo operamos
                    <span className="material-symbols-outlined text-lg group-hover:translate-y-0.5 transition-transform">expand_more</span>
                  </a>
                </div>
              </RevealOnScroll>
            </div>

            <div className="mt-8 md:mt-0 relative h-64 md:h-[500px] w-full rounded-2xl md:rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white dark:border-gray-700 group">
              <RevealOnScroll delay={200} className="h-full">
                <img alt="Distribución y logística de medicamentos profesional" className="object-cover w-full h-full transform transition-transform duration-700 group-hover:scale-105" src="/images/hero_image.png" />
                <div className="absolute inset-0 bg-gradient-to-t from-secondary/90 via-secondary/20 to-transparent">
                  <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
                    <div className="flex gap-1.5">
                      <div className="h-2 w-12 bg-primary rounded-full shadow-lg shadow-primary/50"></div>
                      <div className="h-2 w-4 bg-white/60 rounded-full backdrop-blur-sm"></div>
                    </div>
                  </div>
                </div>
              </RevealOnScroll>
            </div>
          </div>
        </section>

        <section id="soluciones" className="py-20 px-6 bg-white dark:bg-surface-dark border-y border-gray-100 dark:border-gray-800">
          <div className="max-w-7xl mx-auto">
            <RevealOnScroll className="text-center mb-16">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-blue-50 dark:bg-blue-900/20 text-secondary dark:text-blue-300 mb-4">
                <span className="material-symbols-outlined text-3xl filled">shield</span>
              </div>
              <h2 className="font-display text-3xl font-bold text-secondary dark:text-white mb-3">Confianza y Cumplimiento</h2>
              <p className="text-text-muted-light dark:text-text-muted-dark max-w-2xl mx-auto text-lg leading-relaxed">Operación legal y segura bajo los más estrictos estándares internacionales y normativas locales.</p>
            </RevealOnScroll>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <RevealOnScroll delay={0} className="h-full">
                <div className="h-full group bg-background-light dark:bg-background-dark p-8 rounded-2xl border border-gray-100 dark:border-gray-700 hover:border-primary/20 transition-all hover:shadow-lg hover:shadow-gray-200/50 dark:hover:shadow-none">
                  <div className="flex flex-col items-start gap-4">
                    <span className="material-symbols-outlined text-primary text-4xl mt-0.5">gavel</span>
                    <div>
                      <h3 className="font-bold text-secondary dark:text-white text-xl mb-2 group-hover:text-primary transition-colors">Normativa COFEPRIS</h3>
                      <p className="text-base text-text-muted-light dark:text-text-muted-dark leading-relaxed">Cumplimiento estricto de NOM-059 y validación automática de licencias sanitarias.</p>
                    </div>
                  </div>
                </div>
              </RevealOnScroll>
              <RevealOnScroll delay={150} className="h-full">
                <div className="h-full group bg-background-light dark:bg-background-dark p-8 rounded-2xl border border-gray-100 dark:border-gray-700 hover:border-primary/20 transition-all hover:shadow-lg hover:shadow-gray-200/50 dark:hover:shadow-none">
                  <div className="flex flex-col items-start gap-4">
                    <span className="material-symbols-outlined text-primary text-4xl mt-0.5">fact_check</span>
                    <div>
                      <h3 className="font-bold text-secondary dark:text-white text-xl mb-2 group-hover:text-primary transition-colors">Trazabilidad ALCOA+</h3>
                      <p className="text-base text-text-muted-light dark:text-text-muted-dark leading-relaxed">Sistema digital con audit trails completos para su tranquilidad en cualquier auditoría.</p>
                    </div>
                  </div>
                </div>
              </RevealOnScroll>
              <RevealOnScroll delay={300} className="h-full">
                <div className="h-full group bg-background-light dark:bg-background-dark p-8 rounded-2xl border border-gray-100 dark:border-gray-700 hover:border-primary/20 transition-all hover:shadow-lg hover:shadow-gray-200/50 dark:hover:shadow-none">
                  <div className="flex flex-col items-start gap-4">
                    <span className="material-symbols-outlined text-primary text-4xl mt-0.5">medical_services</span>
                    <div>
                      <h3 className="font-bold text-secondary dark:text-white text-xl mb-2 group-hover:text-primary transition-colors">Buenas Prácticas (GDP)</h3>
                      <p className="text-base text-text-muted-light dark:text-text-muted-dark leading-relaxed">Integridad del medicamento garantizada desde nuestro almacén hasta su farmacia.</p>
                    </div>
                  </div>
                </div>
              </RevealOnScroll>
            </div>

            <div className="flex justify-center">
              <RevealOnScroll delay={400}>
                <button className="bg-white dark:bg-surface-dark border-2 border-gray-200 dark:border-gray-600 text-secondary dark:text-white font-bold py-3.5 px-8 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-gray-300 transition-all text-sm flex justify-center items-center gap-2.5">
                  <span className="material-symbols-outlined text-[20px]">description</span>
                  Descargar ficha de cumplimiento
                </button>
              </RevealOnScroll>
            </div>
          </div>
        </section>

        <section className="py-20 px-6 relative overflow-hidden bg-section-gradient" id="logistica">
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)", backgroundSize: "24px 24px" }}></div>
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full blur-[100px] pointer-events-none"></div>

          <div className="max-w-7xl mx-auto relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <RevealOnScroll>
                  <div className="mb-10 text-left">
                    <h2 className="font-display text-4xl font-bold text-white mb-4">Logística de Precisión</h2>
                    <p className="text-blue-100/80 text-lg leading-relaxed max-w-md">Tecnología aplicada para cero errores, control total y máxima frescura en cada entrega.</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
                    <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/10 shadow-xl">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-white/10 rounded-lg">
                          <span className="material-symbols-outlined text-white">devices</span>
                        </div>
                        <h3 className="font-bold text-lg text-white">Plataforma Digital</h3>
                      </div>
                      <ul className="text-sm space-y-3 text-blue-50/90">
                        <li className="flex items-center gap-3">
                          <span className="w-2 h-2 bg-green-400 rounded-full shadow-[0_0_8px_rgba(74,222,128,0.6)]"></span>
                          Pedidos inteligentes 24/7
                        </li>
                        <li className="flex items-center gap-3">
                          <span className="w-2 h-2 bg-green-400 rounded-full shadow-[0_0_8px_rgba(74,222,128,0.6)]"></span>
                          Stock visible en tiempo real
                        </li>
                        <li className="flex items-center gap-3">
                          <span className="w-2 h-2 bg-green-400 rounded-full shadow-[0_0_8px_rgba(74,222,128,0.6)]"></span>
                          Power BI integrado
                        </li>
                      </ul>
                    </div>
                    <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/10 shadow-xl">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-white/10 rounded-lg">
                          <span className="material-symbols-outlined text-blue-300">ac_unit</span>
                        </div>
                        <h3 className="font-bold text-lg text-white">Red de Frío IoT</h3>
                      </div>
                      <div className="flex gap-2 mb-4">
                        <span className="text-[11px] font-bold bg-blue-500/20 border border-blue-400/30 text-blue-200 px-2.5 py-1 rounded-md">2-8 °C</span>
                        <span className="text-[11px] font-bold bg-blue-500/20 border border-blue-400/30 text-blue-200 px-2.5 py-1 rounded-md">-15 a -25 °C</span>
                      </div>
                      <p className="text-sm text-blue-50/80 leading-relaxed">Monitoreo constante con sensores IoT y alertas automáticas.</p>
                    </div>
                  </div>

                  <button
                    onClick={() => setIsChatOpen(true)}
                    className="w-full sm:w-auto bg-white text-secondary font-extrabold py-4 px-8 rounded-xl hover:bg-gray-100 transition-colors flex items-center justify-center gap-2 shadow-lg shadow-black/20 group"
                  >
                    Explora nuestra plataforma
                    <span className="material-symbols-outlined text-lg group-hover:translate-x-1 transition-transform">arrow_outward</span>
                  </button>
                </RevealOnScroll>
              </div>

              <div className="hidden lg:block h-full min-h-[500px]">
                <RevealOnScroll delay={200} className="h-full">
                  <div className="h-full rounded-3xl overflow-hidden shadow-2xl border border-white/10 relative z-0 bg-white p-4 group">
                    <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/5 pointer-events-none z-10"></div>
                    <img
                      src={mapImage}
                      alt="Mapa de Cobertura Nacional de Salin"
                      className="w-full h-full object-contain transform group-hover:scale-105 transition-transform duration-700"
                    />

                    {/* Decorative Overlay Badge */}
                    <div className="absolute bottom-6 left-6 z-20 bg-white/90 backdrop-blur-sm p-4 rounded-xl shadow-lg border border-gray-100 max-w-xs">
                      <div className="flex items-center gap-3 mb-1">
                        <div className="w-3 h-3 rounded-full bg-secondary animate-pulse"></div>
                        <p className="font-bold text-gray-900 text-sm">Cobertura Total</p>
                      </div>
                      <p className="text-xs text-gray-500">Llegamos a cada rincón de México con nuestra red logística optimizada.</p>
                    </div>
                  </div>
                </RevealOnScroll>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 px-6 bg-orange-50/40 dark:bg-surface-dark border-b border-gray-200 dark:border-gray-800">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="order-2 lg:order-1">
                <RevealOnScroll className="grid grid-cols-1 gap-4">
                  <div className="flex gap-4 p-6 bg-white dark:bg-background-dark rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow">
                    <div className="bg-primary/10 p-3 h-12 w-12 rounded-xl flex items-center justify-center text-primary shrink-0">
                      <span className="material-symbols-outlined text-2xl">support_agent</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-secondary dark:text-white text-lg mb-1">Ejecutivos Dedicados</h4>
                      <p className="text-sm text-text-muted-light dark:text-text-muted-dark leading-relaxed">Atención personalizada y resolución rápida para su farmacia.</p>
                    </div>
                  </div>
                  <div className="flex gap-4 p-6 bg-white dark:bg-background-dark rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow">
                    <div className="bg-primary/10 p-3 h-12 w-12 rounded-xl flex items-center justify-center text-primary shrink-0">
                      <span className="material-symbols-outlined text-2xl">trending_up</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-secondary dark:text-white text-lg mb-1">Reportes de Tendencias</h4>
                      <p className="text-sm text-text-muted-light dark:text-text-muted-dark leading-relaxed">Información de rotación para mejores decisiones de compra.</p>
                    </div>
                  </div>
                  <div className="flex gap-4 p-6 bg-white dark:bg-background-dark rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow">
                    <div className="bg-primary/10 p-3 h-12 w-12 rounded-xl flex items-center justify-center text-primary shrink-0">
                      <span className="material-symbols-outlined text-2xl">published_with_changes</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-secondary dark:text-white text-lg mb-1">Devoluciones Ágiles</h4>
                      <p className="text-sm text-text-muted-light dark:text-text-muted-dark leading-relaxed">Políticas claras y relaciones sin fricción comercial.</p>
                    </div>
                  </div>
                </RevealOnScroll>
              </div>

              <div className="order-1 lg:order-2 text-center lg:text-left">
                <RevealOnScroll delay={200}>
                  <div className="flex items-center justify-center lg:justify-start gap-4 mb-6">
                    <h2 className="font-display text-4xl font-bold text-secondary dark:text-white leading-tight">Un socio para <br />su crecimiento</h2>
                    <div className="h-20 w-20 rounded-full overflow-hidden border-2 border-white dark:border-gray-600 shadow-md ring-2 ring-primary/10 shrink-0">
                      <img alt="Asesora Salin" className="object-cover w-full h-full" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDznBZ-RVshjs7wiU5jaKlKpEB0H3AYDe3-9HYIN6ur2gyLZ7JVjDezOC_B4pchGPz_AsdnVfX8Cxk9DQUplgfLzVk0_AfEm7Bclmya7qt0I5I5fOp8izirU8meWxvwukSI891ep3x4__KXaUP-mQSiQxZe3b4CT5ouOaXO58EUfBJ3JL2PbVQnBBJhI1ytaxEjFBK9SUfv2fG6uF9XtCRbjuXWNUtHo0aDCYbedw3sP1gkzheQ2caMVRHrJnWCUIOOIsPJmsF2J_q_" />
                    </div>
                  </div>
                  <p className="text-text-muted-light dark:text-text-muted-dark text-lg mb-8 leading-relaxed">
                    Más que un proveedor, somos una extensión de su equipo. Entendemos que su éxito depende de tener el producto correcto en el momento exacto.
                  </p>
                  <button
                    onClick={() => setIsChatOpen(true)}
                    className="w-full sm:w-auto text-primary dark:text-red-400 font-bold py-4 px-8 border-2 border-primary/20 dark:border-red-400/30 rounded-xl hover:bg-primary/5 dark:hover:bg-primary/10 transition-colors text-lg"
                  >
                    Hazte cliente de Salin
                  </button>
                </RevealOnScroll>
              </div>
            </div>
          </div>
        </section>

        <section id="contacto" className="py-20 px-6 bg-background-light dark:bg-background-dark">
          <div className="max-w-4xl mx-auto">
            <RevealOnScroll>
              <h2 className="font-display text-3xl font-bold text-secondary dark:text-white mb-10 text-center">Inicie su colaboración hoy</h2>
              <div className="bg-white dark:bg-surface-dark p-8 md:p-12 rounded-3xl shadow-xl shadow-gray-200/50 dark:shadow-none border border-gray-100 dark:border-gray-700">
                <form className="space-y-6" onSubmit={handleSubmit}>
                  {showSuccessMessage && (
                    <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl flex items-center gap-3 animate-fade-in text-left">
                      <div className="bg-green-100 dark:bg-green-900/40 p-2 rounded-full text-green-600 dark:text-green-400">
                        <span className="material-symbols-outlined text-xl">check</span>
                      </div>
                      <div>
                        <h4 className="font-bold text-green-800 dark:text-green-300 text-sm">¡Mensaje enviado con éxito!</h4>
                        <p className="text-green-700 dark:text-green-400 text-xs">Un ejecutivo especialista se pondrá en contacto con usted brevemente.</p>
                      </div>
                    </div>
                  )}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-bold text-text-muted-light dark:text-text-muted-dark mb-2 uppercase tracking-wider" htmlFor="name">Nombre Completo</label>
                      <input
                        className="w-full bg-gray-50 dark:bg-background-dark border border-gray-200 dark:border-gray-600 rounded-xl px-4 py-4 text-secondary dark:text-white text-base focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-shadow"
                        id="name"
                        placeholder="Ej. Dr. Juan Pérez"
                        type="text"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-text-muted-light dark:text-text-muted-dark mb-2 uppercase tracking-wider" htmlFor="establishment">Establecimiento</label>
                      <input
                        className="w-full bg-gray-50 dark:bg-background-dark border border-gray-200 dark:border-gray-600 rounded-xl px-4 py-4 text-secondary dark:text-white text-base focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-shadow"
                        id="establishment"
                        placeholder="Ej. Farmacia Central"
                        type="text"
                        value={formData.establishment}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-bold text-text-muted-light dark:text-text-muted-dark mb-2 uppercase tracking-wider" htmlFor="email">Email</label>
                      <input
                        className="w-full bg-gray-50 dark:bg-background-dark border border-gray-200 dark:border-gray-600 rounded-xl px-4 py-4 text-secondary dark:text-white text-base focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-shadow"
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-text-muted-light dark:text-text-muted-dark mb-2 uppercase tracking-wider" htmlFor="phone">Teléfono</label>
                      <input
                        className="w-full bg-gray-50 dark:bg-background-dark border border-gray-200 dark:border-gray-600 rounded-xl px-4 py-4 text-secondary dark:text-white text-base focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-shadow"
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full bg-secondary hover:bg-opacity-90 text-white font-bold py-5 px-6 rounded-xl shadow-lg transition-transform transform active:scale-[0.98] mt-4 text-lg flex justify-center items-center gap-2 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        Enviando...
                      </>
                    ) : (
                      'Enviar solicitud'
                    )}
                  </button>
                </form>
                <div className="mt-10 pt-8 border-t border-gray-100 dark:border-gray-700 flex flex-col sm:flex-row justify-center items-center gap-8">
                  <a className="flex items-center gap-2 text-text-muted-light dark:text-text-muted-dark hover:text-primary transition-colors text-base font-semibold" href="tel:01800SALINMX">
                    <span className="material-symbols-outlined text-2xl">phone</span>
                    01 800 SALIN MX
                  </a>
                  <a className="flex items-center gap-2 text-text-muted-light dark:text-text-muted-dark hover:text-primary transition-colors text-base font-semibold" href="mailto:contacto@salin.com.mx">
                    <span className="material-symbols-outlined text-2xl">email</span>
                    contacto@salin.com.mx
                  </a>
                </div>
              </div>
            </RevealOnScroll>
          </div>
        </section>

        <footer className="text-center py-12 px-4 border-t border-gray-100 dark:border-gray-800 bg-white dark:bg-background-dark">
          <div className="flex justify-center gap-2 items-center mb-6 opacity-80 hover:opacity-100 transition-opacity">
            <div className="relative h-6 w-auto">
              <svg className="h-full w-auto" fill="none" viewBox="0 0 32 48" xmlns="http://www.w3.org/2000/svg">
                <path d="M16 24C7.16344 24 0 16.8366 0 8C0 3.58172 3.58172 0 8 0H16C24.8366 0 32 7.16344 32 16C32 20.4183 28.4183 24 24 24H16Z" fill="#EB3E50"></path>
                <path d="M16 24C24.8366 24 32 31.1634 32 40C32 44.4183 28.4183 48 24 48H16C7.16344 48 0 40.8366 0 32C0 27.5817 3.58172 24 8 24H16Z" fill="#0C2A4D"></path>
              </svg>
            </div>
            <span className="font-display font-bold text-xl text-secondary dark:text-white tracking-tight">salin</span>
          </div>
          <div className="flex flex-wrap justify-center gap-8 mb-8 text-sm text-text-muted-light dark:text-text-muted-dark">
            <a href="#" className="hover:text-primary">Avisos de Privacidad</a>
            <a href="#" className="hover:text-primary">Términos y Condiciones</a>
            <a href="#" className="hover:text-primary">Mapa del Sitio</a>
          </div>
          <p className="text-xs text-text-muted-light dark:text-text-muted-dark">
            © 2023 Salin Distribuidora Farmacéutica. Todos los derechos reservados.
          </p>
        </footer>
      </main>

      {/* Floating Chat Widget */}
      <ChatWidget isOpen={isChatOpen} onToggle={toggleChat} />
    </>
  );
}

export default App;
