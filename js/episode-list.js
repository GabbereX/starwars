export function render(data, eventLink) {
  const container = document.createElement('div');
  const title = document.createElement('h1');
  const episodeContainer = document.createElement('div');

  title.classList.add('title');
  episodeContainer.classList.add('episode-container')
  title.innerText = 'Star Wars';

  data.results.forEach((item, index) => {
    const link = document.createElement('a');

    link.classList.add(`episode-${index + 1}`);

    link.innerText = `Episode ${item.episode_id}. ${item.title}`.replace(/(\d)/, match => match === '1' ? 'I' :
    match === '2' ? 'II' :
    match === '3' ? 'III' :
    match === '4' ? 'IV' :
    match === '5' ? 'V' :
    match === '6' ? 'VI' : false);

    link.href = `/?episodeNumber=${index + 1}`;

    eventLink(link);

    episodeContainer.append(link);
  });


  container.append(title, episodeContainer);

  return container;
}

