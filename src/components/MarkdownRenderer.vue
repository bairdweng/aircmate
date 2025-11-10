<template>
  <div class="markdown-content" v-html="renderedContent"></div>
</template>

<script>
import { ref, onMounted, watch } from 'vue'

export default {
  name: 'MarkdownRenderer',
  props: {
    mdPath: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const renderedContent = ref('')
    
    const loadMarkdown = async (path) => {
      try {
        // 处理路径：移除开头的斜杠，确保从public目录开始
        const cleanPath = path.startsWith('/') ? path.slice(1) : path
        
        // 构建正确的URL路径
        const baseUrl = import.meta.env.BASE_URL || '/'
        const fullPath = `${baseUrl}${cleanPath}`
        
        console.log('加载MD文件路径:', fullPath)
        
        const response = await fetch(fullPath)
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const markdown = await response.text()
        
        // 简单的Markdown解析（后续可以集成marked.js）
        // 同时修复图片路径，确保图片也从public目录正确加载
        const html = markdown
          .replace(/^### (.*$)/gim, '<h3>$1</h3>')
          .replace(/^## (.*$)/gim, '<h2>$1</h2>')
          .replace(/^# (.*$)/gim, '<h1>$1</h1>')
          .replace(/\*\*(.*)\*\*/gim, '<strong>$1</strong>')
          .replace(/\*(.*)\*/gim, '<em>$1</em>')
          .replace(/!\[(.*?)\]\((.*?)\)/gim, (match, alt, src) => {
            // 处理图片路径，确保从public目录开始
            const cleanSrc = src.startsWith('/') ? src.slice(1) : src
            return `<img src="${baseUrl}${cleanSrc}" alt="${alt}" />`
          })
          .replace(/\[(.*?)\]\((.*?)\)/gim, '<a href="$2" target="_blank">$1</a>')
          .replace(/\n/gim, '<br />')
        
        renderedContent.value = html
      } catch (error) {
        console.error('加载MD文件失败:', error)
        renderedContent.value = '<p class="error">Failed to load article, please try again later</p>'
      }
    }
    
    onMounted(() => {
      loadMarkdown(props.mdPath)
    })
    
    watch(() => props.mdPath, (newPath) => {
      loadMarkdown(newPath)
    })
    
    return { renderedContent }
  }
}
</script>

<style scoped>
.markdown-content {
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.9);
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 2rem;
  margin: 1rem 0;
  backdrop-filter: blur(10px);
}

.markdown-content h1 {
  font-size: 2rem;
  margin: 1.5rem 0 1rem;
  color: #ffffff;
  border-bottom: 2px solid #3498db;
  padding-bottom: 0.5rem;
}

.markdown-content h2 {
  font-size: 1.5rem;
  margin: 1.25rem 0 0.75rem;
  color: rgba(255, 255, 255, 0.9);
}

.markdown-content h3 {
  font-size: 1.25rem;
  margin: 1rem 0 0.5rem;
  color: rgba(255, 255, 255, 0.8);
}

.markdown-content img {
  max-width: 100%;
  height: auto;
  border-radius: 8px;
  margin: 1rem 0;
  box-shadow: 0 4px 12px rgba(0,0,0,0.3);
}

.markdown-content strong {
  font-weight: 600;
  color: #ff6b6b;
}

.markdown-content em {
  font-style: italic;
  color: #51cf66;
}

.markdown-content a {
  color: #4dabf7;
  text-decoration: none;
  font-weight: 500;
}

.markdown-content a:hover {
  text-decoration: underline;
  color: #339af0;
}

.markdown-content .error {
  color: #ff6b6b;
  text-align: center;
  padding: 2rem;
  background: rgba(255, 107, 107, 0.1);
  border: 1px solid rgba(255, 107, 107, 0.3);
  border-radius: 8px;
}
</style>