from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from chatbot.serializers import QuerySerializer, ResponseSerializer
from chatbot.bot_manager import ChatbotConversationManager

class ChatbotQueryView(APIView):
    def post(self, request):
        serializer = QuerySerializer(data=request.data)
        if serializer.is_valid():
            query = serializer.validated_data['query']
            chatbot = ChatbotConversationManager()
            response_text = chatbot.send_message(query)
            # import pdb; pdb.set_trace()
            
            # Prepare the sources data
            sources = [
                {"content": doc.page_content, "page_no": doc.metadata["page"]}
                for doc in chatbot.sources
            ]
            
            response_data = {
                "response": response_text,
                "sources": sources
            }
            
            response_serializer = ResponseSerializer(response_data)
            return Response(response_serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
