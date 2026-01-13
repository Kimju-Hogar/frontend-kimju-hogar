import { useState, useEffect, useRef } from 'react';
import { MapPin, ChevronDown, Check } from 'lucide-react';

const AutocompleteField = ({
    label,
    value,
    onChange,
    options,
    placeholder,
    icon: Icon = MapPin,
    disabled = false
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState(value || '');
    const [filteredOptions, setFilteredOptions] = useState([]);
    const wrapperRef = useRef(null);

    useEffect(() => {
        setSearchTerm(value || '');
    }, [value]);

    useEffect(() => {
        if (!searchTerm) {
            setFilteredOptions(options.slice(0, 10)); // Show top 10 if empty
        } else {
            const filtered = options.filter(opt =>
                opt.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredOptions(filtered.slice(0, 10));
        }
    }, [searchTerm, options]);

    useEffect(() => {
        function handleClickOutside(event) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                setIsOpen(false);
                setSearchTerm(value || ''); // Reset search term to current value if no selection made
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [value]);

    return (
        <div ref={wrapperRef} className="relative space-y-1 w-full">
            {label && <label className="block text-xs font-bold text-gray-400 uppercase ml-3">{label}</label>}
            <div className="relative">
                <div className={`absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 transition-colors ${isOpen ? 'text-primary' : ''}`}>
                    <Icon className="w-4 h-4" />
                </div>
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => {
                        setSearchTerm(e.target.value);
                        setIsOpen(true);
                    }}
                    onFocus={() => setIsOpen(true)}
                    placeholder={placeholder}
                    disabled={disabled}
                    className="w-full bg-gray-50 border border-gray-200 pl-11 pr-10 py-4 rounded-2xl font-bold text-gray-600 outline-none focus:bg-white focus:border-primary transition-all placeholder:text-gray-300 shadow-sm disabled:opacity-50"
                />
                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300 pointer-events-none">
                    <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                </div>

                {isOpen && filteredOptions.length > 0 && (
                    <div className="absolute z-[110] left-0 right-0 mt-2 bg-white border border-pink-100 rounded-2xl shadow-xl overflow-hidden max-h-60 overflow-y-auto custom-scrollbar animate-fade-in-up">
                        {filteredOptions.map((opt, idx) => (
                            <button
                                key={idx}
                                type="button"
                                onClick={() => {
                                    onChange(opt);
                                    setSearchTerm(opt);
                                    setIsOpen(false);
                                }}
                                className="w-full text-left px-5 py-3 text-sm font-bold text-gray-600 hover:bg-pink-50 hover:text-primary transition-colors flex items-center justify-between group"
                            >
                                <span>{opt}</span>
                                {value === opt && <Check className="w-4 h-4 text-primary" />}
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default AutocompleteField;
