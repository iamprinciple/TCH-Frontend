import React from 'react'

const Footer = () => {
    return (
        <footer className="bg-slate-900 text-gray-300 pt-16 pb-8 px-6">

            <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-10">

                {/* Hospital Info */}
                <div>
                    <h2 className="text-xl font-bold text-white mb-4">
                        The College Hospital
                    </h2>

                    <p className="text-sm leading-relaxed">
                        Providing trusted healthcare services with modern technology and
                        experienced professionals. Your health is our priority.
                    </p>
                </div>


                {/* Quick Links */}
                <div>
                    <h3 className="text-lg font-semibold text-white mb-4">
                        Quick Links
                    </h3>

                    <ul className="space-y-2 text-sm">
                        <li>
                            <a href="/" className="hover:text-white transition">Home</a>
                        </li>
                        <li>
                            <a href="/about" className="hover:text-white transition">About</a>
                        </li>
                        <li>
                            <a href="/services" className="hover:text-white transition">Services</a>
                        </li>
                        <li>
                            <a href="/contact" className="hover:text-white transition">Contact</a>
                        </li>
                    </ul>
                </div>


                {/* Departments */}
                <div>
                    <h3 className="text-lg font-semibold text-white mb-4">
                        Departments
                    </h3>

                    <ul className="space-y-2 text-sm">
                        <li>Cardiology</li>
                        <li>Dermatology</li>
                        <li>Radiology</li>
                        <li>Neurology</li>
                    </ul>
                </div>


                {/* Contact */}
                <div>
                    <h3 className="text-lg font-semibold text-white mb-4">
                        Contact Us
                    </h3>

                    <ul className="space-y-2 text-sm">
                        <li>📍 Lagos, Nigeria</li>
                        <li>📞 +234 800 000 0000</li>
                        <li>📧 support@collegehospital.com</li>
                    </ul>
                </div>

            </div>


            {/* Bottom Section */}
            <div className="border-t border-gray-700 mt-10 pt-6 text-center text-sm">
                <p>
                    © {new Date().getFullYear()} The College Hospital. All Rights Reserved.
                </p>
            </div>

        </footer>
    )
}

export default Footer