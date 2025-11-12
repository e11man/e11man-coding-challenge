import React, { useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import { Plus, Edit, Trash2, Search } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { ConferenceForm } from './ConferenceForm';
import { Conference } from '../../types/conference';
import { Badge } from '../ui/badge';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '../ui/alert-dialog';
import { toast } from 'sonner@2.0.3';

export function AdminPanel() {
  const { conferences, deleteConference } = useAppContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingConference, setEditingConference] = useState<Conference | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const filteredConferences = conferences.filter(conf =>
    conf.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    conf.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (conference: Conference) => {
    setEditingConference(conference);
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    deleteConference(id);
    setDeleteConfirmId(null);
    toast.success('Conference deleted successfully');
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingConference(null);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  if (showForm) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <ConferenceForm
          conference={editingConference}
          onClose={handleCloseForm}
        />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl text-gray-900">Admin Panel</h1>
          <p className="text-gray-600 mt-1">Manage conferences and events</p>
        </div>
        <Button onClick={() => setShowForm(true)} className="gap-2">
          <Plus className="size-5" />
          Add Conference
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="text-3xl text-gray-900 mb-1">{conferences.length}</div>
          <p className="text-gray-600 text-sm">Total Conferences</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="text-3xl text-gray-900 mb-1">
            {conferences.filter(c => c.status === 'Open').length}
          </div>
          <p className="text-gray-600 text-sm">Open for Registration</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="text-3xl text-gray-900 mb-1">
            {conferences.filter(c => c.status === 'Sold Out').length}
          </div>
          <p className="text-gray-600 text-sm">Sold Out</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="text-3xl text-gray-900 mb-1">
            {conferences.reduce((sum, c) => sum + c.currentAttendees, 0)}
          </div>
          <p className="text-gray-600 text-sm">Total Attendees</p>
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
        <Input
          type="text"
          placeholder="Search conferences..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Conferences Table */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-6 py-3 text-gray-900 text-sm">Conference</th>
                <th className="text-left px-6 py-3 text-gray-900 text-sm">Date</th>
                <th className="text-left px-6 py-3 text-gray-900 text-sm">Location</th>
                <th className="text-left px-6 py-3 text-gray-900 text-sm">Price</th>
                <th className="text-left px-6 py-3 text-gray-900 text-sm">Attendees</th>
                <th className="text-left px-6 py-3 text-gray-900 text-sm">Status</th>
                <th className="text-right px-6 py-3 text-gray-900 text-sm">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredConferences.map(conference => {
                const attendancePercent = (conference.currentAttendees / conference.maxAttendees) * 100;
                
                return (
                  <tr key={conference.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        <p className="text-gray-900">{conference.name}</p>
                        <div className="flex flex-wrap gap-1">
                          {conference.category.slice(0, 2).map(cat => (
                            <span key={cat} className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-xs">
                              {cat}
                            </span>
                          ))}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-600 text-sm">
                      {formatDate(conference.date)}
                    </td>
                    <td className="px-6 py-4 text-gray-600 text-sm">
                      {conference.location}
                    </td>
                    <td className="px-6 py-4 text-gray-900 text-sm">
                      ${conference.price}
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        <p className="text-gray-900 text-sm">
                          {conference.currentAttendees} / {conference.maxAttendees}
                        </p>
                        <div className="w-24 bg-gray-200 rounded-full h-1.5">
                          <div
                            className={`h-full rounded-full ${
                              attendancePercent >= 90 ? 'bg-red-500' : 
                              attendancePercent >= 70 ? 'bg-yellow-500' : 'bg-green-500'
                            }`}
                            style={{ width: `${attendancePercent}%` }}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <Badge
                        variant="outline"
                        className={
                          conference.status === 'Open' ? 'bg-green-100 text-green-800 border-green-200' :
                          conference.status === 'Sold Out' ? 'bg-red-100 text-red-800 border-red-200' :
                          'bg-gray-100 text-gray-800 border-gray-200'
                        }
                      >
                        {conference.status}
                      </Badge>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleEdit(conference)}
                        >
                          <Edit className="size-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => setDeleteConfirmId(conference.id)}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="size-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {filteredConferences.length === 0 && (
          <div className="text-center py-12 text-gray-600">
            No conferences found
          </div>
        )}
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteConfirmId !== null} onOpenChange={() => setDeleteConfirmId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Conference</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this conference? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deleteConfirmId && handleDelete(deleteConfirmId)}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
