import logo from "./logo.svg";
import styles from "./App.module.css";
import { createSignal, For, Show } from "solid-js";
import { createStore } from "solid-js/store";

const QUESTIONS_COUNT = 10;

const questions = [
  "ปฏิปักษ์ประชาธิปไตย พร้อมจะสนับสนุนการรัฐประหาร",
  "ชื่นชมสุเทพ เทือกสุบรรณ",
  "เห็นด้วยกับการขับไล่ทักษิณ",
  "ไม่ได้สนับสนุนรัฐประหาร แต่ยังคงสนับสนุนประยุทธ์",
  "ไม่เกี่ยวข้องกับฝ่ายใด แต่เกลียดชังการชุมนุมกลุ่มสามกีบ",
  "ชอบจำลอง ศรีเมือง",
  "ชอบสนธิ ลิ้มทองกุล",
  "เคารพอาจารย์ ส. ศิวรักษ์",
  "เกลียดพวกเผาบ้านเผาเมืองเข้าไส้",
  "เชียร์ลุง",
  "ชื่นชมผลงานที่เห็นเป็นที่ประจักษ์ เช่น คลองโอ่งอ่าง",
  "ไม่ไปร่วมกับม็อบมุ้งมิ้ง",
  "ลบแอปพลิเคชั่น Lazada ออกแล้วตั้งแต่เป็นข่าว",
  "เชื่อว่าอเมริกาอยู่เบื้องหลังม็อบสามนิ้ว ไวรัสโควิดก็ฝีมือมัน",
  "สนับสนุน ม. 112",
  "ช่องที่ดีที่สุดคือ TOP NEWS ช่องอื่นเสนอแต่เฟคนิวส์",
  "เชื่อว่ารัสเซียบุกยูเครนถูกแล้ว เพราะพวกเมกาจะบุกรัสเซีย",
];

const [state, setState] = createStore({
  answers: [],
});
const nthQuestion = () => state.answers.length + 1;
const isFinished = () => nthQuestion() > QUESTIONS_COUNT;

function reset() {
  setState("answers", []);
}

function Finished() {
  const [result, setResult] = createSignal("");

  const results = [
    "สกลธี ภัททิยกุล - เบอร์ 3",
    "สุชัชวีร์ สุวรรณสวัสดิ์ (พี่เอ้) - เบอร์ 4",
    "อัศวิน ขวัญเมือง - เบอร์ 6",
    "รสนา โตสิตระกูล - เบอร์ 7",
  ];

  for (var i = 0; i < 1000; i += 80) {
    setTimeout(() => {
      setResult(results[Math.floor(Math.random() * results.length)]);
    }, i);
  }

  return (
    <>
      <h1>ผู้ว่าในใจคุณคือ...</h1>
      <h1>{result}</h1>
      <button
        style={`font-size: 32px; padding: 12px 16px; margin-left: 16px;`}
        onClick={reset}
      >
        ลองใหม่
      </button>

      <p>
        <a
          href="https://www.facebook.com/lawlawcmcm/posts/2945972242318995"
          target="_blank"
        >
          Source
        </a>
      </p>
    </>
  );
}

function Questions() {
  const [questionIdx, setQuestionIdx] = createSignal(
    ~~(Math.random() * questions.length)
  );

  function answer(ans, idx) {
    setState("answers", (answers) => [...answers, { idx, choice: ans }]);

    const nextQuestionIdx = getUnansweredQuestionIdx();
    setQuestionIdx(nextQuestionIdx);
  }

  function getUnansweredQuestionIdx() {
    const answeredQuestionsIdx = new Set(state.answers.map((a) => a.idx));
    const unansweredQuestionsIdx = Array(questions.length)
      .fill(0)
      .map((_, i) => i)
      .filter((_q, idx) => !answeredQuestionsIdx.has(idx));

    return unansweredQuestionsIdx[
      ~~(Math.random() * unansweredQuestionsIdx.length)
    ];
  }

  return (
    <>
      <Show when={!isFinished()} fallback={<Finished />}>
        <h1>
          {nthQuestion} / {QUESTIONS_COUNT}
        </h1>
        <h1>{questions[questionIdx()]}</h1>
        <div style="margin: 0 auto;">
          <button
            style={`font-size: 32px; padding: 12px 16px; `}
            onClick={() => answer(true, questionIdx())}
          >
            ใช่
          </button>
          <button
            style={`font-size: 32px; padding: 12px 16px; margin-left: 16px;`}
            onClick={() => answer(false, questionIdx())}
          >
            ไม่ใช่
          </button>
        </div>
        <br />
        <For each={state.answers}>
          {(answer) => (
            <div>
              {questions[answer.idx]}: {`${answer.choice ? "ใช่" : "ไม่ใช่"}`}
            </div>
          )}
        </For>
      </Show>
    </>
  );
}

function App() {
  return (
    <div class={styles.App}>
      <header class={styles.header}>
        {/* <img src={logo} class={styles.logo} alt="logo" /> */}
        <p>
          <Questions />
        </p>
      </header>
    </div>
  );
}

export default App;
