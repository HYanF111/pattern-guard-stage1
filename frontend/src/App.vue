<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { patterns } from './data/patterns'
// 22种传统纹样的知识产权利用建议
const utilizationAdvice: Record<string, string> = {
  '云雷纹': '商代青铜器上的云雷纹母体属于公有领域，可以参考其基本形态进行自绘创作。建议不要直接使用博物馆数字文物库中的高清图片，可在重新设计构图后对具有独创性的作品进行著作权登记。',
  '回纹': '回纹属于传统几何纹样，通用性较强，单独主张独创性较为困难。建议将其作为边饰，与自主设计的主体图案组合，形成具有独创性的整体作品。',
  '方胜纹': '汉代方胜纹母体属于公有领域，但单独使用较难形成较强的独创性。建议与其他纹样或文字进行重新组合，并注意产品命名和宣传，避免造成与博物馆或其他机构的商业关联误解。',
  '万字纹': '传统万字纹母体属于公有领域，但其具有一定宗教文化含义。商业使用时应注意文化语境，避免产生歧义，同时不要直接盗用博物馆数字化图片。',
  '龟背纹': '传统龟背纹母体属于公有领域，建议将其作为背景底纹，与自主设计的主体纹样进行分层组合。素材优先选择自行绘制或已获得授权的图片。',
  '锁子纹': '锁子纹的传统重复结构属于公有领域，单元结构的独创性通常较弱。建议结合团花、夔龙等元素重新设计整体布局，形成新的图案表达。',
  '连环纹': '汉代连环纹母体属于公有领域，单独使用较难形成独占性权利。建议在传统结构基础上进行重新设计，并对具有独创性的整体作品进行著作权登记。',
  '天华锦纹': '明清天华锦纹的传统母体属于公有领域，但不宜直接照搬整幅传统织锦构图。建议提取其中的纹样单元，重新设计排列、配色和整体布局。',
  '缠枝莲纹': '缠枝莲纹传统母体属于公有领域，具有较大的再创作空间。建议在保留传统文化特征的基础上重新绘制线条和构图，并核实参考图片是否需要授权。',
  '宝相花纹': '宝相花纹传统母体属于公有领域。若参考数字敦煌等平台的高清图片，应先核对其使用条款和授权要求，商业设计优先采用自主绘制的素材。',
  '忍冬纹': '忍冬纹传统母体属于公有领域，常用于边饰设计。建议将其与自主设计的主体纹样组合，通过整体构图和细节设计形成新的作品。',
  '牡丹纹': '牡丹纹属于常见传统题材，传统母体属于公有领域，单独使用的独创性可能较弱。建议通过配色、构图和风格化处理形成差异化设计。',
  '莲花纹': '莲花纹传统母体属于公有领域。若将相关图案用于品牌标识，应提前进行商标近似检索，避免与他人在先注册商标发生冲突。',
  '菊花纹': '菊花纹传统母体属于公有领域。商业使用时应注意与其他国家或地区具有特殊含义的标识相区分，出口产品还应检索目标市场的相关权利。',
  '石榴纹': '石榴纹传统母体属于公有领域，具有吉祥寓意。建议将其与其他传统元素重新组合，通过自主设计的整体构图和配色形成新的作品。',
  '葡萄纹': '葡萄纹传统母体属于公有领域。建议提取传统葡萄、藤蔓等元素进行重新设计，避免整体复制具有特定构图和表达的知名文物纹样。',
  '折枝花纹': '折枝花纹传统母体属于公有领域。建议利用其留白构图特点，重新设计花枝形态、布局和配色，形成具有独创性的整体作品。',
  '龙纹（应龙）': '传统龙纹母体属于公有领域，但部分皇家龙纹及相关商业设计可能涉及商标、商品装潢或其他在先权利。建议采用自主绘制的风格化龙形，并进行商标近似检索，避免使用容易造成来源误认的宣传表述。',
  '凤纹': '传统凤纹母体属于公有领域，但商业设计应注意避开他人具有一定知名度的商品装潢和具体设计表达。建议自主设计凤形，并对具有独创性的作品进行著作权登记。',
  '麒麟纹': '麒麟纹传统母体属于公有领域。建议在传统造型基础上重新设计细节和整体构图，并在用于品牌标识或商业产品前进行相关商标检索。',
  '蝙蝠纹': '传统蝙蝠纹母体属于公有领域，题材较为常见。建议通过组合方式、色彩搭配和造型变化形成差异化设计，增强整体作品的独创性。',
  '鱼藻纹': '传统鱼藻纹母体属于公有领域，但具体知名器物纹样或相关商业装潢可能涉及在先权利。建议重新设计鱼类和水藻的组合构图，并在商业使用前进行相关权利检索。'
}

type ApiState = 'checking' | 'online' | 'offline'
type Page = 'home' | 'screening' | 'report' | 'pattern' | 'history' | 'history-detail'

const API_BASE = 'https://pattern-guard-api-345468-7-1528247260.sh.run.tcloudbase.com'

const apiState = ref<ApiState>('checking')
const historyRecords = ref<any[]>([])
// 当前选中的历史记录
const selectedHistoryRecord = ref<any>(null)

// 历史记录详情加载状态
const historyDetailLoading = ref(false)

// 历史记录详情错误提示
const historyDetailError = ref('')
const historyLoading = ref(false)
const historyError = ref('')
const apiMessage = ref('正在连接后端服务…')
const currentPage = ref<Page>('home')
const selectedPattern = ref<(typeof patterns)[number] | null>(null)
// 当前报告对应的纹样档案信息
const reportPattern = ref<(typeof patterns)[number] | null>(null)
const patternCategories = ['几何纹', '植物纹', '动物纹'] as const
const imageUrl = ref('')
const imageName = ref('')
const imageError = ref('')

