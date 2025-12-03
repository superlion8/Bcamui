import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Camera, ChevronRight, Folder, Image as ImageIcon, Wand2, Box, User, Settings, ArrowLeftRight, Sparkles, ScanFace, Aperture, Move3d, Smile, Palette, Shirt, Sparkle, ChevronLeft, Layers } from "lucide-react";
import { Button } from "@/components/ui/button";

// --- UI Components ---

// Header Component
export function Header({ title = "BrandCam", showBack = false, onBack }: { title?: string, showBack?: boolean, onBack?: () => void }) {
  return (
    <div className="flex items-center justify-between px-5 py-3 bg-white/90 backdrop-blur-md sticky top-0 z-30 border-b border-gray-100/50">
      <div className="flex items-center gap-2.5">
        {showBack ? (
          <Button variant="ghost" size="icon" className="-ml-2 h-8 w-8 text-gray-600" onClick={onBack}>
            <ChevronLeft className="w-5 h-5" />
          </Button>
        ) : (
            <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center text-white">
            <Camera className="w-4 h-4" />
            </div>
        )}
        <span className="text-base font-bold text-gray-900 tracking-tight">{title}</span>
      </div>
      <div className="flex items-center gap-3">
         <div className="px-2.5 py-1 bg-amber-50 rounded-full border border-amber-100 flex items-center gap-1.5">
            <Sparkles className="w-3 h-3 text-amber-600" />
            <span className="text-[10px] font-bold text-amber-700">Pro</span>
         </div>
         <Settings className="w-5 h-5 text-gray-400" />
      </div>
    </div>
  );
}

// Before/After Slider Component
interface BeforeAfterProps {
  beforeImage: string;
  afterImage: string;
  className?: string;
  initialPosition?: number;
  label?: string;
}

function BeforeAfterSlider({ beforeImage, afterImage, className, initialPosition = 50, label }: BeforeAfterProps) {
  const [sliderPosition, setSliderPosition] = useState(initialPosition);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (clientX: number) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
      const percentage = (x / rect.width) * 100;
      setSliderPosition(percentage);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      handleMove(e.clientX);
    }
  };

  return (
    <div 
      ref={containerRef}
      className={`absolute inset-0 w-full h-full overflow-hidden select-none group ${className}`}
      onMouseDown={() => setIsDragging(true)}
      onMouseUp={() => setIsDragging(false)}
      onMouseLeave={() => setIsDragging(false)}
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
      onClick={(e) => handleMove(e.clientX)}
    >
      <img 
        src={afterImage} 
        alt="After" 
        className="absolute inset-0 w-full h-full object-cover"
        draggable={false}
      />
      
      <div 
        className="absolute inset-0 w-full h-full overflow-hidden will-change-[clip-path]"
        style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
      >
        <img 
          src={beforeImage} 
          alt="Before" 
          className="absolute inset-0 w-full h-full object-cover"
          style={{ width: '100%', height: '100%' }}
          draggable={false}
        />
      </div>

      <div 
        className="absolute top-0 bottom-0 w-0.5 bg-white/60 cursor-ew-resize z-20 flex items-center justify-center hover:bg-white transition-colors"
        style={{ left: `${sliderPosition}%` }}
      >
        <div className="w-4 h-4 bg-white rounded-full shadow-sm flex items-center justify-center -ml-[7px] backdrop-blur-sm">
           <div className="w-0.5 h-2 bg-gray-300 rounded-full" />
        </div>
      </div>
      
      {label && (
        <div className="absolute bottom-2 left-0 right-0 text-center z-20 pointer-events-none">
           <span className="text-[10px] font-semibold text-white shadow-black/50 drop-shadow-md bg-black/20 backdrop-blur-[2px] px-2 py-0.5 rounded-full">{label}</span>
        </div>
      )}
    </div>
  );
}

// Feature Card Component (Home Page Style)
interface FeatureCardProps {
  title: string;
  description?: string;
  icon: React.ReactNode;
  beforeImage: string;
  afterImage: string;
  className?: string;
  initialPosition?: number;
  compact?: boolean;
}

