import React from 'react';
import { format } from 'date-fns';
import { X } from 'lucide-react';
import { useEventStore } from '../store/eventStore';
import { FileInput } from './FileInput';

interface EventModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedDate: Date;
}

export const EventModal: React.FC<EventModalProps> = ({
  isOpen,
  onClose,
  selectedDate,
}) => {
  const addEvent = useEventStore((state) => state.addEvent);
  const [title, setTitle] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [time, setTime] = React.useState('12:00');
  const [type, setType] = React.useState<'text' | 'image' | 'video'>('text');
  const [mediaFile, setMediaFile] = React.useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    let mediaUrl = '';
    if (mediaFile) {
      // In a real app, you would upload the file to a storage service
      // and get back a URL. For this demo, we'll use a data URL
      mediaUrl = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.readAsDataURL(mediaFile);
      });
    }

    addEvent({
      title,
      description,
      date: selectedDate,
      time,
      type,
      mediaUrl: type !== 'text' ? mediaUrl : undefined,
    });
    onClose();
    resetForm();
  };

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setTime('12:00');
    setType('text');
    setMediaFile(null);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">
            Add Event for {format(selectedDate, 'MMMM d, yyyy')}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Title
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              rows={3}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Time
            </label>
            <input
              type="time"
              required
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Type
            </label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value as 'text' | 'image' | 'video')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="text">Text</option>
              <option value="image">Image</option>
              <option value="video">Video</option>
            </select>
          </div>

          {type !== 'text' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {type === 'image' ? 'Upload Image' : 'Upload Video'}
              </label>
              <FileInput
                accept={type === 'image' ? 'image/*' : 'video/*'}
                onChange={setMediaFile}
                label={type === 'image' ? 'Click to upload image' : 'Click to upload video'}
              />
            </div>
          )}

          <div className="flex justify-end space-x-2 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md"
            >
              Add Event
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};