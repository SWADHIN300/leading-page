import { useEffect, useState } from 'react';

const navLinks = ['Marketplace', 'Launchpad', 'Analytics', 'Rewards'];

const stats = [
  { label: 'Daily Volume', value: '$184.6M' },
  { label: 'Collections', value: '31,200+' },
  { label: 'Wallets Online', value: '128,450' },
  { label: 'Avg. Settlement', value: '0.43s' },
];

const collections = [
  {
    name: 'Swadh Titans',
    floor: '42.9 SOL',
    change: '+14.8%',
    volume: '13.2k SOL',
    heat: 'Very Hot',
  },
  {
    name: 'Drift Monks',
    floor: '11.7 SOL',
    change: '+6.2%',
    volume: '8.9k SOL',
    heat: 'Trending',
  },
  {
    name: 'Neon Nomads',
    floor: '27.1 SOL',
    change: '+22.1%',
    volume: '15.4k SOL',
    heat: 'Breakout',
  },
];

const tickerItems = ['Instant Sweeps', 'Live Bids', 'Collection Alerts', 'Creator Drops', 'Gas Optimized', 'Solana Native'];

const features = [
  {
    title: 'Pro Trading Engine',
    text: 'Run sniper bids, instant list sweeps, and custom floor alerts with zero lag.',
  },
  {
    title: 'Real-Time Orderflow',
    text: 'Track collection momentum on live charts and react before the crowd moves.',
  },
  {
    title: 'Creator Launch Control',
    text: 'Ship mint pages, monitor mint health, and reward your community in one place.',
  },
];

