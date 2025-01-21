export default function TabButton({ text, isSelected, ...props }) {
  return (
    <li>
      <button className={isSelected ? "active" : null} {...props}>
        {text}
      </button>
    </li>
  )
}