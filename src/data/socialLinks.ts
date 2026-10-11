export interface SocialLink {
  platform: string;
  url: string;
  label: string;
  username: string;
}

export const contactDetails = {
  email: "kavyanshshakya2@gmail.com",
  location: "India • Global Remote",
  timezone: "IST (UTC+5:30)",
  availability: "Open for select collaborations and engineering discussions",
};

export const socialLinks: SocialLink[] = [
  {
    platform: "GitHub",
    url: "https://github.com",
    label: "Explore code repositories",
    username: "@kavyansh",
  },
  {
    platform: "LinkedIn",
    url: "https://linkedin.com",
    label: "Connect professionally",
    username: "kavyansh",
  },
  {
    platform: "X / Twitter",
    url: "https://x.com",
    label: "Follow updates & thoughts",
    username: "@kavyansh",
  },
  {
    platform: "Discord",
    url: "https://discord.com",
    label: "Join gaming & tech communities",
    username: "kavyansh",
  },
];
