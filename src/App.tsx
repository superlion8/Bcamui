import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Camera, ChevronRight, Folder, Image as ImageIcon, Wand2, Box, User, Settings, Sparkles, ScanFace, Aperture, Move3d, Smile, Palette, Shirt, Layers, ChevronLeft, Star, LayoutGrid, ShoppingBag, Zap, MonitorPlay, Users, X, Check, Upload, Loader2, SwitchCamera, Flashlight, Plus, RefreshCw, ArrowRight, Shuffle, Axis3d, ImagePlus } from "lucide-react";
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
         <div className="w-8 h-8 rounded-full bg-gray-100 overflow-hidden border border-gray-200">
             <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=100" alt="User" className="w-full h-full object-cover" />
         </div>
      </div>
    </div>
  );
}

// Section Header
function SectionHeader({ title, icon }: { title: string, icon?: React.ReactNode }) {
    return (
        <div className="flex items-center gap-2 px-1 mb-3 mt-6 first:mt-2">
            {icon && <div className="text-gray-900">{icon}</div>}
            <h2 className="text-base font-bold text-gray-900 tracking-tight">{title}</h2>
        </div>
    )
}

// Before-After Feature Card
interface BeforeAfterCardProps {
    title: string;
    subtitle: string;
    beforeImage: string;
    afterImage: string;
    badge?: string;
    onClick?: () => void;
}

function BeforeAfterCard({ title, subtitle, beforeImage, afterImage, badge, onClick }: BeforeAfterCardProps) {
    return (
        <motion.div 
            whileTap={{ scale: 0.95 }}
            onClick={onClick}
            className="min-w-[160px] w-[160px] h-[220px] rounded-[16px] overflow-hidden relative bg-gray-100 shadow-sm border border-gray-100 snap-start cursor-pointer group"
        >
            {/* Before Image (Base) */}
            <div className="absolute inset-0">
                <img src={beforeImage} alt="Before" className="w-full h-full object-cover" />
                <div className="absolute top-2 left-2 w-[52px] text-center py-0.5 bg-black/40 backdrop-blur-sm rounded text-[9px] font-bold text-white/80 z-10">
                    Original
                </div>
            </div>

            {/* After Image (Animated Overlay) */}
            <motion.div 
                className="absolute inset-y-0 left-0 overflow-hidden border-r border-white/50"
                animate={{ width: ["0%", "100%", "100%"] }}
                transition={{ 
                    duration: 3, 
                    ease: "easeInOut", 
                    times: [0, 0.8, 1],
                    repeat: Infinity, 
                    repeatDelay: 1 
                }}
            >
                <div className="absolute inset-0 w-[160px] h-full"> {/* Fixed width container to prevent stretching */}
                    <img src={afterImage} alt="After" className="w-full h-full object-cover" />
                </div>
                <div className="absolute top-2 left-2 w-[52px] text-center py-0.5 bg-purple-600/80 backdrop-blur-sm rounded text-[9px] font-bold text-white z-10">
                    Result
                </div>
            </motion.div>

            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent pointer-events-none" />
            
            {badge && (
                <div className="absolute top-2 right-2 px-1.5 py-0.5 bg-white/20 backdrop-blur-md rounded text-[9px] font-bold text-white border border-white/20 z-20">
                    {badge}
                </div>
            )}

            <div className="absolute bottom-0 left-0 right-0 p-3 z-20">
                <h3 className="text-sm font-bold text-white leading-tight mb-0.5">{title}</h3>
                <p className="text-[10px] text-white/70 font-medium">{subtitle}</p>
            </div>
        </motion.div>
    )
}


