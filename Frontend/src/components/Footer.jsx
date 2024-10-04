

function Footer() {
  return (
    <>
    <footer className="bg-green text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
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

          {/* App Column */}
          <div>
            <h5 className="font-bold text-lg mb-3 text-hover-green">Apps</h5>
            <ul className="space-y-2">
              <li>
                <a href="https://www.apple.com/app-store/" target="_blank" rel="noopener noreferrer" className="block">
                  <img src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg" alt="Download on the App Store" className="h-12" />
                </a>
              </li>
              <li>
                <a href="https://play.google.com/store" target="_blank" rel="noopener noreferrer" className="block">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Get it on Google Play" className="h-12" />
                </a>
              </li>
            </ul>
          </div>
          {/* <FaInstagram size={30} /> */}
          {/* Socials Section */}
          {/* <div className="flex flex-col items-center mt-8"> */}
            {/* <h5 className="font-bold text-lg mb-3 text-hover-green">Socials</h5>
            <div className="flex space-x-4">
              <a className="text-green hover:text-insta">
               
              </a>
              <a  className="text-green hover:text-blue-600">
                <FaX size={30} />
              </a>
              <a  className="text-green hover:text-blue-600">
                <FaFacebook size={30} />
              </a>
              <a  className="text-green hover:text-blue-600">
                <FaLinkedin size={30} />
              </a>
            </div>
          </div> */}
        </div>

        {/* Copyright */}
        <div className="text-center mt-5">
          © 2024 9jamarkets.com
        </div>
      </div>
    </footer>
    </>
  );
}

export default Footer;
