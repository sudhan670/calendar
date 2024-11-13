import React from 'react';
import { Upload } from 'lucide-react';

interface FileInputProps {
  accept: string;
  onChange: (file: File) => void;
  label: string;
}

export const FileInput: React.FC<FileInputProps> = ({ accept, onChange, label }) => {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [preview, setPreview] = React.useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onChange(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-2">
      <div
        onClick={() => inputRef.current?.click()}
        className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:border-blue-500 transition-colors"
      >
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          onChange={handleFileChange}
          className="hidden"
        />
        <Upload className="w-6 h-6 mx-auto mb-2 text-gray-400" />
        <p className="text-sm text-gray-600">{label}</p>
      </div>
      
      {preview && (
        <div className="mt-2">
          {accept.includes('image') ? (
            <img src={preview} alt="Preview" className="max-h-32 rounded mx-auto" />
          ) : (
            <video src={preview} className="max-h-32 rounded mx-auto" controls />
          )}
        </div>
      )}
    </div>
  );
};