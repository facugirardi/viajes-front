import React from 'react';

const Footer = () => {
    return (
        <footer id="footer">
        <div className="footer-top">
          <div className="container">
            <div className="row">
  
              <div className="col-lg-4 col-md-4 footer-contact">
                <p className="text-center">
                <a href="/" className="logo"><img src="/assets/images/logo.png" alt="" className="img-fluid"/></a><br /><br />
                  GALERIA VIA DE LA FONTANA - LOCAL 14 <br />
                  CÓRDOBA - ARGENTINA<br /><br />
                  (+54) 351-393-4673<br />
                  ADRIYORNET@GMAIL.COM<br />
                </p>
              </div>
  
              <div className="col-lg-4 col-md-4 footer-links">
                <h4 className="text-center">NAVEGACIÓN</h4>
                <ul className="text-center">
                  <li><a href="/">INICIO</a></li>
                  <li><a href="/destinos">DESTINOS</a></li>
                  <li><a href="/nosotros">NOSOTROS</a></li>
                  <li><a href="/contacto">CONTACTO</a></li>
                  <li><a href="/login">LOGIN</a></li>
                </ul>
              </div>
  
              <div className="col-lg-4 col-md-4 footer-links">
                <h4 className="text-center">REDES SOCIALES</h4>
                <div className="social-links text-center  pt-3 pt-md-0">
                  <a href="https://www.facebook.com/vayapasajesyturismo" target='_blank' className="facebook">
                    <svg width="43" height="41" viewBox="0 0 43 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M29.8307 3.34961H12.2832C7.43762 3.34961 3.50949 7.09892 3.50949 11.7239V28.4726C3.50949 33.0976 7.43762 36.8469 12.2832 36.8469H29.8307C34.6762 36.8469 38.6044 33.0976 38.6044 28.4726V11.7239C38.6044 7.09892 34.6762 3.34961 29.8307 3.34961Z" stroke="#3C3C50" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                      <path d="M28.0759 19.0434C28.2925 20.4373 28.043 21.8609 27.3631 23.1117C26.6831 24.3625 25.6072 25.3768 24.2885 26.0103C22.9698 26.6439 21.4753 26.8644 20.0177 26.6405C18.5601 26.4166 17.2136 25.7598 16.1697 24.7634C15.1257 23.7669 14.4376 22.4817 14.203 21.0905C13.9685 19.6992 14.1995 18.2728 14.8633 17.0141C15.527 15.7554 16.5897 14.7285 17.9001 14.0795C19.2106 13.4305 20.702 13.1924 22.1624 13.3991C23.6521 13.61 25.0312 14.2725 26.096 15.2889C27.1609 16.3053 27.855 17.6216 28.0759 19.0434Z" stroke="#3C3C50" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                      <path d="M30.708 10.8867H30.7252" stroke="#3C3C50" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>                  
                  </a>
                  <a href="https://www.instagram.com/vayaturismo" target='_blank' className="instagram">
                    <svg width="43" height="39" viewBox="0 0 43 39" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M31.6844 3.20703H26.4202C24.0932 3.20703 21.8616 4.05178 20.2162 5.55544C18.5708 7.0591 17.6464 9.09851 17.6464 11.225V16.0358H12.3822V22.4502H17.6464V35.2789H24.6654V22.4502H29.9296L31.6844 16.0358H24.6654V11.225C24.6654 10.7997 24.8503 10.3918 25.1794 10.0911C25.5084 9.79036 25.9548 9.62141 26.4202 9.62141H31.6844V3.20703Z" stroke="#3C3C50" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>                  
                  </a>
                  <a href="mailto:adriyornet@gmail.com" target='_blank' className="linkedin">
                    <svg width="42" height="38" viewBox="0 0 42 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect width="42" height="37.2376" transform="translate(0 0.427246)" fill="white"/>
                      <path d="M7 6.6333H35C36.925 6.6333 38.5 8.02971 38.5 9.73643V28.3552C38.5 30.0619 36.925 31.4583 35 31.4583H7C5.075 31.4583 3.5 30.0619 3.5 28.3552V9.73643C3.5 8.02971 5.075 6.6333 7 6.6333Z" fill="white" stroke="#3C3C50" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                      <path d="M38.5 9.73682L21 20.5978L3.5 9.73682" fill="white"/>
                      <path d="M38.5 9.73682L21 20.5978L3.5 9.73682" stroke="#3C3C50" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>                  
                  </a>
                </div>
              </div>

            </div>
          </div>
          <hr style={{width:'60%', textAlign: 'center', marginLeft: 'auto', marginRight:'auto', color:'#968778', borderWidth: '2px'}} />
          <p className="text-center">Vaya Pasajes y Turismo | Desarrollado por Developers</p>
        </div>
  
        </footer>  
    );
};

export default Footer;