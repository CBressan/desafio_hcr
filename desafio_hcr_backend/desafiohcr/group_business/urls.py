from django.urls import path
from .views import GroupBusinessView, GroupBusinessCreateView

urlpatterns = [
    path('', GroupBusinessView.as_view(), name='group_business_list'),  # GET para listar todos
    path('create/', GroupBusinessCreateView.as_view(), name='group_business_create'),  # POST para criar
    path('<int:id>/', GroupBusinessView.as_view(), name='group_business_detail'),  # GET, PUT, DELETE para um item específico
]
