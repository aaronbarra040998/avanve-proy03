from django.db import models

class Alumno(models.Model):
    id = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=100)
    apellido = models.CharField(max_length=100)
    fecha_nacimiento = models.DateField()
    foto = models.ImageField(upload_to='fotos/', blank=True, null=True)

    def __str__(self):
        return f"{self.nombre} {self.apellido}  {self.foto}"
    
class Alumno_Horario(models.Model):
    id = models.AutoField(primary_key=True)
    id_Alumnos = models.ForeignKey(Alumno, on_delete=models.CASCADE, db_index=True)
    horario_ingreso = models.TimeField()
    horario_salida = models.TimeField()

    def __str__(self):
        return f"Alumno: {self.id_Alumnos}: Ingreso: {self.horario_ingreso} Salida: {self.horario_salida}"
