import { useEffect, useMemo, useState } from "react";

/* =========================
   UTMIFY EVENTS (helpers)
========================= */

function utmifyTrack(event, data = {}) {
  try {
    if (window.utmify && typeof window.utmify.track === "function") {
      window.utmify.track(event, data);
      return;
    }

    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event, ...data });
  } catch (e) {}
}

/* =========================
   1) QUIZ (6 perguntas)
========================= */

const questions = [
  {
    question:
      "Você sabe exatamente quanto dinheiro entrou e quanto saiu da sua conta no último mês?",
    description:
      "Não existe certo ou errado aqui. Escolha a opção que mais parece com a sua realidade hoje, isso vai ajudar a montar o seu diagnóstico financeiro no final.",
    options: [
      { text: "Tenho uma noção, mas nada muito organizado", score: 2, emoji: "🙋‍♂️" },
      { text: "Sim, está tudo anotado e bem claro para mim", score: 3, emoji: "😎" },
      { text: "Sinceramente, não sei… só vou gastando e vejo depois no extrato", score: 1, emoji: "😅" },
    ],
  },
  {
    question:
      'Quando o mês acaba, você tem a sensação de que o dinheiro simplesmente “sumiu”?',
    description: "Selecione uma das opções:",
    options: [
      { text: "Sim, no fim do mês quase nunca sei para onde o dinheiro foi.", score: 1, emoji: "😔" },
      { text: "Não, acompanho tudo e sei exatamente para onde cada gasto foi.", score: 3, emoji: "😏" },
      { text: "Às vezes tenho essa sensação, mas no geral consigo me virar e fechar o mês.", score: 2, emoji: "🤷‍♂️" },
    ],
  },
  {
    question:
      "Se você continuar fazendo exatamente o que faz hoje com seu dinheiro, como imagina que estará sua vida financeira daqui a 6 meses?",
    description: "Escolha a opção que melhor descreve você:",
    options: [
      { text: "Provavelmente mais endividado(a) e frustrado(a)", score: 1, emoji: "😣" },
      { text: "Do mesmo jeito de hoje, sem muita evolução", score: 2, emoji: "😐" },
      { text: "Com controle e conseguindo guardar dinheiro todo mês", score: 3, emoji: "🤑" },
    ],
  },
  {
    question: "O que mais te impede de ter um bom controle financeiro hoje?",
    description: "Responda com sinceridade.",
    options: [
      { text: "Falta de organização, começo e não consigo manter o controle", score: 1, emoji: "🙋‍♂️" },
      { text: "Não tenho uma ferramenta simples para controlar meu dinheiro", score: 2, emoji: "🤷‍♂️" },
      { text: "Esqueço de anotar os gastos no dia a dia", score: 1, emoji: "❌" },
      { text: "Acho complicado mexer com planilhas e números", score: 1, emoji: "😅" },
    ],
  },
  {
    question:
      "Se você tivesse uma planilha automática que mostrasse, em poucos cliques, para onde cada centavo do seu dinheiro está indo, você usaria?",
    description: "Qual é a sua opinião?",
    options: [
      { text: "Com certeza, é exatamente o que eu preciso agora", score: 3, emoji: "✅" },
      { text: "Talvez, se for bem simples de usar e não tomar muito tempo", score: 2, emoji: "🙋‍♂️" },
      { text: "Não sei, nunca tentei controlar o dinheiro com planilha, mas tenho curiosidade", score: 2, emoji: "🤔" },
    ],
  },
  {
    question:
      "Você gostaria de ter acesso a essa planilha ainda hoje para começar a organizar seu dinheiro?",
    description: "",
    options: [
      { text: "Sim, quero acesso imediato para organizar meu dinheiro", score: 3, emoji: "✅" },
      { text: "Sim, mas preciso de algo bem simples e fácil de usar", score: 2, emoji: "🙋‍♂️" },
      { text: "Por enquanto não", score: 1, emoji: "😔" },
    ],
  },
];

/* =========================
   2) OFERTA ÚNICA (Cartpanda)
========================= */

