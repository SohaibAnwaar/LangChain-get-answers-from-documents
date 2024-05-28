from django.urls import path

from chatbot.views import ChatbotQueryView

urlpatterns = [
    path('query/', ChatbotQueryView.as_view(), name='chatbot-query'),
]