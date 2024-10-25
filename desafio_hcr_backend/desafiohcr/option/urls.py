from django.urls import path
from .views import OptionView

urlpatterns = [
    path('', OptionView.as_view(), name='options_list_create'),
    path('<int:id>/', OptionView.as_view(), name='option_detail'),
]
