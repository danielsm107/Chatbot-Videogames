from flask import Flask, request, jsonify, render_template
from langchain_ollama import OllamaLLM
from langchain_core.prompts import ChatPromptTemplate

app = Flask(__name__)

template = """
You are an AI that specializes in video games. Answer the user's questions with detailed information about video games, including game mechanics, history, genres, platforms, and recommendations.
Here is the conversation history: {context}

Question: {question}

Answer:
"""

model = OllamaLLM(model="openhermes")
prompt = ChatPromptTemplate.from_template(template)
chain = prompt | model

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/chat", methods=["POST"])
def chat():
    data = request.json
    context = data.get("context", "You are a videogame expert specialized in all aspects of gaming.")
    question = data["question"]
    result = chain.invoke({"context": context, "question": question})
    context += f"\nUser: {question}\nAI: {result}"
    return jsonify({"response": result, "context": context})

if __name__ == "__main__":
    app.run(debug=True)