export function FeatureCard({ title, description, icon, beforeImage, afterImage, className, initialPosition, compact }: FeatureCardProps) {
  return (
    <motion.div 
      whileTap={{ scale: 0.98 }}
      className={`relative overflow-hidden rounded-[16px] bg-gray-100 shadow-sm border border-gray-100 group ${className}`}
    >
      <BeforeAfterSlider 
        beforeImage={beforeImage} 
        afterImage={afterImage} 
        initialPosition={initialPosition}
        label={compact ? undefined : undefined}
      />
      
      <div className="absolute bottom-0 left-0 right-0 h-2/3 bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-none z-20" />

      <div className={`absolute bottom-0 left-0 right-0 p-3 z-30 pointer-events-none ${compact ? 'text-center pb-2' : ''}`}>
        <div className={`flex items-center gap-1.5 mb-0.5 ${compact ? 'justify-center flex-col gap-1' : ''}`}>
            <div className={`w-5 h-5 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/20 ${compact ? 'w-6 h-6' : ''}`}>
                {icon}
            </div>
            <h3 className="text-xs font-bold text-white tracking-wide shadow-black/10 drop-shadow-md leading-tight">{title}</h3>
        </div>
        {!compact && description && (
            <p className="text-[10px] text-white/80 font-medium leading-tight pl-7 opacity-90">{description}</p>
        )}
      </div>
    </motion.div>
  );
}

// --- NEW: Retouch Page Components ---

interface ToolCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  image: string;
  color: string;
  onClick: () => void;
}

function ToolCard({ title, description, icon, image, color, onClick }: ToolCardProps) {
  return (
    <motion.div 
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="relative h-40 rounded-[20px] overflow-hidden cursor-pointer shadow-sm border border-gray-100 group"
    >
      {/* Background Image */}
      <img src={image} alt={title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
      <div className={`absolute inset-0 opacity-80 mix-blend-multiply ${color}`} />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

      {/* Content */}
      <div className="absolute inset-0 p-4 flex flex-col justify-between z-10">
        <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md border border-white/20 flex items-center justify-center text-white">
          {icon}
        </div>
        
        <div>
          <h3 className="text-lg font-bold text-white mb-0.5">{title}</h3>
          <p className="text-xs text-white/80 font-medium leading-tight">{description}</p>
        </div>
      </div>

      {/* Arrow Icon (Hover) */}
      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity transform translate-x-2 group-hover:translate-x-0">
        <div className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center">
            <ChevronRight className="w-4 h-4" />
        </div>
      </div>
    </motion.div>
  );
}

// Bottom Navigation
export function BottomNav({ activeTab, onTabChange }: { activeTab: string, onTabChange: (tab: string) => void }) {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-xl border-t border-gray-100 px-6 py-2 pb-6 z-40 flex items-center justify-between">
       <NavIcon 
         icon={<Box className="w-5 h-5" />} 
         label="主页" 
         active={activeTab === 'home'} 
         onClick={() => onTabChange('home')} 
       />
       <NavIcon 
         icon={<Folder className="w-5 h-5" />} 
         label="资产" 
         active={activeTab === 'assets'} 
         onClick={() => onTabChange('assets')} 
       />
       
       <div className="-mt-8">
         <motion.div 
            whileTap={{ scale: 0.9 }}
            className="w-14 h-14 bg-gray-900 rounded-[20px] flex items-center justify-center shadow-lg shadow-gray-900/30 cursor-pointer text-white border border-gray-700"
         >
           <Camera className="w-6 h-6" />
         </motion.div>
       </div>

       <NavIcon 
         icon={<Wand2 className="w-5 h-5" />} 
         label="修图" 
         active={activeTab === 'retouch'} 
         onClick={() => onTabChange('retouch')} 
       />
       <NavIcon 
         icon={<User className="w-5 h-5" />} 
         label="我的" 
         active={activeTab === 'profile'} 
         onClick={() => onTabChange('profile')} 
       />
    </div>
  );
}

function NavIcon({ icon, label, active, onClick }: { icon: React.ReactNode, label: string, active?: boolean, onClick: () => void }) {
  return (
    <div 
      onClick={onClick}
      className={`flex flex-col items-center gap-0.5 transition-colors cursor-pointer ${active ? 'text-gray-900' : 'text-gray-400 hover:text-gray-600'}`}
    >
      {icon}
      <span className="text-[10px] font-medium">{label}</span>
    </div>
  );
}

// --- View Components ---

