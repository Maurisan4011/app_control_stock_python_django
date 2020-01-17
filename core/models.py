from django.db import models


# Create your models here.
class Seccion_producto(models.Model):
    nombre = models.CharField(max_length=200)

    def __str__(self):
        return self.nombre


class Producto(models.Model):
#image = models.ImageField(verbose_name = "Imagen", upload_to="productos/",default="")
    nombre = models.CharField(max_length=200)
    precio = models.DecimalField(max_digits=6, decimal_places=2)
    stock = models.IntegerField()
    seccion = models.ForeignKey(Seccion_producto, on_delete=models.CASCADE)
    imagen = models.ImageField(null=True, blank=True)
    def __str__(self):
        return self.nombre