<template>
  <div class="min-h-screen relative overflow-x-hidden bg-white">
    <!-- Modern Hero Section -->
    <header class="relative w-full h-[90vh] lg:h-screen overflow-hidden">
      <!-- Hero Background Image with Overlay -->
      <div class="absolute inset-0 z-0">
        <img
          src="/images/revamp/hero.png"
          alt="Premium healthy food"
          class="w-full h-full object-cover transform scale-105 transition-transform duration-1000"
        />
        <div
          class="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent"
        ></div>
      </div>

      <!-- Navigation/Header Bar -->
      <nav class="absolute top-0 left-0 w-full z-20 px-6 py-8 md:px-12">
        <div class="max-w-7xl mx-auto flex justify-between items-center">
          <div class="flex items-center gap-2">
            <Icon name="ion:nutrition" size="32" class="text-primaryGreen" />
            <span class="text-2xl font-bold text-white tracking-tight">Nutri-<span class="text-primaryGreen">Lens</span></span>
          </div>
          <div class="flex items-center gap-6">
            <NuxtLink to="/auth/login" class="text-white hover:text-primaryGreen transition-colors font-medium">Login</NuxtLink>
            <BaseButton @click="navigateTo('/auth/login')" customClass="rounded-full px-6 py-2 shadow-lg">Get Started</BaseButton>
          </div>
        </div>
      </nav>

      <!-- Hero Content -->
      <div class="relative z-10 max-w-7xl mx-auto px-6 h-full flex flex-col justify-center items-start">
        <div class="max-w-2xl space-y-8 animate-fade-in-up">
          <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primaryGreen/20 border border-primaryGreen/30 backdrop-blur-sm">
            <Icon name="heroicons-solid:sparkles" class="text-primaryGreen" />
            <span class="text-sm font-semibold text-primaryGreen tracking-wide uppercase">AI-Powered Nutrition</span>
          </div>
          
          <h1 class="text-5xl md:text-7xl font-extrabold text-white leading-tight">
            Elevate Your Health with <span class="text-primaryGreen">Intelligence</span>
          </h1>
          
          <p class="text-lg md:text-xl text-gray-200 leading-relaxed max-w-lg">
            Discover the science behind your food. Analyze meals instantly, track macros precisely, and achieve your wellness goals with our cutting-edge AI.
          </p>

          <div class="flex flex-col sm:flex-row gap-4 pt-4">
            <BaseButton 
              @click="handleScrollToFeatures" 
              color="green" 
              customClass="rounded-full px-8 py-4 text-lg shadow-xl shadow-primaryGreen/20 transform hover:scale-105 transition-all"
            >
              Explore Features
            </BaseButton>
            <BaseButton 
              @click="navigateTo('/auth/login')" 
              color="transparent" 
              customClass="rounded-full px-8 py-4 text-lg border-2 border-white/50 text-white hover:bg-white/10 backdrop-blur-sm transition-all"
            >
              Start Free Trial
            </BaseButton>
          </div>
        </div>
      </div>

      <!-- Scroll Indicator -->
      <div class="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 animate-bounce">
        <Icon name="heroicons-solid:chevron-down" size="32" class="text-white/50" />
      </div>
    </header>

    <!-- Features Section -->
    <section id="features" class="py-32 px-6 md:px-12 bg-[#FDFDFD] relative overflow-hidden">
      <!-- Background Accents -->
      <div class="absolute top-0 right-0 w-[50%] h-[50%] bg-primaryGreen/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/4"></div>
      
      <div class="max-w-7xl mx-auto relative z-10">
        <div class="text-center mb-24 space-y-4">
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-secondaryGreen/10 text-secondaryGreen text-xs font-bold uppercase tracking-widest mb-4">
            Our Ecosystem
          </div>
          <h2 class="text-4xl md:text-5xl font-black text-gray-900 tracking-tighter">Everything You Need to <span class="text-gradient">Thrive</span></h2>
          <p class="text-gray-500 max-w-2xl mx-auto text-lg leading-relaxed">
            Nutri-Lens combines advanced machine learning with nutritional science to give you a complete picture of your health.
          </p>
        </div>

        <div class="grid lg:grid-cols-2 gap-16 items-center">
          <!-- Interactive Feature Visual -->
          <div class="relative">
            <div class="absolute inset-0 bg-gradient-to-tr from-primaryGreen/20 to-secondaryGreen/20 rounded-[3rem] blur-3xl opacity-30"></div>
            <div class="relative bg-white rounded-[3rem] p-4 shadow-2xl border border-gray-50 overflow-hidden group">
               <img
                :src="featureImages[currentIndex]"
                alt="Feature Illustration"
                class="w-full h-[500px] object-cover rounded-[2.5rem] transition-all duration-1000 ease-in-out transform group-hover:scale-105"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none"></div>
              
              <!-- Floating Badge -->
              <div class="absolute bottom-10 left-10 right-10 glass-morphism p-6 rounded-3xl animate-fade-in">
                <div class="flex items-center gap-4">
                  <div class="w-12 h-12 rounded-2xl bg-primaryGreen flex items-center justify-center text-white shadow-lg">
                    <Icon :name="featureIcons[currentIndex]" size="24" />
                  </div>
                  <div>
                    <h4 class="font-bold text-gray-900">{{ components[currentIndex].title }}</h4>
                    <p class="text-sm text-gray-500">{{ components[currentIndex].shortDesc }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Feature Details Carousel -->
          <div class="space-y-4">
            <div 
              v-for="(feature, index) in components" 
              :key="feature.name"
              @click="currentIndex = index"
              :class="[
                'p-8 rounded-[2rem] transition-all duration-500 cursor-pointer relative group overflow-hidden',
                currentIndex === index 
                  ? 'bg-white shadow-2xl shadow-black/5 ring-1 ring-gray-100 scale-[1.02]' 
                  : 'hover:bg-gray-50 opacity-60 hover:opacity-100'
              ]"
            >
              <div class="flex gap-6 relative z-10">
                <div 
                  :class="[
                    'w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-500 flex-shrink-0',
                    currentIndex === index ? 'bg-secondaryGreen text-white shadow-xl shadow-secondaryGreen/20 rotate-3' : 'bg-gray-100 text-gray-400 group-hover:bg-white group-hover:shadow-md'
                  ]"
                >
                  <Icon :name="featureIcons[index]" size="28" />
                </div>
                <div class="space-y-2">
                  <h3 :class="['text-2xl font-bold tracking-tight', currentIndex === index ? 'text-gray-900' : 'text-gray-400']">
                    {{ feature.title }}
                  </h3>
                  <div v-if="currentIndex === index" class="animate-fade-in">
                    <p class="text-gray-500 leading-relaxed text-sm md:text-base">
                      {{ feature.fullDesc }}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Action Area -->
            <div class="pt-8 flex items-center justify-center gap-8">
              <BaseButton 
                @click="navigateTo('/auth/login')" 
                customClass="rounded-2xl px-10 py-5 bg-secondaryGreen shadow-2xl shadow-secondaryGreen/20 transform hover:scale-105 active:scale-95 transition-all font-bold text-lg"
              >
                Start Your Journey
              </BaseButton>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- App Preview/CTA -->
    <section class="py-32 px-6 md:px-12">
      <div class="max-w-6xl mx-auto bg-gray-900 rounded-[3.5rem] p-12 md:p-20 relative overflow-hidden text-center">
        <!-- Background decorative circles -->
        <div class="absolute -top-24 -left-24 w-96 h-96 bg-primaryGreen/10 rounded-full blur-[100px]"></div>
        <div class="absolute -bottom-24 -right-24 w-96 h-96 bg-secondaryGreen/10 rounded-full blur-[100px]"></div>
        
        <div class="relative z-10 space-y-10">
          <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
            <Icon name="heroicons-solid:lightning-bolt" class="text-primaryGreen" />
            <span class="text-xs font-bold text-white uppercase tracking-[0.2em]">Boost Your Wellness</span>
          </div>
          
          <h2 class="text-4xl md:text-6xl font-black text-white leading-[0.9] tracking-tighter max-w-4xl mx-auto">
            Ready to <span class="text-primaryGreen">Redefine</span> Your Nutrition?
          </h2>
          
          <p class="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Experience the future of healthy living. Join thousands who use Nutri-Lens to master their diet with AI.
          </p>
          
          <div class="flex flex-col sm:flex-row gap-6 justify-center pt-6">
            <BaseButton 
              @click="navigateTo('/auth/login')" 
              customClass="rounded-2xl px-12 py-5 bg-primaryGreen text-white hover:bg-primaryGreen/90 transform hover:scale-105 active:scale-95 transition-all text-xl font-bold shadow-2xl shadow-primaryGreen/20"
            >
              Get Started for Free
            </BaseButton>
            <BaseButton 
              @click="navigateTo('/auth/login')" 
              color="transparent"
              customClass="rounded-2xl px-12 py-5 border-2 border-white/10 text-white hover:bg-white/5 backdrop-blur-md transition-all text-xl font-bold"
            >
              Schedule Demo
            </BaseButton>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="py-20 px-6 bg-white border-t border-gray-50">
      <div class="max-w-7xl mx-auto space-y-16">
        <div class="grid md:grid-cols-4 gap-12">
          <div class="col-span-2 space-y-6">
            <div class="flex items-center gap-2">
              <Icon name="ion:nutrition" size="32" class="text-primaryGreen" />
              <span class="text-2xl font-black text-gray-900 tracking-tighter">Nutri-<span class="text-primaryGreen">Lens</span></span>
            </div>
            <p class="text-gray-500 max-w-sm text-lg leading-relaxed">
              Empowering your health journey with the world's most advanced AI-driven nutritional analysis.
            </p>
            <div class="flex gap-4">
              <a v-for="social in ['twitter', 'instagram', 'linkedin']" :key="social" href="#" class="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-primaryGreen hover:text-white transition-all">
                <Icon :name="`brandico:${social}`" size="18" />
              </a>
            </div>
          </div>
          
          <div class="space-y-6">
            <h4 class="font-bold text-gray-900 uppercase tracking-widest text-xs">Platform</h4>
            <ul class="space-y-4">
              <li v-for="link in ['Features', 'AI Chat', 'Meal Plans', 'Pricing']" :key="link">
                <a href="#" class="text-gray-500 hover:text-primaryGreen transition-colors">{{ link }}</a>
              </li>
            </ul>
          </div>
          
          <div class="space-y-6">
            <h4 class="font-bold text-gray-900 uppercase tracking-widest text-xs">Legal</h4>
            <ul class="space-y-4">
              <li v-for="link in ['Privacy Policy', 'Terms of Service', 'Cookie Policy']" :key="link">
                <a href="#" class="text-gray-500 hover:text-primaryGreen transition-colors">{{ link }}</a>
              </li>
            </ul>
          </div>
        </div>
        
        <div class="pt-12 border-t border-gray-50 flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-gray-400 font-medium">
          <p>© {{ new Date().getFullYear() }} Nutri-Lens AI. All rights reserved.</p>
          <div class="flex items-center gap-2">
            <span class="w-2 h-2 rounded-full bg-primaryGreen animate-pulse"></span>
            System Status: Optimal
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
const currentIndex = ref(0);