function HomeView() {
  return (
    <>
      <div className="flex-1 px-3 pt-2 pb-24 space-y-4 overflow-y-auto scrollbar-hide">
        <div className="grid grid-cols-2 gap-2.5 h-[220px]">
            <FeatureCard 
                className="h-full"
                title="模特影棚"
                description="AI真人穿拍"
                icon={<ScanFace className="w-3 h-3" />}
                initialPosition={35}
                beforeImage="https://images.unsplash.com/photo-1564316800929-be17a69d6966?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjbG90aGVzJTIwb24lMjBoYW5nZXIlMjB3aGl0ZSUyMGJhY2tncm91bmQlMjBtaW5pbWFsaXN0fGVufDF8fHx8MTc2NDY1MTk5OHww&ixlib=rb-4.1.0&q=80&w=600"
                afterImage="https://images.unsplash.com/photo-1704775988759-16fdeb0a2235?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwbW9kZWwlMjB3ZWFyaW5nJTIwZWxlZ2FudCUyMGRyZXNzJTIwc3R1ZGlvfGVufDF8fHx8MTc2NDY1MTk5OHww&ixlib=rb-4.1.0&q=80&w=600"
            />
            <FeatureCard 
                className="h-full"
                title="商品影棚"
                description="静物场景合成"
                icon={<Box className="w-3 h-3" />}
                initialPosition={65}
                beforeImage="https://images.unsplash.com/photo-1677735476292-0fc57ab097b2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3NtZXRpY3MlMjBib3R0bGUlMjB3aGl0ZSUyMGJhY2tncm91bmQlMjBzaW1wbGV8ZW58MXx8fHwxNzY0NjUxOTk4fDA&ixlib=rb-4.1.0&q=80&w=600"
                afterImage="https://images.unsplash.com/photo-1668025790616-750caa376cd6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBjb3NtZXRpYyUyMHByb2R1Y3QlMjBhZHZlcnRpc2luZyUyMHBob3RvZ3JhcGh5JTIwd2F0ZXIlMjBzcGxhc2h8ZW58MXx8fHwxNzY0NjUxOTk4fDA&ixlib=rb-4.1.0&q=80&w=600"
            />
        </div>

        <div className="space-y-2">
            <div className="flex items-center gap-2 px-1">
                 <div className="bg-purple-100 p-1 rounded-md">
                    <Wand2 className="w-3.5 h-3.5 text-purple-600" />
                 </div>
                 <h2 className="text-sm font-bold text-gray-900">AI 修图室</h2>
                 <span className="text-[10px] text-gray-400 bg-gray-50 px-1.5 py-0.5 rounded">专业版功能</span>
            </div>

            <div className="grid grid-cols-2 gap-2.5 h-[280px]">
                <FeatureCard 
                    compact
                    className="h-full"
                    title="换模特风格"
                    icon={<Palette className="w-3 h-3" />}
                    initialPosition={50}
                    beforeImage="https://images.unsplash.com/photo-1761001313134-a2b63f00d4bf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400"
                    afterImage="https://images.unsplash.com/photo-1762274674115-a511e3d3c688?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400"
                />
                <FeatureCard 
                    compact
                    className="h-full"
                    title="镜头控制"
                    icon={<Aperture className="w-3 h-3" />}
                    initialPosition={40}
                    beforeImage="https://images.unsplash.com/photo-1764263996467-4690e4306241?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400"
                    afterImage="https://images.unsplash.com/photo-1494790108377-be9c29b29330?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400"
                />
                <FeatureCard 
                    compact
                    className="h-full"
                    title="Pose控制"
                    icon={<Move3d className="w-3 h-3" />}
                    initialPosition={60}
                    beforeImage="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400"
                    afterImage="https://images.unsplash.com/photo-1529139574466-a3005c40717f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400"
                />
                <FeatureCard 
                    compact
                    className="h-full"
                    title="表情控制"
                    icon={<Smile className="w-3 h-3" />}
                    initialPosition={50}
                    beforeImage="https://images.unsplash.com/photo-1650213236604-6dd826c965c0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400"
                    afterImage="https://images.unsplash.com/photo-1645226027644-ca4db2db060a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400"
                />
            </div>
        </div>

        <div className="mt-4 px-1">
             <div className="flex items-center justify-between mb-2">
                <h3 className="text-xs font-bold text-gray-900">最近生成</h3>
                <ChevronRight className="w-4 h-4 text-gray-300" />
             </div>
             <div className="flex gap-2 overflow-hidden h-16">
                 {[1,2,3,4].map(i => (
                     <div key={i} className="w-16 bg-gray-100 rounded-lg border border-gray-100" />
                 ))}
             </div>
        </div>
      </div>
    </>
  );
}

