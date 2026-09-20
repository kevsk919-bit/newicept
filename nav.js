function renderNav(activeItem) {
  const container = document.getElementById('main-nav-container');
  if (!container) return;

  const isActive = (name) => activeItem === name ? 'active' : '';

  container.innerHTML = `
    <nav class="navbar">
      <div class="nav-badges">
        <img class="nav-logo" src="home/pup-logo-transparent.png" alt="PUP Logo">
        <img class="nav-logo" src="home/icept-logo.png" alt="Institute logo 2">
      </div>
      <div class="nav-toggle" aria-label="Toggle menu">
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
      </div>
      <div class="nav-links">
        <a class="nav-item ${isActive('home')}" href="index.html">Home</a>
        <a class="nav-item ${isActive('university')}" href="organization.html">ICEpT</a>

        <div class="nav-item-wrap">
          <div class="nav-item ${isActive('dcpet')}" aria-haspopup="true">DCpET
            <svg class="chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
          </div>
          <div class="dropdown">
            <a href="dcpet1.html">DCpET 1</a>
            <a href="dcpet2.html">DCpET 2</a>
            <a href="dcpet3.html">DCpET 3</a>
          </div>
        </div>

        <div class="nav-item-wrap">
          <div class="nav-item ${isActive('community')}" aria-haspopup="true">Community
            <svg class="chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
          </div>
          <div class="dropdown">
            <a href="research.html">Research</a>
            <a href="outreach.html">Outreach</a>
            <a href="projects.html">Projects</a>
          </div>
        </div>
      </div>
    </nav>
  `;
}