const featureIcons = [
  'heroicons-solid:sparkles',
  'heroicons-solid:clipboard-document-list',
  'heroicons-solid:chart-bar',
  'heroicons-solid:camera',
  'heroicons-solid:banknotes'
];

const featureImages = [
  '/images/nutri-lens.png',
  '/images/plans-image.jpg',
  '/images/mom-eating.jpg',
  '/images/ai.png',
  '/images/landing/landing.jpg'
];

const components = [
  {
    name: "welcome",
    title: "AI Intelligent Analysis",
    shortDesc: "Understand the science behind every meal you eat.",
    fullDesc: "Our advanced Gemini AI deep-dives into your food's molecular structure, providing a detailed breakdown of vitamins, minerals, and potential allergens you need to know about.",
    component: defineAsyncComponent(() => import("@/components/Landing/Welcome.vue")),
  },
  {
    name: "plans",
    title: "Personalized Nutrition",
    shortDesc: "Tailored meal plans that fit your unique lifestyle.",
    fullDesc: "Get weekly meal plans generated specifically for your body type, activity level, and health goals. Whether you're keto, vegan, or gluten-free, we've got you covered.",
    component: defineAsyncComponent(() => import("@/components/Landing/Plans.vue")),
  },
  {
    name: "tracks",
    title: "Precision Tracking",
    shortDesc: "Monitor macros and micros with effortless accuracy.",
    fullDesc: "Track your progress with beautiful, interactive charts. Monitor your intake of proteins, carbs, and fats against your daily targets with scientific precision.",
    component: defineAsyncComponent(() => import("@/components/Landing/Track.vue")),
  },
  {
    name: "analyze",
    title: "Instant Recognition",
    shortDesc: "Snap a photo, get a full nutritional breakdown instantly.",
    fullDesc: "Just snap a photo of your plate. Our computer vision technology identifies ingredients and estimates portion sizes to calculate nutritional values in seconds.",
    component: defineAsyncComponent(() => import("@/components/Landing/Analyze.vue")),
  },
  {
    name: "budget",
    title: "Budget Optimization",
    shortDesc: "Eat healthy without breaking the bank.",
    fullDesc: "Healthy eating shouldn't be expensive. Our algorithm finds the most nutrient-dense foods at the lowest prices, helping you save money while staying fit.",
    component: defineAsyncComponent(() => import("@/components/Landing/Budget.vue")),
  },
];

const handleScrollToFeatures = () => {
  document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
};

useHead({
  title: "Nutri-Lens | AI-Powered Nutrition Analysis",
  meta: [
    {
      name: "description",
      content: "Transform your health with Nutri-Lens. Use AI to analyze meals, track nutrition, and get personalized diet plans.",
    },
  ],
});

useSeoMeta({
  title: "Nutri-Lens | AI-Powered Nutrition Analysis",
  description: "Transform your health with Nutri-Lens. Use AI to analyze meals, track nutrition, and get personalized diet plans.",
  ogDescription: "Transform your health with Nutri-Lens. Use AI to analyze meals, track nutrition, and get personalized diet plans.",
  ogTitle: "Nutri-Lens | AI-Powered Nutrition Analysis",
  ogImage: "/images/nutri-lens.png",
});

definePageMeta({
  layout: false, // Use custom layout for the redesigned landing page
});
</script>

<style scoped>
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in-up {
  animation: fadeInUp 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
}

.animate-fade-in {
  animation: fadeIn 0.5s ease-out forwards;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
</style>
