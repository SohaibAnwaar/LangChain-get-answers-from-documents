import traceback

from langchain import hub
from langchain_openai import ChatOpenAI
from langchain_core.output_parsers import StrOutputParser
from langchain_core.runnables import RunnablePassthrough
from langchain_openai import OpenAIEmbeddings
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_community.document_loaders import PyMuPDFLoader
from langchain_community.vectorstores import FAISS
from langchain.chains import create_retrieval_chain
from langchain.chains.combine_documents import create_stuff_documents_chain
from langchain_core.prompts import ChatPromptTemplate
from dotenv import load_dotenv
from django.conf import settings

from chatbot.prompts import SYSTEM_PROMPT

load_dotenv()
PDF_PATH = "Entigrity-SOC-2-Type-1-Report.pdf"

class ChatBotIndexer:
    def __init__(self) -> None:
        self.docs = []

    def _load_docs(self, pdf_path):
        loader = PyMuPDFLoader(pdf_path)
        data = loader.load()
        return data

    def _split_docs_into_chunks(self):
        documents = self._load_docs(PDF_PATH)
        text_splitter = RecursiveCharacterTextSplitter(chunk_size=600, chunk_overlap=150)
        self.docs = text_splitter.split_documents(documents)
        return
        
    def create_index(self):
        self._split_docs_into_chunks()
        embeddings = OpenAIEmbeddings()
        db = FAISS.from_documents(self.docs, embeddings)
        db.save_local(folder_path=settings.BASE_DIR, index_name="faiss_index")
        print(f"Index created and stored at {settings.BASE_DIR}")
        return


    @classmethod
    def delete_index(cls):
        embeddings = OpenAIEmbeddings()
        db = FAISS.load_local("faiss_index", embeddings)
        print("count before:", db.index.ntotal)
        db.delete([db.index_to_docstore_id])
        print("count after:", db.index.ntotal)
        return


class ChatbotConversationManager:
    def __init__(self) -> None:
        self.sources = None
        
    def _get_retriever(self):
        embeddings = OpenAIEmbeddings()
        db = FAISS.load_local(folder_path=settings.BASE_DIR, index_name="faiss_index", embeddings=embeddings, allow_dangerous_deserialization=True)
        return db.as_retriever()
        

    def _get_conversational_chain(self):
        retriever = self._get_retriever()
        prompt = ChatPromptTemplate.from_messages(
        [
            ("system", SYSTEM_PROMPT),
            ("human", "{input}"),
        ])
        llm = ChatOpenAI(model="gpt-3.5-turbo")
        question_answer_chain = create_stuff_documents_chain(llm, prompt)
        rag_chain = create_retrieval_chain(retriever, question_answer_chain)
        return rag_chain

    def send_message(self, query):
        chain = self._get_conversational_chain()
        # history = self.get_history(self.chatbot.id, s_id)
        qa = chain.invoke({"input": query})
        response = qa["answer"]
        self.sources = qa["context"]
        return response

    # def get_history(self, chatbot_id, session_id):
    #     from langchain.schema import messages_from_dict

    #     histories = ChatHistory.objects.filter(chatbot_id=chatbot_id, session_id=session_id).order_by("-created")[:6]
    #     result = []

    #     for history in histories:
    #         message = {
    #             "type": "human" if history.role == ChatRoleChoices.USER else "ai",
    #             "data": {
    #                 "content": history.text,
    #                 "additional_kwargs": {},
    #                 "example": False,
    #             },
    #         }
    #         result.append(message)
    #     result.reverse()
    #     history = messages_from_dict(result)
    #     return history
