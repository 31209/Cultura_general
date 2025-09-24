import React, { useEffect, useState } from "react";

const questions = [
  {
    question: "¿Cuál es la capital de Francia?",
    options: ["Madrid", "París", "Londres", "Berlín"],
    answer: "París",
  },
  {
    question: "¿Cuál es el planeta más cercano al Sol?",
    options: ["Venus", "Marte", "Mercurio", "Júpiter"],
    answer: "Mercurio",
  },
  {
    question: "¿Qué lenguaje se usa para estilizar páginas web?",
    options: ["HTML", "JavaScript", "CSS", "Python"],
    answer: "CSS",
  },
  {
    question: "¿Cuál es el océano más grande del mundo?",
    options: ["Atlántico", "Índico", "Ártico", "Pacífico"],
    answer: "Pacífico",
  },
  {
    question: "¿En qué año llegó el hombre a la luna?",
    options: ["1969", "1975", "1955", "1980"],
    answer: "1969",
  },
];

const pastelColors = {
  background: "#f9f6f7",
  card: "#f7e8e8",
  button: "#f7c9c9",
  buttonHover: "#f4b5b5",
  text: "#5a4a4a",
};

export default function Quiz() {
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);

  // Estilos globales para body y html que aseguran altura completa y sin margenes
  useEffect(() => {
    document.body.style.margin = "0";
    document.body.style.padding = "0";
    document.body.style.height = "100%";
    document.body.style.backgroundColor = pastelColors.background;

    // También estilo para html para que funcione bien en todos los navegadores
    document.documentElement.style.height = "100%";

    // Limpieza al desmontar
    return () => {
      document.body.style.margin = "";
      document.body.style.padding = "";
      document.body.style.height = "";
      document.body.style.backgroundColor = "";
      document.documentElement.style.height = "";
    };
  }, []);

  const handleAnswer = (option) => {
    if (option === questions[current].answer) {
      setScore(score + 1);
    }
    const nextQuestion = current + 1;
    if (nextQuestion < questions.length) {
      setCurrent(nextQuestion);
    } else {
      setShowScore(true);
    }
  };

  return (
    <div
      style={{
        backgroundColor: pastelColors.background,
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        color: pastelColors.text,
        padding: "20px",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          backgroundColor: pastelColors.card,
          borderRadius: "15px",
          padding: "30px",
          maxWidth: "450px",
          width: "100%",
          boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
          textAlign: "center",
        }}
      >
        {showScore ? (
          <div>
            <h2>¡Terminaste el quiz!</h2>
            <p>
              Tu calificación es {score} de {questions.length}
            </p>
            <p>
              {score === questions.length
                ? "¡Perfecto! Eres un genio 🥳"
                : score >= 3
                ? "¡Muy bien hecho! 👍"
                : "¡Sigue practicando!"}
            </p>
          </div>
        ) : (
          <>
            <h3>
              Pregunta {current + 1} de {questions.length}
            </h3>
            <p style={{ fontSize: "1.2rem", margin: "20px 0" }}>
              {questions[current].question}
            </p>
            <div>
              {questions[current].options.map((option) => (
                <button
                  key={option}
                  onClick={() => handleAnswer(option)}
                  style={{
                    backgroundColor: pastelColors.button,
                    border: "none",
                    padding: "10px 20px",
                    margin: "8px 0",
                    borderRadius: "10px",
                    cursor: "pointer",
                    width: "100%",
                    fontSize: "1rem",
                    transition: "background-color 0.3s ease",
                  }}
                  onMouseEnter={(e) =>
                    (e.target.style.backgroundColor = pastelColors.buttonHover)
                  }
                  onMouseLeave={(e) =>
                    (e.target.style.backgroundColor = pastelColors.button)
                  }
                >
                  {option}
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