function App() {
  const [walletAddress, setWalletAddress] = useState('');
  const [walletStatus, setWalletStatus] = useState('');
  const [isConnecting, setIsConnecting] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return undefined;
    }

    const provider = window.solana;
    if (!provider?.isPhantom) {
      return undefined;
    }

    const handleConnect = (publicKey) => {
      const connectedAddress = publicKey?.toString?.() ?? '';
      if (connectedAddress) {
        setWalletAddress(connectedAddress);
        setWalletStatus('Wallet connected');
      }
    };

    const handleDisconnect = () => {
      setWalletAddress('');
      setWalletStatus('Wallet disconnected');
    };

    provider.on?.('connect', handleConnect);
    provider.on?.('disconnect', handleDisconnect);

    return () => {
      provider.off?.('connect', handleConnect);
      provider.off?.('disconnect', handleDisconnect);
    };
  }, []);

  const handleConnectWallet = async () => {
    if (typeof window === 'undefined') {
      return;
    }

    const provider = window.solana;
    if (!provider?.isPhantom) {
      setWalletStatus('Phantom not found. Opening install page...');
      window.open('https://phantom.app/', '_blank', 'noopener,noreferrer');
      return;
    }

    try {
      setIsConnecting(true);
      setWalletStatus('');

      const response = await provider.connect();
      const connectedAddress = response?.publicKey?.toString?.() ?? '';

      if (connectedAddress) {
        setWalletAddress(connectedAddress);
        setWalletStatus('Wallet connected');
      }
    } catch (error) {
      if (error?.code === 4001) {
        setWalletStatus('Wallet connection was cancelled');
      } else {
        setWalletStatus('Unable to connect wallet right now');
      }
    } finally {
      setIsConnecting(false);
    }
  };

  const handleDisconnectWallet = async () => {
    if (typeof window === 'undefined') {
      return;
    }

    const provider = window.solana;
    if (!provider?.isPhantom || !walletAddress) {
      return;
    }

    try {
      setIsConnecting(true);
      setWalletStatus('');
      await provider.disconnect();
      setWalletAddress('');
      setWalletStatus('Wallet disconnected');
    } catch {
      setWalletStatus('Unable to disconnect wallet right now');
    } finally {
      setIsConnecting(false);
    }
  };

  return (
    <div className="page">
      <div className="ambient one" />
      <div className="ambient two" />
      <div className="ambient three" />

      <header className="nav-shell">
        <div className="container nav">
          <a className="logo" href="#">
            swadh
          </a>
          <nav className="nav-links" aria-label="Main">
            {navLinks.map((item) => (
              <a key={item} href="#">
                {item}
              </a>
            ))}
          </nav>
          <div className="wallet-box">
            {walletAddress ? (
              <button className="ghost-btn" type="button" onClick={handleDisconnectWallet} disabled={isConnecting}>
                {isConnecting ? 'Disconnecting...' : 'Disconnect Wallet'}
              </button>
            ) : (
              <button className="ghost-btn" type="button" onClick={handleConnectWallet} disabled={isConnecting}>
                {isConnecting ? 'Connecting...' : 'Connect Wallet'}
              </button>
            )}
            {walletStatus ? (
              <small className="wallet-status" aria-live="polite">
                {walletStatus}
              </small>
            ) : null}
          </div>
        </div>
      </header>

      <main>
        <section className="hero container">
          <div className="hero-copy reveal" style={{ '--delay': '80ms' }}>
            <p className="eyebrow">Solana NFT Trading Layer</p>
            <h1>
              Trade faster.
              <br />
              Discover alpha <span>before it trends.</span>
            </h1>
            <p className="hero-text">
              A high-performance Web3 marketplace for traders and creators. Deep liquidity, live analytics,
              and one-click execution built for speed.
            </p>
            <div className="hero-actions">
              <button className="primary-btn" type="button">
                Explore Marketplace
              </button>
              <button className="link-btn" type="button">
                View Live Collections
              </button>
            </div>
          </div>

          <aside className="hero-panel reveal" style={{ '--delay': '180ms' }}>
            <div className="panel-ring" />
            <div className="panel-header">
              <p>Live Market Pulse</p>
              <span className="dot" />
            </div>
            <div className="panel-rows">
              {collections.map((item) => (
                <article key={item.name} className="pulse-row">
                  <div>
                    <h3>{item.name}</h3>
                    <p>Floor {item.floor}</p>
                  </div>
                  <div className="pulse-change">
                    <strong>{item.change}</strong>
                    <span>{item.heat}</span>
                  </div>
                </article>
              ))}
            </div>
            <p className="panel-foot">Last update: just now</p>
          </aside>
        </section>

        <section className="container stats reveal" style={{ '--delay': '260ms' }}>
          {stats.map((item) => (
            <article key={item.label} className="stat-card">
              <p>{item.label}</p>
              <h3>{item.value}</h3>
            </article>
          ))}
        </section>

        <section className="ticker-wrap">
          <div className="ticker">
            <div className="ticker-group">
              {tickerItems.map((item) => (
                <span key={`a-${item}`}>{item}</span>
              ))}
            </div>
            <div className="ticker-group" aria-hidden="true">
              {tickerItems.map((item) => (
                <span key={`b-${item}`}>{item}</span>
              ))}
            </div>
          </div>
        </section>

        <section className="container section">
          <div className="section-head reveal" style={{ '--delay': '120ms' }}>
            <p className="eyebrow">Trending Right Now</p>
            <h2>Top collections moving this hour</h2>
          </div>
          <div className="collection-grid">
            {collections.map((item, index) => (
              <article
                key={item.name}
                className="collection-card reveal"
                style={{ '--delay': `${150 + index * 100}ms` }}
              >
                <div className="card-art" />
                <div className="collection-main">
                  <h3>{item.name}</h3>
                  <p>{item.heat}</p>
                </div>
                <div className="collection-data">
                  <div>
                    <span>Floor</span>
                    <strong>{item.floor}</strong>
                  </div>
                  <div>
                    <span>24h Vol.</span>
                    <strong>{item.volume}</strong>
                  </div>
                  <div>
                    <span>Change</span>
                    <strong className="up">{item.change}</strong>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="container section">
          <div className="section-head reveal" style={{ '--delay': '100ms' }}>
            <p className="eyebrow">Why Builders Choose swadh</p>
            <h2>Made for advanced traders and fast-moving teams</h2>
          </div>
          <div className="feature-grid">
            {features.map((item, index) => (
              <article
                key={item.title}
                className="feature-card reveal"
                style={{ '--delay': `${120 + index * 120}ms` }}
              >
                <h3>{item.title}</h3>
                <p>{item.text}</p>
                <a href="#">Learn more</a>
              </article>
            ))}
          </div>
        </section>

        <section className="container cta reveal" style={{ '--delay': '160ms' }}>
          <div>
            <p className="eyebrow">Start Trading Today</p>
            <h2>Plug into Solana&apos;s fastest NFT marketplace</h2>
            <p>Create your account and execute your first trade in under a minute.</p>
          </div>
          <button className="primary-btn" type="button">
            Launch App
          </button>
        </section>
      </main>

      <footer className="container footer">
        <p>SWADH</p>
        <small>Built for Web3 speed. Crafted for modern collectors.</small>
      </footer>
    </div>
  );
}

export default App;
