# Aircmate Feature Documentation

## MD Articles Feature - English Interface

### Overview
The MD Articles feature allows users to view detailed technical articles in Markdown format alongside regular upgrade records. This feature has been enhanced to provide a fully English interface without user avatars.

### Key Features

#### 1. Article Display
- **Mixed Content Display**: Articles and upgrade records are displayed together in search results
- **Article Identification**: Articles are clearly marked with "Article" labels and distinct styling
- **Click Navigation**: Users can click on article cards to view full content

#### 2. Article Detail Page
- **Clean Interface**: No user avatars for cleaner, more professional appearance
- **Full English Interface**: All text, labels, and messages in English
- **Responsive Design**: Optimized for desktop and mobile viewing
- **Breadcrumb Navigation**: Easy navigation back to home or model pages
- **Share Functionality**: Built-in sharing capabilities

#### 3. Technical Implementation
- **Markdown Rendering**: Custom MarkdownRenderer component for parsing and displaying MD content
- **Path Handling**: Proper handling of public directory resources
- **Image Support**: Correct loading of images from public/uploads directory
- **Error Handling**: Graceful error messages in English

### File Structure
```
public/
├── articles/
│   └── traxxas-slash-2wd-guide.md
├── uploads/
│   └── md_test_img.png

src/
├── components/
│   └── MarkdownRenderer.vue
├── views/
│   └── ArticleDetail.vue
└── data/
    └── hotParts.json (contains article records)
```

### Article Data Structure
Articles are stored in `hotParts.json` with the following structure:

```json
{
  "id": 201,
  "type": "article",
  "modelId": 1,
  "title": "Traxxas Slash 2WD Ultimate Upgrade Guide",
  "description": "Complete Traxxas Slash 2WD upgrade tutorial with detailed steps and images",
  "mdPath": "/articles/traxxas-slash-2wd-guide.md",
  "coverImage": "/uploads/md_test_img.png",
  "author": "RC Expert",
  "readTime": "15 minutes",
  "difficulty": 3,
  "source": "https://github.com/bairdweng/aircmate",
  "submitter": "System Administrator",
  "timestamp": "2024-12-20 10:30:00",
  "approved": true,
  "modelInfo": {
    "brand": "Traxxas",
    "model": "Slash 2WD",
    "fullName": "Traxxas Slash 2WD"
  }
}
```

### UI Components

#### ArticleDetail.vue
- **Purpose**: Display full article content
- **Features**:
  - English breadcrumb navigation
  - Article metadata (author, publish date, difficulty, read time)
  - Share functionality
  - Back to top button
  - 404 error handling

#### MarkdownRenderer.vue
- **Purpose**: Parse and render Markdown content
- **Features**:
  - Custom Markdown parsing
  - Image path handling
  - Error messages in English
  - Responsive styling

### Access URLs
- **Local Development**: http://localhost:5173/aircmate/
- **Network Access**: http://192.168.3.7:5173/aircmate/

### Recent Enhancements
1. **Removed User Avatars**: Cleaner interface without profile pictures
2. **Full English Interface**: All text converted to English
3. **Improved Error Handling**: Better user experience with clear error messages
4. **Enhanced Path Handling**: Fixed 404 errors for MD files and images

### Browser Compatibility
- Modern browsers with ES6+ support
- Mobile-responsive design
- Share API support (where available)

### Future Improvements
- Integration with markdown parsing libraries
- Enhanced article search functionality
- Article categories and tags
- User comments and ratings
- Article versioning