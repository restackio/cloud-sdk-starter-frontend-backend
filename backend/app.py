from flask import Flask, request, jsonify
import os
from langchain import hub
from langchain_chroma import Chroma
from langchain_core.output_parsers import StrOutputParser
from langchain_core.runnables import RunnablePassthrough
from langchain_openai import OpenAIEmbeddings, ChatOpenAI
from langchain.chains import RetrievalQA
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain.document_loaders import PyMuPDFLoader
from langchain.prompts import PromptTemplate
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Add this line to enable CORS for all routes

# Load the PDF file outside of the endpoint
loader = PyMuPDFLoader('./data/gpt-4.pdf')
documents = loader.load()

# Split the documents into chunks
text_splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=200)
splits = text_splitter.split_documents(documents)

@app.route('/', methods=['GET'])
def health_check():
    return jsonify({"status": "ok"}), 200

@app.route('/query', methods=['POST'])
def query():
    data = request.get_json()
    question = data.get('q')
    api_key = data.get('api_key')

    if not api_key:
        return jsonify({"message": "ok", "q": question, "result": "No OpenAI API key set"}), 200

    try:
        # Set OpenAI API key
        os.environ["OPENAI_API_KEY"] = api_key

        # Create embeddings and vector store
        vector_store = Chroma.from_documents(documents=splits, embedding=OpenAIEmbeddings())

        # Create a retriever
        retriever = vector_store.as_retriever(search_type="similarity", search_kwargs={"k": 2})

        llm = ChatOpenAI(
            model="gpt-4o-mini",
            temperature=0,
            api_key=api_key,
        )

        # Create a custom prompt template
        prompt_template = """Use the following pieces of context to answer the question.
        If you don't know the answer, just say that you don't know, don't try to make up an answer.

        {context}

        Question: {question}
        Answer:"""
        PROMPT = PromptTemplate(
            template=prompt_template, input_variables=["context", "question"]
        )

        # Create the RetrievalQA chain
        qa_chain = RetrievalQA.from_chain_type(
            llm=llm,
            chain_type="stuff",
            retriever=retriever,
            return_source_documents=True,
            chain_type_kwargs={"prompt": PROMPT}
        )

        result = qa_chain.invoke({"query": question})

        # Print the result
        print(result)

        response = {
            "message": "ok",
            "q": question,
            "result": result['result']
        }
        return jsonify(response)

    except Exception as e:
        return jsonify({"message": "error", "q": question, "result": "Something went wrong, maybe validate your Openai key. However here's a hello world from the backend anyways :)"}), 500

if __name__ == '__main__':
    app.run(debug=True)
