from django.urls import path, include
from rest_framework import routers
from app import views

from rest_framework.routers import DefaultRouter
from app import views

router = DefaultRouter()
router.register(r'stakeholders', views.StakeHolderViewSet)
router.register(r'contactpeople', views.ContactPersonViewSet)
router.register(r'fields', views.FieldViewSet)
router.register(r'zones', views.ZoneViewSet)
router.register(r'positions-datas', views.PositionDataViewSet)
router.register(r'materials', views.MaterialViewSet)
router.register(r'projects', views.ProjectViewSet)
router.register(r'position-soil-datas', views.PositionSoilDataViewSet)
router.register(r'roles', views.RoleViewSet)
router.register(r'address', views.AddressViewSet)

urlpatterns = [
    path('api/v1/', include(router.urls)),
]