import React, { useState } from 'react';
import './Contact.css';

function Contact() {
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false); // Add loading state

  const handleClick = async () => {
    setLoading(true); // Set loading to true when the request starts
    try {
      const response = await fetch('http://localhost:5000/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, phoneNumber, email, message }), 
      });

      if (!response.ok) {
        throw new Error('Failed to send email');
      }

      alert('Your message has been sent!');
    } catch (error) {
      console.error('Error sending email:', error);
      alert('Failed to send email. Please try again later.');
    } finally {
      setLoading(false); // Set loading to false once the request is complete
    }
  };

  return (
    <div style={{ backgroundColor: '#f0f0f0' }}>
      <section className="contact_us">
        <div className="container">
          <div className="row">
            <div className="col-md-10 offset-md-1">
              <div className="contact_inner">
                <div className="row">
                  <div className="col-md-10">
                    <div className="contact_form_inner">
                      <div className="contact_field">
                        <h3>Contact Us</h3>
                        <p>Feel free to contact us any time. We will get back to you as soon as we can!</p>
                        <input
                          type="text"
                          id="name"
                          className="form-control form-group"
                          placeholder="Name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                        />
                        <input
                          type="tel"
                          id="phoneNumber"
                          className="form-control form-group"
                          placeholder="Phone Number"
                          value={phoneNumber}
                          onChange={(e) => setPhoneNumber(e.target.value)}
                        />
                        <input
                          type="email"
                          id="email"
                          className="form-control form-group"
                          placeholder="Your Email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                        <textarea
                          id="message"
                          className="form-control form-group"
                          placeholder="Message"
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                        ></textarea>
                        <button
                          className="contact_form_submit"
                          onClick={handleClick}
                          disabled={loading} // Disable button while loading
                        >
                          {loading ? 'Sending...' : 'Send'} {/* Show 'Sending...' when loading */}
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-2">
                    <div className="right_conatct_social_icon d-flex align-items-end">
                      <div className="socil_item_inner d-flex"></div>
                    </div>
                  </div>
                </div>
                <div className="contact_info_sec">
                  <h4>Contact Info</h4>
                  <div className="d-flex info_single align-items-center">
                    <i className="fas fa-headset"></i>
                    <span>+91 94935 72522</span>
                  </div>
                  <div className="d-flex info_single align-items-center">
                    <i className="fas fa-envelope-open-text"></i>
                    <span>info@gangaramfunctionhall.com</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="map_sec">
        <div className="container">
          <div className="row">
            <div className="col-md-10 offset-md-1">
              <div className="map_inner">
                <h4>Find Us on Google Map</h4>
                <div className="map_bind">
                  <iframe
                    title="Gangaram Function Hall Map"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3877.0969310028804!2d79.4532892750884!3d13.651867286729658!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a4d4a30fafb083f%3A0x25683657ab58e486!2sGangaram%20Function%20Hall!5e0!3m2!1sen!2sin!4v1717404119636!5m2!1sen!2sin"
                    width="100%"
                    height="450"
                    style={{ border: 0 }}
                    allowFullScreen={true}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Contact;