const form = ref({
  era: '',
  source: '',
  modification: '',
  usage: '',
})

const formError = ref('')
const isSubmitting = ref(false)
const recordId = ref<number | null>(null)
const reportData = ref<any>(null)
async function checkApi() {
  apiState.value = 'checking'

  try {
    const response = await fetch(`${API_BASE}/api/v1/health`)
    if (!response.ok) throw new Error(`HTTP ${response.status}`)

    const data = await response.json()
    apiState.value = 'online'
    apiMessage.value = data.message
  } catch {
    apiState.value = 'offline'
    apiMessage.value = '暂时无法连接后端，请确认 Python 服务已经启动'
  }
}
async function loadHistory() {
  historyLoading.value = true
  historyError.value = ''

  try {
    const response = await fetch(`${API_BASE}/api/v1/screenings`)

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`)
    }

    const data = await response.json()
    historyRecords.value = data.records
  } catch (error) {
    console.error('读取历史记录失败：', error)
    historyError.value = '历史记录读取失败，请检查后端服务是否正常运行。'
  } finally {
    historyLoading.value = false
    console.log('历史记录加载结束：', historyRecords.value.length)
  }
}
async function openHistoryDetail(recordId: number) {
  historyDetailLoading.value = true
  historyDetailError.value = ''
  selectedHistoryRecord.value = null

  goTo('history-detail')

  try {
    const response = await fetch(`${API_BASE}/api/v1/screenings/${recordId}`)
    if (!response.ok) throw new Error(`HTTP ${response.status}`)

    const data = await response.json()

selectedHistoryRecord.value = {
  ...data.record,
  analysis: data.analysis,
}
  } catch (error) {
    console.error('读取历史记录详情失败：', error)
    historyDetailError.value = '历史记录详情读取失败，请稍后重试。'
  } finally {
    historyDetailLoading.value = false
  }
}
function goTo(page: Page) {
  currentPage.value = page
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
function exportReport() {
  window.print()
}
function openPattern(pattern: (typeof patterns)[number]) {
  selectedPattern.value = pattern
  goTo('pattern')
}
function handleImage(event: Event) {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]
  imageError.value = ''

  if (!file) return

  const allowedTypes = ['image/jpeg', 'image/png']
  if (!allowedTypes.includes(file.type)) {
    imageError.value = '目前仅支持 JPG、JPEG 和 PNG 格式。'
    target.value = ''
    return
  }

  if (imageUrl.value) URL.revokeObjectURL(imageUrl.value)

  imageUrl.value = URL.createObjectURL(file)
  imageName.value = file.name
}

async function submitForm() {
  console.log('已经开始执行 submitForm')
  const values = Object.values(form.value)

  if (values.some(value => !value)) {
    formError.value = '请完成以下四项信息后再继续。'
    return
  }

  if (isSubmitting.value) return

  formError.value = ''
  isSubmitting.value = true

  try {
    const response = await fetch(`${API_BASE}/api/v1/screenings`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        image_name: imageName.value || null,
        creation_period: form.value.era,
        image_source: form.value.source,
        modification_level: form.value.modification,
        usage_scenario: form.value.usage,
        pattern_id: selectedPattern.value?.id ?? null,
        pattern_name: selectedPattern.value?.name ?? null,
        source_type: selectedPattern.value ? '平台档案' : '自由上传',
      }),
    })

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`)
    }

    const data = await response.json()
recordId.value = data.id
reportPattern.value = selectedPattern.value
reportData.value = data.analysis
console.log('当前报告数据：', reportData.value)
console.log('切换前页面：', currentPage.value)

goTo('report')

console.log('切换后页面：', currentPage.value)
  } catch (error) {
    console.error('保存筛查记录失败：', error)
    formError.value = '信息保存失败，请检查后端服务是否正常运行，然后重试。'
  } finally {
    isSubmitting.value = false
  }
}

onMounted(checkApi)
</script>
<template>
  <div class="shell">
    <header class="topbar">
      <a class="brand" href="#" @click.prevent="goTo('home')">
        <b>纹</b>
        <span>纹有界 <small>PATTERN GUARD</small></span>
      </a>
      <span class="topnote">传统纹样版权风险辅助筛查平台</span>
<div class="toplinks">
 <a href="#" @click.prevent="loadHistory(); goTo('history')">筛查记录 ↗</a>
  <a href="#about" @click.prevent="goTo('home')">项目说明 ↗</a>
</div>
    </header>

    <main v-if="currentPage === 'home'">
      <section class="hero">
        <div>
          <p class="kicker">● CULTURAL PATTERN · RIGHTS AWARENESS</p>
          <p class="serial">档案计划 / 001 — PATTERN & RIGHTS</p>
          <h1>让传统纹样的<br><em>使用，有据可循。</em></h1>
          <p class="intro">
            从纹样来源、创作年代、改动程度与使用场景出发，
            帮助文创设计者初步识别潜在版权风险。
          </p>
          <button class="button" @click="goTo('screening')">
            开始纹样筛查 ↗
          </button>
          <p class="disclaimer">
            本平台定位为辅助筛查工具，不提供法律意见或授权结论。
          </p>
        </div>

        <div class="art">
          <div class="arthead">
            <span>图形档案 / STUDY 01</span>
            <span>PG—001</span>
          </div>
          <svg viewBox="0 0 420 420" role="img" aria-label="原创几何纹样装饰示意">
            <defs>
              <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M20 0H0V20" fill="none" stroke="#b9aa91" stroke-width=".6"/>
              </pattern>
            </defs>
            <rect width="420" height="420" fill="url(#grid)"/>
            <g transform="translate(210 210)" fill="none" stroke="#9d3028" stroke-width="2">
              <rect x="-125" y="-125" width="250" height="250" transform="rotate(45)"/>
              <rect x="-88" y="-88" width="176" height="176" transform="rotate(45)"/>
              <circle r="110"/>
              <circle r="68"/>
              <path d="M0-155 36-36 155 0 36 36 0 155-36 36-155 0-36-36Z"/>
              <path d="M-150 0H150M0-150V150" stroke="#34332e"/>
              <circle r="17" fill="#9d3028"/>
            </g>
          </svg>
          <p class="artcaption">原创几何装饰示意 · 非馆藏图像</p>
        </div>
      </section>

      <section class="introstrip">
        <div>
          <small>01 / PURPOSE</small>
          <h2>先厘清来源，再讨论使用。</h2>
        </div>
        <p>
          传统纹样的使用可能涉及不同权利与材料来源。
          我们将把复杂信息拆解成清晰的问题，并提示需要进一步核实的事项。
        </p>
      </section>

