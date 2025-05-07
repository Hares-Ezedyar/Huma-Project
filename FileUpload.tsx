import React from 'react';

interface FileUploadProps {
  onFileSelect?: (files: FileList) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ onFileSelect }) => {
  const [isDragging, setIsDragging] = React.useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      if (onFileSelect) {
        onFileSelect(e.dataTransfer.files);
      }
    }
  };

  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      if (onFileSelect) {
        onFileSelect(e.target.files);
      }
    }
  };

  return (
    <div 
      className={`mt-6 p-6 border-2 border-dashed ${
        isDragging ? 'border-discord-accent' : 'border-discord-muted'
      } rounded-lg text-center cursor-pointer transition-colors duration-200`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={handleClick}
    >
      <div className="text-3xl mb-3">📤</div>
      <div>برای آپلود مدارک و شواهد اینجا کلیک کنید یا فایل را بکشید و رها کنید</div>
      <div className="mt-2 text-discord-muted text-sm">
        پشتیبانی از فرمت‌های JPG، PNG، PDF (حداکثر 20MB)
      </div>
      <input 
        type="file" 
        ref={fileInputRef} 
        className="hidden" 
        onChange={handleFileChange}
        multiple
        accept=".jpg,.jpeg,.png,.pdf"
      />
    </div>
  );
};

export default FileUpload;
