export default function Header() {
  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }
  const descriptionArray = ['Fundamental','Core','Crucial'];

  const description = descriptionArray[getRandomInt(3)];
  
  return (
    <header>
      <img src="src/assets/react-core-concepts.png" alt="Stylized atom" />
      <h1>React Essentials</h1>
      <p>
        {description} React concepts you will need for almost any app you are
        going to build!
      </p>
    </header>
  );
}
