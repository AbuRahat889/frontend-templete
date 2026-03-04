import logo from "@/assets/logo.png";
import {
  Facebook,
  Instagram,
  Mail,
  MapPin,
  Phone,
  Twitter,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const data = {
  facebookLink: "https://facebook.com/mvpblocks",
  instaLink: "https://instagram.com/mvpblocks",
  twitterLink: "https://twitter.com/mvpblocks",
  githubLink: "https://github.com/mvpblocks",
  dribbbleLink: "https://dribbble.com/mvpblocks",
  services: {
    allCourses: "/accreditation/all-courses",
    caseStudies: "/case-studies",
    about: "/about",
    contact: "/contact-us",
  },
  about: {
    accreditation: "/accreditation-package",
    certification: "/certification/apply-certification",
    directory: "/professional-directory",
  },
  contact: {
    email: "info@cpdawards.org.uk",
    phone: "02074594713 (UK)",
    address: "United Kingdom",
  },
};

const socialLinks = [
  { icon: Facebook, label: "Facebook", href: data.facebookLink },
  { icon: Instagram, label: "Instagram", href: data.instaLink },
  { icon: Twitter, label: "Twitter", href: data.twitterLink },
];

const aboutLinks = [
  { text: "Accreditation", href: data.about.accreditation },
  { text: "Certification", href: data.about.certification },
  { text: "Directory", href: data.about.directory },
];

const serviceLinks = [
  { text: "All Courses", href: data.services.allCourses },
  { text: "Case Studies", href: data.services.caseStudies },
  { text: "About", href: data.services.about },
  { text: "Contact Us", href: data.services.contact },
];

const contactInfo = [
  { icon: Mail, text: data.contact.email },
  { icon: Phone, text: data.contact.phone },
  { icon: MapPin, text: data.contact.address, isAddress: true },
];

export default function Footer() {
  return (
    <footer className="bg-[#1e2d48] mt-16 w-full place-self-end">
      <div className="mx-auto container px-4 pt-16 pb-6 sm:px-6 lg:px-8 lg:pt-24">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div>
            <div className="text-primary flex justify-center gap-2 sm:justify-start h-14 w-48">
              <Image
                src={logo}
                height={200}
                width={200}
                alt="logo"
                className="h-full w-full"
              />
            </div>

            <p className="text-white text-base mt-6 max-w-md text-center leading-relaxed sm:max-w-xs sm:text-left">
              Leading provider of professional certification and training
              accreditation with globally Recognised standards.
            </p>

            <ul className="mt-8 flex justify-center gap-6 sm:justify-start md:gap-8 ">
              {socialLinks.map(({ icon: Icon, label, href }) => (
                <li
                  key={label}
                  className="bg-primaryColor  group hover:bg-white p-3 rounded-full transition-colors duration-300 ease-in-out"
                >
                  <Link
                    prefetch={false}
                    href={href}
                    className="group-hover:text-primaryColor  text-white  bg-white transition "
                  >
                    <span className="sr-only">{label}</span>
                    <Icon className="size-6" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-2 md:grid-cols-4 lg:col-span-2">
            <div className="text-center sm:text-left">
              <h1 className="text-xl font-medium text-white text-left">
                Services
              </h1>
              <ul className="mt-8 space-y-4 text-sm text-left">
                {aboutLinks.map(({ text, href }) => (
                  <li key={text}>
                    <Link
                      className="text-white  text-sm hover:underline hover:text-primaryColor transition-colors duration-300"
                      href={href}
                    >
                      {text}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="text-center sm:text-left">
              <h1 className="text-xl font-medium text-white text-left">
                Quick Links
              </h1>
              <ul className="mt-8 space-y-4 text-sm text-left">
                {serviceLinks.map(({ text, href }) => (
                  <li key={text}>
                    <Link
                      className="text-white  text-sm hover:underline hover:text-primaryColor transition-colors duration-300"
                      href={href}
                    >
                      {text}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="text-center sm:text-left col-span-2 md:col-span-1">
              <h1 className="text-xl font-medium text-white text-left">
                Contact Us
              </h1>
              <ul className="mt-8 space-y-4 text-sm">
                {contactInfo.map(({ icon: Icon, text, isAddress }) => (
                  <li key={text}>
                    <Link className=" flex items-center gap-2 " href="#">
                      <Icon className="text-primaryColor size-5 shrink-0 shadow-sm" />
                      {isAddress ? (
                        <address className="text-white -mt-0.5 flex-1 not-italic transition text-left">
                          {text}
                        </address>
                      ) : (
                        <span className="text-white text-sm hover:underline hover:text-primaryColor transition-colors duration-300 ">
                          {text}
                        </span>
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t pt-6">
          <div className="text-center sm:flex sm:justify-between sm:text-left">
            <p className="text-white mt-4 text-sm transition sm:order-first sm:mt-0 ">
              &copy; 2017 - {new Date().getFullYear()?.toString().slice(-2)} CPD
              Award Ltd. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