<section class="pattern-library">
  <div class="section-heading">
    <span class="eyebrow">PATTERN ARCHIVE</span>
    <h2>传统纹样档案</h2>
    <p>探索传统纹样的文化脉络与知识产权信息。</p>
  </div>

  <section
    v-for="category in patternCategories"
    :key="category"
    class="pattern-category-section"
  >
    <div class="pattern-category-heading">
      <h3>{{ category }}</h3>
      <span>{{ patterns.filter(pattern => pattern.category === category).length }} 种纹样</span>
    </div>
    <div class="pattern-grid">
      <article
  v-for="(pattern, index) in patterns.filter(item => item.category === category)"
  :key="pattern.id"
  class="pattern-card"
  @click="openPattern(pattern)"
>
  <!-- 左侧：纹样图片 -->
  <div class="pattern-card-visual">
    <img
      v-if="pattern.images?.length"
      :src="pattern.images[0].src"
      :alt="pattern.images[0].caption"
      class="pattern-card-image"
    />
    <div v-else class="pattern-card-empty">
      暂无图片
    </div>
  </div>

  <!-- 右侧：博物馆展签信息 -->
  <div class="pattern-card-content">
    <div class="pattern-card-topline">
      <span>COLLECTION / {{ String(index + 1).padStart(2, '0') }}</span>
      <span class="pattern-category">{{ pattern.category }}</span>
    </div>

    <h3>{{ pattern.name }}</h3>

    <div class="pattern-card-meta">
      <span>所属年代</span>
      <strong>{{ pattern.era || '资料未注明' }}</strong>
    </div>

    <p>{{ pattern.description }}</p>

    <span class="pattern-more">查看完整档案 ↗</span>
  </div>
</article>
    </div>
  </section>
</section>
      <section class="steps">
        <article>
          <i>01</i>
          <h3>确认年代</h3>
          <p>了解纹样是否属于传统传承，或有明确的近现代创作者。</p>
        </article>
        <article>
          <i>02</i>
          <h3>核对来源</h3>
          <p>记录图像来自实地拍摄、机构开放资源或第三方平台。</p>
        </article>
        <article>
          <i>03</i>
          <h3>说明改动</h3>
          <p>区分原样使用、微调与具有独创性的再创作。</p>
        </article>
        <article>
          <i>04</i>
          <h3>描述用途</h3>
          <p>结合个人创作、产品销售及品牌宣传等场景进一步分析。</p>
        </article>
      </section>

      <section class="status">
        <div>
          <small>SYSTEM STATUS / API CONNECTION</small>
          <h2>开发环境连接检测</h2>
          <p>确认网页能否访问本地 Python 后端。</p>
        </div>
        <div class="statusbox">
          <strong>
            <span class="dot" :class="apiState"></span>
            {{ apiState === 'online' ? '后端已连接' : apiState === 'offline' ? '等待后端启动' : '正在检查' }}
          </strong>
          <p>{{ apiMessage }}</p>
          <button @click="checkApi">重新检测 ↻</button>
        </div>
      </section>

      <section id="about" class="about">
        <small>ABOUT THE PROJECT</small>
        <h2>纹有界 · PATTERN GUARD</h2>
        <p>一个面向文创设计者的传统纹样版权风险辅助筛查项目。</p>
      </section>
    </main>

    <main v-else-if="currentPage === 'screening'" class="workpage">
      <div class="pageheading">
        <button class="backlink" @click="goTo('home')">← 返回首页</button>
        <p class="kicker">PATTERN REVIEW / 01</p>
        <h1>开始纹样<span>筛查。</span></h1>
        <p class="intro">
          请上传需要筛查的纹样图片，并根据实际情况填写以下信息。
        </p>
      </div>
 <section v-if="selectedPattern" class="reportcard">
        <div class="reportlabel">SELECTED PATTERN</div>
        <h2>已选择平台收录纹样</h2>
        <div class="reportrow">
          <span>纹样名称</span>
          <strong>{{ selectedPattern.name }}</strong>
        </div>
        <div class="reportrow">
          <span>纹样类别</span>
          <strong>{{ selectedPattern.category }}</strong>
        </div>
        <p>{{ selectedPattern.description }}</p>
        <button class="backlink" @click="goTo('home')">
          重新选择纹样
        </button>
      </section>
      <section class="formsection">
        <div class="sectiontitle">
          <span>01</span>
          <div>
            <h2>上传纹样图像</h2>
            <p>UPLOAD PATTERN IMAGE</p>
          </div>
        </div>

        <label class="uploadbox">
          <input
            type="file"
            accept=".jpg,.jpeg,.png,image/jpeg,image/png"
            @change="handleImage"
          />
          <template v-if="imageUrl">
            <img :src="imageUrl" alt="已选择的纹样图片预览" class="preview"/>
            <strong>{{ imageName }}</strong>
            <span>点击可重新选择图片</span>
          </template>
          <template v-else>
            <span class="uploadicon">＋</span>
            <strong>点击选择纹样图片</strong>
            <span>支持 JPG、JPEG、PNG 格式</span>
          </template>
        </label>
        <p v-if="imageError" class="error">{{ imageError }}</p>
      </section>

      <section class="formsection">
        <div class="sectiontitle">
          <span>02</span>
          <div>
            <h2>纹样基本信息</h2>
            <p>PATTERN INFORMATION</p>
          </div>
        </div>

        <div class="question">
          <h3>1. 原始创作年代</h3>
          <p>你认为该纹样最初产生于什么时期？</p>
          <label><input v-model="form.era" type="radio" value="古代/传统传承"/> 古代 / 传统传承</label>
          <label><input v-model="form.era" type="radio" value="近现代/当代有明确作者"/> 近现代 / 当代有明确作者</label>
          <label><input v-model="form.era" type="radio" value="不确定"/> 不确定</label>
        </div>

        <div class="question">
          <h3>2. 图片或文件来源</h3>
          <p>你通过什么渠道获得当前使用的图像？</p>
          <label><input v-model="form.source" type="radio" value="自己实地拍摄"/> 自己实地拍摄</label>
          <label><input v-model="form.source" type="radio" value="博物馆官方开放下载"/> 博物馆官方开放下载</label>
          <label><input v-model="form.source" type="radio" value="博物馆官方渠道但未标开放授权"/> 博物馆官方渠道，但未标明开放授权</label>
          <label><input v-model="form.source" type="radio" value="第三方平台/来源不明"/> 第三方平台 / 来源不明</label>
        </div>

        <div class="question">
          <h3>3. 改动程度</h3>
          <p>你对原始纹样进行了怎样的处理？</p>
          <label><input v-model="form.modification" type="radio" value="原样或仅微调"/> 原样使用或仅作微调</label>
          <label><input v-model="form.modification" type="radio" value="结构性再创作"/> 结构性再创作</label>
        </div>

        <div class="question">
          <h3>4. 计划使用场景</h3>
          <p>你准备将该纹样用于什么场景？</p>
          <label><input v-model="form.usage" type="radio" value="小批量文创/个人作品"/> 小批量文创 / 个人作品</label>
          <label><input v-model="form.usage" type="radio" value="大规模商业产品"/> 大规模商业产品</label>
          <label><input v-model="form.usage" type="radio" value="品牌联名/广告宣传"/> 品牌联名 / 广告宣传</label>
        </div>

        <p v-if="formError" class="error">{{ formError }}</p>

