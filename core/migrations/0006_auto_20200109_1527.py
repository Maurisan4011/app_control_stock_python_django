# Generated by Django 2.2.7 on 2020-01-09 18:27

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0005_auto_20200109_0022'),
    ]

    operations = [
        migrations.AlterField(
            model_name='producto',
            name='image',
            field=models.ImageField(null='true', upload_to='productos', verbose_name='Imagen'),
        ),
    ]
