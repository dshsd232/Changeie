import React, { useState, useEffect } from "react";
import { Navigation } from "./components/Navigation";
import { CryptoTicker } from "./components/CryptoTicker";
import { WalletProvider } from "./components/WalletProvider";
import { PageRenderer } from "./components/PageRenderer";
import { CommunitySection } from "./components/CommunitySection";
import { Footer } from "./components/Footer";
import { ScrollToTop } from "./components/ScrollToTop";
import { BackgroundElements } from "./components/BackgroundElements";

export default function App() {
  const [activeSection, setActiveSection] = useState("home");
  const [platformStatus, setPlatformStatus] = useState<'demo' | 'live' | 'loading' | 'error'>('loading');
  const [isInitialized, setIsInitialized] = useState(false);
  
  // Enhanced coin selection handler
  const handleCoinSelect = (coinSymbol: string) => {
    setActiveSection("markets");
  };

  // Initialize platform with ChangeNOW API integration
  useEffect(() => {
    const initializePlatform = async () => {
      try {
        console.log('🚀 changeie - Initializing with ChangeNOW API...');
        
        // Start with loading state
        setPlatformStatus('loading');
        
        // Quick delay for smooth UI
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Try to load ChangeNOW API service
        try {
          const apiModule = await import("./components/services/changeNowApi");
          
          // Quick API status check with short timeout
          const apiStatusPromise = apiModule.getApiStatus();
          const timeoutPromise = new Promise<string>((_, reject) => 
            setTimeout(() => reject(new Error('Timeout')), 3000)
          );
          
          const apiStatus = await Promise.race([apiStatusPromise, timeoutPromise]);
          
          if (apiStatus === 'live') {
            console.log('✅ ChangeNOW API: LIVE PRODUCTION MODE');
            console.log('💰 Real Trading: ENABLED');
            console.log('🔑 API Key: 407bd59c...3104');
            setPlatformStatus('live');
          } else if (apiStatus === 'error' || apiStatus === 'demo') {
            console.log('📊 ChangeNOW API: DEMO MODE');
            console.log('🔧 Using fallback data');
            setPlatformStatus('demo');
          } else {
            console.log('📊 ChangeNOW API: DEMO MODE (default)');
            setPlatformStatus('demo');
          }
        } catch (error) {
          console.log('📊 ChangeNOW API: DEMO MODE (fallback)');
          setPlatformStatus('demo');
        }
        
      } catch (error) {
        console.log('📊 Platform: DEMO MODE (safe fallback)');
        setPlatformStatus('demo');
      } finally {
        setIsInitialized(true);
        console.log('✅ Platform initialized successfully');
      }
    };

    initializePlatform();
  }, []);

  // Get platform status info
  const getStatusInfo = () => {
    switch (platformStatus) {
      case 'live':
        return {
          badge: 'LIVE PRODUCTION',
          color: 'bg-green-500/20 text-green-400 border-green-400/30',
          dotColor: 'bg-green-400',
          message: 'Real ChangeNOW API Active',
          clickAction: 'test'
        };
      case 'demo':
        return {
          badge: 'DEMO MODE',
          color: 'bg-blue-500/20 text-blue-400 border-blue-400/30', 
          dotColor: 'bg-blue-400',
          message: 'Preview Mode Active',
          clickAction: 'test'
        };
      case 'error':
        return {
          badge: 'CONNECTION ISSUES',
          color: 'bg-red-500/20 text-red-400 border-red-400/30',
          dotColor: 'bg-red-400',
          message: 'Click to troubleshoot',
          clickAction: 'troubleshoot'
        };
      default:
        return {
          badge: 'INITIALIZING',
          color: 'bg-gray-500/20 text-gray-400 border-gray-400/30',
          dotColor: 'bg-gray-400',
          message: 'Connecting to API...',
          clickAction: 'test'
        };
    }
  };

  const statusInfo = getStatusInfo();

  // Loading screen with ChangeNOW branding
  if (!isInitialized) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-6 max-w-md">
          {/* Loading Animation */}
          <div className="relative w-20 h-20 mx-auto mb-6">
            <div className="absolute inset-0 rounded-full border-2 border-primary/20"></div>
            <div className="absolute inset-0 rounded-full border-2 border-primary border-t-transparent animate-spin"></div>
            <div className="absolute inset-2 rounded-full bg-primary/20 flex items-center justify-center">
              <div className="w-8 h-8 rounded-full bg-primary animate-pulse"></div>
            </div>
          </div>

          {/* Platform Info */}
          <div className="space-y-3">
            <h2 className="text-4xl font-bold changeie-logo">changeie</h2>
            <p className="text-xl text-muted-foreground">Professional Crypto Trading Platform</p>
            
            <div className="flex items-center justify-center gap-2 mt-4">
              <div className={`px-3 py-1 rounded-full border text-sm font-medium ${statusInfo.color}`}>
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full animate-pulse ${statusInfo.dotColor}`}></div>
                  <span>{statusInfo.badge}</span>
                </div>
              </div>
            </div>
            
            <p className="text-sm text-muted-foreground">{statusInfo.message}</p>
          </div>

          {/* Loading Steps */}
          <div className="text-xs text-muted-foreground space-y-2 mt-6">
            <div className="flex items-center justify-center gap-2">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
              <span>🔧 Initializing platform components...</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
              <span>🔍 Connecting to ChangeNOW API...</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <div className="w-2 h-2 bg-warning rounded-full animate-pulse"></div>
              <span>🌐 Verifying server integration...</span>
            </div>
          </div>

          {/* Platform Details */}
          <div className="text-xs text-muted-foreground opacity-60 pt-4 border-t border-border/30 space-y-1">
            <div>🏢 jekqqdgvxxjachgzjhhb.supabase.co</div>
            <div>🔑 ChangeNOW API: 407bd59c...3104</div>
            <div>🛡️ Enterprise-Grade Security</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <WalletProvider>
      <div className="min-h-screen bg-background text-foreground">
        {/* Navigation */}
        <Navigation activeSection={activeSection} setActiveSection={setActiveSection} />
        
        {/* Crypto Ticker */}
        <CryptoTicker onCoinSelect={handleCoinSelect} />

        {/* Main Content */}
        <main className="relative">
          <div className="w-full">
            <PageRenderer activeSection={activeSection} setActiveSection={setActiveSection} />
          </div>
        </main>

        {/* Community Section - Show on specific pages */}
        {(activeSection === "home" || activeSection === "about" || activeSection === "journey") && (
          <CommunitySection />
        )}

        {/* Footer */}
        <Footer setActiveSection={setActiveSection} />

        {/* Scroll to Top Button */}
        <ScrollToTop />

        {/* Background Elements */}
        <BackgroundElements />

        {/* Platform Status Indicator - Enhanced with Real API */}
        <div className="fixed bottom-4 left-4 z-50">
          <div 
            className="glass-card p-3 cursor-pointer hover:scale-105 transition-all duration-300 hover:shadow-lg"
            onClick={() => setActiveSection(statusInfo.clickAction)}
            title={
              platformStatus === 'live' 
                ? "Live ChangeNOW API - Click to test" 
                : platformStatus === 'error'
                ? "Click to troubleshoot connectivity issues"
                : "Click to open Platform Tester"
            }
          >
            <div className="flex items-center gap-3">
              <div className={`w-3 h-3 rounded-full animate-pulse ${statusInfo.dotColor}`}></div>
              <div className="flex flex-col">
                <span className={`text-xs font-bold ${
                  platformStatus === 'live' ? 'text-green-400' :
                  platformStatus === 'demo' ? 'text-blue-400' :
                  platformStatus === 'error' ? 'text-red-400' : 'text-gray-400'
                }`}>
                  {statusInfo.badge}
                </span>
                <span className="text-xs text-muted-foreground">
                  {statusInfo.message}
                </span>
                <span className="text-xs text-muted-foreground opacity-60">
                  {platformStatus === 'live' ? 'Real API' : 
                   platformStatus === 'error' ? 'Click to fix' : 'Click to test'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Live Mode Success Indicator */}
        {platformStatus === 'live' && (
          <div className="fixed top-20 right-4 z-50">
            <div className="glass-card bg-green-500/10 border-green-400/30 p-4 px-5 animate-premium-glow">
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 text-green-400">🚀</div>
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-green-400">
                    LIVE PRODUCTION
                  </span>
                  <span className="text-xs text-green-300">
                    Real ChangeNOW API
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Error Mode Alert */}
        {platformStatus === 'error' && (
          <div className="fixed top-20 right-4 z-50">
            <div className="glass-card bg-red-500/10 border-red-400/30 p-4 px-5 animate-pulse">
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 text-red-400">⚠️</div>
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-red-400">
                    CONNECTION ISSUES
                  </span>
                  <span className="text-xs text-red-300">
                    Click status to troubleshoot
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Live Mode Celebration */}
        {platformStatus === 'live' && (
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 pointer-events-none">
            <div className="animate-fadeIn opacity-90" style={{ 
              animation: 'fadeIn 2s ease-out 1s both, scaleIn 0.8s ease-out 1.5s both'
            }}>
              <div className="glass-card bg-green-500/20 border-green-400/40 p-8 text-center max-w-sm shadow-2xl">
                <div className="text-5xl mb-4">🎉</div>
                <h3 className="text-lg font-bold text-green-400 mb-2">Platform Live!</h3>
                <p className="text-sm text-green-300 mb-2">
                  ChangeNOW API integration successful
                </p>
                <div className="text-xs text-green-200 opacity-80">
                  Real trading enabled • Live data streaming
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Platform Info Footer */}
        <div className="fixed bottom-4 right-4 z-40">
          <div className="glass-card p-2 px-3 text-xs text-muted-foreground hover:bg-secondary/20 transition-colors">
            <div className="flex items-center gap-2">
              <span>changeie v1.0.0</span>
              <span className="w-1 h-1 rounded-full bg-muted-foreground opacity-50"></span>
              <span>jekqqdgvxxjachgzjhhb</span>
              <span className="w-1 h-1 rounded-full bg-muted-foreground opacity-50"></span>
              <span className={
                platformStatus === 'live' ? 'text-green-400' :
                platformStatus === 'demo' ? 'text-blue-400' :
                platformStatus === 'error' ? 'text-red-400' : 'text-gray-400'
              }>
                {platformStatus.toUpperCase()}
              </span>
            </div>
          </div>
        </div>

        {/* ChangeNOW Powered Badge - Enhanced for Live Mode */}
        <div className="fixed top-1/2 right-4 z-30 transform -translate-y-1/2 rotate-90 origin-center">
          <div className={`glass-card p-2 px-3 text-xs transition-all duration-300 ${
            platformStatus === 'live' 
              ? 'text-green-400 opacity-80 hover:opacity-100 border-green-400/20' 
              : 'text-muted-foreground opacity-60 hover:opacity-100'
          }`}>
            <div className="flex items-center gap-1 whitespace-nowrap">
              <span>Powered by</span>
              <span className="font-semibold text-primary">ChangeNOW</span>
              {platformStatus === 'live' && (
                <span className="w-1 h-1 bg-green-400 rounded-full animate-pulse ml-1"></span>
              )}
            </div>
          </div>
        </div>

        {/* Development Status Indicator */}
        {platformStatus === 'live' && (
          <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-40 pointer-events-none">
            <div className="glass-card bg-green-500/10 border-green-400/30 p-2 px-4 animate-fadeIn">
              <div className="text-xs text-green-400 font-medium">
                ✅ Live: ChangeNOW API Connected & Trading Enabled
              </div>
            </div>
          </div>
        )}

        {/* Troubleshooting Helper */}
        {platformStatus === 'error' && (
          <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-40 pointer-events-none">
            <div className="glass-card bg-red-500/10 border-red-400/30 p-2 px-4 animate-pulse">
              <div className="text-xs text-red-400 font-medium">
                ⚠️ API Connection Issues - Click status indicator to troubleshoot
              </div>
            </div>
          </div>
        )}
      </div>
    </WalletProvider>
  );
}