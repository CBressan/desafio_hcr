from django.urls import path
from .views import QuestionView

urlpatterns = [
    path('', QuestionView.as_view(), name='questions_list_create'),

    path('<int:id>/', QuestionView.as_view(), name='question_detail'),
]
