from rest_framework import viewsets
from app.models import Stakeholder , ContactPerson , Field , Zone , PositionData , Material , Project , PositionSoilData , Role , Address
from .serializer import StakeHolderSerializer, ContactPersonSerializer ,  AddressSerializer , FiledsSerializer , ZoneSerializer , PositionData , Materialerializer , ProjectSerializer , PositionSoilDataSerializer , RoleSerializer

class StakeHolderViewSet(viewsets.ModelViewSet):
    queryset = Stakeholder.objects.all()
    serializer_class = StakeHolderSerializer

class ContactPersonViewSet(viewsets.ModelViewSet):
    queryset = ContactPerson.objects.all()
    serializer_class = ContactPersonSerializer

class AddressViewSet(viewsets.ModelViewSet):
    queryset = Address.objects.all()
    serializer_class = AddressSerializer

class FieldViewSet(viewsets.ModelViewSet):
    queryset = Field.objects.all()
    serializer_class = FiledsSerializer

class ZoneViewSet(viewsets.ModelViewSet):
    queryset = Zone.objects.all()
    serializer_class = ZoneSerializer

class PositionDataViewSet(viewsets.ModelViewSet):
    queryset = PositionData.objects.all()
    serializer_class = PositionData

class MaterialViewSet(viewsets.ModelViewSet):
    queryset = Material.objects.all()
    serializer_class = Materialerializer

class ProjectViewSet(viewsets.ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer

class PositionSoilDataViewSet(viewsets.ModelViewSet):
    queryset = PositionSoilData.objects.all()
    serializer_class = PositionSoilDataSerializer

class RoleViewSet(viewsets.ModelViewSet):
    queryset = Role.objects.all()
    serializer_class = RoleSerializer