// ToolCard for Retouch Page (Large Card)
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
      className="relative h-36 rounded-[20px] overflow-hidden cursor-pointer shadow-sm border border-gray-100 group"
    >
      {/* Background Image */}
      <img src={image} alt={title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
      <div className={`absolute inset-0 opacity-80 mix-blend-multiply ${color}`} />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

      {/* Content */}
      <div className="absolute inset-0 p-5 flex flex-col justify-between z-10">
        <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md border border-white/20 flex items-center justify-center text-white">
          {icon}
        </div>
        
        <div>
          <h3 className="text-xl font-bold text-white mb-1">{title}</h3>
          <p className="text-xs text-white/90 font-medium leading-tight">{description}</p>
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

// Retouch Row Item (For Home Page List)
function RetouchRow({ title, subtitle, icon, image, onClick }: { title: string, subtitle: string, icon: React.ReactNode, image: string, onClick?: () => void }) {
    return (
        <motion.div 
            whileTap={{ scale: 0.98 }}
            onClick={onClick}
            className="flex items-center gap-4 p-3 bg-white rounded-2xl border border-gray-100 shadow-sm mb-2.5 cursor-pointer"
        >
            <div className="w-14 h-14 rounded-xl overflow-hidden bg-gray-100 shrink-0 relative">
                <img src={image} alt={title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/10" />
                <div className="absolute inset-0 flex items-center justify-center text-white drop-shadow-md">
                    {icon}
                </div>
            </div>
            <div className="flex-1">
                <h3 className="text-sm font-bold text-gray-900">{title}</h3>
                <p className="text-xs text-gray-500 mt-0.5">{subtitle}</p>
            </div>
            <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center">
                <ChevronRight className="w-4 h-4 text-gray-400" />
            </div>
        </motion.div>
    )
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
            onClick={() => onTabChange('shoot')} 
            className={`w-14 h-14 rounded-[24px] flex items-center justify-center shadow-lg cursor-pointer text-white border border-white/20 transition-all duration-300 ${activeTab === 'shoot' ? 'bg-purple-600 shadow-purple-500/30 scale-105' : 'bg-gray-900 shadow-gray-900/30'}`}
         >
           <Camera className="w-6 h-6" />
         </motion.div>
         <div className="text-center mt-1">
             <span className="text-[10px] font-medium text-gray-400">拍摄</span>
         </div>
       </div>

       <NavIcon 
         icon={<Wand2 className="w-5 h-5" />} 
         label="修图" 
         active={activeTab === 'retouch'} 
         onClick={() => onTabChange('retouch')} 
       />
       <NavIcon 
         icon={<ImageIcon className="w-5 h-5" />} 
         label="成片" 
         active={activeTab === 'gallery'} 
         onClick={() => onTabChange('gallery')} 
       />
    </div>
  );
}

function NavIcon({ icon, label, active, onClick }: { icon: React.ReactNode, label: string, active?: boolean, onClick: () => void }) {
  return (
    <div 
      onClick={onClick}
      className={`flex flex-col items-center gap-1 transition-colors cursor-pointer ${active ? 'text-gray-900' : 'text-gray-400 hover:text-gray-600'}`}
    >
      <div className={active ? "text-gray-900" : "text-gray-400"}>
        {icon}
      </div>
      <span className="text-[10px] font-medium">{label}</span>
    </div>
  );
}

// --- SHOOT FLOW COMPONENTS ---

type ProductType = "hat" | "outer" | "inner" | "pants" | "shoes";

const PRODUCT_TYPES: Record<ProductType, string> = {
    hat: "帽子",
    outer: "上衣外搭",
    inner: "上衣内搭",
    pants: "裤子",
    shoes: "鞋子"
};

const MOCK_LIBRARY: Record<ProductType, string[]> = {
    hat: [
        "https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=200",
        "https://images.unsplash.com/photo-1514327605112-b887c0e61c0a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=200"
    ],
    outer: [
        "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
        "https://images.unsplash.com/photo-1544923246-77307dd654cb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400"
    ],
    inner: [
        "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
        "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400"
    ],
    pants: [
        "https://images.unsplash.com/photo-1584370848010-d7cc637703ef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
        "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400"
    ],
    shoes: [
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
        "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400"
    ]
};

// Mock image for the camera preview
const MOCK_CAMERA_PREVIEW = "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400";

function ShootFlow({ onCancel, mode }: { onCancel: () => void, mode: string | null }) {
    const [step, setStep] = useState<"camera" | "processing" | "result">("camera");
    const [capturedImage, setCapturedImage] = useState<string | null>(null);
    const [identifiedType, setIdentifiedType] = useState<ProductType | null>(null);
    const [outfit, setOutfit] = useState<Partial<Record<ProductType, string>>>({});
    const [isGenerating, setIsGenerating] = useState(false);

    // Simulator: Capture -> Process -> Result
    const handleCapture = () => {
        // In a real app, this would capture from the video stream
        setCapturedImage(MOCK_CAMERA_PREVIEW);
        setStep("processing");

        // Mock VLM processing
        setTimeout(() => {
            const mockType: ProductType = "outer"; // Hardcoded result for demo
            setIdentifiedType(mockType);
            setOutfit({ [mockType]: MOCK_CAMERA_PREVIEW });
            setStep("result");
        }, 2000);
    };

    const handleAutoStyle = () => {
        // Fill empty slots with random items from library
        const newOutfit = { ...outfit };
        (Object.keys(MOCK_LIBRARY) as ProductType[]).forEach(type => {
            if (!newOutfit[type]) {
                const options = MOCK_LIBRARY[type];
                newOutfit[type] = options[Math.floor(Math.random() * options.length)];
            }
        });
        setOutfit(newOutfit);
    };

    const handleReplaceSlot = (type: ProductType) => {
        // In a real app, this would open a picker.
        // Here, we just cycle to another random image or upload logic.
        // For demo, let's just swap it with another random one from library to simulate "upload/replace"
        const options = MOCK_LIBRARY[type];
        const current = outfit[type];
        const next = options.find(url => url !== current) || options[0];
        
        // If it's the captured one, replace with a mock one
        setOutfit(prev => ({ ...prev, [type]: next }));
    };

    const handleNextStep = () => {
        setIsGenerating(true);
        setTimeout(() => {
            setIsGenerating(false);
            onCancel(); // Finish flow
        }, 2000);
    };

    if (step === "camera") {
        return (
            <div className="fixed inset-0 bg-black z-50 flex flex-col">
                {/* Camera Header */}
                <div className="absolute top-0 left-0 right-0 p-4 flex items-center justify-between z-20 text-white">
                    <Button variant="ghost" size="icon" className="text-white hover:bg-white/20" onClick={onCancel}>
                        <X className="w-6 h-6" />
                    </Button>
                    <span className="text-sm font-medium bg-black/30 px-3 py-1 rounded-full backdrop-blur-md">{mode || "AI 智能识别"}</span>
                    <div className="w-10" /> {/* Spacer */}
                </div>

                {/* Viewport */}
                <div className="flex-1 relative overflow-hidden">
                    <img src="https://images.unsplash.com/photo-1550989460-0adf9ea622e2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800" alt="Camera Preview" className="w-full h-full object-cover opacity-80" />
                    
                    {/* Scanning Grid Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="w-64 h-64 border border-white/30 rounded-lg relative">
                            <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-white"></div>
                            <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-white"></div>
                            <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-white"></div>
                            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-white"></div>
                            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-purple-500/50 shadow-[0_0_15px_rgba(168,85,247,0.8)] animate-scan"></div>
                        </div>
                    </div>
                </div>

                {/* Controls */}
                <div className="h-32 bg-black flex items-center justify-around px-8 pb-6">
                    <Button variant="ghost" size="icon" className="text-white/70">
                        <ImageIcon className="w-6 h-6" />
                    </Button>
                    
                    <motion.button 
                        whileTap={{ scale: 0.9 }}
                        onClick={handleCapture}
                        className="w-16 h-16 rounded-full bg-white border-4 border-gray-300 flex items-center justify-center"
                    >
                        <div className="w-14 h-14 rounded-full border-2 border-black" />
                    </motion.button>

                    <Button variant="ghost" size="icon" className="text-white/70">
                        <SwitchCamera className="w-6 h-6" />
                    </Button>
                </div>
            </div>
        );
    }

    if (step === "processing") {
        return (
            <div className="fixed inset-0 bg-black/90 z-50 flex flex-col items-center justify-center text-white">
                <div className="w-full max-w-xs text-center space-y-6">
                    <div className="relative w-24 h-24 mx-auto">
                        {/* Scanning Effect */}
                        <div className="absolute inset-0 rounded-xl overflow-hidden border border-white/20">
                            <img src={capturedImage!} alt="Captured" className="w-full h-full object-cover opacity-50 blur-sm" />
                        </div>
                        <div className="absolute inset-0 border-2 border-purple-500 rounded-xl animate-pulse shadow-[0_0_20px_rgba(168,85,247,0.4)]" />
                    </div>
                    
                    <div>
                        <h3 className="text-xl font-bold mb-2">AI 正在识别商品...</h3>
                        <div className="flex items-center justify-center gap-2 text-gray-400 text-sm">
                            <Loader2 className="w-4 h-4 animate-spin" />
                            <span>分析品类与特征</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (isGenerating) {
        return (
             <div className="fixed inset-0 bg-white z-50 flex flex-col items-center justify-center text-gray-900">
                <div className="w-full max-w-xs text-center space-y-6">
                    <div className="relative w-24 h-24 mx-auto">
                        <div className="absolute inset-0 rounded-full border-4 border-gray-100" />
                        <div className="absolute inset-0 rounded-full border-4 border-t-purple-600 animate-spin" />
                        <div className="absolute inset-0 flex items-center justify-center">
                            <Sparkles className="w-8 h-8 text-purple-600 fill-purple-600 animate-pulse" />
                        </div>
                    </div>
                    
                    <div>
                        <h3 className="text-xl font-bold mb-2">正在生成模特大片...</h3>
                        <p className="text-sm text-gray-500">AI 正在融合光影与场景</p>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="fixed inset-0 bg-white z-50 flex flex-col">
            {/* Result Header */}
            <div className="bg-white px-4 py-3 border-b border-gray-100 flex items-center justify-between sticky top-0 z-10">
                <Button variant="ghost" size="icon" className="-ml-2" onClick={onCancel}>
                    <ChevronLeft className="w-6 h-6 text-gray-900" />
                </Button>
                <h3 className="font-bold text-gray-900">{mode || "智能搭配"}</h3>
                <div className="w-8" />
            </div>

            {/* Main Content */}
            <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
                
                {/* Top Tip */}
                <div className="mb-4 flex items-start gap-3 bg-purple-50 p-3 rounded-xl border border-purple-100">
                    <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center shrink-0">
                        <Sparkles className="w-4 h-4 text-purple-600" />
                    </div>
                    <div className="flex-1">
                        <p className="text-sm text-purple-900 font-bold">搭配助手</p>
                        <p className="text-xs text-purple-700 leading-relaxed mt-0.5">
                            已识别您的商品为 <span className="font-bold underline">{PRODUCT_TYPES[identifiedType!]}</span>。
                            您可以手动上传其他单品，或点击下方“帮你搭”一键生成。
                        </p>
                    </div>
                </div>

                {/* Artistic Mannequin Outfit Builder */}
                <div className="relative w-full max-w-[380px] mx-auto aspect-[3/5] my-4">
                    
                    {/* Abstract Fashion Sketch (SVG) */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                         <svg viewBox="0 0 300 600" className="h-full w-full drop-shadow-xl">
                            <defs>
                                <linearGradient id="sketchGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" stopColor="#9333ea" stopOpacity="0.1" />
                                    <stop offset="100%" stopColor="#ec4899" stopOpacity="0.1" />
                                </linearGradient>
                                <filter id="glow">
                                    <feGaussianBlur stdDeviation="2.5" result="coloredBlur"/>
                                    <feMerge>
                                        <feMergeNode in="coloredBlur"/>
                                        <feMergeNode in="SourceGraphic"/>
                                    </feMerge>
                                </filter>
                            </defs>
                            
                            {/* Head */}
                            <motion.path 
                                initial={{ pathLength: 0, opacity: 0 }}
                                animate={{ pathLength: 1, opacity: 1 }}
                                transition={{ duration: 1.5, ease: "easeInOut" }}
                                d="M150,50 C135,50 125,65 125,85 C125,105 135,120 150,120 C165,120 175,105 175,85 C175,65 165,50 150,50 Z" 
                                fill="transparent" 
                                stroke="#e5e7eb" 
                                strokeWidth="2"
                            />

                            {/* Body Line / Spine (Abstract) */}
                            <motion.path
                                initial={{ pathLength: 0, opacity: 0 }}
                                animate={{ pathLength: 1, opacity: 1 }}
                                transition={{ duration: 1.5, delay: 0.3, ease: "easeInOut" }}
                                d="M150,120 C150,120 145,140 150,250 C155,360 150,380 150,380"
                                fill="transparent"
                                stroke="#e5e7eb"
                                strokeWidth="1.5"
                                strokeDasharray="5,5"
                            />
                            
                            {/* Shoulders */}
                            <motion.path
                                initial={{ pathLength: 0, opacity: 0 }}
                                animate={{ pathLength: 1, opacity: 1 }}
                                transition={{ duration: 1.5, delay: 0.5, ease: "easeInOut" }}
                                d="M100,130 C120,125 180,125 200,130"
                                fill="transparent"
                                stroke="#d1d5db"
                                strokeWidth="2"
                                strokeLinecap="round"
                            />

                            {/* Hips (Abstract Curve) */}
                            <motion.path
                                initial={{ pathLength: 0, opacity: 0 }}
                                animate={{ pathLength: 1, opacity: 1 }}
                                transition={{ duration: 1.5, delay: 0.7, ease: "easeInOut" }}
                                d="M110,250 C130,260 170,260 190,250"
                                fill="transparent"
                                stroke="#d1d5db"
                                strokeWidth="2"
                                strokeLinecap="round"
                            />

                            {/* Legs (Long stylized lines) */}
                            <motion.path
                                initial={{ pathLength: 0, opacity: 0 }}
                                animate={{ pathLength: 1, opacity: 1 }}
                                transition={{ duration: 1.5, delay: 0.9, ease: "easeInOut" }}
                                d="M110,250 C105,350 115,450 120,550 M190,250 C195,350 185,450 180,550"
                                fill="transparent"
                                stroke="#e5e7eb"
                                strokeWidth="2"
                                strokeLinecap="round"
                            />
                            
                             {/* Arms (Abstract hints) */}
                             <motion.path
                                initial={{ pathLength: 0, opacity: 0 }}
                                animate={{ pathLength: 1, opacity: 1 }}
                                transition={{ duration: 1.5, delay: 1.1, ease: "easeInOut" }}
                                d="M100,130 C80,180 85,220 90,260 M200,130 C220,180 215,220 210,260"
                                fill="transparent"
                                stroke="#e5e7eb"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                            />
                        </svg>
                    </div>
                    
                    {/* Slots Overlay - Click to replace */}
                    
                    {/* Hat */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-28">
                         <MannequinSlot 
                            type="hat"
                            label="HAT" 
                            image={outfit.hat} 
                            active={identifiedType === "hat"}
                            onClick={() => handleReplaceSlot('hat')}
                        />
                    </div>

                    {/* Inner */}
                    <div className="absolute top-[20%] left-0 w-36 h-48">
                        <MannequinSlot 
                            type="inner"
                            label="INNER" 
                            image={outfit.inner} 
                            active={identifiedType === "inner"}
                            onClick={() => handleReplaceSlot('inner')}
                        />
                    </div>

                    {/* Outer */}
                    <div className="absolute top-[20%] right-0 w-36 h-48">
                        <MannequinSlot 
                            type="outer"
                            label="OUTER" 
                            image={outfit.outer} 
                            active={identifiedType === "outer"}
                            onClick={() => handleReplaceSlot('outer')}
                        />
                    </div>

                    {/* Pants */}
                    <div className="absolute top-[50%] left-[2%] w-40 h-52">
                         <MannequinSlot 
                            type="pants"
                            label="BOTTOM" 
                            image={outfit.pants} 
                            active={identifiedType === "pants"}
                            onClick={() => handleReplaceSlot('pants')}
                        />
                    </div>
                    
                     {/* Shoes */}
                     <div className="absolute top-[75%] right-[2%] w-28 h-28">
                        <MannequinSlot 
                            type="shoes"
                            label="SHOES" 
                            image={outfit.shoes} 
                            active={identifiedType === "shoes"}
                            onClick={() => handleReplaceSlot('shoes')}
                        />
                    </div>

                </div>
            </div>

            {/* Bottom Action */}
            <div className="p-4 bg-white border-t border-gray-100 flex gap-3">
                <Button 
                    variant="outline" 
                    className="flex-1 h-12 rounded-xl border-purple-200 text-purple-700 hover:bg-purple-50 hover:text-purple-800"
                    onClick={handleAutoStyle}
                >
                    <Wand2 className="w-4 h-4 mr-2" />
                    帮你搭
                </Button>
                <Button 
                    className="flex-[2] h-12 rounded-xl bg-gray-900 text-white shadow-lg text-base font-bold"
                    onClick={handleNextStep}
                >
                    下一步
                    <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
            </div>
        </div>
    );
}

function MannequinSlot({ type, label, image, active, onClick }: { type: string, label: string, image?: string, active?: boolean, onClick?: () => void }) {
    return (
         <motion.div 
            whileTap={{ scale: 0.95 }}
            onClick={onClick}
            className={`rounded-xl overflow-hidden flex items-center justify-center relative shadow-sm transition-all duration-500 ease-out cursor-pointer
                ${image ? 'bg-white border-2 border-white shadow-lg scale-105 z-10' : 'bg-white/60 backdrop-blur-sm border border-gray-200/50 hover:border-purple-300 hover:bg-white/80'}
                ${active && !image ? 'border-purple-500 bg-purple-50/80 shadow-[0_0_20px_rgba(168,85,247,0.2)] ring-1 ring-purple-500/30' : ''}
                w-full h-full
            `}
        >
            {image ? (
                <>
                    <img src={image} alt={label} className="w-full h-full object-cover" />
                    {/* Edit Overlay */}
                    <div className="absolute inset-0 bg-black/0 hover:bg-black/10 transition-colors flex items-center justify-center opacity-0 hover:opacity-100">
                         <div className="bg-white/90 rounded-full p-1.5 shadow-sm">
                            <RefreshCw className="w-4 h-4 text-gray-700" />
                         </div>
                    </div>
                </>
            ) : (
                <div className="flex flex-col items-center justify-center gap-0.5 w-full h-full">
                     <div className={`w-5 h-5 rounded-full flex items-center justify-center mb-0.5 transition-colors duration-300 ${active ? 'bg-purple-100 text-purple-600' : 'bg-gray-100 text-gray-400'}`}>
                        <Plus className="w-3 h-3" />
                    </div>
                    <span className={`text-[8px] font-bold tracking-widest uppercase ${active ? 'text-purple-700' : 'text-gray-400'}`}>{label}</span>
                </div>
            )}

            {active && !image && (
                <div className="absolute inset-0 border-2 border-purple-400 rounded-xl animate-pulse opacity-50" />
            )}
        </motion.div>
    )
}

// --- Group Shot Flow ---
function GroupShotView({ onCancel }: { onCancel: () => void }) {
    const [uploadedImage, setUploadedImage] = useState<string | null>(null);
    const [mode, setMode] = useState<'random' | 'multi'>('random');
    const [isProcessing, setIsProcessing] = useState(false);

    const handleUpload = () => {
        // Simulate upload
        setUploadedImage("https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800");
    };

    const handleStart = () => {
        if (!uploadedImage) return;
        setIsProcessing(true);
        setTimeout(() => {
            setIsProcessing(false);
            onCancel(); // Or navigate to result
        }, 2000);
    };

    if (isProcessing) {
         return (
             <div className="fixed inset-0 bg-white z-50 flex flex-col items-center justify-center text-gray-900">
                <div className="w-full max-w-xs text-center space-y-6">
                    <Loader2 className="w-12 h-12 text-purple-600 animate-spin mx-auto" />
                    <div>
                        <h3 className="text-xl font-bold mb-2">正在生成组图...</h3>
                        <p className="text-sm text-gray-500">AI 正在{mode === 'random' ? '随机捕捉最佳视角' : '生成多角度细节'}</p>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="fixed inset-0 bg-gray-50 z-50 flex flex-col">
            {/* Header */}
             <div className="bg-white px-4 py-3 border-b border-gray-100 flex items-center justify-between sticky top-0 z-10">
                <Button variant="ghost" size="icon" className="-ml-2" onClick={onCancel}>
                    <ChevronLeft className="w-6 h-6 text-gray-900" />
                </Button>
                <h3 className="font-bold text-gray-900">组图拍摄</h3>
                <div className="w-8" />
            </div>

            <div className="flex-1 p-4 overflow-y-auto">
                {/* Upload Area */}
                <motion.div 
                    layout
                    onClick={handleUpload}
                    className={`w-full aspect-[3/4] rounded-3xl border-2 border-dashed border-gray-300 bg-white flex flex-col items-center justify-center cursor-pointer transition-all overflow-hidden relative
                        ${uploadedImage ? 'border-purple-500 shadow-xl' : 'hover:bg-gray-50 hover:border-purple-300'}
                    `}
                >
                    {uploadedImage ? (
                        <>
                            <img src={uploadedImage} alt="Uploaded" className="w-full h-full object-cover" />
                            <div className="absolute bottom-4 right-4 bg-black/50 text-white px-3 py-1.5 rounded-full text-xs font-medium backdrop-blur-md flex items-center gap-1.5">
                                <ImagePlus className="w-3.5 h-3.5" />
                                更换图片
                            </div>
                        </>
                    ) : (
                        <div className="text-center space-y-3">
                            <div className="w-16 h-16 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center mx-auto mb-2">
                                <ImagePlus className="w-8 h-8" />
                            </div>
                            <div>
                                <p className="text-gray-900 font-bold text-lg">上传参考图</p>
                                <p className="text-gray-500 text-xs mt-1">支持相册 / 图库导入</p>
                            </div>
                        </div>
                    )}
                </motion.div>

                {/* Mode Selection */}
                <div className="mt-8">
                    <h3 className="text-sm font-bold text-gray-900 mb-3 px-1">选择生成模式</h3>
                    <div className="grid grid-cols-2 gap-3">
                        <ModeCard 
                            title="随意拍" 
                            desc="AI 捕捉灵感瞬间" 
                            icon={<Shuffle className="w-5 h-5" />} 
                            active={mode === 'random'} 
                            onClick={() => setMode('random')} 
                        />
                        <ModeCard 
                            title="多角度" 
                            desc="全方位展示细节" 
                            icon={<Axis3d className="w-5 h-5" />} 
                            active={mode === 'multi'} 
                            onClick={() => setMode('multi')} 
                        />
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className="p-4 bg-white border-t border-gray-100">
                <Button 
                    className="w-full h-14 rounded-2xl text-lg font-bold bg-gray-900 shadow-xl shadow-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={!uploadedImage}
                    onClick={handleStart}
                >
                    <Sparkles className="w-5 h-5 mr-2 text-purple-400" />
                    开始拍摄
                </Button>
            </div>
        </div>
    )
}

function ModeCard({ title, desc, icon, active, onClick }: { title: string, desc: string, icon: React.ReactNode, active?: boolean, onClick: () => void }) {
    return (
        <div 
            onClick={onClick}
            className={`relative p-4 rounded-2xl border transition-all cursor-pointer flex flex-col gap-3 h-28
                ${active ? 'bg-purple-600 border-purple-600 text-white shadow-lg shadow-purple-200' : 'bg-white border-gray-100 text-gray-600 hover:border-purple-100'}
            `}
        >
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${active ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-900'}`}>
                {icon}
            </div>
            <div>
                <h4 className={`font-bold ${active ? 'text-white' : 'text-gray-900'}`}>{title}</h4>
                <p className={`text-[10px] mt-0.5 ${active ? 'text-white/80' : 'text-gray-400'}`}>{desc}</p>
            </div>
            {active && (
                <div className="absolute top-3 right-3">
                    <div className="w-4 h-4 bg-white rounded-full flex items-center justify-center">
                        <Check className="w-2.5 h-2.5 text-purple-600 stroke-[3]" />
                    </div>
                </div>
            )}
        </div>
    )
}

// --- Shoot Mode Selector (Arc Style Refined) ---
function ShootModeSelector({ isOpen, onClose, onSelect }: { isOpen: boolean, onClose: () => void, onSelect: (mode: string) => void }) {
  const modes = [
    { id: "专业棚拍", label: "专业棚拍", icon: <Aperture className="w-6 h-6 text-white" />, position: "bottom-[130px] left-[15%]" },
    { id: "买家秀", label: "买家秀", icon: <Users className="w-6 h-6 text-white" />, position: "bottom-[180px] left-1/2 -translate-x-1/2" },
    { id: "商品棚拍", label: "商品棚拍", icon: <Box className="w-6 h-6 text-white" />, position: "bottom-[130px] right-[15%]" },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex flex-col items-center justify-end pb-8"
        >
            {/* Background Gradient/Glow (Bottom) */}
            <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/80 to-transparent pointer-events-none" />

            {/* Menu Items */}
            <div className="absolute inset-0">
                 {modes.map((m, i) => (
                     <motion.div
                        key={m.id}
                        initial={{ opacity: 0, scale: 0.5, y: 50 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.5, y: 50 }}
                        transition={{ delay: i * 0.1, type: "spring", stiffness: 300, damping: 20 }}
                        className={`absolute ${m.position} flex flex-col items-center gap-2 group cursor-pointer z-20`}
                        onClick={() => onSelect(m.id)}
                     >
                         <div className="w-16 h-16 rounded-full bg-zinc-800/80 backdrop-blur-sm border border-white/10 flex items-center justify-center transition-all group-hover:bg-zinc-700/80 group-hover:scale-110 shadow-lg">
                            {m.icon}
                         </div>
                         <span className="text-white text-xs font-medium tracking-wide shadow-black drop-shadow-md">{m.label}</span>
                     </motion.div>
                 ))}
            </div>

            {/* Close Button */}
            <motion.button
                initial={{ rotate: -90, opacity: 0, scale: 0.8 }}
                animate={{ rotate: 0, opacity: 1, scale: 1 }}
                exit={{ rotate: 90, opacity: 0, scale: 0.8 }}
                transition={{ delay: 0.2 }}
                onClick={onClose}
                className="w-12 h-12 rounded-full bg-zinc-800/80 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white hover:bg-zinc-700/80 transition-colors z-20 relative shadow-lg"
            >
                <X className="w-5 h-5" />
            </motion.button>
            
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// --- View Components ---

function HomeView({ onNavigate }: { onNavigate: (feature: string) => void }) {
  return (
    <>
      <div className="flex-1 pt-4 pb-24 overflow-y-auto scrollbar-hide bg-gray-50/50">
        
        {/* Section 1: Model Photography */}
        <div className="px-4">
            <SectionHeader title="拍模特" icon={<ScanFace className="w-4 h-4 text-purple-600" />} />
            <div className="flex gap-3 overflow-x-auto pb-4 -mx-4 px-4 scrollbar-hide snap-x">
                 <BeforeAfterCard 
                    title="专业棚拍"
                    subtitle="纯色背景质感"
                    beforeImage="https://images.unsplash.com/photo-1550614000-4b9519e02d48?w=400"
                    afterImage="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400"
                    onClick={() => onNavigate('专业棚拍')}
                />
                <BeforeAfterCard 
                    title="买家秀"
                    subtitle="真实生活场景"
                    beforeImage="https://images.unsplash.com/photo-1554412933-514a83d2f3c8?w=400"
                    afterImage="https://images.unsplash.com/photo-1746458258548-5e5bd7225c9c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400"
                    onClick={() => onNavigate('买家秀')}
                />
                <BeforeAfterCard 
                    title="组图拍摄"
                    subtitle="多角度套图"
                    beforeImage="https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400"
                    afterImage="https://images.unsplash.com/photo-1619199037745-bcc49b4afb0a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400"
                    badge="NEW"
                    onClick={() => onNavigate('组图拍摄')}
                />
                 <BeforeAfterCard 
                    title="氛围大片"
                    subtitle="高级外景氛围"
                    beforeImage="https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=400"
                    afterImage="https://images.unsplash.com/photo-1759003527686-807990b8df26?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400"
                    onClick={() => onNavigate('氛围大片')}
                />
            </div>
        </div>

        {/* Section 2: Product Photography */}
        <div className="px-4 mt-2">
            <SectionHeader title="拍商品" icon={<Box className="w-4 h-4 text-orange-600" />} />
            <div className="flex gap-3 overflow-x-auto pb-4 -mx-4 px-4 scrollbar-hide snap-x">
                <BeforeAfterCard 
                    title="商品棚拍"
                    subtitle="电商白底图"
                    beforeImage="https://images.unsplash.com/photo-1629198688000-71f23e745b6e?w=400"
                    afterImage="https://images.unsplash.com/photo-1629198688000-71f23e745b6e?w=400&bg=fff" // Mocking a clear bg effect with slightly diff url params or distinct image
                    onClick={() => onNavigate('商品棚拍')}
                />
                <BeforeAfterCard 
                    title="商品挂拍"
                    subtitle="服装自然垂顺"
                    beforeImage="https://images.unsplash.com/photo-1580842402762-6f5868c17412?w=400"
                    afterImage="https://images.unsplash.com/photo-1580842402762-6f5868c17412?w=400&sat=-100" // Mocking style change
                    onClick={() => onNavigate('商品挂拍')}
                />
                 <BeforeAfterCard 
                    title="商品氛围"
                    subtitle="场景化营销"
                    beforeImage="https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400"
                    afterImage="https://images.unsplash.com/photo-1634944119603-74cab6454618?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400"
                    onClick={() => onNavigate('商品氛围')}
                />
            </div>
        </div>

        {/* Section 3: Retouch Room */}
        <div className="px-4 mt-2">
            <SectionHeader title="修图室" icon={<Wand2 className="w-4 h-4 text-blue-600" />} />
            <div className="flex flex-col">
                <RetouchRow 
                    title="通用编辑"
                    subtitle="画质增强、智能抠图、消除笔"
                    icon={<Settings className="w-6 h-6" />}
                    image="https://images.unsplash.com/photo-1746458825397-9cd95fff0dfb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=200"
                    onClick={() => onNavigate('通用编辑')}
                />
                <RetouchRow 
                    title="换搭配"
                    subtitle="智能生成穿搭组合"
                    icon={<Shirt className="w-6 h-6" />}
                    image="https://images.unsplash.com/photo-1608680480325-d3ec3cdf7e60?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=200"
                    onClick={() => onNavigate('换搭配')}
                />
                 <RetouchRow 
                    title="换模特"
                    subtitle="保留服装，更换模特人脸"
                    icon={<Smile className="w-6 h-6" />}
                    image="https://images.unsplash.com/photo-1630258247228-b39e4f76cd60?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=200"
                    onClick={() => onNavigate('换模特')}
                />
            </div>
        </div>

      </div>
    </>
  );
}

function RetouchView({ onNavigate }: { onNavigate: (feature: string) => void }) {
    return (
        <div className="flex-1 px-4 pt-4 pb-24 overflow-y-auto scrollbar-hide bg-white">
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900">AI 修图室</h2>
                <p className="text-sm text-gray-500 mt-1">选择工具开始创作</p>
            </div>

            <div className="grid grid-cols-1 gap-4">
                <ToolCard 
                    title="通用修图"
                    description="画质增强、智能抠图、魔法消除"
                    icon={<Wand2 className="w-5 h-5" />}
                    image="https://images.unsplash.com/photo-1607616996527-a641c438bc69?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600"
                    color="bg-blue-600"
                    onClick={() => onNavigate("通用修图")}
                />

                <ToolCard 
                    title="换搭配"
                    description="智能生成穿搭组合，无限可能"
                    icon={<Shirt className="w-5 h-5" />}
                    image="https://images.unsplash.com/photo-1582142306909-195724d33ffc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600"
                    color="bg-pink-600"
                    onClick={() => onNavigate("换搭配")}
                />

                <ToolCard 
                    title="换模特"
                    description="保留服装，更换模特人脸与风格"
                    icon={<Smile className="w-5 h-5" />}
                    image="https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600"
                    color="bg-indigo-600"
                    onClick={() => onNavigate("换模特")}
                />
            </div>
        </div>
    );
}

function FeatureDetailView({ feature, onBack }: { feature: string, onBack: () => void }) {
    return (
        <div className="flex-1 flex flex-col bg-gray-50">
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
                <div className="w-24 h-24 bg-white rounded-[2rem] flex items-center justify-center shadow-sm mb-6">
                    <Sparkles className="w-12 h-12 text-purple-500" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">{feature}</h2>
                <p className="text-gray-500 text-sm max-w-[240px] leading-relaxed">
                    使用 BrandCam 的 AI 技术为您生成高质量的 {feature}。上传您的素材，剩下的交给我们。
                </p>
                
                <div className="mt-10 w-full max-w-xs space-y-4">
                    <div className="h-40 bg-white rounded-2xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center text-gray-400 gap-2 hover:border-purple-200 hover:bg-purple-50/50 transition-colors cursor-pointer">
                         <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                            <ImageIcon className="w-5 h-5 text-gray-400" />
                         </div>
                        <span className="text-xs font-medium">点击上传图片</span>
                    </div>
                    <Button className="w-full h-12 text-base rounded-xl bg-gray-900 hover:bg-gray-800 shadow-lg shadow-gray-900/20">
                        开始生成
                    </Button>
                </div>
            </div>
        </div>
    );
}

// Main App
export default function App() {
  const [activeTab, setActiveTab] = useState("home");
  const [selectedFeature, setSelectedFeature] = useState<string | null>(null);
  const [isShooting, setIsShooting] = useState(false);
  const [showShootMenu, setShowShootMenu] = useState(false);
  const [shootMode, setShootMode] = useState("");

  const handleTabChange = (tab: string) => {
    if (tab === 'shoot') {
        setShowShootMenu(true);
        return;
    }
    setActiveTab(tab);
    setSelectedFeature(null);
  };

  const handleShootSelect = (mode: string) => {
      setShootMode(mode);
      setShowShootMenu(false);
      setIsShooting(true);
  };

  const handleNavigate = (feature: string) => {
      setSelectedFeature(feature);
  };

  return (
    <div className="min-h-screen bg-white font-sans max-w-md mx-auto shadow-2xl overflow-hidden relative flex flex-col">
      {/* Shoot Mode Menu Overlay */}
      <ShootModeSelector 
        isOpen={showShootMenu} 
        onClose={() => setShowShootMenu(false)} 
        onSelect={handleShootSelect} 
      />

      {/* Camera / Shoot Flow Overlay */}
      <AnimatePresence>
        {isShooting && (
            <motion.div 
                initial={{ opacity: 0, y: '100%' }} 
                animate={{ opacity: 1, y: 0 }} 
                exit={{ opacity: 0, y: '100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                className="fixed inset-0 z-50 bg-black"
            >
                <ShootFlow onCancel={() => setIsShooting(false)} mode={shootMode} />
            </motion.div>
        )}
      </AnimatePresence>
      
      {/* Group Shot Flow Overlay */}
      <AnimatePresence>
        {selectedFeature === '组图拍摄' && (
             <motion.div 
                key="group-shot"
                initial={{ opacity: 0, x: 20 }} 
                animate={{ opacity: 1, x: 0 }} 
                exit={{ opacity: 0, x: -20 }}
                className="fixed inset-0 z-40 bg-gray-50"
            >
                <GroupShotView onCancel={() => setSelectedFeature(null)} />
            </motion.div>
        )}
      </AnimatePresence>


      <Header 
        title={selectedFeature || (activeTab === 'assets' ? "品牌资产" : activeTab === 'gallery' ? "我的作品" : activeTab === 'retouch' ? "AI 修图" : "BrandCam")} 
        showBack={!!selectedFeature && selectedFeature !== '组图拍摄'}
        onBack={() => setSelectedFeature(null)}
      />
      
      <AnimatePresence mode="wait">
        {activeTab === 'home' && !selectedFeature && (
             <motion.div key="home" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex-1 flex flex-col overflow-hidden">
                 <HomeView onNavigate={handleNavigate} />
             </motion.div>
        )}
        
        {activeTab === 'retouch' && !selectedFeature && (
             <motion.div key="retouch" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex-1 flex flex-col overflow-hidden">
                 <RetouchView onNavigate={handleNavigate} />
             </motion.div>
        )}

        {selectedFeature && selectedFeature !== '组图拍摄' && (
            <motion.div key="detail" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex-1 flex flex-col overflow-hidden">
                <FeatureDetailView feature={selectedFeature} onBack={() => setSelectedFeature(null)} />
            </motion.div>
        )}

        {(activeTab === 'assets' || activeTab === 'gallery') && (
            <motion.div key="placeholder" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex-1 flex items-center justify-center text-gray-400 text-sm">
                <div className="text-center">
                    <p className="font-medium text-gray-900 mb-1">{activeTab === 'assets' ? '品牌资产' : '我的成片'}</p>
                    <p>功能开发中...</p>
                </div>
            </motion.div>
        )}
      </AnimatePresence>

      <BottomNav activeTab={activeTab} onTabChange={handleTabChange} />
    </div>
  );
}