<button
  class="button submitbutton"
  @click="submitForm"
  :disabled="isSubmitting"
>
  {{ isSubmitting ? '正在保存…' : '生成初步报告 ↗' }}
</button>
        <p class="disclaimer">
          当前为前端原型，提交信息仅用于页面演示，尚未进行真实法律风险分析。
        </p>
      </section>
    </main>
<main v-else-if="currentPage === 'pattern'" class="workpage">
  <div class="pageheading">
    <button class="backlink" @click="goTo('home')">← 返回纹样档案</button>
    <p class="kicker">PATTERN ARCHIVE / DETAIL</p>
    <h1>{{ selectedPattern?.name }}<span>。</span></h1>
    <p class="intro">{{ selectedPattern?.description }}</p>
  </div>

  <div v-if="selectedPattern" class="pattern-detail-layout">
    <section class="reportcard pattern-detail-card">
      <div class="reportlabel">PATTERN INFORMATION / 档案信息</div>
      <h2>纹样基本档案</h2>
      <div class="reportrow"><span>纹样名称</span><strong>{{ selectedPattern.name }}</strong></div>
      <div class="reportrow"><span>纹样类别</span><strong>{{ selectedPattern.category }}</strong></div>
      <div class="reportrow"><span>所属年代</span><strong>{{ selectedPattern.era || '资料未注明' }}</strong></div>
      <div class="reportrow"><span>文化／地域来源</span><strong>{{ selectedPattern.culturalOrigin || '资料未注明' }}</strong></div>
      <div class="reportrow"><span>图片出处</span><strong>{{ selectedPattern.imageSource || '资料未注明' }}</strong></div>
      <div class="reportrow"><span>授权状态</span><strong>{{ selectedPattern.authorizationStatus || '资料未注明' }}</strong></div>
      <p class="pattern-rights-note">
        注：以上授权状态为原始资料中的标注，不代表具体馆藏图片可无条件商用。
        实际使用前请核对图片原始页面及其开放许可、署名和使用范围。
      </p>
    </section>

    <section class="reportcard pattern-detail-gallery">
      <div class="reportlabel">IMAGE REFERENCES / 图片示意</div>
      <h2>图片示意</h2>
      <p class="image-intro">以下图片及名称按原始资料整理；未标注名称的图片会如实注明。</p>
      <div class="pattern-detail-images">
        <figure v-for="(item, index) in selectedPattern.images" :key="item.src" class="pattern-detail-image-item">
          <img :src="item.src" :alt="item.caption" />
          <figcaption><span>图片 {{ index + 1 }}</span><strong>{{ item.caption }}</strong></figcaption>
        </figure>
      </div>
      <p v-if="!selectedPattern.images?.length">原始资料未提供图片。</p>
    </section>
  </div>

  <section v-if="selectedPattern" class="reportcard">
    <div class="reportlabel">DESCRIPTION & NOTES</div>
    <h2>资料说明</h2>
    <p>{{ selectedPattern.description }}</p>
    <p>{{ selectedPattern.culturalMeaning }}</p>
    <p>{{ selectedPattern.ipNotice }}</p>
  </section>
