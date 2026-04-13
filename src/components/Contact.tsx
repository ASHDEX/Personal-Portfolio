export default function Contact() {
  return (
    <section id="contact" className="w-full py-20">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-bold mb-8 text-terminal-green">Contact</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h3 className="text-xl font-semibold mb-6 text-terminal-cyan">Get in Touch</h3>
            <p className="text-text-secondary mb-6">
              I'm always open to discussing new opportunities, interesting projects, or just chatting about technology.
            </p>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-terminal-green/10 flex items-center justify-center">
                  <span className="text-terminal-green">✉️</span>
                </div>
                <div>
                  <p className="text-text-secondary text-sm">Email</p>
                  <p className="text-terminal-cyan">hello@example.com</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-terminal-green/10 flex items-center justify-center">
                  <span className="text-terminal-green">💼</span>
                </div>
                <div>
                  <p className="text-text-secondary text-sm">LinkedIn</p>
                  <p className="text-terminal-cyan">linkedin.com/in/username</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-terminal-green/10 flex items-center justify-center">
                  <span className="text-terminal-green">🐙</span>
                </div>
                <div>
                  <p className="text-text-secondary text-sm">GitHub</p>
                  <p className="text-terminal-cyan">github.com/username</p>
                </div>
              </div>
            </div>
          </div>
          <div className="border border-terminal-green/20 p-6 rounded-lg bg-black/30">
            <h3 className="text-xl font-semibold mb-6 text-terminal-cyan">Send a Message</h3>
            <form className="space-y-4">
              <div>
                <label className="block text-text-secondary text-sm mb-2">Name</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 bg-black/50 border border-terminal-green/20 rounded focus:outline-none focus:border-terminal-green text-text-primary"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="block text-text-secondary text-sm mb-2">Email</label>
                <input
                  type="email"
                  className="w-full px-4 py-2 bg-black/50 border border-terminal-green/20 rounded focus:outline-none focus:border-terminal-green text-text-primary"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label className="block text-text-secondary text-sm mb-2">Message</label>
                <textarea
                  className="w-full px-4 py-2 bg-black/50 border border-terminal-green/20 rounded focus:outline-none focus:border-terminal-green text-text-primary h-32"
                  placeholder="Your message..."
                />
              </div>
              <button
                type="submit"
                className="px-6 py-3 bg-terminal-green text-black font-semibold rounded hover:bg-terminal-green/90 transition-colors"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}