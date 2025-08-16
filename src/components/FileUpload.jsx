import React, { useState, useRef, useCallback } from 'react';
import { Upload, X, File, Image, FileText, AlertCircle, CheckCircle, Loader } from 'lucide-react';
import { apiService } from '../services/api';
import { ErrorHandler } from '../utils/errorHandler';

const FileUpload = ({ 
  onUploadComplete, 
  onUploadError, 
  acceptedTypes = ['image/*', 'application/pdf', '.doc', '.docx', '.xls', '.xlsx'],
  maxFileSize = 10 * 1024 * 1024, // 10MB
  maxFiles = 5,
  uploadType = 'general',
  className = ''
}) => {
  const [files, setFiles] = useState([]);
  const [dragActive, setDragActive] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);

  const validateFile = (file) => {
    // Check file size
    if (file.size > maxFileSize) {
      return {
        valid: false,
        error: `File size exceeds ${Math.round(maxFileSize / (1024 * 1024))}MB limit`
      };
    }

    // Check file type
    const fileExtension = '.' + file.name.split('.').pop().toLowerCase();
    const isTypeAllowed = acceptedTypes.some(type => {
      if (type.includes('*')) {
        const mimeType = type.split('/')[0];
        return file.type.startsWith(mimeType);
      }
      return type === fileExtension || file.type === type;
    });

    if (!isTypeAllowed) {
      return {
        valid: false,
        error: 'File type not supported'
      };
    }

    return { valid: true };
  };

  const processFiles = (fileList) => {
    const newFiles = Array.from(fileList).slice(0, maxFiles - files.length);
    
    const processedFiles = newFiles.map(file => {
      const validation = validateFile(file);
      return {
        id: Math.random().toString(36).substr(2, 9),
        file,
        name: file.name,
        size: file.size,
        type: file.type,
        status: validation.valid ? 'ready' : 'error',
        error: validation.error,
        progress: 0,
        url: null
      };
    });

    setFiles(prev => [...prev, ...processedFiles]);
  };

  const handleDrag = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFiles(e.dataTransfer.files);
    }
  }, [files.length]);

  const handleFileSelect = (e) => {
    if (e.target.files && e.target.files[0]) {
      processFiles(e.target.files);
    }
  };

  const removeFile = (fileId) => {
    setFiles(prev => prev.filter(f => f.id !== fileId));
  };

  const uploadFiles = async () => {
    const filesToUpload = files.filter(f => f.status === 'ready');
    if (filesToUpload.length === 0) return;

    setUploading(true);

    try {
      const uploadPromises = filesToUpload.map(async (fileObj) => {
        // Update status to uploading
        setFiles(prev => prev.map(f => 
          f.id === fileObj.id 
            ? { ...f, status: 'uploading', progress: 0 }
            : f
        ));

        try {
          // Simulate progress updates
          const progressInterval = setInterval(() => {
            setFiles(prev => prev.map(f => 
              f.id === fileObj.id && f.progress < 90
                ? { ...f, progress: f.progress + Math.random() * 30 }
                : f
            ));
          }, 200);

          const response = await apiService.uploadFile(fileObj.file, uploadType);

          clearInterval(progressInterval);

          // Update file with success status
          setFiles(prev => prev.map(f => 
            f.id === fileObj.id 
              ? { 
                  ...f, 
                  status: 'completed', 
                  progress: 100,
                  url: response.url || response.data?.url,
                  uploadResponse: response
                }
              : f
          ));

          return { success: true, file: fileObj, response };
        } catch (error) {
          const errorInfo = ErrorHandler.getErrorMessage(error);
          
          // Update file with error status
          setFiles(prev => prev.map(f => 
            f.id === fileObj.id 
              ? { 
                  ...f, 
                  status: 'error', 
                  progress: 0,
                  error: errorInfo.message
                }
              : f
          ));

          return { success: false, file: fileObj, error: errorInfo };
        }
      });

      const results = await Promise.allSettled(uploadPromises);
      const successful = results.filter(r => r.status === 'fulfilled' && r.value.success);
      const failed = results.filter(r => r.status === 'fulfilled' && !r.value.success);

      if (onUploadComplete && successful.length > 0) {
        onUploadComplete(successful.map(r => r.value));
      }

      if (onUploadError && failed.length > 0) {
        onUploadError(failed.map(r => r.value));
      }

    } catch (error) {
      const errorInfo = ErrorHandler.getErrorMessage(error);
      if (onUploadError) {
        onUploadError([{ error: errorInfo }]);
      }
    } finally {
      setUploading(false);
    }
  };

  const getFileIcon = (fileType) => {
    if (fileType.startsWith('image/')) {
      return <Image className="w-8 h-8 text-blue-500" />;
    } else if (fileType.includes('pdf')) {
      return <FileText className="w-8 h-8 text-red-500" />;
    } else {
      return <File className="w-8 h-8 text-gray-500" />;
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Upload Area */}
      <div
        className={`
          relative border-2 border-dashed rounded-lg p-8 text-center transition-colors
          ${dragActive 
            ? 'border-blue-400 bg-blue-50' 
            : 'border-gray-300 hover:border-gray-400'
          }
          ${uploading ? 'pointer-events-none opacity-60' : 'cursor-pointer'}
        `}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple={maxFiles > 1}
          accept={acceptedTypes.join(',')}
          onChange={handleFileSelect}
          className="hidden"
        />

        <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          Drop files here or click to browse
        </h3>
        <p className="text-sm text-gray-600 mb-2">
          Supported formats: {acceptedTypes.join(', ')}
        </p>
        <p className="text-xs text-gray-500">
          Max file size: {Math.round(maxFileSize / (1024 * 1024))}MB | Max files: {maxFiles}
        </p>
      </div>

      {/* File List */}
      {files.length > 0 && (
        <div className="space-y-3">
          <h4 className="font-medium text-gray-900">Files to upload</h4>
          {files.map(file => (
            <div key={file.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              {getFileIcon(file.type)}
              
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {file.name}
                </p>
                <p className="text-xs text-gray-500">
                  {formatFileSize(file.size)}
                </p>
                
                {/* Progress Bar */}
                {file.status === 'uploading' && (
                  <div className="mt-2">
                    <div className="bg-gray-200 rounded-full h-1.5">
                      <div 
                        className="bg-blue-500 h-1.5 rounded-full transition-all duration-300"
                        style={{ width: `${file.progress}%` }}
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      Uploading... {Math.round(file.progress)}%
                    </p>
                  </div>
                )}

                {/* Error Message */}
                {file.status === 'error' && (
                  <p className="text-xs text-red-600 mt-1 flex items-center">
                    <AlertCircle className="w-3 h-3 mr-1" />
                    {file.error}
                  </p>
                )}
              </div>

              {/* Status Icon */}
              <div className="flex items-center space-x-2">
                {file.status === 'uploading' && (
                  <Loader className="w-5 h-5 text-blue-500 animate-spin" />
                )}
                {file.status === 'completed' && (
                  <CheckCircle className="w-5 h-5 text-green-500" />
                )}
                {file.status === 'error' && (
                  <AlertCircle className="w-5 h-5 text-red-500" />
                )}
                
                {/* Remove Button */}
                {(file.status === 'ready' || file.status === 'error') && (
                  <button
                    onClick={() => removeFile(file.id)}
                    className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          ))}

          {/* Upload Button */}
          {files.some(f => f.status === 'ready') && (
            <div className="flex justify-end">
              <button
                onClick={uploadFiles}
                disabled={uploading}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
              >
                {uploading ? (
                  <>
                    <Loader className="w-4 h-4 mr-2 animate-spin" />
                    Uploading...
                  </>
                ) : (
                  <>
                    <Upload className="w-4 h-4 mr-2" />
                    Upload Files
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FileUpload;
