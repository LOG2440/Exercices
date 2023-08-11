// import useStorage from "./solution";
import useStorage from "./useStorage";

export default function App() {

  const [text, setText] = useStorage('text', "");
  const [counter, setCounter] = useStorage('counter', 1, true);
  return (
    <div className="parent">
      <h1>Prise de note avec persistance locale (LocalStorage)</h1>
      <textarea
        onInput={(e) => { setText(e.target.value) }}
        value={text}>
      </textarea >
      <button id='reset'
        onClick={() => {
          localStorage.clear();
          sessionStorage.clear();
          window.dispatchEvent(new StorageEvent('storage'));
        }}>
        Vider les 2 storages
      </button>
      <div className="large-text">
        <span >Compteur (SessionStorage) : {counter}</span>
        <button className="large-text"
          onClick={
            () => { setCounter(parseInt(counter) + 1) }
          }>
          +
        </button>
      </div>
    </div>
  )
}
