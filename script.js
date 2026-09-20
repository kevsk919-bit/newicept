document.addEventListener('DOMContentLoaded', function () {

  // ---- Mobile nav toggle ----
  var toggle = document.querySelector('.nav-toggle');
  var links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', function () {
      links.classList.toggle('open');
    });
  }

  var tabBtns = document.querySelectorAll('.tab-btn');
  if (tabBtns.length) {
    tabBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var target = btn.getAttribute('data-tab');
        tabBtns.forEach(function (b) {
          b.classList.remove('active');
          b.setAttribute('aria-selected', 'false');
        });
        btn.classList.add('active');
        btn.setAttribute('aria-selected', 'true');
        document.querySelectorAll('.tab-panel').forEach(function (panel) {
          var isTarget = panel.id === 'panel-' + target;
          panel.classList.toggle('active', isTarget);
        });
      });
    });
  }
  document.querySelectorAll('.coverflow').forEach(function (root) {
    var slides = Array.from(root.querySelectorAll('.coverflow-slide'));
    var dotsWrap = root.querySelector('.coverflow-dots');
    if (!slides.length) return;

    var active = Math.min(2, Math.floor(slides.length / 2));
    var step = root.clientWidth < 600 ? 130 : 190;

    function render() {
      slides.forEach(function (slide, i) {
        var offset = i - active;
        var abs = Math.abs(offset);
        var tx = offset * step;
        var scale = offset === 0 ? 1 : (abs === 1 ? 0.8 : 0.65);
        var opacity = abs > 2 ? 0 : (offset === 0 ? 1 : 0.55);
        slide.style.transform = 'translateX(' + tx + 'px) scale(' + scale + ')';
        slide.style.opacity = opacity;
        slide.style.zIndex = 100 - abs;
        slide.style.pointerEvents = abs > 2 ? 'none' : 'auto';
        slide.classList.toggle('center', offset === 0);
      });
      if (dotsWrap) {
        Array.from(dotsWrap.children).forEach(function (d, i) {
          d.classList.toggle('active', i === active);
        });
      }
    }

    slides.forEach(function (slide, i) {
      slide.addEventListener('click', function () {
        active = i;
        render();
      });
    });

    if (dotsWrap) {
      slides.forEach(function (_, i) {
        var dot = document.createElement('button');
        dot.setAttribute('aria-label', 'Go to slide ' + (i + 1));
        dot.addEventListener('click', function () {
          active = i;
          render();
        });
        dotsWrap.appendChild(dot);
      });
    }

    render();
    window.addEventListener('resize', function () {
      step = root.clientWidth < 600 ? 130 : 190;
      render();
    });
  });
});

function renderDcpetPage(containerId, coverImage, yearLabel, sections) {
  var container = document.getElementById(containerId);
  if (!container) return;

  sections.forEach(function (section, sIndex) {
    var heading = document.createElement('h2');
    heading.className = 'semester-heading' + (sIndex > 0 ? ' spaced' : '');
    heading.textContent = yearLabel + ' - ' + section.title;
    container.appendChild(heading);

    var grid = document.createElement('div');
    grid.className = 'subject-grid';

    section.subjects.forEach(function (subjectData) {
      var card = document.createElement('article');
      card.className = 'subject-card';

      var title = document.createElement('p');
      title.className = 'subject-title';
      title.textContent = subjectData.title;
      card.appendChild(title);

      var body = document.createElement('div');
      body.className = 'subject-body';

      var photoContainer = document.createElement('div');
      photoContainer.className = 'subject-photo';
      body.appendChild(photoContainer);

      var img = document.createElement('img');
      img.src = coverImage;
      photoContainer.appendChild(img);

      var linkWrap = document.createElement('div');
      linkWrap.className = 'subject-links';
      
      var buttonsToCreate = [
        { label: 'Module', url: subjectData.links?.module },
        { label: 'PPT', url: subjectData.links?.ppt },
        { label: 'Quiz', url: subjectData.links?.quiz },
        { label: 'Output', url: subjectData.links?.output }
      ];

      buttonsToCreate.forEach(function (btn) {
        var link = document.createElement('a');
        link.textContent = btn.label;

        if(btn.url) {
          link.href = btn.url;
          link.target = '_blank';
          link.rel = 'noopener';
        } else {
          link.removeAttribute('href');
          link.setAttribute('aria-disabled', 'true');
          link.classList.add('disabled');
          link.title = "Unavailable"
        }
        linkWrap.appendChild(link);
      });
      
      body.appendChild(linkWrap);
      card.appendChild(body);
      grid.appendChild(card);
    });

    container.appendChild(grid);
  });
}
