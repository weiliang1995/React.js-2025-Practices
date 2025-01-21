import "./CoreConcepts.css";

export default function CoreConcept({image,title,text}) {
  return (
    <li>
      <img src={image} alt={title}/>
      <h3>{title}</h3>
      <p>{text}</p>
    </li>
  )
}