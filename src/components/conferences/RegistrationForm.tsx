import React, { useState } from 'react';
import { useForm } from 'react-hook-form@7.55.0';
import { Conference } from '../../types/conference';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { useAppContext } from '../../context/AppContext';
import { CheckCircle, X } from 'lucide-react';
import { Confetti } from '../ui/confetti';

interface RegistrationFormProps {
  conference: Conference;
  onSuccess: () => void;
  onCancel: () => void;
}

interface FormData {
  name: string;
  email: string;
  company: string;
}

export function RegistrationForm({ conference, onSuccess, onCancel }: RegistrationFormProps) {
  const { registerForConference, user } = useAppContext();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [triggerConfetti, setTriggerConfetti] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      name: user?.name || '',
      email: user?.email || '',
      company: '',
    },
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    registerForConference(conference.id, {
      userId: user?.id || '1',
      name: data.name,
      email: data.email,
      company: data.company,
    });

    setIsSubmitting(false);
    setShowSuccess(true);
    setTriggerConfetti(true);

    // Close form after showing success
    setTimeout(() => {
      onSuccess();
    }, 3000);
  };

  if (showSuccess) {
    return (
      <>
        <Confetti trigger={triggerConfetti} />
        <div className="bg-white rounded-2xl p-8 text-center space-y-6 max-w-lg mx-auto shadow-2xl">
          <div className="flex justify-center">
            <div className="size-24 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center shadow-xl animate-bounce">
              <CheckCircle className="size-16 text-white" />
            </div>
          </div>
          <div className="space-y-2">
            <h3 className="text-3xl text-gray-900">🎉 Registration Successful!</h3>
            <p className="text-gray-600 text-lg">
              You're all set for {conference.name}
            </p>
            <p className="text-sm text-gray-500">
              Check your email for confirmation details
            </p>
          </div>
        </div>
      </>
    );
  }

  return (
    <div className="bg-white rounded-2xl p-8 max-w-2xl mx-auto shadow-xl border border-gray-200">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h3 className="text-2xl text-gray-900 mb-2">Register for Conference</h3>
          <p className="text-gray-600">{conference.name}</p>
        </div>
        <button
          onClick={onCancel}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          aria-label="Close"
        >
          <X className="size-5 text-gray-500" />
        </button>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Name */}
        <div>
          <Label htmlFor="name">Full Name *</Label>
          <Input
            id="name"
            type="text"
            {...register('name', { 
              required: 'Name is required',
              minLength: { value: 2, message: 'Name must be at least 2 characters' }
            })}
            className={errors.name ? 'border-red-500' : ''}
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <Label htmlFor="email">Email Address *</Label>
          <Input
            id="email"
            type="email"
            {...register('email', { 
              required: 'Email is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Invalid email address'
              }
            })}
            className={errors.email ? 'border-red-500' : ''}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* Company */}
        <div>
          <Label htmlFor="company">Company (Optional)</Label>
          <Input
            id="company"
            type="text"
            {...register('company')}
          />
        </div>

        {/* Price Summary */}
        <div className="bg-gray-50 rounded-lg p-4 space-y-2">
          <div className="flex justify-between text-gray-600">
            <span>Conference Price:</span>
            <span>${conference.price}</span>
          </div>
          <div className="flex justify-between text-gray-900 pt-2 border-t border-gray-200">
            <span>Total:</span>
            <span>${conference.price}</span>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-3 pt-2">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            className="flex-1"
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className="flex-1"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Processing...' : `Pay $${conference.price}`}
          </Button>
        </div>
      </form>
    </div>
  );
}