<section v-if="selectedPattern" class="reportcard pattern-utilization-advice">
  <div class="reportlabel">INTELLECTUAL PROPERTY / 利用建议</div>
  <h2>知识产权利用建议</h2>

  <p>
    {{ utilizationAdvice[selectedPattern.name] || '该纹样的专项利用建议尚未录入。建议先核实纹样来源、具体图片授权及相关在先权利。' }}
  </p>

  <p class="pattern-rights-note">
    说明：本建议依据项目整理资料形成，仅供知识产权风险辅助参考，不构成正式法律意见。传统纹样母体与具体数字图片、再创作成果的权利状态应分别判断。
  </p>
</section>
  <button class="button" @click="goTo('screening')">使用该纹样开始筛查 ↗</button>
</main>
    <main v-else-if="currentPage === 'history'" class="workpage">
      <div class="pageheading">
        <button class="backlink" @click="goTo('home')">← 返回首页</button>
        <p class="kicker">SCREENING HISTORY / ARCHIVE</p>
        <h1>筛查记录<span>历史。</span></h1>
        <p class="intro">查看此前提交的纹样版权风险辅助筛查信息。</p>
      </div>

      <section class="reportcard">
        <div class="reportlabel">RECORD OVERVIEW</div>
        <h2>历史筛查记录</h2>
        <p>共 {{ historyRecords.length }} 条记录</p>

        <p v-if="historyLoading">正在读取历史记录……</p>
        <p v-else-if="historyError">{{ historyError }}</p>

        <div v-else-if="historyRecords.length === 0">
          <p>暂时没有筛查记录，完成一次筛查后就会显示在这里。</p>
        </div>

        <div v-else class="history-list">
         <article
  v-for="record in historyRecords"
  :key="record.id"
  class="history-item"
  @click="openHistoryDetail(record.id)"
  role="button"
  tabindex="0"
>
  <div class="history-item-header">
    <div>
      <div class="reportlabel">
        SCREENING RECORD / PG—{{ String(record.id).padStart(3, '0') }}
      </div>
      <h3>{{ record.pattern_name || '自由上传纹样' }}</h3>
    </div>

    <span class="history-status">已完成信息采集</span>
  </div>

  <div class="history-item-info">
    <div class="reportrow">
      <span>记录编号</span>
      <strong>{{ record.id }}</strong>
    </div>
    <div class="reportrow">
      <span>记录时间</span>
      <strong>{{ record.created_at }}</strong>
    </div>
  </div>
</article>
</div>

<button class="button" @click="loadHistory">
          刷新历史记录 ↻
        </button>
      </section>
    </main>
     <main v-else-if="currentPage === 'history-detail'" class="workpage">
      <div class="pageheading">
        <button class="backlink" @click="goTo('history')">← 返回历史记录</button>
        <p class="kicker">SCREENING HISTORY / DETAIL</p>
        <h1>记录<span>详情。</span></h1>
        <p class="intro">查看本次纹样版权风险辅助筛查的完整信息。</p>
      </div>

      <section class="reportcard">
        <p v-if="historyDetailLoading">正在读取记录详情……</p>

        <p v-else-if="historyDetailError">
          {{ historyDetailError }}
        </p>

        <template v-else-if="selectedHistoryRecord">
          <div class="reportlabel">SCREENING RECORD / PG—{{ String(selectedHistoryRecord.id).padStart(3, '0') }}</div>
          <h2>{{ selectedHistoryRecord.pattern_name || '自由上传纹样' }}</h2>

          <div class="reportrow">
            <span>图片名称</span>
            <strong>{{ selectedHistoryRecord.image_name || '未填写' }}</strong>
          </div>
          <div class="reportrow">
            <span>来源类型</span>
            <strong>{{ selectedHistoryRecord.source_type || '未填写' }}</strong>
          </div>
          <div class="reportrow">
            <span>原始创作年代</span>
            <strong>{{ selectedHistoryRecord.creation_period || '未填写' }}</strong>
          </div>
          <div class="reportrow">
            <span>图片或文件来源</span>
            <strong>{{ selectedHistoryRecord.image_source || '未填写' }}</strong>
          </div>
          <div class="reportrow">
            <span>改动程度</span>
            <strong>{{ selectedHistoryRecord.modification_level || '未填写' }}</strong>
          </div>
          <div class="reportrow">
            <span>计划使用场景</span>
            <strong>{{ selectedHistoryRecord.usage_scenario || '未填写' }}</strong>
          </div>
          <div class="reportrow">
            <span>记录时间</span>
            <strong>{{ selectedHistoryRecord.created_at || '未填写' }}</strong>
          </div>
          <section class="reportcard" v-if="selectedHistoryRecord.analysis">
  <div class="reportlabel">RISK ANALYSIS / 风险分析</div>
  <h2>初步风险评估结果</h2>
  <div class="reportrow">
    <span>风险等级</span>
    <strong>{{ selectedHistoryRecord.analysis.risk_level }}</strong>
  </div>
  <div class="reportrow">
    <span>风险分数</span>
    <strong>{{ selectedHistoryRecord.analysis.risk_score }}</strong>
  </div>
</section>

<section class="reportcard" v-if="selectedHistoryRecord.analysis">
  <div class="reportlabel">ANALYSIS REASONS</div>
  <h2>风险分析理由</h2>
  <ul>
    <li v-for="(item, index) in selectedHistoryRecord.analysis.reasons" :key="index">
      {{ item }}
    </li>
  </ul>
