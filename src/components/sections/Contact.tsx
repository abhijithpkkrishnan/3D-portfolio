import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Mail, Phone, Linkedin, Github, Send, MapPin, Sparkles, Heart } from 'lucide-react';
import { useState, useRef } from 'react';
import MagneticButton from '@/components/effects/MagneticButton';

const WEB3FORMS_ENDPOINT = 'https://api.web3forms.com/submit';

const Contact = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const formRef = useRef<HTMLFormElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 200 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const rotateX = useTransform(springY, [-100, 100], [5, -5]);
  const rotateY = useTransform(springX, [-100, 100], [-5, 5]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!formRef.current) return;
    const rect = formRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set(e.clientX - centerX);
    y.set(e.clientY - centerY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;
    if (!accessKey) {
      setSubmitStatus('error');
      setIsSubmitting(false);
      return;
    }

    try {
      const res = await fetch(WEB3FORMS_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: accessKey,
          from_name: formState.name,
          email: formState.email,
          message: formState.message,
          subject: `Portfolio Contact from ${formState.name}`,
        }),
      });
      const data = await res.json();

      if (data.success) {
        setSubmitStatus('success');
        setFormState({ name: '', email: '', message: '' });
      } else {
        setSubmitStatus('error');
      }
    } catch {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    { icon: Phone, label: "Phone", value: "+91 7594844227", href: "tel:+917594844227", color: "primary" },
    { icon: Mail, label: "Email", value: "abhijithpkkrishnan@gmail.com", href: "mailto:abhijithpkkrishnan@gmail.com", color: "secondary" },
    { icon: Linkedin, label: "LinkedIn", value: "Connect on LinkedIn", href: "https://www.linkedin.com/in/abhijith-pk-ba0848213/", color: "primary" },
    { icon: Github, label: "GitHub", value: "github.com/abhijithpkkrishnan", href: "https://github.com/abhijithpkkrishnan", color: "accent" },
  ];

  const inputVariants = {
    idle: { borderColor: 'hsl(200 80% 30%)' },
    focus: { 
      borderColor: 'hsl(180 100% 50%)',
      boxShadow: '0 0 20px hsl(180 100% 50% / 0.3)'
    }
  };

  return (
    <section id="contact" className="min-h-screen py-20 px-4 relative overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 glass-card mb-4"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <Sparkles className="w-4 h-4 text-accent animate-pulse" />
            <span className="text-sm font-display text-accent">Let's build something amazing</span>
          </motion.div>
          <motion.h2 
            className="text-sm font-display tracking-[0.3em] text-primary mb-4"
            initial={{ opacity: 0, letterSpacing: '0.5em' }}
            whileInView={{ opacity: 1, letterSpacing: '0.3em' }}
            viewport={{ once: true }}
          >
            GET IN TOUCH
          </motion.h2>
          <motion.h3 
            className="text-4xl md:text-5xl font-display font-bold glow-text"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 100 }}
          >
            Let's Connect
          </motion.h3>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="glass-card p-8 glow-border">
              <h4 className="text-xl font-display font-bold mb-6">Contact Information</h4>
              
              <div className="space-y-4">
                {contactInfo.map((item, index) => (
                  <MagneticButton key={item.label} strength={15}>
                    <motion.a
                      href={item.href}
                      target={item.href.startsWith('http') ? '_blank' : undefined}
                      rel="noopener noreferrer"
                      className="flex items-center gap-4 p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-all group relative overflow-hidden"
                      initial={{ opacity: 0, x: -30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.02 }}
                    >
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10"
                        initial={{ x: '-100%' }}
                        whileHover={{ x: '100%' }}
                        transition={{ duration: 0.6 }}
                      />
                      <motion.div 
                        className={`p-3 rounded-full bg-${item.color}/20 group-hover:bg-${item.color}/40 transition-colors relative z-10`}
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.5 }}
                      >
                        <item.icon className={`w-5 h-5 text-${item.color}`} />
                      </motion.div>
                      <div className="relative z-10">
                        <p className="text-xs text-muted-foreground uppercase tracking-wider">{item.label}</p>
                        <p className="text-foreground font-medium">{item.value}</p>
                      </div>
                    </motion.a>
                  </MagneticButton>
                ))}
              </div>
            </div>

            <motion.div
              className="glass-card p-6 border-secondary/30"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              whileHover={{ 
                scale: 1.02,
                boxShadow: '0 0 30px hsl(280 100% 60% / 0.3)'
              }}
            >
              <motion.div 
                className="flex items-center gap-3 text-secondary"
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <MapPin className="w-5 h-5" />
                <span className="font-display">Available for Remote & On-site Opportunities</span>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            style={{
              rotateX,
              rotateY,
              transformStyle: 'preserve-3d',
            }}
          >
            <motion.form 
              ref={formRef}
              onSubmit={handleSubmit} 
              className="glass-card p-8 glow-border space-y-6"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              <h4 className="text-xl font-display font-bold mb-6">Send a Message</h4>
              
              {[
                { name: 'name', label: 'Name', type: 'text', placeholder: 'Your name' },
                { name: 'email', label: 'Email', type: 'email', placeholder: 'your@email.com' },
              ].map((field, index) => (
                <motion.div
                  key={field.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <label className="block text-sm font-display text-muted-foreground mb-2">{field.label}</label>
                  <motion.input
                    type={field.type}
                    value={formState[field.name as keyof typeof formState]}
                    onChange={(e) => setFormState({ ...formState, [field.name]: e.target.value })}
                    onFocus={() => setFocusedField(field.name)}
                    onBlur={() => setFocusedField(null)}
                    required
                    className="w-full px-4 py-3 bg-muted/30 border border-border rounded-lg focus:border-primary focus:outline-none transition-all font-body"
                    placeholder={field.placeholder}
                    variants={inputVariants}
                    animate={focusedField === field.name ? 'focus' : 'idle'}
                  />
                </motion.div>
              ))}
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                <label className="block text-sm font-display text-muted-foreground mb-2">Message</label>
                <motion.textarea
                  value={formState.message}
                  onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                  onFocus={() => setFocusedField('message')}
                  onBlur={() => setFocusedField(null)}
                  required
                  rows={5}
                  className="w-full px-4 py-3 bg-muted/30 border border-border rounded-lg focus:border-primary focus:outline-none transition-all resize-none font-body"
                  placeholder="Tell me about your project or opportunity..."
                  variants={inputVariants}
                  animate={focusedField === 'message' ? 'focus' : 'idle'}
                />
              </motion.div>

              <MagneticButton className="w-full" strength={10}>
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-primary text-primary-foreground font-display font-bold rounded-lg flex items-center justify-center gap-2 hover:bg-primary/90 transition-all disabled:opacity-50 relative overflow-hidden"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: '100%' }}
                    transition={{ duration: 0.6 }}
                  />
                  {isSubmitting ? (
                    <motion.div 
                      className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    />
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Send Message
                    </>
                  )}
                </motion.button>
              </MagneticButton>
              {submitStatus === 'success' && (
                <motion.p
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-sm text-primary text-center"
                >
                  Message sent! I&apos;ll get back to you soon.
                </motion.p>
              )}
              {submitStatus === 'error' && (
                <motion.p
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-sm text-destructive text-center"
                >
                  Failed to send. Check your connection or try again later.
                </motion.p>
              )}
            </motion.form>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <motion.footer
        className="mt-20 text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <motion.div 
          className="cyber-line mb-8"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        />
        <motion.p 
          className="text-muted-foreground font-body flex items-center justify-center gap-2"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          © {new Date().getFullYear()} <span className="text-primary font-display">Abhijith P K</span>
          <motion.span
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          >
            <Heart className="w-4 h-4 text-destructive inline" />
          </motion.span>
          All rights reserved.
        </motion.p>
        <motion.p 
          className="text-xs text-muted-foreground/50 mt-2"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          Crafted with passion using React & Three.js
        </motion.p>
      </motion.footer>
    </section>
  );
};

export default Contact;