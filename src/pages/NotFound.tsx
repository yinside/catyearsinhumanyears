import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function NotFound() {
  return (
    <>
      <Helmet>
        <title>Missing Cat Notice - 404 Page Lost | Cat Years Calculator</title>
        <meta name="description" content="Urgent missing cat notice! Our 404 page has gone missing. If found, please contact us immediately. Generous reward offered!" />
        <meta name="keywords" content="missing cat notice, 404 error, page lost, cat age calculator" />
        <meta name="robots" content="noindex, nofollow" />
        <meta property="og:title" content="Missing Cat Notice - 404 Page Lost | Cat Years Calculator" />
        <meta property="og:description" content="Urgent missing cat notice! Our 404 page has gone missing. If found, please contact us immediately. Generous reward offered!" />
        <meta name="twitter:title" content="Missing Cat Notice - 404 Page Lost | Cat Years Calculator" />
        <meta name="twitter:description" content="Urgent missing cat notice! Our 404 page has gone missing. If found, please contact us immediately. Generous reward offered!" />
      </Helmet>
      
      <div className="min-h-screen bg-amber-50" style={{backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(139,69,19,0.15) 1px, transparent 0)', backgroundSize: '20px 20px'}}>
        <Header />
        
        <main className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            {/* 复古报纸风格的寻猫启事 */}
            <div className="bg-yellow-50 border-8 border-amber-900 shadow-2xl transform -rotate-1 relative" style={{boxShadow: '20px 20px 0px rgba(139,69,19,0.3), inset 0 0 50px rgba(139,69,19,0.1)'}}>
              {/* 复古装饰边框 */}
              <div className="absolute inset-2 border-4 border-amber-800" style={{borderStyle: 'double'}}></div>
              <div className="absolute inset-4 border-2 border-amber-700" style={{borderStyle: 'dotted'}}></div>
              
              {/* 顶部装饰条 */}
              <div className="bg-amber-900 text-yellow-100 text-center py-3 relative z-10" style={{backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 2px, rgba(0,0,0,0.1) 2px, rgba(0,0,0,0.1) 4px)'}}>
                <div className="text-sm font-bold tracking-widest" style={{fontFamily: 'serif', textShadow: '2px 2px 4px rgba(0,0,0,0.5)'}}>✦ ✧ ✦ URGENT NOTICE ✦ ✧ ✦</div>
              </div>
              
              <div className="p-8 md:p-12 relative z-10">
                {/* 复古装饰花纹 */}
                <div className="text-center mb-4">
                  <div className="text-amber-800 text-2xl">❦ ❦ ❦ ❦ ❦</div>
                </div>
                
                {/* 主标题 - 复古风格 */}
                <div className="text-center mb-8">
                  <h1 className="text-6xl md:text-8xl font-black text-amber-900 mb-4 tracking-wider transform -skew-x-1" style={{fontFamily: 'serif', textShadow: '4px 4px 8px rgba(139,69,19,0.3), 2px 2px 4px rgba(0,0,0,0.2)', filter: 'drop-shadow(2px 2px 0px rgba(139,69,19,0.5))'}}>
                    MISSING CAT
                  </h1>
                  <div className="bg-amber-800 text-yellow-100 px-6 py-3 inline-block transform rotate-1 border-4 border-amber-900" style={{backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 2px, rgba(0,0,0,0.1) 2px, rgba(0,0,0,0.1) 4px)', boxShadow: '4px 4px 8px rgba(139,69,19,0.4)'}}>
                    <span className="text-xl font-bold" style={{fontFamily: 'serif', textShadow: '2px 2px 4px rgba(0,0,0,0.5)'}}>✦ GENEROUS REWARD!!! ✦</span>
                  </div>
                </div>
                
                {/* 复古分隔线 */}
                <div className="text-center mb-8">
                  <div className="text-amber-800 text-xl">━━━ ❦ ❦ ❦ ━━━</div>
                </div>
                
                {/* 走失信息 */}
                 <div className="bg-yellow-50 border-4 border-amber-800 p-6 mb-8 transform rotate-1 relative" style={{backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 18px, rgba(139,69,19,0.1) 18px, rgba(139,69,19,0.1) 20px)', boxShadow: '6px 6px 12px rgba(139,69,19,0.3)'}}>
                   <div className="absolute top-2 left-2 text-amber-700 text-lg">❦</div>
                   <div className="absolute top-2 right-2 text-amber-700 text-lg">❦</div>
                   <div className="absolute bottom-2 left-2 text-amber-700 text-lg">❦</div>
                   <div className="absolute bottom-2 right-2 text-amber-700 text-lg">❦</div>
                   
                   <h2 className="text-3xl font-black text-amber-900 mb-4 text-center" style={{fontFamily: 'serif', textShadow: '2px 2px 4px rgba(139,69,19,0.3)'}}>
                     ✦ MISSING INFORMATION ✦
                   </h2>
                   <div className="text-xl text-amber-900 space-y-3" style={{fontFamily: 'serif'}}>
                     <p><span className="font-bold">Missing Subject:</span> 404 Page (suspected orange cat in disguise)</p>
                     <p><span className="font-bold">Time Missing:</span> Just now, the moment you clicked</p>
                     <p><span className="font-bold">Last Location:</span> Somewhere in the internet</p>
                     <p><span className="font-bold">Last Sighting:</span> Wandering near the server room</p>
                   </div>
                 </div>
                 
                 {/* 复古分隔线 */}
                 <div className="text-center mb-6">
                   <div className="text-amber-700 text-lg">✧ ✦ ✧ ✦ ✧ ✦ ✧ ✦ ✧</div>
                 </div>
                 
                 {/* 特征描述 */}
                 <div className="bg-amber-50 border-4 border-amber-800 p-6 mb-8 transform -rotate-1 relative" style={{backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 18px, rgba(139,69,19,0.1) 18px, rgba(139,69,19,0.1) 20px)', boxShadow: '6px 6px 12px rgba(139,69,19,0.3)'}}>
                   <div className="absolute top-2 left-2 text-amber-700 text-lg">❦</div>
                   <div className="absolute top-2 right-2 text-amber-700 text-lg">❦</div>
                   <div className="absolute bottom-2 left-2 text-amber-700 text-lg">❦</div>
                   <div className="absolute bottom-2 right-2 text-amber-700 text-lg">❦</div>
                   
                   <h2 className="text-3xl font-black text-amber-900 mb-4 text-center" style={{fontFamily: 'serif', textShadow: '2px 2px 4px rgba(139,69,19,0.3)'}}>
                     ✦ DESCRIPTION ✦
                   </h2>
                   <div className="text-lg text-amber-900 space-y-2" style={{fontFamily: 'serif'}}>
                     <p>❦ Identity: 404 Error Page, usually disguised as an orange cat</p>
                     <p>❦ Personality: Mischievous, loves to disappear when users need it most</p>
                     <p>❦ Habits: Often plays hide-and-seek with other pages</p>
                     <p>❦ Special Skills: Teleportation, invisibility</p>
                     <p>❦ Hobbies: Collecting confused user expressions</p>
                   </div>
                 </div>
                
                {/* 复古分隔线 */}
                 <div className="text-center mb-6">
                   <div className="text-amber-700 text-lg">✧ ✦ ✧ ✦ ✧ ✦ ✧ ✦ ✧</div>
                 </div>
                 
                 {/* 猫咪图案 */}
                 <div className="text-center my-8">
                   <div className="inline-block bg-amber-50 p-6 border-4 border-amber-800 relative" style={{backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 2px, rgba(139,69,19,0.1) 2px, rgba(139,69,19,0.1) 4px)', boxShadow: '6px 6px 12px rgba(139,69,19,0.3)'}}>
                     <div className="absolute top-1 left-1 text-amber-700 text-sm">❦</div>
                     <div className="absolute top-1 right-1 text-amber-700 text-sm">❦</div>
                     <div className="absolute bottom-1 left-1 text-amber-700 text-sm">❦</div>
                     <div className="absolute bottom-1 right-1 text-amber-700 text-sm">❦</div>
                     
                     <div className="text-6xl mb-3" style={{filter: 'sepia(0.3) contrast(1.2)'}}>🐱</div>
                     <div className="text-amber-900 font-bold text-lg" style={{fontFamily: 'serif', fontStyle: 'italic'}}>"Meow~ I just wanted to play..."</div>
                   </div>
                 </div>
                 
                 {/* 复古分隔线 */}
                 <div className="text-center mb-6">
                   <div className="text-amber-700 text-lg">✧ ✦ ✧ ✦ ✧ ✦ ✧ ✦ ✧</div>
                 </div>
                 
                 {/* 联系方式 */}
                 <div className="bg-yellow-50 border-4 border-amber-800 p-6 mb-8 relative" style={{backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 18px, rgba(139,69,19,0.1) 18px, rgba(139,69,19,0.1) 20px)', boxShadow: '6px 6px 12px rgba(139,69,19,0.3)'}}>
                   <div className="absolute top-2 left-2 text-amber-700 text-lg">❦</div>
                   <div className="absolute top-2 right-2 text-amber-700 text-lg">❦</div>
                   <div className="absolute bottom-2 left-2 text-amber-700 text-lg">❦</div>
                   <div className="absolute bottom-2 right-2 text-amber-700 text-lg">❦</div>
                   
                   <h2 className="text-3xl font-black text-amber-900 mb-4 text-center" style={{fontFamily: 'serif', textShadow: '2px 2px 4px rgba(139,69,19,0.3)'}}>
                     ✦ CONTACT INFO ✦
                   </h2>
                   <div className="text-xl text-amber-900 text-center space-y-2" style={{fontFamily: 'serif'}}>
                     <p>If you find this page, please click the button below immediately</p>
                     <p>Or call our hotline: <span className="font-bold">404-CAT-LOST</span></p>
                     <p className="text-lg text-amber-800 italic">(We're on standby 24/7, ready to rescue lost pages)</p>
                   </div>
                 </div>
                
                {/* 复古分隔线 */}
                 <div className="text-center mb-6">
                   <div className="text-amber-700 text-lg">✧ ✦ ✧ ✦ ✧ ✦ ✧ ✦ ✧</div>
                 </div>
                 
                 {/* 返回按钮 */}
                 <div className="text-center mb-8">
                   <Link 
                     to="/" 
                     className="inline-block bg-amber-800 text-yellow-100 px-12 py-4 text-2xl font-black 
                              hover:bg-amber-900 transition-all duration-200 border-4 border-amber-900
                              hover:border-amber-700 shadow-lg transform hover:scale-105
                              tracking-wider relative"
                     style={{fontFamily: 'serif', textShadow: '2px 2px 4px rgba(0,0,0,0.5)', backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 2px, rgba(0,0,0,0.1) 2px, rgba(0,0,0,0.1) 4px)', boxShadow: '6px 6px 12px rgba(139,69,19,0.4)'}}
                   >
                     🏠 TAKE ME HOME
                   </Link>
                 </div>
                 
                 {/* 复古分隔线 */}
                 <div className="text-center mb-6">
                   <div className="text-amber-700 text-lg">━━━ ❦ ❦ ❦ ━━━</div>
                 </div>
                 
                 {/* 底部声明 */}
                 <div className="text-center text-amber-800 text-sm border-t-4 border-amber-700 pt-6 relative" style={{borderStyle: 'double', fontFamily: 'serif'}}>
                   <div className="absolute top-2 left-1/2 transform -translate-x-1/2 text-amber-700 text-lg">❦</div>
                   <p className="font-bold text-lg mb-2" style={{textShadow: '1px 1px 2px rgba(139,69,19,0.3)'}}>✦ DISCLAIMER ✦</p>
                   <p className="mb-1">This notice is purely fictional. Any resemblance is purely coincidental</p>
                   <p className="mb-1">No orange cats are responsible for missing pages</p>
                   <p className="mt-3 text-xs text-amber-700">✦ This notice has been certified by the Cat Review Committee ✦</p>
                 </div>
               </div>
               
               {/* 底部装饰条 */}
               <div className="bg-amber-900 text-yellow-100 text-center py-3 relative z-10" style={{backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 2px, rgba(0,0,0,0.1) 2px, rgba(0,0,0,0.1) 4px)'}}>
                 <div className="text-sm font-bold tracking-widest" style={{fontFamily: 'serif', textShadow: '2px 2px 4px rgba(0,0,0,0.5)'}}>✦ ✧ ✦ THANK YOU FOR YOUR ATTENTION ✦ ✧ ✦</div>
               </div>
            </div>
          </div>
        </main>
        
        <Footer />
      </div>
    </>
  );
}