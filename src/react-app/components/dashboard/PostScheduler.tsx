import React, { useState } from 'react';
import { Calendar, Clock, Image, Hash, Play, Plus, Edit, Trash2 } from 'lucide-react';

interface ScheduledPost {
  id: string;
  imageUrl: string;
  caption: string;
  hashtags: string[];
  scheduledFor: Date;
  status: 'scheduled' | 'published' | 'failed';
}

const PostScheduler: React.FC = () => {
  const [showForm, setShowForm] = useState(false);
  const [editingPost, setEditingPost] = useState<ScheduledPost | null>(null);
  const [formData, setFormData] = useState({
    imageUrl: '',
    caption: '',
    hashtags: '',
    date: '',
    time: ''
  });

  // Mock data for scheduled posts
  const [scheduledPosts, setScheduledPosts] = useState<ScheduledPost[]>([
    {
      id: '1',
      imageUrl: 'https://placehold.co/400',
      caption: 'Novo produto incrível chegando em breve!',
      hashtags: ['novidade', 'produto', 'lançamento'],
      scheduledFor: new Date(Date.now() + 24 * 60 * 60 * 1000), // 1 dia no futuro
      status: 'scheduled'
    },
    {
      id: '2',
      imageUrl: 'https://placehold.co/400',
      caption: 'Promoção imperdível esta semana!',
      hashtags: ['promoção', 'oferta', 'desconto'],
      scheduledFor: new Date(Date.now() + 48 * 60 * 60 * 1000), // 2 dias no futuro
      status: 'scheduled'
    }
  ]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const scheduledDateTime = new Date(`${formData.date}T${formData.time}`);
    
    if (editingPost) {
      setScheduledPosts(prev => 
        prev.map(post => 
          post.id === editingPost.id 
            ? {
                ...post,
                imageUrl: formData.imageUrl,
                caption: formData.caption,
                hashtags: formData.hashtags.split(',').map(tag => tag.trim()).filter(tag => tag),
                scheduledFor: scheduledDateTime
              }
            : post
        )
      );
    } else {
      const newPost: ScheduledPost = {
        id: `post_${Date.now()}`,
        imageUrl: formData.imageUrl,
        caption: formData.caption,
        hashtags: formData.hashtags.split(',').map(tag => tag.trim()).filter(tag => tag),
        scheduledFor: scheduledDateTime,
        status: 'scheduled'
      };
      setScheduledPosts(prev => [...prev, newPost]);
    }
    
    resetForm();
  };

  const handleEdit = (post: ScheduledPost) => {
    setEditingPost(post);
    setFormData({
      imageUrl: post.imageUrl,
      caption: post.caption,
      hashtags: post.hashtags.join(', '),
      date: post.scheduledFor.toISOString().split('T')[0],
      time: post.scheduledFor.toTimeString().slice(0, 5)
    });
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Tem certeza que deseja excluir este agendamento?')) {
      setScheduledPosts(prev => prev.filter(post => post.id !== id));
    }
  };

  const resetForm = () => {
    setEditingPost(null);
    setFormData({
      imageUrl: '',
      caption: '',
      hashtags: '',
      date: '',
      time: ''
    });
    setShowForm(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled': return 'bg-blue-100 text-blue-800';
      case 'published': return 'bg-green-100 text-green-800';
      case 'failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Agendamento de Posts
          </h3>
          <button
            onClick={() => setShowForm(!showForm)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Novo Agendamento
          </button>
        </div>
      </div>

      {showForm && (
        <div className="p-6 border-b border-gray-200">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                URL da Imagem
              </label>
              <input
                type="url"
                value={formData.imageUrl}
                onChange={(e) => setFormData(prev => ({ ...prev, imageUrl: e.target.value }))}
                placeholder="https://exemplo.com/imagem.jpg"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Legenda
              </label>
              <textarea
                value={formData.caption}
                onChange={(e) => setFormData(prev => ({ ...prev, caption: e.target.value }))}
                placeholder="Escreva a legenda do seu post..."
                rows={3}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Hashtags (separadas por vírgula)
              </label>
              <input
                type="text"
                value={formData.hashtags}
                onChange={(e) => setFormData(prev => ({ ...prev, hashtags: e.target.value }))}
                placeholder="ex: instagram, marketing, automação"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Data
                </label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Hora
                </label>
                <input
                  type="time"
                  value={formData.time}
                  onChange={(e) => setFormData(prev => ({ ...prev, time: e.target.value }))}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={resetForm}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                {editingPost ? 'Atualizar' : 'Agendar'} Post
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="divide-y divide-gray-200">
        {scheduledPosts.length === 0 ? (
          <div className="p-12 text-center">
            <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h4 className="text-lg font-medium text-gray-800 mb-2">Nenhum post agendado</h4>
            <p className="text-gray-600 mb-4">
              Agende seus posts para serem publicados automaticamente
            </p>
            <button
              onClick={() => setShowForm(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Agendar Primeiro Post
            </button>
          </div>
        ) : (
          scheduledPosts.map((post) => (
            <div key={post.id} className="p-6">
              <div className="flex items-start gap-4">
                <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16" />
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-gray-800">Post agendado</h4>
                    <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(post.status)}`}>
                      {post.status === 'scheduled' && 'Agendado'}
                      {post.status === 'published' && 'Publicado'}
                      {post.status === 'failed' && 'Falhou'}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{post.caption}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-3">
                    {post.hashtags.map((tag, index) => (
                      <span 
                        key={index} 
                        className="inline-flex items-center px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                      >
                        <Hash className="w-3 h-3 mr-1" />
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <div className="flex items-center">
                        <Calendar className="w-3 h-3 mr-1" />
                        {post.scheduledFor.toLocaleDateString('pt-BR')}
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-3 h-3 mr-1" />
                        {post.scheduledFor.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleEdit(post)}
                        className="p-2 text-gray-400 hover:text-blue-600 hover:bg-gray-100 rounded-lg"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(post.id)}
                        className="p-2 text-gray-400 hover:text-red-600 hover:bg-gray-100 rounded-lg"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default PostScheduler;