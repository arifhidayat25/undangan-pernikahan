export interface RsvpEntry {
  id: string;
  name: string;
  guests: string;
  attendance: 'hadir' | 'tidak-hadir';
  message: string;
  timestamp: string;
}

const STORAGE_KEY = 'wedding_rsvp_data';

/**
 * Save a new RSVP entry to localStorage
 */
export function saveRsvp(data: Omit<RsvpEntry, 'id' | 'timestamp'>): void {
  const entries = getAllRsvps();
  
  const newEntry: RsvpEntry = {
    ...data,
    id: generateId(),
    timestamp: new Date().toISOString(),
  };
  
  entries.push(newEntry);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
}

/**
 * Get all RSVP entries from localStorage
 */
export function getAllRsvps(): RsvpEntry[] {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error reading RSVP data:', error);
    return [];
  }
}

/**
 * Get RSVP statistics
 */
export function getRsvpStats() {
  const entries = getAllRsvps();
  const attending = entries.filter(e => e.attendance === 'hadir').length;
  const notAttending = entries.filter(e => e.attendance === 'tidak-hadir').length;
  const totalGuests = entries
    .filter(e => e.attendance === 'hadir')
    .reduce((sum, e) => sum + parseInt(e.guests.replace('+', '') || '1'), 0);
  
  return {
    total: entries.length,
    attending,
    notAttending,
    totalGuests,
  };
}

/**
 * Export RSVP data to CSV and trigger download
 */
export function exportRsvpToCsv(): void {
  const entries = getAllRsvps();
  
  if (entries.length === 0) {
    alert('Tidak ada data RSVP untuk diekspor');
    return;
  }
  
  // Use semicolon as delimiter for better Excel compatibility
  const delimiter = ';';
  
  // CSV Header
  const headers = ['No', 'Nama', 'Jumlah Tamu', 'Kehadiran', 'Pesan', 'Waktu Submit'];
  
  // CSV Rows
  const rows = entries.map((entry, index) => [
    (index + 1).toString(),
    escapeCSV(entry.name, delimiter),
    entry.guests,
    entry.attendance === 'hadir' ? 'Hadir' : 'Tidak Hadir',
    escapeCSV(entry.message || '-', delimiter),
    formatTimestamp(entry.timestamp),
  ]);
  
  // Combine headers and rows
  const csvContent = [
    headers.join(delimiter),
    ...rows.map(row => row.join(delimiter)),
  ].join('\n');
  
  // Add BOM for proper UTF-8 encoding in Excel
  const BOM = '\uFEFF';
  const blob = new Blob([BOM + csvContent], { type: 'text/csv;charset=utf-8;' });
  
  // Trigger download
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  link.setAttribute('href', url);
  link.setAttribute('download', `rsvp_data_${new Date().toISOString().split('T')[0]}.csv`);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

/**
 * Clear all RSVP data from localStorage
 */
export function clearAllRsvps(): void {
  if (confirm('Apakah Anda yakin ingin menghapus semua data RSVP? Tindakan ini tidak dapat dibatalkan.')) {
    localStorage.removeItem(STORAGE_KEY);
    alert('Semua data RSVP telah dihapus');
    window.location.reload();
  }
}

/**
 * Generate a unique ID
 */
function generateId(): string {
  return `rsvp_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Escape special characters for CSV
 */
function escapeCSV(value: string, delimiter: string = ','): string {
  if (!value) return '';
  
  // If value contains delimiter, quote, or newline, wrap in quotes and escape quotes
  if (value.includes(delimiter) || value.includes('"') || value.includes('\n')) {
    return `"${value.replace(/"/g, '""')}"`;
  }
  
  return value;
}

/**
 * Format ISO timestamp to readable format
 */
function formatTimestamp(isoString: string): string {
  const date = new Date(isoString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  
  return `${day}/${month}/${year} ${hours}:${minutes}`;
}
