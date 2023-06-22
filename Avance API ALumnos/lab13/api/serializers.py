from rest_framework import serializers
from .models import *

class AlumnoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Alumno
        fields = '__all__'

class Alumno_HorarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Alumno_Horario
        fields = '__all__'

