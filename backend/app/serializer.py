from rest_framework import serializers
from  app.models  import Stakeholder , ContactPerson , Field , Zone , PositionData , Material , Project , PositionSoilData , Role , Address


class StakeHolderSerializer(serializers.ModelSerializer):
    class Meta: 
         model= Stakeholder
         fields= '__all__'

         
class ContactPersonSerializer(serializers.ModelSerializer):
    class Meta: 
         model= ContactPerson
         fields= '__all__'

class FiledsSerializer(serializers.ModelSerializer):
    class Meta: 
         model= Field
         fields= '__all__'

class ZoneSerializer(serializers.ModelSerializer):
    class Meta: 
         model= Zone
         fields= '__all__'

class PositionDataSerializer(serializers.ModelSerializer):
    class Meta: 
         model= PositionData
         fields= '__all__'

class Materialerializer(serializers.ModelSerializer):
    class Meta: 
         model= Material
         fields= '__all__'

class ProjectSerializer(serializers.ModelSerializer):
    class Meta: 
         model= Project
         fields= '__all__'

class PositionSoilDataSerializer(serializers.ModelSerializer):
    class Meta: 
         model= PositionSoilData
         fields= '__all__'

class RoleSerializer(serializers.ModelSerializer):
    class Meta: 
         model= Role
         fields= '__all__'

class AddressSerializer(serializers.ModelSerializer):
    class Meta: 
         model= Address
         fields= '__all__'


