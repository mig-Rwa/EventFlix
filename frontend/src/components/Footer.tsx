import Link from "next/link";

const Footer = () => (
  <footer className="bg-gray-100 border-t mt-12">
    <div className="max-w-7xl mx-auto px-4 py-10 flex flex-col md:flex-row md:justify-between gap-8">
      {/* Left: Logo and tagline */}
      <div className="flex-1 min-w-[220px]">
        <div className="flex items-center gap-2 mb-2">
          <img src="/images/favicon.png" alt="EventFlixCyprus Logo" className="h-8 w-8 inline-block mr-2 align-middle" />
            <span className="text-3xl font-extrabold text-orange-500 align-middle">EVENTFLIX</span>
        </div>
        <p className="text-gray-600 text-sm">We help event creators throw successful and profitable events</p>
      </div>
      {/* Columns */}
      <div className="flex-[2] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        <div>
          <h4 className="font-semibold mb-2">Our company</h4>
          <ul className="space-y-1 text-sm text-gray-600">
            <li><Link href="#">Our story</Link></li>
            <li><Link href="#">Our team</Link></li>
            <li><Link href="#">Solutions</Link></li>
            <li><Link href="#">Newsroom</Link></li>
            <li><Link href="#">Privacy policy</Link></li>
            <li><Link href="#">Contact us</Link></li>
            <li><Link href="#">Talk to sales</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-2">The difference</h4>
          <ul className="space-y-1 text-sm text-gray-600">
            <li><Link href="#">Eventbrite vs EventFlix</Link></li>
            <li><Link href="#">eTix vs EventFlix</Link></li>
            <li><Link href="#">Ambassador network</Link></li>
            <li><Link href="#">Daily payouts</Link></li>
            <li><Link href="#">Event mobile apps</Link></li>
            <li><Link href="#">Referral program</Link></li>
            <li><Link href="#">$20,000 Guarantee</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-2">Resources</h4>
          <ul className="space-y-1 text-sm text-gray-600">
            <li><Link href="#">Help center</Link></li>
            <li><Link href="#">FAQ and support</Link></li>
            <li><Link href="#">Roadmap</Link></li>
            <li><Link href="#">Event industry blog</Link></li>
            <li><Link href="#">Festival planning tools</Link></li>
            <li><Link href="#">Venue management tools</Link></li>
            <li><Link href="#">Live streaming event tools</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-2">Specialty industries</h4>
          <ul className="space-y-1 text-sm text-gray-600">
            <li>Ticketing for concerts & music festivals</li>
            <li>Ticketing for nightclubs, bars, & music venues</li>
          </ul>
        </div>
      </div>
    </div>
    {/* Bottom row */}
    <div className="border-t py-4 px-4 flex flex-col md:flex-row md:justify-between items-center text-gray-500 text-xs bg-gray-50">
      <span>©Copyright 2017 - {new Date().getFullYear()}</span>
      <div className="flex gap-3 mt-2 md:mt-0">
        <Link href="#" aria-label="LinkedIn"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.28c-.97 0-1.75-.79-1.75-1.75s.78-1.75 1.75-1.75 1.75.79 1.75 1.75-.78 1.75-1.75 1.75zm15.5 11.28h-3v-5.6c0-1.34-.03-3.07-1.87-3.07-1.87 0-2.16 1.46-2.16 2.97v5.7h-3v-10h2.89v1.36h.04c.4-.75 1.38-1.54 2.84-1.54 3.04 0 3.6 2 3.6 4.59v5.59z"/></svg></Link>
        <Link href="#" aria-label="Twitter"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.56c-.88.39-1.83.65-2.83.77a4.92 4.92 0 0 0 2.16-2.71c-.95.56-2 .97-3.13 1.19a4.92 4.92 0 0 0-8.39 4.48c-4.09-.2-7.72-2.17-10.15-5.15a4.93 4.93 0 0 0-.66 2.48c0 1.71.87 3.22 2.2 4.1a4.93 4.93 0 0 1-2.23-.62v.06a4.93 4.93 0 0 0 3.95 4.83c-.42.11-.87.17-1.33.17-.32 0-.63-.03-.93-.09a4.94 4.94 0 0 0 4.6 3.42A9.87 9.87 0 0 1 0 21.54a13.93 13.93 0 0 0 7.56 2.22c9.05 0 14-7.5 14-14v-.64c.96-.69 1.8-1.56 2.46-2.54z"/></svg></Link>
        <Link href="#" aria-label="Facebook"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M22.675 0h-21.35c-.733 0-1.325.592-1.325 1.325v21.351c0 .733.592 1.324 1.325 1.324h11.495v-9.294h-3.124v-3.622h3.124v-2.672c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.797.143v3.24l-1.918.001c-1.504 0-1.797.715-1.797 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.322-.591 1.322-1.324v-21.35c0-.733-.592-1.325-1.324-1.325z"/></svg></Link>
        <Link href="#" aria-label="YouTube"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a2.993 2.993 0 0 0-2.108-2.115c-1.862-.502-9.39-.502-9.39-.502s-7.527 0-9.39.502a2.993 2.993 0 0 0-2.108 2.115c-.506 1.868-.506 5.765-.506 5.765s0 3.897.506 5.765a2.993 2.993 0 0 0 2.108 2.115c1.862.502 9.39.502 9.39.502s7.527 0 9.39-.502a2.993 2.993 0 0 0 2.108-2.115c.506-1.868.506-5.765.506-5.765s0-3.897-.506-5.765zm-13.498 9.819v-7.01l6.505 3.505-6.505 3.505z"/></svg></Link>
      </div>
    </div>
  </footer>
);

export default Footer;
