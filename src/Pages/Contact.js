import React from 'react';
import './Contact.css';
function Contact() {
    const handleClick = () => {
        const name = document.getElementById('name').value;
        
        const phoneNumber = document.getElementById('phoneNumber').value;
        const message = document.getElementById('message').value;
    
        console.log('Name:', name);
       
        console.log('Phone Number:', phoneNumber);
        console.log('Message:', message);
    
        alert('Your message has been sent!');
      };
  return (
    <div style={{backgroundColor:'#f0f0f0'}}>
    <section class="contact_us">
    <div class="container">
        <div class="row">
            <div class="col-md-10 offset-md-1">
                <div class="contact_inner">
                    <div class="row">
                        <div class="col-md-10">
                            <div class="contact_form_inner">
                                <div class="contact_field">
                                    <h3>ContactUs</h3>
                                    <p>Feel Free to contact us any time. We will get back to you as soon as we can!.</p>
                                    <input type="text" id="name" class="form-control form-group" placeholder="Name" />
                                    
                                    <input type="tel" id="phoneNumber" class="form-control form-group" placeholder="phone number" />
                                    <textarea id="message" class="form-control form-group" placeholder="Message"></textarea>
                                    <button class="contact_form_submit" onClick={handleClick} >Send</button>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-2">
                            <div class="right_conatct_social_icon d-flex align-items-end">
                                <div class="socil_item_inner d-flex">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="contact_info_sec">
                        <h4>Contact Info</h4>
                        <div class="d-flex info_single align-items-center">
                            <i class="fas fa-headset"></i>
                            <span>+91 94935 72522</span>
                        </div>
                        <div class="d-flex info_single align-items-center">
                            <i class="fas fa-envelope-open-text"></i>
                            <span>info@gangaramfunctionhall.com</span>
                        </div>
                
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<section class="map_sec">
    <div class="container">
        <div class="row">
            <div class="col-md-10 offset-md-1">
                <div class="map_inner">
                    <h4>Find Us on Google Map</h4>
       
                    <div class="map_bind">
                    
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