</section>

<section class="reportcard" v-if="selectedHistoryRecord.analysis">
  <div class="reportlabel">PATTERN-SPECIFIC TIPS</div>
  <h2>纹样专项风险提示</h2>
  <ul>
    <li v-for="(item, index) in selectedHistoryRecord.analysis.pattern_tips" :key="index">
      {{ item }}
    </li>
  </ul>
</section>

<section class="reportcard" v-if="selectedHistoryRecord.analysis">
  <div class="reportlabel">SUGGESTIONS</div>
  <h2>后续处理建议</h2>
  <ul>
    <li v-for="(item, index) in selectedHistoryRecord.analysis.suggestions" :key="index">
      {{ item }}
    </li>
  </ul>
</section>
<!-- 法律依据与风险提示 -->
<section
  class="reportcard"
  v-if="selectedHistoryRecord.analysis?.legal_rules?.length"
>
  <div class="reportlabel">LEGAL BASIS / 法律依据</div>
  <h2>法律依据与风险提示</h2>

  <article
    v-for="rule in selectedHistoryRecord.analysis.legal_rules"
    :key="rule.id"
    class="legal-rule-item"
  >
    <h3>{{ rule.id }} · {{ rule.title }}</h3>

    <h4>判断理由</h4>
    <p>{{ rule.reason }}</p>

    <h4>法律依据</h4>
    <ul>
      <li
        v-for="(basis, index) in rule.legal_basis"
        :key="index"
      >
        {{ basis }}
      </li>
    </ul>

    <h4>处理建议</h4>
    <ul>
      <li
        v-for="(suggestion, index) in rule.suggestions"
        :key="index"
      >
        {{ suggestion }}
      </li>
    </ul>
  </article>

  <p class="pattern-rights-note">
    说明：以上内容为项目规则库提供的法律风险辅助提示，
    不构成正式法律意见。具体法律适用及条文内容应结合现行法律、
    实际素材和授权情况进一步核实。
  </p>
</section>

<section class="reportcard" v-if="selectedHistoryRecord.analysis">
  <div class="reportlabel">DISCLAIMER</div>
  <h2>免责声明</h2>
  <p>{{ selectedHistoryRecord.analysis.disclaimer }}</p>
</section>
<div class="report-actions">
  <button class="button" @click="exportReport">
    导出 PDF ↓
  </button>

  <button class="button" @click="goTo('history')">
    返回历史记录 ↗
  </button>
</div>
        </template>
      </section>
    </main>
    <main v-else class="workpage">
      <div class="pageheading">
        <button class="backlink" @click="goTo('screening')">← 返回修改信息</button>
        <p class="kicker">PATTERN REVIEW / REPORT</p>
        <h1>初步筛查<span>报告。</span></h1>
        <p class="intro">以下为本次提交的信息记录，暂不代表真实法律风险结论。</p>
      </div>

      <section class="reportcard">
  <div class="reportlabel">
    SCREENING RECORD / PG—{{ String(recordId || 0).padStart(3, '0') }}
  </div>

  <h2>本次筛查信息</h2>

  <div class="reportrow">
    <span>纹样名称</span>
    <strong>{{ selectedPattern?.name || '自由上传纹样' }}</strong>
  </div>

  <div class="reportrow">
    <span>纹样类别</span>
    <strong>{{ selectedPattern?.category || '未分类' }}</strong>
  </div>

  <div class="reportrow">
    <span>图片名称</span>
    <strong>{{ imageName || '未提供图片名称' }}</strong>
  </div>

  <div class="reportrow">
    <span>来源类型</span>
    <strong>{{ selectedPattern ? '平台档案' : '自由上传' }}</strong>
  </div>

  <div class="reportrow">
    <span>原始创作年代</span>
    <strong>{{ form.era }}</strong>
  </div>

  <div class="reportrow">
    <span>图片或文件来源</span>
    <strong>{{ form.source }}</strong>
  </div>

  <div class="reportrow">
    <span>改动程度</span>
    <strong>{{ form.modification }}</strong>
  </div>

  <div class="reportrow">
    <span>计划使用场景</span>
    <strong>{{ form.usage }}</strong>
  </div>
</section>
<!-- 纹样档案信息 -->
<section class="reportcard" v-if="reportPattern">
  <div class="reportlabel">PATTERN ARCHIVE / 纹样档案</div>
  <h2>纹样档案信息</h2>

  <div class="reportrow">
    <span>历史年代</span>
    <strong>{{ reportPattern.era }}</strong>
  </div>

  <div class="reportrow">
    <span>文化来源</span>
    <strong>{{ reportPattern.culturalOrigin }}</strong>
  </div>

  <div class="reportrow">
    <span>参考图片来源</span>
    <strong>{{ reportPattern.imageSource }}</strong>
  </div>

  <div class="reportrow">
    <span>档案记载的授权状态</span>
    <strong>{{ reportPattern.authorizationStatus }}</strong>
  </div>

  <div class="reportrow">
    <span>纹样简介</span>
    <strong>{{ reportPattern.description }}</strong>
  </div>

  <div class="reportrow">
    <span>文化寓意</span>
    <strong>{{ reportPattern.culturalMeaning }}</strong>
  </div>

  <h3>参考文物</h3>
  <ul>
    <li
      v-for="(item, index) in reportPattern.images"
      :key="index"
    >
      {{ item.caption }}
    </li>
  </ul>

  <p class="pattern-rights-note">
    注意：以上信息来自平台纹样档案。传统纹样母体的权利状态与具体数字图片的权利状态需要分别判断。档案记载的授权状态不代表具体图片已获得商业使用许可。
  </p>
