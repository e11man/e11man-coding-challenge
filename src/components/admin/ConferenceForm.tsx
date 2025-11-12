import React, { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form@7.55.0';
import { Conference, Speaker } from '../../types/conference';
import { useAppContext } from '../../context/AppContext';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { X, Plus, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface ConferenceFormProps {
  conference: Conference | null;
  onClose: () => void;
}

interface FormData {
  name: string;
  description: string;
  date: string;
  location: string;
  price: number;
  category: string;
  imageUrl: string;
  maxAttendees: number;
  isFeatured: boolean;
  status: 'Open' | 'Closed' | 'Sold Out';
  speakers: Speaker[];
}

export function ConferenceForm({ conference, onClose }: ConferenceFormProps) {
  const { addConference, updateConference } = useAppContext();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: conference ? {
      ...conference,
      category: conference.category.join(', '),
    } : {
      name: '',
      description: '',
      date: '',
      location: '',
      price: 0,
      category: '',
      imageUrl: '',
      maxAttendees: 100,
      isFeatured: false,
      status: 'Open',
      speakers: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'speakers',
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));

    const conferenceData: Conference = {
      id: conference?.id || `${Date.now()}`,
      name: data.name,
      description: data.description,
      date: data.date,
      location: data.location,
      price: Number(data.price),
      category: data.category.split(',').map(c => c.trim()).filter(Boolean),
      imageUrl: data.imageUrl,
      speakers: data.speakers,
      maxAttendees: Number(data.maxAttendees),
      currentAttendees: conference?.currentAttendees || 0,
      isFeatured: data.isFeatured,
      status: data.status,
    };

    if (conference) {
      updateConference(conferenceData);
      toast.success('Conference updated successfully!');
    } else {
      addConference(conferenceData);
      toast.success('Conference created successfully!');
    }

    setIsSubmitting(false);
    onClose();
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 max-w-4xl mx-auto">
      <div className="flex items-center gap-4 mb-6">
        <Button
          variant="ghost"
          size="sm"
          onClick={onClose}
          className="gap-2"
        >
          <ArrowLeft className="size-4" />
          Back
        </Button>
        <div>
          <h2 className="text-2xl text-gray-900">
            {conference ? 'Edit Conference' : 'Create New Conference'}
          </h2>
          <p className="text-gray-600 text-sm">
            Fill in the details below to {conference ? 'update' : 'create'} a conference
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Basic Info */}
        <div className="space-y-4">
          <h3 className="text-gray-900">Basic Information</h3>
          
          <div>
            <Label htmlFor="name">Conference Name *</Label>
            <Input
              id="name"
              {...register('name', { required: 'Conference name is required' })}
              className={errors.name ? 'border-red-500' : ''}
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              rows={4}
              {...register('description', { required: 'Description is required' })}
              className={errors.description ? 'border-red-500' : ''}
            />
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="date">Date *</Label>
              <Input
                id="date"
                type="date"
                {...register('date', { required: 'Date is required' })}
                className={errors.date ? 'border-red-500' : ''}
              />
              {errors.date && (
                <p className="text-red-500 text-sm mt-1">{errors.date.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="location">Location *</Label>
              <Input
                id="location"
                {...register('location', { required: 'Location is required' })}
                className={errors.location ? 'border-red-500' : ''}
              />
              {errors.location && (
                <p className="text-red-500 text-sm mt-1">{errors.location.message}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="price">Price ($) *</Label>
              <Input
                id="price"
                type="number"
                min="0"
                step="0.01"
                {...register('price', { 
                  required: 'Price is required',
                  min: { value: 0, message: 'Price must be positive' }
                })}
                className={errors.price ? 'border-red-500' : ''}
              />
              {errors.price && (
                <p className="text-red-500 text-sm mt-1">{errors.price.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="maxAttendees">Max Attendees *</Label>
              <Input
                id="maxAttendees"
                type="number"
                min="1"
                {...register('maxAttendees', { 
                  required: 'Max attendees is required',
                  min: { value: 1, message: 'Must have at least 1 spot' }
                })}
                className={errors.maxAttendees ? 'border-red-500' : ''}
              />
              {errors.maxAttendees && (
                <p className="text-red-500 text-sm mt-1">{errors.maxAttendees.message}</p>
              )}
            </div>
          </div>

          <div>
            <Label htmlFor="category">Categories (comma-separated) *</Label>
            <Input
              id="category"
              placeholder="React, Frontend, JavaScript"
              {...register('category', { required: 'At least one category is required' })}
              className={errors.category ? 'border-red-500' : ''}
            />
            {errors.category && (
              <p className="text-red-500 text-sm mt-1">{errors.category.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="imageUrl">Image URL</Label>
            <Input
              id="imageUrl"
              type="url"
              placeholder="https://example.com/image.jpg"
              {...register('imageUrl')}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="status">Status *</Label>
              <select
                id="status"
                {...register('status')}
                className="flex h-10 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm"
              >
                <option value="Open">Open</option>
                <option value="Closed">Closed</option>
                <option value="Sold Out">Sold Out</option>
              </select>
            </div>

            <div className="flex items-center gap-2 pt-8">
              <input
                id="isFeatured"
                type="checkbox"
                {...register('isFeatured')}
                className="size-4 rounded border-gray-300"
              />
              <Label htmlFor="isFeatured" className="cursor-pointer">
                Featured Conference
              </Label>
            </div>
          </div>
        </div>

        {/* Speakers */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-gray-900">Speakers</h3>
            <Button
              type="button"
              size="sm"
              variant="outline"
              onClick={() => append({
                id: `speaker-${Date.now()}`,
                name: '',
                title: '',
                company: '',
                bio: '',
                avatarUrl: '',
              })}
              className="gap-2"
            >
              <Plus className="size-4" />
              Add Speaker
            </Button>
          </div>

          {fields.map((field, index) => (
            <div key={field.id} className="border border-gray-200 rounded-lg p-4 space-y-3">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-gray-600">Speaker {index + 1}</p>
                <Button
                  type="button"
                  size="sm"
                  variant="ghost"
                  onClick={() => remove(index)}
                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  <X className="size-4" />
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <Label>Name</Label>
                  <Input {...register(`speakers.${index}.name`)} />
                </div>
                <div>
                  <Label>Title</Label>
                  <Input {...register(`speakers.${index}.title`)} />
                </div>
                <div>
                  <Label>Company</Label>
                  <Input {...register(`speakers.${index}.company`)} />
                </div>
                <div>
                  <Label>Avatar URL</Label>
                  <Input {...register(`speakers.${index}.avatarUrl`)} />
                </div>
              </div>
              <div>
                <Label>Bio</Label>
                <Textarea {...register(`speakers.${index}.bio`)} rows={2} />
              </div>
            </div>
          ))}

          {fields.length === 0 && (
            <p className="text-gray-500 text-sm text-center py-4">
              No speakers added yet. Click "Add Speaker" to add one.
            </p>
          )}
        </div>

        {/* Submit Buttons */}
        <div className="flex gap-3 pt-4 border-t border-gray-200">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            disabled={isSubmitting}
            className="flex-1"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={isSubmitting}
            className="flex-1"
          >
            {isSubmitting ? 'Saving...' : conference ? 'Update Conference' : 'Create Conference'}
          </Button>
        </div>
      </form>
    </div>
  );
}
