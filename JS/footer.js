export function createFooter(target = document.body) {
    const footerHTML = `
    <footer class="footer-section">
      <div class="footer-container">
        <div class="footer-grid">
          <!-- Column 1: Newsletter -->
          <div class="footer-col-1">
            <h2 class="footer-heading">Stay Connected</h2>
            <p class="footer-text">
              Join our newsletter for the latest updates and exclusive offers.
            </p>
            <form class="footer-form" onsubmit="event.preventDefault(); alert('Thank you for subscribing!');">
              <input
                type="email"
                placeholder="Enter your email"
                class="footer-input"
                required
              />
              <button type="submit" class="footer-submit-btn" aria-label="Subscribe">
                <i class="fas fa-paper-plane"></i>
              </button>
            </form>
            <div class="footer-blur-blob"></div>
          </div>
          
          <!-- Column 2: Quick Links -->
          <div>
            <h3 class="footer-heading">Quick Links</h3>
            <nav class="footer-nav">
              <a href="index.html#home">Home</a>
              <a href="about.html">About Us</a>
              <a href="index.html#services">Services</a>
              <a href="category.html">Products</a>
              <a href="index.html#contact">Contact</a>
            </nav>
          </div>
          
          <!-- Column 3: Contact Us -->
          <div>
            <h3 class="footer-heading">Contact Us</h3>
            <address class="footer-text" style="font-style: normal;">
              <p>Ait Iazza</p>
              <p>Taroudant, Morocco</p>
              <p>Phone: +212 715637340</p>
              <p>Email: contact@sherif-auto.com</p>
            </address>
            <div class="footer-map-container">
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13779.0!2d-8.8!3d30.5!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzDCsDMwJzAwLjAiTiA4wrA0OCowMC4wIlc!5e0!3m2!1sen!2sma!4v1620000000000!5m2!1sen!2sma"
                    width="100%" 
                    height="100%" 
                    style="border:0;" 
                    allowfullscreen="" 
                    loading="lazy"
                    title="Sherif-Auto Location"
                ></iframe>
            </div>
          </div>
          
          <!-- Column 4: Follow Us & Theme -->
          <div>
            <h3 class="footer-heading">Follow Us</h3>
            <div class="footer-socials">
              <div class="tooltip-container">
                 <button class="social-btn" aria-label="Facebook" onclick="window.open('https://facebook.com', '_blank')">
                    <i class="fab fa-facebook-f"></i>
                 </button>
                 <span class="tooltip-text">Follow us on Facebook</span>
              </div>
              <div class="tooltip-container">
                 <button class="social-btn" aria-label="Instagram" onclick="window.open('https://instagram.com', '_blank')">
                    <i class="fab fa-instagram"></i>
                 </button>
                 <span class="tooltip-text">Follow us on Instagram</span>
              </div>
              <div class="tooltip-container">
                 <button class="social-btn" aria-label="Twitter" onclick="window.open('https://twitter.com', '_blank')">
                    <i class="fab fa-twitter"></i>
                 </button>
                 <span class="tooltip-text">Follow us on Twitter</span>
              </div>
            </div>
            

          </div>
        </div>
        
        <div class="footer-bottom">
          <p class="footer-text" style="margin:0;">
            © 2025 Sherif-Auto. All rights reserved.
          </p>
          <nav class="footer-bottom-nav">
            <a href="privacy-policy.html">Privacy Policy</a>
            <a href="terms-of-service.html">Terms of Service</a>
            <a href="#">Cookie Settings</a>
          </nav>
        </div>
      </div>
    </footer>
    `;
    
    // Create Temporary Container to parse HTML
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = footerHTML;
    const footerElement = tempDiv.firstElementChild;
    
    target.appendChild(footerElement);
    

}
