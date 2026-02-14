'use client';

import { ProjectPhoto } from '@/lib/types';
import Image from 'next/image';
import { useState } from 'react';
import { cn } from '@/lib/utils';

interface PhotoGalleryProps {
  photos: ProjectPhoto[];
  className?: string;
}

export function PhotoGallery({ photos, className }: PhotoGalleryProps) {
  const [selectedPhoto, setSelectedPhoto] = useState<ProjectPhoto | null>(
    photos.length > 0 ? photos[0] : null
  );

  if (photos.length === 0) {
    return null;
  }

  return (
    <section className={cn('space-y-6', className)}>
      <div>
        <h2 className="text-2xl font-bold text-foreground">Gallery</h2>
        <p className="text-muted-foreground mt-1">Project screenshots and media</p>
      </div>

      <div className="space-y-4">
        {/* Main display */}
        <div className="relative w-full aspect-video bg-secondary rounded-lg overflow-hidden">
          {selectedPhoto && (
            <Image
              src={selectedPhoto.photo_url}
              alt={selectedPhoto.caption || 'Project photo'}
              fill
              className="object-cover"
            />
          )}
        </div>

        {/* Caption */}
        {selectedPhoto?.caption && (
          <p className="text-sm text-muted-foreground">{selectedPhoto.caption}</p>
        )}

        {/* Thumbnails grid */}
        <div className="grid grid-cols-3 md:grid-cols-5 gap-2">
          {photos.map(photo => (
            <button
              key={photo.id}
              onClick={() => setSelectedPhoto(photo)}
              className={cn(
                'relative aspect-square rounded-md overflow-hidden border-2 transition-all',
                selectedPhoto?.id === photo.id
                  ? 'border-primary'
                  : 'border-border hover:border-muted-foreground'
              )}
            >
              <Image
                src={photo.photo_url}
                alt={photo.caption || 'Thumbnail'}
                fill
                className="object-cover"
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

export default PhotoGallery;
