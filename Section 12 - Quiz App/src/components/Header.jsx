export default function Header({ title, src, alt}) {
  return (
    <header>
      <img src={src} alt={alt}></img>
      <h1>{title}</h1>
    </header>
  )
}