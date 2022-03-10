const appContainer = document.getElementById('app');
const cssPromises = {};

function loadResource(src) {
  if (src.endsWith('.js')) {
    return import(src);
  }

  if (src.endsWith('.css')) {
    if (!cssPromises[src]) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = src;
      cssPromises[src] = new Promise(resolve => {
        link.addEventListener('load', () => resolve());
      });
      document.head.append(link);
    };
    return cssPromises[src];
  };

  return fetch(src).then(res => res.json());
};

function renderPage(moduleName, apiUrl, css) {
  Promise.all([ moduleName, apiUrl, css ].map(src => loadResource(src)))
         .then(([ pageModule, data ]) => {
           appContainer.innerHTML = '';
           appContainer.append(pageModule.render(data, eventLink));
           data.species ? getAdditionalData(data.species, pageModule, 'Species', species_ID) : false;
           data.planets ? getAdditionalData(data.planets, pageModule, 'Planets', planets_ID) : false;
         });
};

function getAdditionalData(data, pageModule, title, container) {
  getSpin(container);
  Promise.all([...data].map(src => loadResource(src)))
         .then(dataName => dataName.reduce((acc, item) => {
           acc.push(item.name);
           return acc;
          }, []))
         .then(dataArray => {
           container.innerHTML = '';
           container.append(pageModule.renderAdditional(dataArray, title))
        });
};

function eventLink(link = null) {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    history.pushState(null, '/', e.target.href);
    getRenderPage();
  });
};

window.addEventListener('popstate', () => {
  getRenderPage();
})

function getRenderPage() {
  const searchParams = new URLSearchParams(location.search);
  const episodeNumber = searchParams.get('episodeNumber');

  getSpin(appContainer);

  if (episodeNumber) {
    renderPage(
      './episode-description.js',
      `https://swapi.dev/api/films/${episodeNumber}?format=json`,
      './css/episode-description.css'
    );
  } else {
    renderPage(
      './episode-list.js',
      'https://swapi.dev/api/films/?format=json',
      './css/episode-list.css'
    );
  };
};

function getSpin(wrapper) {
  const container = document.createElement('div');
  const spin = document.createElement('img');
  container.classList.add('container-spin')
  spin.classList.add('spin');
  spin.src = '../img/spin.svg';
  wrapper.innerHTML = '';
  container.append(spin)
  wrapper.append(container);
}

getSpin(appContainer);
getRenderPage();
