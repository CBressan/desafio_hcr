from django.urls import path
from .views import BusinessView

urlpatterns = [
    path('', BusinessView.as_view(), name='business_list_create'),
    path('by-group/<int:group_business_id>/', BusinessView.as_view(), name='business_by_group_business'),
    path('<int:id>/', BusinessView.as_view(), name='business_detail'),
]
