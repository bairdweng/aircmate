<template>
  <div class="upgrade-record-card" :class="{ 'article-card': isArticle }" @click="handleCardClick">
    <!-- Article type identifier -->
    <div v-if="isArticle" class="article-badge">
      <n-tag type="primary" size="small" class="article-tag">
        <template #icon>
          <n-icon>
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24">
              <path fill="currentColor" d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zM7 10h2v7H7zm4-3h2v10h-2zm4 6h2v4h-2z"/>
            </svg>
          </n-icon>
        </template>
        📖 Article
      </n-tag>
    </div>
    
    <div class="card-header">
      <div class="part-name">{{ record.part }}</div>
      <div class="difficulty-rating">
        <span v-for="star in 5" :key="star" class="star" :class="{ active: star <= record.difficulty }">
          ★
        </span>
      </div>
    </div>
    
    <div v-if="isArticle" class="article-description">
      {{ record.description }}
    </div>
    
    <div v-else class="upgrade-spec">{{ record.upgrade_spec }}</div>
    
    <div v-if="!isArticle" class="upgrade-reason">{{ record.reason }}</div>
    
    <div class="card-footer">
      <div class="submitter-info">
        <span class="submitter">{{ record.submitter || 'Anonymous' }}</span>
        <span class="status-badge" :class="{ approved: record.approved, pending: !record.approved }">
          {{ record.approved ? '✅ Verified' : '⏳ Pending Review' }}
        </span>
      </div>
      <div class="timestamp">{{ formatTimestamp(record.timestamp) }}</div>
    </div>
    
    <div class="action-buttons">
      <n-button 
        v-if="isArticle"
        size="small" 
        type="primary" 
        @click.stop="openArticle"
        class="read-article-btn"
      >
        <template #icon>
          <n-icon>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24">
              <path fill="currentColor" d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3zm6.82 6L12 12.72L5.18 9L12 5.28L18.82 9zM17 15.99l-5 2.73l-5-2.73v-3.72L12 15l5-2.73v3.72z"/>
            </svg>
          </n-icon>
        </template>
        Read Article
      </n-button>
      <n-button 
        v-else
        size="small" 
        type="primary" 
        text 
        @click.stop="showDetail"
        class="detail-btn"
      >
        View Details
      </n-button>
      <n-button 
        v-if="record.source" 
        size="small" 
        type="info" 
        text 
        @click.stop="openSource"
        class="source-btn"
      >
        Source
      </n-button>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { NButton, NTag, NIcon } from 'naive-ui'

export default defineComponent({
  name: 'UpgradeRecordCard',
  components: {
    NButton,
    NTag,
    NIcon
  },
  props: {
    record: {
      type: Object,
      required: true
    }
  },
  computed: {
    isArticle() {
      return this.record.type === 'article'
    }
  },
  methods: {
    formatTimestamp(timestamp) {
      if (!timestamp) return 'Unknown'
      const date = new Date(timestamp)
      return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
      })
    },
    
    handleCardClick() {
      if (this.isArticle) {
        this.openArticle()
      } else {
        this.showDetail()
      }
    },
    
    showDetail() {
      this.$emit('show-detail', this.record)
    },
    
    openArticle() {
      if (this.isArticle) {
        // Navigate to article detail page
        this.$router.push(`/articles/${this.record.id}`)
      }
    },
    
    openSource() {
      if (this.record.source) {
        window.open(this.record.source, '_blank')
      }
    }
  }
})
</script>

<style scoped>
.upgrade-record-card {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  backdrop-filter: blur(10px);
}

.upgrade-record-card:hover {
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
  transform: translateY(-2px);
  border-color: rgba(255, 255, 255, 0.2);
}

/* Article card special styles */
.upgrade-record-card.article-card {
  border-left: 6px solid #3498db;
  background: linear-gradient(135deg, rgba(52, 152, 219, 0.15) 0%, rgba(52, 152, 219, 0.08) 100%);
  box-shadow: 0 4px 12px rgba(52, 152, 219, 0.2);
  border-radius: 16px;
  padding: 24px;
}

.upgrade-record-card.article-card:hover {
  border-left-color: #2980b9;
  box-shadow: 0 8px 25px rgba(52, 152, 219, 0.3);
  transform: translateY(-3px);
  background: linear-gradient(135deg, rgba(52, 152, 219, 0.2) 0%, rgba(52, 152, 219, 0.12) 100%);
}

/* Enhanced text readability for article cards */
.upgrade-record-card.article-card .part-name {
  color: #1a1a1a;
  font-weight: 700;
  font-size: 20px;
  line-height: 1.3;
  margin-bottom: 8px;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

.upgrade-record-card.article-card .article-description {
  color: #333;
  font-weight: 500;
  font-size: 14px;
  line-height: 1.5;
  margin-bottom: 12px;
}

.upgrade-record-card.article-card .submitter {
  color: #555;
  font-weight: 600;
}

.upgrade-record-card.article-card .timestamp {
  color: #777;
  font-size: 12px;
}

.upgrade-record-card.article-card .upgrade-spec,
.upgrade-record-card.article-card .upgrade-reason {
  color: #444;
}

.article-badge {
  position: absolute;
  top: 0px;
  left: 12px;
  z-index: 10;
}

.article-tag {
  background: linear-gradient(135deg, #3498db 0%, #2980b9 100%) !important;
  border: none !important;
  color: white !important;
  font-weight: 600;
  box-shadow: 0 2px 8px rgba(52, 152, 219, 0.3);
}

.article-tag:hover {
  transform: scale(1.05);
  box-shadow: 0 4px 12px rgba(52, 152, 219, 0.4);
}

.article-description {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 12px;
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 12px;
}

.part-name {
  font-size: 18px;
  font-weight: 600;
  color: #ffffff;
  line-height: 1.2;
  flex: 1;
  margin-right: 12px;
}

.difficulty-rating {
  display: flex;
  gap: 2px;
}

.star {
  color: #ddd;
  font-size: 14px;
}

.star.active {
  color: #f39c12;
}

.upgrade-spec {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 8px;
  line-height: 1.4;
}

.upgrade-reason {
  font-size: 13px;
  color: rgba(255, 255, 255, 0.6);
  margin-bottom: 12px;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.submitter-info {
  display: flex;
  align-items: center;
  gap: 8px;
}

.submitter {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.6);
}

.status-badge {
  font-size: 11px;
  padding: 2px 6px;
  border-radius: 12px;
  font-weight: 500;
}

.status-badge.approved {
  background: rgba(39, 174, 96, 0.2);
  color: #27ae60;
  border: 1px solid rgba(39, 174, 96, 0.3);
}

.status-badge.pending {
  background: rgba(255, 193, 7, 0.2);
  color: #ffc107;
  border: 1px solid rgba(255, 193, 7, 0.3);
}

.timestamp {
  font-size: 11px;
  color: rgba(255, 255, 255, 0.5);
}

.action-buttons {
  display: flex;
  gap: 8px;
  justify-content: flex-end;
}

.detail-btn, .source-btn {
  font-size: 12px;
}

/* Responsive design */
@media (max-width: 768px) {
  .upgrade-record-card {
    padding: 12px;
  }
  
  .part-name {
    font-size: 16px;
  }
  
  .card-header {
    flex-direction: column;
    gap: 8px;
  }
  
  .difficulty-rating {
    align-self: flex-start;
  }
}
</style>