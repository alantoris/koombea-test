# Generated by Django 4.2.6 on 2023-10-13 13:48

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('pages', '0003_webpage_page'),
    ]

    operations = [
        migrations.AlterField(
            model_name='linkscrapped',
            name='name',
            field=models.CharField(max_length=128, null=True),
        ),
        migrations.AlterField(
            model_name='webpage',
            name='state',
            field=models.CharField(choices=[('INIT', 'Initial'), ('IN_PROCESS', 'In process'), ('DONE', 'Done'), ('FAILED', 'Failed')], default='INIT', max_length=16),
        ),
    ]