
const grid = document.getElementById('grid');
const search = document.getElementById('search');
const genre = document.getElementById('genre');

let type = 'Tümü';

const colors = [
  ['#182c45','#7b3040'],
  ['#292038','#b34a3c'],
  ['#163c3b','#397d78'],
  ['#32221c','#a66b36'],
  ['#25263f','#6e477e'],
  ['#1e2934','#587b8e']
];

[...new Set(MOVIES.map(m => m.genre))].sort().forEach(g => {
  let o = document.createElement('option');
  o.value = g;
  o.textContent = g;
  genre.append(o);
});

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, c => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  }[c]));
}

function render() {
  let q = search.value.toLocaleLowerCase('tr');

  let list = MOVIES.filter(m =>
    (type === 'Tümü' || m.type === type) &&
    (genre.value === 'Tümü' || m.genre === genre.value) &&
    (`${m.title} ${m.localTitle} ${m.year} ${m.country}`
      .toLocaleLowerCase('tr').includes(q))
  );

  grid.innerHTML = '';

  list.forEach(m => {
    let c = colors[m.id % colors.length];
    let el = document.createElement('article');
    el.className = 'movie';

    el.innerHTML = `
      <div class="cover" style="--c1:${c[0]};--c2:${c[1]}">
        <span class="tag">${escapeHtml(m.type)}</span>
        <strong>${escapeHtml(m.localTitle)}</strong>
      </div>
      <h3>${escapeHtml(m.localTitle)}</h3>
      <small>${m.year} · ${escapeHtml(m.genre)}</small>
    `;

    grid.append(el);
  });

  document.getElementById('count').textContent = list.length + ' film';
  document.getElementById('empty').hidden = !!list.length;
}

document.querySelectorAll('[data-filter]').forEach(b => {
  b.onclick = () => {
    type = b.dataset.filter;
    document.querySelectorAll('[data-filter]').forEach(x =>
      x.classList.toggle('active', x === b)
    );
    render();
  };
});

search.oninput = render;
genre.onchange = render;

render();
