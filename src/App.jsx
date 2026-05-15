import './App.css'

const photoModules = import.meta.glob('./assets/photos/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}', {
  eager: true,
  import: 'default',
})

const photoTitles = [
  'Un poker la ziua Alisiei',
  'Apus la Xihu',
  'Best driver in town',
  'Ceiut',
  'Labirint',
  'Harta spre Baozi',
  'Shanghai de Valentine\'s day',
  'Biscuits',
  'Erau seminte acum 2 ani',
  ':*',
  ':)',
  'Efectiv motivul mutarii mele',
  ':* 2',
  'Vestitorii primaverii',
  '"Cine mai poarta PORC in 2026"',
  'Cadou',
  'ce vreme de cacat',
  'flori',
  ':D',
  'My pretty baby'
]

const photoCaptions = [
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
]

const getPhotoTimestamp = (path) => {
  const fileName = path.split('/').pop() ?? path

  const timestampMatch = fileName.match(/Locket_(\d{13})/)

  if (timestampMatch) {
    return Number(timestampMatch[1])
  }

  const dateTimeMatch = fileName.match(/(\d{4})(\d{2})(\d{2})[_-](\d{2})(\d{2})(\d{2})/)

  if (dateTimeMatch) {
    const [, year, month, day, hours, minutes, seconds] = dateTimeMatch

    return Date.UTC(
      Number(year),
      Number(month) - 1,
      Number(day),
      Number(hours),
      Number(minutes),
      Number(seconds),
    )
  }

  const dateMatch = fileName.match(/(\d{4})(\d{2})(\d{2})/)

  if (dateMatch) {
    const [, year, month, day] = dateMatch

    return Date.UTC(Number(year), Number(month) - 1, Number(day))
  }

  return Number.MAX_SAFE_INTEGER
}

const realPhotos = Object.entries(photoModules)
  .sort(([leftPath], [rightPath]) => {
    const leftTimestamp = getPhotoTimestamp(leftPath)
    const rightTimestamp = getPhotoTimestamp(rightPath)

    if (leftTimestamp !== rightTimestamp) {
      return leftTimestamp - rightTimestamp
    }

    return leftPath.localeCompare(rightPath, undefined, { numeric: true })
  })
  .map(([, src], index) => ({
    title: photoTitles[index] || `Memory ${String(index + 1).padStart(2, '0')}`,
    caption: photoCaptions[index] ?? '',
    src,
  }))

const photos = realPhotos

const hearts = [
  { left: '5%', delay: '0s', duration: '16s', size: '18px' },
  { left: '14%', delay: '2.5s', duration: '13s', size: '14px' },
  { left: '24%', delay: '5s', duration: '18s', size: '20px' },
  { left: '35%', delay: '1.5s', duration: '14s', size: '16px' },
  { left: '48%', delay: '4s', duration: '17s', size: '24px' },
  { left: '59%', delay: '3s', duration: '15s', size: '15px' },
  { left: '70%', delay: '6s', duration: '19s', size: '21px' },
  { left: '82%', delay: '2s', duration: '12s', size: '13px' },
  { left: '92%', delay: '7s', duration: '16s', size: '17px' },
]

function App() {
  return (
    <main className="gallery-page">
      <div className="floating-hearts" aria-hidden="true">
        {hearts.map((heart, index) => (
          <span
            className="heart"
            key={`${heart.left}-${heart.delay}-${index}`}
            style={{
              '--left': heart.left,
              '--delay': heart.delay,
              '--duration': heart.duration,
              '--size': heart.size,
            }}
          />
        ))}
      </div>

      <section className="intro">
        <h1>Cea mai importanta pagina de pe internet</h1>
        <p className="intro-text">Un fel de yolobook dar digital</p>
      </section>

      <section className="gallery" aria-label="Our photo gallery">
        {photos.map((photo, index) => (
          <article className="photo-card" key={`${photo.src}-${index}`}>
            <img src={photo.src} alt={photo.title} loading={index > 1 ? 'lazy' : 'eager'} />
            <div className="photo-info">
              <span>{String(index + 1).padStart(2, '0')}</span>
              <div>
                <h2>{photo.title}</h2>
                {photo.caption ? <p>{photo.caption}</p> : null}
              </div>
            </div>
          </article>
        ))}
      </section>

      <section className="love-note">
        <h2>Fara the end, doar to be continued...</h2>
      </section>
    </main>
  )
}

export default App