</section>
      <section class="reportcard" v-if="reportData">
  <div class="reportlabel">RISK ANALYSIS / 风险分析</div>
  <h2>初步风险评估结果</h2>

  <div class="reportrow">
    <span>风险等级</span>
    <strong>{{ reportData.risk_level }}</strong>
  </div>

  <div class="reportrow">
    <span>风险分数</span>
    <strong>{{ reportData.risk_score }}</strong>
  </div>
</section>

<section class="reportcard" v-if="reportData">
  <div class="reportlabel">ANALYSIS REASONS</div>
  <h2>风险分析理由</h2>
  <ul>
    <li v-for="(item, index) in reportData.reasons" :key="index">
      {{ item }}
    </li>
  </ul>
</section>

<section class="reportcard" v-if="reportData">
  <div class="reportlabel">PATTERN-SPECIFIC TIPS</div>
  <h2>纹样专项风险提示</h2>
  <ul>
    <li v-for="(item, index) in reportData.pattern_tips" :key="index">
      {{ item }}
    </li>
  </ul>
</section>

<section class="reportcard" v-if="reportData">
  <div class="reportlabel">SUGGESTIONS</div>
  <h2>后续处理建议</h2>
  <ul>
    <li v-for="(item, index) in reportData.suggestions" :key="index">
      {{ item }}
    </li>
  </ul>
</section>
<!-- 法律依据与风险提示 -->
<section
  class="reportcard"
  v-if="reportData?.legal_rules?.length"
>
  <div class="reportlabel">LEGAL BASIS / 法律依据</div>
  <h2>法律依据与风险提示</h2>

  <article
    v-for="rule in reportData.legal_rules"
    :key="rule.id"
    class="legal-rule-item"
  >
    <h3>{{ rule.id }} · {{ rule.title }}</h3>

    <h4>判断理由</h4>
    <p>{{ rule.reason }}</p>

    <h4>法律依据</h4>
    <ul>
      <li
        v-for="(basis, index) in rule.legal_basis"
        :key="index"
      >
        {{ basis }}
      </li>
    </ul>

    <h4>处理建议</h4>
    <ul>
      <li
        v-for="(suggestion, index) in rule.suggestions"
        :key="index"
      >
        {{ suggestion }}
      </li>
    </ul>
  </article>

  <p class="pattern-rights-note">
    说明：以上内容为项目规则库提供的法律风险辅助提示，
    不构成正式法律意见。具体法律适用及条文内容应结合现行法律、
    实际素材和授权情况进一步核实。
  </p>
</section>
<section class="reportcard" v-if="reportData">
  <div class="reportlabel">DISCLAIMER</div>
  <h2>免责声明</h2>
  <p>{{ reportData.disclaimer }}</p>
</section>

      <section class="reportcard">
        <div class="reportlabel">NEXT STEPS</div>
        <h2>建议你先保存这些材料</h2>
        <ul>
          <li>纹样原始图片及获取时间。</li>
          <li>拍摄记录、下载页面或资源授权说明。</li>
          <li>纹样修改前后的设计文件。</li>
          <li>计划销售的产品类型及宣传用途。</li>
        </ul>
      </section>

      <div class="report-actions">
  <button class="button" @click="exportReport">
    导出 PDF ↓
  </button>

  <button class="button" @click="goTo('screening')">
    返回修改筛查信息 ↗
  </button>
</div>
</main>
    <footer>
      <span>纹有界 PATTERN GUARD</span>
      <span>课程项目 · 第一阶段原型</span>
    </footer>
  </div>
</template>
<style scoped>
/* 历史记录卡片 */
.history-list {
  display: grid;
  gap: 20px;
  margin-top: 24px;
}

/* 历史记录档案卡片 */
.history-item {
  padding: 26px 28px;
  border: 1px solid #b7a68d;
  background: #f4efe5;
  margin-bottom: 20px;
  transition: background 0.25s ease, transform 0.25s ease,
    box-shadow 0.25s ease;
}

.history-item:hover {
  background: #ebe4d8;
  transform: translateY(-3px);
  box-shadow: 0 8px 20px rgba(70, 55, 35, 0.10);
}

/* 卡片顶部信息 */
.history-item-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 16px;
  padding-bottom: 18px;
  border-bottom: 1px solid #cfc2ae;
}

.history-item h3 {
  margin: 12px 0 0;
  color: #9d3028;
  font-size: 22px;
}

/* 信息采集状态 */
.history-status {
  flex-shrink: 0;
  padding: 6px 12px;
  border: 1px solid #b7a68d;
  color: #78684f;
  font-size: 12px;
  background: #eee7da;
}

/* 卡片详细信息 */
.history-item-info {
  padding-top: 10px;
}

.history-item .reportrow {
  display: flex;
  justify-content: space-between;
  gap: 20px;
  padding: 12px 0;
  border-bottom: 1px solid #ded5c7;
}

.history-item .reportrow span {
  color: #777064;
}

.history-item .reportrow strong {
  color: #292923;
  text-align: right;
  font-weight: 500;
  overflow-wrap: anywhere;
}

