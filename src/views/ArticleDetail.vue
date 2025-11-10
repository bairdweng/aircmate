<template>
  <div class="article-detail">
    <div v-if="loading" class="loading-container">
      <n-spin size="large">
        <template #description>
          Loading article...
        </template>
      </n-spin>
    </div>
    
    <div v-else-if="article" class="article-content">
      <!-- 文章头部 -->
      <div class="article-header">
        <n-breadcrumb>
          <n-breadcrumb-item @click="$router.push('/')">
            Home
          </n-breadcrumb-item>
          <n-breadcrumb-item @click="goToModelSearch(article.modelInfo.brand, article.modelInfo.model)">
            {{ article.modelInfo.brand }} {{ article.modelInfo.model }}
          </n-breadcrumb-item>
          <n-breadcrumb-item>
            {{ article.title }}
          </n-breadcrumb-item>
        </n-breadcrumb>
        
        <h1 class="article-title">{{ article.title }}</h1>
        
        <div class="article-meta">
          <div class="meta-left">
            <span class="author">{{ article.author }}</span>
            <n-time :time="new Date(article.timestamp)" type="relative" />
            <n-tag :type="getDifficultyType(article.difficulty)" size="small">
              Difficulty: {{ article.difficulty }}
            </n-tag>
          </div>
          
          <div class="meta-right">
            <n-space>
              <n-button text @click="handleBack">
                <template #icon>
                  <n-icon>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24">
                      <path fill="currentColor" d="M15.41 7.41L14 6l-6 6l6 6l1.41-1.41L10.83 12z"/>
                    </svg>
                  </n-icon>
                </template>
                Back
              </n-button>
              <n-button type="primary" @click="handleShare">
                <template #icon>
                  <n-icon>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24">
                      <path fill="currentColor" d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81c1.66 0 3-1.34 3-3s-1.34-3-3-3s-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65c0 1.61 1.31 2.92 2.92 2.92c1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z"/>
                    </svg>
                  </n-icon>
                </template>
                Share
              </n-button>
            </n-space>
          </div>
        </div>
      </div>
      
      <!-- 文章内容 -->
      <div class="article-body">
        <MarkdownRenderer :mdPath="article.mdPath" />
      </div>
      
      <!-- 文章底部 -->
      <div class="article-footer">
        <n-divider />
        <div class="footer-content">
          <div class="footer-left">
            <span>Published {{ formatDate(article.timestamp) }}</span>
            <span>•</span>
            <span>Read time: {{ article.readTime }}</span>
          </div>
          <div class="footer-right">
            <n-button text @click="scrollToTop">
              Back to top
            </n-button>
          </div>
        </div>
      </div>
    </div>
    
    <div v-else class="error-container">
      <n-result
        status="404"
        title="Article Not Found"
        description="Sorry, the article you are looking for does not exist or has been deleted"
      >
        <template #footer>
          <n-button type="primary" @click="$router.push('/')">
            Back to Home
          </n-button>
        </template>
      </n-result>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { NSpin, NBreadcrumb, NBreadcrumbItem, NAvatar, NTime, NTag, NButton, NSpace, NIcon, NDivider, NResult } from 'naive-ui'
import MarkdownRenderer from '../components/MarkdownRenderer.vue'
import hotPartsData from '../data/hotParts.json'

export default {
  name: 'ArticleDetail',
  components: {
    NSpin,
    NBreadcrumb,
    NBreadcrumbItem,
    NAvatar,
    NTime,
    NTag,
    NButton,
    NSpace,
    NIcon,
    NDivider,
    NResult,
    MarkdownRenderer
  },
  setup() {
    const route = useRoute()
    const router = useRouter()
    const article = ref(null)
    const loading = ref(true)
    
    const getDifficultyType = (difficulty) => {
      const types = ['success', 'info', 'warning', 'error']
      return types[Math.min(difficulty - 1, types.length - 1)] || 'default'
    }
    
    const formatDate = (timestamp) => {
      return new Date(timestamp).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    }
    
    const handleBack = () => {
      router.back()
    }
    
    const handleShare = () => {
      if (navigator.share) {
        navigator.share({
          title: article.value.title,
          text: article.value.description,
          url: window.location.href
        })
      } else {
        // Copy link to clipboard
        navigator.clipboard.writeText(window.location.href)
        window.$message?.success('Link copied to clipboard')
      }
    }
    
    const scrollToTop = () => {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
    
    const goToModelSearch = (brand, model) => {
      // 将品牌和车型转换为URL友好的格式
      const brandSlug = brand.toLowerCase().replace(/\s+/g, '-')
      const modelSlug = model.toLowerCase().replace(/\s+/g, '-')
      router.push(`/upgrade-parts/${brandSlug}/${modelSlug}`)
    }
    
    onMounted(() => {
      const articleId = parseInt(route.params.id)
      
      // 查找文章数据
      const foundArticle = hotPartsData.upgradeRecords.find(
        record => record.id === articleId && record.type === 'article'
      )
      
      if (foundArticle) {
        article.value = foundArticle
      }
      
      loading.value = false
    })
    
    return {
      article,
      loading,
      getDifficultyType,
      formatDate,
      handleBack,
      handleShare,
      scrollToTop,
      goToModelSearch
    }
  }
}
</script>

<style scoped>
.article-detail {
  max-width: 900px;
  margin: 0 auto;
  padding: 2rem 1rem;
}

.loading-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60vh;
}

.article-header {
  margin-bottom: 2rem;
}

.article-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: #ffffff;
  margin: 1rem 0;
  line-height: 1.2;
}

.article-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 1.5rem 0;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  backdrop-filter: blur(10px);
}

.meta-left {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.meta-left .author {
  font-weight: 600;
  color: rgba(255, 255, 255, 0.8);
}

.article-description {
  font-size: 1.1rem;
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.6;
  margin: 1rem 0;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  border-left: 4px solid #3498db;
  backdrop-filter: blur(10px);
}

.article-body {
  margin: 2rem 0;
  min-height: 400px;
}

.article-footer {
  margin-top: 3rem;
}

.footer-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #6c757d;
  font-size: 0.9rem;
}

.footer-left {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.error-container {
  margin-top: 4rem;
}

@media (max-width: 768px) {
  .article-detail {
    padding: 1rem 0.5rem;
  }
  
  .article-title {
    font-size: 2rem;
  }
  
  .article-meta {
    flex-direction: column;
    gap: 1rem;
    align-items: flex-start;
  }
  
  .footer-content {
    flex-direction: column;
    gap: 1rem;
    align-items: flex-start;
  }
}
</style>