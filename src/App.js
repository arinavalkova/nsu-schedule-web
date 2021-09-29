import './styles/App.css';
import Cell from "./components/Cell";
import Lesson from "./components/Lesson";

function App() {

    const firstLesson = {
        type: "лек",
        name: "ОП Java-программ",
        room: "1133",
        tutor: "Адаманский А.В.",
        week: "Нечетная"
    }

    const secondLesson = {
        type: "лек",
        name: "Раз.прил.Android",
        room: "1133",
        tutor: "Степанов П.А.",
        week: "четная"
    }

    return (
        <div>
            <Cell lessons = {[firstLesson, secondLesson]}/>
        </div>
    );
}

export default App;
