from django.urls import path, include
from . import views

urlpatterns = [
    path('', views.IndexView.as_view()),
    path('alumno/', views.AlumnoView.as_view(),name='alumnos'),
    path('alumno/<int:alumno_id>', views.AlumnoDetailView.as_view()),
    path('alumno_horario/', views.Alumno_HorarioView.as_view()),  # Corrección de ruta
    path('alumno_horario/<int:alumno_horario_id>', views.Alumno_HorarioDetailView.as_view()),
]
