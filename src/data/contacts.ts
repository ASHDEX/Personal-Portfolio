export interface ContactItem {
  label: string;
  value: string;
  href?: string;
}

export const contacts: ContactItem[] = [
  {
    label: "EMAIL",
    value: "primeash1@gmail.com",
    href: "mailto:primeash1@gmail.com",
  },
  { label: "PHONE", value: "+91-7357726793" },
  {
    label: "LINKEDIN",
    value: "linkedin.com/in/jayesh-chaudhary",
    href: "https://www.linkedin.com/in/jayesh-chaudhary-cissp-cism-cisa-5b563519b/",
  },
  {
    label: "GITHUB",
    value: "github.com/Ashdex",
    href: "https://github.com/Ashdex",
  },
  {
    label: "FREEINTELHUB",
    value: "ASHDEX/FreeIntelhub",
    href: "https://github.com/ASHDEX/FreeIntelhub",
  },
  {
    label: "BLOG",
    value: "dailydoesofcybersecuritynews.com",
    href: "https://dailydoesofcybersecuritynews.com",
  },
];
