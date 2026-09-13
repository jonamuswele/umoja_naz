import React, { useState, useEffect } from 'react';
import { Compass, Phone, Mail, MapPin, Menu, X, ShieldCheck, Sparkles } from 'lucide-react';

// Import our core components
import Home from './components/Home';
import ExploreHub from './components/ExploreHub';
import HouseFeaturesConfigurator from './components/HouseFeaturesConfigurator';
import ServiceShowcasePage from './components/ServiceShowcasePage';
import ServiceBookingPage from './components/ServiceBookingPage';
import SellerPortalPage from './components/SellerPortalPage';
import BuildingMaterialMarketplace from './components/BuildingMaterialMarketplace';
import PropertyEstateManagement from './components/PropertyEstateManagement';
import HomeServicesMarketplace from './components/HomeServicesMarketplace';
import SmartHomeIntegration from './components/SmartHomeIntegration';
import RealEstateFinancing from './components/RealEstateFinancing';
import LegalDocumentationHub from './components/LegalDocumentationHub';
import LandVerificationHub from './components/LandVerificationHub';
import InteriorDesignHub from './components/InteriorDesignHub';
import MovingRelocationHub from './components/MovingRelocationHub';
import { SERVICES } from './data/servicesData';

export default function App() {
  const [activeTab, setActiveTab] = useState('home'); // 'home' or 'explore'
  const [selectedServiceId, setSelectedServiceId] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  // Disable automatic scroll restoration so page transitions always start at the top
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
  }, []);

  // Auto-scroll to top whenever page route or selected service changes
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    const rafId = requestAnimationFrame(() => {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    });
    return () => cancelAnimationFrame(rafId);
  }, [activeTab, selectedServiceId]);

  // Navigation helper
  const handleNavigate = (tabId, serviceId = null) => {
    setActiveTab(tabId);
    setSelectedServiceId(serviceId);
    setMenuOpen(false);
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  };

  const activeService = SERVICES.find(s => s.id === selectedServiceId);

  return (
    <div style={{
      width: '100%',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
      backgroundColor: '#FFFFFF'
    }}>
      
      {/* ══════════════════════════════════════════════════════════════════════
          TOP FIXED HEADER (Home & Explore Only)
          ══════════════════════════════════════════════════════════════════════ */}
      <header style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '75px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0 6%',
        zIndex: 1000,
        backgroundColor: '#FFFFFF',
        borderBottom: '1px solid var(--border)',
        boxShadow: '0 2px 10px rgba(26,62,38,0.03)'
      }}>
        {/* Brand Logo & Name */}
        <div 
          onClick={() => handleNavigate('home')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            cursor: 'pointer',
            fontFamily: 'var(--font-sans)',
            fontSize: '1.35rem',
            color: 'var(--text-title)',
            letterSpacing: '0.02em',
            fontWeight: 700
          }}
        >
          <div style={{
            width: '36px',
            height: '36px',
            borderRadius: '6px',
            backgroundColor: 'var(--accent)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--accent-gold)'
          }}>
            <Compass size={22} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span>UMOJA <span style={{ fontWeight: 300, color: 'var(--accent)' }}>TERRA</span></span>
            <span style={{ fontSize: '0.62rem', letterSpacing: '0.14em', color: 'var(--accent-gold)', textTransform: 'uppercase', fontWeight: 700, marginTop: '-3px' }}>
              Infrastructure Platform
            </span>
          </div>
        </div>

        {/* Navigation Tabs (Home and Explore Centered) */}
        <nav style={{
          position: 'absolute',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          gap: '36px',
          fontSize: '0.85rem',
          textTransform: 'uppercase',
          letterSpacing: '0.15em',
          fontWeight: 600,
          height: '100%',
          alignItems: 'center'
        }}>
          {[
            { id: 'home', label: 'Home' },
            { id: 'explore', label: 'Explore' }
          ].map(tab => {
            const isActive = activeTab === tab.id;
            return (
              <span
                key={tab.id}
                onClick={() => handleNavigate(tab.id, null)}
                style={{
                  cursor: 'pointer',
                  position: 'relative',
                  padding: '10px 0',
                  color: isActive ? 'var(--accent)' : 'var(--text-body)',
                  transition: 'var(--transition-fast)'
                }}
                className={`nav-link-tab ${isActive ? 'active' : ''}`}
              >
                {tab.label}
                {isActive && (
                  <div style={{
                    position: 'absolute',
                    bottom: '-22px',
                    left: 0,
                    right: 0,
                    height: '2px',
                    backgroundColor: 'var(--accent)'
                  }} />
                )}
              </span>
            );
          })}
        </nav>



        {/* Mobile Menu Toggle Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '8px',
            display: 'none',
            color: 'var(--text-title)',
            alignItems: 'center',
            justifyContent: 'center',
            outline: 'none'
          }}
          className="mobile-menu-btn"
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={24} style={{ color: 'var(--accent)' }} /> : <Menu size={24} />}
        </button>
      </header>

      {/* ══════════════════════════════════════════════════════════════════════
          MOBILE DROPDOWN MENU
          ══════════════════════════════════════════════════════════════════════ */}
      {menuOpen && (
        <div 
          style={{
            position: 'fixed',
            top: '75px',
            left: 0,
            right: 0,
            backgroundColor: '#FFFFFF',
            borderBottom: '1px solid var(--border)',
            boxShadow: '0 10px 25px rgba(0,0,0,0.08)',
            display: 'flex',
            flexDirection: 'column',
            padding: '24px 6%',
            zIndex: 999,
            gap: '16px'
          }} 
          className="mobile-nav-menu"
        >
          {[
            { id: 'home', label: 'Home' },
            { id: 'explore', label: 'Explore' }
          ].map(tab => {
            const isActive = activeTab === tab.id;
            return (
              <span
                key={tab.id}
                onClick={() => handleNavigate(tab.id, null)}
                style={{
                  cursor: 'pointer',
                  padding: '12px 0',
                  fontSize: '1rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.12em',
                  fontWeight: 600,
                  color: isActive ? 'var(--accent)' : 'var(--text-body)',
                  borderBottom: '1px solid rgba(0,0,0,0.04)'
                }}
              >
                {tab.label}
              </span>
            );
          })}
          
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════════════
          MAIN CONTENT VIEW AREA
          ══════════════════════════════════════════════════════════════════════ */}
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', paddingTop: '75px' }}>
        
        {/* Page: Seller & Landowner Portal */}
        {(activeTab === 'seller-portal' || selectedServiceId === 'seller-portal') && (
          <SellerPortalPage
            onBack={() => handleNavigate('explore', null)}
            onNavigateToExplore={() => handleNavigate('explore', null)}
          />
        )}

        {/* Page 1: Home Page (Centric on Real Estate & Infrastructure) */}
        {activeTab === 'home' && selectedServiceId !== 'seller-portal' && (
          <Home 
            onNavigate={(dest) => {
              handleNavigate('explore', null);
            }}
            onSelectService={(serviceId) => {
              handleNavigate('explore', serviceId);
            }}
          />
        )}

        {/* Page 2: Explore Hub (Showcasing Products & Services Directory) */}
        {activeTab === 'explore' && !selectedServiceId && activeTab !== 'seller-portal' && (
          <ExploreHub 
            onSelectService={(serviceId) => {
              handleNavigate('explore', serviceId);
            }} 
          />
        )}

        {/* Building Material -> Dedicated Marketplace Page */}
        {activeTab === 'explore' && selectedServiceId === 'building-material' && (
          <BuildingMaterialMarketplace
            onBackToHub={() => handleNavigate('explore', null)}
          />
        )}

        {/* Property & Estate Management -> Dedicated Interactive Configurator */}
        {activeTab === 'explore' && (selectedServiceId === 'property-management' || selectedServiceId === 'estate-management') && (
          <PropertyEstateManagement
            onBackToHub={() => handleNavigate('explore', null)}
          />
        )}

        {/* Home Services Marketplace -> Dedicated 12-Trades On-Demand Suite */}
        {activeTab === 'explore' && selectedServiceId === 'home-services' && (
          <HomeServicesMarketplace
            onBackToHub={() => handleNavigate('explore', null)}
          />
        )}

        {/* Smart Home Integration -> Dedicated Customization & Survey Suite */}
        {activeTab === 'explore' && selectedServiceId === 'smart-home' && (
          <SmartHomeIntegration
            onBackToHub={() => handleNavigate('explore', null)}
          />
        )}

        {/* Real Estate Financing -> Payment Plans & Installment Tracking */}
        {activeTab === 'explore' && selectedServiceId === 'financing' && (
          <RealEstateFinancing
            onBackToHub={() => handleNavigate('explore', null)}
          />
        )}

        {/* Legal Documentation -> Documents by Purpose, Lawyer Vetting & Due Diligence */}
        {activeTab === 'explore' && selectedServiceId === 'legal-documentation' && (
          <LegalDocumentationHub
            onBackToHub={() => handleNavigate('explore', null)}
          />
        )}

        {/* Land Verification -> Survey Plan Upload, Title Verification, Registry Checks, Boundary Mapping & Encroachment Alerts */}
        {activeTab === 'explore' && selectedServiceId === 'land-verification' && (
          <LandVerificationHub
            onBackToHub={() => handleNavigate('explore', null)}
          />
        )}

        {/* Interior Design -> Room Visualization, Furniture Shopping, AI Redesign, Designer Booking & Budget Planner */}
        {activeTab === 'explore' && (selectedServiceId === 'interior-finishing' || selectedServiceId === 'interior-design') && (
          <InteriorDesignHub
            onBackToHub={() => handleNavigate('explore', null)}
          />
        )}

        {/* Moving & Relocation -> Truck Booking, Packing Services, Storage Units, Relocation Assistance, Move Checklist, Utility Transfer */}
        {activeTab === 'explore' && (selectedServiceId === 'moving-services' || selectedServiceId === 'relocation') && (
          <MovingRelocationHub
            onBackToHub={() => handleNavigate('explore', null)}
          />
        )}

        {/* Products -> Snapping Showcase Deck | Services -> Calendar Reservation Page */}
        {activeTab === 'explore' && selectedServiceId && selectedServiceId !== 'seller-portal' && selectedServiceId !== 'building-material' && selectedServiceId !== 'property-management' && selectedServiceId !== 'estate-management' && selectedServiceId !== 'home-services' && selectedServiceId !== 'smart-home' && selectedServiceId !== 'financing' && selectedServiceId !== 'legal-documentation' && selectedServiceId !== 'land-verification' && selectedServiceId !== 'interior-finishing' && selectedServiceId !== 'interior-design' && selectedServiceId !== 'moving-services' && selectedServiceId !== 'relocation' && (
          activeService?.kind === 'service' ? (
            <ServiceBookingPage
              service={activeService}
              onBackToHub={() => handleNavigate('explore', null)}
            />
          ) : (
            <ServiceShowcasePage
              service={activeService || SERVICES[0]}
              allServices={SERVICES}
              onBackToHub={() => handleNavigate('explore', null)}
              onSelectService={(serviceId) => handleNavigate('explore', serviceId)}
            />
          )
        )}

      </main>

      {/* ══════════════════════════════════════════════════════════════════════
          FOOTER (Institutional Alignment)
          ══════════════════════════════════════════════════════════════════════ */}
      <footer style={{
        background: 'var(--bg-secondary)',
        borderTop: '1px solid var(--border)',
        padding: '60px 6% 40px',
        color: 'var(--text-body)',
        fontSize: '0.85rem'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '1.2fr 0.8fr 1fr',
          gap: '50px'
        }} className="footer-layout">
          <div>
            <h4 style={{ fontFamily: 'var(--font-sans)', fontSize: '1.45rem', color: 'var(--text-title)', marginBottom: '14px', fontWeight: 700 }}>
              UMOJA <span style={{ fontWeight: 300, color: 'var(--accent)' }}>TERRA</span>
            </h4>
            <p style={{ lineHeight: '1.65', marginBottom: '18px', fontWeight: 300 }}>
              Umoja Terra is a unified digital real estate and infrastructure network enabling secure, vetted land acquisition, construction engineering, factory materials, and property management across key urban and regional hubs.
            </p>
            <span style={{ fontSize: '0.75rem', opacity: 0.65 }}>© 2026 Umoja Terra Ltd. All rights reserved.</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <span style={{ color: 'var(--text-title)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '6px' }}>Quick Directory</span>
            <span onClick={() => handleNavigate('home')} style={{ cursor: 'pointer' }}>Home Page</span>
            <span onClick={() => handleNavigate('explore', null)} style={{ cursor: 'pointer', color: 'var(--accent-gold)', fontWeight: 600 }}>Explore All Products & Services</span>
            <span onClick={() => handleNavigate('explore', 'property-marketplace')} style={{ cursor: 'pointer' }}>Buy Land & Houses</span>
            <span onClick={() => handleNavigate('explore', 'build-from-scratch')} style={{ cursor: 'pointer', color: 'var(--accent-gold)', fontWeight: 600 }}>House Characteristics Configurator</span>
            <span onClick={() => handleNavigate('explore', 'land-verification')} style={{ cursor: 'pointer' }}>Verify Land & Government Title</span>
            <span onClick={() => handleNavigate('explore', 'construction-services')} style={{ cursor: 'pointer' }}>Build Your House</span>
            <span onClick={() => handleNavigate('explore', 'home-services')} style={{ cursor: 'pointer' }}>House Cleaning & Repairs</span>
            <span onClick={() => handleNavigate('explore', 'building-material')} style={{ cursor: 'pointer' }}>Buy Building Materials</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <span style={{ color: 'var(--text-title)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '6px' }}>Regional Offices</span>
            <p style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              <Phone size={14} style={{ color: 'var(--accent-gold)' }} />
              <strong>+234 (0) 803 000 0000 / +234 1 234 5678</strong>
            </p>
            <p style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              <Mail size={14} style={{ color: 'var(--accent-gold)' }} />
              <span>contact@umojaterra.com</span>
            </p>
            <p style={{ display: 'flex', gap: '8px', alignItems: 'start' }}>
              <MapPin size={14} style={{ color: 'var(--accent-gold)', marginTop: '3px', flexShrink: 0 }} />
              <span>Suite 7, Admiralty Waterfront Towers, Victoria Island.</span>
            </p>
            <p style={{ display: 'flex', gap: '8px', alignItems: 'start' }}>
              <MapPin size={14} style={{ color: 'var(--accent-gold)', marginTop: '3px', flexShrink: 0 }} />
              <span>Plot 402, Constitution Avenue, Central Business District.</span>
            </p>
          </div>
        </div>
      </footer>

      {/* Global CSS overrides */}
      <style>{`
        .nav-link-tab:hover {
          color: var(--accent) !important;
        }
        @media (max-width: 900px) {
          header nav {
            display: none !important;
          }
          .header-cta-container {
            display: none !important;
          }
          .mobile-menu-btn {
            display: flex !important;
          }
          .footer-layout {
            grid-template-columns: 1fr !important;
            gap: 30px !important;
          }
        }
      `}</style>

    </div>
  );
}