/* 手机端适配 */
@media (max-width: 640px) {
  .history-item {
    padding: 18px;
  }

  .history-item-header {
    flex-direction: column;
  }

  .history-item .reportrow {
    flex-direction: column;
    gap: 6px;
  }

  .history-item .reportrow strong {
    text-align: left;
  }
}
/* 纹样档案库：按三大类分区 */
.pattern-category-section { margin-top: 34px; }
.pattern-category-heading {
  display:flex; align-items:baseline; justify-content:space-between;
  gap:16px; margin:0 0 16px; padding-bottom:12px;
  border-bottom:1px solid #b7a68d;
}
.pattern-category-heading h3 { margin:0; color:#9d3028; font-size:23px; }
.pattern-category-heading span, .pattern-more { color:#777064; font-size:12px; }
/* 首页纹样档案卡片：左侧文字，右侧图片 */
/* 首页纹样档案卡片：博物馆展签式布局 */
.pattern-card {
  display: grid;
  grid-template-columns: 42% 58%;
  align-items: stretch;
  overflow: hidden;
  cursor: pointer;
  border-bottom: 1px solid #ded5c7;
  margin-bottom: 20px;
  background: #f4efe5;
  transition: all 0.3s ease;
}

.pattern-card:hover {
  background: #eae1d3;
  transform: translateY(-5px);
  box-shadow: 0 8px 20px rgba(70, 55, 35, 0.12);
}

/* 左侧图片区域 */
.pattern-card-visual {
  min-height: 280px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background: #ebe4d8;
}

.pattern-card-image {
  display: block;
  width: 100%;
  height: 280px;
  object-fit: contain;
  transition: transform 0.35s ease;
}

.pattern-card:hover .pattern-card-image {
  transform: scale(1.04);
}

.pattern-card-empty {
  color: #998d7b;
  font-size: 14px;
}

/* 右侧展签信息 */
.pattern-card-content {
  padding: 28px 32px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.pattern-card-topline {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #98866c;
  font-size: 11px;
  letter-spacing: 1.5px;
}

.pattern-card-content h3 {
  font-size: 25px;
  margin: 18px 0;
  color: #3f382f;
}

.pattern-card-meta {
  display: flex;
  gap: 14px;
  align-items: center;
  font-size: 13px;
  color: #887b69;
  margin-bottom: 12px;
}

.pattern-card-meta strong {
  color: #625747;
  font-weight: 500;
}

.pattern-card-content p {
  font-size: 15px;
  line-height: 2;
  color: #625b50;
}

.pattern-card-content .pattern-more {
  margin-top: 18px;
  color: #8b6d45;
  font-size: 13px;
}

/* 手机端布局 */
@media (max-width: 640px) {
  .pattern-card {
    grid-template-columns: 1fr;
  }

  .pattern-card-visual {
    min-height: 220px;
  }

  .pattern-card-image {
    height: 220px;
  }

  .pattern-card-content {
    padding: 20px;
  }
}
.pattern-more { display:inline-block; margin-top:12px; color:#9d3028; }
.pattern-detail-layout {
  display:grid; grid-template-columns:minmax(0, 1fr) minmax(320px, 0.9fr);
  align-items:start; gap:24px; margin-bottom:24px;
}
.pattern-detail-layout > .reportcard { min-width:0; margin:0; }
.pattern-detail-gallery .pattern-detail-images {
  grid-template-columns:repeat(auto-fit,minmax(160px,1fr));
}
.pattern-detail-gallery .pattern-detail-image-item img { height:220px; }
.pattern-detail-card .reportrow {
  display:flex; justify-content:space-between; gap:24px;
  padding:14px 0; border-bottom:1px solid #ded5c7;
}
.pattern-detail-card .reportrow span { flex:0 0 150px; color:#777064; }
.pattern-detail-card .reportrow strong {
  text-align:right; font-weight:500; color:#292923;
}
.pattern-rights-note, .image-intro {
  margin-top:18px; color:#777064; font-size:13px; line-height:1.8;
}
.pattern-detail-images {
  display:grid; grid-template-columns:repeat(auto-fit,minmax(220px,1fr));
  gap:20px; margin-top:22px;
}
.pattern-detail-image-item { margin:0; border:1px solid #ded5c7; background:#f4efe5; }
.pattern-detail-image-item img {
  display:block; width:100%; height:260px; object-fit:contain; background:#ebe4d8;
}
.pattern-detail-image-item figcaption { display:grid; gap:7px; padding:13px 15px; }
.pattern-detail-image-item figcaption span { color:#9d3028; font-size:11px; }
.pattern-detail-image-item figcaption strong {
  color:#292923; font-size:14px; font-weight:500; line-height:1.6;
}
@media (max-width:640px) {
  .pattern-detail-layout {
  display:grid; grid-template-columns:minmax(0, 1fr) minmax(320px, 0.9fr);
  align-items:start; gap:24px; margin-bottom:24px;
}
.pattern-detail-layout > .reportcard { min-width:0; margin:0; }
.pattern-detail-gallery .pattern-detail-images {
  grid-template-columns:repeat(auto-fit,minmax(160px,1fr));
}
.pattern-detail-gallery .pattern-detail-image-item img { height:220px; }
.pattern-detail-card .reportrow { display:grid; gap:6px; }
  .pattern-detail-card .reportrow span { flex:auto; }
  .pattern-detail-card .reportrow strong { text-align:left; }
}
/* PDF 导出专用排版 */
@media print {
  /* 隐藏网页顶部导航栏 */
  .topbar {
    display: none !important;
  }

  /* 隐藏网页底部页脚 */
  footer {
    display: none !important;
  }

  /* 隐藏返回按钮和报告操作按钮 */
  .pageheading button,
  .report-actions {
    display: none !important;
  }

  /* 调整报告页面宽度 */
  .workpage {
    width: 100% !important;
    max-width: none !important;
    padding: 0 !important;
    margin: 0 !important;
  }

  /* 调整报告卡片，避免不必要的阴影 */
  .reportcard {
    box-shadow: none !important;
    break-inside: avoid;
    page-break-inside: avoid;
  }

  /* 设置打印纸张和页边距 */
  @page {
    size: A4;
    margin: 18mm;
  }

  /* 优化文字打印效果 */
  body {
    background: #ffffff !important;
    color: #222222 !important;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }
}
</style>