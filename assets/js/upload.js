/**
 * Avatar Upload & Image Optimization Engine
 * Supports: Click upload, Drag-and-drop, Canvas auto-compression (protects localStorage quota)
 */

let currentAvatarBase64 = '';
let onAvatarChangeCallback = null;

export function initAvatarUpload(onAvatarChange) {
  onAvatarChangeCallback = onAvatarChange;

  const container = document.getElementById('avatarUploadContainer');
  const input = document.getElementById('avatarInput');
  const removeBtn = document.getElementById('removeAvatarBtn');
  const previewImg = document.getElementById('avatarImage');
  const placeholder = document.getElementById('avatarPlaceholder');
  const previewBox = document.getElementById('avatarPreviewBox');

  if (!container || !input) return;

  // Click to upload
  container.addEventListener('click', (e) => {
    if (e.target !== removeBtn && !removeBtn.contains(e.target)) {
      input.click();
    }
  });

  // Drag & drop handlers
  ['dragenter', 'dragover'].forEach(eventName => {
    container.addEventListener(eventName, (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (previewBox) {
        previewBox.classList.add('border-indigo-500', 'scale-105', 'bg-indigo-500/10');
      }
    }, false);
  });

  ['dragleave', 'drop'].forEach(eventName => {
    container.addEventListener(eventName, (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (previewBox) {
        previewBox.classList.remove('border-indigo-500', 'scale-105', 'bg-indigo-500/10');
      }
    }, false);
  });

  container.addEventListener('drop', (e) => {
    const dt = e.dataTransfer;
    const files = dt.files;
    if (files && files.length > 0) {
      processFile(files[0]);
    }
  });

  // Input change
  input.addEventListener('change', (e) => {
    if (e.target.files && e.target.files.length > 0) {
      processFile(e.target.files[0]);
    }
  });

  // Remove avatar
  if (removeBtn) {
    removeBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      e.preventDefault();
      setAvatar('');
    });
  }

  function processFile(file) {
    if (!file.type.startsWith('image/')) {
      alert('অনুগ্রহ করে শুধুমাত্র ছবির ফাইল (JPG, PNG, WebP) নির্বাচন করুন।');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        // Compress using canvas to max 256x256
        const canvas = document.createElement('canvas');
        const MAX_SIZE = 256;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > MAX_SIZE) {
            height = Math.round((height * MAX_SIZE) / width);
            width = MAX_SIZE;
          }
        } else {
          if (height > MAX_SIZE) {
            width = Math.round((width * MAX_SIZE) / height);
            height = MAX_SIZE;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);

        // Export as JPEG/WebP data URL with 0.85 quality
        const optimizedDataUrl = canvas.toDataURL('image/jpeg', 0.85);
        setAvatar(optimizedDataUrl);
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
  }

  function setAvatar(base64Str) {
    currentAvatarBase64 = base64Str;
    input.value = '';

    if (base64Str) {
      if (previewImg) {
        previewImg.src = base64Str;
        previewImg.classList.remove('hidden');
      }
      if (placeholder) placeholder.classList.add('hidden');
      if (removeBtn) removeBtn.classList.remove('hidden');
    } else {
      if (previewImg) {
        previewImg.src = '';
        previewImg.classList.add('hidden');
      }
      if (placeholder) placeholder.classList.remove('hidden');
      if (removeBtn) removeBtn.classList.add('hidden');
    }

    if (typeof onAvatarChangeCallback === 'function') {
      onAvatarChangeCallback(currentAvatarBase64);
    }
  }
}

export function getCurrentAvatar() {
  return currentAvatarBase64;
}

export function setInitialAvatar(base64Str) {
  currentAvatarBase64 = base64Str || '';
  const previewImg = document.getElementById('avatarImage');
  const placeholder = document.getElementById('avatarPlaceholder');
  const removeBtn = document.getElementById('removeAvatarBtn');

  if (base64Str) {
    if (previewImg) {
      previewImg.src = base64Str;
      previewImg.classList.remove('hidden');
    }
    if (placeholder) placeholder.classList.add('hidden');
    if (removeBtn) removeBtn.classList.remove('hidden');
  } else {
    if (previewImg) {
      previewImg.src = '';
      previewImg.classList.add('hidden');
    }
    if (placeholder) placeholder.classList.remove('hidden');
    if (removeBtn) removeBtn.classList.add('hidden');
  }
}

export function resetAvatarUpload() {
  setInitialAvatar('');
  currentAvatarBase64 = '';
}

