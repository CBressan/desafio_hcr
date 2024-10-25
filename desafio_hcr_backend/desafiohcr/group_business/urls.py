from django.urls import path
from .views import GroupBusinessView

urlpatterns = [
    path('', GroupBusinessView.as_view(), name='group_business_list_create'),
    path('<int:id>/', GroupBusinessView.as_view(), name='group_business_detail'),
]
