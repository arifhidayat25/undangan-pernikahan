import { motion } from 'framer-motion';
import { useState } from 'react';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import { X, ZoomIn } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const photos = [
  {
    url: 'https://images.unsplash.com/photo-1696204868916-cda7380ae72b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwY2VyZW1vbnklMjB2ZW51ZXxlbnwxfHx8fDE3Njc0MTg1OTF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    caption: 'Our Venue',
  },
  {
    url: 'https://images.unsplash.com/photo-1763713512972-58f361318408?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb21hbnRpYyUyMGNvdXBsZSUyMGRhbmNpbmd8ZW58MXx8fHwxNzY3NDQzNjg3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    caption: 'First Dance',
  },
  {
    url: 'https://images.unsplash.com/photo-1664312696723-173130983e27?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwZmxvd2VycyUyMGJvdXF1ZXR8ZW58MXx8fHwxNzY3Mzg0NDI1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    caption: 'The Bouquet',
  },
  {
    url: 'https://images.unsplash.com/photo-1506014299253-3725319c0f69?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3VwbGUlMjBob2xkaW5nJTIwaGFuZHN8ZW58MXx8fHwxNzY3MzQwMjM2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    caption: 'Together',
  },
  {
    url: 'https://images.unsplash.com/photo-1738694242379-ef21044985bb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwcmluZ3MlMjBlbGVnYW50fGVufDF8fHx8MTc2NzM1MTM5OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    caption: 'The Rings',
  },
  {
    url: 'https://images.unsplash.com/photo-1641849460106-c7b413a622c7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3VwbGUlMjBzdW5zZXQlMjByb21hbnRpY3xlbnwxfHx8fDE3NjczNTc3OTd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    caption: 'Golden Hour',
  },
];

export function GallerySection() {
  const { t } = useTranslation();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <section className="py-24 md:py-32 relative overflow-hidden bg-white/50">
      <div className="max-w-7xl mx-auto px-4 mb-12 text-center">
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.6 }}
        >
             <p className="text-2xl text-[var(--color-primary)] mb-2" style={{ fontFamily: "'Great Vibes', cursive" }}>
                {t('gallery.pretitle')}
            </p>
            <h2
                className="text-4xl md:text-5xl text-[var(--color-secondary)]"
                style={{ fontFamily: "'Playfair Display', serif" }}
            >
                {t('gallery.title')}
            </h2>
             <p
                className="mt-4 text-[var(--color-secondary)]"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
                {t('gallery.description')}
            </p>
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-4">
        <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}>
            <Masonry gutter="1.5rem">
                {photos.map((photo, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                        className="relative group overflow-hidden rounded-xl shadow-md cursor-pointer"
                        onClick={() => setSelectedImage(photo.url)}
                    >
                         <img 
                            src={photo.url} 
                            alt={photo.caption} 
                            className="w-full h-auto object-cover transform transition-transform duration-700 group-hover:scale-110"
                            loading="lazy"
                         />
                         <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                             <ZoomIn className="text-white w-8 h-8 opacity-80" />
                         </div>
                    </motion.div>
                ))}
            </Masonry>
        </ResponsiveMasonry>
      </div>

      {/* Lightbox */}
      {selectedImage && (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 backdrop-blur-sm"
            onClick={() => setSelectedImage(null)}
        >
            <motion.div 
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                className="relative max-w-5xl w-full max-h-[90vh]"
            >
                <img src={selectedImage} alt="Preview" className="w-full h-full object-contain rounded-lg shadow-2xl" />
                <button 
                    onClick={() => setSelectedImage(null)}
                    className="absolute -top-12 right-0 text-white hover:text-[var(--color-primary)] transition-colors"
                >
                    <X className="w-8 h-8" />
                </button>
            </motion.div>
        </motion.div>
      )}
    </section>
  );
}


