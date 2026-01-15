import { useState } from 'react';
import { useWeddingData } from '../../../context/WeddingDataContext';
import { Plus, Trash2, GripVertical } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export function LoveStoryEditor() {
  const { t } = useTranslation();
  const { data, updateData } = useWeddingData();
  const [loveStory, setLoveStory] = useState(data.loveStory);

  const handleChange = (id: string, field: string, value: string) => {
    const updated = loveStory.map(item =>
      item.id === id ? { ...item, [field]: value } : item
    );
    setLoveStory(updated);
    updateData({ ...data, loveStory: updated });
  };

  const addItem = () => {
    const newItem = {
      id: Date.now().toString(),
      year: new Date().getFullYear().toString(),
      title: 'New Event',
      description: 'Description here...'
    };
    const updated = [...loveStory, newItem];
    setLoveStory(updated);
    updateData({ ...data, loveStory: updated });
  };

  const removeItem = (id: string) => {
    const updated = loveStory.filter(item => item.id !== id);
    setLoveStory(updated);
    updateData({ ...data, loveStory: updated });
  };

  const moveItem = (index: number, direction: 'up' | 'down') => {
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= loveStory.length) return;

    const updated = [...loveStory];
    [updated[index], updated[newIndex]] = [updated[newIndex], updated[index]];
    setLoveStory(updated);
    updateData({ ...data, loveStory: updated });
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl text-[var(--color-secondary)] mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
            {t('admin.love_story.title')}
          </h2>
          <p className="text-[#8B5E66]" style={{ fontFamily: "'Montserrat', sans-serif" }}>
            {t('admin.love_story.subtitle')}
          </p>
        </div>
        <button
          onClick={addItem}
          className="flex items-center gap-2 px-4 py-2 bg-[var(--color-primary)] text-white rounded-lg hover:bg-[#A8636B] transition-colors"
        >
          <Plus className="w-4 h-4" />
          {t('admin.love_story.add_btn')}
        </button>
      </div>

      <div className="space-y-4">
        {loveStory.map((item, index) => (
          <div
            key={item.id}
            className="bg-white/60 backdrop-blur-sm p-6 rounded-xl border border-white/80"
          >
            <div className="flex items-start gap-4">
              <div className="flex flex-col gap-2 pt-2">
                <button
                  onClick={() => moveItem(index, 'up')}
                  disabled={index === 0}
                  className="p-1 hover:bg-gray-100 rounded disabled:opacity-30"
                >
                  <GripVertical className="w-4 h-4" />
                </button>
                <button
                  onClick={() => moveItem(index, 'down')}
                  disabled={index === loveStory.length - 1}
                  className="p-1 hover:bg-gray-100 rounded disabled:opacity-30"
                >
                  <GripVertical className="w-4 h-4 rotate-180" />
                </button>
              </div>

              <div className="flex-1 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-[var(--color-secondary)] mb-2">
                      {t('admin.love_story.year')}
                    </label>
                    <input
                      type="text"
                      value={item.year}
                      onChange={(e) => handleChange(item.id, 'year', e.target.value)}
                      className="w-full px-4 py-2 rounded-lg border border-[var(--color-primary)]/30 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[var(--color-secondary)] mb-2">
                      {t('admin.love_story.story_title')}
                    </label>
                    <input
                      type="text"
                      value={item.title}
                      onChange={(e) => handleChange(item.id, 'title', e.target.value)}
                      className="w-full px-4 py-2 rounded-lg border border-[var(--color-primary)]/30 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[var(--color-secondary)] mb-2">
                    {t('admin.love_story.description')}
                  </label>
                  <textarea
                    value={item.description}
                    onChange={(e) => handleChange(item.id, 'description', e.target.value)}
                    className="w-full px-4 py-2 rounded-lg border border-[var(--color-primary)]/30 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                    rows={2}
                  />
                </div>
              </div>

              <button
                onClick={() => removeItem(item.id)}
                className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {loveStory.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          {t('admin.love_story.empty_state')}
        </div>
      )}
    </div>
  );
}

