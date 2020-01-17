from django.contrib import admin
from .models import Seccion_producto, Producto


class ProductoAdmin(admin.ModelAdmin):
    list_display = ['nombre','precio','stock','seccion']
    search_fields = ['nombre']
    list_filter = ['seccion']
    list_per_page = 10



admin.site.register(Seccion_producto)
admin.site.register(Producto,ProductoAdmin)

