import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import SearchResults from '../components/SearchResults.vue'
import { trackPageView } from '../utils/analytics.js'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title: 'RC Match AI - Find Upgrade Parts for Traxxas, Arrma, Losi RC Models',
      description: 'AI-powered RC upgrade parts finder for Traxxas Slash, Arrma Granite, Losi Mini 8IGHT, Team Associated models. Find compatible parts, ESC, motor, battery upgrades for 1:10, 1:8 scale RC cars, trucks, buggies.'
    }
  },
  {
    path: '/search',
    name: 'SearchResults',
    component: SearchResults,
    props: true,
    meta: {
      title: 'RC Upgrade Parts Search Results - RC Match AI',
      description: 'Find the best upgrade parts for your RC model. Browse verified parts with AI-powered recommendations.'
    }
  },
  {
    path: '/upgrade-parts/:brand/:model',
    name: 'BrandModelSearch',
    component: SearchResults,
    props: true,
    meta: {
      title: (to) => `${to.params.brand.replace(/-/g, ' ')} ${to.params.model.replace(/-/g, ' ')} Upgrade Parts - RC Match AI`,
      description: (to) => `Find the best upgrade parts for ${to.params.brand.replace(/-/g, ' ')} ${to.params.model.replace(/-/g, ' ')} RC model. ESC, motor, battery, suspension upgrades with AI-powered compatibility matching.`
    }
  },
  {
    path: '/models/:modelId',
    name: 'ModelDetails',
    component: SearchResults,
    props: true,
    meta: {
      title: 'RC Model Upgrade Parts - RC Match AI',
      description: 'Upgrade parts specifically matched for your RC model. Improve performance and reliability.'
    }
  },
  {
    path: '/parts/:partId',
    name: 'PartDetails',
    component: SearchResults,
    props: true,
    meta: {
      title: 'RC Upgrade Part Details - RC Match AI',
      description: 'Detailed information about RC upgrade parts. Compatibility, specifications, and installation guides.'
    }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: Home,
    meta: {
      title: 'Page Not Found - RC Match AI',
      description: 'The page you are looking for does not exist. Return to RC Match AI home page.'
    }
  }
]

const router = createRouter({
  history: createWebHistory('/aircmate/'),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

// 路由导航守卫，用于页面浏览跟踪和SEO优化
router.afterEach((to, from) => {
  // 处理动态meta信息
  let pageTitle = 'RC Match AI'
  let pageDescription = 'AI-powered RC upgrade parts finder for RC models'
  
  if (typeof to.meta.title === 'function') {
    pageTitle = to.meta.title(to)
  } else if (to.meta.title) {
    pageTitle = to.meta.title
  }
  
  if (typeof to.meta.description === 'function') {
    pageDescription = to.meta.description(to)
  } else if (to.meta.description) {
    pageDescription = to.meta.description
  }
  
  // 设置页面标题
  document.title = pageTitle
  
  // 更新meta description
  const descriptionMeta = document.querySelector('meta[name="description"]')
  if (descriptionMeta) {
    descriptionMeta.setAttribute('content', pageDescription)
  }
  
  // 更新canonical URL
  const canonicalLink = document.querySelector('link[rel="canonical"]')
  if (canonicalLink) {
    const baseUrl = 'https://bairdweng.github.io/aircmate'
    canonicalLink.setAttribute('href', baseUrl + to.path)
  }
  
  // 跟踪页面浏览
  trackPageView(pageTitle, to.path)
})

export default router