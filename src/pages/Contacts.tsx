import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Plus, 
  Check, 
  X, 
  Phone, 
  ArrowLeft, 
  AlertCircle,
  Clock
} from 'lucide-react';
import { getContacts, setContacts } from '../utils/storage';
import { Contact, AppPage, RelationType } from '../types';

interface ContactsProps {
  onNavigate: (page: AppPage) => void;
}

export const Contacts: React.FC<ContactsProps> = ({ onNavigate }) => {
  const [contacts, setContactsList] = useState<Contact[]>([]);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  // Form State
  const [name, setName] = useState('');
  const [phone, setPhoneInput] = useState('');
  const [relation, setRelation] = useState<RelationType>('Family');
  const [formError, setFormError] = useState('');

  useEffect(() => {
    setContactsList(getContacts());
  }, []);

  const totalCount = contacts.length;
  const verifiedCount = contacts.filter((c) => c.verified).length;

  const handleAddContact = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setFormError('Please enter contact name.');
      return;
    }
    const cleanPhone = phone.replace(/\D/g, '');
    if (cleanPhone.length !== 10) {
      setFormError('Please enter a valid 10-digit phone number.');
      return;
    }

    // All start unverified = false
    const newContact: Contact = {
      id: `contact_${Date.now()}`,
      name: name.trim(),
      phone: cleanPhone,
      relation,
      verified: false,
    };

    const updated = [...contacts, newContact];
    setContactsList(updated);
    setContacts(updated);

    // Reset & close
    setName('');
    setPhoneInput('');
    setRelation('Family');
    setFormError('');
    setIsSheetOpen(false);
  };

  const handleRemoveContact = (id: string) => {
    const updated = contacts.filter((c) => c.id !== id);
    setContactsList(updated);
    setContacts(updated);
  };

  const relationOptions: RelationType[] = [
    'Family',
    'Mother',
    'Father',
    'Sister',
    'Brother',
    'Friend',
    'Spouse',
    'Other',
  ];

  return (
    <div className="min-h-screen bg-background pb-28 max-w-md mx-auto flex flex-col justify-between">
      <div>
        {/* Header: "Contacts" heading + "+" button (top right, primary circle) */}
        <header className="px-5 pt-6 pb-4 bg-white border-b border-slate-200/70 sticky top-0 z-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => onNavigate('home')}
              className="p-2 -ml-2 rounded-xl text-slate-600 hover:text-primary transition-colors cursor-pointer touch-target flex items-center justify-center"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="text-xl font-bold text-primary font-heading">
              Contacts
            </h1>
          </div>

          {/* "+" button (top right, primary circle) */}
          <button
            type="button"
            onClick={() => setIsSheetOpen(true)}
            className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center shadow-md hover:bg-[#283e6b] transition-all cursor-pointer touch-target"
            title="Add Contact"
          >
            <Plus className="w-5 h-5" />
          </button>
        </header>

        {/* Stats: 2 cards (Total contacts, Verified count) */}
        <section className="p-5">
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white p-4 rounded-3xl border border-slate-200/80 shadow-xs">
              <span className="text-[10px] font-bold uppercase tracking-wider text-muted">
                Total Contacts
              </span>
              <div className="text-2xl font-black text-primary font-heading mt-1">
                {totalCount}
              </div>
              <p className="text-[10px] text-muted mt-0.5">Alert recipients</p>
            </div>

            <div className="bg-white p-4 rounded-3xl border border-slate-200/80 shadow-xs">
              <span className="text-[10px] font-bold uppercase tracking-wider text-muted">
                Verified Count
              </span>
              <div className="text-2xl font-black text-success font-heading mt-1">
                {verifiedCount}
              </div>
              <p className="text-[10px] text-muted mt-0.5">High trust nodes</p>
            </div>
          </div>
        </section>

        {/* List of contact cards */}
        <section className="px-5 space-y-3">
          {contacts.length === 0 ? (
            <div className="bg-white rounded-3xl p-8 border border-slate-200/80 text-center shadow-xs">
              <div className="w-14 h-14 mx-auto mb-3 rounded-2xl bg-indigo-50 text-primary flex items-center justify-center text-2xl">
                👥
              </div>
              <h3 className="text-base font-bold text-primary">No Contacts Added</h3>
              <p className="text-xs text-muted max-w-xs mx-auto mt-1 mb-5">
                Add trusted family members or friends who should be immediately alerted when SOS is triggered.
              </p>
              <button
                type="button"
                onClick={() => setIsSheetOpen(true)}
                className="min-h-[48px] py-3 px-5 bg-primary hover:bg-[#283e6b] text-white font-bold rounded-2xl text-xs shadow-md transition-all cursor-pointer"
              >
                + Add Contact
              </button>
            </div>
          ) : (
            contacts.map((contact) => (
              <div
                key={contact.id}
                className="bg-white p-4 rounded-3xl border border-slate-200/80 shadow-xs flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  {/* avatar circle (first letter, accent bg) */}
                  <div className="w-11 h-11 rounded-full bg-accent text-white flex items-center justify-center font-bold text-base shadow-sm shrink-0">
                    {contact.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-bold text-primary">{contact.name}</h4>
                      {/* verified badge (green ✓ or yellow Pending) */}
                      {contact.verified ? (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-success border border-emerald-200">
                          <Check className="w-3 h-3" />
                          <span>✓ Verified</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-yellow-50 text-warning border border-yellow-200">
                          <Clock className="w-3 h-3" />
                          <span>Pending</span>
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-muted mt-0.5">
                      {contact.relation} • +91 {contact.phone}
                    </p>
                  </div>
                </div>

                {/* "×" remove button */}
                <button
                  type="button"
                  onClick={() => handleRemoveContact(contact.id)}
                  className="p-2 text-slate-400 hover:text-error hover:bg-red-50 rounded-xl transition-colors cursor-pointer touch-target flex items-center justify-center"
                  title="Remove Contact"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            ))
          )}
        </section>
      </div>

      {/* Add form (bottom sheet modal) */}
      {isSheetOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex flex-col justify-end">
          <div className="bg-white rounded-t-3xl p-6 w-full max-w-md mx-auto shadow-2xl animate-in slide-in-from-bottom-8">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <h3 className="text-lg font-bold text-primary font-heading">
                Add Contact
              </h3>
              <button
                type="button"
                onClick={() => setIsSheetOpen(false)}
                className="p-2 text-slate-400 hover:text-slate-600 rounded-full cursor-pointer touch-target flex items-center justify-center"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {formError && (
              <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-error flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{formError}</span>
              </div>
            )}

            <form onSubmit={handleAddContact} className="mt-4 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Papa / Priya Sharma"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full min-h-[48px] border border-slate-300 focus:border-primary rounded-2xl px-4 py-3 text-sm outline-none bg-slate-50"
                  autoFocus
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Phone (+91)
                </label>
                <div className="flex items-center border border-slate-300 focus-within:border-primary rounded-2xl px-3 py-2.5 bg-slate-50 min-h-[48px]">
                  <span className="text-xs font-bold text-slate-600 pr-2 border-r border-slate-300 mr-2">
                    +91
                  </span>
                  <input
                    type="tel"
                    inputMode="numeric"
                    maxLength={10}
                    placeholder="9876543210"
                    value={phone}
                    onChange={(e) => setPhoneInput(e.target.value.replace(/\D/g, ''))}
                    className="w-full bg-transparent text-sm font-semibold outline-none"
                  />
                  <Phone className="w-4 h-4 text-slate-400" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Relation
                </label>
                <select
                  value={relation}
                  onChange={(e) => setRelation(e.target.value as RelationType)}
                  className="w-full min-h-[48px] border border-slate-300 focus:border-primary rounded-2xl px-4 py-3 text-sm outline-none bg-slate-50 cursor-pointer font-medium"
                >
                  {relationOptions.map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full min-h-[48px] py-4 bg-primary hover:bg-[#283e6b] text-white font-bold rounded-2xl text-sm shadow-lg shadow-primary/25 transition-all cursor-pointer"
                >
                  Add Contact
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
