export function render(data) {
  const container = document.createElement('div');
  const title = document.createElement('h1');
  const backButton = document.createElement('a');
  const descriptionContainer = document.createElement('div');
  const descriptionTitle = document.createElement('h2');
  const description = document.createElement('p');
  const speciesContainer = document.createElement('div');
  const planetsContainer = document.createElement('div');

  container.classList.add('container-episode')
  title.classList.add('title-episode');
  backButton.classList.add('back-button');
  descriptionContainer.classList.add('description-container');
  descriptionTitle.classList.add('description-title');
  description.classList.add('description');

  title.innerText = data.title;
  backButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><title>Artboard-27</title><g id="Left_Arrow" data-name="Left Arrow"><path d="M29.707,30.293A1,1,0,0,1,29,32H18a1,1,0,0,1-.707-.293l-15-15a.9994.9994,0,0,1,0-1.414l15-15A1,1,0,0,1,18,0H29a1,1,0,0,1,.707,1.707L15.4141,16Z"/></g></svg> Back Episodes`;
  descriptionTitle.innerText = 'Description'
  description.innerText = data.opening_crawl;

  backButton.href = '/';
  speciesContainer.id = 'species_ID';
  planetsContainer.id = 'planets_ID';

  descriptionContainer.append(descriptionTitle, description);
  container.append(title, backButton, descriptionContainer, speciesContainer, planetsContainer);

  backButton.addEventListener('click', (e) => {
    e.preventDefault();
    history.back();
  });

  return container;
};

export function renderAdditional(data, title) {
  const container = document.createElement('div');
  const contentContainer = document.createElement('div');
  const containerTitle = document.createElement('h2');
  const content = document.createElement('p');

  container.classList.add('container-episode');
  contentContainer.classList.add('description-container')
  containerTitle.classList.add('description-title');
  content.classList.add('description');

  containerTitle.innerText = title;
  content.innerText = data.join(', ')

  contentContainer.append(containerTitle, content)
  container.append(contentContainer)

  return container;
}