const offer = {
  id: "card1",
  title: "Planilha Vida Sem Dívidas",
  subtitle: "Acesso vitalício",
  oldPrice: "R$127,00", // ALTERADO
  newPrice: "R$27,00",  // ALTERADO
  url: "https://nobux.mycartpanda.com/checkout/207386789:1",
  image: "/card1.png",
  bullets: [
    "Acesso vitalício",
    "Atualização constante",
    "Vídeo aula ensinando a usar",
    "Sem mensalidade",
    "Personalize de acordo as suas necessidades",
    "Feita para iniciantes e experientes",
  ],
};

/* =========================
   3) DEPOIMENTOS
========================= */

const testimonials = [
  {
    text:
      "Eu sempre perdia controle das pequenas despesas. Com a planilha, passei a acompanhar tudo e já estou conseguindo guardar uma reserva mensal!",
    name: "Maria Silva",
    role: "Diarista",
    avatar: "/maria.jpg",
  },
  {
    text:
      "Simples de usar e muito prática. Consegui organizar minhas contas e criar um orçamento mensal que realmente funciona. Vale cada centavo!",
    name: "Breno Silva",
    role: "Auxiliar de T.I",
    avatar: "/breno.jpg",
  },
  {
    text:
      "Achei que organização financeira fosse complicado até usar essa planilha. Intuitiva e com relatórios que me ajudam a decidir melhor!",
    name: "Paulo B.",
    role: "Repositor",
    avatar: "/paulo.jpg",
  },
];

/* =========================
   CONTADOR
========================= */

function useCountdown(startSeconds = 600) {
  const [secondsLeft, setSecondsLeft] = useState(startSeconds);

  useEffect(() => {
    const interval = setInterval(() => {
      setSecondsLeft((s) => (s > 0 ? s - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const mm = String(Math.floor(secondsLeft / 60)).padStart(2, "0");
  const ss = String(secondsLeft % 60).padStart(2, "0");
  return `${mm}:${ss}`;
}

/* =========================
   APP
========================= */

export default function App() {
  const [stage, setStage] = useState("hook");
  const [current, setCurrent] = useState(0);
  const [totalScore, setTotalScore] = useState(0);

  const maxScore = useMemo(() => questions.length * 3, []);
  const progressPct = useMemo(
    () => Math.round(((current + 1) / questions.length) * 100),
    [current]
  );

  function start() {
    utmifyTrack("quiz_start");
    setStage("quiz");
    setCurrent(0);
    setTotalScore(0);
  }

  function answer(score) {
    const nextTotal = totalScore + score;
    setTotalScore((s) => s + score);

    if (current + 1 < questions.length) {
      setCurrent((c) => c + 1);
    } else {
      utmifyTrack("quiz_complete", { totalScore: nextTotal, maxScore });
      setStage("offers");
    }
  }

  if (stage === "hook") {
    return (
      <div style={{ minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
        <button onClick={start}>Iniciar diagnóstico financeiro</button>
      </div>
    );
  }

  if (stage === "quiz") {
    const q = questions[current];

    return (
      <div>
        <h2>Pergunta {current + 1} de {questions.length}</h2>
        <p>{q.question}</p>
        {q.options.map((opt, idx) => (
          <button key={idx} onClick={() => answer(opt.score)}>
            {opt.emoji} {opt.text}
          </button>
        ))}
      </div>
    );
  }

  return <OffersPage totalScore={totalScore} maxScore={maxScore} />;
}

/* =========================
   PÁGINA FINAL
========================= */

function OffersPage({ totalScore, maxScore }) {
  const time = useCountdown(600);

  return (
    <div>
      <h2>Seu diagnóstico está pronto ✅</h2>
      <p>Pontuação: {totalScore} / {maxScore}</p>
      <p>Oferta válida por: {time}</p>
      <OfferCard offer={offer} />
    </div>
  );
}

function OfferCard({ offer }) {
  return (
    <div>
      <h3>{offer.title}</h3>
      <p>{offer.subtitle}</p>
      <p style={{ textDecoration: "line-through" }}>De: {offer.oldPrice}</p>
      <p>Por: {offer.newPrice}</p>

      <button
        onClick={() => {
          utmifyTrack("offer_click", { offerId: offer.id });
          window.location.href = offer.url;
        }}
      >
        Quero esse
      </button>
    </div>
  );
}