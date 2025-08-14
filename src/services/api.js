const BASE_URL = "https://ielts-mock-backend-b2je.onrender.com/api/questions";

export const getQuestions = async () => {
  const res = await fetch(BASE_URL);
  const data = await res.json();

  // faqat to‘liq ma’lumotli savollarni olish
  return data
    .filter(q => q.questionText && q.options && typeof q.correctAnswerIndex === "number")
    .map(q => ({
      id: q._id,
      q: q.questionText,
      options: q.options,
      answer: q.correctAnswerIndex
    }));
};

export const addQuestion = async (payload) => {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      questionText: payload.q,
      options: payload.o,
      correctAnswerIndex: payload.a
    })
  });
  const data = await res.json();
  return {
    id: data._id,
    q: data.questionText,
    options: data.options,
    answer: data.correctAnswerIndex
  };
};

export const updateQuestion = async (id, payload) => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      questionText: payload.q,
      options: payload.o,
      correctAnswerIndex: payload.a
    })
  });
  const data = await res.json();
  return {
    id: data._id,
    q: data.questionText,
    options: data.options,
    answer: data.correctAnswerIndex
  };
};

export const deleteQuestion = async (id) => {
  await fetch(`${BASE_URL}/${id}`, { method: "DELETE" });
  return;
};