function RetouchView({ onSelectFeature }: { onSelectFeature: (feature: string) => void }) {
    return (
        <div className="flex-1 px-4 pt-4 pb-24 overflow-y-auto scrollbar-hide">
            <div className="mb-6">
                <h2 className="text-xl font-bold text-gray-900">AI 创意工坊</h2>
                <p className="text-sm text-gray-500 mt-1">选择工具开始创作</p>
            </div>

            <div className="grid grid-cols-1 gap-4">
                <ToolCard 
                    title="通用修图"
                    description="画质增强、智能抠图、魔法消除"
                    icon={<Wand2 className="w-5 h-5" />}
                    image="https://images.unsplash.com/photo-1607616996527-a641c438bc69?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600"
                    color="bg-blue-600"
                    onClick={() => onSelectFeature("General Retouch")}
                />

                <ToolCard 
                    title="商品影棚"
                    description="为商品生成专业摄影背景"
                    icon={<Box className="w-5 h-5" />}
                    image="https://images.unsplash.com/photo-1693763824929-bd6b4b959e2b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600"
                    color="bg-orange-600"
                    onClick={() => onSelectFeature("Product Studio")}
                />

                <ToolCard 
                    title="服装搭配"
                    description="智能模特征，虚拟试衣"
                    icon={<Shirt className="w-5 h-5" />}
                    image="https://images.unsplash.com/photo-1582142306909-195724d33ffc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600"
                    color="bg-pink-600"
                    onClick={() => onSelectFeature("Outfit Match")}
                />
            </div>

            <div className="mt-8 text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-full border border-gray-100">
                    <Layers className="w-4 h-4 text-gray-400" />
                    <span className="text-xs text-gray-400 font-medium">更多功能开发中...</span>
                </div>
            </div>
        </div>
    );
}

function GenerationView({ feature, onBack }: { feature: string, onBack: () => void }) {
    return (
        <div className="flex-1 flex flex-col bg-gray-50">
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
                <div className="w-20 h-20 bg-white rounded-[2rem] flex items-center justify-center shadow-sm mb-6">
                    {feature === 'General Retouch' && <Wand2 className="w-10 h-10 text-blue-500" />}
                    {feature === 'Product Studio' && <Box className="w-10 h-10 text-orange-500" />}
                    {feature === 'Outfit Match' && <Shirt className="w-10 h-10 text-pink-500" />}
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">{feature}</h2>
                <p className="text-gray-500 text-sm max-w-[200px]">
                    在此页面上传图片并配置参数，AI 将为您生成高质量结果。
                </p>
                
                <div className="mt-10 w-full max-w-xs space-y-3">
                    <div className="h-12 bg-white rounded-xl border border-dashed border-gray-300 flex items-center justify-center text-gray-400 text-sm">
                        上传区域 (演示)
                    </div>
                    <div className="h-12 bg-gray-900 rounded-xl flex items-center justify-center text-white font-medium shadow-lg shadow-gray-900/20">
                        开始生成
                    </div>
                </div>
            </div>
        </div>
    );
}

// Main App
export default function App() {
  const [activeTab, setActiveTab] = useState("home");
  const [retouchFeature, setRetouchFeature] = useState<string | null>(null);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    // Reset internal views when switching main tabs
    if (tab !== 'retouch') {
        setRetouchFeature(null);
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans max-w-md mx-auto shadow-2xl overflow-hidden relative flex flex-col">
      <Header 
        title={retouchFeature ? retouchFeature : (activeTab === 'retouch' ? "AI 工具箱" : "BrandCam")} 
        showBack={!!retouchFeature}
        onBack={() => setRetouchFeature(null)}
      />
      
      <AnimatePresence mode="wait">
        {activeTab === 'home' && (
             <motion.div key="home" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex-1 flex flex-col overflow-hidden">
                 <HomeView />
             </motion.div>
        )}
        
        {activeTab === 'retouch' && !retouchFeature && (
            <motion.div key="retouch-list" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex-1 flex flex-col overflow-hidden">
                <RetouchView onSelectFeature={setRetouchFeature} />
            </motion.div>
        )}

        {activeTab === 'retouch' && retouchFeature && (
            <motion.div key="retouch-gen" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex-1 flex flex-col overflow-hidden">
                <GenerationView feature={retouchFeature} onBack={() => setRetouchFeature(null)} />
            </motion.div>
        )}

        {(activeTab === 'assets' || activeTab === 'profile') && (
            <motion.div key="placeholder" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex-1 flex items-center justify-center text-gray-400 text-sm">
                功能开发中...
            </motion.div>
        )}
      </AnimatePresence>

      <BottomNav activeTab={activeTab} onTabChange={handleTabChange} />
    </div>
  );
}
