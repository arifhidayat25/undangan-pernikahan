export interface WeddingData {
  couple: {
    bride: {
      name: string;
      fullName: string;
      photo?: string; // base64 or URL
      parents?: string;
    };
    groom: {
      name: string;
      fullName: string;
      photo?: string; // base64 or URL
      parents?: string;
    };
  };
  event: {
    weddingDate: string; // ISO format
    ceremony: {
      title: string;
      date: string;
      time: string;
      venue: string;
      address: string;
      googleCalendarUrl: string;
    };
    reception: {
      title: string;
      date: string;
      time: string;
      venue: string;
      address: string;
      googleCalendarUrl: string;
    };
    mapEmbedUrl: string;
    mapDirectionUrl: string;
  };
  intro: {
    subtitle: string;
    title: string;
    message: string;
    heroBackgroundImage?: string; // base64 or URL
  };
  loveStory: Array<{
    id: string;
    year: string;
    title: string;
    description: string;
  }>;
  gallery: Array<{
    id: string;
    url: string; // base64 or URL
    caption?: string;
  }>;
  theme: {
    primaryColor: string;
    secondaryColor: string;
    accentColor: string;
  };
}

export const defaultWeddingData: WeddingData = {
  couple: {
    bride: {
      name: "Sarah",
      fullName: "Sarah Johnson",
      parents: "Mr. & Mrs. Robert Johnson"
    },
    groom: {
      name: "Daniel",
      fullName: "Daniel Anderson",
      parents: "Mr. & Mrs. Michael Anderson"
    }
  },
  event: {
    weddingDate: "2026-06-15T09:00:00",
    ceremony: {
      title: "Akad Nikah",
      date: "Minggu, 15 Juni 2026",
      time: "Pukul 09:00 - 10:00 WIB",
      venue: "Gedung Serbaguna Al-Hikmah",
      address: "Jl. Melati No. 45, Jakarta Selatan",
      googleCalendarUrl: "https://calendar.google.com/calendar/render?action=TEMPLATE&text=Akad+Nikah+Sarah+%26+Daniel&dates=20260615T020000Z/20260615T030000Z"
    },
    reception: {
      title: "Resepsi",
      date: "Minggu, 15 Juni 2026",
      time: "Pukul 11:00 - 14:00 WIB",
      venue: "The Grand Ballroom",
      address: "Hotel Mulia, Jl. Asia Afrika No. 8, Jakarta Pusat",
      googleCalendarUrl: "https://calendar.google.com/calendar/render?action=TEMPLATE&text=Resepsi+Sarah+%26+Daniel&dates=20260615T040000Z/20260615T070000Z"
    },
    mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126906.96205705356!2d106.72960686977792!3d-6.284462140460493!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f3e945e34b9d%3A0x5371bf0fdad786a2!2sJakarta%2C%20Special%20Capital%20Region%20of%20Jakarta!5e0!3m2!1sen!2sid!4v1709452031548!5m2!1sen!2sid",
    mapDirectionUrl: "https://maps.google.com"
  },
  intro: {
    subtitle: "We're getting married!",
    title: "Dengan Penuh Sukacita",
    message: "Kami dengan tulus mengundang Anda untuk merayakan hari istimewa kami. Kehadiran dan doa restu Anda akan menjadi berkat yang sempurna bagi perjalanan baru kami sebagai pasangan suami istri.",
    heroBackgroundImage: "https://images.unsplash.com/photo-1760669348218-20c45a264231?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwY291cGxlJTIwcm9tYW50aWN8ZW58MXx8fHwxNzY3NDE0NDU4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
  },
  loveStory: [
    {
      id: "1",
      year: "2020",
      title: "First Meet",
      description: "Pertemuan pertama kami yang tak terduga di sebuah kafe kecil di Jakarta."
    },
    {
      id: "2",
      year: "2021",
      title: "First Date",
      description: "Kencan pertama yang romantis di taman kota saat matahari terbenam."
    },
    {
      id: "3",
      year: "2023",
      title: "The Proposal",
      description: "Momen spesial ketika Daniel melamar Sarah di pantai favorit kami."
    },
    {
      id: "4",
      year: "2026",
      title: "Our Wedding",
      description: "Hari yang kami tunggu-tunggu, memulai perjalanan baru bersama."
    }
  ],
  gallery: [
    {
      id: "1",
      url: "https://images.unsplash.com/photo-1519741497674-611481863552?w=800",
      caption: "Pre-wedding photoshoot"
    },
    {
      id: "2",
      url: "https://images.unsplash.com/photo-1606800052052-a08af7148866?w=800",
      caption: "Engagement day"
    },
    {
      id: "3",
      url: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=800",
      caption: "Our journey together"
    },
    {
      id: "4",
      url: "https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=800",
      caption: "Beautiful moments"
    },
    {
      id: "5",
      url: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=800",
      caption: "Love story"
    },
    {
      id: "6",
      url: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=800",
      caption: "Forever together"
    }
  ],
  theme: {
    primaryColor: "#B76E79",
    secondaryColor: "#4A2C32",
    accentColor: "#D4AF37"
  }
};
