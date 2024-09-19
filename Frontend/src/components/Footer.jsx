import React from 'react';
import Skyline from '../assets/Skyline.svg'; 
import GooglePlay from '../assets/GooglePlay.svg';  
import AppStore from '../assets/AppStore.svg';  


    
function Footer() {
  return (
    <>
    <div className="h-[20px w-[10px flex justify-center items-center">
      <img src={Skyline} alt="Skyline" className="w-25 h-25 object-cover" />
    </div>
    <footer className="bg-green text-white">


        {/* Footer Content */}
        <div className="container mx-auto px-4 py-2">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* About us Column */}
            <div>
              <h5 className="font-bold text-lg mb-3 text-hover-green">About us</h5>
              <ul>
                <li><a href="/about">About 9ja Market</a></li>
                <li><a href="/terms">Terms & Conditions</a></li>
                <li><a href="/privacy">Privacy Policy</a></li>
                <li><a href="/billing">Billing Policy</a></li>
                <li><a href="/cookies">Cookie Policy</a></li>
                <li><a href="/copyright">Copyright</a></li>
                <li><a href="/infringement">Infringement Policy</a></li>
              </ul>
            </div>

            {/* Support Column */}
            <div>
              <h5 className="font-bold text-lg mb-3 text-hover-green">Support</h5>
              <ul>
                <li><a href="/safety-tips">Safety Tips</a></li>
                <li><a href="/contact">Contact Us</a></li>
                <li><a href="/faq">FAQ</a></li>
                <li><a href="/ads">Place Ads</a></li>
                <li><a href="/invest">Invest</a></li>
              </ul>
            </div>

            {/* Apps Column */}
            <div>
              <h5 className="font-bold text-lg mb-3 text-hover-green">Apps</h5>
              <div className="flex">
                <a href="/playstore" className="mr-2">
                  <img src={GooglePlay} alt="Download on Google Play" />
                </a>
                <h5 className="font-bold text-xl mb-3 ">Download on the <br /> Playstore </h5>
                <a href="/appstore">
                  <img src={AppStore} alt="Download on App Store" />
                  <h5 className="font-bold text-xl mb-3 ">Get it on the <br />Appstore </h5>
                </a>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="text-center mt-5">
            © 2024 9jamarkets.com
          </div>
        </div>
      </footer></>
  );
}

export default Footer;
