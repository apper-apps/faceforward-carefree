import mockPhotos from "@/services/mockData/photos.json";

let photos = [...mockPhotos];

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const photoService = {
  async getAll() {
    await delay(300);
    return [...photos];
  },

  async getById(id) {
    await delay(200);
    const photo = photos.find(p => p.Id === id);
    if (!photo) {
      throw new Error("Photo not found");
    }
    return { ...photo };
  },

  async create(photoData) {
    await delay(400);
    const maxId = photos.reduce((max, photo) => Math.max(max, photo.Id), 0);
    const newPhoto = {
      Id: maxId + 1,
      originalUrl: photoData.originalUrl || "",
      editedUrl: photoData.editedUrl || photoData.originalUrl || "",
      adjustments: photoData.adjustments || {
        brightness: 50,
        contrast: 50,
        saturation: 50,
        filterType: "none",
        filterIntensity: 0
      },
      background: photoData.background || "#ffffff",
      filter: photoData.filter || "none",
      cropData: photoData.cropData || null,
      timestamp: Date.now()
    };
    photos.push(newPhoto);
    return { ...newPhoto };
  },

  async update(id, photoData) {
    await delay(300);
    const index = photos.findIndex(p => p.Id === id);
    if (index === -1) {
      throw new Error("Photo not found");
    }
    
    photos[index] = {
      ...photos[index],
      ...photoData,
      Id: id
    };
    
    return { ...photos[index] };
  },

  async delete(id) {
    await delay(250);
    const index = photos.findIndex(p => p.Id === id);
    if (index === -1) {
      throw new Error("Photo not found");
    }
    
    const deletedPhoto = { ...photos[index] };
    photos.splice(index, 1);
    return deletedPhoto;
  },

  async processImage(imageData, adjustments) {
    await delay(500);
    // Simulate image processing
    return {
      processedUrl: imageData.originalUrl,
      adjustments: adjustments,
      timestamp: Date.now()
    };
  },

  async applyBackground(imageData, background) {
    await delay(400);
    // Simulate background processing
    return {
      processedUrl: imageData.originalUrl,
      background: background,
      timestamp: Date.now()
    };
  },

  async applyFilter(imageData, filter) {
    await delay(350);
    // Simulate filter processing
    return {
      processedUrl: imageData.originalUrl,
      filter: filter,
      timestamp: Date.now()
    };
  }
};