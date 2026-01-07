# Hero Section Image Optimization Guide

## 📸 **Recommended Image Specifications**

### **Format & Quality**
- **Format**: Use **WebP** (best) or **JPEG** (fallback)
- **Quality**: 85-90% (balance between quality and file size)
- **Color Profile**: sRGB
- **Avoid**: PNG (unless transparency needed), HEIC, RAW files

### **Dimensions & File Sizes**

#### **Option 1: Sanity CMS (Recommended)**
Upload full-resolution images to Sanity - they'll be automatically optimized:
- **Left Image**: 2400px × 3000px (portrait/vertical)
- **Right Image**: 2400px × 3000px (portrait/vertical)
- **File Size**: Keep under 5MB per image before upload
- Sanity will generate multiple sizes automatically

#### **Option 2: Local Files (Alternative)**
If using local files in `/public` folder:
- **Desktop**: 1920px × 1080px (landscape) or 1200px × 1600px (portrait)
- **Mobile**: 800px × 1200px
- **File Size**: 
  - Desktop: 200-400KB per image
  - Mobile: 100-200KB per image

### **Aspect Ratios**
- **Split-screen layout**: 1:1 or 4:5 ratio works best
- **Mobile stacked**: 3:4 or 4:5 ratio

---

## 🚀 **How to Provide Images**

### **Method 1: Sanity CMS (Best for Performance)**

1. **Upload to Sanity Studio**:
   - Go to your Sanity Studio
   - Create a new "Hero Images" document type (or use existing)
   - Upload both images
   - Sanity automatically:
     - Converts to WebP
     - Generates multiple sizes
     - Serves via CDN
     - Provides responsive images

2. **Image Requirements**:
   - Upload original high-quality images (up to 10MB)
   - Sanity handles all optimization
   - Images are served from `cdn.sanity.io` (fast CDN)

3. **Benefits**:
   - ✅ Automatic optimization
   - ✅ CDN delivery (fast worldwide)
   - ✅ Responsive images
   - ✅ Lazy loading support
   - ✅ No build-time processing

### **Method 2: Local Files (If Not Using Sanity)**

1. **Optimize Before Adding**:
   ```bash
   # Use tools like:
   - Squoosh.app (online)
   - ImageOptim (Mac)
   - TinyPNG (online)
   - Sharp (CLI tool)
   ```

2. **File Structure**:
   ```
   public/
     hero/
       hero-left.webp
       hero-left-mobile.webp
       hero-right.webp
       hero-right-mobile.webp
   ```

3. **Provide Both Sizes**:
   - Desktop version (larger)
   - Mobile version (smaller, cropped if needed)

---

## 📐 **Recommended Image Dimensions**

### **For Split-Screen Hero (Desktop)**
- **Each half**: 960px × 1200px (or 1920px × 2400px for retina)
- **Aspect Ratio**: 4:5 or 3:4
- **File Size**: 300-500KB per image (WebP)

### **For Mobile (Stacked)**
- **Each image**: 800px × 1000px
- **Aspect Ratio**: 4:5
- **File Size**: 150-250KB per image (WebP)

---

## 🎨 **Image Content Guidelines**

### **Left Image (Lifestyle/Storytelling)**
- Wide or medium shot
- Shows emotion, connection, atmosphere
- Good depth of field
- Natural lighting preferred

### **Right Image (Intimate/Close-up)**
- Close-up or detail shot
- Focus on hands, faces, details
- Emotional moment
- Soft, cinematic lighting

### **Color Consistency**
- Both images should have similar color temperature
- Consider slight color grading for cohesion
- Ensure text overlay will be readable

---

## ⚡ **Performance Best Practices**

### **1. Use Next.js Image Component**
```tsx
<Image
  src={imageUrl}
  alt="Description"
  fill
  priority // For hero images (above fold)
  sizes="(max-width: 768px) 100vw, 50vw"
  quality={90}
  className="object-cover"
/>
```

### **2. Implement Responsive Images**
- Desktop: Full resolution
- Tablet: Medium resolution
- Mobile: Smaller, optimized version

### **3. Lazy Loading Strategy**
- Hero images: Use `priority` prop (load immediately)
- Other images: Let Next.js lazy load automatically

### **4. Preload Critical Images**
```tsx
// In layout.tsx or page.tsx
<link
  rel="preload"
  as="image"
  href="/hero/hero-left.webp"
/>
```

---

## 📦 **How to Send Me the Images**

### **Option A: Sanity CMS (Recommended)**
1. Upload images to Sanity Studio
2. Share the document IDs or image references
3. I'll query them and implement the hero section

### **Option B: Cloud Storage**
1. Upload to:
   - Google Drive
   - Dropbox
   - WeTransfer
   - Or any cloud storage
2. Share the download links
3. I'll download, optimize, and add to the project

### **Option C: Direct Upload**
1. Send via email/chat if file size allows
2. I'll optimize and add to the project

---

## 🔧 **Image Optimization Tools**

### **Online Tools**
- **Squoosh.app** - Google's image optimizer (best)
- **TinyPNG** - Simple compression
- **ImageOptim** - Mac app
- **Compressor.io** - Online tool

### **CLI Tools**
```bash
# Using Sharp (Node.js)
npx sharp-cli -i input.jpg -o output.webp -q 90

# Using ImageMagick
convert input.jpg -quality 90 -resize 1920x output.webp
```

---

## ✅ **Checklist Before Sending Images**

- [ ] Images are in WebP or high-quality JPEG format
- [ ] Each image is under 5MB (before optimization)
- [ ] Images are properly exposed and color-corrected
- [ ] Text overlay areas have good contrast
- [ ] Images match the aspect ratios mentioned
- [ ] Both images have consistent color grading
- [ ] Mobile versions are cropped/optimized separately (if not using Sanity)

---

## 🎯 **Recommended Workflow**

1. **Choose your 2 hero images** (left: lifestyle, right: intimate)
2. **Upload to Sanity CMS** (easiest and best performance)
3. **Provide me with**:
   - The image references from Sanity, OR
   - The image URLs, OR
   - The document IDs
4. **I'll implement**:
   - Split-screen layout
   - Responsive design
   - Text overlay
   - Smooth animations
   - Performance optimizations

---

## 💡 **Pro Tips**

1. **Use Sanity CMS**: It's already set up and handles all optimization automatically
2. **Test on slow connections**: Use Chrome DevTools to simulate 3G
3. **Monitor Core Web Vitals**: Ensure images don't block LCP (Largest Contentful Paint)
4. **Consider blur placeholders**: Use Next.js blurDataURL for smooth loading
5. **A/B test image sizes**: Find the sweet spot between quality and speed

---

**Ready to implement once you provide the images!** 🚀

