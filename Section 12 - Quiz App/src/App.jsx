import quizpng from "/quiz-logo.png";
import Header from "./components/Header.jsx";
import Quiz from "./components/Quiz.jsx";

function App() {
  return (
    <>
      <Header src={quizpng} title="reactquiz" alt="A quiz picture" />
      <Quiz />
    </>
  );
}

export default App;
