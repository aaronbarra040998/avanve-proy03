from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import generics
from .models import * 
from .serializers import AlumnoSerializer, Alumno_HorarioSerializer
from django.db.models import F

class IndexView(APIView):
    def get(self, request):
        lista_alumnos = Alumno.objects.all()
        serializer_alumnos = AlumnoSerializer(lista_alumnos, many=True)
        return Response(serializer_alumnos.data)

class AlumnoView(generics.ListCreateAPIView):
    queryset = Alumno.objects.all()
    serializer_class = AlumnoSerializer

class AlumnoDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Alumno.objects.all()
    lookup_url_kwarg = 'alumno_id'
    serializer_class = AlumnoSerializer

    def perform_destroy(self, instance):
        alumno_id = instance.id  # Guarda el ID del alumno a eliminar
        instance.delete()

        # Reorganiza los IDs de los alumnos restantes
        Alumno.objects.filter(id__gt=alumno_id).update(id=F('id') - 1)
        
class Alumno_HorarioView(generics.ListCreateAPIView):
    queryset = Alumno_Horario.objects.all()
    serializer_class = Alumno_HorarioSerializer

class Alumno_HorarioDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Alumno_Horario.objects.all()
    lookup_url_kwarg = 'alumno_horario_id'
    serializer_class = Alumno_HorarioSerializer